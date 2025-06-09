<script>
    let { item, updateQuantity, removeFromCart } = $props();
</script>

<div class="bg-white rounded shadow p-4 flex flex-col gap-3">
    <img
        src={item.image}
        alt={item.title}
        class="h-48 object-contain mx-auto"
    />
    <h3 class="text-lg font-semibold">{item.title}</h3>
    <p class="text-gray-600">Einzelpreis: {(item.price).toFixed(2)} €</p>

    <div class="flex items-center gap-2">
        <label for="quantity-{item.id}" class="text-sm">Menge:</label>
        <input
            id="quantity-{item.id}"
            type="number"
            min="1"
            class="border rounded px-2 py-1 w-16"
            bind:value={item.quantity}
            onchange={(e) => updateQuantity(item.id, + e.target.value)}
        />
    </div>

    <p class="font-semibold text-right">
        Gesamt: {(item.price * item.quantity).toFixed(2)} €
    </p>

    <button
        onclick={() => removeFromCart(item.id)}
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
        Entfernen
    </button>
</div>
