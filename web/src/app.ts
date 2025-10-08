/***** === Thème global + micro-UX === *****/
function ensureTheme() {
  if (document.getElementById('cyber-theme')) return;
  const css = `
:root{
  --bg:#0b0d10; --bg-2:#0f1115; --panel:#11151b; --panel-2:#0f1318;
  --border:#1e2630; --muted:#9aa4b2; --text:#e6eef7;
  --accent:#66e2ff; --accent-2:#7c5cff; --ok:#22c55e; --warn:#f59e0b; --err:#ef4444;
  --radius:14px; --shadow: 0 6px 18px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.04);
  --mono: ui-monospace, Menlo, Consolas, "Courier New", monospace;
  --sans: Inter, system-ui, Segoe UI, Roboto, Arial, "Noto Sans", sans-serif;
}
  /* --- Code maître --- */
#master{
  color: var(--text) !important;       /* force la couleur du texte */
  background:#0d1218 !important;
  border:1px solid var(--border);
  border-radius:12px;
  font-family: var(--mono);
  font-size: 28px;
  font-weight: 800;
  letter-spacing: .6rem;
  text-align:center;
  caret-color: var(--accent);
  text-shadow: 0 1px 0 rgba(0,0,0,.6);
}
#master::placeholder{
  color: rgba(230,238,247,.35);
  letter-spacing:.4rem;
}
/* --- Liste des énigmes --- */
aside ol {
  display: flex;
  flex-direction: column;
  gap: .75rem;
  margin-top: 1rem;
}

aside li {
  list-style: none;
}

aside .open-puzzle {
  display: flex;
  align-items: center;
  gap: .75rem;
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1.05rem;
  font-weight: 600;
  background: #1a1f2b;
  border: 2px solid #2d3748;
  border-radius: 12px;
  color: #e5e7eb;
  cursor: pointer;
  transition: all .25s ease;
}

aside .open-puzzle:hover {
  background: #232b3b;
  border-color: #3b82f6;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,.5);
}

aside .open-puzzle:focus {
  outline: none;
  border-color: #60a5fa;
  box-shadow: 0 0 0 3px rgba(59,130,246,.4);
}

/* solved state */
aside .open-puzzle.solved {
  background: #14532d;
  border-color: #22c55e;
  color: #bbf7d0;
}

/* --- Code maître --- */
aside .master-box {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  border: 2px solid #374151;
  border-radius: 12px;
  background: #111827;
  text-align: center;
}

aside .master-box strong {
  display: block;
  font-size: 1.8rem;
  letter-spacing: .5rem;
  margin-top: .5rem;
  color: #f3f4f6;
}

/* Empêche l’autofill de blanchir/masquer le texte */
#master:-webkit-autofill,
#master:-webkit-autofill:hover,
#master:-webkit-autofill:focus {
  -webkit-text-fill-color: var(--text) !important;
  transition: background-color 9999s ease-in-out 0s;
  -webkit-box-shadow: 0 0 0px 1000px #0d1218 inset;
  box-shadow: 0 0 0 1000px #0d1218 inset;
}

html,body{height:100%;background:linear-gradient(180deg,var(--bg),#07090c);color:var(--text);font-family:var(--sans);}
a{color:var(--accent);}
aside{background:linear-gradient(180deg,var(--panel),var(--panel-2));border-right:1px solid var(--border);box-shadow:var(--shadow);}
aside h2{font-size:1rem;color:#cfe7ff;}
aside .open-puzzle{background:#0f141a;border:1px solid var(--border);color:var(--text);padding:.6rem .7rem;border-radius:10px;text-align:left;transition:.15s;}
aside .open-puzzle:hover{transform:translateY(-1px);background:#121925;border-color:#2a3341}
main{background: radial-gradient(1200px 600px at 70% 10%, rgba(124,92,255,.12), transparent 60%), radial-gradient(800px 400px at 30% 85%, rgba(102,226,255,.10), transparent 60%), var(--bg);}
button,.btn{background:linear-gradient(180deg,#18202a,#111820);border:1px solid var(--border);color:var(--text);padding:.6rem .8rem;border-radius:10px;cursor:pointer;transition:.15s;box-shadow:0 2px 0 rgba(255,255,255,.03), inset 0 1px 0 rgba(255,255,255,.03);}
button:hover,.btn:hover{border-color:#334155;box-shadow:0 0 0 3px rgba(124,92,255,.15)}
input[type="text"]{background:#0e141b;color:var(--text);border:1px solid var(--border);border-radius:10px;padding:.6rem .8rem;outline:none}
input[type="text"]:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.15)}
.box{background:linear-gradient(180deg,#0f141a,#0c1016);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow);}
/* Timer / code */
#timer{font-family:var(--mono);letter-spacing:.1rem;padding:.4rem .75rem;border:1px solid var(--border);border-radius:12px;background:#0d1218;box-shadow:var(--shadow);}
#master{font-family:var(--mono);background:#0d1218;border:1px solid var(--border);border-radius:12px;}
/* Dialog */
dialog::backdrop{background:rgba(0,0,0,.6)}
dialog{border:1px solid var(--border);border-radius:16px;background:linear-gradient(180deg,#0e1319,#0a0f14);box-shadow:0 40px 100px rgba(0,0,0,.6);color:var(--text);animation:pop .18s ease-out;}
@keyframes pop{from{transform:translateY(6px) scale(.98);opacity:.6}to{transform:none;opacity:1}}
/* Labyrinthe */
#maze div{border-radius:8px;transition:.15s}
#maze div:hover{filter:brightness(1.1)}
/* Disque */
.wrap-disk svg{filter:drop-shadow(0 8px 28px rgba(0,0,0,.45))}
.wrap-disk text{paint-order:stroke;stroke:rgba(0,0,0,.4);stroke-width:2}
/* Taquin */
.taquin-grid .tile{transition:.15s;background:linear-gradient(180deg,rgba(255,255,255,.03),rgba(0,0,0,.05)),radial-gradient(140% 140% at 10% -10%, rgba(124,92,255,.22), transparent 35%),#121823;}
.taquin-grid .tile.num:hover{transform:translateY(-1px)}
.taquin-grid .tile.blank{background:repeating-linear-gradient(135deg,#0b1016,#0b1016 8px,#0a0e13 8px,#0a0e13 16px);border:1px dashed #2b3542}
`;
  const el = document.createElement('style');
  el.id = 'cyber-theme';
  el.textContent = css;
  document.head.appendChild(el);
}
function shake(el: HTMLElement){
  el.animate(
    [{transform:'translateX(0)'},{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'translateX(0)'}],
    {duration:180,iterations:1}
  );
}

/***** === App === *****/
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
  ensureTheme();

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
        <aside style="width:360px; color:#fff; padding:1rem;">
          <h2 style="margin-top:0;">Énigmes — Santé mentale (jeunes)</h2>
          <ol style="padding-left:1rem;">
            <li style="margin:.25rem 0;">
              <button class="open-puzzle" data-id="0" style="width:100%">${state.solved[0] ? '✅' : '🧩'} #1 Disque chiffrant (3 niveaux)</button>
            </li>
            <li style="margin:.25rem 0;">
              <button class="open-puzzle" data-id="1" style="width:100%">${state.solved[1] ? '✅' : '🧩'} #2 Labyrinthe des pensées</button>
            </li>
            <li style="margin:.25rem 0;">
              <button class="open-puzzle" data-id="2" style="width:100%">${state.solved[2] ? '✅' : '🧩'} #3 Taquin 4x4 (jeu des chiffres à déplacer)</button>
            </li>
            <li style="margin:.25rem 0;">
              <button class="open-puzzle" data-id="3" style="width:100%">${state.solved[3] ? '✅' : '🧩'} #4 Cadenas à combinaison (Mastermind simplifié)</button>
            </li>
          </ol>
          <hr style="border-color:var(--border)"/>
          <div class="box" style="padding:.6rem .75rem;">
            <p style="margin:.25rem 0;">Code maître (indices découverts) :</p>
            <p style="font-size:1.25rem; letter-spacing:.25rem; margin:.25rem 0;"><strong>${state.maskedCode}</strong></p>
            <p style="font-size:.9rem;opacity:.8;">Résolvez les 4 énigmes pour connaître tous les chiffres.</p>
          </div>
        </aside>

        <main style="flex:1; color:#fff; display:flex; align-items:center; justify-content:center;">
          <div class="box" style="text-align:center; max-width:560px; width:100%; padding:2rem;">
            <h1 style="color:#ff6b6b; margin-top:0;">VOS DONNÉES SONT CHIFFRÉES</h1>
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

    // Déverrouillage (avec shake)
    document.getElementById('unlock')!.addEventListener('click', () => {
      const input = (document.getElementById('master') as HTMLInputElement).value.trim();
      const fb = document.getElementById('feedback')!;
      if (!state.allSolved) { fb.textContent = '🧩 Résolvez d’abord toutes les énigmes.'; shake(fb as HTMLElement); return; }
      const ok = (input === state.masterCode);
      fb.textContent = ok ? '✅ Système restauré. Bien joué !' : '❌ Code incorrect.';
      if (!ok) shake(fb as HTMLElement);
      if (ok) clearInterval(iv);
    });

    // Ouvrir énigme
    document.querySelectorAll<HTMLButtonElement>('.open-puzzle').forEach(btn => {
      btn.addEventListener('click', () => openPuzzle(parseInt(btn.dataset.id!, 10)));
    });

    function openPuzzle(idx: number) {
      const modal = document.getElementById('puzzleModal') as HTMLDialogElement;
      const title = document.getElementById('puzzleTitle')!;
      const body = document.getElementById('puzzleBody')!;

      /***** ===== P0 — DISQUE CHIFFRANT (alignement auto) — Chiffre 4 ===== *****/
      if (idx === 0) {
        title.textContent = 'Énigme #1 — Disque chiffrant (alignement automatique)';

        const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); const N = ALPHA.length;
        const CIPHERTEXT = 'HPKL';     // → clair "AIDE" si décalage +7
        const SHIFTS      = [7, 7, 7, 7];
        const SYMBOL_SEQ  = ['Δ','Ω','∑','∏'];
        const SYMBOLS: string[] = [
          'Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ',
          'Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω','∑','∏'
        ];
        const NUMS = Array.from({length:N}, (_,i)=>String(i+1));

        let offsetOuter = 0, offsetMid = 0, offsetInner = 0;
        let stepIndex = 0, discovered = '', processedForStep = false;

        body.innerHTML = `
          <style>
            .wrap-disk { display:flex; gap:1.25rem; align-items:flex-start; flex-wrap:wrap; }
            .panel { min-width:320px; max-width:520px; }
            .btn { padding:.5rem .75rem; background:#1b1b1b; border:1px solid #333; color:#f3f4f6; border-radius:6px; cursor:pointer; }
            .bar { display:flex; gap:.5rem; flex-wrap:wrap; align-items:center; margin-top:.4rem; }
            .pill { display:inline-flex; align-items:center; gap:.4rem; padding:.25rem .5rem; border:1px solid #333; border-radius:999px; background:#141414; }
            .sym { font-weight:800; }
            .num { font-weight:800; color:#b45309; }
            .let { font-weight:800; color:#7e22ce; }
            .ok { color:#22c55e; }
          </style>

          <div class="wrap-disk">
            <div id="svgHost"></div>

            <div class="panel">
              <div class="box" style="padding:.6rem .8rem; margin-bottom:.5rem;">
                <div>Message chiffré : <strong>${CIPHERTEXT}</strong></div>
                <div>Mot découvert : <span id="found" style="font-variant:small-caps; letter-spacing:.18rem;">____</span></div>
              </div>

              <div class="box" id="taskBox" style="padding:.6rem .8rem;">
                <div>Étape <span id="stepNum">1</span> / ${CIPHERTEXT.length}</div>
                <div style="margin-top:.25rem">Cible à aligner au repère :</div>
                <div style="display:flex; gap:.5rem; flex-wrap:wrap; margin-top:.25rem;">
                  <span class="pill">Symbole <span id="tSym" class="sym">Δ</span></span>
                  <span class="pill">Chiffre <span id="tNum" class="num">7</span></span>
                  <span class="pill">Lettre <span id="tLet" class="let">H</span></span>
                </div>

                <div style="margin-top:.6rem">Au repère (live) :</div>
                <div style="display:flex; gap:.5rem; flex-wrap:wrap; margin-top:.25rem;">
                  <span class="pill">Symbole <span id="cSym" class="sym">—</span></span>
                  <span class="pill">Chiffre <span id="cNum" class="num">—</span></span>
                  <span class="pill">Lettre <span id="cLet" class="let">—</span></span>
                </div>
                <p id="matchMsg" style="margin:.5rem 0 0;"></p>
              </div>

              <div class="box" style="margin-top:.5rem; padding:.6rem .8rem;">
                <div><strong>Contrôles (drag direct sur chaque couronne)</strong></div>
                <div class="bar"><span style="min-width:160px;">Symbole (extérieur)</span>
                  <button class="btn rot-out" data-step="-5">⟲ −5</button>
                  <button class="btn rot-out" data-step="-1">⟲ −1</button>
                  <button class="btn rot-out" data-step="+1">⟲ +1</button>
                  <button class="btn rot-out" data-step="+5">⟲ +5</button>
                </div>
                <div class="bar"><span style="min-width:160px;">Chiffre (médian)</span>
                  <button class="btn rot-mid" data-step="-5">⟲ −5</button>
                  <button class="btn rot-mid" data-step="-1">⟲ −1</button>
                  <button class="btn rot-mid" data-step="+1">⟲ +1</button>
                  <button class="btn rot-mid" data-step="+5">⟲ +5</button>
                </div>
                <div class="bar"><span style="min-width:160px;">Lettre (intérieur)</span>
                  <button class="btn rot-in" data-step="-5">⟲ −5</button>
                  <button class="btn rot-in" data-step="-1">⟲ −1</button>
                  <button class="btn rot-in" data-step="+1">⟲ +1</button>
                  <button class="btn rot-in" data-step="+5">⟲ +5</button>
                  <button id="snapIn" class="btn">Astuce +7</button>
                </div>
              </div>
            </div>
          </div>
        `;

        // ===== SVG =====
        const host = body.querySelector<HTMLDivElement>('#svgHost')!;
        const size = 360;
        const cx = size/2, cy = size/2;

        const outerR = 170;               // externe SYMBOLS (rotatif)
        const midR1 = 140, midR0 = 108;   // médian NUMBERS
        const inR1  = 108, inR0  = 78;    // intérieur LETTERS
        const hubR = 62, pivotR = 10;

        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('width', String(size));
        svg.setAttribute('height', String(size));

        const gOuter = document.createElementNS(svgNS, 'g');
        const gMid   = document.createElementNS(svgNS, 'g');
        const gInner = document.createElementNS(svgNS, 'g');
        const gTop   = document.createElementNS(svgNS, 'g');
        svg.appendChild(gOuter); svg.appendChild(gMid); svg.appendChild(gInner); svg.appendChild(gTop);
        host.appendChild(svg);

        function ring(g: SVGGElement, rOuter: number, rInner: number, fill: string, stroke: string) {
          const p = document.createElementNS(svgNS, 'path');
          const d = `
            M ${cx - rOuter},${cy} a ${rOuter},${rOuter} 0 1,0 ${2*rOuter},0 a ${rOuter},${rOuter} 0 1,0 ${-2*rOuter},0
            M ${cx - rInner},${cy} a ${rInner},${rInner} 0 1,1 ${2*rInner},0 a ${rInner},${rInner} 0 1,1 ${-2*rInner},0
          `;
          p.setAttribute('d', d);
          p.setAttribute('fill', fill);
          p.setAttribute('fill-rule', 'evenodd');
          p.setAttribute('stroke', stroke);
          g.appendChild(p);
        }
        function radialLabels(g: SVGGElement, items: string[], r: number, fontPx: number, color = '#111', weight='700') {
          const step = 360 / items.length;
          for (let i=0; i<items.length; i++) {
            const ang = -90 + i * step;
            const t = document.createElementNS(svgNS, 'text');
            t.setAttribute('x', String(cx));
            t.setAttribute('y', String(cy - r));
            t.setAttribute('fill', color);
            t.setAttribute('font-size', String(fontPx));
            t.setAttribute('font-family', '"Times New Roman", serif');
            t.setAttribute('font-weight', weight);
            t.setAttribute('text-anchor', 'middle');
            t.setAttribute('dominant-baseline', 'central');
            t.setAttribute('transform', `rotate(${ang} ${cx} ${cy})`);
            t.textContent = items[i];
            g.appendChild(t);
          }
        }

        // EXTERIEUR SYMBOLS
        ring(gOuter, outerR, midR1, '#e7e5e4', '#9ca3af');
        radialLabels(gOuter, SYMBOLS, (outerR + midR1)/2, 18, '#111');

        // MEDIAN NUMBERS
        ring(gMid, midR1, midR0, '#eab676', '#b45309');
        radialLabels(gMid, NUMS, (midR1 + midR0)/2, 14, '#1a1207');

        // INTERIEUR LETTERS
        ring(gInner, inR1, inR0, '#c7a0c9', '#7e22ce');
        radialLabels(gInner, ALPHA, (inR1 + inR0)/2, 16, '#1a1625');

        // Repère rectangulaire + rivet
        const marker = document.createElementNS(svgNS, 'rect');
        marker.setAttribute('x', String(cx - 6));
        marker.setAttribute('y', String(cy - outerR - 22));
        marker.setAttribute('width', '12');
        marker.setAttribute('height', '24');
        marker.setAttribute('fill', '#0b0b0b');
        marker.setAttribute('stroke', '#111');
        marker.setAttribute('rx', '2');
        gTop.appendChild(marker);

        const rivet = document.createElementNS(svgNS, 'circle');
        rivet.setAttribute('cx', String(cx));
        rivet.setAttribute('cy', String(cy));
        rivet.setAttribute('r', String(pivotR));
        rivet.setAttribute('fill', '#e3b341');
        rivet.setAttribute('stroke', '#b68a16');
        rivet.setAttribute('stroke-width', '2');
        gTop.appendChild(rivet);

        function valueAtTop(items: string[], offset: number): string {
          const idxTop = (N - (offset % N) + N) % N;
          return items[idxTop];
        }
        function decodeLetter(cipher: string, k: number): string {
          const i = ALPHA.indexOf(cipher);
          if (i < 0) return cipher;
          return ALPHA[(i - k + N) % N];
        }

        const foundEl  = body.querySelector<HTMLSpanElement>('#found')!;
        const stepNum  = body.querySelector<HTMLSpanElement>('#stepNum')!;
        const tSymEl   = body.querySelector<HTMLSpanElement>('#tSym')!;
        const tNumEl   = body.querySelector<HTMLSpanElement>('#tNum')!;
        const tLetEl   = body.querySelector<HTMLSpanElement>('#tLet')!;
        const cSymEl   = body.querySelector<HTMLSpanElement>('#cSym')!;
        const cNumEl   = body.querySelector<HTMLSpanElement>('#cNum')!;
        const cLetEl   = body.querySelector<HTMLSpanElement>('#cLet')!;
        const matchMsg = body.querySelector<HTMLParagraphElement>('#matchMsg')!;

        function refreshTargetsUI() {
          tSymEl.textContent = SYMBOL_SEQ[stepIndex];
          tNumEl.textContent = String(SHIFTS[stepIndex]);
          tLetEl.textContent = CIPHERTEXT[stepIndex];
          stepNum.textContent = String(stepIndex + 1);
          foundEl.textContent = (discovered + '____').slice(0, CIPHERTEXT.length);
          processedForStep = false;
        }
        function updateHUD() {
          cSymEl.textContent = valueAtTop(SYMBOLS, offsetOuter);
          cNumEl.textContent = valueAtTop(NUMS,     offsetMid);
          cLetEl.textContent = valueAtTop(ALPHA,    offsetInner);
        }
        function checkAutoSolve() {
          const okSym = cSymEl.textContent === SYMBOL_SEQ[stepIndex];
          const okNum = cNumEl.textContent === String(SHIFTS[stepIndex]);
          const okLet = cLetEl.textContent === CIPHERTEXT[stepIndex];

          if (okSym && okNum && okLet && !processedForStep) {
            processedForStep = true;
            const plain = decodeLetter(CIPHERTEXT[stepIndex], SHIFTS[stepIndex]);
            discovered += plain;
            foundEl.textContent = (discovered + '____').slice(0, CIPHERTEXT.length);
            matchMsg.innerHTML = `✅ Lettre trouvée : <b>${plain}</b>`;
            if (discovered.length === CIPHERTEXT.length) {
              matchMsg.innerHTML = `✅ Mot trouvé : <b>${discovered}</b>. Chiffre obtenu : ${state.digits[0]}`;
              state.solved[0] = true;
              setTimeout(()=>{ render(); (document.getElementById('puzzleModal') as HTMLDialogElement).close(); }, 1000);
            } else {
              stepIndex++;
              refreshTargetsUI();
            }
          } else {
            matchMsg.innerHTML = okSym || okNum || okLet ? '… continue à ajuster, tu y es presque.' : '';
          }
        }

        function applyRotation() {
          gOuter.setAttribute('transform', `rotate(${(offsetOuter*360)/N} ${cx} ${cy})`);
          gMid.setAttribute('transform',   `rotate(${(offsetMid*360)/N} ${cx} ${cy})`);
          gInner.setAttribute('transform', `rotate(${(offsetInner*360)/N} ${cx} ${cy})`);
          updateHUD();
          checkAutoSolve();
        }

        body.querySelectorAll<HTMLButtonElement>('.rot-out').forEach(b=>{
          b.addEventListener('click', e=>{ e.preventDefault();
            const s = parseInt(b.dataset.step!,10);
            offsetOuter = (offsetOuter + s + N*10) % N; applyRotation();
          });
        });
        body.querySelectorAll<HTMLButtonElement>('.rot-mid').forEach(b=>{
          b.addEventListener('click', e=>{ e.preventDefault();
            const s = parseInt(b.dataset.step!,10);
            offsetMid = (offsetMid + s + N*10) % N; applyRotation();
          });
        });
        body.querySelectorAll<HTMLButtonElement>('.rot-in').forEach(b=>{
          b.addEventListener('click', e=>{ e.preventDefault();
            const s = parseInt(b.dataset.step!,10);
            offsetInner = (offsetInner + s + N*10) % N; applyRotation();
          });
        });
        body.querySelector<HTMLButtonElement>('#snapIn')!.addEventListener('click', e=>{
          e.preventDefault();
          offsetInner = (offsetInner + SHIFTS[stepIndex]) % N;
          applyRotation();
        });

        // Drag ciblé
        (function enableTargetedDrag(){
          type Target = 'outer'|'mid'|'inner'|null;
          let dragging=false, target:Target=null, startAngle=0, startOffset=0;

          function angle(ev:MouseEvent){
            const r = svg.getBoundingClientRect();
            const x = ev.clientX - (r.left + r.width/2);
            const y = ev.clientY - (r.top  + r.height/2);
            return Math.atan2(y,x);
          }
          svg.addEventListener('mousedown',(ev)=>{
            const rect = svg.getBoundingClientRect();
            const x = ev.clientX - (rect.left + rect.width/2);
            const y = ev.clientY - (rect.top  + rect.height/2);
            const rho = Math.sqrt(x*x + y*y);
            if (rho >= midR1 && rho <= outerR)      { target = 'outer'; startOffset = offsetOuter; }
            else if (rho >= midR0 && rho <= midR1)  { target = 'mid';   startOffset = offsetMid; }
            else if (rho >= inR0  && rho <= inR1)   { target = 'inner'; startOffset = offsetInner; }
            else return;
            dragging = true; startAngle = angle(ev); processedForStep = false; ev.preventDefault();
          });
          window.addEventListener('mousemove',(ev)=>{
            if (!dragging || !target) return;
            const deltaDeg = ((angle(ev)-startAngle)*180)/Math.PI;
            const steps = Math.round((deltaDeg/360)*N);
            if (target==='outer') offsetOuter = (startOffset + steps + N*10) % N;
            if (target==='mid')   offsetMid   = (startOffset + steps + N*10) % N;
            if (target==='inner') offsetInner = (startOffset + steps + N*10) % N;
            applyRotation();
          });
          window.addEventListener('mouseup',()=>{ dragging=false; target=null; });
        })();

        // Init
        function buildRings() {
          gOuter.innerHTML = ''; gMid.innerHTML = ''; gInner.innerHTML = '';
          ring(gOuter, outerR, midR1, '#e7e5e4', '#9ca3af');   radialLabels(gOuter, SYMBOLS, (outerR + midR1)/2, 18, '#111');
          ring(gMid,   midR1, midR0, '#eab676', '#b45309');   radialLabels(gMid,   NUMS,    (midR1 + midR0)/2, 14, '#1a1207');
          ring(gInner, inR1,  inR0,  '#c7a0c9', '#7e22ce');   radialLabels(gInner, ALPHA,   (inR1  + inR0)/2,  16, '#1a1625');
        }
        buildRings();
        refreshTargetsUI();
        applyRotation();

        modal.showModal();
        return;
      }

      /***** ===== P1 — LABYRINTHE DES PENSÉES — Chiffre 8 ===== *****/
      if (idx === 1) {
        title.textContent = 'Énigme #2 — Labyrinthe des pensées';

        type Round = { grid: number[][], letter: string };
        const rounds: Round[] = [
          { // L1 -> P (corrigé)
            grid: [
              [2,0,1,0,0],
              [1,0,1,0,1],
              [0,0,0,0,1],
              [1,1,0,0,0],
              [0,0,0,1,3],
            ], letter: 'P',
          },
          { // L2 -> A
            grid: [
              [2,1,0,0,0],
              [0,1,0,1,0],
              [0,0,0,1,0],
              [1,1,0,1,0],
              [3,0,0,0,0],
            ], letter: 'A',
          },
          { // L3 -> R
            grid: [
              [2,0,0,1,0],
              [1,1,0,1,0],
              [0,0,0,0,0],
              [0,1,1,1,0],
              [0,0,0,3,0],
            ], letter: 'R',
          },
          { // L4 -> L
            grid: [
              [2,0,1,0,0],
              [0,0,1,0,1],
              [1,0,0,0,1],
              [1,1,1,0,0],
              [0,0,0,1,3],
            ], letter: 'L',
          },
          { // L5 -> E
            grid: [
              [2,0,0,0,1],
              [1,1,1,0,1],
              [0,0,0,0,1],
              [0,1,1,0,0],
              [3,0,0,0,0],
            ], letter: 'E',
          },
        ];

        let roundIdx = 0;
        let grid: number[][] = rounds[roundIdx].grid;
        let found = '';
        let pos = { r: 0, c: 0 };

        function findStart(g: number[][]) {
          for (let r = 0; r < g.length; r++) for (let c = 0; c < g[0].length; c++) {
            if (g[r][c] === 2) return { r, c };
          }
          return { r: 0, c: 0 };
        }

        body.innerHTML = `
          <p>Aide Lina à traverser ses pensées et à <b>PARLER</b> : chaque sortie te donne une lettre.</p>
          <div class="box" style="padding:.5rem .75rem; display:inline-block;">
            Mot : <span id="progress" style="letter-spacing:.2rem; font-weight:700;">_ _ _ _ _</span>
            <span style="margin-left:.75rem; opacity:.8;">(1/5)</span>
          </div>

          <div id="maze" style="display:grid; grid-template-columns:repeat(5,42px); gap:4px; margin:.75rem 0;"></div>

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
        const progressEl = body.querySelector<HTMLSpanElement>('#progress')!;
        const modalEl = document.getElementById('puzzleModal') as HTMLDialogElement;

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
            else if (val === 2) { cell.textContent='🟨'; cell.style.background='#7c5807'; }
            else cell.style.background='#111';
            maze.appendChild(cell);
          }
        }

        function updateProgressUI() {
          const slots = ['_','_','_','_','_'];
          for (let i = 0; i < found.length; i++) slots[i] = found[i];
          progressEl.textContent = slots.join(' ');
          (progressEl.nextElementSibling as HTMLElement).textContent = ` (${Math.min(found.length+1, 5)}/5)`;
        }

        function loadRound(i: number) {
          roundIdx = i;
          grid = rounds[roundIdx].grid;
          pos = findStart(grid);
          msg.textContent = `Labyrinthe ${roundIdx+1}/5 : trouve la sortie 🟩.`;
          draw();
          updateProgressUI();
        }

        function nextRoundOrFinish() {
          const letter = rounds[roundIdx].letter;
          found += letter;
          updateProgressUI();

          if (found.length === rounds.length) {
            msg.textContent = `✅ Mot trouvé : ${found}. Chiffre obtenu : ${state.digits[1]}`;
            state.solved[1] = true;
            setTimeout(()=>{ render(); modalEl.close(); }, 900);
            return;
          }
          msg.textContent = `✅ Lettre “${letter}” trouvée. Continue !`;
          setTimeout(()=> loadRound(roundIdx + 1), 600);
        }

        function move(dr:number, dc:number) {
          const nr = pos.r + dr, nc = pos.c + dc;
          if (nr<0||nc<0||nr>=grid.length||nc>=grid[0].length) return;
          if (grid[nr][nc]===1) { msg.textContent='⚠️ Pensée bloquante. Cherche une autre voie.'; return; }
          pos = { r:nr, c:nc }; msg.textContent = '';
          draw();
          if (grid[nr][nc]===3) nextRoundOrFinish();
        }

        body.querySelectorAll<HTMLButtonElement>('.mv').forEach(b =>
          b.addEventListener('click', (e)=>{
            e.preventDefault();
            const d=b.dataset.dir!;
            if(d==='up')move(-1,0);
            if(d==='down')move(1,0);
            if(d==='left')move(0,-1);
            if(d==='right')move(0,1);
          })
        );

        modalEl.addEventListener('keydown', (ev) => {
          if (ev.key==='ArrowUp'){ev.preventDefault(); move(-1,0);}
          if (ev.key==='ArrowDown'){ev.preventDefault(); move(1,0);}
          if (ev.key==='ArrowLeft'){ev.preventDefault(); move(0,-1);}
          if (ev.key==='ArrowRight'){ev.preventDefault(); move(0,1);}
        });

        loadRound(0);
        modal.showModal();
        return;
      }

      /***** ===== P2 — Taquin 4x4 — Chiffre 6 ===== *****/
      if (idx === 2) {
        title.textContent = 'Énigme #3 — Taquin (remets les chiffres dans l’ordre)';

        const size = 4; // 4x4
        const GOAL = Array.from({ length: size * size }, (_, i) => (i + 1) % (size * size)); // 1..15,0
        let tiles: number[] = [];

        body.innerHTML = `
          <div class="taquin-wrap" style="display:flex; gap:1rem; align-items:flex-start; flex-wrap:wrap;">
            <div id="grid" class="taquin-grid" style="display:grid; grid-template-columns: repeat(${size}, 62px); gap:6px;"></div>
            <div class="panel box" style="min-width:240px; padding:.75rem;">
              <p>But : obtenir <b>1 → 15</b> avec la case vide en bas à droite.</p>
              <div style="display:flex; gap:.5rem; flex-wrap:wrap; margin:.5rem 0;">
                <button id="shuffle" class="btn">Mélanger</button>
                <button id="reset" class="btn">Réinitialiser</button>
              </div>
              <p style="opacity:.9;">Astuce : seules les tuiles <i>adjacentes</i> à la case vide peuvent bouger (clic ou flèches du clavier).</p>
              <p id="msg" style="margin-top:.5rem;"></p>
            </div>
          </div>
        `;

        const gridEl = body.querySelector<HTMLDivElement>('#grid')!;
        const msg = body.querySelector<HTMLParagraphElement>('#msg')!;
        const modalEl = document.getElementById('puzzleModal') as HTMLDialogElement;

        const clone = <T,>(a: T[]) => a.slice();

        function inversions(arr: number[]): number {
          const flat = arr.filter(n => n !== 0);
          let inv = 0;
          for (let i = 0; i < flat.length; i++)
            for (let j = i + 1; j < flat.length; j++)
              if (flat[i] > flat[j]) inv++;
          return inv;
        }
        function blankRowFromBottom(arr: number[], n = size): number {
          const idx = arr.indexOf(0);
          const row = Math.floor(idx / n);
          return n - row; // 1=bottom
        }
        function isSolvable(arr: number[], n = size): boolean {
          const inv = inversions(arr);
          if (n % 2 === 1) return inv % 2 === 0;
          const blankFromBottom = blankRowFromBottom(arr, n);
          return (blankFromBottom % 2 === 0) ? (inv % 2 === 1) : (inv % 2 === 0);
        }
        function shuffledSolvable(): number[] {
          const a = clone(GOAL);
          for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
          }
          if (!isSolvable(a)) {
            const i = a.findIndex(x => x !== 0);
            let j = a.findIndex((x, k) => x !== 0 && k !== i);
            if (j === -1) j = i + 1;
            [a[i], a[j]] = [a[j], a[i]];
          }
          return a;
        }
        function isSolved(arr = tiles) {
          for (let i = 0; i < arr.length; i++) if (arr[i] !== GOAL[i]) return false;
          return true;
        }
        const indexToRC = (i: number) => ({ r: Math.floor(i / size), c: i % size });
        const rcToIndex = (r: number, c: number) => r * size + c;

        function canMove(tileIndex: number): boolean {
          const blank = tiles.indexOf(0);
          const { r: tr, c: tc } = indexToRC(tileIndex);
          const { r: br, c: bc } = indexToRC(blank);
          return (Math.abs(tr - br) + Math.abs(tc - bc)) === 1;
        }
        function moveIndex(tileIndex: number) {
          if (!canMove(tileIndex)) return;
          const blank = tiles.indexOf(0);
          [tiles[tileIndex], tiles[blank]] = [tiles[blank], tiles[tileIndex]];
          draw();
          if (isSolved()) {
            msg.innerHTML = `✅ Bravo ! Chiffres remis dans l’ordre. Chiffre obtenu : <b>${state.digits[2]}</b>`;
            state.solved[2] = true;
            setTimeout(() => { render(); modalEl.close(); }, 900);
          } else {
            msg.textContent = '';
          }
        }

        function draw() {
          gridEl.innerHTML = '';
          tiles.forEach((n, idx) => {
            const d = document.createElement('button');
            d.className = 'tile ' + (n === 0 ? 'blank' : 'num');
            d.textContent = n === 0 ? '' : String(n);
            if (n !== 0) d.addEventListener('click', (e) => { e.preventDefault(); moveIndex(idx); });
            gridEl.appendChild(d);
          });
        }

        function shuffle() { tiles = shuffledSolvable(); draw(); msg.textContent = ''; }
        function reset()   { tiles = clone(GOAL); draw(); msg.textContent = 'Réinitialisé.'; }

        body.querySelector<HTMLButtonElement>('#shuffle')!.addEventListener('click', (e) => { e.preventDefault(); shuffle(); });
        body.querySelector<HTMLButtonElement>('#reset')!.addEventListener('click',   (e) => { e.preventDefault(); reset();   });

        modalEl.addEventListener('keydown', (ev) => {
          const blank = tiles.indexOf(0);
          const { r, c } = indexToRC(blank);
          if (ev.key === 'ArrowUp')   { ev.preventDefault(); if (r < size - 1) moveIndex(rcToIndex(r + 1, c)); }
          if (ev.key === 'ArrowDown') { ev.preventDefault(); if (r > 0)         moveIndex(rcToIndex(r - 1, c)); }
          if (ev.key === 'ArrowLeft') { ev.preventDefault(); if (c < size - 1) moveIndex(rcToIndex(r, c + 1)); }
          if (ev.key === 'ArrowRight'){ ev.preventDefault(); if (c > 0)         moveIndex(rcToIndex(r, c - 1)); }
        });

        // init
        tiles = shuffledSolvable();
        draw();
        modal.showModal();
        return;
      }

      /***** ===== P3 — Cadenas à combinaison (Mastermind simplifié) — Chiffre 2 ===== *****/
      if (idx === 3) {
        title.textContent = 'Énigme #4 — Cadenas à combinaison';

        const SECRET = '3719'; // change si besoin
        const maxAttempts = 10;
        let attempts = 0;

        body.innerHTML = `
          <div class="box" style="padding:.75rem;">
            <p>Un cadenas protège le serveur. Devine la <b>combinaison à 4 chiffres</b>.</p>
            <p>Pour chaque tentative :</p>
            <ul style="margin:.25rem 0 0 .95rem;">
              <li>✅ = bon chiffre bien placé</li>
              <li>🟡 = bon chiffre mal placé</li>
              <li>❌ = chiffre absent</li>
            </ul>
            <div style="display:flex; gap:.5rem; margin-top:.75rem; flex-wrap:wrap;">
              <input id="guessInput" type="text" maxlength="4" inputmode="numeric" placeholder="----"
                    style="padding:.5rem; font-size:20px; letter-spacing:.4rem; text-align:center; width:140px;">
              <button id="submitGuess" class="btn">Essayer</button>
            </div>
            <div id="history" style="margin-top:1rem; font-family:monospace;"></div>
            <p id="msg" style="margin-top:.5rem;"></p>
          </div>
        `;

        const input = body.querySelector<HTMLInputElement>('#guessInput')!;
        const btn = body.querySelector<HTMLButtonElement>('#submitGuess')!;
        const historyEl = body.querySelector<HTMLDivElement>('#history')!;
        const msg = body.querySelector<HTMLParagraphElement>('#msg')!;
        const modalEl = document.getElementById('puzzleModal') as HTMLDialogElement;

        function checkGuess(guess: string) {
          const res: string[] = [];
          const secretArr = SECRET.split('');
          const guessArr = guess.split('');

          const usedSecret = Array(secretArr.length).fill(false);
          const usedGuess = Array(guessArr.length).fill(false);

          for (let i = 0; i < guessArr.length; i++) {
            if (guessArr[i] === secretArr[i]) {
              res[i] = '✅';
              usedSecret[i] = true;
              usedGuess[i] = true;
            }
          }
          for (let i = 0; i < guessArr.length; i++) {
            if (usedGuess[i]) continue;
            const idxSecret = secretArr.findIndex((s, j) => s === guessArr[i] && !usedSecret[j]);
            if (idxSecret !== -1) {
              res[i] = '🟡';
              usedSecret[idxSecret] = true;
            } else {
              res[i] = '❌';
            }
          }
          return res.join(' ');
        }

        function submit() {
          const guess = input.value.trim();
          if (!/^\d{4}$/.test(guess)) { msg.textContent = '⚠️ Entrez 4 chiffres.'; shake(msg); return; }
          attempts++;
          const feedback = checkGuess(guess);
          const line = `${guess} → ${feedback}`;
          const div = document.createElement('div');
          div.textContent = line;
          historyEl.prepend(div);

          if (guess === SECRET) {
            msg.innerHTML = `✅ Bonne combinaison ! Chiffre obtenu : <b>${state.digits[3]}</b>`;
            state.solved[3] = true;
            setTimeout(() => { render(); modalEl.close(); }, 900);
          } else if (attempts >= maxAttempts) {
            msg.textContent = `⛔ Nombre de tentatives max atteint (${maxAttempts}).`;
            input.disabled = true; btn.disabled = true;
            shake(msg);
          } else {
            msg.textContent = `Tentative ${attempts}/${maxAttempts}`;
          }

          input.value = '';
          input.focus();
        }

        btn.addEventListener('click', (e) => { e.preventDefault(); submit(); });
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); submit(); } });

        modal.showModal();
        return;
      }
    }
  }
}

render();

/* (Optionnel) Helper déjà utilisé ailleurs si besoin */
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
