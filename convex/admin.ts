import { action } from "./_generated/server";
import { internal } from "./_generated/api";

export const seedDatabase = action({
  args: {},
  handler: async (ctx) => {
    await ctx.runMutation(internal.seed.run, {});
    return { ok: true };
  },
});
