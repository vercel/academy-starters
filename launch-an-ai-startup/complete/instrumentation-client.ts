import { initBotId } from "botid/client/core";

// BotID attaches its challenge headers only to requests listed here. The
// draft route is the one that spends money on every call.
initBotId({
  protect: [{ path: "/api/draft", method: "POST" }],
});
