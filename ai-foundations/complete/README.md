# AI Foundations — Complete

Reference scripts for the AI Foundations course. One script per lesson.

## Setup

```bash
pnpm install
cp .env.example .env
# Add your AI Gateway key to .env
```

## Running any script

```bash
pnpm script scripts/01-first-call.ts
pnpm script scripts/05-structured.ts
pnpm script scripts/10-daily-debrief.ts
```

## Script index

| Script | Lesson | Concept |
|---|---|---|
| 01-first-call.ts | 1.1 | First model call, streaming response |
| 02-system-prompt.ts | 1.2 | System vs user prompts |
| 03-tokens.ts | 1.3 | Token counting, context |
| 04-hallucinations.ts | 1.4 | When the model lies |
| 05-structured.ts | 2.1 | Output.object with Zod |
| 06-tools.ts | 2.2 | Function calling |
| 07-cost.ts | 2.3 | Mini vs full comparison |
| 08-embeddings.ts | 3.1 | Embeddings + RAG concept |
| 09-multimodal.ts | 3.2 | Image input |
| 10-daily-debrief.ts | 4.3 | Synthesis script |
