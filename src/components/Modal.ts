export default (() => {
  const modal = document.querySelector('.modal') as HTMLDivElement;

  let active = false;

  function replaceContent(content: HTMLElement) {
    modal.innerHTML = '';
    modal.append(content);
  }

  function hide() {
    modal.classList.add('hidden');
    active = false;
  }

  function show() {
    modal.classList.remove('hidden');
    active = true;
  }

  return {
    get active() {
      return active;
    },
    startNewGame(cb: () => void) {
      show();
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = 'Start new game';
      btn.addEventListener('click', () => {
        cb();
        hide();
      });

      replaceContent(btn);
    }
  };
})();

// want modal to take children and
