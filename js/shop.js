// FILTER FUNCTIONALITY
const filterButtons = document.querySelectorAll(".filter-btn");
const products = document.querySelectorAll(".product-card");

filterButtons.forEach(btn => {
    btn.addEventListener("click", ()=>{
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");
        const filter = btn.dataset.filter;

        products.forEach(p=>{
            if(filter === "all" || p.dataset.category === filter){
                p.style.display="block";
            }else{
                p.style.display="none";
            }
        });
    });
});
