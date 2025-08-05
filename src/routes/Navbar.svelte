<script>
    import SignInButton from "$lib/components/SignInButton.svelte";
    import CreateBlogButton from "$lib/components/CreateBlogButton.svelte";
    import UserAvatar from "$lib/components/UserAvatar.svelte";

    let { user } = $props();
</script>

<header>
    <nav class="flex justify-between items-center p-5">
        <!-- LOGO -->
        <a href="/" class="text-3xl group flex font-bold w-fit max-md:hidden">
            <span class="text-base-content group-hover:text-primary">Paix</span>
            <span class="text-primary group-hover:text-base-content">Blog</span>
        </a>

        <div
            class="flex gap-2 max-md:w-full max-md:justify-between items-center"
        >
            {#if !user}
                <!-- sign in button -->
                <SignInButton />
            {:else}
                <!-- show create blog button if -->
                {#if user?.email === "nabeelsadiq.dev@gmail.com"}
                    <CreateBlogButton />
                {/if}
                <UserAvatar {user} />
            {/if}
        </div>
    </nav>
</header>
