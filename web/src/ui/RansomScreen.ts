import { getRemaining, setRemaining } from '../core/timer';

type Props = { remainingSec: number; onValidate: (code: string) => void };

export function renderRansom(root: HTMLElement, props: Props) {
  setRemaining(props.remainingSec);
  const fmt = (s: number) => {
    const m = Math.floor(s/60).toString().padStart(2,'0');
    const sec = (s%60).toString().padStart(2,'0');
    return `${m}:${sec}`;
  };
  root.innerHTML = `
    <section style="display:flex;align-items:center;justify-content:center;height:100vh;background:#111;color:#eee;font-family:system-ui">
      <div style="text-align:center;max-width:560px">
        <h2 style="color:#f55">VOS DONNÉES SONT CHIFFRÉES</h2>
        <p>Le réseau de l'hôpital est verrouillé. Saisissez le code maître.</p>
        <div style="font-size:48px;margin:16px 0" id="timer">--:--</div>
        <input id="code" placeholder="Code maître" style="padding:10px;font-size:18px">
        <button id="unlock" style="padding:10px 16px;font-size:18px;margin-left:8px">Déverrouiller</button>
        <p id="msg" style="margin-top:12px;min-height:24px"></p>
      </div>
    </section>
  `;
  const timerEl = root.querySelector('#timer')!;
  const msg = root.querySelector('#msg')!;
  const input = root.querySelector<HTMLInputElement>('#code')!;
  const btn = root.querySelector<HTMLButtonElement>('#unlock')!;
  const tick = () => (timerEl.textContent = fmt(getRemaining()));
  tick();
  const id = setInterval(tick, 1000);
  const onSubmit = () => props.onValidate(input.value.trim());
  btn.onclick = onSubmit;
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') onSubmit(); });
  // Nettoyage si besoin
  (window as any).__disposeRansom = () => clearInterval(id);
}
