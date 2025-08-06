import { db } from "$lib/server/db";
import { blogsTable } from "$lib/server/db/schema";
import { fail, error, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export async function load({ params }) {
  const { id } = params;
  const [blog] = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.id, id));

  return {
    blog,
  };
}

export const actions = {
  deleteBlog: async ({ request, locals }) => {
    const { user } = await locals.auth();

    if (!user || !user.email) {
      return error(401, "You are not authenticated or authorized.");
    }

    const data = await request.formData();
    const id = data.get("id");

    if (!id) {
      return fail(400, {
        error: true,
        message: "an unexpected error occured",
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

    await db.delete(blogsTable).where(eq(blogsTable.id, id));

    redirect(303, "/");
  },
};
