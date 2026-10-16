import { initNavbar } from './layout/navbar.js';
import { initFooter } from './layout/footer.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFooter();

  // ==========================================================================
  // UNIVERSAL NAVIGATION & FOOTER ANIMATIONS
  // ==========================================================================
  // ==========================================================================
  // UNIVERSAL NAVIGATION & FOOTER ANIMATIONS
  // ==========================================================================
  if (document.querySelector('.main-nav')) {
    gsap.from('.main-nav', {
      y: -15,
      duration: 0.45,
      ease: 'power2.out',
      clearProps: 'transform'
    });

    gsap.from('.nav-link', {
      y: -6,
      stagger: 0.03,
      duration: 0.35,
      ease: 'power2.out',
      delay: 0.05,
      clearProps: 'transform'
    });
  }

  if (document.querySelector('.main-footer')) {
    gsap.from('.footer-grid > *', {
      scrollTrigger: {
        trigger: '.main-footer',
        start: 'top 85%'
      },
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.8,
      ease: 'power2.out',
      clearProps: 'all'
    });

    gsap.from('.footer-bottom > *', {
      scrollTrigger: {
        trigger: '.footer-bottom',
        start: 'top 95%'
      },
      opacity: 0,
      y: 15,
      stagger: 0.1,
      duration: 0.7,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }

  // ==========================================================================
  // UNIVERSAL PARALLAX FOR BOTANICAL & EDITORIAL VISUALS
  // ==========================================================================
  const parallaxImages = document.querySelectorAll('.editorial-img, .product-img, .hero-img, .service-img');
  parallaxImages.forEach(img => {
    gsap.to(img, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: img,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  });

  // ==========================================================================
  // PHYSICAL MAGNETIC & TACTILE BUTTONS
  // ==========================================================================
  if (window.matchMedia('(hover: hover)').matches) {
    const magneticBtns = document.querySelectorAll('.contact-cta, .contact-cta-large, .hero-secondary-btn, .submit-btn');
    magneticBtns.forEach(btn => {
      const innerElements = btn.querySelectorAll('span, svg');

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Physical spring magnetic pull on button capsule
        gsap.to(btn, {
          x: x * 0.28,
          y: y * 0.28,
          duration: 0.35,
          ease: 'power2.out'
        });

        // Differential 3D parallax on inner text / icon / arrow
        if (innerElements.length) {
          gsap.to(innerElements, {
            x: x * 0.12,
            y: y * 0.12,
            duration: 0.35,
            ease: 'power2.out'
          });
        }
      });

      btn.addEventListener('mouseleave', () => {
        // Elastic physical spring return
        gsap.to(btn, {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'elastic.out(1.2, 0.35)'
        });

        if (innerElements.length) {
          gsap.to(innerElements, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: 'elastic.out(1.2, 0.35)'
          });
        }
      });

      btn.addEventListener('mousedown', () => {
        gsap.to(btn, {
          scale: 0.96,
          duration: 0.1,
          ease: 'power1.out'
        });
      });

      btn.addEventListener('mouseup', () => {
        gsap.to(btn, {
          scale: 1.025,
          duration: 0.45,
          ease: 'elastic.out(1.3, 0.35)'
        });
      });
    });
  }

  // ==========================================================================
  // UNIVERSAL CONTACT FORM INTERACTION
  // ==========================================================================
  const contactForm = document.getElementById('contactForm') || document.querySelector('.contact-form');
  if (contactForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const productParam = urlParams.get('product') || urlParams.get('inquiry') || urlParams.get('category');
    const productSelect = document.getElementById('product');

    if (productParam && productSelect) {
      // Find matching option
      for (let i = 0; i < productSelect.options.length; i++) {
        const val = productSelect.options[i].value;
        if (val && (val.toLowerCase().includes(productParam.toLowerCase()) ||
            productParam.toLowerCase().includes(val.toLowerCase()))) {
          productSelect.selectedIndex = i;
          break;
        }
      }
    }

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const statusMsg = contactForm.querySelector('.form-status-message');
      const submitBtn = contactForm.querySelector('.submit-btn');

      const fullName = (document.getElementById('fullName')?.value || '').trim();
      const email = (document.getElementById('email')?.value || '').trim();
      const companyName = (document.getElementById('companyName')?.value || '').trim();
      const phone = (document.getElementById('phone')?.value || '').trim();
      const product = (document.getElementById('product')?.value || '').trim();
      const requirements = (document.getElementById('requirements')?.value || '').trim();

      // Format professional trade enquiry message for WhatsApp
      const textLines = [
        '📦 *NEW EXPORT TRADE ENQUIRY*',
        '━━━━━━━━━━━━━━━━━━━━',
        `👤 *Client Name:* ${fullName}`,
        `🏢 *Company & Country:* ${companyName}`,
        `✉️ *Email:* ${email}`,
        `📞 *Phone/WhatsApp:* ${phone || 'Not provided'}`,
        `🌶️ *Variety Required:* ${product}`,
        '',
        '📋 *Consignment Specifications & Volume:*',
        requirements,
        '━━━━━━━━━━━━━━━━━━━━',
        '🌐 _Sent via Skyline Global Exports Trade Desk_'
      ];

      const whatsappText = encodeURIComponent(textLines.join('\n'));
      const whatsappUrl = `https://wa.me/916369563839?text=${whatsappText}`;

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Forwarding to WhatsApp...</span>';
      }

      setTimeout(() => {
        if (statusMsg) {
          statusMsg.style.display = 'block';
          gsap.from(statusMsg, { opacity: 0, y: 10, duration: 0.5, ease: 'power2.out' });
        }

        // Open WhatsApp in a new tab/window
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Chat on WhatsApp &rarr;</span>';
          submitBtn.onclick = () => {
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
          };
        }
      }, 400);
    });
  }

  // ==========================================================================
  // HOME PAGE ANIMATIONS (ALL SECTIONS)
  // ==========================================================================
  if (document.querySelector('.page-home') || document.querySelector('.hero-section')) {
    // 0. Agricultural Lifecycle Video Seamless Film Dissolve (Zero Flash / No Reload)
    const videoA = document.getElementById('heroAgroVideo');
    const videoB = document.getElementById('heroAgroVideoNext');
    if (videoA && videoB) {
      const videoStages = [
        '/assets/videos/agriculture-farmer.mp4',
        '/assets/videos/cultivation-sowing.mp4',
        '/assets/videos/harvest-packing.mp4',
        '/assets/videos/spices-trade.mp4',
        '/assets/videos/delivery-customers.mp4'
      ];
      let currentIdx = 0;
      let activeVideo = videoA;
      let inactiveVideo = videoB;
      let isTransitioning = false;

      const crossfadeToNext = () => {
        if (isTransitioning) return;
        currentIdx = (currentIdx + 1) % videoStages.length;
        const nextUrl = videoStages[currentIdx];

        isTransitioning = true;
        inactiveVideo.src = nextUrl;
        inactiveVideo.load();

        const onReadyToPlay = () => {
          inactiveVideo.removeEventListener('canplay', onReadyToPlay);
          inactiveVideo.play().then(() => {
            gsap.to(inactiveVideo, { opacity: 1, duration: 1.8, ease: 'power2.inOut' });
            gsap.to(activeVideo, {
              opacity: 0,
              duration: 1.8,
              ease: 'power2.inOut',
              onComplete: () => {
                activeVideo.pause();
                const temp = activeVideo;
                activeVideo = inactiveVideo;
                inactiveVideo = temp;
                isTransitioning = false;
              }
            });
          }).catch(() => {
            isTransitioning = false;
          });
        };

        inactiveVideo.addEventListener('canplay', onReadyToPlay);
      };

      // Seamlessly advance stage every 14 seconds when page is active and hero is in view
      let videoInterval = null;
      let isHeroVisible = true;

      const startVideoLoop = () => {
        if (!videoInterval && !document.hidden && isHeroVisible) {
          videoInterval = setInterval(crossfadeToNext, 14000);
          if (activeVideo && activeVideo.paused) {
            activeVideo.play().catch(() => {});
          }
        }
      };

      const stopVideoLoop = () => {
        if (videoInterval) {
          clearInterval(videoInterval);
          videoInterval = null;
        }
        if (activeVideo) activeVideo.pause();
        if (inactiveVideo) inactiveVideo.pause();
      };

      startVideoLoop();

      // Pause when hero is scrolled out of view
      const heroSection = document.querySelector('.hero-section');
      if (heroSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            isHeroVisible = entry.isIntersecting;
            if (isHeroVisible) {
              startVideoLoop();
            } else {
              stopVideoLoop();
            }
          });
        }, { threshold: 0.1 });
        observer.observe(heroSection);
      }

      // Pause when tab/page is not selected
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          stopVideoLoop();
        } else {
          startVideoLoop();
        }
      });
    }

    // 1. Alliance Foods Style Clean Corporate Hero Entrance
    if (document.querySelector('.hero-alliance-section')) {
      const heroTl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.0 }
      });

      heroTl
        .from('.hero-alliance-title', {
          opacity: 0,
          y: 40,
          duration: 1.1,
          ease: 'power3.out',
          clearProps: 'all'
        })
        .from('.hero-alliance-subtitle', {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: 'power2.out',
          clearProps: 'all'
        }, '-=0.7')
        .from('.hero-alliance-actions', {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'all'
        }, '-=0.5')
        .from('.hero-stat-item', {
          opacity: 0,
          y: 28,
          stagger: 0.14,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'all'
        }, '-=0.4');
    }

    // Legacy Hero Sculptural Card & Physical 3D Zigzag Showcase
    if (document.querySelector('.hero-sculptural-card')) {
      const legacyHeroTl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.2 }
      });

      legacyHeroTl
        .from('.hero-sculptural-card', {
          opacity: 0,
          scale: 0.92,
          y: 40,
          duration: 1.4,
          ease: 'power4.out'
        })
        .from('.card-surface', {
          clipPath: 'inset(8% 8% 8% 8%)',
          duration: 1.1,
          ease: 'power3.inOut'
        }, '-=0.8')
        .from('.card-content > *', {
          opacity: 0,
          y: 20,
          stagger: 0.16,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.5')
        .from('.botanical-element', {
          opacity: 0,
          scale: 0.85,
          rotation: -4,
          duration: 1.3,
          ease: 'power3.out'
        }, '-=0.9')
        .from('.hero-zigzag-showcase', {
          opacity: 0,
          scale: 0.88,
          y: 35,
          duration: 1.3,
          ease: 'power3.out'
        }, '-=1.0')
        .from('.block-3d-wrapper', {
          opacity: 0,
          scale: 0.7,
          y: 35,
          stagger: 0.22,
          duration: 1.1,
          ease: 'back.out(1.7)',
          clearProps: 'transform'
        }, '-=0.9');
    }

    // Hero Card Subtle Parallax on Mouse Move
    const card = document.querySelector('.card-surface');
    if (card) {
      window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const xPos = (clientX / innerWidth) - 0.5;
        const yPos = (clientY / innerHeight) - 0.5;

        gsap.to(card, {
          rotationY: xPos * 5,
          rotationX: -yPos * 5,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    }

    // 2. Brand Statement & Narrative Section
    const statementWords = document.querySelectorAll('.statement-text .word');
    if (statementWords.length > 0) {
      gsap.from(statementWords, {
        scrollTrigger: {
          trigger: '.brand-statement',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power2.out'
      });
    }

    const narrativeSplit = document.querySelector('.narrative-split-wrapper');
    if (narrativeSplit) {
      const narrativeTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#narrative',
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // 1. Central Block Line expands into place
      narrativeTl
        .from('.narrative-block-divider', {
          scaleY: 0,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.inOut',
          transformOrigin: 'center center'
        })
        .from('.divider-node-crest', {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(2)'
        }, '-=0.5')
        // 2. The wording emerges directly FROM the line and glides outward (3.0 seconds transition timing):
        // Left text moves to the left (starts near line: x = +90px -> 0)
        .from('.narrative-col-left', {
          x: 90,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 3.0,
          ease: 'power2.out'
        }, '-=0.5')
        // Right text moves to the right (starts near line: x = -90px -> 0)
        .from('.narrative-col-right', {
          x: -90,
          opacity: 0,
          filter: 'blur(12px)',
          duration: 3.0,
          ease: 'power2.out'
        }, '<')
        // 3. Action button gracefully appears at the bottom of the section
        .from('.narrative-action-bottom', {
          y: 28,
          opacity: 0,
          scale: 0.94,
          duration: 1.0,
          ease: 'power2.out'
        }, '-=1.4');
    }

    // 3. Featured Products Section
    if (document.querySelector('.product-world .section-header')) {
      gsap.from('.product-world .section-header > *', {
        scrollTrigger: {
          trigger: '.product-world',
          start: 'top 95%',
          once: true
        },
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }

    // 3. Premium Products 3D Coverflow Carousel & Showcase
    function initProductCoverflow() {
      const wrapper = document.querySelector('.coverflow-carousel-wrapper');
      if (!wrapper) return;

      const cards = Array.from(wrapper.querySelectorAll('.coverflow-card'));
      const prevBtn = document.getElementById('coverflow-prev-btn');
      const nextBtn = document.getElementById('coverflow-next-btn');
      if (!cards.length) return;

      let activeIndex = 0; // Default to first card: Guntur Sannam (S4)

      function updateCoverflow(index) {
        if (index < 0) index = 0;
        if (index >= cards.length) index = cards.length - 1;
        activeIndex = index;

        cards.forEach((card, i) => {
          const diff = i - activeIndex;
          card.classList.toggle('active', diff === 0);

          if (window.innerWidth <= 860) {
            card.style.transform = '';
            card.style.opacity = '';
            card.style.zIndex = '';
            return;
          }

          if (diff === 0) {
            card.style.transform = 'perspective(1400px) rotateY(0deg) scale(1.08) translateY(-10px)';
            card.style.opacity = '1';
            card.style.zIndex = '10';
          } else if (diff < 0) {
            const rot = Math.min(26, Math.abs(diff) * 8);
            const scale = Math.max(0.75, 1 - Math.abs(diff) * 0.07);
            card.style.transform = `perspective(1400px) rotateY(${rot}deg) scale(${scale})`;
            card.style.opacity = `${Math.max(0.65, 1 - Math.abs(diff) * 0.12)}`;
            card.style.zIndex = `${10 - Math.abs(diff)}`;
          } else {
            const rot = -Math.min(26, diff * 8);
            const scale = Math.max(0.75, 1 - diff * 0.07);
            card.style.transform = `perspective(1400px) rotateY(${rot}deg) scale(${scale})`;
            card.style.opacity = `${Math.max(0.65, 1 - diff * 0.12)}`;
            card.style.zIndex = `${10 - diff}`;
          }
        });

        if (prevBtn) {
          prevBtn.style.opacity = activeIndex === 0 ? '0.35' : '1';
          prevBtn.style.pointerEvents = activeIndex === 0 ? 'none' : 'auto';
        }
        if (nextBtn) {
          nextBtn.style.opacity = activeIndex === cards.length - 1 ? '0.35' : '1';
          nextBtn.style.pointerEvents = activeIndex === cards.length - 1 ? 'none' : 'auto';
        }
      }

      updateCoverflow(activeIndex);

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          updateCoverflow(activeIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          updateCoverflow(activeIndex + 1);
        });
      }

      cards.forEach((card, i) => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.coverflow-link') && card.classList.contains('active')) {
            return;
          }
          if (activeIndex !== i) {
            e.preventDefault();
            updateCoverflow(i);
          }
        });
      });

      window.addEventListener('resize', () => {
        updateCoverflow(activeIndex);
      });

      gsap.from('.coverflow-card', {
        scrollTrigger: {
          trigger: '.coverflow-carousel-wrapper',
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.85,
        ease: 'power3.out',
        onComplete: () => updateCoverflow(activeIndex)
      });

      gsap.from('.featured-showcase-container', {
        scrollTrigger: {
          trigger: '.featured-showcase-container',
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 50,
        duration: 0.9,
        ease: 'power3.out'
      });
    }

    initProductCoverflow();

    // 4. Standards (Values) Section - Clean Luxury Cards (Reference Design)
    if (document.querySelector('.values-section')) {
      gsap.from('.values-header > *', {
        scrollTrigger: {
          trigger: '.values-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 25,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all'
      });

      gsap.from('.standards-card', {
        scrollTrigger: {
          trigger: '.standards-cards-deck',
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 26,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }

    // 5. The Company: A Reliable Bridge Section (Architectural Composition & Photo Showcase)
    if (document.querySelector('.company-bridge-section')) {
      const bridgeTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.company-bridge-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        onComplete: () => {
          gsap.set(['.bridge-left-col > *', '.bridge-mission-col > *', '.bridge-sculptural-card', '.bridge-floating-pill', '.bridge-objective-card'], { clearProps: 'opacity,transform' });
        }
      });

      bridgeTl
        .from('.bridge-left-col > *', {
          opacity: 0,
          y: 35,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power3.out'
        })
        .from('.bridge-mission-col > *', {
          opacity: 0,
          y: 25,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power2.out'
        }, '-=0.6')
        .from('.bridge-sculptural-card', {
          opacity: 0,
          scale: 0.93,
          y: 30,
          duration: 1.0,
          ease: 'power3.out'
        }, '-=0.7')
        .from('.bridge-floating-pill', {
          opacity: 0,
          y: 18,
          duration: 0.8,
          ease: 'back.out(1.5)'
        }, '-=0.4')
        .from('.bridge-objective-card', {
          opacity: 0,
          y: 35,
          duration: 0.9,
          ease: 'power3.out'
        }, '-=0.5');
    }

    // 6. How We Work - The Export Workflow (Architectural Bars, Pipeline, & Progress Animation)
    if (document.querySelector('.how-we-work')) {
      const howTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.how-we-work',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      howTl
        .from('.how-header > *', {
          opacity: 0,
          y: 35,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power2.out'
        })
        .from('.workflow-pipeline-rail', {
          opacity: 0,
          scaleX: 0,
          duration: 0.85,
          ease: 'power3.inOut',
          transformOrigin: 'center center'
        }, '-=0.4')
        .from('.workflow-pipeline-rail .rail-node', {
          scale: 0,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'back.out(2)'
        }, '-=0.3')
        .from('.journey-step.workflow-bar, .journey-step', {
          opacity: 0,
          y: 65,
          stagger: 0.1,
          duration: 0.95,
          ease: 'power3.out'
        }, '-=0.5')
        .from('.workflow-bar .bar-medallion', {
          rotate: -40,
          scale: 0.7,
          stagger: 0.08,
          duration: 0.7,
          ease: 'back.out(1.8)'
        }, '-=0.8');

      // Animate progress bars from 0 to their target width
      const indicatorBars = document.querySelectorAll('.workflow-bar .step-indicator-bar');
      indicatorBars.forEach((indicator) => {
        const fill = indicator.querySelector('.bar-progress-fill');
        const targetWidth = indicator.getAttribute('data-target-width') || '100%';
        if (fill) {
          gsap.fromTo(
            fill,
            { width: '0%' },
            {
              width: targetWidth,
              duration: 1.2,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: indicator,
                start: 'top 85%'
              }
            }
          );
        }
      });

      // 3D Mouse Parallax Tilt & Specular Glare Tracking for the Bars
      const bars = document.querySelectorAll('.journey-step.workflow-bar');
      const nodes = document.querySelectorAll('.workflow-pipeline-rail .rail-node');
      let currentActiveIndex = 0;
      let scannerInterval = null;

      function activateStep(index) {
        bars.forEach((b, i) => {
          b.classList.toggle('scan-active', i === index);
        });
        nodes.forEach((n, i) => {
          n.classList.toggle('highlighted', i === index);
        });
      }

      // Continuous Traveling Scanner Pulse across the bars
      if (bars.length > 0) {
        ScrollTrigger.create({
          trigger: '.how-we-work',
          start: 'top 70%',
          onEnter: () => {
            if (!scannerInterval) {
              scannerInterval = setInterval(() => {
                currentActiveIndex = (currentActiveIndex + 1) % bars.length;
                activateStep(currentActiveIndex);
              }, 2500);
            }
          },
          onLeave: () => {
            if (scannerInterval) {
              clearInterval(scannerInterval);
              scannerInterval = null;
            }
          },
          onEnterBack: () => {
            if (!scannerInterval) {
              scannerInterval = setInterval(() => {
                currentActiveIndex = (currentActiveIndex + 1) % bars.length;
                activateStep(currentActiveIndex);
              }, 2500);
            }
          },
          onLeaveBack: () => {
            if (scannerInterval) {
              clearInterval(scannerInterval);
              scannerInterval = null;
            }
          }
        });
      }

      bars.forEach((bar) => {
        const inner = bar.querySelector('.bar-inner') || bar;
        const glare = bar.querySelector('.bar-glare');
        const stepNum = bar.getAttribute('data-step');
        const correspondingNode = document.querySelector(`.workflow-pipeline-rail .rail-node[data-node="${stepNum}"]`);

        bar.addEventListener('mousemove', (e) => {
          const rect = inner.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          if (glare) {
            const pctX = ((e.clientX - rect.left) / rect.width) * 100;
            const pctY = ((e.clientY - rect.top) / rect.height) * 100;
            inner.style.setProperty('--mouse-x', `${pctX}%`);
            inner.style.setProperty('--mouse-y', `${pctY}%`);
          }

          gsap.to(inner, {
            rotateY: x * 12,
            rotateX: -y * 12,
            duration: 0.35,
            ease: 'power2.out',
            transformPerspective: 900
          });
        });

        bar.addEventListener('mouseenter', () => {
          if (scannerInterval) {
            clearInterval(scannerInterval);
            scannerInterval = null;
          }
          bars.forEach((b) => b.classList.remove('scan-active'));
          nodes.forEach((n) => n.classList.remove('highlighted'));
          bar.classList.add('scan-active');
          if (correspondingNode) correspondingNode.classList.add('highlighted');
        });

        bar.addEventListener('mouseleave', () => {
          bar.classList.remove('scan-active');
          if (correspondingNode) correspondingNode.classList.remove('highlighted');
          gsap.to(inner, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.7,
            ease: 'elastic.out(1, 0.45)'
          });
          // Restart scanner loop
          if (!scannerInterval) {
            scannerInterval = setInterval(() => {
              currentActiveIndex = (currentActiveIndex + 1) % bars.length;
              activateStep(currentActiveIndex);
            }, 2500);
          }
        });
      });
    }

    // 7. Final Action CTA (Smooth Entrance with Full Visibility Safety)
    if (document.querySelector('.final-cta')) {
      ScrollTrigger.create({
        trigger: '.final-cta',
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            ['.final-cta .contact-kicker-badge', '.final-cta .cta-headline', '.final-cta .cta-tagline', '.final-cta .cta-actions > *'],
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.75,
              ease: 'power2.out',
              clearProps: 'all'
            }
          );
        }
      });
    }
  }

  // ==========================================================================
  // ABOUT PAGE ANIMATIONS (ALL SECTIONS)
  // ==========================================================================
  if (document.querySelector('.page-about')) {
    if (typeof document !== 'undefined' && document.hidden) {
      gsap.set('.about-hero-content > *, .about-hero-botanical-branch, .origin-narrative-col > *, .origin-pillar-item, .india-vector-img, .map-pin, .product-badge-node, .map-connector-arcs, .scope-header-left > *, .scope-header-right > *, .standards-card, .objective-callout-luxury, .phi-item, .dependable-header > *, .dependable-card, .commitments-header > *, .commitment-item, .contact-cta-large', {
        opacity: 1,
        y: 0,
        scale: 1,
        clearProps: 'all'
      });
    } else {
      // 1. Hero text is kept immediately rendered for instant visual clarity and zero layout shift

      // 2. Sourcing & Origin section is immediately rendered with GPU-accelerated hover transitions on chilli badges and pillars

    // 3. About Scope (What We Do)
    if (document.querySelector('.about-scope')) {
      gsap.from('.scope-header-left > *, .scope-header-right > *', {
        scrollTrigger: {
          trigger: '.about-scope',
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power2.out',
        clearProps: 'all'
      });

      gsap.from('.about-scope .standards-card', {
        scrollTrigger: {
          trigger: '.about-scope .standards-cards-deck',
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 26,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power2.out',
        clearProps: 'all'
      });

      if (document.querySelector('.objective-callout-luxury')) {
        gsap.from('.objective-callout-luxury', {
          scrollTrigger: {
            trigger: '.objective-callout-luxury',
            start: 'top 88%',
            once: true
          },
          opacity: 0,
          y: 22,
          duration: 0.85,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }
    }

    // 4. Mission & Vision (Editorial Contrast Cards)
    if (document.querySelector('.about-philosophy')) {
      gsap.from('.phi-item', {
        scrollTrigger: {
          trigger: '.about-philosophy',
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 26,
        scale: 0.98,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }

    // 5. Principles / Dependable Practices
    if (document.querySelector('.about-principles')) {
      gsap.from('.dependable-header > *', {
        scrollTrigger: {
          trigger: '.about-principles',
          start: 'top 88%',
          once: true
        },
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power2.out',
        clearProps: 'all'
      });

      if (document.querySelector('.dependable-stagger-grid')) {
        const cardOrigin = document.querySelector('.card-origin');      // 01
        const cardStandard = document.querySelector('.card-standard');  // 02
        const cardMarket = document.querySelector('.card-market');      // 03
        const cardLogistics = document.querySelector('.card-logistics');// 04

        const orderedCards = [cardOrigin, cardStandard, cardMarket, cardLogistics].filter(Boolean);

        if (orderedCards.length > 0) {
          gsap.from(orderedCards, {
            scrollTrigger: {
              trigger: '.dependable-stagger-grid',
              start: 'top 82%',
              once: true
            },
            opacity: 0,
            y: 26,
            scale: 0.98,
            stagger: 0.14,
            duration: 0.9,
            ease: 'power2.out',
            clearProps: 'all'
          });
        }
      }
    }

    // 6. Commitments
    if (document.querySelector('.about-commitments')) {
      gsap.from('.commitments-header > *', {
        scrollTrigger: {
          trigger: '.about-commitments',
          start: 'top 88%',
          once: true
        },
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.85,
        ease: 'power2.out',
        clearProps: 'all'
      });

      gsap.from('.commitment-item', {
        scrollTrigger: {
          trigger: '.commitments-list',
          start: 'top 88%',
          once: true
        },
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.85,
        ease: 'power2.out',
        clearProps: 'all'
      });

      gsap.from('.about-commitments .contact-cta-large', {
        scrollTrigger: {
          trigger: '.about-commitments .contact-cta-large',
          start: 'top 92%',
          once: true
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
    }
  }

  // ==========================================================================
  // PRODUCTS PAGE ANIMATIONS & INTERACTIVE CONTROLLERS
  // ==========================================================================
  if (document.querySelector('.page-products')) {
    if (typeof document !== 'undefined' && document.hidden) {
      gsap.set('.products-hero-content > *, .catalog-hud, .catalog-card', {
        opacity: 1,
        y: 0,
        clearProps: 'all'
      });
    } else {
      // 1. Products Hero
      gsap.from('.products-hero-content > *', {
        opacity: 0,
        y: 25,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all'
      });

      // 2. Catalog HUD & Cards
      if (document.querySelector('.catalog-hud')) {
        gsap.from('.catalog-hud', {
          scrollTrigger: {
            trigger: '.catalog-hud',
            start: 'top 88%'
          },
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }

      if (document.querySelector('.catalog-grid')) {
        gsap.from('.catalog-card', {
          scrollTrigger: {
            trigger: '.catalog-grid',
            start: 'top 88%'
          },
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'all'
        });
      }
    }

    // 3. Category Filter Tabs Controller (Products Catalogue)
    const productTabs = document.querySelectorAll('.catalog-hud:not(.services-hud) .filter-tab-btn');
    const catalogCards = document.querySelectorAll('.catalog-card');
    const counterEl = document.getElementById('catalog-count');

    if (productTabs.length > 0 && catalogCards.length > 0) {
      productTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          productTabs.forEach(t => {
            t.classList.remove('active');
            t.style.background = '';
            t.style.borderColor = '';
            t.style.color = '';
          });
          tab.classList.add('active');
          tab.style.background = '';
          tab.style.borderColor = '';
          tab.style.color = '';

          const filter = tab.getAttribute('data-filter');
          let visibleCount = 0;

          catalogCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
              card.style.display = 'flex';
              visibleCount++;
            } else {
              card.style.display = 'none';
            }
          });

          if (counterEl) {
            counterEl.innerHTML = `<span class="counter-beacon" aria-hidden="true"></span><span>Showing ${visibleCount} of ${catalogCards.length} Verified Products</span>`;
          }

          const visibleCards = Array.from(catalogCards).filter(c => c.style.display !== 'none');
          if (visibleCards.length > 0 && typeof gsap !== 'undefined') {
            gsap.fromTo(visibleCards,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', overwrite: 'auto' }
            );
          }
        });
      });
    }



    // 4. Product Spec Quickview Modal Controller
    const modal = document.getElementById('productModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalImg = document.getElementById('modalImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalShu = document.getElementById('modalShu');
    const modalAsta = document.getElementById('modalAsta');
    const modalOrigin = document.getElementById('modalOrigin');
    const modalQuoteLink = document.getElementById('modalQuoteLink');

    const openButtons = document.querySelectorAll('.open-spec-btn');
    openButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const product = btn.getAttribute('data-product');
        const desc = btn.getAttribute('data-desc');
        const shu = btn.getAttribute('data-shu');
        const asta = btn.getAttribute('data-asta');
        const origin = btn.getAttribute('data-origin');
        const img = btn.getAttribute('data-img');

        if (modalTitle) modalTitle.textContent = product;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalShu) modalShu.textContent = shu;
        if (modalAsta) modalAsta.textContent = asta;
        if (modalOrigin) modalOrigin.textContent = origin;
        if (modalImg) modalImg.src = img;
        if (modalQuoteLink) modalQuoteLink.href = `/pages/contact.html?product=${encodeURIComponent(product)}`;

        if (modal) {
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          gsap.fromTo(modal.querySelector('.modal-card'),
            { opacity: 0, scale: 0.94, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'power2.out' }
          );
        }
      });
    });

    const closeModal = () => {
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // ==========================================================================
  // SERVICES PAGE ANIMATIONS (ALL SECTIONS)
  // ==========================================================================
  if (document.querySelector('.page-services')) {
    // 1. Services Hero
    if (document.querySelector('.products-hero-content, .services-hero-content')) {
      gsap.from('.products-hero-content > *, .services-hero-content > *', {
        opacity: 0,
        y: 25,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }

    // 1b. Protocol Stages HUD
    if (document.querySelector('.services-hud')) {
      gsap.from('.services-hud', {
        scrollTrigger: {
          trigger: '.services-hud',
          start: 'top 88%'
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }

    // Protocol Stages Filter Tabs Controller (Export Services)
    const serviceTabs = document.querySelectorAll('.services-hud .filter-tab-btn');
    const serviceCards = document.querySelectorAll('.service-desk-card');
    const servicesCounterEl = document.getElementById('services-count');

    if (serviceTabs.length > 0 && serviceCards.length > 0) {
      serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          serviceTabs.forEach(t => {
            t.classList.remove('active');
            t.style.background = '';
            t.style.borderColor = '';
            t.style.color = '';
          });
          tab.classList.add('active');
          tab.style.background = '';
          tab.style.borderColor = '';
          tab.style.color = '';

          const stage = tab.getAttribute('data-stage');
          let visibleCount = 0;

          serviceCards.forEach(card => {
            const cardStage = card.getAttribute('data-stage');
            if (stage === 'all' || cardStage === stage) {
              card.style.display = 'flex';
              // When single stage is isolated, expand full width for hero presentation
              if (stage !== 'all') {
                card.style.gridColumn = '1 / -1';
              } else {
                card.style.gridColumn = card.classList.contains('card-featured-wide') ? '1 / -1' : '';
              }
              visibleCount++;
            } else {
              card.style.display = 'none';
            }
          });

          if (servicesCounterEl) {
            const label = visibleCount === 1 ? 'Stage' : 'Stages';
            servicesCounterEl.innerHTML = `<span class="counter-beacon" aria-hidden="true"></span><span>Showing ${visibleCount} of ${serviceCards.length} Verified Protocol ${label}</span>`;
          }

          const visibleCards = Array.from(serviceCards).filter(c => c.style.display !== 'none');
          if (visibleCards.length > 0 && typeof gsap !== 'undefined') {
            gsap.fromTo(visibleCards,
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', overwrite: 'auto' }
            );
          }
        });
      });
    }

    // 2. Core Services Grid (5 Stages)
    if (document.querySelector('.core-services .section-header')) {
      gsap.from('.core-services .section-header > *', {
        scrollTrigger: {
          trigger: '.core-services',
          start: 'top 90%'
        },
        opacity: 0,
        y: 25,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }

    if (document.querySelector('.services-grid')) {
      gsap.from('.service-item', {
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 90%'
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }

    // 3. Zigzag Workflow Stages (5 Stages)
    if (document.querySelector('.capabilities-zigzag-wrapper')) {
      gsap.from('.zigzag-row', {
        scrollTrigger: {
          trigger: '.capabilities-zigzag-wrapper',
          start: 'top 85%'
        },
        opacity: 0,
        y: 35,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power2.out',
        clearProps: 'all'
      });
    }
  }

  // ==========================================================================
  // CONTACT PAGE ANIMATIONS (ALL SECTIONS)
  // ==========================================================================
  if (document.querySelector('.page-contact')) {
    gsap.set('.contact-hero-content > *, .contact-channels-header > *, .contact-card, .contact-operational-card, .contact-form-container', {
      clearProps: 'all'
    });
  }

  // ==========================================================================
  // GLOBAL LIFECYCLE & VISIBILITY OPTIMIZATION
  // Pauses animations, video streams, and GSAP on non-selected pages/tabs
  // ==========================================================================
  const handlePageVisibility = () => {
    if (document.hidden) {
      document.body.classList.add('page-paused');
      gsap.globalTimeline.pause();
      document.querySelectorAll('video').forEach(v => {
        try { v.pause(); } catch(e) {}
      });
    } else {
      document.body.classList.remove('page-paused');
      gsap.globalTimeline.resume();
      document.querySelectorAll('video[autoplay]').forEach(v => {
        const rect = v.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          try { v.play().catch(() => {}); } catch(e) {}
        }
      });
    }
  };

  document.addEventListener('visibilitychange', handlePageVisibility);
  window.addEventListener('blur', () => {
    document.body.classList.add('page-unfocused');
  });
  window.addEventListener('focus', () => {
    document.body.classList.remove('page-unfocused');
  });

  // Recalculate ScrollTrigger on load & resize
  window.addEventListener('load', () => ScrollTrigger.refresh());
  window.addEventListener('resize', () => ScrollTrigger.refresh());
});
