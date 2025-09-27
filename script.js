// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMenuBar();
    initMobileMenu();
    initSmoothScrolling();
    initNavbarScroll();
    initActiveLinkDetection();
    initAnimatedCounters();
    initContactForm();
    initScrollAnimations();
    initReviewSlider();
    initThemeToggle();
    initMobileEnhancements();
    initProfileImage();
    initSkillBars();
    initModernHero();
    initResponsiveEnhancements();
    initEnhancedAboutSection();
});

// Professional Menu Bar Functionality
function initMenuBar() {
    const menuBar = document.querySelector('.menu-bar');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileClose = document.getElementById('mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        const isActive = menuToggle.classList.contains('active');
        
        if (!isActive) {
            // Open mobile menu
            menuToggle.classList.add('active');
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            body.classList.add('menu-open');
            body.style.overflow = 'hidden';
        } else {
            // Close mobile menu
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            body.style.overflow = '';
        }
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        body.style.overflow = '';
    }
    
    // Event listeners
    menuToggle.addEventListener('click', toggleMobileMenu);
    mobileClose.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on mobile links
    mobileLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    closeMobileMenu();
                    
                    // Scroll to target
                    setTimeout(() => {
                        const headerOffset = 80;
                        const elementPosition = target.offsetTop;
                        const offsetPosition = elementPosition - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// Enhanced Mobile Menu Toggle
function initMobileMenu() {
    // This function is now handled by initMenuBar
    // Keeping it for backward compatibility
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const menuBar = document.querySelector('.menu-bar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            menuBar.classList.add('scrolled');
        } else {
            menuBar.classList.remove('scrolled');
        }
    });
}

// Enhanced Active Link Detection
function initActiveLinkDetection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const options = {
        threshold: 0.7
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Contact Form Handling
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Validate form
        if (!validateForm(name, email, subject, message)) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function validateForm(name, email, subject, message) {
    // Basic validation
    if (!name.trim()) {
        showNotification('Please enter your name', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!subject.trim()) {
        showNotification('Please enter a subject', 'error');
        return false;
    }
    
    if (!message.trim()) {
        showNotification('Please enter your message', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 4000);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .stat-item, .gig-card, .review-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Review Slider Functionality
let currentReviewIndex = 0;
const reviews = document.querySelectorAll('.review-card');
const indicators = document.querySelectorAll('.indicator');
let reviewInterval;

function initReviewSlider() {
    if (reviews.length === 0) return;
    
    // Start auto-play
    startReviewAutoPlay();
    
    // Pause on hover
    const reviewsContainer = document.querySelector('.reviews-container');
    if (reviewsContainer) {
        reviewsContainer.addEventListener('mouseenter', stopReviewAutoPlay);
        reviewsContainer.addEventListener('mouseleave', startReviewAutoPlay);
    }
}

function showReview(index) {
    // Hide all reviews
    reviews.forEach(review => {
        review.classList.remove('active');
    });
    
    // Remove active state from all indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show current review
    if (reviews[index]) {
        reviews[index].classList.add('active');
    }
    
    // Update indicator
    if (indicators[index]) {
        indicators[index].classList.add('active');
    }
    
    currentReviewIndex = index;
}

function changeReview(direction) {
    let newIndex = currentReviewIndex + direction;
    
    if (newIndex >= reviews.length) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = reviews.length - 1;
    }
    
    showReview(newIndex);
    
    // Restart auto-play
    stopReviewAutoPlay();
    startReviewAutoPlay();
}

function currentReview(index) {
    showReview(index - 1);
    
    // Restart auto-play
    stopReviewAutoPlay();
    startReviewAutoPlay();
}

function startReviewAutoPlay() {
    reviewInterval = setInterval(() => {
        changeReview(1);
    }, 5000); // Change review every 5 seconds
}

function stopReviewAutoPlay() {
    if (reviewInterval) {
        clearInterval(reviewInterval);
    }
}

// Make functions globally available for onclick handlers
window.changeReview = changeReview;
window.currentReview = currentReview;

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    // Get theme from localStorage or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Save the default dark theme if no preference exists
    if (!localStorage.getItem('theme')) {
        localStorage.setItem('theme', 'dark');
    }
    
    // Update toggle icon based on current theme
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply theme with smooth transition
        document.documentElement.style.transition = 'all 0.3s ease';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        updateThemeIcon(newTheme);
        
        // Show theme change notification
        showNotification(
            `Switched to ${newTheme} theme`,
            'info'
        );
        
        // Remove transition after animation completes
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.theme-toggle i');
    if (!themeToggle) return;
    
    if (theme === 'dark') {
        themeToggle.className = 'fas fa-sun';
    } else {
        themeToggle.className = 'fas fa-moon';
    }
}

// Performance optimization: Lazy load images when they're added
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could implement error reporting here
});

// Console welcome message
console.log('%c👋 Welcome to Nazmul Sakib\'s portfolio!', 'color: #4f46e5; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore the code and reach out if you have any questions!', 'color: #6b7280; font-size: 14px;');

// Mobile Enhancements
function initMobileEnhancements() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Prevent zoom on input focus (iOS)
        const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                document.querySelector('meta[name="viewport"]').setAttribute('content', 
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
            });
            
            input.addEventListener('blur', function() {
                document.querySelector('meta[name="viewport"]').setAttribute('content', 
                    'width=device-width, initial-scale=1.0');
            });
        });
        
        // Optimize scroll performance on mobile
        let ticking = false;
        function updateScrolling() {
            // Throttle scroll events
            ticking = false;
        }
        
        document.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateScrolling);
                ticking = true;
            }
        }, { passive: true });
        
        // Touch-friendly hover effects
        const interactiveElements = document.querySelectorAll('.btn, .nav-link, .hero-social-link, .project-card');
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 300);
            }, { passive: true });
        });
        
        // Improve mobile menu accessibility
        const mobileMenuToggle = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileMenuToggle && navMenu) {
            // Add ARIA attributes
            mobileMenuToggle.setAttribute('aria-label', 'Toggle navigation menu');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            navMenu.setAttribute('aria-hidden', 'true');
            
            // Update ARIA attributes when menu toggles
            const originalToggle = mobileMenuToggle.onclick;
            mobileMenuToggle.addEventListener('click', function() {
                const isExpanded = navMenu.classList.contains('active');
                mobileMenuToggle.setAttribute('aria-expanded', isExpanded.toString());
                navMenu.setAttribute('aria-hidden', (!isExpanded).toString());
            });
        }
        
        // Mobile-specific orientation handling
        function handleOrientationChange() {
            // Hide mobile menu on orientation change
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                navMenu.setAttribute('aria-hidden', 'true');
            }
            
            // Recalculate heights after orientation change
            setTimeout(() => {
                window.scrollTo(0, window.scrollY);
            }, 100);
        }
        
        window.addEventListener('orientationchange', handleOrientationChange);
        
        // Optimize images for mobile (if you add images later)
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add loading="lazy" for better mobile performance
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
    
    // Enhanced touch swipe support for review slider
    const reviewsContainer = document.querySelector('.reviews-container');
    if (reviewsContainer) {
        let startX = 0;
        let startY = 0;
        let moved = false;
        
        reviewsContainer.addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            moved = false;
        }, { passive: true });
        
        reviewsContainer.addEventListener('touchmove', function(e) {
            moved = true;
        }, { passive: true });
        
        reviewsContainer.addEventListener('touchend', function(e) {
            if (!moved) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const deltaX = startX - endX;
            const deltaY = startY - endY;
            
            // Check if horizontal swipe is dominant
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    // Swipe left - next review
                    changeReview(1);
                } else {
                    // Swipe right - previous review
                    changeReview(-1);
                }
            }
        }, { passive: true });
    }
    
    // Mobile performance optimizations
    if ('serviceWorker' in navigator && isMobile) {
        // Register service worker for better mobile performance
        // This would be implemented if you want to add PWA features
    }
    
    // Add mobile-specific CSS class for enhanced mobile styling
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile-layout');
    }
    
    // Handle window resize for responsive adjustments
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth <= 768) {
                document.body.classList.add('mobile-layout');
            } else {
                document.body.classList.remove('mobile-layout');
            }
        }, 250);
    });
}

// Profile Image Handling
function initProfileImage() {
    const profilePhoto = document.querySelector('.profile-photo');
    const profileIcon = document.querySelector('.profile-img i');
    
    if (profilePhoto) {
        // Add loading animation
        profilePhoto.style.opacity = '0';
        profilePhoto.style.transform = 'scale(0.8)';
        
        profilePhoto.addEventListener('load', function() {
            // Hide icon when image loads successfully
            if (profileIcon) {
                profileIcon.style.display = 'none';
            }
            
            // Animate image in
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        profilePhoto.addEventListener('error', function() {
            // Show icon if image fails to load
            if (profileIcon) {
                profileIcon.style.display = 'block';
            }
            
            // Hide the image element
            this.style.display = 'none';
            
            console.warn('Profile image failed to load. Falling back to icon.');
        });
        
        // Add fade-in animation with CSS transition
        profilePhoto.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    }
}

// Enhanced Skill Bars Animation with Modern Features
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Enhanced skill bar animation
                const skillBar = entry.target.querySelector('.skill-bar');
                if (skillBar) {
                    const level = skillBar.getAttribute('data-level');
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 150;
                    
                    setTimeout(() => {
                        skillBar.style.transition = 'width 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                        skillBar.style.width = level + '%';
                        
                        // Show percentage after animation
                        const percentage = entry.target.querySelector('.skill-percentage');
                        if (percentage) {
                            setTimeout(() => {
                                percentage.style.opacity = '1';
                            }, 1800);
                        }
                    }, delay);
                }
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });
    
    skillItems.forEach(item => {
        skillObserver.observe(item);
        
        // Enhanced hover interactions
        item.addEventListener('mouseenter', function() {
            // Show detailed tooltip
            const tooltip = this.querySelector('.skill-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
                tooltip.style.transform = 'translateX(-50%) translateY(-8px)';
            }
            
            // Show percentage
            const percentage = this.querySelector('.skill-percentage');
            if (percentage) {
                percentage.style.opacity = '1';
            }
            
            // Add interactive sound effect (optional)
            if (window.AudioContext || window.webkitAudioContext) {
                playHoverSound();
            }
        });
        
        item.addEventListener('mouseleave', function() {
            // Hide tooltip
            const tooltip = this.querySelector('.skill-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                tooltip.style.transform = 'translateX(-50%) translateY(0)';
            }
            
            // Hide percentage if not animated yet
            const percentage = this.querySelector('.skill-percentage');
            if (percentage && !this.classList.contains('animate')) {
                percentage.style.opacity = '0';
            }
        });
        
        // Add click interaction for mobile
        item.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Toggle tooltip visibility on mobile
            const tooltip = this.querySelector('.skill-tooltip');
            if (tooltip) {
                const isVisible = tooltip.style.opacity === '1';
                tooltip.style.opacity = isVisible ? '0' : '1';
                tooltip.style.visibility = isVisible ? 'hidden' : 'visible';
            }
        });
    });
    
    // Enhanced category animations
    const skillCategories = document.querySelectorAll('.skill-category');
    const categoryObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
                categoryObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    skillCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        categoryObserver.observe(category);
    });
}

// Enhanced About Section Stats Animation
function initAboutStats() {
    const statItems = document.querySelectorAll('.stat-item');
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stat cards
                const statItem = entry.target;
                const delay = Array.from(statItem.parentNode.children).indexOf(statItem) * 200;
                
                setTimeout(() => {
                    statItem.style.opacity = '1';
                    statItem.style.transform = 'translateY(0)';
                }, delay);
                
                // Animate numbers
                const statNumber = statItem.querySelector('.stat-number');
                if (statNumber) {
                    animateStatNumber(statNumber, delay + 300);
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    // Initial setup
    statItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        statsObserver.observe(item);
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.stat-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
}

function animateStatNumber(element, delay = 0) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    setTimeout(() => {
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }, delay);
}

// Enhanced About Section Intro Animation
function initAboutIntro() {
    const introCard = document.querySelector('.intro-card');
    const journeySection = document.querySelector('.professional-journey');
    
    if (introCard) {
        const introObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    introObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        introCard.style.opacity = '0';
        introCard.style.transform = 'translateY(40px) scale(0.95)';
        introCard.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        introObserver.observe(introCard);
    }
    
    if (journeySection) {
        const journeyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    journeyObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        journeySection.style.opacity = '0';
        journeySection.style.transform = 'translateX(-30px)';
        journeySection.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s';
        journeyObserver.observe(journeySection);
    }
}

// Optional: Simple hover sound effect
function playHoverSound() {
    if (typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined') {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.01, audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Silently fail if audio context is not available
        }
    }
}

// Enhanced About Section Initialization
function initEnhancedAboutSection() {
    initAboutIntro();
    initAboutStats();
    
    // Add section tag animation
    const sectionTag = document.querySelector('.section-tag');
    if (sectionTag) {
        const tagObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    tagObserver.unobserve(entry.target);
                }
            });
        });
        
        sectionTag.style.opacity = '0';
        sectionTag.style.transform = 'translateY(-20px) scale(0.9)';
        sectionTag.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        tagObserver.observe(sectionTag);
    }
    
    // Initialize CTA button animations
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach((button, index) => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(0)';
            }
        });
    });
}

// Modern Hero Section Enhancements
function initModernHero() {
    initScrollIndicator();
    initHeroAnimations();
    initParticleAnimation();
    initMobileOptimizations();
    initAdvancedHeroFeatures();
    initTypingEffect();
    initTextCycleAnimation();
    initInteractiveElements();
    addAdvancedStyles();
}

// Advanced Hero Features
function initAdvancedHeroFeatures() {
    initTitleWordAnimations();
    initButtonRippleEffects();
    initProfileInteractions();
    initParallaxEffects();
    initMouseTrackingEffects();
}

// Title Word Animations
function initTitleWordAnimations() {
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        // Add staggered entrance animation
        word.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover effect with split text animation
        word.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.textShadow = '0 4px 8px rgba(0,0,0,0.3)';
        });
        
        word.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.textShadow = 'none';
        });
    });
}

// Button Ripple Effects
function initButtonRippleEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = this.querySelector('.btn-ripple');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            ripple.classList.remove('animate');
            ripple.offsetWidth; // Force reflow
            ripple.classList.add('animate');
        });
    });
}

// Profile Interactions
function initProfileInteractions() {
    const profilePhoto = document.querySelector('.profile-photo');
    const profileCard = document.querySelector('.profile-card');
    
    if (profilePhoto && profileCard) {
        // Add magnetic effect
        profileCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const tiltX = (y / rect.height) * 10;
            const tiltY = (x / rect.width) * 10;
            
            this.style.transform = `perspective(1000px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg) translateY(-12px) scale(1.02)`;
        });
        
        profileCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
        });
        
        // Add click interaction
        profilePhoto.addEventListener('click', function() {
            this.style.animation = 'profilePulse 0.6s ease-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }
}

// Parallax Effects
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    const particles = document.querySelector('.hero-particles');
    const meshGradient = document.querySelector('.hero-mesh-gradient');
    const floatingElements = document.querySelectorAll('.floating-shape');
    
    if (hero) {
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            const scrollPercent = scrolled / heroHeight;
            
            if (scrollPercent <= 1) {
                // Parallax for particles
                if (particles) {
                    particles.style.transform = `translateY(${scrolled * 0.3}px)`;
                }
                
                // Parallax for mesh gradient
                if (meshGradient) {
                    meshGradient.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrollPercent * 0.1})`;
                }
                
                // Parallax for floating elements
                floatingElements.forEach((element, index) => {
                    const speed = 0.2 + (index * 0.1);
                    element.style.transform += ` translateY(${scrolled * speed}px)`;
                });
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }
}

// Mouse Tracking Effects
function initMouseTrackingEffects() {
    const hero = document.querySelector('.hero');
    const decorationElements = document.querySelectorAll('.decoration-circle, .decoration-shape');
    
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            // Move floating elements based on mouse position
            decorationElements.forEach((element, index) => {
                const speed = 10 + (index * 5);
                const xOffset = (x - 0.5) * speed;
                const yOffset = (y - 0.5) * speed;
                
                element.style.transform += ` translate(${xOffset}px, ${yOffset}px)`;
            });
        });
        
        hero.addEventListener('mouseleave', function() {
            decorationElements.forEach(element => {
                element.style.transform = element.style.transform.replace(/translate\([^)]*\)/g, '');
            });
        });
    }
}

// Typing Effect for Description
function initTypingEffect() {
    const description = document.querySelector('.hero-description');
    const cursor = document.querySelector('.description-cursor');
    
    if (description && cursor) {
        const text = description.textContent;
        description.textContent = '';
        cursor.style.opacity = '1';
        
        let index = 0;
        const typeSpeed = 30;
        
        function typeText() {
            if (index < text.length) {
                description.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, typeSpeed);
            } else {
                // Hide cursor after typing is complete
                setTimeout(() => {
                    cursor.style.opacity = '0';
                }, 2000);
            }
        }
        
        // Start typing effect after other animations
        setTimeout(typeText, 2500);
    }
}

// Text Cycle Animation
function initTextCycleAnimation() {
    const textItems = document.querySelectorAll('.text-cycle-item');
    
    if (textItems.length === 0) return;
    
    let currentIndex = 0;
    let animationInterval;
    
    function cycleText() {
        // Remove active and exit classes from all items
        textItems.forEach(item => {
            item.classList.remove('active', 'exit');
        });
        
        // Add exit class to current item
        if (textItems[currentIndex]) {
            textItems[currentIndex].classList.add('exit');
        }
        
        // Move to next item
        currentIndex = (currentIndex + 1) % textItems.length;
        
        // Add active class to new item after transition
        setTimeout(() => {
            textItems[currentIndex].classList.add('active');
        }, 400);
    }
    
    function startTextCycle() {
        // Start cycling after initial load
        setTimeout(() => {
            animationInterval = setInterval(cycleText, 3000); // Change every 3 seconds
        }, 3000); // Initial delay
    }
    
    function stopTextCycle() {
        if (animationInterval) {
            clearInterval(animationInterval);
        }
    }
    
    // Initialize with first item active
    if (textItems[0]) {
        textItems[0].classList.add('active');
    }
    
    startTextCycle();
    
    // Pause animation on hover
    const textContainer = document.querySelector('.text-cycle-container');
    if (textContainer) {
        textContainer.addEventListener('mouseenter', stopTextCycle);
        textContainer.addEventListener('mouseleave', startTextCycle);
        
        // Add click interaction for manual cycling
        textContainer.addEventListener('click', function() {
            stopTextCycle();
            cycleText();
            // Restart auto-cycle after manual interaction
            setTimeout(startTextCycle, 1000);
        });
    }
    
    // Accessibility: Pause animation when page is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            stopTextCycle();
        } else {
            startTextCycle();
        }
    });
    
    // Performance optimization: Pause when out of viewport
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTextCycle();
                } else {
                    stopTextCycle();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(heroSection);
    }
}

// Interactive Elements
function initInteractiveElements() {
    initBadgeInteractions();
    initStatsAnimations();
    initSocialLinkEffects();
}

// Badge Interactions
function initBadgeInteractions() {
    const badge = document.querySelector('.hero-badge');
    
    if (badge) {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
}

// Enhanced Stats Animations
function initStatsAnimations() {
    const statItems = document.querySelectorAll('.hero-stats .stat-item');
    
    // Add intersection observer for animation trigger
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const target = parseInt(statNumber.getAttribute('data-target'));
                
                animateCountUp(statNumber, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });
    
    statItems.forEach(item => {
        observer.observe(item);
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            this.querySelector('.stat-icon').style.transform = 'scale(1.2) translateY(-3px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.stat-icon').style.transform = 'scale(1) translateY(0)';
        });
    });
}

// Enhanced Count Up Animation
function animateCountUp(element, target) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
            
            // Add completion effect
            element.style.transform = 'scale(1.1)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Social Link Effects
function initSocialLinkEffects() {
    const socialLinks = document.querySelectorAll('.hero-social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 0 30px rgba(79, 70, 229, 0.5)';
            
            // Animate other links
            socialLinks.forEach(otherLink => {
                if (otherLink !== this) {
                    otherLink.style.opacity = '0.6';
                    otherLink.style.transform = 'scale(0.9)';
                }
            });
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
            
            // Reset other links
            socialLinks.forEach(otherLink => {
                otherLink.style.opacity = '1';
                otherLink.style.transform = 'scale(1)';
            });
        });
    });
}

// Add CSS for new animations
function addAdvancedStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes profilePulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .btn-ripple.animate {
            animation: ripple 0.6s linear;
        }
        
        .title-word {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .stat-icon {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .hero-social-link {
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .floating-shape {
            transition: transform 0.1s ease-out;
        }
        
        .decoration-circle,
        .decoration-shape {
            transition: transform 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);
}

// Mobile-Specific Optimizations
function initMobileOptimizations() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Add mobile class to body
        document.body.classList.add('mobile-device');
        
        // Optimize viewport for mobile
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            document.head.appendChild(viewport);
        }
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        
        // Optimize hero stats layout on very small screens
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats && window.innerWidth <= 320) {
            heroStats.style.flexDirection = 'column';
            heroStats.style.gap = '0.8rem';
        }
        
        // Optimize text slider for mobile performance
        const textSlider = document.querySelector('.hero-text-slider');
        if (textSlider) {
            // Reduce animation frequency on mobile for better performance
            const sliderContainer = textSlider.querySelector('.slider-container');
            if (sliderContainer) {
                sliderContainer.style.willChange = 'transform';
            }
        }
        
        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                // Recalculate hero height on orientation change
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.minHeight = window.innerHeight + 'px';
                }
                
                // Adjust stats layout
                if (heroStats) {
                    if (window.innerWidth <= 480) {
                        heroStats.style.flexDirection = 'column';
                    } else {
                        heroStats.style.flexDirection = 'row';
                    }
                }
            }, 100);
        });
        
        // Improve touch responsiveness
        const touchElements = document.querySelectorAll('.btn, .hero-social-link, .indicator');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
        });
        
        // Optimize scroll performance on mobile
        let ticking = false;
        function updateOnScroll() {
            // Throttle scroll events for better performance
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Update scroll-dependent elements
                    const scrollIndicator = document.querySelector('.scroll-indicator');
                    if (scrollIndicator) {
                        const heroHeight = document.querySelector('.hero').offsetHeight;
                        const scrolled = window.pageYOffset;
                        
                        if (scrolled > heroHeight * 0.3) {
                            scrollIndicator.style.opacity = '0';
                        } else {
                            scrollIndicator.style.opacity = '1';
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', updateOnScroll, { passive: true });
    }
    
    // Handle window resize for responsive adjustments
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Adjust layout based on new dimensions
            const heroStats = document.querySelector('.hero-stats');
            if (heroStats) {
                if (window.innerWidth <= 480) {
                    heroStats.style.flexDirection = 'column';
                    heroStats.style.gap = '0.8rem';
                } else if (window.innerWidth <= 768) {
                    heroStats.style.flexDirection = 'row';
                    heroStats.style.gap = '1rem';
                } else {
                    heroStats.style.flexDirection = 'row';
                    heroStats.style.gap = '2rem';
                }
            }
            
            // Adjust text slider size according to standards
            const sliderContainer = document.querySelector('.slider-container');
            if (sliderContainer) {
                if (window.innerWidth <= 320) {
                    sliderContainer.style.height = '50px'; // Very small mobile
                } else if (window.innerWidth <= 480) {
                    sliderContainer.style.height = '55px'; // Small mobile  
                } else if (window.innerWidth <= 768) {
                    sliderContainer.style.height = '60px'; // Mobile standard
                } else if (window.innerWidth <= 1024) {
                    sliderContainer.style.height = '70px'; // Tablet standard
                } else {
                    sliderContainer.style.height = '80px'; // Desktop standard
                }
            }
        }, 250);
    });
}

// Enhanced Scroll Indicator Functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const scrollContainer = document.querySelector('.scroll-container');
    const aboutSection = document.querySelector('#about');
    
    if (scrollIndicator && aboutSection) {
        // Enhanced click functionality
        scrollContainer.addEventListener('click', () => {
            // Add click animation
            scrollContainer.style.transform = 'translateY(-8px) scale(0.95)';
            setTimeout(() => {
                scrollContainer.style.transform = 'translateY(-4px) scale(1)';
            }, 150);
            
            // Smooth scroll to about section
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
        
        // Enhanced scroll-based visibility
        let ticking = false;
        function updateScrollIndicator() {
            const heroHeight = document.querySelector('.hero').offsetHeight;
            const scrolled = window.scrollY;
            const scrollPercent = scrolled / (heroHeight * 0.7);
            
            if (scrollPercent > 1) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
                scrollIndicator.style.transform = 'translateX(-50%) translateY(20px)';
            } else {
                scrollIndicator.style.opacity = `${1 - scrollPercent}`;
                scrollIndicator.style.pointerEvents = 'auto';
                scrollIndicator.style.transform = `translateX(-50%) translateY(${scrollPercent * 10}px)`;
            }
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollIndicator);
                ticking = true;
            }
        }, { passive: true });
        
        // Add keyboard accessibility
        scrollContainer.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
        
        // Make focusable for keyboard navigation
        scrollContainer.setAttribute('tabindex', '0');
        scrollContainer.setAttribute('role', 'button');
        scrollContainer.setAttribute('aria-label', 'Scroll to about section');
    }
}

// Enhanced Hero Animations
function initHeroAnimations() {
    // Animate hero stats on scroll
    const heroStats = document.querySelectorAll('.hero-stats .stat-number');
    const options = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateHeroStat(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    heroStats.forEach(stat => {
        observer.observe(stat);
    });
    
    // Add hover effects to decorative elements
    const decorationElements = document.querySelectorAll('.decoration-circle, .decoration-shape');
    decorationElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform += ' scale(1.2)';
            element.style.opacity = '0.3';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = element.style.transform.replace(' scale(1.2)', '');
            element.style.opacity = '0.1';
        });
    });
}

// Animate Hero Stats
function animateHeroStat(element) {
    const text = element.textContent;
    const number = parseInt(text.replace('+', ''));
    const duration = 1500;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Particle Animation Enhancement
function initParticleAnimation() {
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroParticles) {
        // Add mouse movement effect to particles
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            heroParticles.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        // Add scroll parallax effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            heroParticles.style.transform += ` translateY(${parallax}px)`;
        });
    }
}

// Enhanced Button Interactions
function initEnhancedButtons() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform += ' scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = button.style.transform.replace(' scale(1.05)', '');
        });
        
        // Add ripple effect on click
        button.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation keyframes via JavaScript
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize enhanced button effects
document.addEventListener('DOMContentLoaded', () => {
    addRippleAnimation();
    initEnhancedButtons();
});

// Comprehensive Responsive Enhancements
function initResponsiveEnhancements() {
    // Mobile Detection and Optimization
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768 && window.innerWidth <= 1024;
    
    if (isMobile || isTablet) {
        document.body.classList.add('mobile-device');
        
        // Optimize viewport for better mobile experience
        optimizeViewport();
        
        // Initialize touch enhancements
        initTouchEnhancements();
        
        // Optimize image loading
        initLazyLoading();
        
        // Enhanced scroll performance
        initOptimizedScrolling();
    }
    
    // Universal responsive features
    initResponsiveNavigation();
    initResponsiveGrids();
    initResponsiveImages();
    initAccessibilityEnhancements();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            handleWindowResize();
        }, 250);
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            handleOrientationChange();
        }, 100);
    });
}

// Optimize Viewport
function optimizeViewport() {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
    }
    viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
}

// Touch Enhancements
function initTouchEnhancements() {
    // Add touch feedback to interactive elements
    const touchElements = document.querySelectorAll('.btn, .hero-social-link, .indicator, .nav-link, .project-card, .gig-card');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function(e) {
            this.classList.add('touch-active');
        }, { passive: true });
        
        element.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        }, { passive: true });
        
        element.addEventListener('touchcancel', function(e) {
            this.classList.remove('touch-active');
        }, { passive: true });
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Optimized Scrolling
function initOptimizedScrolling() {
    let ticking = false;
    
    function updateOnScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Update scroll-dependent elements
                updateScrollElements();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateOnScroll, { passive: true });
}

function updateScrollElements() {
    const scrolled = window.pageYOffset;
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;
    
    // Update scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (scrolled > heroHeight * 0.3) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    }
    
    // Update navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrolled > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// Responsive Navigation
function initResponsiveNavigation() {
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Responsive Grids
function initResponsiveGrids() {
    const grids = document.querySelectorAll('.projects-grid, .gigs-grid, .skills-grid');
    
    function updateGrids() {
        const screenWidth = window.innerWidth;
        
        grids.forEach(grid => {
            if (screenWidth <= 480) {
                grid.style.gridTemplateColumns = '1fr';
            } else if (screenWidth <= 768) {
                grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
            } else if (screenWidth <= 1024) {
                grid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(350px, 1fr))';
            } else {
                grid.style.gridTemplateColumns = '';
            }
        });
    }
    
    updateGrids();
    window.addEventListener('resize', updateGrids);
}

// Responsive Images
function initResponsiveImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.addEventListener('error', () => {
            img.style.display = 'none';
        });
    });
}

// Accessibility Enhancements
function initAccessibilityEnhancements() {
    // Add focus visible for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('using-keyboard');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
    });
    
    // Improve button accessibility
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            button.setAttribute('aria-label', 'Button');
        }
    });
}

// Handle Window Resize
function handleWindowResize() {
    const screenWidth = window.innerWidth;
    
    // Update hero stats layout
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        if (screenWidth <= 480) {
            heroStats.style.flexDirection = 'column';
        } else {
            heroStats.style.flexDirection = 'row';
        }
    }
    
    // Update text slider size according to standards
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        // Follow text slider sizing standards from memory
        if (screenWidth <= 320) {
            sliderContainer.style.height = '50px'; // Very small mobile
        } else if (screenWidth <= 480) {
            sliderContainer.style.height = '55px'; // Small mobile
        } else if (screenWidth <= 768) {
            sliderContainer.style.height = '60px'; // Mobile standard
        } else if (screenWidth <= 1024) {
            sliderContainer.style.height = '70px'; // Tablet standard
        } else {
            sliderContainer.style.height = '80px'; // Desktop standard
        }
    }
    
    // Update grid layouts
    initResponsiveGrids();
}

// Handle Orientation Change
function handleOrientationChange() {
    // Recalculate hero height
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.minHeight = window.innerHeight + 'px';
    }
    
    // Update layout based on new orientation
    setTimeout(() => {
        handleWindowResize();
    }, 300);
}

// Additional Responsive Enhancements
function addResponsivePolyfills() {
    // Add IntersectionObserver polyfill check
    if (!window.IntersectionObserver) {
        console.warn('IntersectionObserver not supported. Consider adding polyfill.');
    }
    
    // Add ResizeObserver fallback
    if (!window.ResizeObserver) {
        window.ResizeObserver = class {
            constructor(callback) {
                this.callback = callback;
            }
            observe() {}
            unobserve() {}
            disconnect() {}
        };
    }
}

// Enhanced Mobile Performance
function optimizeMobilePerformance() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) {
        document.body.classList.add('low-performance');
    }
    
    // Optimize touch scrolling
    if ('ontouchstart' in window) {
        document.body.style.webkitOverflowScrolling = 'touch';
    }
    
    // Memory management for mobile
    if (navigator.userAgent.includes('Mobile') && navigator.deviceMemory && navigator.deviceMemory < 4) {
        // Reduce particle density for low memory devices
        const particles = document.querySelector('.hero-particles');
        if (particles) {
            particles.style.opacity = '0.5';
        }
    }
}

// Initialize additional responsive features
addResponsivePolyfills();
optimizeMobilePerformance();