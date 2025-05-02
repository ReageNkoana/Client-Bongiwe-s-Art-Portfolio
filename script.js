let slideIndex = 1;
showSlides(slideIndex);

// Show slides based on the given index
function showSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    slides.forEach(slide => slide.style.display = "none");
    dots.forEach(dot => dot.classList.remove("active"));
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active");
}

setInterval(() => {
    showSlides(++slideIndex);
}, 5000); // Change image every 5 seconds

// Function to remove 'active' class from all links and add it to the current link
function setActiveLink() {
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Get the current hash in the URL, and check if it matches any navigation link
    const currentHash = window.location.hash;
    const activeLink = document.querySelector(`a[href="${currentHash}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Function to update active navigation link based on scroll position
function setActiveLinkOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 0 && rect.bottom >= 0) {
            const activeLink = document.querySelector(`a[href="#${section.id}"]`);
            navLinks.forEach(link => link.classList.remove('active'));
            if (activeLink) activeLink.classList.add('active');
        }
    });
}

// Initialize the active link when the page loads
window.addEventListener('DOMContentLoaded', setActiveLink);

// Event listener for hash changes (for navigation links with #)
window.addEventListener('hashchange', setActiveLink);

// Add click event to navigation links to update hash, active link, and scroll to top
document.querySelectorAll('.nav-links li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default behavior of the link
        
        const targetId = this.getAttribute('href').substring(1); // Get the target section ID

        // Update the hash to the respective section
        window.location.hash = `#${targetId}`;

        // Scroll to the top of the page if 'home' is clicked
        if (targetId === "home") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Update active link after clicking
        setActiveLink(); // Ensure active class is set
    });
});

// Detect scrolling and highlight the correct link
window.addEventListener('scroll', setActiveLinkOnScroll);

// Detect section visibility using IntersectionObserver (for better performance)
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        const link = document.querySelector(`a[href="#${entry.target.id}"]`);
        if (entry.isIntersecting) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the section is visible

// Observe each section
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});



// Function to open the modal and display the image
function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    const captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
}

// Function to close the modal
function closeModal(event) {
    // Check if the click is outside the image
    const modalContent = document.getElementById("modalImage");
    if (event.target === modalContent) {
        return; // Do nothing if the click is on the image
    }

    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

// Function to toggle the visibility of additional gallery items
function toggleGallery() {
    const extraItems = document.querySelectorAll('.extra-gallery-item');
    const toggleButton = document.getElementById('toggleGallery');

    // Check the current state of the extra gallery items
    const isVisible = extraItems[0].style.display === "block";

    if (isVisible) {
        // If the images are visible, hide them
        extraItems.forEach(item => {
            item.style.display = "none";
            item.style.opacity = "0";
        });
        toggleButton.innerHTML = "See More";
    } else {
        // If the images are hidden, show them with smooth animation
        extraItems.forEach(item => {
            item.style.display = "block";
            setTimeout(() => {
                item.style.opacity = "1"; // Fade in effect
            }, 10);
        });
        toggleButton.innerHTML = "Collapse";
    }
}
