import type { Product } from "../types/product";

const BASE_SUGGEST_URL = "https://bb3-api.ashwinsrivastava.com/store/product-search/suggestions";
const BASE_SEARCH_URL = "https://bb3-api.ashwinsrivastava.com/store/product-search";

export async function fetchSuggestions(query: string): Promise<string[]> {
  try {
    const res = await fetch(`${BASE_SUGGEST_URL}?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return Array.isArray(data) ? data.slice(0, 8) : [];
  } catch {
    return [];
  }
}

// Fetch products; if no query provided, fetch all products
export async function fetchProducts(
  query = "",
  minRating = 1,
  page = 1,
  limit = 20
): Promise<Product[]> {
  try {
    const url = `${BASE_SEARCH_URL}?q=${encodeURIComponent(query)}&minRating=${minRating}&page=${page}&limit=${limit}`;
    const res = await fetch(url);
    const data = await res.json();

    if (Array.isArray(data.products)) {
      return data.products.map((p: any) => ({
        id: p.id || p._id,
        title: p.title,
        description: p.description,
        thumbnail: p.thumbnail || p.productImages?.[0]?.image,
        averageRating: p.averageRating,
        variants: p.variants || [],
        priceStart: p.priceStart || p.variants?.[0]?.currentPrice,
        images: p.productImages || [],
        brand: p.brand || "",
        categories: p.categories || [],
        tags: p.tags || [],
      }));
    }

    return [];
  } catch (err) {
    console.error(err);
    return [];
  }
}
