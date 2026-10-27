/**
 * ============================================================================
 * KAUSHAL WANI — PERSONAL PORTFOLIO JAVASCRIPT
 * Modern, Lightweight Vanilla JS (ES6+)
 * Features: Dark/Light Mode, Typing Animation, Scroll Progress, Section Spy,
 * Filterable Certifications, Lightbox Modal, ATS PDF Resume Generation
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollEffects();
  initTypingEffect();
  initMobileNav();
  initCertFilter();
  initLightbox();
  initResumeDownload();
  initContactForm();
  initDynamicYear();
});

/* --------------------------------------------------------------------------
   1. Dark / Light Mode Toggle with Persistence
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const themeIcon = themeToggleBtn.querySelector('i');
  
  // Check localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');

  applyTheme(initialTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeToggleBtn.setAttribute('aria-label', 'Switch to light mode');
        themeToggleBtn.setAttribute('title', 'Switch to light mode');
      } else {
        themeIcon.className = 'fas fa-moon';
        themeToggleBtn.setAttribute('aria-label', 'Switch to dark mode');
        themeToggleBtn.setAttribute('title', 'Switch to dark mode');
      }
    }
  }

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

/* --------------------------------------------------------------------------
   2. Scroll Progress Bar, Sticky Navbar & Back-to-Top
   -------------------------------------------------------------------------- */
function initScrollEffects() {
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // 1. Scroll progress
    if (progressBar && docHeight > 0) {
      const scrollPercent = (scrollY / docHeight) * 100;
      progressBar.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // 2. Navbar shadow on scroll
    if (navbar) {
      if (scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // 3. Back-to-top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    // 4. Active nav link on scroll
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. Hero Role Typing Effect
   -------------------------------------------------------------------------- */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-roles');
  if (!typingElement) return;

  const roles = [
    'Aspiring Full-Stack Developer',
    'Engineering Student',
    'Learning Web Development',
    'Java & DSA Learner'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 85;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      isDeleting = true;
      typingSpeed = 1900;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 450;
    }

    setTimeout(type, typingSpeed);
  }

  // Initial delayed start
  setTimeout(type, 700);
}

/* --------------------------------------------------------------------------
   4. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const overlay = document.getElementById('mobile-overlay');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!mobileToggle || !navMenu || !overlay) return;

  function toggleMenu(isOpen) {
    const active = typeof isOpen === 'boolean' ? isOpen : !navMenu.classList.contains('active');
    mobileToggle.classList.toggle('active', active);
    navMenu.classList.toggle('active', active);
    overlay.classList.toggle('active', active);
    document.body.style.overflow = active ? 'hidden' : '';
    mobileToggle.setAttribute('aria-expanded', active);
  }

  mobileToggle.addEventListener('click', () => toggleMenu());
  overlay.addEventListener('click', () => toggleMenu(false));

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMenu(false);
    }
  });
}

/* --------------------------------------------------------------------------
   5. Certification Category Filter
   -------------------------------------------------------------------------- */
function initCertFilter() {
  const filterChips = document.querySelectorAll('.filter-chip');
  const certCards = document.querySelectorAll('.cert-card');

  if (!filterChips.length || !certCards.length) return;

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      // Update active state
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filterValue = chip.getAttribute('data-filter');

      certCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   6. Lightbox Modal for Certificates and ACBS Letter
   -------------------------------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close');
  const downloadLink = document.getElementById('lightbox-download');

  if (!modal || !modalImg || !closeBtn) return;

  // Open modal triggers
  const triggers = document.querySelectorAll('[data-lightbox-src]');
  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const src = trigger.getAttribute('data-lightbox-src');
      const title = trigger.getAttribute('data-lightbox-title') || 'Document Preview';

      modalImg.src = src;
      modalImg.alt = title;
      if (modalTitle) modalTitle.textContent = title;
      if (downloadLink) {
        downloadLink.href = src;
        downloadLink.setAttribute('download', title.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.png');
      }

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      modalImg.src = '';
    }, 200);
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lightbox-body')) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   7. Resume Download: ATS-Friendly 1-Page A4 PDF via html2pdf + Print Fallback
   -------------------------------------------------------------------------- */
function initResumeDownload() {
  const downloadBtns = document.querySelectorAll('.btn-download-resume');
  const resumeTemplate = document.getElementById('resume-print-template');

  if (!downloadBtns.length || !resumeTemplate) return;

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      generatePDF(btn);
    });
  });

  function generatePDF(triggerBtn) {
    const originalText = triggerBtn.innerHTML;
    triggerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating PDF...';
    triggerBtn.style.pointerEvents = 'none';

    // Clone the resume content
    const element = resumeTemplate.cloneNode(true);
    element.style.display = 'block';
    element.style.position = 'static';
    element.style.visibility = 'visible';

    // Temporary container
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '794px'; // standard A4 px at 96 DPI
    container.appendChild(element);
    document.body.appendChild(container);

    const opt = {
      margin:       [6, 8, 6, 8], // mm margins
      filename:     'Kaushal_Wani_Resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, letterRendering: true, scrollY: 0 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (window.html2pdf) {
      window.html2pdf().set(opt).from(element).save()
        .then(() => {
          cleanup();
        })
        .catch((err) => {
          console.warn('html2pdf generation encountered an issue, falling back to window.print():', err);
          cleanup();
          window.print();
        });
    } else {
      // Fallback if CDN is unavailable or offline
      cleanup();
      window.print();
    }

    function cleanup() {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
      triggerBtn.innerHTML = originalText;
      triggerBtn.style.pointerEvents = 'auto';
    }
  }
}

/* --------------------------------------------------------------------------
   8. Contact Form Handling (Mailto & Configurable Endpoint)
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const subject = subjectInput ? subjectInput.value.trim() : 'Portfolio Inquiry';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    // Check if user has configured Formspree endpoint (not the placeholder)
    const action = contactForm.getAttribute('action') || '';
    const isFormspreeConfigured = action.includes('formspree.io/f/') && !action.includes('YOUR_FORM_ID');

    if (isFormspreeConfigured) {
      showStatus('Sending message...', '');
      const formData = new FormData(contactForm);
      fetch(action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(res => {
        if (res.ok) {
          showStatus('Thank you! Your message has been sent successfully.', 'success');
          contactForm.reset();
        } else {
          fallbackMailto(name, email, subject, message);
        }
      })
      .catch(() => {
        fallbackMailto(name, email, subject, message);
      });
    } else {
      // Functional, transparent mailto fallback without faking message transmission
      fallbackMailto(name, email, subject, message);
    }
  });

  function fallbackMailto(name, email, subject, message) {
    const recipient = 'kaushalrw34@gmail.com';
    const emailSubject = encodeURIComponent(`[Portfolio Contact] ${subject} - from ${name}`);
    const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

    showStatus('Opening your default email client to send your message directly to kaushalrw34@gmail.com...', 'success');
    window.location.href = mailtoUrl;
  }

  function showStatus(text, type) {
    if (!formStatus) return;
    formStatus.textContent = text;
    formStatus.className = 'form-status ' + type;
    formStatus.style.display = 'block';
  }
}

/* --------------------------------------------------------------------------
   9. Dynamic Year in Footer
   -------------------------------------------------------------------------- */
function initDynamicYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
