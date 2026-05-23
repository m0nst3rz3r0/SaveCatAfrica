import { QueryCtx, MutationCtx } from "../_generated/server";

export async function requireAdmin(
  ctx: QueryCtx | MutationCtx,
  token: string | undefined
) {
  if (!token) {
    throw new Error("Unauthorized");
  }
  const session = await ctx.db
    .query("adminSessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .unique();
  if (!session || session.expiresAt < Date.now()) {
    throw new Error("Unauthorized");
  }
  return session;
}
