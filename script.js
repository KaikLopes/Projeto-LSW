// Agora, 'musicas' começa como um array vazio.
// Vamos preencher ele buscando os dados do nosso arquivo JSON.
let musicas = [];

// Esta função assíncrona vai carregar o arquivo
async function carregarMusicas() {
  try {
    // 1. Pede ao navegador para buscar o arquivo 'musicas.json'
    const resposta = await fetch('musicas.json');
    
    // 2. Converte a resposta (que é texto) em um objeto/array JavaScript
    const dados = await resposta.json();
    
    // 3. ENFIM! Preenche nosso array de músicas com os dados carregados
    musicas = dados;
    
    // 4. AGORA que as músicas estão carregadas, você chama sua função
    // que desenha o player na tela (ou o que quer que você faça primeiro)
    console.log('Músicas carregadas!', musicas.length);
    // ex: iniciarPlayer();
    // ex: renderizarPlaylist();
    
  } catch (error) {
    console.error('Erro ao carregar o arquivo musicas.json:', error);
  }
}

// Chame a função para iniciar tudo
carregarMusicas();

// -------------------------------------------------------------------
// TODO O RESTO DO SEU CÓDIGO VEM AQUI
// (suas funções de play, pause, next, etc., continuam iguais)
// -------------------------------------------------------------------