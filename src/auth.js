import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/sveltekit/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "$lib/server/db";

export const { handle } = SvelteKitAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
});
