<script>
    import { enhance } from "$app/forms";
    import toast from "svelte-french-toast";
    import MarkdownBasics from "$lib/components/MarkdownBasics.svelte";
    import { scale } from "svelte/transition";

    const { data, form } = $props();

    $effect(() => {
        if (form?.error) {
            toast.error(form?.message);
        }
    });

    let isTooltipOpen = $state(false);
</script>

<main
    class="flex flex-col justify-center items-center max-w-screen-lg mx-auto py-10"
>
    <form
        use:enhance
        method="POST"
        action="?/editBlog"
        class="flex flex-col gap-10 w-full px-5"
    >
        <!-- title -->
        <div class="flex flex-col gap-1 w-full">
            <label for="title">Title</label>
            <input
                value={data.blog?.title || form?.title || ""}
                class="py-2 px-3 border rounded-xs border-zinc-800 w-full"
                type="text"
                name="title"
                placeholder="Blog title here.."
                required
            />
        </div>
        <!-- body -->
        <div class="flex flex-col gap-1 w-full">
            <div class="flex justify-between items-end">
                <label for="body" class="flex gap-2"
                    >Content (supports <button
                        onclick={() => (isTooltipOpen = !isTooltipOpen)}
                        type="button"
                        href="/"
                        class="text-blue-400 underline cursor-help flex"
                        >markdown <span class="text-red-500">*</span></button
                    >)</label
                >
                <!-- tooltip -->
                {#if isTooltipOpen}
                    <div
                        transition:scale={{ duration: 200, start: 0.95 }}
                        class="p-5 bg-slate-800 md:w-130 w-[calc(100vw-40px)] rounded-md fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-6 shadow-md shadow-gray-700"
                    >
                        <MarkdownBasics />
                        <div class="w-full flex items-center justify-end">
                            <button
                                class="py-2 px-3 bg-slate-800 hover:bg-slate-700 cursor-pointer rounded-md active:scale-95 transition-all duration-250 border border-gray-600"
                                onclick={() => (isTooltipOpen = false)}
                                >Close</button
                            >
                        </div>
                    </div>
                {/if}
            </div>
            <textarea
                value={data.blog?.body || form?.body || ""}
                oninput={(event) => {
                    const textarea = event.target;
                    textarea.style.height = "auto";
                    textarea.style.height = textarea.scrollHeight + "px";
                }}
                class="py-2 px-3 mt-1 border rounded-xs border-zinc-800 w-full min-h-120"
                name="body"
                placeholder="Blog content here.."
                required
            ></textarea>
        </div>
        <!-- hidden blog id -->
        <input type="hidden" value={data?.blog?.id || ""} name="id" />
        <!-- submit button -->
        <button
            type="submit"
            class="py-2 flex justify-center items-center gap-2 px-3 rounded-md sm:w-fit w-full hover:opacity-85 transition duration-250 cursor-pointer border border-primary text-base-content hover:bg-primary hover:text-primary-content"
        >
            Save Edit</button
        >
    </form>
</main>
