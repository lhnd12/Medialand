/* =================================
QUICK VIEW MODAL SYSTEM
================================= */

const quickviewModal = document.querySelector(".quickview-modal");
const quickviewOverlay = document.querySelector(".quickview-overlay");

const quickviewTitle = document.querySelector(".quickview-title");
const quickviewPrice = document.querySelector(".quickview-price");
const quickviewDescription = document.querySelector(".quickview-description");
const quickviewImage = document.querySelector(".quickview-image img");

const quickviewVariant = document.querySelector(".quickview-variant-select");
const quickviewStock = document.querySelector(".quickview-stock");

const quickviewAddCart = document.querySelector(".quickview-add-cart");
const closeQuickview = document.querySelector(".close-quickview");

/* =================================
OPEN QUICK VIEW FUNCTION
================================= */

function openQuickView(card, type = "product") {

    const name = card.dataset.name;
    const price = card.dataset.price;
    const image = card.dataset.image;

    let description;
    let variants;
    let stock;

    if (type === "deal") {

        description = "Limited-time deal: " + name + ". Grab it while it lasts! Premium product with warranty.";
        variants = ["Default Option"];
        stock = "In Stock: 10";

    } else {

        description = "This is a premium " + name + " with high-end specifications, perfect for tech enthusiasts. Includes warranty and 24/7 support.";
        variants = ["Black", "White", "Blue"];
        stock = "In Stock: 15";

    }

    /* Fill modal data */

    quickviewTitle.textContent = name;
    quickviewPrice.textContent = "$" + price;
    quickviewDescription.textContent = description;
    quickviewImage.src = image;

    quickviewVariant.innerHTML = "<option>Select Option</option>";

    variants.forEach(v => {
        quickviewVariant.innerHTML += `<option value="${v}">${v}</option>`;
    });

    quickviewStock.textContent = stock;

    /* Show modal */

    quickviewModal.classList.add("show");
    quickviewOverlay.classList.add("show");

}

/* =================================
PRODUCT CARDS QUICK VIEW
================================= */

document.querySelectorAll(".product-card").forEach(card => {

    card.addEventListener("dblclick", () => {

        openQuickView(card, "product");

    });

});

/* =================================
DEAL CARDS QUICK VIEW
================================= */

document.querySelectorAll(".deal-card").forEach(card => {

    card.addEventListener("dblclick", () => {

        openQuickView(card, "deal");

    });

});

/* =================================
CLOSE QUICK VIEW
================================= */

function closeQuickView() {

    quickviewModal.classList.remove("show");
    quickviewOverlay.classList.remove("show");

}

closeQuickview.addEventListener("click", closeQuickView);
quickviewOverlay.addEventListener("click", closeQuickView);

/* =================================
ADD TO CART FROM QUICK VIEW
================================= */

quickviewAddCart.addEventListener("click", () => {

    const product = {
        id: Date.now(),
        name: quickviewTitle.textContent,
        price: parseFloat(quickviewPrice.textContent.replace("$", "")),
        image: quickviewImage.src
    };

    cart.push(product);
    updateCart();

    closeQuickView();

});