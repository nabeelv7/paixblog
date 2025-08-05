<script>
    import SignInButton from "$lib/components/SignInButton.svelte";
    import { onMount } from "svelte";

    let { data } = $props();

    const user = data?.session?.user;

    onMount(() => console.log(data.blogs));
</script>

<main
    class="flex max-w-screen-lg mx-auto flex-col gap-5 text-center justify-center items-center py-30 px-5"
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
    <section class="flex flex-col w-full gap-2">
        {#each data.blogs as blog}
            <div class="w-full space-y-2 text-left py-5 rounded-xs">
                <h1 class="text-xl font-medium">{blog.title}</h1>
                <p class="opacity-80 text-balance">{blog.bodyPreview}..</p>
                <p class="opacity-80 text-sm underline">@{blog.userEmail}</p>
            </div>
        {/each}
    </section>
</main>
