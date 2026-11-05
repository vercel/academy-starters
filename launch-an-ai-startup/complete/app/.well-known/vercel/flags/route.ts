import { getProviderData } from "@flags-sdk/vercel";
import { createFlagsDiscoveryEndpoint } from "flags/next";
import * as flags from "../../../../flags";

// Lets Flags Explorer in the Vercel Toolbar list and override this app's flags.
export const GET = createFlagsDiscoveryEndpoint(async () => getProviderData(flags));
