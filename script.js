import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class CinematicEngine {
  constructor() {
    this.init();
  }

  init() {
    this.initCustomCursor();
    this.initIntroSequence();
    this.initHeroAnimations();
    this.initJourneyAnimations();
    this.initCapabilitiesAnimations();
    this.initMagneticButtons();
    this.initHeaderScroll();
  }

  // 1. Custom Cinematic Cursor
  initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');

    window.addEventListener('mousemove', (e) => {
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(cursorRing, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    });

    // Cursor interactions
    const interactives = document.querySelectorAll('a, button, .cap-card, .step-visual');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorDot, { scale: 2, background: '#C88219', duration: 0.3 });
        gsap.to(cursorRing, { scale: 1.5, borderColor: '#C88219', opacity: 1, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursorDot, { scale: 1, background: '#C88219', duration: 0.3 });
        gsap.to(cursorRing, { scale: 1, borderColor: '#C88219', opacity: 0.6, duration: 0.3 });
      });
    });
  }

  // 2. Grand Opening Intro Sequence
  initIntroSequence() {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to('.scene-intro', { opacity: 0, duration: 1, delay: 0.5, onComplete: () => {
          document.querySelector('.scene-intro').style.display = 'none';
        }});
        this.revealHeader();
      }
    });

    // Logo Reveal
    tl.to('.intro-logo', { opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out' })
      .to('.logo-light-sweep', { left: '100%', duration: 1.5, ease: 'power2.inOut' }, '-=1')

    // Text Sequences
    const lines = document.querySelectorAll('.intro-line');
    lines.forEach((line, i) => {
      tl.to(line, { opacity: 1, y: -10, duration: 0.8, ease: 'power2.out' }, `+=${0.2}`)
        .to(line, { opacity: 0, y: -20, duration: 0.5, ease: 'power2.in' }, `+=${0.8}`);
    });

    // Curtain Open
    tl.to('.curtain-left', { xPercent: -100, duration: 1.2, ease: 'expo.inOut' }, '-=0.5')
      .to('.curtain-right', { xPercent: 100, duration: 1.2, ease: 'expo.inOut' }, '<');
  }

  revealHeader() {
    gsap.to('#site-header', {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'expo.out'
    });
    document.getElementById('site-header').classList.add('active');
  }

  // 3. Hero Parallax & Transitions
  initHeroAnimations() {
    // Parallax effect on mouse move
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;

      gsap.to('.layer-deep', { x: x * 20, y: y * 20, duration: 1 });
      gsap.to('.layer-mid', { x: x * 50, y: y * 50, duration: 1 });
      gsap.to('.layer-front', { x: x * 100, y: y * 100, duration: 1 });
    });

    // Title mask reveal
    const titles = document.querySelectorAll('.title-mask');
    titles.forEach((title, i) => {
      const span = document.createElement('span');
      span.textContent = title.textContent;
      title.appendChild(span);

      gsap.to(span, {
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
        delay: 2 + (i * 0.2)
      });
    });

    // Hero transition to journey
    gsap.to('.hero-content', {
      scrollTrigger: {
        trigger: '.scene-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      scale: 0.8,
      opacity: 0,
      y: -100,
    });
  }

  // 4. Journey Scroll-Driven Narrative
  initJourneyAnimations() {
    const steps = document.querySelectorAll('.journey-step');

    steps.forEach((step, i) => {
      const img = step.querySelector('.step-img');
      const content = step.querySelector('.step-content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        }
      });

      tl.from(content, {
        x: step.dataset.step === '2' ? -50 : 50,
        opacity: 0,
        duration: 1,
      })
      .to(img, {
        scale: 1,
        duration: 1,
      }, 0);
    });
  }

  // 5. Capabilities Grid Animations
  initCapabilitiesAnimations() {
    const cards = document.querySelectorAll('.cap-card');

    gsap.from(cards, {
      scrollTrigger: {
        trigger: '.scene-capabilities',
        start: 'top 70%',
      },
      y: 100,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });
  }

  // 6. Magnetic Buttons
  initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      });
    });
  }

  initHeaderScroll() {
    window.addEventListener('scroll', () => {
      const header = document.getElementById('site-header');
      if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.background = 'rgba(11, 30, 54, 0.9)';
      } else {
        header.style.padding = '20px 0';
        header.style.background = 'rgba(11, 30, 54, 0.6)';
      }
    });
  }
}

// Initialize Engine
document.addEventListener('DOMContentLoaded', () => {
  new CinematicEngine();
});
