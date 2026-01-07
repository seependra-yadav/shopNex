const productList = document.querySelector("#productList");

function addProducts() {
   productList.innerHTML = products.map(product => `
  <div class="product-card" onclick="openProduct(${product.id})">
    <img src="${product.image}">
    <h3>${product.name}</h3>
    <p class="price">₹${product.price}</p>
    <button onclick="event.stopPropagation(); addToCart(${product.id})">
      Add to Cart
    </button>
  </div>
`).join("");

}

addProducts()


function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const product = products.find(p => p.id === id);

  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart");

  updateCartCount();

}


function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cartCount").innerText = count;
}

updateCartCount();
