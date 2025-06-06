// Busca o usuário ativo no localStorage
const usuario = JSON.parse(localStorage.getItem('usuarioAtivo'));

// Caso não exista usuário ativo, redireciona para a página inicial
if (!usuario) {
  window.location.href = '../html/index.html';
}

const lista = document.getElementById('dadosPerfil');

// Preenche a lista com os dados do usuário
for (const chave in usuario) {
  if (usuario.hasOwnProperty(chave)) {
    const li = document.createElement('li');
    li.textContent = `${chave}: ${usuario[chave]}`;
    lista.appendChild(li);
  }
}

// Tratamento do upload e preview da foto de perfil
const uploadFoto = document.getElementById('uploadFoto');
const fotoPerfil = document.getElementById('fotoPerfil');

uploadFoto.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      fotoPerfil.src = e.target.result;

      // Opcional: salvar imagem no localStorage como base64 para persistência local
      // localStorage.setItem('fotoPerfil', e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Opcional: se quiser carregar foto salva em localStorage ao iniciar, descomente:
// const fotoSalva = localStorage.getItem('fotoPerfil');
// if (fotoSalva) {
//   fotoPerfil.src = fotoSalva;
// }
document.addEventListener('DOMContentLoaded', () => {
  const uploadInput = document.getElementById('uploadFoto');
  const fotoPerfil = document.getElementById('fotoPerfil');

  uploadInput.addEventListener('change', () => {
    const file = uploadInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        fotoPerfil.src = reader.result;
        // Opcional: salvar no localStorage
        localStorage.setItem('fotoPerfil', reader.result);
      };
      reader.readAsDataURL(file);
    }
  });

  // Recupera a imagem salva (se existir)
  const fotoSalva = localStorage.getItem('fotoPerfil');
  if (fotoSalva) {
    fotoPerfil.src = fotoSalva;
  }
});
