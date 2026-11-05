import { type AuthFn, localDev } from "eve/channels/auth";
import { eveChannel } from "eve/channels/eve";
import { getFounder } from "@/lib/session";

// The browser calls /eve/v1/* on the same origin, so it sends the Better Auth
// session cookie. Turn that session into the caller every tool sees.
const appSession: AuthFn<Request> = async (request) => {
  const founder = await getFounder(request.headers);
  if (!founder) return null;
  return {
    authenticator: "app",
    principalId: founder.id,
    principalType: "user",
    attributes: {},
  };
};

export default eveChannel({ auth: [appSession, localDev()] });
