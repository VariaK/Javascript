let cart = JSON.parse(localStorage.getItem("cart")) || [];

export function addToCart(product) {
  const item = cart.find((p) => p.id === product.id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
}

export function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
}

export function updateQuantity(id, qty) {
  const item = cart.find((p) => p.id === id);
  if (item) {
    item.quantity = Math.max(1, qty);
  }
  saveCart();
}

export function getCart() {
  return cart;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
