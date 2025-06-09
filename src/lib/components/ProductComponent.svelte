<script>
    let { product } = $props();
</script>

<a href="/product/{product.id}" class="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
    <img class="h-48 bg-gray-200 rounded mb-4" src="{product.image}" alt="Produkt Bild"/>
    <h4 class="font-bold text-lg">{product.title}</h4>
    <p class="text-gray-600">{parseFloat(product.price).toFixed(2)} €</p>
    <p class="text-gray-600">{product.category}</p>
</a>
