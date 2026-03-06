// ================= MENU TOGGLE =================
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('active'));

// ================= COUNTDOWN TIMER =================
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 3); // 3-day deal

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    if (distance < 0) {
        clearInterval(interval);
        document.querySelector(".countdown").innerHTML = "Deal Expired";
    }
}
const interval = setInterval(updateCountdown, 1000);
updateCountdown();

// ================= SHOP & CART =================
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const shopCards = document.querySelectorAll(".shop-card");

const cartDrawer = document.querySelector(".cart-drawer");
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const closeCart = document.querySelector(".close-cart");
const cartIcon = document.querySelector(".cart-icon");

let cart = [];

// Filter & Search Function
function filterShop() {
    const searchText = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    shopCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        const cat = card.dataset.category;
        card.style.display = (name.includes(searchText) && (category === "all" || category === cat)) ? "block" : "none";
    });
}

searchInput.addEventListener("input", filterShop);
categoryFilter.addEventListener("change", filterShop);

// Open/Close Cart
cartIcon.addEventListener("click", () => cartDrawer.classList.add("active"));
closeCart.addEventListener("click", () => cartDrawer.classList.remove("active"));

// Add to Cart
document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".shop-card");
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);

        // If item exists, increase quantity
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCart();
        cartDrawer.classList.add("active");
    });
});

// Update Cart Drawer
function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>MAD${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeItem(${index})">&times;</button>
        `;
        cartItemsContainer.appendChild(div);
    });

    cartTotal.innerText = total.toFixed(2);
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}