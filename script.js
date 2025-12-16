/* === Meu Player de Música - Script JS === */

// Espera o HTML ser carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONSTANTES E ELEMENTOS DO DOM ---

    // Chave da API Jamendo
    const CLIENT_ID = '726b76ab';
    const API_BASE_URL = 'https://api.jamendo.com/v3.0';

    // Elementos do Player
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentCover = document.getElementById('current-cover');
    const currentTitle = document.getElementById('current-title');
    const currentArtist = document.getElementById('current-artist');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volume-slider');

    // Elementos da Busca
    const searchInput = document.querySelector('.search-input');
    const mainContent = document.querySelector('.main-content'); // Onde os resultados da busca aparecerão

    // Containers de Gênero
    const trendingContainer = document.getElementById('top-trending-container');
    const rockContainer = document.getElementById('rock-container');
    const popContainer = document.getElementById('pop-container');
    const electronicContainer = document.getElementById('electronic-container');
    const hiphopContainer = document.getElementById('hiphop-container');

    // Estado do Player
    let currentPlaylist = []; // Guarda a lista de músicas que está tocando (ex: a lista de 'rock')
    let currentTrackIndex = 0; // O índice da música atual na 'currentPlaylist'
    let isPlaying = false;


    // --- 2. LÓGICA DA API JAMENDO ---

    /**
     * Busca músicas na API Jamendo com base em tags e ordem.
     * @param {string} tags - Gêneros para buscar (ex: 'rock', 'pop')
     * @param {string} order - Como ordenar (ex: 'popularity_week')
     * @param {number} limit - Quantas músicas trazer
     * @returns {Array} - Uma lista de músicas formatada
     */
    async function fetchTracks(tags = '', order = 'popularity_month', limit = 10) {
        let url = `${API_BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=${limit}&order=${order}`;
        if (tags) {
            url += `&tags=${tags}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Mapeia a resposta da API para o formato que nosso player usa
            return data.results.map(track => ({
                id: track.id,
                title: track.name,
                artist: track.artist_name,
                arquivo: track.audio, // O link direto do MP3!
                capa: track.image, // O link da capa do álbum
            }));
        } catch (error) {
            console.error(`Erro ao buscar músicas (${tags}):`, error);
            return []; // Retorna um array vazio se der erro
        }
    }


    // --- 3. RENDERIZAÇÃO (Mostrar Músicas na Tela) ---

    /**
     * Cria os cards de música e os insere no HTML.
     * @param {Array} tracks - Lista de músicas vinda da API
     * @param {HTMLElement} container - O elemento <div> onde os cards serão inseridos
     */
    function renderTracks(tracks, container) {
        // Limpa a mensagem "Carregando..."
        container.innerHTML = '';

        if (tracks.length === 0) {
            container.innerHTML = '<p>Nenhuma música encontrada.</p>';
            return;
        }

        tracks.forEach((track, index) => {
            const trackCard = document.createElement('div');
            trackCard.className = 'track-card'; // Adiciona a classe para o CSS
            trackCard.innerHTML = `
                <img src="${track.capa}" alt="${track.title}">
                <div class="track-info">
                    <h4>${track.title}</h4>
                    <p>${track.artist}</p>
                </div>
            `;

            // A MÁGICA ACONTECE AQUI:
            // Adiciona um evento de clique em cada card
            trackCard.addEventListener('click', () => {
                currentPlaylist = tracks; // Define a playlist atual (ex: todas as músicas de rock)
                currentTrackIndex = index; // Define a música que o usuário clicou
                loadTrack(track); // Carrega a música no player
                playSong(); // Toca a música
            });

            container.appendChild(trackCard);
        });
    }


    // --- 4. LÓGICA DO PLAYER DE MÚSICA ---

    /**
     * Carrega os dados de uma música no player e na barra inferior.
     * @param {object} track - O objeto da música (com title, artist, etc.)
     */
    function loadTrack(track) {
        currentTitle.textContent = track.title;
        currentArtist.textContent = track.artist;
        currentCover.src = track.capa;
        audioPlayer.src = track.arquivo; // Define o MP3 no player
    }

    /** Toca a música e atualiza o ícone */
    function playSong() {
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        audioPlayer.play();
    }

    /** Pausa a música e atualiza o ícone */
    function pauseSong() {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        audioPlayer.pause();
    }

    /** Lógica do botão principal de Play/Pause */
    function handlePlayPause() {
        if (!audioPlayer.src) return; // Não faz nada se nenhuma música foi carregada
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    /** Toca a música anterior na playlist atual */
    function prevSong() {
        if (currentPlaylist.length === 0) return;
        currentTrackIndex--;
        // Se for a primeira, volta para a última (loop)
        if (currentTrackIndex < 0) {
            currentTrackIndex = currentPlaylist.length - 1;
        }
        loadTrack(currentPlaylist[currentTrackIndex]);
        playSong();
    }

    /** Toca a próxima música na playlist atual */
    function nextSong() {
        if (currentPlaylist.length === 0) return;
        currentTrackIndex++;
        // Se for a última, volta para a primeira (loop)
        if (currentTrackIndex >= currentPlaylist.length) {
            currentTrackIndex = 0;
        }
        loadTrack(currentPlaylist[currentTrackIndex]);
        playSong();
    }

    /** Atualiza a barra de progresso e os tempos */
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        
        // Atualiza a barra
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Atualiza os números de tempo
        if (duration) {
            durationEl.textContent = formatTime(duration);
        }
        currentTimeEl.textContent = formatTime(currentTime);
    }

    /** Permite clicar na barra de progresso para avançar a música */
    function setProgress(e) {
        const width = this.clientWidth; // Largura total da barra
        const clickX = e.offsetX; // Onde o usuário clicou
        const duration = audioPlayer.duration;

        if (duration) {
            audioPlayer.currentTime = (clickX / width) * duration;
        }
    }

    /** Formata segundos para o formato "minutos:segundos" */
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    /** Controla o volume */
    function setVolume(e) {
        audioPlayer.volume = e.target.value;
    }


    // --- 5. LÓGICA DE BUSCA ---

    /**
     * Lida com a busca quando o usuário aperta "Enter".
     */
    async function handleSearch(e) {
        // Só executa se a tecla for "Enter" e o campo não estiver vazio
        if (e.key !== 'Enter' || searchInput.value.trim() === '') {
            return;
        }

        const searchTerm = searchInput.value.trim();
        
        // 1. Limpa o conteúdo principal
        mainContent.innerHTML = `
            <section class="genre-section">
                <h3>Resultados para "${searchTerm}"</h3>
                <div class="track-grid" id="search-results-container">
                    <div class="loading">Carregando...</div>
                </div>
            </section>
        `;

        // 2. Busca e renderiza os novos resultados
        const tracks = await fetchTracks(searchTerm, 'popularity_total', 20);
        const searchResultsContainer = document.getElementById('search-results-container');
        renderTracks(tracks, searchResultsContainer);
    }


    // --- 6. INICIALIZAÇÃO E EVENTOS ---

    /**
     * Função principal: Carrega todas as seções de música
     * e configura os eventos dos botões.
     */
    async function initializeApp() {
        // Busca e renderiza as 5 seções ao mesmo tempo
        Promise.all([
            fetchTracks('', 'popularity_week', 10).then(tracks => renderTracks(tracks, trendingContainer)),
            fetchTracks('rock', 'popularity_month', 10).then(tracks => renderTracks(tracks, rockContainer)),
            fetchTracks('pop', 'popularity_month', 10).then(tracks => renderTracks(tracks, popContainer)),
            fetchTracks('electronic', 'popularity_month', 10).then(tracks => renderTracks(tracks, electronicContainer)),
            fetchTracks('hiphop', 'popularity_month', 10).then(tracks => renderTracks(tracks, hiphopContainer))
        ]);

        // Configura todos os botões e controles
        playPauseBtn.addEventListener('click', handlePlayPause);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        
        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', nextSong); // Toca a próxima ao acabar
        progressBar.addEventListener('click', setProgress);
        
        volumeSlider.addEventListener('input', setVolume);

        searchInput.addEventListener('keypress', handleSearch);
    }

    // Inicia a aplicação!
    initializeApp();
});