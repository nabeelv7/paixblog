<script>
    import SignInButton from "$lib/components/SignInButton.svelte";
    import CreateBlogButton from "$lib/components/CreateBlogButton.svelte";
    import UserAvatar from "$lib/components/UserAvatar.svelte";
    import { page } from "$app/state";

    let { user } = $props();
</script>

<header>
    <nav class="flex justify-between items-center p-5 max-w-screen-lg mx-auto">
        <!-- LOGO -->
        <a
            href="/"
            class="logo text-3xl group flex font-bold w-fit max-md:hidden"
        >
            <span class="text-base-content group-hover:text-primary">Paix</span>
            <span class="text-primary group-hover:text-base-content">Blog</span>
        </a>

        <div
            class="flex gap-2 max-md:w-full max-md:justify-between items-center"
        >
            {#if !user}
                <div class="w-full flex justify-end">
                    <!-- sign in button -->
                    <SignInButton />
                </div>
            {:else}
                <!-- show create blog button if -->
                {#if page.url.pathname == "/"}
                    <CreateBlogButton />
                {:else}
                    <a
                        href="/"
                        class="py-2 px-3 rounded-md hover:opacity-85 transition duration-250 cursor-pointer active:scale-95 bg-primary text-primary-content"
                    >
                        &larr; Home
                    </a>
                {/if}
                <UserAvatar {user} />
            {/if}
        </div>
    </nav>
</header>
