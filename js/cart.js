const cartItemsDiv = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Cart is empty</p>";
    totalPriceEl.innerText = "";
    return;
  }

  let total = 0;

  cartItemsDiv.innerHTML = cart.map(item => {
    total += item.price * item.qty;

    return `
      <div class="cart-item">
        <span>${item.name} (₹${item.price})</span>
        <div>
          <button onclick="changeQty(${item.id}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)">+</button>
          <button onclick="removeItem(${item.id})">❌</button>
        </div>
      </div>
    `;
  }).join("");

  totalPriceEl.innerText = `Total: ₹${total}`;
}

function changeQty(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.qty += change;
  if (item.qty <= 0) {
    removeItem(id);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
