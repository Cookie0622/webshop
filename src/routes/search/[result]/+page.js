import { error } from '@sveltejs/kit';

export async function load({ params }) {
    const searchStr = params.result;
    if (searchStr.length > 0) {
        return {
            search: searchStr
        };
    }
    return error(404, 'Product not found');
}