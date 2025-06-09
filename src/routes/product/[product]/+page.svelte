<script>
    export let data;
    const { product } = data;

    function addCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    }
</script>

<div class="max-w-5xl mx-auto p-6">
    <div class="mb-4">
      <a href="/" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">&larr; Back</a>
    </div>

    <div
        class="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-md p-6"
    >
        <div>
            <img
                src={product.image}
                alt={product.title}
                class="w-full h-auto rounded-xl object-cover"
            />
        </div>

        <div>
            <p class="text-sm text-gray-500 mb-2">
                Category: {product.category}
            </p>
            <h1 class="text-3xl font-bold mb-4">{product.title}</h1>

            <div class="flex items-center space-x-2 mb-4">
                <span class="text-yellow-500 text-xl">&#9733;</span>
                <span class="text-gray-700">{product.rating.rate} / 5</span>
                <span class="text-sm text-gray-500"
                    >({product.rating.count} reviews)</span
                >
            </div>

            <p class="text-2xl text-blue-600 font-semibold mb-4">
                {parseFloat(product.price).toFixed(2)} €
            </p>

            <p class="text-gray-700 leading-relaxed mb-6">
                {product.description}
            </p>

            <button
                class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                onclick="{() => addCart()}"
                >Add to Cart</button
            >
        </div>
    </div>
</div>
