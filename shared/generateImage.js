const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

async function generateBlogImage(prompt, negativePrompt, slug) {
  console.log(`🎨 Generating image for: ${slug}`);
  
  try {
    const output = await replicate.run(
      "stability-ai/sdxl:39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
      {
        input: {
          prompt: prompt,
          negative_prompt: negativePrompt || "text, watermark, low quality, blurry, ugly, distorted",
          width: 1344,
          height: 768,
          num_inference_steps: 30,
          guidance_scale: 7.5,
          scheduler: "DPMSolverMultistep",
          refine: "expert_ensemble_refiner",
          high_noise_frac: 0.8,
        },
      }
    );
    
    console.log(`✅ Image generated: ${output[0]}`);
    return output[0];
    
  } catch (error) {
    console.error(`❌ Image generation failed: ${error.message}`);
    // Fallback to Unsplash for reliability
    const fallbackUrl = `https://source.unsplash.com/1344x768/?${slug.replace(/-/g, ',')}`;
    console.log(`🔄 Using fallback image: ${fallbackUrl}`);
    return fallbackUrl;
  }
}

module.exports = { generateBlogImage };