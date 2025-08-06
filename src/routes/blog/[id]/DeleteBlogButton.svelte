<script>
    import { scale } from "svelte/transition";

    let modal = $state();
    let { id } = $props();
</script>

<div>
    <button
        onclick={() => modal.showModal()}
        type="submit"
        class="py-2 px-3 bg-red-700 hover:bg-red-600 rounded-xs cursor-pointer"
        >Delete</button
    >

    <dialog
        bind:this={modal}
        class="fixed top-1/2 left-1/2 md:w-130 w-full transform -translate-x-1/2 -translate-y-1/2 p-8 rounded-md bg-zinc-800 text-white shadow-md shadow-gray-700"
    >
        <div>
            <!-- questions -->
            <div>
                <h3 class="text-lg font-bold text-red-500">Delete Blog</h3>
                <p class="py-4">Are you sure you want to delete the blog?</p>
            </div>
            <!-- actions -->
            <div class="flex justify-end gap-1 mt-5">
                <button
                    class="py-2 px-3 bg-zinc-500 rounded-md cursor-pointer hover:bg-zinc-600 transition-all duration-250 active:scale-95 shadow-md shadow-gray-700"
                    onclick={() => modal.close()}>Cancel</button
                >
                <form method="POST" action="?/deleteBlog">
                    <input type="hidden" name="id" value={id} />
                    <button
                        type="submit"
                        class="py-2 px-3 bg-red-500 cursor-pointer active:scale-95 transition-all duration-250 hover:bg-red-600 rounded-md shadow-sm shadow-gray-700"
                        >Delete</button
                    >
                </form>
            </div>
        </div>
    </dialog>
</div>
