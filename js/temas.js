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
