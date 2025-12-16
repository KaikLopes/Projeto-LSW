/* === Meu Player Completo e Navegável - Script JS === */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONSTANTES E ELEMENTOS ---
    const CLIENT_ID = '726b76ab'; 
    const API_BASE_URL = 'https://api.jamendo.com/v3.0';

    // Navegação e Views (NOVOS)
    const homeView = document.getElementById('home-view');
    const searchView = document.getElementById('search-view');
    const linkHome = document.getElementById('link-home'); // Botão Início na Sidebar
    const appLogo = document.getElementById('app-logo');   // Logo na Sidebar
    const backHomeBtn = document.getElementById('back-home-btn'); // Botão Voltar na busca

    // Containers de Busca
    const searchInput = document.getElementById('search-input-field');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchHeaderTitle = document.getElementById('search-header-title');

    // Player Elements (Mini)
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const queueBtn = document.getElementById('queue-btn');
    const currentCover = document.getElementById('current-cover');
    const currentTitle = document.getElementById('current-title');
    const currentArtist = document.getElementById('current-artist');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const volumeSlider = document.getElementById('volume-slider');
    const miniPlayerClickArea = document.getElementById('mini-player-click-area');

    // Floating Player Elements
    const floatingPlayer = document.getElementById('floating-player');
    const closeFpBtn = document.getElementById('close-fp-btn');
    const fpCover = document.getElementById('fp-cover');
    const fpTitle = document.getElementById('fp-title');
    const fpArtist = document.getElementById('fp-artist');
    const fpPlayPauseBtn = document.getElementById('fp-play-pause-btn');
    const fpPrevBtn = document.getElementById('fp-prev-btn');
    const fpNextBtn = document.getElementById('fp-next-btn');
    const fpRepeatBtn = document.getElementById('fp-repeat-btn');
    const fpProgressBar = document.getElementById('fp-progress-bar');
    const fpProgress = document.getElementById('fp-progress');
    const fpCurrentTimeEl = document.getElementById('fp-current-time');
    const fpDurationEl = document.getElementById('fp-duration');

    // Queue Elements
    const queueSidebar = document.getElementById('queue-sidebar');
    const queueList = document.getElementById('queue-list');
    const closeQueueBtn = document.getElementById('close-queue-btn');

    // Containers da Home
    const trendingContainer = document.getElementById('top-trending-container');
    const rockContainer = document.getElementById('rock-container');
    const popContainer = document.getElementById('pop-container');
    const electronicContainer = document.getElementById('electronic-container');
    const hiphopContainer = document.getElementById('hiphop-container');


    // --- ESTADO DO PLAYER ---
    let currentPlaylist = []; 
    let currentTrackIndex = 0; 
    let isPlaying = false;
    let repeatState = 0; 
    let isQueueOpen = false;
    let isFloatingPlayerOpen = false;


    // --- 2. API ---
    async function fetchTracks(tags = '', order = 'popularity_month', limit = 10) {
        let url = `${API_BASE_URL}/tracks/?client_id=${CLIENT_ID}&format=json&limit=${limit}&order=${order}`;
        if (tags) url += `&tags=${tags}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.results.map(track => ({
                id: track.id,
                title: track.name,
                artist: track.artist_name,
                arquivo: track.audio,
                capa: track.image.replace('1.jpg', '4.jpg'), 
            }));
        } catch (error) { console.error('Erro API:', error); return []; }
    }

    function renderTracks(tracks, container) {
        container.innerHTML = '';
        if (tracks.length === 0) { container.innerHTML = '<p>Nada encontrado.</p>'; return; }
        tracks.forEach((track, index) => {
            const trackCard = document.createElement('div');
            trackCard.className = 'track-card';
            trackCard.innerHTML = `
                <img src="${track.capa}" alt="${track.title}">
                <h4>${track.title}</h4>
                <p>${track.artist}</p>
            `;
            trackCard.addEventListener('click', () => {
                currentPlaylist = tracks;
                currentTrackIndex = index;
                loadTrack(currentPlaylist[currentTrackIndex]);
                playSong();
            });
            container.appendChild(trackCard);
        });
    }


    // --- 3. CONTROLES DE ÁUDIO ---
    function loadTrack(track) {
        currentTitle.textContent = track.title;
        currentArtist.textContent = track.artist;
        currentCover.src = track.capa;
        fpTitle.textContent = track.title;
        fpArtist.textContent = track.artist;
        fpCover.src = track.capa;
        audioPlayer.src = track.arquivo;
        progress.style.width = '0%'; fpProgress.style.width = '0%';
        if(isQueueOpen) renderQueue();
    }

    function playSong() {
        if (!audioPlayer.src) return;
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        fpPlayPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        audioPlayer.play();
        if(isQueueOpen) renderQueue();
    }

    function pauseSong() {
        isPlaying = false;
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        fpPlayPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        audioPlayer.pause();
        if(isQueueOpen) renderQueue();
    }

    function handlePlayPause() { isPlaying ? pauseSong() : playSong(); }

    function prevSong() {
        if (currentPlaylist.length === 0) return;
        if (audioPlayer.currentTime > 3) {
            audioPlayer.currentTime = 0;
        } else {
            currentTrackIndex--;
            if (currentTrackIndex < 0) currentTrackIndex = currentPlaylist.length - 1;
            loadTrack(currentPlaylist[currentTrackIndex]);
        }
        playSong();
    }

    function nextSong(isAuto = false) {
        if (currentPlaylist.length === 0) return;
        if (repeatState === 2 && isAuto) {
            audioPlayer.currentTime = 0;
            playSong();
            return;
        }
        currentTrackIndex++;
        if (currentTrackIndex >= currentPlaylist.length) {
            if (repeatState === 1 || repeatState === 2) { 
                currentTrackIndex = 0; 
            } else {
                pauseSong(); 
                audioPlayer.currentTime = 0;
                return;
            }
        }
        loadTrack(currentPlaylist[currentTrackIndex]);
        playSong();
    }

    function toggleRepeat() {
        repeatState = (repeatState + 1) % 3; 
        const finalIcon = repeatState === 2 ? '<i class="fas fa-repeat"></i><span style="font-size:10px;position:absolute;">1</span>' : '<i class="fas fa-repeat"></i>';
        repeatBtn.innerHTML = finalIcon;
        fpRepeatBtn.innerHTML = finalIcon;
        if (repeatState === 0) {
            repeatBtn.classList.remove('active');
            fpRepeatBtn.classList.remove('active');
        } else {
            repeatBtn.classList.add('active');
            fpRepeatBtn.classList.add('active');
        }
    }

    function toggleQueue() {
        isQueueOpen = !isQueueOpen;
        queueSidebar.classList.toggle('hidden', !isQueueOpen);
        queueBtn.classList.toggle('active', isQueueOpen);
        if(isQueueOpen) renderQueue();
    }

    function renderQueue() {
        queueList.innerHTML = '';
        if(currentPlaylist.length === 0) {
            queueList.innerHTML = '<p style="padding:15px; color:#aaa;">Fila vazia</p>';
            return;
        }
        currentPlaylist.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = `queue-item ${index === currentTrackIndex ? 'playing' : ''}`;
            li.innerHTML = `
                <img src="${track.capa}" class="queue-cover">
                <div class="queue-info">
                    <span class="queue-title">${track.title}</span>
                    <span class="queue-artist">${track.artist}</span>
                </div>
                ${index === currentTrackIndex && isPlaying ? '<i class="fas fa-volume-up" style="color:#1DB954;margin-left:auto;"></i>' : ''}
            `;
            li.addEventListener('click', () => {
                 if (index !== currentTrackIndex) {
                    currentTrackIndex = index;
                    loadTrack(currentPlaylist[currentTrackIndex]);
                    playSong();
                 }
            });
            queueList.appendChild(li);
        });
    }

    function toggleFloatingPlayer() {
        if (!audioPlayer.src) return;
        isFloatingPlayerOpen = !isFloatingPlayerOpen;
        floatingPlayer.classList.toggle('hidden', !isFloatingPlayerOpen);
        document.getElementById('expand-icon').className = isFloatingPlayerOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
    }

    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        if (isNaN(duration)) return;
        const p = (currentTime / duration) * 100;
        progress.style.width = `${p}%`;
        fpProgress.style.width = `${p}%`;
        currentTimeEl.textContent = formatTime(currentTime);
        fpCurrentTimeEl.textContent = formatTime(currentTime);
        durationEl.textContent = formatTime(duration);
        fpDurationEl.textContent = formatTime(duration);
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    function formatTime(s) {
        const m = Math.floor(s / 60);
        const sc = Math.floor(s % 60);
        return `${m}:${sc < 10 ? '0' : ''}${sc}`;
    }


    // --- 4. FUNÇÕES DE NAVEGAÇÃO E BUSCA (O segredo está aqui!) ---

    // Função para mostrar a Home e esconder a Busca
    function showHome(e) {
        if (e) e.preventDefault(); // Evita comportamento padrão de link se houver
        searchView.style.display = 'none';
        homeView.style.display = 'block';
        searchInput.value = ''; // Limpa o campo de busca
    }

    // Função para mostrar a Busca e esconder a Home
    async function handleSearch(e) {
        if (e.key !== 'Enter' || searchInput.value.trim() === '') return;
        const term = searchInput.value.trim();
        
        // Troca as telas
        homeView.style.display = 'none';
        searchView.style.display = 'block';

        // Atualiza título e limpa resultados antigos
        searchHeaderTitle.textContent = `Resultados para "${term}"`;
        searchResultsContainer.innerHTML = '<div class="loading">Buscando...</div>';

        // Busca e renderiza
        const tracks = await fetchTracks(term, 'popularity_total', 20);
        renderTracks(tracks, searchResultsContainer);
    }


    // --- INICIALIZAÇÃO E EVENTOS ---
    async function initializeApp() {
        // Carrega Home
        Promise.all([
            fetchTracks('', 'popularity_week', 10).then(t => renderTracks(t, trendingContainer)),
            fetchTracks('rock', 'popularity_month', 10).then(t => renderTracks(t, rockContainer)),
            fetchTracks('pop', 'popularity_month', 10).then(t => renderTracks(t, popContainer)),
            fetchTracks('electronic', 'popularity_month', 10).then(t => renderTracks(t, electronicContainer)),
            fetchTracks('hiphop', 'popularity_month', 10).then(t => renderTracks(t, hiphopContainer))
        ]);

        // Listeners Padrão
        playPauseBtn.addEventListener('click', handlePlayPause);
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', () => nextSong(false));
        repeatBtn.addEventListener('click', toggleRepeat);
        queueBtn.addEventListener('click', toggleQueue);
        progressBar.addEventListener('click', setProgress);
        volumeSlider.addEventListener('input', (e) => audioPlayer.volume = e.target.value);
        miniPlayerClickArea.addEventListener('click', toggleFloatingPlayer);

        fpPlayPauseBtn.addEventListener('click', handlePlayPause);
        fpPrevBtn.addEventListener('click', prevSong);
        fpNextBtn.addEventListener('click', () => nextSong(false));
        fpRepeatBtn.addEventListener('click', toggleRepeat);
        fpProgressBar.addEventListener('click', setProgress);
        closeFpBtn.addEventListener('click', toggleFloatingPlayer);
        closeQueueBtn.addEventListener('click', toggleQueue);

        audioPlayer.addEventListener('timeupdate', updateProgress);
        audioPlayer.addEventListener('ended', () => nextSong(true));
        
        // NOVOS LISTENERS PARA NAVEGAÇÃO
        searchInput.addEventListener('keypress', handleSearch);
        
        // Aqui está a correção que você pediu:
        linkHome.addEventListener('click', showHome); // Clicar em "Início"
        appLogo.addEventListener('click', showHome);  // Clicar no Logo "MeuPlayer"
        backHomeBtn.addEventListener('click', showHome); // Clicar no botão voltar (se quiser usar)
    }

    initializeApp();
});