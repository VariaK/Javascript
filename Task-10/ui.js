import { addToCart, getCart, updateQuantity, removeFromCart } from "./cart.js";

const getDiscountPrice = (price, discountPercentage) => {
  return (price - (price * discountPercentage) / 100).toFixed(2);
};

export function renderProducts(products, container) {
  container.innerHTML = "";

  products.forEach((p) => {
    const sellingPrice = getDiscountPrice(p.price, p.discountPercentage);

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="image-carousel">
        <img src="${p.thumbnail}" alt="${p.title}">
      </div>
      <div class="product-info">
        <h3 class="product-title">${p.title}</h3>
        <p class="product-description">${p.description}</p>
        <div class="price-container">
          <span class="current-price">$${sellingPrice}</span>
          <span class="discount">-${p.discountPercentage}%</span>
        </div>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    `;

    card.querySelector("button").onclick = () => {
      addToCart(p);
      renderCart();
      document.body.classList.add("viewing-cart");
    };

    container.appendChild(card);
  });
}

export function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalBox = document.getElementById("total");
  const cart = getCart();

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p class='empty-cart'>Your cart is empty.</p>";
    totalBox.innerHTML = "";
    return;
  }

  cart.forEach((item) => {
    const sellingPrice = getDiscountPrice(item.price, item.discountPercentage);
    const subtotal = sellingPrice * item.quantity;
    total += subtotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.title}" class="cart-img">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>$${sellingPrice} each</p>
      </div>
      <div class="cart-item-actions">
        <input type="number" value="${item.quantity}" min="1" class="qty-input">
        <button class="remove-btn">Remove</button>
      </div>
      <div class="cart-item-subtotal">
        <strong>$${subtotal.toFixed(2)}</strong>
      </div>
    `;

    div.querySelector("input").onchange = (e) => {
      updateQuantity(item.id, parseInt(e.target.value));
      renderCart();
    };

    div.querySelector(".remove-btn").onclick = () => {
      removeFromCart(item.id);
      renderCart();
    };

    cartContainer.appendChild(div);
  });

  const tax = total * 0.1;
  const finalTotal = total + tax;

  totalBox.innerHTML = `
    <div class="summary-row"><span>Subtotal:</span> <span>$${total.toFixed(2)}</span></div>
    <div class="summary-row"><span>Tax (10%):</span> <span>$${tax.toFixed(2)}</span></div>
    <hr>
    <div class="summary-row total-row"><span>Total:</span> <span>$${finalTotal.toFixed(2)}</span></div>
    <button id="checkout-btn" class="add-to-cart-btn" style="margin-top: 15px;">Proceed to Checkout</button>
  `;
}
