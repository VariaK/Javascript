import { fetchProducts } from "./api.js";
import { renderProducts, renderCart } from "./ui.js";

const container = document.getElementById("product-container");
const buttons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");
const cartBtn = document.getElementById("cart-btn");
const backBtn = document.getElementById("back-btn");

let allProducts = [];

async function init(category = "all") {
  container.innerHTML = "<p>Loading products...</p>";
  allProducts = await fetchProducts(category);
  renderProducts(allProducts, container);
}

buttons.forEach((btn) => {
  btn.onclick = () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    init(btn.dataset.category);
  };
});

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = allProducts.filter((p) =>
    p.title.toLowerCase().includes(value),
  );
  renderProducts(filtered, container);
});

cartBtn.addEventListener("click", () => {
  document.body.classList.add("viewing-cart");
  renderCart();
});

backBtn.onclick = () => {
  document.body.classList.remove("viewing-cart");
};

init();
renderCart();
