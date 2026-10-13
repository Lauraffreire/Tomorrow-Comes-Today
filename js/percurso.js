(() => {
  const themes = [
    'interpretacao-do-desaparecimento.html',
    'quotidiano.html',
    'apoio-as-familias.html',
    'memoria-e-homenagens.html',
    'projetos.html',
  ];
  const key = 'tomorrow-comes-today:percurso:v2';
  const fallbackPrefix = `${key}:`;
  const parameter = 'percurso';
  const currentPage = decodeURIComponent(location.pathname.split('/').pop());
  const localFile = location.protocol === 'file:';
  const visits = new Set();

  function readVisits() {
    let values = [];
    try {
      const saved = JSON.parse(sessionStorage.getItem(key) || '[]');
      if (Array.isArray(saved)) values = saved;
    } catch { /* O percurso também funciona quando o armazenamento está indisponível. */ }
    // Ao abrir ficheiros locais, alguns navegadores isolam o armazenamento de cada página.
    if (window.name.startsWith(fallbackPrefix)) {
      try {
        const saved = JSON.parse(window.name.slice(fallbackPrefix.length));
        if (Array.isArray(saved)) values = [...values, ...saved];
      } catch { /* Ignorar dados inválidos. */ }
    }
    try {
      const saved = JSON.parse(new URL(location.href).searchParams.get(parameter) || '[]');
      if (Array.isArray(saved)) values = [...values, ...saved];
    } catch { /* Ignorar parâmetros inválidos. */ }
    return values.filter((value) => themes.includes(value));
  }

  function updateJourney() {
    readVisits().forEach((value) => visits.add(value));
    if (themes.includes(currentPage)) visits.add(currentPage);
    const saved = JSON.stringify([...visits]);
    let persisted = false;
    try {
      sessionStorage.setItem(key, saved);
      persisted = true;
    } catch { /* Usar a janela atual como alternativa. */ }
    if (localFile || !persisted) window.name = fallbackPrefix + saved;
    // Transportar apenas as páginas já abertas quando o armazenamento é isolado.
    if (localFile || !persisted) {
      document.querySelectorAll('a[href]').forEach((link) => {
        const href = link.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        const target = new URL(href, location.href);
        const page = decodeURIComponent(target.pathname.split('/').pop());
        if (target.protocol !== location.protocol || target.host !== location.host) return;
        if (!['index.html', 'conclusao.html', ...themes].includes(page)) return;
        target.searchParams.set(parameter, saved);
        link.href = target.href;
      });
    }

    const complete = themes.every((theme) => visits.has(theme));
    document.querySelectorAll('[data-journey-unlocked]').forEach((element) => {
      element.hidden = !complete;
    });
    document.querySelectorAll('[data-journey-locked]').forEach((element) => {
      element.hidden = complete;
    });
  }

  updateJourney();
  window.addEventListener('pageshow', updateJourney);
  window.addEventListener('focus', updateJourney);
})();
