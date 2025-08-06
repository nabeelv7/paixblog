<script>
    import { marked } from "marked";
    import DOMPurify from "isomorphic-dompurify";
    import SignInButton from "$lib/components/SignInButton.svelte";
    import { onMount } from "svelte";

    let { data } = $props();
    const user = data?.session?.user;

    let blogPreviews = $state([]);

    onMount(() => {
        blogPreviews = data.blogs.map((blog) => {
            const raw = marked.parse(blog.bodyPreview || "");
            const safe = DOMPurify.sanitize(`<div>${raw}</div>`);
            return { ...blog, previewHtml: safe };
        });
    });
</script>

<main
    class="flex max-w-screen-lg mx-auto flex-col gap-5 justify-center py-25 px-5"
>
    <!-- Greeting -->
    <h1 class="text-3xl font-bold">
        yo {user?.name || "wanderer"} <span class="animate-pulse">✌️</span>
    </h1>

    <!-- Blog List (client-only after onMount) -->
    {#if blogPreviews.length > 0}
        <section class="flex flex-col w-full gap-2 mt-10">
            {#each blogPreviews as blog}
                <a href={`/blog/${blog.id}`}>
                    <div
                        class="w-full space-y-2 text-left py-5 rounded-xs hover:bg-zinc-800 hover:pl-10 transition-all duration-250 ease-out text-wrap"
                    >
                        <h1
                            class="text-xl font-medium text-shadow-xs text-shadow-gray-400"
                        >
                            {blog.title}
                        </h1>
                        <div class="opacity-80 text-balance break-words">
                            {@html blog.previewHtml}
                        </div>
                    </div>
                </a>
            {/each}
        </section>
    {:else}
        <p class="opacity-60 italic mt-10">Loading blogs...</p>
    {/if}
</main>
