document.addEventListener('DOMContentLoaded', () => {

  // 1. Анимация появления блоков при скролле (для всех страниц)
  const faders = document.querySelectorAll('.fade-up');
  if (faders.length > 0) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          // Небольшая задержка для красивого каскадного эффекта
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    faders.forEach(el => obs.observe(el));
  }

  // 2. Липкий хедер (на Головной странице)
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  // 3. Анимация счетчиков (на Головной странице)
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    function animateCount(el) {
      const target = +el.dataset.count;
      const dur = 1800;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(ease * target);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target + (el.closest('.stat-item') && el.dataset.count === '98' ? '' : (el.dataset.count === '12' ? '+' : ''));
      };
      requestAnimationFrame(tick);
    }
    const cObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { animateCount(e.target); cObs.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cObs.observe(el));
  }

  // 4. Демо отправки формы (на странице Контактов)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('.btn-primary');
      btn.textContent = 'Надсилаємо...';
      btn.style.opacity = '.7';
      setTimeout(() => {
        btn.textContent = '✓ Відправлено';
        btn.style.background = '#00c864';
        btn.style.opacity = '1';
        document.getElementById('successMsg').style.display = 'block';
        this.querySelectorAll('input, textarea, select').forEach(el => el.value = '');
        setTimeout(() => {
          btn.textContent = 'Надіслати заявку →';
          btn.style.background = '';
          document.getElementById('successMsg').style.display = 'none';
        }, 4000);
      }, 1200);
    });
  }

  // 5. Индикаторы рабочих часов (на странице Контактов)
  const wdDot = document.getElementById('wdDot');
  const satDot = document.getElementById('satDot');
  if (wdDot && satDot) {
    const now = new Date();
    const day = now.getDay(); // 0=Sun
    const h = now.getHours(), m = now.getMinutes();
    const mins = h * 60 + m;
    const isWeekday = day >= 1 && day <= 5;
    const isSat = day === 6;
    const wdOpen = mins >= 540 && mins < 1080; // 9:00-18:00
    const satOpen = mins >= 600 && mins < 900; // 10:00-15:00

    if (!(isWeekday && wdOpen)) wdDot.classList.add('closed-dot');
    if (!(isSat && satOpen)) satDot.classList.add('closed-dot');
  }

});