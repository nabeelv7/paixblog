<script>
    import { Toaster } from "svelte-french-toast";
    import "../app.css";
    import favicon from "$lib/assets/favicon.svg";
    import Navbar from "./Navbar.svelte";

    let { data, children } = $props();

    $effect(() => console.log(data?.session?.user));
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<Toaster />
<Navbar user={data?.session?.user} />
{@render children?.()}
