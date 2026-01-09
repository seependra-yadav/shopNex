const productList = document.querySelector("#productList");

function addProducts(data = products) {
   productList.innerHTML = data.map(product => `
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


// add search operarion -----------------

let filteredProducts = products;
let searchProduct = document.getElementById("searchInput");

searchProduct.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();

  filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );

  addProducts(filteredProducts);
});




let currentCategory = 'all';

function filterCategory(category) {
   console.log("Category clicked:", category);
  console.log("Products before filter:", products);
  currentCategory = category; // store selected category

  const query = document.getElementById("searchInput")?.value.toLowerCase() || '';

  const filteredProducts = products.filter(p => 
    (currentCategory === 'all' || p.category === currentCategory) &&
    p.name.toLowerCase().includes(query)
  );

  addProducts(filteredProducts);
}

