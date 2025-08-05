<script>
    import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";

    let isLoading = $state(false);
</script>

<main
    class="flex flex-col justify-center items-center max-w-screen-lg mx-auto py-10"
>
    <div class="flex flex-col gap-10 w-full px-5">
        <!-- title -->
        <div class="flex flex-col gap-1 w-full">
            <label for="title">Title</label>
            <input
                class="py-2 px-3 border rounded-xs border-zinc-800 w-full"
                type="title"
                placeholder="Blog title here.."
            />
        </div>
        <!-- body -->
        <div class="flex flex-col gap-1 w-full">
            <label for="body">Content</label>
            <textarea
                oninput={(event) => {
                    const textarea = event.target;
                    textarea.style.height = "auto";
                    textarea.style.height = textarea.scrollHeight + "px";
                }}
                class="py-2 px-3 mt-1 border rounded-xs border-zinc-800 w-full min-h-120"
                type="body"
                placeholder="Blog content here.."
            ></textarea>
        </div>
        <!-- submit button -->
        <button
            type="submit"
            class="py-2 flex justify-center items-center gap-2 px-3 rounded-md sm:w-fit w-full hover:opacity-85 transition duration-250 cursor-pointer border border-primary text-base-content hover:bg-primary hover:text-primary-content"
        >
            {#if isLoading}
                <LoadingSpinner />
            {/if}
            Submit</button
        >
    </div>
</main>
