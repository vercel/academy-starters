// Lesson 3.2 — Multimodal: when models see and hear.
//
// Run: pnpm script scripts/09-multimodal.ts
// What happens: we send the model an image alongside a text prompt and get back
// a description. "Multimodal" means the model can take more than just text as
// input. In 2026, most modern chat models can see images. Some can also hear
// audio. The interesting part isn't the magic. It's that the same generateText
// call works once you put the right content parts in the messages array.

import { generateText } from "ai";

// A whiteboard with sticky notes. Work-themed, plenty of detail for the model to chew on.
// (Photo by Walls.io on Unsplash. Free to use, attribution appreciated.)
const imageUrl =
  "https://images.unsplash.com/photo-1676277757211-ebd7fdeb3d5b?w=800";

const { text } = await generateText({
  model: "openai/gpt-5.4-mini",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Describe this image in one paragraph. What's happening, who or what is in it, and what's the overall vibe?",
        },
        { type: "file", mediaType: "image", data: new URL(imageUrl) },
      ],
    },
  ],
});

console.log("--- Image ---");
console.log(imageUrl);

console.log("\n--- The model's description ---");
console.log(text);

console.log("\n--- What changed ---");
console.log("Notice we used messages: [...] instead of prompt: '...'.");
console.log("The content array can mix text parts and image parts (and audio, file, etc.).");
console.log("Same generateText. Different content shape. That's it.");
