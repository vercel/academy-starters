import type { ProviderMetadata } from "ai";

type Routing = { modelAttempts?: { canonicalSlug: string; success: boolean }[] };

// result.response.modelId echoes the model you asked for. After a fallback,
// the model that answered is the successful entry in the Gateway's routing log.
export function servedBy(providerMetadata: ProviderMetadata | undefined): string | undefined {
  const routing = providerMetadata?.gateway?.routing as Routing | undefined;
  return routing?.modelAttempts?.find((a) => a.success)?.canonicalSlug;
}
