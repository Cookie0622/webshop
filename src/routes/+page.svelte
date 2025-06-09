<script>
    import FilterComponent from "$lib/components/FilterComponent.svelte";
    import ProductComponent from "$lib/components/ProductComponent.svelte";
    import { onMount } from "svelte";

    let products = $state([]);
    let categories = $state([]);
    let filter = $state("");
    let errorMessage = $state("");
    let searchInput = $state("");

    onMount(async () => {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            products = await res.json();
            if (products.length === 0) errorMessage = "Products not found";
        } catch (err) {
            errorMessage = "Products not found";
        }

        const catRes = await fetch("https://fakestoreapi.com/products/categories");
        categories = await catRes.json();
    });
</script>

<div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-md sticky top-0 z-10">
        <div class="max-w-7xl mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
            <h1 class="text-2xl font-bold">FakeShop</h1>
            <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <FilterComponent bind:filter {categories} />
                <input
                    bind:value={searchInput}
                    type="text"
                    placeholder="Search products..."
                    class="border rounded px-3 py-2 w-full sm:w-64"
                />
                <a
                    href={`/search/${searchInput}`}
                    class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto text-center"
                >
                    Search
                </a>
                <a
                    href="/cart"
                    class="text-white px-4 py-2 rounded flex items-center gap-2"
                    aria-label="Cart"
                >
                    <img src="/shopping-cart-svgrepo-com.svg" alt="Cart" class="h-5 w-5" />
                </a>
            </div>
        </div>
    </header>

    <!-- Hero -->
    <main class="flex-grow">
        <section class="bg-blue-100 py-16 px-4 text-center">
            <h2 class="text-3xl sm:text-4xl font-bold mb-4">Welcome to FakeShop</h2>
            <p class="text-base sm:text-lg text-gray-700">
                Find the best fake products that look real!
            </p>
        </section>

        <!-- Products -->
        <section class="max-w-7xl mx-auto px-4 py-12">
            <h3 class="text-2xl font-semibold mb-6">Products</h3>
            {#if errorMessage.length === 0}
                <div class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {#each products as product}
                        {#if !filter || product.category === filter}
                            <ProductComponent {product} />
                        {/if}
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
