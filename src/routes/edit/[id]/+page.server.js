import { db } from "$lib/server/db";
import { blogsTable } from "$lib/server/db/schema";
import { error, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function load({ locals, params }) {
  const session = await locals.auth();

  if (!session || !session?.user) {
    redirect(307, "/");
  }

  const { id } = params;
  const [blog] = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.id, id));

  if (session?.user.email !== blog.userEmail) {
    redirect(307, "/");
  }

  return {
    blog,
  };
}

export const actions = {
  editBlog: async ({ request, locals }) => {
    const { user } = await locals.auth();

    if (!user || !user.email) {
      return error(401, "You are not authenticated or authorized.");
    }

    const data = await request.formData();
    const title = data.get("title");
    const body = data.get("body");
    const id = data.get("id");
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

    if (!id) {
      return fail(400, {
        error: true,
        message: "an unexpected error occured",
        title,
        body,
      });
    }

    // Check ownership
    const [blog] = await db
      .select()
      .from(blogsTable)
      .where(eq(blogsTable.id, id));

    if (!blog) {
      return error(404, "Blog not found.");
    }

    if (blog.userEmail !== user.email) {
      return error(403, "You are not authorized to edit this blog.");
    }

    await db
      .update(blogsTable)
      .set({
        title,
        body,
        bodyPreview,
      })
      .where(eq(blogsTable.id, id));

    redirect(307, `/blog/${id}`);
  },
};
