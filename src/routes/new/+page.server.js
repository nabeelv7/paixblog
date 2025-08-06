import { db } from "$lib/server/db/index.js";
import { blogsTable, users } from "$lib/server/db/schema.js";
import { error, fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm/gel-core/expressions";

export async function load({ locals }) {
  const session = await locals.auth();
  if (!session || !session?.user) {
    redirect(307, "/");
  }
}

export const actions = {
  createBlog: async ({ request, locals }) => {
    const { user } = await locals.auth();

    if (!user) {
      return error(401, "You are not authenticated.");
    }

    const data = await request.formData();
    const title = data.get("title");
    const body = data.get("body");
    const bodyPreview = body?.slice(0, 130);

    // check values
    if (!title) {
      return fail(400, {
        error: true,
        message: "please add a title",
        title,
        body,
      });
    }

    if (!body) {
      return fail(400, {
        error: true,
        message: "please add blog content",
        title,
        body,
      });
    }

    await db.insert(blogsTable).values({
      title,
      body,
      bodyPreview,
      userEmail: user.email,
    });

    redirect(307, "/");
  },
};
