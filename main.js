document.addEventListener("DOMContentLoaded", function () {
    // ================================
    // 🍔 HAMBURGER MENU LOGIC
    // ================================
    const hamburgerButton = document.querySelector(".hamburger-button");
    const navBar = document.querySelector("#main-navigation");

    // Scroll lock helpers
    function lockScroll() {
        const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = scrollBarWidth + "px";
    }

    function unlockScroll() {
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
    }

    // Toggle nav on hamburger click
    hamburgerButton.addEventListener("click", function () {
        const isOpening = !navBar.classList.contains("active");
        this.classList.toggle("active", isOpening);
        this.setAttribute("aria-expanded", isOpening);
        navBar.setAttribute("aria-hidden", !isOpening);

        if (isOpening) {
            lockScroll();
            navBar.classList.add("active", "nav-open");
        } else {
            unlockScroll();
            navBar.classList.remove("nav-open");
            setTimeout(() => {
                navBar.classList.remove("active");
            }, 420);
        }
    });

    // Auto-close nav on resize to desktop
    let resizeTimeout;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const isDesktop = window.matchMedia("(min-width: 992px)").matches;
            const isNavOpen = navBar.classList.contains("active");

            if (isDesktop && isNavOpen) {
                hamburgerButton.classList.remove("active");
                hamburgerButton.setAttribute("aria-expanded", "false");
                navBar.setAttribute("aria-hidden", "true");
                navBar.classList.remove("nav-open", "active");
                unlockScroll();
            }
        }, 200);
    });

    // Prevent transition glitches on orientation change
    window.addEventListener("orientationchange", function () {
        document.body.classList.add("disable-transitions");
        setTimeout(() => {
            document.body.classList.remove("disable-transitions");
        }, 500);
    });

    // ================================
    // 🎠 CAROUSEL LOGIC
    // ================================
    const carousel = document.querySelector(".carousel");
    const cards = document.querySelectorAll(".carousel-card");
    const indicators = document.querySelectorAll(".carousel-indicators button");
    const totalCards = cards.length;

    let currentIndex = 0;
    let autoplayTimeout = null;
    let isPaused = false;
    let manualScrollTimeout = null;
    let isAutoplaying = false;

    // 🔁 Scroll to a specific card
    function scrollToCard(index) {
        const card = cards[index];
        if (!card) return;

        const containerWidth = carousel.offsetWidth;
        const offset = card.offsetLeft - (containerWidth / 2) + (card.offsetWidth / 2);

        carousel.scrollTo({
            left: offset,
            behavior: "smooth"
        });
    }

    // 🎯 Update active indicator
    function updateIndicators(index) {
        indicators.forEach((btn) => btn.classList.remove("active"));
        if (indicators[index]) indicators[index].classList.add("active");
    }

    // ▶️ Start autoplay loop
    function startAutoplay() {
        if (isAutoplaying) return;
        isAutoplaying = true;
        
        const nextSlide = () => {
            if (isPaused) {
                isAutoplaying = false;
                clearTimeout(autoplayTimeout);
                return;
            }

            currentIndex = (currentIndex + 1) % totalCards;
            updateIndicators(currentIndex);
            scrollToCard(currentIndex);
            autoplayTimeout = setTimeout(nextSlide, 5000);
        };
        autoplayTimeout = setTimeout(nextSlide, 5000);
    }

    // ⏸️ Pause autoplay
    function pauseAutoplay() {
        isPaused = true;
        isAutoplaying = false;
        clearTimeout(autoplayTimeout);
        autoplayTimeout = null;
    }

    // 🔄 Resume autoplay after a user has finished interacting
    function resumeAutoplay() {
        isPaused = false;
        startAutoplay();
    }

    // 🖱️ Manual indicator click/tap
    indicators.forEach((button, index) => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            pauseAutoplay();
            currentIndex = index;
            updateIndicators(currentIndex);
            scrollToCard(currentIndex);
            resumeAutoplay();
        });
        
        button.addEventListener("mouseenter", pauseAutoplay);
        button.addEventListener("mouseleave", resumeAutoplay);
    });

    // Pause on mouse enter, resume on mouse leave
    carousel.addEventListener("mouseenter", pauseAutoplay);
    carousel.addEventListener("mouseleave", resumeAutoplay);
    
    // 🧠 Manual scroll detection
    carousel.addEventListener("scroll", () => {
        // Find the closest card to the center and update currentIndex
        const carouselCenter = carousel.scrollLeft + carousel.offsetWidth / 2;
        let closestIndex = 0;
        let minDistance = Infinity;
        cards.forEach((card, index) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(cardCenter - carouselCenter);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });
        currentIndex = closestIndex;
        updateIndicators(currentIndex); // NEW: Update indicator on manual scroll
        
        pauseAutoplay();
        clearTimeout(manualScrollTimeout);
        manualScrollTimeout = setTimeout(resumeAutoplay, 3000);
    });
    
    // 👁️ Start autoplay when section enters view
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startAutoplay();
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        }
    );

    sectionObserver.observe(document.querySelector(".services-container"));
    
    // ⭐ Initialize first button as active on page load
    updateIndicators(0);
});