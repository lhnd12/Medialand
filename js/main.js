function startDealTimers(){
    const dealCards = document.querySelectorAll(".deal-card");
    
    dealCards.forEach(card=>{
    const timerEl = card.querySelector(".timer");
    const deadline = new Date(card.dataset.deadline);
    
    function updateTimer(){
        const now = new Date();
        const diff = deadline - now;
    
        if(diff <=0){
            timerEl.textContent = "Expired";
            card.querySelector(".add-to-cart").disabled = true;
            card.querySelector(".add-to-cart").textContent = "Expired";
            clearInterval(interval);
            return;
        }
    
        const days = Math.floor(diff/(1000*60*60*24));
        const hours = Math.floor((diff/(1000*60*60)) %24);
        const minutes = Math.floor((diff/1000/60)%60);
        const seconds = Math.floor((diff/1000)%60);
    
        timerEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    
    updateTimer();
    const interval = setInterval(updateTimer,1000);
    });
    }
    
    document.addEventListener("DOMContentLoaded", startDealTimers);

    function startRadialTimers(){
        const dealCards = document.querySelectorAll(".deal-card");
        
        dealCards.forEach(card=>{
        const timerText = card.querySelector(".timer-text");
        const progress = card.querySelector(".countdown-progress");
        const deadline = new Date(card.dataset.deadline);
        
        const radius = 36;
        const circumference = 2 * Math.PI * radius;
        
        progress.style.strokeDasharray = circumference;
        
        function updateTimer(){
            const now = new Date();
            let diff = deadline - now;
            if(diff <=0){
                timerText.textContent = "Expired";
                card.querySelector(".add-to-cart").disabled = true;
                card.querySelector(".add-to-cart").textContent = "Expired";
                progress.style.strokeDashoffset = circumference;
                card.classList.remove("hurry-up");
                clearInterval(interval);
                return;
            }
        
            const days = Math.floor(diff/(1000*60*60*24));
            const hours = Math.floor((diff/(1000*60*60)) %24);
            const minutes = Math.floor((diff/1000/60)%60);
            const seconds = Math.floor((diff/1000)%60);
        
            timerText.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        
            // radial progress
            const totalTime = deadline - new Date(card.dataset.created || now); // calculate total time
            const elapsed = totalTime - diff;
            const percent = elapsed/totalTime;
            progress.style.strokeDashoffset = circumference*(1-percent);
        
            // Hurry up glow for last 24h
            if(diff <= 24*60*60*1000){
                card.classList.add("hurry-up");
            }
        }
        
        if(!card.dataset.created) card.dataset.created = new Date().getTime();
        
        updateTimer();
        const interval = setInterval(updateTimer,1000);
        });
        }
        
        document.addEventListener("DOMContentLoaded", startRadialTimers);

        const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    alert("Thank you! Your message has been sent.");
    contactForm.reset();
});

const newsletterForm = document.querySelector(".newsletter-form");

newsletterForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    alert("Thank you for subscribing!");
    newsletterForm.reset();
});