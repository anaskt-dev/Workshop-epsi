type Props = { onStart: () => void };

export function renderHome(root: HTMLElement, props: Props) {
  root.innerHTML = `
    <main style="max-width:680px;margin:40px auto;font-family:system-ui">
      <h1>Escape Game Santé – Cyberattaque à l'hôpital</h1>
      <p>Vous avez 45 minutes pour restaurer le système avant l'arrêt complet des services.</p>
      <button id="start" style="padding:10px 16px;font-size:16px">Démarrer</button>
    </main>
  `;
  root.querySelector<HTMLButtonElement>('#start')!.onclick = props.onStart;
}
