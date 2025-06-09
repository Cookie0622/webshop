<script>
    let { filter = $bindable(), categories } = $props();
</script>

<select class="border rounded px-4 py-2 w-64" bind:value={filter}>
    <option value="" selected>Select Category</option>
    {#each categories as cat}
        <option value={cat}>{cat}</option>
    {/each}
</select>
