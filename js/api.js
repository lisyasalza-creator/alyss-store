
const API_URL = "https://dummyjson.com/products?limit=0";

// Mengambil data produk dari API
export async function loadData() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const data = await response.json();
  return data.products;
}
