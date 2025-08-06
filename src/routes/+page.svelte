<script>
    // markdown
    import { marked } from "marked";
    import DOMPurify from "isomorphic-dompurify";
    // normal
    import SignInButton from "$lib/components/SignInButton.svelte";
    import { onMount } from "svelte";
    let { data } = $props();

    const user = data?.session?.user;
</script>

<main
    class="flex max-w-screen-lg mx-auto flex-col gap-5 justify-center py-25 px-5"
>
    {#if user}
        <h1 class="text-3xl font-bold">hi {user?.name || "wanderer"} 👋</h1>
    {:else}
        <h1 class="text-3xl font-bold">hi wanderer 👋</h1>
    {/if}
    <input
        class="py-2 px-3 rounded-xs md:w-100 w-full border border-zinc-700"
        type="text"
        placeholder="Search Blogs.."
    />

    <!-- all blogs -->
    <section class="flex flex-col w-full gap-2 mt-10">
        {#each data.blogs as blog}
            {@const rawBodyPreview = marked.parse(blog.bodyPreview)}
            {@const safeBodyPreview = DOMPurify.sanitize(rawBodyPreview)}

            <a href={`/blog/${blog.id}`}>
                <div
                    class="w-full space-y-2 text-left py-5 rounded-xs hover:bg-zinc-800 hover:pl-10 transition-all duration-250 ease-out text-wrap"
                >
                    <!-- blog details -->
                    <h1
                        class="text-xl font-medium text-shadow-xs text-shadow-gray-400"
                    >
                        {blog.title}
                    </h1>
                    <p class="opacity-80 text-balance break-words">
                        {@html safeBodyPreview}
                    </p>
                </div>
            </a>
        {/each}
    </section>
</main>
