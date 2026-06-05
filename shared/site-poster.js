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
  console.log(`  DAILY PULSE - PHASE 1`);
  console.log(`═══════════════════════════════════════`);
  console.log(`  Site: ${SITE_DIR}`);
  console.log(`  Topic: ${topic.headline}`);
  console.log(`  Day: ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}`);
  console.log(`═══════════════════════════════════════\n`);
  
  try {
    // 1. Generate content
    console.log('📝 STEP 1: Generating content...');
    const blogContent = await generateBlogPost(topic.deepseekPrompt);
    
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
    
    const frontMatter = `---
title: "${postTitle}"
date: ${new Date().toISOString()}
lastmod: ${new Date().toISOString()}
slug: "${topic.slug}-${dateStr}"
draft: false
tags: ${JSON.stringify(topic.tags)}
categories: ["${topic.category}"]
description: "${seoDescription}"
cover:
  image: "/images/${imageFilename}"
  alt: "${topic.headline} - AI Generated Illustration"
  caption: "Daily Pulse: ${topic.headline}"
  relative: false
---

${cleanContent}`;
    
    const postDir = path.join(SITE_DIR, 'content', 'posts');
    fs.mkdirSync(postDir, { recursive: true });
    
    const postFilename = `${dateStr}-${topic.slug}.md`;
    const postPath = path.join(postDir, postFilename);
    fs.writeFileSync(postPath, frontMatter);
    console.log(`   Post created: ${postFilename}`);
    
    // 5. Build Hugo site
    console.log('🔨 STEP 6: Building site...');
    execSync(`cd ${SITE_DIR} && hugo --minify`, { stdio: 'inherit' });
    console.log('   Site built successfully');
    
    // 6. Summary
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