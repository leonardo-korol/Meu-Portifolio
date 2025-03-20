// Função para aplicar a animação fade-in quando o elemento entrar na tela
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.info-item, .cta, .post');
    
    elements.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight) {
        element.classList.add('fade-in');
      }
    });
  });
  