// Função para configurar o envio do formulário de contato
function setupContactForm() {
  const form = document.getElementById('form'); // ID correto do formulário

  if (!form) {
    console.error('Formulário não encontrado!');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const formData = Object.fromEntries(new FormData(form).entries()); // Converte os dados do formulário para um objeto

    try {
      const res = await fetch('/api/send-email', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json(); // Resposta da API
      alert(result.message);

      if (res.ok) {
        form.reset(); // Reseta o formulário caso o envio tenha sido bem-sucedido
      }
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('Erro ao enviar mensagem.');
    }
  });
}


// Função para configurar o efeito de hover nos cards
function setupCardHoverEffect() {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const img = card.querySelector('.cardImage');
    const staticImg = img.src;
    const gifImg = img.getAttribute('data-gif');

    card.addEventListener('mouseenter', () => {
      img.src = gifImg;
    });

    card.addEventListener('mouseleave', () => {
      img.src = staticImg;
    });
  });
}

// Função para configurar a timeline de animações
function setupTimeline() {
  const timelineItems = document.querySelectorAll('.timelineItem');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.5 }
  );

  timelineItems.forEach((item) => {
    observer.observe(item);
  });
}

// Função para configurar o menu no mobile
function toggleMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  // Alterna a visibilidade do menu ao clicar no botão
  menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('show');
    menuToggle.classList.toggle('open'); // Adiciona a classe 'open' para transformar o ícone
  });

  // Fechar o menu quando o usuário clicar fora dele
  window.addEventListener('click', function (event) {
    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      mobileMenu.classList.remove('show');
      menuToggle.classList.remove('open'); // Remove a classe 'open' quando o menu é fechado
    }
  });
}

// Função principal para inicializar todas as funcionalidades
document.addEventListener('DOMContentLoaded', () => {
  setupContactForm();  // Configura o formulário
  setupCardHoverEffect();  // Configura o efeito de hover nos cards
  setupTimeline();     // Configura a timeline
  toggleMenu();    // Configura o menu mobile (nome correto)
});
