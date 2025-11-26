// ===== MOBILE MENU FUNCTIONALITY =====
class MobileMenu {
  constructor() {
    this.menuBtn = document.querySelector('.mobile-menu-btn');
    this.mobileNav = document.querySelector('.mobile-nav');
    this.navLinks = document.querySelectorAll('.mobile-nav .nav-link');
    this.init();
  }

  init() {
    if (this.menuBtn && this.mobileNav) {
      // Toggle menu
      this.menuBtn.addEventListener('click', () => this.toggleMenu());
      
      // Close menu when clicking nav links
      this.navLinks.forEach(link => {
        link.addEventListener('click', () => this.closeMenu());
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.menuBtn.contains(e.target) && !this.mobileNav.contains(e.target)) {
          this.closeMenu();
        }
      });
    }
  }

  toggleMenu() {
    this.menuBtn.classList.toggle('active');
    this.mobileNav.classList.toggle('active');
  }

  closeMenu() {
    this.menuBtn.classList.remove('active');
    this.mobileNav.classList.remove('active');
  }
}

// ===== NAVBAR SCROLL EFFECT =====
class NavbarScroll {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    });
  }
}

// ===== TESTIMONIAL SLIDER =====
class TestimonialSlider {
  constructor() {
    this.testimonials = document.querySelectorAll('.testimonial-item');
    this.dots = document.querySelectorAll('.nav-dot');
    this.currentIndex = 0;
    this.autoPlayInterval = null;
    this.init();
  }

  init() {
    if (this.testimonials.length === 0) return;

    // Add click listeners to dots
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });

    // Start auto-play
    this.startAutoPlay();

    // Pause on hover
    const wrapper = document.querySelector('.testimonials-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => this.stopAutoPlay());
      wrapper.addEventListener('mouseleave', () => this.startAutoPlay());
    }
  }

  goToSlide(index) {
    // Remove active class from current testimonial and dot
    this.testimonials[this.currentIndex].classList.remove('active');
    this.dots[this.currentIndex].classList.remove('active');

    // Update current index
    this.currentIndex = index;

    // Add active class to new testimonial and dot
    this.testimonials[this.currentIndex].classList.add('active');
    this.dots[this.currentIndex].classList.add('active');
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.goToSlide(nextIndex);
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// ===== SMOOTH SCROLLING =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Don't prevent default for # only links
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, this.observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });

    // Observe stat items
    document.querySelectorAll('.stat-item').forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(item);
    });

    // Observe contact info items
    document.querySelectorAll('.contact-info-item').forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      item.style.transition = `all 0.6s ease ${index * 0.1}s`;
      observer.observe(item);
    });
  }
}

// ===== ANIMATED COUNTERS =====
class AnimatedCounters {
  constructor() {
    this.hasAnimated = false;
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateCounters();
          this.hasAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
      const target = counter.textContent;
      const isPercentage = target.includes('%');
      const numericValue = parseInt(target.replace(/\D/g, ''));
      const duration = 2000;
      const increment = numericValue / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < numericValue) {
          counter.textContent = Math.floor(current) + (isPercentage ? '%' : '+');
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }
}

// ===== CONTACT FORM HANDLING =====
class ContactForm {
  constructor() {
    this.form = document.querySelector('#contactForm');
    this.init();
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    const submitBtn = this.form.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    submitBtn.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Show success state
      submitBtn.textContent = 'Message Sent! ✓';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

      // Reset form
      this.form.reset();

      // Reset button after delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
      }, 3000);
    }, 2000);
  }
}

// ===== BUTTON HOVER EFFECTS =====
function initButtonEffects() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });

    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// ===== PARALLAX EFFECT =====
class ParallaxEffect {
  constructor() {
    this.heroGradient = document.querySelector('.hero-gradient');
    this.init();
  }

  init() {
    if (!this.heroGradient) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        this.heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }
}

// ===== INITIALIZE ALL COMPONENTS =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all classes
  new MobileMenu();
  new NavbarScroll();
  new TestimonialSlider();
  new ScrollAnimations();
  new AnimatedCounters();
  new ContactForm();
  new ParallaxEffect();
  
  // Initialize smooth scrolling
  initSmoothScroll();
  
  // Initialize button effects
  initButtonEffects();

  // Log initialization
  console.log('IT PLUS NG website initialized successfully!');
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
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

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
  // Any additional scroll-based functionality can be added here
}, 10));

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const mobileMenu = document.querySelector('.mobile-nav');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
      menuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  }
});

// Add focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});