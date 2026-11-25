(() => {
  'use strict';
  const D = window.COZA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const animate = hasGsap && !reduced;
  const fmt = p => typeof p === 'number' ? String(p).replace('.', ',') : p;
  if (!animate) document.documentElement.classList.add('reduced', 'no-anim');

  /* ---------------- Défilement doux ---------------- */
  let lenis = null;
  if (animate && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const goTo = (target) => {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -60, duration: 1.4 });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  /* ---------------- Navigation ---------------- */
  const nav = $('.nav');
  const body = document.body;
  const closeMenu = () => {
    body.classList.remove('menu-open');
    $('.nav__burger').setAttribute('aria-expanded', 'false');
    $('.mobile-menu').setAttribute('aria-hidden', 'true');
    lenis && lenis.start();
  };
  $('.nav__burger').addEventListener('click', () => {
    const open = !body.classList.contains('menu-open');
    body.classList.toggle('menu-open', open);
    $('.nav__burger').setAttribute('aria-expanded', String(open));
    $('.mobile-menu').setAttribute('aria-hidden', String(!open));
    if (lenis) open ? lenis.stop() : lenis.start();
  });
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2 || !$(id)) return;
    e.preventDefault();
    closeMenu();
    goTo(id);
  }));
  let lastY = 0;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-solid', y > 60);
    nav.classList.toggle('is-hidden', y > 500 && y > lastY && !body.classList.contains('menu-open'));
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- La carte ---------------- */
  const list = $('#menu-list');
  const foot = $('#carte-foot');
  const tabs = $$('.tabs [role="tab"]');
  const ink = $('.tabs__ink');

  const dishHTML = (d, extra = '') => `
    <article class="dish${d.photo ? ' dish--photo' : ''}">${d.photo ? `<img class="dish__photo" src="${d.photo}" alt="" loading="lazy">` : ''}<div class="dish__body">
      <div class="dish__row"><h3 class="dish__name">${d.name}${d.tag ? `<span class="dish__tag">${d.tag}</span>` : ''}</h3><span class="dish__dots"></span><span class="dish__price">${fmt(d.price)}</span></div>
      ${d.ing ? `<p class="dish__ing">${d.ing}</p>` : ''}${extra}
    </div></article>`;

  const render = (key) => {
    let html = '';
    if (key === 'pizzas') {
      html = D.pizzas.map((p, i) => {
        const c = D.cocktails[p.accord];
        return dishHTML(p, `<a class="dish__accord" href="#accord" data-pizza="${i}" style="--c:${c.color}">L'accord : ${c.name}</a>`);
      }).join('');
    } else if (key === 'cocktails') {
      html = Object.values(D.cocktails).map(c => dishHTML({ name: c.name, price: c.price, photo: c.photo, ing: `${c.meta} · ${c.ing}`, tag: c.free ? 'sans alcool possible' : '' })).join('');
    } else {
      html = D[key].map(d => dishHTML(d)).join('');
    }
    list.innerHTML = html;
    foot.textContent = D.foot[key] || '';
    $$('.dish__accord', list).forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      selectPizza(+a.dataset.pizza);
      goTo('#accord');
    }));
    if (animate) gsap.from($$('.dish', list), { y: 24, opacity: 0, duration: .6, stagger: .04, ease: 'power3.out', clearProps: 'all' });
  };

  const moveInk = (btn) => {
    ink.style.left = btn.offsetLeft + 'px';
    ink.style.top = btn.offsetTop + 'px';
    ink.style.width = btn.offsetWidth + 'px';
    ink.style.height = btn.offsetHeight + 'px';
  };
  tabs.forEach(btn => btn.addEventListener('click', () => {
    tabs.forEach(b => b.setAttribute('aria-selected', String(b === btn)));
    moveInk(btn);
    render(btn.dataset.tab);
  }));
  render('pizzas');
  const syncInk = () => moveInk(tabs.find(b => b.getAttribute('aria-selected') === 'true'));
  syncInk();
  window.addEventListener('resize', syncInk);
  document.fonts && document.fonts.ready.then(syncInk);

  /* ---------------- L'accord COZA ---------------- */
  const accList = $('#accord-pizzas');
  accList.innerHTML = D.pizzas.map((p, i) =>
    `<li><button role="option" aria-selected="${i === 0}" data-i="${i}">${p.name}</button></li>`).join('');
  const accBtns = $$('button', accList);
  const liquid = $('#liquid'), wave = $('#wave');
  const glassEl = $('.glass'), photoEl = $('#acc-cocktail-photo');
  Object.values(D.cocktails).forEach(c => { if (c.photo) new Image().src = c.photo; });
  const plateEl = $('.plate'), pizzaPhotoEl = $('#acc-pizza-photo');
  D.pizzas.forEach(p => { if (p.plate || p.photo) new Image().src = p.plate || p.photo; });
  let current = -1;

  function selectPizza(i) {
    if (i === current) return;
    const first = current === -1;
    current = i;
    const p = D.pizzas[i], c = D.cocktails[p.accord];
    accBtns.forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
    const sel = accBtns[i];
    if (window.innerWidth <= 980 && sel) accList.scrollTo({ left: sel.parentElement.offsetLeft - 20, behavior: 'smooth' });
    const fill = () => {
      $('#acc-pizza-name').textContent = p.name;
      const pp = p.plate || p.photo;
      plateEl.classList.toggle('plate--empty', !pp);
      if (pp) { pizzaPhotoEl.src = pp; pizzaPhotoEl.alt = p.name; } else { pizzaPhotoEl.removeAttribute('src'); pizzaPhotoEl.alt = ''; }
      $('#acc-cocktail-name').textContent = c.name;
      $('#acc-cocktail-meta').textContent = `${c.meta} · ${fmt(c.price)} €`;
      $('#acc-cocktail-ing').textContent = c.ing;
      $('#acc-cocktail-free').style.display = c.free ? '' : 'none';
      glassEl.classList.toggle('glass--photo', !!c.photo);
      if (c.photo) { photoEl.src = c.photo; photoEl.alt = c.name; }
      liquid.setAttribute('fill', c.color);
      wave.setAttribute('fill', c.color);
    };
    if (!animate || first) { fill(); return; }
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    tl.to(['#acc-pizza-name', '.glass__card > *'], { opacity: 0, y: -10, duration: .25, stagger: .02 }, 0)
      .to('.glass__photo', { opacity: 0, scale: .9, rotate: -4, duration: .35, ease: 'power2.in' }, 0)
      .to('.plate__disc', { rotate: '+=360', scale: .85, duration: .9, ease: 'power2.inOut' }, 0)
      .to([liquid, wave], { y: 95, duration: .5, ease: 'power2.in' }, 0)
      .add(fill)
      .to('.plate__disc', { scale: 1, duration: .6, ease: 'back.out(2)' }, .75)
      .to([liquid, wave], { y: 0, duration: .9, ease: 'power2.out' }, .6)
      .fromTo('.glass__photo', { opacity: 0, scale: .9, rotate: 4 }, { opacity: 1, scale: 1, rotate: 0, duration: .7, ease: 'back.out(1.6)' }, .65)
      .fromTo(['#acc-pizza-name', '.glass__card > *'], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .5, stagger: .05, ease: 'power3.out' }, .7);
  }
  accBtns.forEach(b => b.addEventListener('click', () => selectPizza(+b.dataset.i)));
  accList.addEventListener('keydown', e => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault();
    const n = D.pizzas.length;
    const next = (current + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + n) % n;
    selectPizza(next); accBtns[next].focus();
  });
  selectPizza(0);

  if (!animate) return;

  /* ================= Animations ================= */
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();
  const desktop = '(min-width: 981px)';

  /* Vagues et bulles du verre */
  gsap.to(wave, { x: -100, duration: 2.4, repeat: -1, ease: 'none' });
  $$('#bubbles circle').forEach((b, k) => {
    gsap.fromTo(b, { y: 30, opacity: 0 }, { y: -70, opacity: 1, duration: 2 + k * .4, repeat: -1, delay: k * .35, ease: 'sine.in' });
  });

  /* Mots de fond du hero */
  gsap.to('.hero__bgword--1', { xPercent: -50, duration: 40, repeat: -1, ease: 'none' });
  gsap.fromTo('.hero__bgword--2', { xPercent: -50 }, { xPercent: 0, duration: 46, repeat: -1, ease: 'none' });

  /* Rideau puis entrée du hero */
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  intro
    .from('.lw--co', { xPercent: -140, opacity: 0, duration: 1 }, .1)
    .from('.lw--za', { xPercent: 140, opacity: 0, duration: 1 }, .1)
    .from('.loader__lemon', { y: -260, rotate: -60, opacity: 0, duration: 1, ease: 'bounce.out' }, .35)
    .to('.loader__word', { scale: .85, opacity: 0, duration: .5, ease: 'power2.in' }, 1.5)
    .to('.loader', { yPercent: -100, duration: 1, ease: 'expo.inOut' }, 1.75)
    .set('.loader', { display: 'none' })
    .from('.hero__title img', { clipPath: 'inset(0 100% 0 0)', duration: 1.4, ease: 'power3.inOut' }, 2.2)
    .from('.hero__kicker', { y: 20, opacity: 0, duration: .8 }, 2.4)
    .from('.hero__card--left', { x: -400, y: 200, rotate: -40, opacity: 0, duration: 1.4 }, 2.3)
    .from('.hero__card--right', { x: 400, y: 200, rotate: 40, opacity: 0, duration: 1.4 }, 2.4)
    .from('.hero__lemon', { scale: 0, rotate: 90, duration: 1.2, stagger: .15, ease: 'elastic.out(1,.5)' }, 2.7)
    .from(['.hero__sub', '.hero__ctas .btn'], { y: 30, opacity: 0, duration: .9, stagger: .1 }, 2.9)
    .from('.badge', { scale: 0, rotate: -180, duration: 1.2, ease: 'back.out(1.6)' }, 3.1)
    .from('.nav', { autoAlpha: 0, duration: .9, clearProps: 'opacity,visibility' }, 3);

  /* Parallaxe souris (ordinateur) */
  mm.add('(hover: hover) and (min-width: 981px)', () => {
    const layers = $$('[data-depth]').map(el => ({
      d: parseFloat(el.dataset.depth),
      x: gsap.quickTo(el, 'x', { duration: .9, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: .9, ease: 'power3' })
    }));
    const move = e => {
      const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
      layers.forEach(l => { l.x(nx * 40 * l.d); l.y(ny * 30 * l.d); });
    };
    $('.hero').addEventListener('mousemove', move);
    return () => $('.hero').removeEventListener('mousemove', move);
  });

  /* Hero qui s'éloigne au défilement */
  gsap.to('.hero__center', { yPercent: 30, opacity: 0, scale: .92, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__card--left', { yPercent: -60, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__card--right', { yPercent: -110, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  /* CO + ZA = COZA */
  const tail = $('.fuse__tail'), head = $('.fuse__head');
  const fuseTl = (st, grow) => {
    gsap.set([tail, head], { width: 'auto' });
    const tl = gsap.timeline({ scrollTrigger: st });
    tl.fromTo(tail, { width: () => tail.scrollWidth }, { width: 0, opacity: 0, duration: 1, ease: 'power2.inOut' }, 0)
      .fromTo(head, { width: () => head.scrollWidth }, { width: 0, opacity: 0, duration: 1, ease: 'power2.inOut' }, 0)
      .to('.fuse__plus', { scale: 0, width: 0, margin: 0, opacity: 0, duration: .6, ease: 'power2.in' }, .3)
      .fromTo('.fuse__lemon', { y: -160, rotate: -60, opacity: 0 }, { y: 0, rotate: 14, opacity: 1, duration: .5, ease: 'bounce.out' }, 1)
      .from('.concept__lead', { y: 30, opacity: 0, duration: .4 }, 1.1);
    if (grow) tl.to('.fuse', { scale: grow, duration: .5, ease: 'power2.out' }, .9);
    return tl;
  };
  mm.add(desktop, () => { fuseTl({ trigger: '.concept__pin', start: 'center center', end: '+=900', scrub: 1, pin: true, invalidateOnRefresh: true }); });
  mm.add('(max-width: 980px)', () => { fuseTl({ trigger: '.concept__pin', start: 'top 70%', end: 'bottom 45%', scrub: 1, invalidateOnRefresh: true }, window.innerWidth < 600 ? 1.9 : 0); });

  gsap.from('.pillar', { y: 80, opacity: 0, rotate: (i) => [-4, 2, -2][i], duration: 1, stagger: .12, ease: 'power3.out',
    scrollTrigger: { trigger: '.concept__grid', start: 'top 82%' } });

  /* Credo, mot à mot */
  const credo = $('[data-split]');
  credo.innerHTML = credo.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
  gsap.to($$('.w', credo), { opacity: 1, stagger: .1, ease: 'none',
    scrollTrigger: { trigger: '.credo', start: 'top 70%', end: 'bottom 70%', scrub: true } });
  gsap.from('.credo__sign', { opacity: 0, x: -30, scrollTrigger: { trigger: '.credo__sign', start: 'top 90%' } });

  /* Titres */
  $$('.h2').forEach(h => gsap.from(h, { y: 70, opacity: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' } }));
  $$('.eyebrow').forEach(h => gsap.from(h, { y: 20, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 92%' } }));
  gsap.from('.tabs', { y: 30, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.tabs', start: 'top 90%' }, onComplete: syncInk });

  /* Accord */
  gsap.from('.plate', { x: -80, opacity: 0, rotate: -90, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.accord__match', start: 'top 80%' } });
  gsap.from('.glass', { x: 80, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.accord__match', start: 'top 80%' } });
  gsap.from('.accord__x', { scale: 0, rotate: 180, duration: 1, ease: 'back.out(2)', scrollTrigger: { trigger: '.accord__match', start: 'top 80%' } });
  gsap.to('.plate__disc', { rotate: '+=40', ease: 'none', scrollTrigger: { trigger: '.accord', start: 'top bottom', end: 'bottom top', scrub: true } });

  /* Midi : ticket + compteur */
  gsap.from('.ticket', { y: 160, rotate: -12, opacity: 0, duration: 1.3, ease: 'expo.out', scrollTrigger: { trigger: '.ticket', start: 'top 85%' } });
  gsap.from('.ticket__lines li', { x: -20, opacity: 0, stagger: .1, duration: .6, delay: .4, ease: 'power3.out', scrollTrigger: { trigger: '.ticket', start: 'top 85%' } });
  gsap.from('.stamp', { scale: 3, opacity: 0, rotate: 20, duration: .5, delay: 1.1, ease: 'power4.in', scrollTrigger: { trigger: '.ticket', start: 'top 85%' } });
  const count = $('.count');
  const cObj = { v: 0 };
  gsap.to(cObj, { v: +count.dataset.to, duration: 1.4, delay: .3, ease: 'power2.out', onUpdate: () => count.textContent = Math.round(cObj.v),
    scrollTrigger: { trigger: '.ticket', start: 'top 85%' } });
  gsap.from('.midi__moment li', { x: -30, opacity: 0, stagger: .1, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: '.midi__moment', start: 'top 88%' } });

  /* Galerie horizontale (ordinateur) */
  mm.add(desktop, () => {
    const track = $('.gallery__track');
    const dist = () => track.scrollWidth - innerWidth;
    const tween = gsap.to(track, { x: () => -dist(), ease: 'none',
      scrollTrigger: { trigger: '.gallery__pin', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true } });
    $$('.shot img').forEach(img => gsap.fromTo(img, { xPercent: -6, yPercent: -8 }, { xPercent: 6, yPercent: 0, ease: 'none',
      scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } }));
  });
  mm.add('(max-width: 980px)', () => {
    gsap.from('.shot', { y: 60, opacity: 0, stagger: .1, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.gallery__track', start: 'top 85%' } });
  });

  /* Avis */
  gsap.from('.note', { y: 120, opacity: 0, rotate: (i) => [-14, 10, -8][i], duration: 1.1, stagger: .15, ease: 'expo.out',
    scrollTrigger: { trigger: '.avis__grid', start: 'top 85%' } });

  /* Infos */
  gsap.from('.infos__list > div', { y: 24, opacity: 0, stagger: .08, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: '.infos__list', start: 'top 85%' } });
  gsap.from('.infos__map', { scale: .85, rotate: 10, opacity: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '.infos__map', start: 'top 85%' } });
  gsap.from('.footer__logo', { clipPath: 'inset(0 100% 0 0)', duration: 1.6, ease: 'power3.inOut', scrollTrigger: { trigger: '.footer', start: 'top 90%' } });

  /* Boutons aimantés */
  mm.add('(hover: hover) and (min-width: 981px)', () => {
    $$('.btn').forEach(b => {
      const x = gsap.quickTo(b, 'x', { duration: .5, ease: 'power3' }), y = gsap.quickTo(b, 'y', { duration: .5, ease: 'power3' });
      b.addEventListener('mousemove', e => { const r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * .3); y((e.clientY - r.top - r.height / 2) * .4); });
      b.addEventListener('mouseleave', () => { x(0); y(0); });
    });
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
