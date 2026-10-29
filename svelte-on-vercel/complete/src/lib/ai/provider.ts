import { createGateway, wrapLanguageModel } from 'ai';
import { AI_GATEWAY_API_KEY } from '$app/env/private';

const gateway = createGateway({
	apiKey: AI_GATEWAY_API_KEY
});

// The virtual model from the AI Gateway dashboard: claude-sonnet-4.5, with claude-haiku-4.5 as its fallback.
const PRIMARY_MODEL = 'vmc/ski-alerts';
const FALLBACK_MODEL = 'anthropic/claude-haiku-4.5';

type Usage = { inputTokens: { total?: number }; outputTokens: { total?: number } };

function logUsage(usage: Usage) {
	const input = usage.inputTokens.total ?? 0;
	const output = usage.outputTokens.total ?? 0;
	console.log(`[AI Usage] Input tokens: ${input}`);
	console.log(`[AI Usage] Output tokens: ${output}`);
	console.log(`[AI Usage] Total tokens: ${input + output}`);
}

function withUsageTracking(model: ReturnType<typeof gateway>) {
	return wrapLanguageModel({
		model,
		middleware: {
			specificationVersion: 'v4',
			wrapGenerate: async ({ doGenerate }) => {
				const result = await doGenerate();
				if (result.usage) logUsage(result.usage);
				return result;
			},
			wrapStream: async ({ doStream }) => {
				const { stream, ...rest } = await doStream();
				let usage: Usage | undefined;

				return {
					stream: stream.pipeThrough(
						new TransformStream({
							transform(chunk, controller) {
								if (chunk.type === 'finish') usage = chunk.usage;
								controller.enqueue(chunk);
							},
							flush() {
								if (usage) logUsage(usage);
							}
						})
					),
					...rest
				};
			}
		}
	});
}

export function getModel() {
	return withUsageTracking(gateway(PRIMARY_MODEL));
}

export function getFallbackModel() {
	return withUsageTracking(gateway(FALLBACK_MODEL));
}

export { PRIMARY_MODEL, FALLBACK_MODEL };
