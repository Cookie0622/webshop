<script>
    import { afterNavigate } from "$app/navigation";
    import ProductComponent from "$lib/components/ProductComponent.svelte";
    import { onMount } from "svelte";

    const { data } = $props();

    let products = $state([]);
    let searchInput = $state("");
    let errorMessage = $state("");

    afterNavigate(async () => {
        await getProducts();
    });

    async function getProducts() {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            products = await res.json();
            products = products.filter((product) =>
                product.title.toLowerCase().includes(data.search.toLowerCase())
            );
            errorMessage = products.length === 0 ? "Products not found" : "";
        } catch (err) {
            errorMessage = "Products not found";
        }
    }
</script>

<div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-md sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
            <h1 class="text-2xl font-bold">
                <a href="/">FakeShop</a>
            </h1>

            <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto items-stretch sm:items-center">
                <input
                    bind:value={searchInput}
                    type="text"
                    placeholder="Search products..."
                    class="border rounded px-4 py-2 w-full sm:w-64"
                />
                <a
                    href={`/search/${searchInput}`}
                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
                >
                    Search
                </a>
            </div>
        </div>
    </header>

    <!-- Product Section -->
    <main class="flex-grow">
        <section class="max-w-7xl mx-auto px-4 py-12">
            <h3 class="text-2xl font-semibold mb-6">Products</h3>

            {#if errorMessage.length === 0}
                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {#each products as product}
                        <ProductComponent {product} />
                    {/each}
                </div>
            {:else}
                <p class="text-red-600 text-center">{errorMessage}</p>
            {/if}
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t py-6 mt-12 text-center text-sm text-gray-600">
        &copy; 2025 FakeShop. All rights reserved.
    </footer>
</div>
