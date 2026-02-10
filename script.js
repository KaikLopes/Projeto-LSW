const API_URL = 'http://localhost:3000/jogos';

// --- 1. GET (Buscar) ---
async function buscarJogos() {
    try {
        const resposta = await fetch(API_URL);
        const jogos = await resposta.json();
        renderizarJogos(jogos);
    } catch (erro) {
        console.error("Erro ao buscar:", erro);
        alert("Erro ao conectar com o servidor! Verifique se o terminal está aberto.");
    }
}

// Função visual para mostrar na tela
function renderizarJogos(jogos) {
    const lista = document.getElementById('lista-jogos');
    lista.innerHTML = ''; 

    jogos.forEach(jogo => {
        const div = document.createElement('div');
        div.className = 'card game-item';
        div.innerHTML = `
            <div>
                <strong>${jogo.nome}</strong> <br>
                <small>Status: ${jogo.status}</small>
            </div>
            <div class="actions">
                <button class="btn-edit" onclick="editarStatus('${jogo.id}')">Editar</button>
                <button class="btn-delete" onclick="deletarJogo('${jogo.id}')">Excluir</button>
            </div>
        `;
        lista.appendChild(div);
    });
}

// --- 2. POST (Criar) ---
async function adicionarJogo() {
    const titulo = document.getElementById('titulo').value;
    const status = document.getElementById('status').value;

    if (!titulo || !status) return alert("Preencha todos os campos!");

    const novoJogo = { nome: titulo, status: status };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoJogo)
        });
        // Limpa os campos e recarrega a lista
        document.getElementById('titulo').value = '';
        document.getElementById('status').value = '';
        buscarJogos(); 
    } catch (erro) {
        console.error("Erro ao adicionar:", erro);
    }
}

// --- 3. PUT (Atualizar) ---
async function editarStatus(id) {
    const novoStatus = prompt("Digite o novo status para este jogo:");
    if (!novoStatus) return;

    try {
        // Usando PATCH para mudar só o status sem precisar enviar o objeto todo
        await fetch(`${API_URL}/${id}`, {
            method: 'PATCH', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: novoStatus })
        });
        buscarJogos();
    } catch (erro) {
        console.error("Erro ao atualizar:", erro);
    }
}

// --- 4. DELETE (Apagar) ---
async function deletarJogo(id) {
    if(!confirm("Tem certeza que quer excluir esse jogo?")) return;

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        buscarJogos();
    } catch (erro) {
        console.error("Erro ao deletar:", erro);
    }
}

// Inicia carregando os dados assim que abre a tela
buscarJogos();