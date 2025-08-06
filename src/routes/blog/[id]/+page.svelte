<script>
    import { page } from "$app/state";
    import { formatDate } from "$lib/utils/defs.js";

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
            <div>
                <button
                    class="py-2 px-3 hover:bg-zinc-800 rounded-xs cursor-pointer"
                    >Edit</button
                >
                <button class="py-2 px-3 bg-red-700 rounded-xs cursor-pointer"
                    >Delete</button
                >
            </div>
        {/if}
    </div>

    <!-- blog content -->
    <article
        id="article"
        class="leading-loose tracking-wide md:text-xl text-balance"
    >
        {blog.body}
    </article>
</main>
