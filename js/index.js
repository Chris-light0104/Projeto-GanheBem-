document.addEventListener('DOMContentLoaded', () => {
  const cadastroForm = document.getElementById('cadastroForm');
  const loginForm = document.getElementById('loginForm');
  const vagasSection = document.getElementById('vagas');
  const listaVagas = document.getElementById('listaVagas');

  // Simulação de vagas (essas aparecerão após o login)
  const vagas = [
    { titulo: 'Estágio em TI', descricao: 'Suporte técnico, manutenção de sistemas, remoto.', remuneracao: 'R$ 800' },
    { titulo: 'Freela - Design Gráfico', descricao: 'Criação de postagens para Instagram.', remuneracao: 'R$ 300 por pacote' },
    { titulo: 'Monitoria de Algoritmos', descricao: 'Auxiliar nas turmas de Algoritmos I.', remuneracao: 'Bolsa de R$ 400' }
  ];

  // Cadastro
  cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(cadastroForm);
    const usuario = {
      nome: formData.get('nome'),
      email: formData.get('email'),
      curso: formData.get('curso'),
      periodo: formData.get('periodo'),
      senha: formData.get('senha')
    };

    // Salvar no localStorage
    localStorage.setItem(usuario.email, JSON.stringify(usuario));
    alert('Cadastro realizado com sucesso! Faça login para acessar as vagas.');
    cadastroForm.reset();
  });

  // Login
  // Login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const email = formData.get('email');
  const senha = formData.get('senha');

  const userData = localStorage.getItem(email);
  if (!userData) {
    alert('Usuário não encontrado.');
    return;
  }

  const usuario = JSON.parse(userData);
  if (usuario.senha !== senha) {
    alert('Senha incorreta.');
    return;
  }

  // Salvar usuário ativo e redirecionar para painel
  localStorage.setItem('usuarioAtivo', JSON.stringify(usuario));
  window.location.href = 'ganhebem.html';
});


  function mostrarVagas() {
    document.getElementById('cadastro').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    vagasSection.style.display = 'block';

    listaVagas.innerHTML = '';
    vagas.forEach(vaga => {
      const vagaDiv = document.createElement('div');
      vagaDiv.className = 'vaga';
      vagaDiv.innerHTML = `
        <h3>${vaga.titulo}</h3>
        <p>${vaga.descricao}</p>
        <strong>Remuneração: ${vaga.remuneracao}</strong>
      `;
      listaVagas.appendChild(vagaDiv);
    });
  }
});
