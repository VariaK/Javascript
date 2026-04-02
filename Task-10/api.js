export async function fetchProducts(category = "all") {
  let url = "https://dummyjson.com/products?limit=0";

  if (category !== "all") {
    url = `https://dummyjson.com/products/category/${category}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API Error");
    const data = await res.json();
    return data.products;
  } catch (err) {
    console.error(err);
    return [];
  }
}
