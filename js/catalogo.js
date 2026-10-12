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
