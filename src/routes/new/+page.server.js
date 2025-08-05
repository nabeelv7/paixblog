import { db } from "$lib/server/db/index.js";
import { blogsTable, users } from "$lib/server/db/schema.js";
import { redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm/gel-core/expressions";

export async function load({ locals }) {
  const session = await locals.auth();
  if (!session || !session?.user) {
    redirect(307, "/");
  }
}

export const actions = {
  createBlog: async ({ request, locals }) => {
    const data = await request.formData();
    const title = data.get("title");
    const body = data.get("body");
    const bodyPreview = body?.slice(0, 255);

    console.log({ title, body });

    const { user } = await locals.auth();

    if (!user) {
      // error()
    }

    await db.insert(blogsTable).values({
      title,
      body,
      bodyPreview,
      userEmail: user.email,
    });

    console.log("YEAHHH");
  },
};
