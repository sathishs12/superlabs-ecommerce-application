import type { Product } from "../types/product";

// Use serverless API route
const PROXY_API = "/api/products";

export async function fetchSuggestions(query: string): Promise<string[]> {
  if (!query) return [];
  try {
    const res = await fetch(`${PROXY_API}?type=suggestions&q=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data?.data?.suggestions?.slice(0, 8) || [];
  } catch {
    return [];
  }
}

export async function fetchProducts(
  query = "",
  minRating = 1,
  page = 1,
  limit = 20
): Promise<Product[]> {
  try {
    const res = await fetch(`${PROXY_API}?q=${encodeURIComponent(query)}&minRating=${minRating}&page=${page}&limit=${limit}`);
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
