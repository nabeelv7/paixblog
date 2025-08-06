import { db } from "$lib/server/db";
import { blogsTable } from "$lib/server/db/schema";
import { desc } from "drizzle-orm";

export async function load() {
  const blogs = await db.query.blogsTable.findMany({
    orderBy: [desc(blogsTable.updatedAt)],
  });

  return {
    blogs,
  };
}
