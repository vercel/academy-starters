import { z } from "zod";

// The shape of every investor update. The server asks the model for it and
// the client renders it, so both import this one schema.
export const draftSchema = z.object({
  subject: z.string().describe("Email subject line, starting with the month and year."),
  summary: z.string().describe("Two sentences on how the month went, with the headline number."),
  wins: z.array(z.string()).min(1).max(4).describe("What went well, each with a number when one exists."),
  lowlights: z.array(z.string()).max(3).describe("What went badly. Be honest; investors can tell."),
  asks: z.array(z.string()).max(3).describe("Specific help the founder wants from investors."),
});

export type Draft = z.infer<typeof draftSchema>;
