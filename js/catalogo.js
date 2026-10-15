document.querySelectorAll('[data-detail]').forEach((button) => {
  button.addEventListener('click', () => {
    document.getElementById(button.dataset.detail).showModal();
  });
});

document.querySelectorAll('.close-detail').forEach((button) => {
  button.addEventListener('click', () => {
    button.closest('dialog').close();
  });
});

document.querySelectorAll('dialog').forEach((dialog) => {
  let startedOutside = false;

  const isOutside = (event) => {
    const bounds = dialog.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom;
  };

  dialog.addEventListener('pointerdown', (event) => {
    startedOutside = event.target === dialog && isOutside(event);
  });

  dialog.addEventListener('click', (event) => {
    if (startedOutside && event.target === dialog && isOutside(event)) {
      dialog.close();
    }
    startedOutside = false;
  });
});
