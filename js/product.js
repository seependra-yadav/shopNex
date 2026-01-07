const productDetailDiv = document.getElementById("productDetail");

const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));

const product = products.find(p => p.id === productId);

if (!product) {
  productDetailDiv.innerHTML = "<h2>Product not found</h2>";
} else {
  productDetailDiv.innerHTML = `
    <img src="${product.image}">
    <div class="product-info">
      <h2>${product.name}</h2>
      <p class="price">₹${product.price}</p>
      <p>Category: ${product.category}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(p => p.id === id);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}
