
const topics = [
  {
    day: 0,
    slug: "hyper-personalized-health",
    headline: "Hyper-Personalized Health",
    subtitle: "AI-driven wellness, DNA insights, and the future of personalized medicine",
    description: "Daily insights on how AI and genomics are revolutionizing personal health",
    category: "Health Tech",
    tags: ["health", "AI", "personalization", "wellness", "DNA"],
    primaryColor: "#06b6d4",
    secondaryColor: "#0891b2",
    font: "Inter",
    
    deepseekPrompt: `Write a 400-500 word blog post about Hyper-Personalized Health for a professional blog.
Cover these specific angles:
- AI-driven nutrition plans based on individual microbiome analysis
- DNA-based skincare routines gaining mainstream adoption
- Continuous glucose monitors expanding beyond diabetes to general wellness
- Ethical considerations around health data privacy

Tone: Informed but accessible. Scientific but not dry. No sales pitch.
Structure: Start with a hook about personalized medicine going mainstream. Include one real-world example. End with 3 actionable tips.
Format in Markdown with ## headings and short paragraphs.
IMPORTANT: Do NOT mention specific brand names, prices, or products to purchase. This is pure informational content.`,
    
    imagePrompt: `Futuristic medical visualization, translucent human silhouette with glowing blue DNA helix spiraling inside, floating data visualizations showing heart rate and nutrition molecules, clean white and mint green gradient background, soft diffused lighting, photorealistic, 8k quality, scientific but artistic`,
    
    imageNegativePrompt: "text, letters, words, watermark, signature, ugly, distorted, low quality, blurry, blood, gore, horror, brand names, products, price tags"
  },
  {
    day: 1,
    slug: "digital-detox",
    headline: "Digital Detox",
    subtitle: "Intentional living in a hyper-connected world",
    description: "Practical strategies for digital wellness and mindful technology use",
    category: "Digital Wellness",
    tags: ["digital-detox", "mindfulness", "technology", "mental-health"],
    primaryColor: "#84cc16",
    secondaryColor: "#65a30d",
    font: "Inter",
    
    deepseekPrompt: `Write a 400-500 word blog post about Digital Detox for a professional blog.
Cover these specific angles:
- The shift from complete disconnection to intentional connectivity
- Rise of minimalist technology and features that support focus
- How the attention economy is being challenged
- Practical frameworks for digital boundaries

Tone: Reflective but practical. Not judgmental about technology use. No sales pitch.
Structure: Open with a relatable moment of notification overwhelm. Discuss the philosophy shift. End with a concrete framework.
Format in Markdown with ## headings and short paragraphs.
IMPORTANT: Do NOT mention specific brand names, products, apps, or services to purchase. This is pure informational content.`,
    
    imagePrompt: `Split composition photograph, left half showing chaotic tangle of glowing smartphone notifications in dark monochrome, right half showing warm sunlit hands holding a physical book and ceramic tea cup by a window with plants, natural morning light, peaceful atmosphere`,
    
    imageNegativePrompt: "text, letters, words, watermark, signature, ugly, distorted, low quality, blurry, brand names, logos, products"
  },
  {
    day: 2,
    slug: "remote-work-micro-nomad",
    headline: "Remote Work / Micro-Nomad",
    subtitle: "Work from anywhere, return by Friday",
    description: "Guides for location-independent work and short-stay travel",
    category: "Work & Lifestyle",
    tags: ["remote-work", "nomad", "travel", "productivity"],
    primaryColor: "#f59e0b",
    secondaryColor: "#d97706",
    font: "Inter",
    
    deepseekPrompt: `Write a 400-500 word blog post about the Micro-Nomad lifestyle for a professional blog.
Cover these specific angles:
- How micro-nomads differ from traditional digital nomads
- The psychology of short-stay work travel
- Productivity strategies for working in new environments
- Community and connection while mobile

Tone: Energetic and aspirational but grounded in practical advice. No sales pitch.
Structure: Define the trend. Share a conceptual day-in-the-life. List mindset shifts needed.
Format in Markdown with ## headings and short paragraphs.
IMPORTANT: Do NOT mention specific brand names, co-working spaces, tools, gear, or products. Pure informational content.`,
    
    imagePrompt: `Cozy modern campervan interior converted into a workspace, standing desk with laptop, hammock visible in background, open back doors revealing mountain lake at golden hour sunset, warm interior lighting, adventurous yet professional atmosphere, photorealistic, 8k`,
    
    imageNegativePrompt: "text, letters, words, watermark, signature, ugly, distorted, low quality, blurry, brand logos, product names"
  },
  {
    day: 3,
    slug: "creator-educator",
    headline: "Creator-Educator",
    subtitle: "Building educational content for the creator economy",
    description: "Insights on teaching, creating, and monetizing knowledge online",
    category: "Education & Creation",
    tags: ["creator-economy", "education", "AI", "content-creation"],
    primaryColor: "#8b5cf6",
    secondaryColor: "#7c3aed",
    font: "Inter",
    
    deepseekPrompt: `Write a 400-500 word blog post about the rise of Creator-Educators for a professional blog.
Cover these specific angles:
- The evolution from influencer to educator in the creator economy
- Why educational content is outperforming pure entertainment
- The psychology of learning through short-form content
- How to structure educational content effectively

Tone: Insightful and forward-looking. Informational only. No sales pitch.
Structure: Explain the trend. Analyze why it works. End with content structuring principles.
Format in Markdown with ## headings and short paragraphs.
IMPORTANT: Do NOT mention specific platforms, tools, apps, courses, or products. Pure educational content.`,
    
    imagePrompt: `Isometric 3D illustration of a futuristic classroom, central holographic figure teaching with floating UI panels showing mathematical formulas, historical timelines, and code, diverse students interacting with tablets, purple and teal neon color palette, clean geometric design`,
    
    imageNegativePrompt: "text, letters, words, watermark, signature, ugly, distorted, low quality, blurry, logos, brand names"
  },
  {
    day: 4,
    slug: "ultra-compact-tech",
    headline: "Ultra-Compact Tech",
    subtitle: "The future of ambient and minimalist computing",
    description: "Exploring the shift toward smaller, smarter, less intrusive technology",
    category: "Gadgets & Tech",
    tags: ["gadgets", "minimalism", "tech", "hardware"],
    primaryColor: "#64748b",
    secondaryColor: "#475569",
    font: "Inter",
    
    deepseekPrompt: `Write a 400-500 word blog post about Ultra-Compact Technology for a professional blog.
Cover these specific angles:
- The philosophy of "less screen, more ambient computing"
- How miniaturization changes our relationship with technology
- The trend toward single-purpose devices over multi-function
- Predictions for ambient computing in daily life

Tone: Tech-enthusiast but thoughtful. Conceptual and trend-focused. No sales pitch.
Structure: Open with the philosophical shift. Explore the implications. End with a vision of ambient computing.
Format in Markdown with ## headings and short paragraphs.
IMPORTANT: Do NOT mention specific brands, product names, prices, or purchase recommendations. Pure trend analysis.`,
    
    imagePrompt: `Minimalist product photography on pure white surface, sleek abstract geometric shapes representing future devices, translucent card-like object, elegant titanium ring, small pebble-like form, sharp directional shadows, monochromatic aesthetic, premium commercial style`,
    
    imageNegativePrompt: "text, letters, words, watermark, signature, ugly, distorted, low quality, blurry, logos, brand names, cluttered"
  },
  {
    day: 5,
    slug: "climate-travel",
    headline: "Climate Travel",
    subtitle: "Regenerative tourism and conscious exploration",
    description: "Exploring travel that gives back to the planet and local communities",
    category: "Travel & Environment",
    tags: ["climate", "travel", "sustainability", "conservation"],
    primaryColor: "#14b8a6",
    secondaryColor: "#0d9488",
    font: "Inter",
    
    deepseekPrompt: `Write a 400-500 word blog post about Climate Travel for a professional blog.
Cover these specific angles:
- The evolution from sustainable tourism to regenerative travel
- What makes travel truly regenerative (beyond carbon offsets)
- Community-led conservation and eco-tourism models
- How travelers can evaluate genuine climate-positive options

Tone: Hopeful and action-oriented. Educational, not preachy. No sales pitch.
Structure: Start with a vivid travel scene. Explain the regenerative concept. Provide evaluation criteria.
Format in Markdown with ## headings and short paragraphs.
IMPORTANT: Do NOT mention specific tour operators, hotels, booking platforms, or products. Pure conceptual content.`,
    
    imagePrompt: `Aerial wide-angle photograph of people knee-deep in crystal clear shallow ocean water planting mangrove shoots at golden sunrise, conservation drones flying in distance mapping the ecosystem, warm golden hour light, cinematic composition, hopeful environmental storytelling`,
    
    imageNegativePrompt: "text, letters, words, watermark, signature, ugly, distorted, low quality, blurry, pollution, trash, logos, brands"
  },
  {
    day: 6,
    slug: "zero-click-seo",
    headline: "Zero-Click SEO",
    subtitle: "Optimizing for AI search and featured results",
    description: "Strategies for visibility in the era of AI-powered search engines",
    category: "Digital Marketing",
    tags: ["SEO", "AI", "search", "content-strategy"],
    primaryColor: "#3b82f6",
    secondaryColor: "#2563eb",
    font: "Inter",
    
    deepseekPrompt: `Write a 400-500 word blog post about Zero-Click SEO for a professional blog.
Cover these specific angles:
- How AI search engines change content discovery
- The shift from ranking to being the source of answers
- Entity-first content strategy explained simply
- Structuring content for AI summarization

Tone: Tactical and educational. Written for content creators. No sales pitch.
Structure: Start with a search behavior stat. Explain the paradigm shift. Provide formatting principles.
Format in Markdown with ## headings and short paragraphs.
IMPORTANT: Do NOT mention specific SEO tools, platforms, or products. Pure strategy content.`,
    
    imagePrompt: `Abstract 3D data visualization, luminous diamond shape at center radiating bright light into orbiting geometric shapes representing various devices, dark void space background with sharp neon grid lines extending to infinity, blue and white color palette, modern futuristic aesthetic`,
    
    imageNegativePrompt: "text, letters, words, watermark, signature, ugly, distorted, low quality, blurry, logos, brand names"
  }
];

module.exports = topics;