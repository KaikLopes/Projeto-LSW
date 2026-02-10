const API_URL = 'http://localhost:3000/jogos';
let listaGlobalJogos = [];
let modalAdd;
let modalEdit;

document.addEventListener('DOMContentLoaded', () => {
    modalAdd = new bootstrap.Modal(document.getElementById('addModal'));
    modalEdit = new bootstrap.Modal(document.getElementById('editModal'));
    buscarJogos();
});

// --- GET: Buscar ---
async function buscarJogos() {
    try {
        const resposta = await fetch(API_URL);
        listaGlobalJogos = await resposta.json();
        renderizarJogos(listaGlobalJogos);
    } catch (erro) {
        console.error(erro);
    }
}

// --- RENDERIZAR (Visual dos Cards) ---
function renderizarJogos(jogos) {
    const lista = document.getElementById('lista-jogos');
    lista.innerHTML = '';

    if (jogos.length === 0) {
        lista.innerHTML = `<p class="text-center text-secondary mt-5">Nenhum jogo no backlog.</p>`;
        return;
    }

    jogos.forEach(jogo => {
        // Define cor do status
        let statusClass = 'bg-secondary';
        if (jogo.status === 'Jogando') statusClass = 'bg-success';
        if (jogo.status === 'Desejado') statusClass = 'bg-info';
        if (jogo.status === 'Zerado') statusClass = 'bg-warning text-dark';

        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-4';
        col.innerHTML = `
            <div class="game-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h4 class="fw-bold text-white mb-0">${jogo.nome}</h4>
                        <span class="badge ${statusClass}">${jogo.status}</span>
                    </div>
                    
                    <div class="stats-grid mt-3">
                        <div class="stat-item">
                            <i class="bi bi-trophy-fill text-warning"></i>
                            <small>Rank</small>
                            <strong>${jogo.rank || '-'}</strong>
                        </div>
                        <div class="stat-item">
                            <i class="bi bi-clock-history text-info"></i>
                            <small>Tempo</small>
                            <strong>${jogo.tempo || '-'}</strong>
                        </div>
                        <div class="stat-item">
                            <i class="bi bi-fire text-danger"></i>
                            <small>Streak</small>
                            <strong>${jogo.streak || '0'} dias</strong>
                        </div>
                    </div>
                </div>

                <div class="mt-4 pt-3 border-top border-secondary d-flex justify-content-end gap-2">
                    <button class="btn btn-sm btn-outline-light" onclick="prepararEdicao('${jogo.id}')">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deletarJogo('${jogo.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        `;
        lista.appendChild(col);
    });
}

// --- POST: Adicionar Completo ---
async function adicionarJogo() {
    const novoJogo = {
        nome: document.getElementById('titulo').value,
        status: document.getElementById('status').value,
        rank: document.getElementById('rank').value,
        tempo: document.getElementById('tempo').value,
        streak: document.getElementById('streak').value
    };

    if (!novoJogo.nome) return Swal.fire('Erro', 'Nome é obrigatório!', 'error');

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(novoJogo)
        });
        document.getElementById('form-add').reset();
        modalAdd.hide();
        buscarJogos();
        Swal.fire('Sucesso', 'Jogo adicionado!', 'success');
    } catch (e) {
        console.error(e);
    }
}

// --- PREPARAR EDIÇÃO (Abre Modal com dados) ---
function prepararEdicao(id) {
    const jogo = listaGlobalJogos.find(j => j.id == id);
    if (!jogo) return;

    // Preenche os campos do modal de edição
    document.getElementById('edit-id').value = jogo.id;
    document.getElementById('edit-titulo').value = jogo.nome;
    document.getElementById('edit-status').value = jogo.status;
    document.getElementById('edit-rank').value = jogo.rank || '';
    document.getElementById('edit-tempo').value = jogo.tempo || '';
    document.getElementById('edit-streak').value = jogo.streak || '';

    modalEdit.show();
}

// --- PUT: Salvar Edição ---
async function salvarEdicao() {
    const id = document.getElementById('edit-id').value;
    const jogoAtualizado = {
        nome: document.getElementById('edit-titulo').value,
        status: document.getElementById('edit-status').value,
        rank: document.getElementById('edit-rank').value,
        tempo: document.getElementById('edit-tempo').value,
        streak: document.getElementById('edit-streak').value
    };

    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT', // Atualiza o objeto todo
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jogoAtualizado)
        });
        modalEdit.hide();
        buscarJogos();
        Swal.fire('Atualizado', 'Dados do jogo salvos!', 'success');
    } catch (e) {
        Swal.fire('Erro', 'Falha ao atualizar.', 'error');
    }
}

// --- DELETE ---
async function deletarJogo(id) {
    const result = await Swal.fire({
        title: 'Excluir?',
        text: "Não dá pra voltar atrás!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir',
        background: '#202024', color: '#fff'
    });

    if (result.isConfirmed) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        buscarJogos();
        Swal.fire('Deletado!', '', 'success');
    }
}

function filtrarJogos() {
    const termo = document.getElementById('campo-busca').value.toLowerCase();
    const filtrados = listaGlobalJogos.filter(j => j.nome.toLowerCase().includes(termo));
    renderizarJogos(filtrados);
}