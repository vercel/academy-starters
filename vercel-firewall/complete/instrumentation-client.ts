import { initBotId } from "botid/client/core";

// BotID attaches its headers only to the requests listed here. The order form
// posts to /api/order, so that's the one we protect.
initBotId({
  protect: [{ path: "/api/order", method: "POST" }],
});
