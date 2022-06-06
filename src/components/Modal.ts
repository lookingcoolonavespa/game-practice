export default () => {
  const modal = document.querySelector('.modal') as HTMLDivElement;

  return {
    replaceContent: (content: HTMLElement) => {
      modal.append(content);
    }
  };
};

// want modal to take children and
