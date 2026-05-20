// Professional WildGuard - Advanced Interactive Features & Animations

document.addEventListener('DOMContentLoaded', function() {
  // ===== MOBILE MENU TOGGLE =====
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
      });
    });
  }

  // ===== SMOOTH SCROLL ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== PARALLAX EFFECT =====
  let scrollY = 0;
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  window.addEventListener('scroll', () => {
    scrollY = window.pageYOffset;
    parallaxElements.forEach(el => {
      const speed = el.dataset.parallax || 0.5;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
  });

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.featured-card, .park-card, .news-item, .species-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.95)';
    el.style.transition = 'all 600ms cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(el);
  });

  // ===== SCROLL TO TOP BUTTON =====
  const scrollButton = document.createElement('button');
  scrollButton.textContent = '↑';
  scrollButton.id = 'scrollTopBtn';
  scrollButton.setAttribute('aria-label', 'Scroll to top');
  scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, var(--primary), var(--accent));
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
    cursor: pointer;
    display: none;
    z-index: 90;
    transition: all 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 15px rgba(11, 90, 43, 0.3);
  `;
  document.body.appendChild(scrollButton);

  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    if (window.pageYOffset > 300) {
      scrollButton.style.display = 'flex';
      scrollButton.style.alignItems = 'center';
      scrollButton.style.justifyContent = 'center';
    } else {
      scrollButton.style.display = 'none';
    }
  });

  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  scrollButton.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.15) rotate(180deg)';
    this.style.boxShadow = '0 8px 25px rgba(11, 90, 43, 0.5)';
  });

  scrollButton.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
    this.style.boxShadow = '0 4px 15px rgba(11, 90, 43, 0.3)';
  });

  // ===== DASHBOARD SIDEBAR TOGGLE =====
  const toggleSidebar = document.getElementById('toggleSidebar');
  const sideMenu = document.getElementById('sideMenu');
  if (toggleSidebar && sideMenu) {
    toggleSidebar.addEventListener('click', () => {
      sideMenu.classList.toggle('collapsed');
      toggleSidebar.style.transform = sideMenu.classList.contains('collapsed') ? 'rotate(90deg)' : 'rotate(0)';
    });
  }

  // ===== INTERACTIVE BUTTON EFFECTS =====
  const createRipple = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: rippleAnimation 600ms ease-out;
    `;

    if (!document.querySelector('style[data-ripple]')) {
      const style = document.createElement('style');
      style.setAttribute('data-ripple', '1');
      style.textContent = `
        @keyframes rippleAnimation {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  document.querySelectorAll('.btn, button').forEach(btn => {
    btn.addEventListener('click', createRipple);
  });

  // ===== CAMERA CONTROL HOOKS WITH VISUAL FEEDBACK =====
  const startBtn = document.getElementById('startCamera');
  const stopBtn = document.getElementById('stopCamera');
  
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      startBtn.style.background = 'linear-gradient(135deg, var(--success), var(--success))';
      startBtn.textContent = '⟳ Starting Camera...';
      setTimeout(() => {
        startBtn.textContent = '📹 Camera Running';
        startBtn.style.animation = 'pulse 1s ease-in-out infinite';
      }, 500);
      if (window.startCamera) window.startCamera();
    });
  }
  
  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      stopBtn.style.background = 'linear-gradient(135deg, var(--danger), var(--accent-alt))';
      stopBtn.textContent = '⏹ Stopping...';
      setTimeout(() => {
        stopBtn.textContent = '🔴 Camera Stopped';
        if (startBtn) startBtn.style.animation = 'none';
      }, 500);
      if (window.stopCamera) window.stopCamera();
    });
  }

  // ===== STAGGERED ANIMATION ON PAGE LOAD =====
  window.addEventListener('load', () => {
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach((heading, index) => {
      heading.style.animation = `slideInLeft 0.8s ease ${index * 0.1}s both`;
    });
  });

  // ===== KEYBOARD SHORTCUTS =====
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
      e.preventDefault();
      const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]');
      if (searchInput) searchInput.focus();
    }
    if (e.key === 'Escape' && mobileToggle) {
      navMenu.classList.remove('active');
    }
  });

  // ===== CURSOR EFFECT (OPTIONAL ADVANCED) =====
  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
      const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
      
      document.querySelectorAll('.featured-card, .park-card').forEach(card => {
        card.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
      });
    });

    document.addEventListener('mouseleave', () => {
      document.querySelectorAll('.featured-card, .park-card').forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }

  // ===== AUTO CARD FLIP ON HOVER =====
  document.querySelectorAll('.featured-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      const content = this.querySelector('.card-content');
      if (content) {
        content.style.animation = 'slideInRight 0.4s ease';
      }
    });
  });

  // ===== COUNTER ANIMATION =====
  const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 50);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 50);
  };

  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(el);
  });

  // ===== TOOLTIP SYSTEM =====
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.addEventListener('mouseenter', function() {
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = this.dataset.tooltip;
      tooltip.style.cssText = `
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 0.5rem 0.8rem;
        border-radius: 4px;
        font-size: 0.85rem;
        white-space: nowrap;
        z-index: 1000;
        pointer-events: none;
        animation: fadeInUp 0.3s ease;
      `;
      document.body.appendChild(tooltip);
      
      const rect = this.getBoundingClientRect();
      tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';

      this.addEventListener('mouseleave', () => tooltip.remove());
    });
  });

  console.log('Advanced Interactive Features Loaded ✓');
});
