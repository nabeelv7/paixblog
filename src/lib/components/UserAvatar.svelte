<script>
    import { signOut } from "@auth/sveltekit/client";
    let { user } = $props();
    import { scale } from "svelte/transition";

    let isOpen = $state(false);
</script>

<div>
    <button onclick={() => (isOpen = !isOpen)}>
        <img
            class="rounded-full w-10 ml-3 ring-1 ring-black hover:ring-primary transition duration-250 cursor-pointer"
            src={user?.image}
            alt={`${user?.name}'s profile picture`}
        />
    </button>

    {#if isOpen}
        <div
            transition:scale={{ duration: 200, start: 0.95 }}
            class="p-4 rounded-md bg-zinc-800 absolute top-20 right-5 z-999"
        >
            <h1 class="font-medium">{user?.name}</h1>
            <p class="text-sm opacity-80">{user?.email}</p>

            <button
                onclick={() => signOut()}
                class="w-full text-red-400 transition-all duration-250 text-left cursor-pointer mt-5 rounded-xs flex gap-2 items-center"
            >
                {@render IconLogout()}
                Logout
            </button>
        </div>
    {/if}
</div>

{#snippet IconLogout()}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-log-out-icon lucide-log-out"
        ><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path
            d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
        /></svg
    >
{/snippet}
