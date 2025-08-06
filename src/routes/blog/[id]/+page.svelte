<script>
    import { page } from "$app/state";
    import { formatDate } from "$lib/utils/defs.js";
    import DeleteBlogButton from "./DeleteBlogButton.svelte";

    let { data } = $props();
    const blog = data?.blog;

    const user = page?.data?.session?.user;
</script>

<main class="max-w-screen-lg flex flex-col gap-16 mx-auto px-5 py-20">
    <!-- blog details -->
    <div class="flex flex-col gap-5">
        <h1 class="md:text-5xl text-4xl font-bold tracking-tight">
            {blog.title}
        </h1>
        <div class="opacity-80">
            <h2><span class="font-bold">Author:</span> {blog.userEmail}</h2>
            <h2>
                <span class="font-bold">Last Updated:</span>
                {formatDate(blog.updatedAt)}
            </h2>
        </div>

        <!-- blog controls -->
        {#if user?.email === blog.userEmail}
            <div class="flex gap-2">
                <a
                    href={`/edit/${blog.id}`}
                    class="py-2 px-3 bg-zinc-800 hover:bg-zinc-700 rounded-xs cursor-pointer"
                    >Edit</a
                >
                <DeleteBlogButton id={blog.id} />
            </div>
        {/if}
    </div>

    <!-- blog content -->
    <article
        id="article"
        class="leading-loose tracking-wide md:text-xl text-balance break-words"
    >
        {blog.body}
    </article>
</main>
