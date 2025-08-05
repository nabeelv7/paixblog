<script>
    import SignInButton from "$lib/components/SignInButton.svelte";

    let { data } = $props();

    const user = data?.session?.user;
</script>

<main
    class="flex flex-col gap-5 text-center justify-center items-center py-30 px-5"
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
</main>
