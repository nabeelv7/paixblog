<script>
    import { Toaster } from "svelte-french-toast";
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import Navbar from "./Navbar.svelte";
    import { page } from "$app/state";

    let { data, children } = $props();

    $effect(() => console.log(data?.session?.user));
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{#if page.url.pathname !== "/"}
    <div class="px-5 pt-5 max-w-screen-lg mx-auto">
        <a
            href="/"
            class="bg-zinc-800 py-2 px-3 rounded-md cursor-pointer transition duration-250 hover:opacity-80"
            >&larr; Back</a
        >
    </div>
{/if}
<Toaster />
<Navbar user={data?.session?.user} />
{@render children?.()}
