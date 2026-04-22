/**
 * Pruek-pruek Portfolio - Main JavaScript
 * 
 * Features:
 * - Theme switching (dark/light mode)
 * - Smooth scrolling navigation
 * - Active navigation highlighting
 * - Project filtering
 * - Mobile navigation toggle
 * - Form handling
 * - Accessibility improvements
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTheme();
    initNavigation();
    initProjectFilter();
    initForm();
    initCurrentYear();
    initMediaCards();
    initProjectToggle();
    initCarousels();
    
    // Add keyboard navigation support
    initKeyboardNavigation();
    
    // Log initialization
    console.log('Portfolio initialized successfully');
});

/**
 * Theme Management
 */
function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // Get saved theme or default to system preference
    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('portfolio-theme', 'dark');
    }
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            
            // Announce theme change for screen readers
            announceThemeChange(newTheme);
        });
        
        // Add keyboard support
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
}

function announceThemeChange(theme) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = `Switched to ${theme} theme`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Navigation Management
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Mobile navigation toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle body scroll lock
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') && 
                !navToggle.contains(event.target) && 
                !navMenu.contains(event.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (navToggle && navMenu && navMenu.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        navToggle.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = '';
                    }
                    
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Active navigation highlighting on scroll
    function updateActiveNav() {
        let currentSection = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll events for performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                updateActiveNav();
            }, 100);
        }
    });
    
    // Initial update
    updateActiveNav();
}

/**
 * Project Filtering
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                const categories = category ? category.split(' ') : [];
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    
                    // Add fade-in animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Announce filter change for screen readers
            announceFilterChange(filter);
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

function announceFilterChange(filter) {
    const filterNames = {
        'all': 'All Projects',
        'ai': 'AI Systems',
        'systems': 'System Architecture'
    };
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = `Showing ${filterNames[filter] || filter} projects`;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Form Handling
 */
function initForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Basic validation
        if (!formValues.name || !formValues.email || !formValues.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(formValues.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // In a real implementation, you would send this to a server
        setTimeout(() => {
            console.log('Form submitted:', formValues);
            
            showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            this.reset();
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message--${type}`;
    messageDiv.textContent = message;
    messageDiv.setAttribute('role', 'alert');
    
    // Style the message
    messageDiv.style.padding = 'var(--spacing-md)';
    messageDiv.style.borderRadius = 'var(--radius-md)';
    messageDiv.style.marginTop = 'var(--spacing-md)';
    messageDiv.style.fontWeight = '500';
    
    if (type === 'success') {
        messageDiv.style.backgroundColor = 'rgba(72, 187, 120, 0.1)';
        messageDiv.style.color = 'var(--color-success)';
        messageDiv.style.border = '1px solid rgba(72, 187, 120, 0.3)';
    } else {
        messageDiv.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
        messageDiv.style.color = 'var(--color-error)';
        messageDiv.style.border = '1px solid rgba(220, 53, 69, 0.3)';
    }
    
    // Insert after form
    const form = document.getElementById('contactForm');
    form.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

/**
 * Video Modal System
 */
function initMediaCards() {
    const playButtons = document.querySelectorAll('.play-btn');
    const videoCards = document.querySelectorAll('.video-card');
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const modalTitle = document.getElementById('video-modal-title');
    const modalClose = document.querySelector('.video-modal-close');
    
    // Initialize modal
    if (!modal || !modalVideo) return;
    
    // Function to open modal with video
    function openModal(videoElement, title) {
        // Set video source
        const source = videoElement.querySelector('source');
        if (source) {
            modalVideo.innerHTML = '';
            const newSource = document.createElement('source');
            newSource.src = source.src;
            newSource.type = source.type;
            modalVideo.appendChild(newSource);
        }
        
        // Set poster
        modalVideo.poster = videoElement.poster;
        
        // Set title
        if (title) {
            modalTitle.textContent = title;
        }
        
        // Show modal
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
        
        // Load and play video
        modalVideo.load();
        setTimeout(() => {
            modalVideo.play().catch(e => console.log('Autoplay prevented:', e));
        }, 100);
        
        // Focus close button for accessibility
        setTimeout(() => {
            modalClose.focus();
        }, 200);
    }
    
    // Function to close modal
    function closeModal() {
        modalVideo.pause();
        modalVideo.currentTime = 0;
        modal.hidden = true;
        document.body.style.overflow = '';
    }
    
    // Add click handlers for video play buttons
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.video-card');
            const video = card.querySelector('video');
            const title = card.querySelector('.media-title')?.textContent || 'Video';
            
            if (video) {
                openModal(video, title);
            }
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
        
        modalClose.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeModal();
            }
        });
    }
    
    // Close modal on overlay click
    const modalOverlay = document.querySelector('.video-modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.hidden) {
            closeModal();
        }
    });
    
    // Add hover effects for media cards
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const playBtn = this.querySelector('.play-btn');
            if (playBtn) {
                playBtn.style.transform = 'translate(-50%, -50%) scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const playBtn = this.querySelector('.play-btn');
            if (playBtn) {
                playBtn.style.transform = 'translate(-50%, -50%)';
            }
        });
    });
}

/**
 * Project Toggle Functionality
 */
function initProjectToggle() {
    const toggleButtons = document.querySelectorAll('.project-toggle');
    
    toggleButtons.forEach(button => {
        const targetId = button.getAttribute('aria-controls');
        const target = document.getElementById(targetId);
        
        if (!target) return;
        
        // Set initial state
        button.setAttribute('aria-expanded', 'false');
        target.hidden = true;
        
        // Toggle on click
        button.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;
            
            this.setAttribute('aria-expanded', newState.toString());
            target.hidden = !newState;
            
            // Update button text
            const toggleText = this.querySelector('.toggle-text');
            if (toggleText) {
                toggleText.textContent = newState ? 'Hide Details' : 'View Details';
            }
            
            // Announce for screen readers
            announceToggle(newState, targetId);
        });
        
        // Add keyboard support
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

function announceToggle(isExpanded, targetId) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = isExpanded 
        ? `Project details expanded` 
        : `Project details collapsed`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Carousel Functionality
 */
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const dots = carousel.querySelectorAll('.carousel-dot');
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Function to update carousel position
        function updateCarousel() {
            // Update track position
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
                dot.setAttribute('aria-label', `Go to image ${index + 1}`);
            });
            
            // Update slide aria attributes
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === currentSlide);
                const img = slide.querySelector('img');
                if (img) {
                    if (index === currentSlide) {
                        img.removeAttribute('aria-hidden');
                        img.setAttribute('tabindex', '0');
                    } else {
                        img.setAttribute('aria-hidden', 'true');
                        img.setAttribute('tabindex', '-1');
                    }
                }
            });
            
            // Announce slide change for screen readers
            announceSlideChange(currentSlide + 1, totalSlides);
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        
        // Go to specific slide
        function goToSlide(index) {
            if (index >= 0 && index < totalSlides) {
                currentSlide = index;
                updateCarousel();
            }
        }
        
        // Event listeners for buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
            nextBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    nextSlide();
                }
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
            prevBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    prevSlide();
                }
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    goToSlide(index);
                }
            });
        });
        
        // Keyboard navigation for carousel
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            } else if (e.key >= '1' && e.key <= '9') {
                const num = parseInt(e.key) - 1;
                if (num < totalSlides) {
                    e.preventDefault();
                    goToSlide(num);
                }
            }
        });
        
        // Auto-advance carousel (optional)
        let autoAdvanceInterval;
        function startAutoAdvance() {
            autoAdvanceInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoAdvance() {
            clearInterval(autoAdvanceInterval);
        }
        
        // Start auto-advance on mouse leave, stop on hover
        carousel.addEventListener('mouseenter', stopAutoAdvance);
        carousel.addEventListener('mouseleave', startAutoAdvance);
        
        // Start auto-advance initially
        startAutoAdvance();
        
        // Initialize carousel
        updateCarousel();
    });
}

function announceSlideChange(current, total) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.classList.add('sr-only');
    announcement.textContent = `Image ${current} of ${total}`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Utility Functions
 */
function initCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function initKeyboardNavigation() {
    // Make all interactive elements focusable
    const interactiveElements = document.querySelectorAll(
        'button, a, input, textarea, [tabindex]'
    );
    
    interactiveElements.forEach(element => {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
    });
    
    // Add focus styles for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}

// Add CSS for keyboard navigation
const keyboardStyles = `
    .keyboard-navigation *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = keyboardStyles;
document.head.appendChild(styleSheet);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Portfolio error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfEntries = performance.getEntriesByType('navigation');
            if (perfEntries.length > 0) {
                const navEntry = perfEntries[0];
                console.log('Page loaded in', navEntry.loadEventEnd - navEntry.startTime, 'ms');
            }
        }, 0);
    });
}