// shared/site-poster.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { execSync } = require('child_process');
const topics = require('./topics');
const { generateBlogPost } = require('./generateContent');
const { generateBlogImage } = require('./generateImage');
const { pingStart, pingSuccess, pingFailure } = require('./healthcheck');

const SITE_DIR = process.env.SITE_DIR || 'sites/health';
const TOPIC_DAY = parseInt(process.env.TOPIC_DAY || '0');
const HEALTHCHECKS_URL = process.env.HEALTHCHECKS_URL;
const yaml = require('js-yaml');

async function main() {
  await pingStart(HEALTHCHECKS_URL);
  
  const topic = topics.find(t => t.day === TOPIC_DAY);
  
  if (!topic) {
    const error = `No topic found for day ${TOPIC_DAY}`;
    console.error(`❌ ${error}`);
    await pingFailure(HEALTHCHECKS_URL, error);
    process.exit(1);
  }
  
  console.log(`\n═══════════════════════════════════════`);
  console.log(`  BLOG AND BEYOND:  - PHASE 1`);
  console.log(`═══════════════════════════════════════`);
  console.log(`  Site: ${SITE_DIR}`);
  console.log(`  Topic: ${topic.headline}`);
  console.log(`  Day: ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`);
  console.log(`═══════════════════════════════════════\n`);
  
  try {
    // 1. Generate content
    console.log('📝 STEP 1: Generating content...');

    const angles = [
      'Focus on the latest research and scientific breakthroughs from this year.',
      'Take a contrarian or skeptical viewpoint. Challenge common assumptions.',
      'Write from a beginner perspective. Explain concepts simply for newcomers.',
      'Focus on practical, actionable advice. Step-by-step frameworks only.',
      'Explore the ethical implications and societal impact of this topic.',
      'Compare and contrast different approaches or schools of thought.',
      'Write a forward-looking piece predicting trends for the next 2-3 years.',
      'Focus on real-world case studies and examples (hypothetical but realistic).',
      'Take a historical perspective. How did we get here and where are we going?',
      'Write about common mistakes or misconceptions people have about this topic.',
      'Interview-style: pose and answer the 5 most common questions people ask about this topic.',
      'Write an "underrated ideas" piece highlighting overlooked aspects most people ignore.',
      'Focus on the intersection of this topic with artificial intelligence and technology.',
      'Write a "myth vs reality" piece debunking popular myths with evidence.',
      'Take a global perspective. How does this topic differ across cultures and countries?',
      'Focus on personal stories and narratives. Make it feel human and relatable.',
      'Write a "what if" scenario exploring an alternative future or different path for this topic.',
      'Focus on cost, accessibility, and democratization. Is this becoming available to everyone?',
      'Write about the psychology or behavioral science behind why people engage with this topic.',
      'Create a "beginner\'s toolkit" or "starter guide" framework for someone new to this topic.'
    ];

    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const monthName = today.toLocaleDateString('en-US', { month: 'long' });
    const dateContext = `Today is ${dayName}, ${monthName} ${today.getDate()}, ${today.getFullYear()}. Reference the current season naturally if relevant.`;
    
    const randomAngle = angles[Math.floor(Math.random() * angles.length)];
    const enhancedPrompt = `${topic.deepseekPrompt}\n\n${dateContext}\n\nIMPORTANT ANGLE FOR THIS POST: ${randomAngle}`;
    
    const blogContent = await generateBlogPost(enhancedPrompt);
    
    // 2. Generate image
    console.log('🎨 STEP 2: Generating header image...');
    const imageUrl = await generateBlogImage(
      topic.imagePrompt,
      topic.imageNegativePrompt,
      topic.slug
    );
    
    // 3. Download image
    console.log('📥 STEP 3: Downloading image...');
    const imageResponse = await axios.get(imageUrl, {
      responseType: 'arraybuffer',
      timeout: 30000
    });
    
    const dateStr = new Date().toISOString().split('T')[0];
    const imageDir = path.join(SITE_DIR, 'static', 'images');
    fs.mkdirSync(imageDir, { recursive: true });
    
    const imageFilename = `${dateStr}-${topic.slug}.png`;
    const imagePath = path.join(imageDir, imageFilename);
    fs.writeFileSync(imagePath, imageResponse.data);
    console.log(`   Image saved: ${imageFilename}`);
    
    // 4. Create Hugo post
    console.log('📄 STEP 4: Creating post...');
    
    // Extract title from content or use headline
    const titleMatch = blogContent.match(/^#\s+(.+)/m);
    const postTitle = titleMatch ? titleMatch[1] : topic.headline;
    const cleanContent = blogContent.replace(/^#\s+.*\n/, '').trim();
    
    // Generate SEO description (first 160 chars)
    const seoDescription = cleanContent
      .replace(/[#*>`\[\]()]/g, '')
      .replace(/\n/g, ' ')
      .substring(0, 160)
      .trim();
    
    const frontMatterObj = {
      title: postTitle,
      date: new Date().toISOString(),
      lastmod: new Date().toISOString(),
      slug: `${topic.slug}-${dateStr}`,
      draft: false,
      tags: topic.tags,
      categories: [topic.category],
      description: seoDescription,
      cover: {
        image: `images/${imageFilename}`,
        alt: `${topic.headline} - AI Generated Illustration`,
        caption: `Blog and Beyond: ${topic.headline}`,
        relative: true
      }
    };
    
    const frontMatter = `---\n${yaml.dump(frontMatterObj, { 
      lineWidth: -1,
      noRefs: true,
      quotingType: '"',
      forceQuotes: true
    })}---\n\n${cleanContent}`;
    
    const postDir = path.join(SITE_DIR, 'content', 'posts');
    fs.mkdirSync(postDir, { recursive: true });
    
    const postFilename = `${dateStr}-${topic.slug}.md`;
    const postPath = path.join(postDir, postFilename);
    fs.writeFileSync(postPath, frontMatter);
    console.log(`   Post created: ${postFilename}`);
    
    // 5. Summary
    console.log(`\n═══════════════════════════════════════`);
    console.log(`  ✅ PHASE 1 POST COMPLETE`);
    console.log(`═══════════════════════════════════════`);
    console.log(`  Site:    ${SITE_DIR}`);
    console.log(`  Topic:   ${topic.headline}`);
    console.log(`  Date:    ${dateStr}`);
    console.log(`  Image:   ${imageFilename}`);
    console.log(`  Post:    ${postFilename}`);
    console.log(`═══════════════════════════════════════\n`);
    
    await pingSuccess(HEALTHCHECKS_URL);
    
  } catch (error) {
    console.error(`\n❌ JOB FAILED: ${error.message}`);
    console.error(error.stack);
    await pingFailure(HEALTHCHECKS_URL, error.message);
    process.exit(1);
  }
}

main();