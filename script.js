// ----- Slideshow Logic -----
let slideIndex = 1;
showSlides(slideIndex);

// Shows a specific slide based on index
function showSlide(n) {
    showSlides(slideIndex = n);
}

// Display the correct slide and dot
function showSlides(n) {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Hide all slides
    slides.forEach(slide => slide.style.display = "none");

    // Remove 'active' from all dots
    dots.forEach(dot => dot.classList.remove("active"));

    // Show current slide and activate the corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}

// Automatically change slide every 5 seconds
setInterval(() => {
    showSlides(++slideIndex);
}, 5000);


// ----- Navbar Auto-Hide on Scroll -----
let lastScrollTop = 0;
let scrollTimeout;
const navbar = document.querySelector('.navbar');

// Delays hiding navbar after scrolling stops
function hideNavbarAfterDelay() {
    clearTimeout(scrollTimeout);

    const homeSection = document.getElementById("home");
    const homeRect = homeSection.getBoundingClientRect();
    const isHomeVisible = homeRect.top < window.innerHeight && homeRect.bottom > 0;
    
    // Keep navbar visible when home section is in view
    if (isHomeVisible) {
        navbar.classList.remove('hidden');
        return;
    }
    // Hide navbar after 2 seconds of inactivity
    scrollTimeout = setTimeout(() => {
        navbar.classList.add('hidden');
    }, 2050);
}

// Show navbar on scroll, then hide it after delay
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    navbar.classList.remove('hidden');
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    hideNavbarAfterDelay();
});


// ----- Smooth Scrolling to Sections -----
document.querySelectorAll('.nav-links li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        // If the "Home" link is clicked, scroll to the top of the page
        if (targetId === "home") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.location.hash = "#home"; // Update the URL hash to #home
        } else {
            // Scroll to the specific section
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            window.location.hash = `#${targetId}`; // Update the URL hash for the clicked section
        }
    });
});




// ----- Section Highlighting with IntersectionObserver -----

const observerOptions = {
    threshold: 0.6 // Trigger when 60% of section is visible
};

const navLinks = document.querySelectorAll('.nav-links li a');

// Observe section visibility
const observer = new IntersectionObserver((entries) => {
    let visibleEntry = null;

    // Find the section that's currently visible
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            visibleEntry = entry;
        }
    });

    // Highlight the corresponding nav link
    if (visibleEntry) {
        const id = visibleEntry.target.id;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    }

    // Special case: highlight only "Contact" when scrolled to bottom
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5;
    if (isAtBottom) {
        navLinks.forEach(link => link.classList.remove('active'));
        const contactLink = document.querySelector('a[href="#contact"]');
        if (contactLink) contactLink.classList.add('active');
    }
}, observerOptions);

// Start observing all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


// ----- Modal Logic for Gallery Images -----

// Open image modal
function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
}

// Close modal when clicking outside the image
function closeModal(event) {
    const modalContent = document.getElementById("modalImage");
    if (event.target === modalContent) return;
    document.getElementById("imageModal").style.display = "none";
}


// ----- Toggle Gallery (See More / Collapse) -----

function toggleGallery() {
    const extraItems = document.querySelectorAll('.extra-gallery-item');
    const toggleButton = document.getElementById('toggleGallery');
    const isVisible = extraItems[0]?.style.display === "block";

    // Hide extra items
    if (isVisible) {
        extraItems.forEach(item => {
            item.style.display = "none";
            item.style.opacity = "0";
        });
        toggleButton.innerHTML = "See More";
    } 
    // Show extra items with fade effect
    else {
        extraItems.forEach(item => {
            item.style.display = "block";
            setTimeout(() => {
                item.style.opacity = "1";
            }, 10);
        });
        toggleButton.innerHTML = "Collapse";
    }
}


// ----- Set Initial Active Link on Page Load -----
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash || "#home";
    const initialLink = document.querySelector(`.nav-links a[href="${hash}"]`);
    if (initialLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        initialLink.classList.add('active');
    }
});
