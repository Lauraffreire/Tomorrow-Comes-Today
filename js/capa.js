// Keep the cover within the space left by the visible header.
const header = document.querySelector('.site-header');

function updateHeaderHeight() {
  document.documentElement.style.setProperty(
    '--header-height',
    `${header.getBoundingClientRect().height}px`
  );
}

updateHeaderHeight();
new ResizeObserver(updateHeaderHeight).observe(header);
