// Sem JavaScript, todas as folhas continuam disponíveis para leitura.
const calendar = document.querySelector('.calendar-object');

if (calendar) {
  const sheets = [...calendar.querySelectorAll('.calendar-sheet')];
  const controls = calendar.querySelector('.calendar-controls');
  const previous = calendar.querySelector('[data-calendar-prev]');
  const next = calendar.querySelector('[data-calendar-next]');
  const status = calendar.querySelector('.calendar-status');
  let current = 0;

  function showSheet() {
    sheets.forEach((sheet, index) => {
      sheet.hidden = index !== current;
    });
    previous.disabled = current === 0;
    next.disabled = current === sheets.length - 1;
    status.textContent = `Folha ${current + 1} de ${sheets.length}`;
  }

  previous.addEventListener('click', () => {
    current = Math.max(0, current - 1);
    showSheet();
  });
  next.addEventListener('click', () => {
    current = Math.min(sheets.length - 1, current + 1);
    showSheet();
  });
  controls.hidden = false;
  showSheet();
}

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
