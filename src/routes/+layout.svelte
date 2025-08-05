<script>
    import { Toaster } from "svelte-french-toast";
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import Navbar from "./Navbar.svelte";
    import { page } from "$app/state";
    import Footer from "./Footer.svelte";

    let { data, children } = $props();

    $effect(() => console.log(data?.session?.user));
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<div class="flex flex-col min-h-screen">
    <main class="flex-1">
        <Toaster />
        <Navbar user={data?.session?.user} />
        {@render children?.()}
    </main>
    <Footer />
</div>
