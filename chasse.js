/* Chasse à la pizza cachée (lancement du site).
   Pour l'arrêter une fois la pizza gagnée : retirer la ligne <script src="chasse.js"> dans index.html. */
(() => {
  'use strict';
  const MOT_SECRET = 'PART-CACHÉE';
  const cible = document.querySelector('.credo');
  if (!cible) return;

  const css = `
  .credo{position:relative}
  .egg{position:absolute;right:clamp(14px,3vw,46px);bottom:clamp(14px,2.4vw,34px);width:34px;height:34px;padding:4px;border:0;background:none;cursor:pointer;opacity:.38;rotate:-18deg;transition:opacity .3s,rotate .4s,scale .3s;-webkit-tap-highlight-color:transparent}
  .egg:hover,.egg:focus-visible{opacity:1;rotate:8deg;scale:1.15;outline:none}
  .egg svg{width:100%;height:100%;display:block}
  .egg-pop{position:fixed;inset:0;z-index:1000;display:grid;place-items:center;padding:20px;background:rgba(10,28,21,.72);opacity:0;transition:opacity .35s}
  .egg-pop.is-open{opacity:1}
  .egg-card{position:relative;max-width:440px;width:100%;background:var(--cream);color:var(--night);border-radius:22px;padding:38px 30px 30px;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,.45);transform:translateY(30px) rotate(-2deg);transition:transform .5s cubic-bezier(.2,1.4,.4,1)}
  .egg-pop.is-open .egg-card{transform:none}
  .egg-card svg{width:74px;height:74px;margin:-80px auto 6px;display:block;filter:drop-shadow(0 8px 14px rgba(0,0,0,.25))}
  .egg-card h3{font-family:var(--display);font-weight:400;font-size:clamp(30px,6vw,40px);line-height:1.05;margin-bottom:12px}
  .egg-card p{font-size:17px;line-height:1.45;margin-bottom:12px}
  .egg-code{display:inline-block;font-family:var(--display);font-size:26px;letter-spacing:.04em;background:var(--yellow);padding:6px 18px;border-radius:10px;margin:4px 0 16px;rotate:-2deg}
  .egg-card small{display:block;font-size:13px;opacity:.65;margin-top:14px}
  .egg-close{position:absolute;top:10px;right:14px;border:0;background:none;font-size:30px;line-height:1;color:var(--night);cursor:pointer;opacity:.5}
  .egg-close:hover{opacity:1}`;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const part = `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 60 6 12c16-9 36-9 52 0z" fill="#f2b84b"/><path d="M6 12c16-9 36-9 52 0l-3 6C40 10 24 10 9 18z" fill="#c9852e"/><circle cx="26" cy="26" r="5" fill="#c8402f"/><circle cx="39" cy="31" r="4.5" fill="#c8402f"/><circle cx="31" cy="43" r="4" fill="#c8402f"/><path d="M20 35c2-1 4 0 4 2M41 21c2 0 3 2 2 3" stroke="#4f7d6a" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg>`;

  const btn = document.createElement('button');
  btn.className = 'egg';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Une part de pizza');
  btn.innerHTML = part;
  cible.appendChild(btn);

  let pop;
  const fermer = () => { if (!pop) return; pop.classList.remove('is-open'); setTimeout(() => { pop && pop.remove(); pop = null; }, 350); };
  btn.addEventListener('click', () => {
    if (pop) return;
    pop = document.createElement('div');
    pop.className = 'egg-pop';
    pop.setAttribute('role', 'dialog');
    pop.setAttribute('aria-modal', 'true');
    pop.innerHTML = `<div class="egg-card">
      <button class="egg-close" type="button" aria-label="Fermer">×</button>
      ${part}
      <h3>Bien vu, tu l'as trouvée&nbsp;!</h3>
      <p>Tu viens de mettre la main sur la part cachée du site.<br>Le premier qui nous envoie ce mot secret gagne une pizza&nbsp;:</p>
      <span class="egg-code">${MOT_SECRET}</span>
      <p>Envoie-le vite en message privé sur Instagram à <a href="https://www.instagram.com/coza_amilly/" target="_blank" rel="noopener"><strong>@coza_amilly</strong></a>.</p>
      <small>Une seule pizza à gagner : on retire la part dès qu'on a un gagnant.</small>
    </div>`;
    document.body.appendChild(pop);
    requestAnimationFrame(() => pop.classList.add('is-open'));
    pop.addEventListener('click', (e) => { if (e.target === pop || e.target.closest('.egg-close')) fermer(); });
    pop.querySelector('.egg-close').focus();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') fermer(); });
})();
