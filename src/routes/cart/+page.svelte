<script>
	import CartProductComponent from "$lib/components/CartProductComponent.svelte";
	import { onMount } from "svelte";

	let cartItems = [];

	onMount(() => {
		const stored = localStorage.getItem("cart");
		cartItems = stored ? JSON.parse(stored) : [];
	});

	function updateQuantity(id, quantity) {
		cartItems = cartItems.map((item) => {
			if (item.id === id) {
				return { ...item, quantity: Math.max(1, quantity) };
			}
			return item;
		});
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}

	function removeFromCart(id) {
		cartItems = cartItems.filter((item) => item.id !== id);
		localStorage.setItem("cart", JSON.stringify(cartItems));
	}

	$: total = cartItems
		.reduce((sum, item) => sum + item.price * item.quantity, 0)
		.toFixed(2);
</script>

<div class="min-h-screen flex flex-col">
	<header class="bg-white shadow-md">
		<div
			class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center"
		>
			<h1 class="text-2xl font-bold"><a href="/">FakeShop</a></h1>
		</div>
	</header>

	<main class="flex-grow">
		<section class="max-w-7xl mx-auto px-4 py-12">
			<h2 class="text-2xl font-semibold mb-6">Dein Warenkorb</h2>

			{#if cartItems.length > 0}
				<div
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
				>
					{#each cartItems as item}
						<CartProductComponent
							{item}
							{updateQuantity}
							{removeFromCart}
						/>
					{/each}
				</div>

				<div class="text-right mt-8">
					<h3 class="text-xl font-bold">Gesamtsumme: {total} €</h3>
					<button
						class="mt-4 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
					>
						Zur Kasse
					</button>
				</div>
			{:else}
				<p class="text-gray-600">Dein Warenkorb ist leer.</p>
			{/if}
		</section>
	</main>

	<footer class="bg-white border-t py-6 mt-12">
		<div class="max-w-7xl mx-auto px-4 text-center text-gray-600">
			&copy; 2025 FakeShop. Alle Rechte vorbehalten.
		</div>
	</footer>
</div>
