const formTitle = document.querySelector("#form-title");
const authBtn = document.querySelector("#auth-btn");
const toggleLink = document.querySelector("#toggle-link");

let isLogin = true;


toggleLink.addEventListener("click", () => {
    isLogin = !isLogin;
    formTitle.innerText = isLogin ? "Login" : "Signup";
    authBtn.innerText = isLogin ? "Login" : "Signup";
    toggleLink.innerText = isLogin ? "Signup" : "Login";

     document.getElementById("extraFields").style.display = isLogin ? "none" : "block";
})

authBtn.addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  // const name = document.querySelector("#userName").value.trim();

  // Extra fields
  const name = document.getElementById("userName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (isLogin) {
    // Login
    const user = users.find(u => u.username === username  && u.password === password && u.name === name);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert(`Welcome back, ${name}!`);
      window.location.href = "index.html";  
    } else {    
      alert("Invalid credentials");
    }
  } else {
    // Signup
    if (!name || !phone || !address) {
      alert("Please fill all signup fields");
      return;
    }

    const userExists = users.find(u => u.username === username);
    if (userExists) {
      alert("Username already exists");
      return;
    }

    // Save all info in object
    const newUser = { username, password, name, phone, address };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login");
    toggleLink.click(); // switch to login
  }
});


const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  usernameDisplay.innerText = `Hi, ${currentUser.name}`;
  logoutBtn.style.display = "inline-block";
  loginLink.style.display = "none";

  console.log("User details:", currentUser); 
  // You can show email or phone somewhere if needed
}
