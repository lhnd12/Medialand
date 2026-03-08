const cart = [];

const buttons = document.querySelectorAll(".add-to-cart");

const drawer = document.querySelector(".cart-drawer");

const overlay = document.querySelector(".cart-overlay");

const cartItems = document.querySelector(".cart-items");

const cartTotal = document.getElementById("cart-total");

const cartCount = document.querySelector(".cart-count");

buttons.forEach(btn => {

btn.addEventListener("click", e => {

const card = e.target.closest(".product-card");

const product = {

id: card.dataset.id,

name: card.dataset.name,

price: parseFloat(card.dataset.price),

image: card.dataset.image

};

cart.push(product);

updateCart();

openCart();

});

});

function updateCart(){

cartItems.innerHTML="";

let total = 0;

cart.forEach((item,index)=>{

total += item.price;

cartItems.innerHTML +=

`
<div class="cart-item">

<img src="${item.image}">

<div>

<p>${item.name}</p>

<p>$${item.price}</p>

<button onclick="removeItem(${index})">Remove</button>

</div>

</div>
`;

});

cartTotal.textContent = total;

cartCount.textContent = cart.length;

}

function removeItem(index){

cart.splice(index,1);

updateCart();

}

function openCart(){

drawer.classList.add("open");

overlay.classList.add("show");

}

function closeCart(){

drawer.classList.remove("open");

overlay.classList.remove("show");

}

document.querySelector(".cart-icon").onclick = openCart;

document.getElementById("close-cart").onclick = closeCart;

overlay.onclick = closeCart;

document.querySelectorAll(".deal-card .add-to-cart").forEach(btn=>{
    btn.addEventListener("click", e=>{
        const card = e.target.closest(".deal-card");
        const product = {
            id: card.dataset.id,
            name: card.dataset.name,
            price: parseFloat(card.dataset.price),
            image: card.dataset.image
        };
        cart.push(product);
        updateCart();
    });
    });