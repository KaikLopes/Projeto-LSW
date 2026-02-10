const API_URL = 'http://localhost:3000/jogos';
let listaGlobalJogos = [];
let modalAdd; // Variável para controlar o modal do Bootstrap

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o modal
    modalAdd = new bootstrap.Modal(document.getElementById('addModal'));
    buscarJogos();
});

// --- 1. GET (Buscar) ---
async function buscarJogos() {
    try {
        const resposta = await fetch(API_URL);
        listaGlobalJogos = await resposta.json();
        renderizarJogos(listaGlobalJogos);
    } catch (erro) {
        Swal.fire('Erro!', 'Não foi possível conectar ao servidor.', 'error');
    }
}

// --- Renderização Visual ---
function renderizarJogos(jogos) {
    const lista = document.getElementById('lista-jogos');
    lista.innerHTML = '';

    if (jogos.length === 0) {
        lista.innerHTML = `
            <div class="col-12 text-center text-secondary mt-5">
                <i class="bi bi-controller display-4"></i>
                <p class="mt-3">Nenhum jogo encontrado. Adicione um novo!</p>
            </div>`;
        return;
    }

    jogos.forEach(jogo => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = `
            <div class="game-card p-4 d-flex flex-column justify-content-between">
                <div>
                    <h4 class="fw-bold mb-1">${jogo.nome}</h4>
                    <span class="status-badge mb-3 d-inline-block">${jogo.status}</span>
                </div>
                <div class="mt-4 d-flex justify-content-end gap-2">
                    <button class="btn btn-sm btn-outline-light" onclick="editarStatus('${jogo.id}', '${jogo.nome}', '${jogo.status}')">
                        <i class="bi bi-pencil-square"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deletarJogo('${jogo.id}')">
                        <i class="bi bi-trash"></i> Excluir
                    </button>
                </div>
            </div>
        `;
        lista.appendChild(col);
    });
}

// --- Busca (Filtro Local) ---
function filtrarJogos() {
    const termo = document.getElementById('campo-busca').value.toLowerCase();
    const filtrados = listaGlobalJogos.filter(jogo => 
        jogo.nome.toLowerCase().includes(termo) || 
        jogo.status.toLowerCase().includes(termo)
    );
    renderizarJogos(filtrados);
}

// --- 2. POST (Adicionar) ---
async function adicionarJogo() {
    const titulo = document.getElementById('titulo').value;
    const status = document.getElementById('status').value;

    if (!titulo) {
        Swal.fire('Atenção', 'O nome do jogo é obrigatório!', 'warning');
        return;
    }

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: titulo, status: status })
        });
        
        // Limpa form, fecha modal e avisa
        document.getElementById('form-add').reset();
        modalAdd.hide();
        Swal.fire('Sucesso!', 'Jogo adicionado ao backlog.', 'success');
        buscarJogos();
        
    } catch (erro) {
        Swal.fire('Erro!', 'Falha ao salvar o jogo.', 'error');
    }
}

// --- 3. PUT (Editar com SweetAlert Input) ---
async function editarStatus(id, nomeAtual, statusAtual) {
    // Pop-up bonito para selecionar novo status
    const { value: novoStatus } = await Swal.fire({
        title: `Editar: ${nomeAtual}`,
        input: 'select',
        inputOptions: {
            'Desejado': 'Desejado',
            'Jogando': 'Jogando',
            'Zerado': 'Zerado',
            'Platinado': 'Platinado',
            'Abandonado': 'Abandonado'
        },
        inputValue: statusAtual,
        showCancelButton: true,
        confirmButtonColor: '#8257e6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Salvar',
        cancelButtonText: 'Cancelar'
    });

    if (novoStatus) {
        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PATCH', // Mantive PATCH para facilitar
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: novoStatus })
            });
            Swal.fire('Atualizado!', 'Status alterado com sucesso.', 'success');
            buscarJogos();
        } catch (erro) {
            Swal.fire('Erro', 'Não foi possível atualizar.', 'error');
        }
    }
}

// --- 4. DELETE (Confirmação visual) ---
async function deletarJogo(id) {
    const result = await Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar',
        background: '#202024', // Fundo escuro pro modal combinar
        color: '#fff'
    });

    if (result.isConfirmed) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            Swal.fire(
                'Deletado!',
                'O jogo foi removido do backlog.',
                'success'
            );
            buscarJogos();
        } catch (erro) {
            Swal.fire('Erro', 'Falha ao deletar.', 'error');
        }
    }
}