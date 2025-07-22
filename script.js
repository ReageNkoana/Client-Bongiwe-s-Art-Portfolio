 // 3D Gallery Functionality
        let isDragging = false;
        let startX;
        let currentRotation = 0;
        const rotationSpeed = 0.5;
        const snapThreshold = 30;
         let currentSection = 1;
        const maxSections = 3;
        const itemsPerSection = 4; // Adjust based on your layout


// ----- Slideshow Logic (Updated for new design) -----
let slideIndex = 1;
showSlides(slideIndex);

function showSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    // Update for new design - uses opacity instead of display
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active");
}

// Auto-advance slides every 5 seconds
setInterval(() => {
    showSlides(++slideIndex);
}, 9000);

// ----- Navbar Auto-Hide on Scroll (Updated) -----
let lastScrollTop = 0;
let scrollTimeout;
const navbar = document.querySelector('.navbar');

function hideNavbarAfterDelay() {
    clearTimeout(scrollTimeout);
    
    const homeSection = document.getElementById("home");
    const homeRect = homeSection.getBoundingClientRect();
    const isHomeVisible = homeRect.top < window.innerHeight && homeRect.bottom > 0;
    
    if (isHomeVisible) {
        navbar.classList.remove('hidden');
        return;
    }
    
    scrollTimeout = setTimeout(() => {
        navbar.classList.add('hidden');
    }, 2100);
}

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > lastScrollTop) {
        // Scrolling down
        navbar.classList.add('hidden');
    } else {
        // Scrolling up
        navbar.classList.remove('hidden');
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    hideNavbarAfterDelay();
});

// ----- Smooth Scrolling to Sections (Updated) -----
document.querySelectorAll('.nav-links li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Calculate the position to scroll to, accounting for navbar height
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            // Use window.scrollTo for smoother animation
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash
            history.pushState(null, null, targetId);
        }
    });
});

// ----- Section Highlighting with IntersectionObserver -----
const observerOptions = {
    threshold: 0.6
};

const navLinks = document.querySelectorAll('.nav-links li a');

const observer = new IntersectionObserver((entries) => {
    let visibleEntry = null;

    entries.forEach(entry => {
        if (entry.isIntersecting) {
            visibleEntry = entry;
        }
    });

    if (visibleEntry) {
        const id = visibleEntry.target.id;
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    }

    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5;
    if (isAtBottom) {
        navLinks.forEach(link => link.classList.remove('active'));
        const contactLink = document.querySelector('a[href="#contact"]');
        if (contactLink) contactLink.classList.add('active');
    }
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ----- Modal Logic for Gallery Images -----
// Artwork data - add all your artworks here
const artworkData = {
    "art1.jpg": {
        title: "Tlhologelo, 2025",
        description: "Mixed collage media on canvas.",
        size: "129\cm x 74.5\cm"
    },
    "art2.jpg": {
        title: "Pelo ya Lapa, 2024",
        description: "Mixed media collage on canvas.",
        size: "52\cm x 59\cm"
    },
    // Add all your artworks following the same pattern
    "art3.jpg": {
        title: "Mamotshabo, 2024",
        description: "Mixed media collage on canvas.",
        size: "64\cm x 70\cm"
    },

    "art4.jpg": {
        title: "Tau,2024",
        description: "Mixed media collage on canvas.",
        size: "89,5\cm x 150,8\cm"
    },
    // Continue for all artworks...



    "art5.jpg": {
        title: "Matsidiso,2024",
        description: "Mixed media collage on canvas.",
        size: "61\cm x 72\cm"
    },
    
    "art6.jpg": {
        title: "Remembering Tau, 2024",
        description: "Mixed media collage on canvas.",
        size: "93\cm x 152,2\cm"
    },


    "art7.jpg": {
        title: "Mma wa Bogale, 2024",
        description: "Mixed media collage on canvas.",
        size: "98\cm x 152,2\cm"
    },

    "art8.jpg": {
        title: "Gae ke Gae, 2024",
        description: "Mixed media collage on canvas.",
        size: "98\cm x 152,2\cm"
    },

    "art9.jpg": {
        title: "Maatla a Mosadi, 2024",
        description: "Mixed media collage on canvas.",
        size: "98\cm x 152,2\cm"
    },

    "art10.jpg": {
        title: "Lapa la Ka, 2024",
        description: "Mixed media collage on canvas.",
        size: "98\cm x 152,2\cm"
    },



};

function openModal(imgElement) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");
    
    // Get filename from src
    const imgSrc = imgElement.src.split('/').pop();
    
    // Set image
    modalImg.src = imgElement.src;
    
    // Set details from artworkData
    const artwork = artworkData[imgSrc] || {
        title: "Untitled Artwork",
        description: "No description available.",
        size: "Size not specified"
    };
    
    document.getElementById("artTitle").textContent = artwork.title;
    document.getElementById("artDescription").textContent = artwork.description;
    document.getElementById("artSize").textContent = `Size: ${artwork.size}`;
    
    // Show modal
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal(event) {
    if (event.target === document.getElementById("imageModal") || 
        event.target.classList.contains("close-btn")) {
        document.getElementById("imageModal").style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// ----- Toggle Gallery (See More / Collapse) -----
function toggleGallery() {
    const extraItems = document.querySelectorAll('.extra-gallery-item');
    const toggleButton = document.getElementById('toggleGallery');
    const isVisible = extraItems[0]?.style.display === "block";

    if (isVisible) {
        extraItems.forEach(item => {
            item.style.display = "none";
            item.style.opacity = "0";
        });
        toggleButton.innerHTML = "See More";
    } else {
        extraItems.forEach(item => {
            item.style.display = "block";
            setTimeout(() => {
                item.style.opacity = "1";
            }, 10);
        });
        toggleButton.innerHTML = "Collapse";
    }
}

// ----- Initial Setup -----
window.addEventListener('DOMContentLoaded', () => {
    // Set initial active link
    const hash = window.location.hash || "#home";
    const initialLink = document.querySelector(`.nav-links a[href="${hash}"]`);
    if (initialLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        initialLink.classList.add('active');
    }
    
    // Initialize animations
    const introContent = document.querySelector('.intro-content');
    if (introContent) {
        introContent.style.opacity = '1';
        introContent.style.transform = 'translateY(0)';
    }
    
    const introP = document.querySelector('.intro p');
    if (introP) {
        setTimeout(() => {
            introP.style.opacity = '1';
        }, 500);
    }
});




//---------------------------------------------------------------Galery


function init3DGallery() {
    const frontWall3d = document.getElementById('frontWall-3d');
    const leftWall3d = document.getElementById('leftWall-3d');
    const rightWall3d = document.getElementById('rightWall-3d');
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        const imgElement = item.querySelector('img');
        const imgSrc = imgElement.src.split('/').pop();
        const artwork = artworkData[imgSrc] || {
            title: "Untitled Artwork",
            description: "No description available.",
            size: "Size not specified"
        };
        
        const artElement = document.createElement('div');
        artElement.className = 'artwork-3d';
        artElement.style.backgroundImage = `url(${imgElement.src})`;
        artElement.innerHTML = `
            <div class="artwork-frame-3d"></div>
          
        `;
        
        artElement.addEventListener('click', () => {
            openModal(imgElement);
        });
                artElement.addEventListener('click', () => {
                    openModal(item.querySelector('img'));
                });
                
                // Distribute artworks to different walls
                if (index % 3 === 0) {
                    frontWall3d.appendChild(artElement);
                } else if (index % 3 === 1) {
                    leftWall3d.appendChild(artElement);
                } else {
                    rightWall3d.appendChild(artElement);
                }
            });
            
            // Mouse/Touch events for rotation
            const threeDGallery = document.getElementById('threeD-gallery');
            threeDGallery.addEventListener('mousedown', startDrag3D);
            threeDGallery.addEventListener('touchstart', startDrag3D);
            threeDGallery.addEventListener('mousemove', drag3D);
            threeDGallery.addEventListener('touchmove', drag3D);
            threeDGallery.addEventListener('mouseup', endDrag3D);
            threeDGallery.addEventListener('touchend', endDrag3D);
            threeDGallery.addEventListener('mouseleave', endDrag3D);
        }
        
        function startDrag3D(e) {
            isDragging = true;
            
            if (e.type === 'mousedown') {
                startX = e.clientX;
            } else {
                startX = e.touches[0].clientX;
            }
        }
        
        function drag3D(e) {
            if (!isDragging) return;
            
            let x;
            if (e.type === 'mousemove') {
                x = e.clientX;
            } else {
                x = e.touches[0].clientX;
                e.preventDefault();
            }
            
            const dx = startX - x;
            currentRotation += dx * rotationSpeed;
            currentRotation = Math.max(-90, Math.min(90, currentRotation));
            
            updateRotation();
            startX = x;
        }
        
        function endDrag3D() {
            if (!isDragging) return;
            isDragging = false;
            
            if (currentRotation > snapThreshold) {
                currentRotation = 90;
            } else if (currentRotation < -snapThreshold) {
                currentRotation = -90;
            } else {
                currentRotation = 0;
            }
            
            updateRotation();
        }
        
        function updateRotation() {
            document.getElementById('gallery-3d-container').style.transform = `rotateY(${currentRotation}deg)`;
        }
        
        // View Toggle Functionality
        function setupViewToggle() {
            const normalViewBtn = document.getElementById('normalViewBtn');
            const threeDViewBtn = document.getElementById('threeDViewBtn');
            const regularGallery = document.getElementById('gallery-container');
            const threeDGallery = document.getElementById('threeD-gallery');
            
            normalViewBtn.addEventListener('click', () => {
                normalViewBtn.classList.add('active');
                threeDViewBtn.classList.remove('active');
                regularGallery.classList.remove('hidden');
                threeDGallery.classList.remove('active');
            });
            
            threeDViewBtn.addEventListener('click', () => {
                threeDViewBtn.classList.add('active');
                normalViewBtn.classList.remove('active');
                regularGallery.classList.add('hidden');
                threeDGallery.classList.add('active');
            });
        }
        
        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {


            
    // Add artwork titles to gallery items (NEW CODE)
    document.querySelectorAll('.gallery-item').forEach(item => {
        const img = item.querySelector('img');
        const imgSrc = img.src.split('/').pop();
        const artwork = artworkData[imgSrc];
        
        if (artwork) {
            const titleElement = document.createElement('div');
            titleElement.className = 'artwork-title';
            titleElement.textContent = artwork.title;
            item.appendChild(titleElement);
        }
    });
            init3DGallery();
            setupViewToggle();
            
            // Your other existing initialization code...
        });


        //--------------------------------about section----------------------------------------------

// Completely revised tab system
function openTab(event, tabId) {
  // Prevent default behavior if it's an anchor tag
  if (event) event.preventDefault();
  
  // Get all tabs and buttons
  const tabs = document.querySelectorAll('.tab-content');
  const buttons = document.querySelectorAll('.tab-button');
  
  // Hide all tab contents
  tabs.forEach(tab => {
    tab.classList.remove('active');
    tab.style.display = 'none';
  });
  
  // Deactivate all buttons
  buttons.forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Show the selected tab
  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.style.display = 'block';
  }
  
  // Activate the clicked button
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active');
  }
  
  // Force the about section to stay visible
  const aboutContainer = document.getElementById('aboutSection');
  if (aboutContainer) {
    aboutContainer.classList.remove('hidden');
    aboutContainer.classList.add('visible');
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function() {
  // Show the default tab
  const defaultTab = document.querySelector('.tab-content.active');
  if (defaultTab) {
    defaultTab.style.display = 'block';
  }
  
  // Set up scroll animation (independent of tab functionality)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  const aboutSection = document.getElementById("aboutSection");
  if (aboutSection) observer.observe(aboutSection);
});