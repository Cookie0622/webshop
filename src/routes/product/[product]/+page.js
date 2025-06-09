import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
    const id = params.product;
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    if (id > 0) {
        return {
            product: data
        };
    }
    return error(404, 'Product not found');
}