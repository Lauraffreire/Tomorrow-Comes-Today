const notebook = document.querySelector('.support-notebook');

if (notebook) {
  const pages = [...notebook.querySelectorAll('.notebook-page')];
  const controls = document.querySelector('.notebook-controls');
  const previous = controls.querySelector('[data-notebook-prev]');
  const next = controls.querySelector('[data-notebook-next]');
  const status = controls.querySelector('.notebook-status');
  let spread = 0;
  const spreadCount = Math.ceil(pages.length / 2);

  function showSpread() {
    pages.forEach((page, index) => {
      page.hidden = Math.floor(index / 2) !== spread;
    });
    previous.disabled = spread === 0;
    next.disabled = spread === spreadCount - 1;
    status.textContent = `Páginas ${spread * 2 + 1}–${Math.min(spread * 2 + 2, pages.length)} de ${pages.length}`;
  }

  previous.addEventListener('click', () => {
    spread = Math.max(0, spread - 1);
    showSpread();
  });
  next.addEventListener('click', () => {
    spread = Math.min(spreadCount - 1, spread + 1);
    showSpread();
  });
  controls.hidden = false;
  showSpread();
}
