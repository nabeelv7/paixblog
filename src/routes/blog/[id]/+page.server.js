import { db } from "$lib/server/db";
import { blogsTable } from "$lib/server/db/schema";
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
