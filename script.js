// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Portfolio Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearFormErrors();
            
            // Validate form
            const isValid = validateForm();
            
            if (isValid) {
                submitForm();
            }
        });
    }

    // Form Validation Functions
    function validateForm() {
        let isValid = true;
        
        // Name validation
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError('name', 'Nama lengkap wajib diisi');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError('name', 'Nama minimal 2 karakter');
            isValid = false;
        }

        // Email validation
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError('email', 'Email wajib diisi');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError('email', 'Format email tidak valid');
            isValid = false;
        }

        // Phone validation (optional but if filled, must be valid)
        const phone = document.getElementById('phone');
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (phone.value.trim() && !phoneRegex.test(phone.value)) {
            showError('phone', 'Format nomor telepon tidak valid');
            isValid = false;
        }

        // Message validation
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError('message', 'Pesan wajib diisi');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('message', 'Pesan minimal 10 karakter');
            isValid = false;
        }

        return isValid;
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        
        field.style.borderColor = '#ff4444';
    }

    function clearFormErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });

        const formInputs = document.querySelectorAll('.form-input, .form-textarea');
        formInputs.forEach(input => {
            input.style.borderColor = '';
        });
    }

    function submitForm() {
        const submitButton = document.querySelector('.submit-button');
        const originalText = submitButton.textContent;

        // Collect form data
        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const phone = document.getElementById('phone')?.value.trim() || '';
        const message = document.getElementById('message')?.value.trim() || '';

        // Compose message
        const subject = `Kontak Portfolio - ${name || 'Tanpa Nama'}`;
        const bodyLines = [
            `Nama: ${name}`,
            `Email: ${email}`,
            `Telepon: ${phone}`,
            '',
            'Pesan:',
            message
        ];
        const body = bodyLines.join('%0D%0A'); // CRLF for mailto

        // MAILTO
        const mailtoHref = `mailto:fatchurrozaq.pj11@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

        // WHATSAPP
        const waText = [`Halo, saya ${name || ''}.`, '', 'Detail Kontak:', `Email: ${email}`, `Telepon: ${phone}`, '', 'Pesan:', message].join('\n');
        const waHref = `https://wa.me/6289604072195?text=${encodeURIComponent(waText)}`;

        // Loading UI
        submitButton.textContent = 'Mengirim...';
        submitButton.disabled = true;

        // Open channels
        try {
            window.open(mailtoHref, '_blank');
            window.open(waHref, '_blank');
        } catch (err) {
            console.error('Failed to open mail/whatsapp:', err);
        }

        // Feedback
        showSuccessMessage();
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }

    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <div style="
                background-color: #4CAF50;
                color: white;
                padding: 1rem;
                border-radius: 5px;
                margin-bottom: 1rem;
                text-align: center;
                font-weight: 500;
            ">
                ✅ Pesan berhasil dikirim! Saya akan menghubungi Anda segera.
            </div>
        `;
        
        // Insert before form
        contactForm.parentNode.insertBefore(successMessage, contactForm);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }

    // Scroll to section function (for CTA button)
    window.scrollToSection = function(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Back to top visibility
        if (backToTopBtn) {
            if (scrollTop > 300) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        }

        lastScrollTop = scrollTop;
    });

    // Back to Top click
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Video lazy loading
    const videos = document.querySelectorAll('video[data-src]');
    const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                video.src = video.getAttribute('data-src');
                video.removeAttribute('data-src');
                videoObserver.unobserve(video);
            }
        });
    });

    videos.forEach(video => {
        videoObserver.observe(video);
    });

    // Portfolio video hover effects
    const portfolioVideos = document.querySelectorAll('.portfolio-video');
    portfolioVideos.forEach(video => {
        video.addEventListener('mouseenter', function() {
            this.play();
        });
        
        video.addEventListener('mouseleave', function() {
            this.pause();
        });
    });

    // Social media link tracking (for analytics)
    const socialLinks = document.querySelectorAll('.social-link, .footer-social a');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.textContent.trim();
            console.log(`Social media clicked: ${platform}`);
            // Add analytics tracking here if needed
        });
    });

    // YouTube iframe optimization
    const youtubeIframe = document.querySelector('.youtube-embed iframe');
    if (youtubeIframe) {
        // Add loading attribute for better performance
        youtubeIframe.setAttribute('loading', 'lazy');
        
        // Add click tracking
        youtubeIframe.addEventListener('load', function() {
            console.log('YouTube iframe loaded');
        });
    }

    // Form field real-time validation
    const formFields = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            // Clear error on input
            const errorElement = document.getElementById(this.id + '-error');
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
            this.style.borderColor = '';
        });
    });

    function validateField(field) {
        const fieldId = field.id;
        const value = field.value.trim();
        
        switch (fieldId) {
            case 'name':
                if (value && value.length < 2) {
                    showError(fieldId, 'Nama minimal 2 karakter');
                }
                break;
            case 'email':
                if (value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        showError(fieldId, 'Format email tidak valid');
                    }
                }
                break;
            case 'phone':
                if (value) {
                    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
                    if (!phoneRegex.test(value)) {
                        showError(fieldId, 'Format nomor telepon tidak valid');
                    }
                }
                break;
            case 'message':
                if (value && value.length < 10) {
                    showError(fieldId, 'Pesan minimal 10 karakter');
                }
                break;
        }
    }

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function() {
            // Scroll-based animations or effects
        }, 10);
    });

    // Accessibility improvements
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Focus management for mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                // Focus first menu item when opening
                const firstMenuItem = navMenu.querySelector('.nav-link');
                if (firstMenuItem) {
                    firstMenuItem.focus();
                }
            }
        });
    }

    console.log('Website loaded successfully!');
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .header {
        transition: transform 0.3s ease;
    }
    
    .success-message {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(style);
