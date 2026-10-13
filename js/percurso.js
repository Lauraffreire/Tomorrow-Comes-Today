(() => {
  const themes = [
    'interpretacao-do-desaparecimento.html',
    'quotidiano.html',
    'apoio-as-familias.html',
    'memoria-e-homenagens.html',
    'projetos.html',
  ];
  const key = 'tomorrow-comes-today:percurso:v1';
  const fallbackPrefix = `${key}:`;
  const currentPage = decodeURIComponent(location.pathname.split('/').pop());

  function readVisits() {
    let values = [];
    try {
      const saved = JSON.parse(localStorage.getItem(key) || '[]');
      if (Array.isArray(saved)) values = saved;
    } catch { /* O percurso também funciona quando o armazenamento está indisponível. */ }
    // Ao abrir ficheiros locais, alguns navegadores isolam o armazenamento de cada página.
    if (window.name.startsWith(fallbackPrefix)) {
      try {
        const saved = JSON.parse(window.name.slice(fallbackPrefix.length));
        if (Array.isArray(saved)) values = [...values, ...saved];
      } catch { /* Ignorar dados inválidos. */ }
    }
    return new Set(values.filter((value) => themes.includes(value)));
  }

  function updateJourney() {
    const visits = readVisits();
    if (themes.includes(currentPage)) visits.add(currentPage);
    const saved = JSON.stringify([...visits]);
    let persisted = false;
    try {
      localStorage.setItem(key, saved);
      persisted = true;
    } catch { /* Usar a janela atual como alternativa. */ }
    if (location.protocol === 'file:' || !persisted) window.name = fallbackPrefix + saved;

    const complete = themes.every((theme) => visits.has(theme));
    document.querySelectorAll('[data-journey-unlocked]').forEach((element) => {
      element.hidden = !complete;
    });
    document.querySelectorAll('[data-journey-locked]').forEach((element) => {
      element.hidden = complete;
    });
    if (complete && themes.includes(currentPage) && !document.querySelector('.journey-return')) {
      const link = document.createElement('a');
      link.className = 'journey-return';
      link.href = 'index.html#objetos';
      link.textContent = 'Exploraste todos os temas. Volta aos objetos para descobrir a conclusão →';
      document.querySelector('main').append(link);
    }
  }

  updateJourney();
  window.addEventListener('pageshow', updateJourney);
  window.addEventListener('storage', (event) => {
    if (event.key === key || event.key === null) updateJourney();
  });
})();
