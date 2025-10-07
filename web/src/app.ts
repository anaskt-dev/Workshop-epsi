// import { initTimer } from './core/timer';
// import { state } from './core/state';
// import { renderHome } from './ui/Home';
// import { renderRansom } from './ui/RansomScreen';
// import game from './content/game.json';

// const root = document.getElementById('app')!;

// // Boot
// state.durationSec = game.durationSec;
// state.finalCode = game.finalCode;
// state.puzzles = game.puzzles;

// renderHome(root, {
//   onStart: () => {
//     state.startedAt = Date.now();
//     initTimer(() => {
//       // onTick
//     }, () => {
//       // onExpire
//       alert('⏰ Temps écoulé');
//     });
//     // Enchaînez vers vos puzzles; placeholder:
//     renderRansom(root, { remainingSec: state.durationSec, onValidate: (code) => {
//       if (code === state.finalCode) {
//         alert('✅ Système restauré !');
//       } else {
//         alert('❌ Code incorrect');
//       }
//     }});
//   }
// });


type View = 'home' | 'ransom';

const appEl = document.getElementById('app')!;

const state = {
  view: 'home' as View,
  digits: ['4', '8', '6', '2'], // chiffres révélés par énigme
  solved: [false, false, false, false],
  get allSolved() { return this.solved.every(Boolean); },
  get maskedCode() { return this.digits.map((d, i) => (this.solved[i] ? d : '_')).join(' '); },
  get masterCode() { return this.digits.join(''); }, // "4862"
};

function render() {
  if (state.view === 'home') {
    appEl.innerHTML = `
      <main style="padding:3rem 2rem; max-width:900px; margin:0 auto;">
        <h1>Escape Game Santé – Cyberattaque à l'hôpital</h1>
        <p>Vous avez 45 minutes pour restaurer le système avant l’arrêt complet des services.</p>
        <button id="start" style="padding:.75rem 1rem;">Démarrer</button>
      </main>
    `;
    document.getElementById('start')!.addEventListener('click', () => { state.view = 'ransom'; render(); });
    return;
  }

  if (state.view === 'ransom') {
    appEl.innerHTML = `
      <div style="display:flex; min-height:100vh;">
        <aside style="width:360px; background:#111; color:#fff; padding:1rem;">
          <h2 style="margin-top:0;">Énigmes — Santé mentale (jeunes)</h2>
          <ol style="padding-left:1rem;">
            <li style="margin:.25rem 0;">
              <button class="open-puzzle" data-id="0" style="width:100%">${state.solved[0] ? '✅' : '🧩'} #1 Disque chiffrant (3 niveaux)</button>
            </li>
            <li style="margin:.25rem 0;">
              <button class="open-puzzle" data-id="1" style="width:100%">${state.solved[1] ? '✅' : '🧩'} #2 Labyrinthe des pensées</button>
            </li>
            <li style="margin:.25rem 0;">
              <button class="open-puzzle" data-id="2" style="width:100%">${state.solved[2] ? '✅' : '🧩'} #3 Mot de passe émotionnel</button>
            </li>
            <li style="margin:.25rem 0;">
              <button class="open-puzzle" data-id="3" style="width:100%">${state.solved[3] ? '✅' : '🧩'} #4 Boîte à messages</button>
            </li>
          </ol>
          <hr/>
          <p>Code maître (indices découverts) :</p>
          <p style="font-size:1.25rem; letter-spacing:.25rem;"><strong>${state.maskedCode}</strong></p>
          <p style="font-size:.9rem;opacity:.8;">Résolvez les 4 énigmes pour connaître tous les chiffres.</p>
        </aside>

        <main style="flex:1; background:#0e0e0e; color:#fff; display:flex; align-items:center; justify-content:center;">
          <div style="text-align:center; max-width:560px; width:100%; padding:2rem;">
            <h1 style="color:#ff6b6b;">VOS DONNÉES SONT CHIFFRÉES</h1>
            <p>Le réseau de l'hôpital est verrouillé. Entrez le code maître (4 chiffres).</p>
            <div id="timer" style="font-size:64px; margin:1rem 0;">45:00</div>
            <div style="display:flex; gap:.5rem; justify-content:center; flex-wrap:wrap;">
              <input id="master" inputmode="numeric" maxlength="4" placeholder="----" style="padding:.75rem; width:200px; text-align:center; letter-spacing:.5rem;"/>
              <button id="unlock" style="padding:.75rem 1rem;">Déverrouiller</button>
            </div>
            <p id="feedback" style="height:1.5rem; margin-top:.75rem;"></p>
          </div>
        </main>
      </div>

      <dialog id="puzzleModal">
        <form method="dialog" style="min-width: 560px; max-width: 860px;">
          <h3 id="puzzleTitle" style="margin-top:0;"></h3>
          <div id="puzzleBody"></div>
          <menu style="margin-top:1rem;display:flex;gap:.5rem;justify-content:flex-end;">
            <button value="close">Fermer</button>
          </menu>
        </form>
      </dialog>
    `;

    // Timer
    let remaining = 45 * 60;
    const timerEl = document.getElementById('timer')!;
    const iv = setInterval(() => {
      remaining--;
      const m = String(Math.floor(remaining / 60)).padStart(2, '0');
      const s = String(remaining % 60).padStart(2, '0');
      timerEl.textContent = `${m}:${s}`;
      if (remaining <= 0) { clearInterval(iv); document.getElementById('feedback')!.textContent = '⏱️ Temps écoulé…'; }
    }, 1000);

    // Déverrouillage
    document.getElementById('unlock')!.addEventListener('click', () => {
      const input = (document.getElementById('master') as HTMLInputElement).value.trim();
      const fb = document.getElementById('feedback')!;
      if (!state.allSolved) { fb.textContent = '🧩 Résolvez d’abord toutes les énigmes.'; return; }
      fb.textContent = (input === state.masterCode) ? '✅ Système restauré. Bien joué !' : '❌ Code incorrect.';
      if (input === state.masterCode) clearInterval(iv);
    });

    // Ouvrir énigme
    document.querySelectorAll<HTMLButtonElement>('.open-puzzle').forEach(btn => {
      btn.addEventListener('click', () => openPuzzle(parseInt(btn.dataset.id!, 10)));
    });

    function openPuzzle(idx: number) {
      const modal = document.getElementById('puzzleModal') as HTMLDialogElement;
      const title = document.getElementById('puzzleTitle')!;
      const body = document.getElementById('puzzleBody')!;

      // ===== P0 — DISQUE CHIFFRANT MULTI-NIVEAUX (couleurs) — Chiffre 4 =====
      // ===== P0 — DISQUE CHIFFRANT (symboles + anneaux indépendants) =====
if (idx === 0) {
  title.textContent = 'Énigme #1 — Disque chiffrant';

  const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const N = ALPHA.length;
  const CIPHERTEXT = 'HPKL'; // AIDE chiffré par +7
  const OFFSET_SOLUTION = 7;

  // Symboles à afficher sur les anneaux externes/médians
  const SYMBOLS: string[] = [
    'Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω','∑','∏'
  ];

  // Offsets indépendants
  let offsetMid = 0;  // médian (mauve) -> chiffrement
  let offsetNum = 0;  // chiffres (orange) -> repère

  body.innerHTML = `
    <style>
      .wrap-disk { display:flex; gap:1.25rem; align-items:flex-start; flex-wrap:wrap; }
      .panel { min-width:320px; max-width:460px; }
      .btn { padding:.5rem .75rem; background:#1b1b1b; border:1px solid #333; color:#f3f4f6; border-radius:6px; cursor:pointer; }
      .btn:active { transform: translateY(1px); }
      .bar { display:flex; gap:.5rem; flex-wrap:wrap; align-items:center; margin-top:.25rem; }
      .box { padding:.6rem .8rem; border:1px solid #444; background:#0f1012; border-radius:8px; }
      .live { font-variant: small-caps; letter-spacing:.18rem; }
      .hint { opacity:.9; font-size:.9rem; }
      .warn { color:#fca5a5; }
    </style>

    <div class="wrap-disk">
      <div id="svgHost"></div>
      <div class="panel">
        <div class="box">
          <div>Message chiffré : <strong>${CIPHERTEXT}</strong></div>
          <div>Décodage : <span id="plain" class="live">----</span></div>
        </div>

        <div class="bar">
          <strong>Anneau médian (mauve)</strong>
          <button class="btn rot-mid" data-step="-5">⟲ −5</button>
          <button class="btn rot-mid" data-step="-1">⟲ −1</button>
          <button class="btn rot-mid" data-step="+1">⟲ +1</button>
          <button class="btn rot-mid" data-step="+5">⟲ +5</button>
          <button id="snapMid" class="btn">Astuce</button>
        </div>

        <div class="bar">
          <strong>Anneau chiffres (orange)</strong>
          <button class="btn rot-num" data-step="-5">⟲ −5</button>
          <button class="btn rot-num" data-step="-1">⟲ −1</button>
          <button class="btn rot-num" data-step="+1">⟲ +1</button>
          <button class="btn rot-num" data-step="+5">⟲ +5</button>
        </div>

        <p class="hint">Tourne le médian jusqu’à lire le mot clair, puis valide.</p>

        <div class="bar">
          <input id="manual" placeholder="Tape le mot clair…" style="flex:1; padding:.5rem .75rem; background:#0f0f0f; border:1px solid #333; color:#fff; border-radius:6px;">
          <button id="validate" class="btn">Valider</button>
        </div>
        <p id="msg"></p>
      </div>
    </div>
  `;

  // ===== SVG =====
  const host = body.querySelector<HTMLDivElement>('#svgHost')!;
  const size = 360;
  const cx = size/2, cy = size/2;
  const outerR = 170;
  const midR1 = 140, midR0 = 108;
  const numR1 = 108, numR0 = 78;
  const hubR = 62, pivotR = 10;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', String(size));
  svg.setAttribute('height', String(size));

  const gOuter = document.createElementNS(svgNS, 'g');
  const gMid = document.createElementNS(svgNS, 'g');
  const gNum = document.createElementNS(svgNS, 'g');
  const gTop = document.createElementNS(svgNS, 'g');
  svg.appendChild(gOuter); svg.appendChild(gMid); svg.appendChild(gNum); svg.appendChild(gTop);
  host.appendChild(svg);

  function ring(g: SVGGElement, rOuter: number, rInner: number, fill: string, stroke: string) {
    const p = document.createElementNS(svgNS, 'path');
    const d = `
      M ${cx - rOuter},${cy}
      a ${rOuter},${rOuter} 0 1,0 ${2*rOuter},0
      a ${rOuter},${rOuter} 0 1,0 ${-2*rOuter},0
      M ${cx - rInner},${cy}
      a ${rInner},${rInner} 0 1,1 ${2*rInner},0
      a ${rInner},${rInner} 0 1,1 ${-2*rInner},0
    `;
    p.setAttribute('d', d);
    p.setAttribute('fill', fill);
    p.setAttribute('fill-rule','evenodd');
    p.setAttribute('stroke', stroke);
    g.appendChild(p);
  }

  function radialLabels(g: SVGGElement, items: string[], r: number, fontPx: number, color = '#111') {
    const step = 360 / items.length;
    for (let i=0; i<items.length; i++) {
      const ang = -90 + i * step;
      const t = document.createElementNS(svgNS, 'text');
      t.setAttribute('x', String(cx));
      t.setAttribute('y', String(cy - r));
      t.setAttribute('fill', color);
      t.setAttribute('font-size', String(fontPx));
      t.setAttribute('font-family', '"Times New Roman", serif');
      t.setAttribute('font-weight', '700');
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('dominant-baseline', 'central');
      t.setAttribute('transform', `rotate(${ang} ${cx} ${cy})`);
      t.textContent = items[i];
      g.appendChild(t);
    }
  }

  // Anneau externe
  ring(gOuter, outerR, midR1, '#e7e5e4', '#9ca3af');
  radialLabels(gOuter, SYMBOLS, (outerR + midR1)/2, 18, '#111');

  // Anneau médian
  ring(gMid, midR1, midR0, '#c7a0c9', '#7e22ce');
  radialLabels(gMid, SYMBOLS, (midR1 + midR0)/2, 16, '#1a1625');

  // Anneau chiffres
  const NUMS = Array.from({length:N}, (_,i)=>String(i+1));
  ring(gNum, numR1, numR0, '#eab676', '#b45309');
  radialLabels(gNum, NUMS, (numR1 + numR0)/2, 14, '#1a1207');

  // Repère rectangle
  const markerW = 12, markerH = 24;
  const marker = document.createElementNS(svgNS, 'rect');
  marker.setAttribute('x', String(cx - markerW/2));
  marker.setAttribute('y', String(cy - outerR - markerH));
  marker.setAttribute('width', String(markerW));
  marker.setAttribute('height', String(markerH));
  marker.setAttribute('fill', '#0b0b0b');
  marker.setAttribute('stroke', '#111');
  gTop.appendChild(marker);

  // Rivet
  const rivet = document.createElementNS(svgNS, 'circle');
  rivet.setAttribute('cx', String(cx));
  rivet.setAttribute('cy', String(cy));
  rivet.setAttribute('r', String(pivotR));
  rivet.setAttribute('fill', '#e3b341');
  rivet.setAttribute('stroke', '#b68a16');
  rivet.setAttribute('stroke-width', '2');
  gTop.appendChild(rivet);

  // Rotation indépendante
  function applyRotation() {
    const angMid = (offsetMid * 360) / N;
    const angNum = (offsetNum * 360) / N;
    gMid.setAttribute('transform', `rotate(${angMid} ${cx} ${cy})`);
    gNum.setAttribute('transform', `rotate(${angNum} ${cx} ${cy})`);
  }

  function decode(cipher: string): string {
    let out = '';
    for (const ch of cipher) {
      if (/[A-Z]/.test(ch)) {
        const idxC = ALPHA.indexOf(ch);
        const idxP = (idxC - offsetMid + N) % N;
        out += ALPHA[idxP];
      } else out += ch;
    }
    return out;
  }

  const plainEl = body.querySelector<HTMLSpanElement>('#plain')!;
  const manual = body.querySelector<HTMLInputElement>('#manual')!;
  const msg = body.querySelector<HTMLParagraphElement>('#msg')!;

  function refreshPlain() {
    const txt = decode(CIPHERTEXT);
    plainEl.textContent = txt;
    manual.value = txt;
  }

  // Boutons médian
  body.querySelectorAll<HTMLButtonElement>('.rot-mid').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.preventDefault();
      const step = parseInt(btn.dataset.step!,10);
      offsetMid = (offsetMid + step + N*10) % N;
      applyRotation(); refreshPlain();
    });
  });

  // Snap solution
  body.querySelector<HTMLButtonElement>('#snapMid')!.addEventListener('click',(e)=>{
    e.preventDefault();
    offsetMid = OFFSET_SOLUTION;
    applyRotation(); refreshPlain();
  });

  // Boutons num
  body.querySelectorAll<HTMLButtonElement>('.rot-num').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.preventDefault();
      const step = parseInt(btn.dataset.step!,10);
      offsetNum = (offsetNum + step + N*10) % N;
      applyRotation();
    });
  });

  // Drag → médian
  (function enableDragRotate(){
    let dragging=false, startAngle=0, startOffset=0;
    function ang(ev:MouseEvent){
      const r = svg.getBoundingClientRect();
      const x = ev.clientX - (r.left + r.width/2);
      const y = ev.clientY - (r.top + r.height/2);
      return Math.atan2(y,x);
    }
    svg.addEventListener('mousedown',(ev)=>{
      const dx = ev.offsetX - cx, dy = ev.offsetY - cy;
      const rr = Math.sqrt(dx*dx + dy*dy);
      if (rr < numR0 || rr > outerR) return;
      dragging = true; startAngle = ang(ev); startOffset = offsetMid; ev.preventDefault();
    });
    window.addEventListener('mousemove',(ev)=>{
      if(!dragging) return;
      const deltaDeg = ((ang(ev)-startAngle)*180)/Math.PI;
      const steps = Math.round((deltaDeg/360)*N);
      offsetMid = (startOffset + steps + N*10) % N;
      applyRotation(); refreshPlain();
    });
    window.addEventListener('mouseup',()=>dragging=false);
  })();

  // Validation
  body.querySelector<HTMLButtonElement>('#validate')!.addEventListener('click',(e)=>{
    e.preventDefault();
    const val = (manual.value||'').trim().toUpperCase();
    if (val === 'AIDE') {
      msg.innerHTML = `✅ Correct. Chiffre obtenu : ${state.digits[0]}`;
      state.solved[0] = true;
      setTimeout(()=>{ render(); modal.close(); }, 900);
    } else {
      msg.innerHTML = `<span class="warn">❌ Mauvais mot. Ajuste l'anneau médian.</span>`;
    }
  });

  applyRotation();
  refreshPlain();
  (document.getElementById('puzzleModal') as HTMLDialogElement).showModal();
}


      // ===== P1 — LABYRINTHE DES PENSÉES — Chiffre 8 =====
      if (idx === 1) {
        title.textContent = 'Énigme #2 — Labyrinthe des pensées';
        const grid: number[][] = [
          [2,0,1,0,0],
          [1,0,1,0,1],
          [0,0,0,0,1],
          [1,1,0,1,0],
          [0,0,0,1,3],
        ];
        let pos = { r:0, c:0 };
        body.innerHTML = `
          <p>Aide Lina à atteindre la zone d’écoute (🟩) en évitant les pensées bloquantes (⬛).</p>
          <div id="maze" style="display:grid; grid-template-columns:repeat(5,42px); gap:4px; margin:.5rem 0;"></div>
          <div style="display:flex; gap:.25rem; flex-wrap:wrap;">
            <button class="mv" data-dir="up">↑</button>
            <button class="mv" data-dir="left">←</button>
            <button class="mv" data-dir="down">↓</button>
            <button class="mv" data-dir="right">→</button>
          </div>
          <p id="msg" style="margin-top:.5rem;"></p>
        `;
        const maze = body.querySelector<HTMLDivElement>('#maze')!;
        const msg = body.querySelector<HTMLParagraphElement>('#msg')!;
        function draw() {
          maze.innerHTML = '';
          for (let r = 0; r < grid.length; r++) for (let c = 0; c < grid[0].length; c++) {
            const cell = document.createElement('div');
            cell.style.width='42px'; cell.style.height='42px'; cell.style.display='flex';
            cell.style.alignItems='center'; cell.style.justifyContent='center';
            cell.style.fontSize='20px'; cell.style.border='1px solid #333';
            const val = grid[r][c];
            if (r === pos.r && c === pos.c) { cell.textContent='🟦'; cell.style.background='#1e3a8a'; }
            else if (val === 1) { cell.textContent='⬛'; cell.style.background='#222'; }
            else if (val === 3) { cell.textContent='🟩'; cell.style.background='#14532d'; }
            else cell.style.background='#111';
            maze.appendChild(cell);
          }
        }
        function move(dr:number, dc:number) {
          const nr = pos.r + dr, nc = pos.c + dc;
          if (nr<0||nc<0||nr>=grid.length||nc>=grid[0].length) return;
          if (grid[nr][nc]===1) { msg.textContent='⚠️ Pensée bloquante. Cherche une autre voie.'; return; }
          pos = { r:nr, c:nc }; msg.textContent='';
          if (grid[nr][nc]===3) { msg.textContent=`✅ Zone d’écoute trouvée. Chiffre obtenu : ${state.digits[1]}`; state.solved[1]=true; setTimeout(()=>{ render(); modal.close(); },800); }
          draw();
        }
        draw();
        body.querySelectorAll<HTMLButtonElement>('.mv').forEach(b => b.addEventListener('click', (e)=>{ e.preventDefault(); const d=b.dataset.dir!; if(d==='up')move(-1,0); if(d==='down')move(1,0); if(d==='left')move(0,-1); if(d==='right')move(0,1); }));
        (document.getElementById('puzzleModal') as HTMLDialogElement).addEventListener('keydown', (ev) => {
          if (ev.key==='ArrowUp'){ev.preventDefault(); move(-1,0);} if (ev.key==='ArrowDown'){ev.preventDefault(); move(1,0);}
          if (ev.key==='ArrowLeft'){ev.preventDefault(); move(0,-1);} if (ev.key==='ArrowRight'){ev.preventDefault(); move(0,1);}
        });
        (document.getElementById('puzzleModal') as HTMLDialogElement).showModal();
        return;
      }

      // ===== P2 — MOT DE PASSE ÉMOTIONNEL — Chiffre 6 =====
      if (idx === 2) {
        title.textContent = 'Énigme #3 — Mot de passe émotionnel';
        const targetSeq = ['😔','🤔','🗣️','😊'];
        body.innerHTML = `
          <p>Composez la clé émotionnelle (glissez/déposez dans le bon ordre) :</p>
          <div style="display:flex; gap:1rem; align-items:flex-start; flex-wrap:wrap;">
            <div id="palette" style="display:flex; gap:.5rem; flex-wrap:wrap; padding:.5rem; border:1px dashed #444; min-width:240px;">
              ${['😊','😔','🗣️','🤔'].map(e => `<button class="emo" draggable="true" data-emo="${e}" style="font-size:28px; padding:.25rem .5rem; background:#1b1b1b; border:1px solid #333; cursor:grab;">${e}</button>`).join('')}
            </div>
            <div id="slots" style="display:flex; gap:.5rem;">
              ${[0,1,2,3].map(i => `<div class="slot" data-idx="${i}" style="width:52px; height:52px; border:2px dashed #555; display:flex; align-items:center; justify-content:center; font-size:26px;"></div>`).join('')}
            </div>
          </div>
          <div style="margin-top:.75rem; display:flex; gap:.5rem;">
            <button id="validateSeq">Valider</button>
            <button id="resetSeq">Réinitialiser</button>
          </div>
          <p id="msg" style="margin-top:.5rem;"></p>
        `;
        const palette = body.querySelector<HTMLDivElement>('#palette')!;
        const slots = Array.from(body.querySelectorAll<HTMLDivElement>('.slot'));
        const msg = body.querySelector<HTMLParagraphElement>('#msg')!;
        let dragEmo: string | null = null;
        palette.querySelectorAll<HTMLButtonElement>('.emo').forEach(btn => {
          btn.addEventListener('dragstart', () => { dragEmo = btn.dataset.emo || null; });
          btn.addEventListener('dragend', () => { dragEmo = null; });
        });
        slots.forEach(slot => {
          slot.addEventListener('dragover', (e) => e.preventDefault());
          slot.addEventListener('drop', (e) => { e.preventDefault(); if (!dragEmo) return; slot.textContent = dragEmo; slot.setAttribute('data-emo', dragEmo); });
        });
        body.querySelector<HTMLButtonElement>('#resetSeq')!.addEventListener('click', (e) => { e.preventDefault(); slots.forEach(s => { s.textContent=''; s.removeAttribute('data-emo'); }); msg.textContent=''; });
        body.querySelector<HTMLButtonElement>('#validateSeq')!.addEventListener('click', (e) => {
          e.preventDefault();
          const current = slots.map(s => s.getAttribute('data-emo') || '');
          const ok = current.join(',') === targetSeq.join(',');
          if (ok) { msg.textContent = `✅ Clé correcte. Chiffre obtenu : ${state.digits[2]}`; state.solved[2] = true; setTimeout(()=>{ render(); modal.close(); },700); }
          else msg.textContent = '❌ Mauvais ordre. Pense : tristesse → réflexion → parole → apaisement.';
        });
        (document.getElementById('puzzleModal') as HTMLDialogElement).showModal();
        return;
      }

      // ===== P3 — BOÎTE À MESSAGES — Chiffre 2 =====
      if (idx === 3) {
        title.textContent = 'Énigme #4 — Boîte à messages (signal caché)';
        body.innerHTML = `
          <p>L’un de ces messages contient un <strong>appel à l’aide</strong> dissimulé (acrostiche). Clique dessus.</p>
          <div style="display:grid; grid-template-columns:1fr; gap:.5rem;">
            <div class="post" data-good="false" style="padding:.75rem; background:#1b1b1b; border:1px solid #333;">
              <strong>@Noah</strong><br/>
              <span>Franchement tout roule cette semaine, j’ai enchaîné les entraînements. On se voit demain ?</span>
            </div>
            <div class="post" data-good="true" style="padding:.75rem; background:#1b1b1b; border:1px solid #333;">
              <strong>@Lina</strong><br/>
              <span>
                <span style="display:block">A l’école je fais de mon mieux,</span>
                <span style="display:block">I l arrive que je n’y arrive plus,</span>
                <span style="display:block">D es fois j’aimerais disparaître,</span>
                <span style="display:block">E t si on en parlait ?</span>
              </span>
            </div>
            <div class="post" data-good="false" style="padding:.75rem; background:#1b1b1b; border:1px solid #333;">
              <strong>@Eden</strong><br/>
              <span>J’ai commencé un nouveau jeu. Trop fun. Je dois juste dormir un peu plus 😂</span>
            </div>
          </div>
          <p id="msg" style="margin-top:.5rem;"></p>
        `;
        const posts = body.querySelectorAll<HTMLDivElement>('.post');
        const msg = body.querySelector<HTMLParagraphElement>('#msg')!;
        posts.forEach(p => p.addEventListener('click', () => {
          const good = p.dataset.good === 'true';
          if (good) { msg.textContent = `✅ Bien repéré : l’acrostiche “A I D E”. Chiffre obtenu : ${state.digits[3]}`; state.solved[3] = true; setTimeout(()=>{ render(); modal.close(); },800); }
          else msg.textContent = '❌ Regarde les premières lettres de chaque ligne…';
        }));
        (document.getElementById('puzzleModal') as HTMLDialogElement).showModal();
        return;
      }
    }
  }
}

render();

/* ===== Helpers hors render (utilisés dans P0) ===== */
function encodeWithOffset(alpha: string[] | string, plain: string, off: number): string {
  const A = Array.isArray(alpha) ? alpha : alpha.split('');
  let out = '';
  for (const ch of Array.from(plain)) {
    const idx = A.indexOf(ch);
    if (idx === -1) { out += ch; continue; }
    const N = A.length;
    out += A[(idx + off) % N];
  }
  return out;
}

