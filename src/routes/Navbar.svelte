<script>
    import SignInButton from "$lib/components/SignInButton.svelte";
</script>

<header>
    <nav class="flex justify-between p-5">
        <!-- LOGO -->
        <a href="/" class="text-3xl group flex font-bold w-fit">
            <span class="text-base-content group-hover:text-primary">Paix</span>
            <span class="text-primary group-hover:text-base-content">Blog</span>
        </a>

        <!-- sign in button -->
        <SignInButton />
    </nav>
</header>
