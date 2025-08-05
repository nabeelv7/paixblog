import { db } from "$lib/server/db";
import { blogsTable } from "$lib/server/db/schema";

export async function load() {
  const blogs = await db.select().from(blogsTable);

  return {
    blogs,
  };
}
