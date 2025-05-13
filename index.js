const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/song4.mp3',
        displayName: 'EVERYTHING',
        cover: 'assets/1.jpg',
        artist: 'The Black Skirts',
    },
    {
        path: 'assets/song5.mp3',
        displayName: 'My Love Mine All Mine',
        cover: 'assets/5.jpg',
        artist: 'Mitski',
    },
    {
        path: 'assets/song3.mp3',
        displayName: 'Nothing',
        cover: 'assets/6.jpg',
        artist: 'Bruno Major',
    },
    {
        path: 'assets/song1.mp3',
        displayName: 'Watermelon',
        cover: 'assets/7.jpg',
        artist: 'John + Jane Q, Public',
    },
    {
        path: 'assets/song6.mp3',
        displayName: 'Endless Love',
        cover: 'assets/9.jpeg',
        artist: 'Colde',
    },
    {
        path: 'assets/song10.mp3',
        displayName: '7 Weeks and 3 Days',
        cover: 'assets/10.jpeg',
        artist: 'Yungatita',
    },
    {
        path: 'assets/song11.mp3',
        displayName: 'See You Soon',
        cover: 'assets/11.jpeg',
        artist: 'Wisp',
    },
    {
        path: 'assets/song12.mp3',
        displayName: 'Big City Blues',
        cover: 'assets/12.jpeg',
        artist: 'Lil Peep',
    
    },
    {
        path: 'assets/song2.mp3',
        displayName: 'Apple Cider',
        cover: 'assets/13.jpg',
        artist: 'Beabadoobee',
    },
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);