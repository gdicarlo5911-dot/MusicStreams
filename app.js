/* app.js — personal music player
   Instructions:
   - Replace sampleTracks with your real tracks (see format).
   - Each track should have at least one playable direct URL (m4a or mp3).
   - If using Netlify-hosted audio, use the full HTTPS URL to the file.
   - For Dropbox public raw links, append ?raw=1 or use the raw link.
*/

/* --------------------------
   SAMPLE TRACKS — replace these
   id: unique integer
   title, artist, album, artwork (image URL)
   sources: { m4a, mp3, flac } (provide any available)
   video: optional (mp4 URL or YouTube embed link)
--------------------------- */
const sampleTracks = [
  {
    id: 101,
    title: "Sample Song A",
    artist: "Artist A",
    album: "Sample Album",
    artwork: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    duration: "3:34",
    sources: { m4a: "", mp3: "https://archive.org/download/testmp3testfile/mpthreetest.mp3", flac: "" },
    video: ""
  },
  {
    id: 102,
    title: "Sample Song B (with video)",
    artist: "Artist A",
    album: "Sample Album",
    artwork: "https://images.unsplash.com/photo-1526178612176-65f7b3f5f39c?q=80&w=800&auto=format&fit=crop",
    duration: "4:02",
    sources: { m4a: "", mp3: "", flac: "" },
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  }
];

/* --------------------------
   Replace 'tracks' with your tracks list:
   Either assign sampleTracks to tracks while testing,
   or replace sampleTracks content with your real tracks.
--------------------------- */
let tracks = sampleTracks.slice();

/* app state */
const audio = document.getElementById('audio');
let currentIndex = -1; // index in tracks array
let queue = [];
let isShuffle = false;
let repeatMode = 0; // 0 = off, 1 = all, 2 = single

/* DOM refs */
const albumGrid = document.getElementById('albumGrid');
const albumSection = document.getElementById('albumSection');
const homeSection = document.getElementById('homeSection');
const backBtn = document.getElementById('backBtn');
const tracksList = document.getElementById('tracksList');
const albumArtLarge = document.getElementById('albumArtLarge');
const albumName = document.getElementById('albumName');
const albumArtist = document.getElementById('albumArtist');
const albumDesc = document.getElementById('albumDesc');
const nowBar = document.getElementById('nowBar');
const nowArt = document.getElementById('nowArt');
const nowTitle = document.getElementById('nowTitle');
const nowArtist = document.getElementById('nowArtist');
const progressFill = document.getElementById('progressFill');
const playBtn = document.getElementById('playBtn');
const openNowBtn = document.getElementById('openNowBtn');
const playerModal = document.getElementById('playerModal');
const playerArt = document.getElementById('playerArt');
const playerTitle = document.getElementById('playerTitle');
const playerArtist = document.getElementById('playerArtist');
const queueList = document.getElementById('queueList');
const searchInput = document.getElementById('searchInput');

/* Player modal buttons */
const playBtn2 = document.getElementById('playBtn2');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn2 = document.getElementById('prevBtn2');
const nextBtn2 = document.getElementById('nextBtn2');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const closePlayer = document.getElementById('closePlayer');
const openQueueBtn = document.getElementById('openQueueBtn');
const seekBar = document.getElementById('seekBar');
const seekFill = document.getElementById('seekFill');
const curTime = document.getElementById('curTime');
const durTime = document.getElementById('durTime');
const videoArea = document.getElementById('videoArea');

/* Init app */
function init(){
  renderAlbums();
  bindUI();
  // default: show nothing playing
  updateNowBar();
}

/* Choose best playable source depending on support */
function chooseSrc(sources){
  if(!sources) return "";
  // prefer m4a, then mp3, then flac (note: Safari FLAC support varies)
  if(sources.m4a && audio.canPlayType('audio/mp4').replace(/no/,'')) return sources.m4a;
  if(sources.mp3 && audio.canPlayType('audio/mpeg').replace(/no/,'')) return sources.mp3;
  if(sources.flac && audio.canPlayType('audio/flac').replace(/no/,'')) return sources.flac;
  return sources.m4a || sources.mp3 || sources.flac || "";
}

/* Render album grid (group by album+artist) */
function renderAlbums(){
  const byAlbum = {};
  tracks.forEach((t,i)=> {
    const key = `${t.album} — ${t.artist}`;
    if(!byAlbum[key]) byAlbum[key] = { album: t.album, artist: t.artist, art: t.artwork, trackIds: [] };
    byAlbum[key].trackIds.push(i);
  });
  albumGrid.innerHTML = '';
  Object.values(byAlbum).forEach(a=>{
    const card = document.createElement('div');
    card.className = 'album-card';
    card.innerHTML = `<img class="album-art" src="${a.art}" alt="${escapeHtml(a.album)}"><div class="album-meta"><div style="font-weight:700">${escapeHtml(a.album)}</div><div class="album-meta muted">${escapeHtml(a.artist)}</div></div>`;
    card.onclick = ()=> openAlbum(a.album,a.artist);
    albumGrid.appendChild(card);
  });
}

/* Open album view */
function openAlbum(album, artist){
  homeSection.classList.add('hidden');
  albumSection.classList.remove('hidden');
  // populate header
  const idx = tracks.findIndex(t=>t.album===album && t.artist===artist);
  if(idx<0) return;
  const ref = tracks[idx];
  albumArtLarge.src = ref.artwork || '';
  albumName.textContent = ref.album;
  albumArtist.textContent = ref.artist;
  albumDesc.textContent = `${tracks.filter(t=>t.album===album && t.artist===artist).length} tracks`;
  // build track list
  tracksList.innerHTML = '';
  tracks.forEach((t, i) => {
    if(t.album===album && t.artist===artist){
      const row = document.createElement('div'); row.className = 'track-row';
      row.innerHTML = `<div class="track-left"><img class="small-art" src="${t.artwork}"><div><div class="track-title">${escapeHtml(t.title)}</div><div class="track-sub muted">${escapeHtml(t.artist)} • ${t.duration||''}</div></div></div>
                       <div><button class="icon-btn" data-idx="${i}">Play</button></div>`;
      row.querySelector('button').onclick = (e)=> {
        const idx = Number(e.currentTarget.dataset.idx);
        playIndex(idx);
      };
      tracksList.appendChild(row);
    }
  });
  window.scrollTo({top:0,behavior:'smooth'});
}

/* Back to home */
backBtn.onclick = ()=> {
  albumSection.classList.add('hidden');
  homeSection.classList.remove('hidden');
}

/* Play a track by index */
function playIndex(idx){
  if(idx<0 || idx>=tracks.length) return;
  currentIndex = idx;
  const t = tracks[currentIndex];
  const src = chooseSrc(t.sources);
  if(!src){
    alert('No playable source found for this track. Add an mp3 or m4a URL in the tracks data.');
    return;
  }
  audio.src = src;
  audio.play().catch(()=>{ /* user gesture may be needed */ });
  // set queue to remaining tracks (simple behavior); does not persist across sessions
  queue = tracks.slice(idx+1).concat(tracks.slice(0,idx));
  // update UI
  updateNowBar();
  renderQueue();
}

/* Update Now bar visuals */
function updateNowBar(){
  if(currentIndex<0){ nowBar.classList.add('hidden'); return; }
  const t = tracks[currentIndex];
  nowBar.classList.remove('hidden');
  nowArt.src = t.artwork || '';
  nowTitle.textContent = t.title;
  nowArtist.textContent = t.artist;
  playBtn.textContent = audio.paused ? '▶' : '⏸';
  // update player modal elements as well
  playerArt.src = t.artwork || '';
  playerTitle.textContent = t.title;
  playerArtist.textContent = t.artist;
  // video area
  videoArea.innerHTML = '';
  if(t.video){
    const btn = document.createElement('button'); btn.className='control'; btn.textContent='Open Video';
    btn.onclick = ()=> openVideo(t.video);
    videoArea.appendChild(btn);
  }
}

/* Simple queue render inside modal */
function renderQueue(){
  queueList.innerHTML = '';
  queue.forEach((q, i) => {
    const el = document.createElement('div'); el.className='queue-item';
    el.innerHTML = `<div>${escapeHtml(q.title)} <span class="muted small">• ${escapeHtml(q.artist)}</span></div>
                    <div><button class="icon-btn" data-idx="${i}" title="Play this">Play</button></div>`;
    el.querySelector('button').onclick = (e)=> {
      const qi = Number(e.currentTarget.dataset.idx);
      // convert queue index back to tracks index
      const trackObj = queue[qi];
      const idx = tracks.findIndex(tt => tt.id === trackObj.id);
      if(idx>=0) playIndex(idx);
    };
    queueList.appendChild(el);
  });
}

/* Playback controls */
function togglePlay(){
  if(audio.paused) audio.play(); else audio.pause();
}
playBtn.onclick = ()=> { togglePlay(); playBtn.textContent = audio.paused ? '▶' : '⏸'; };
playBtn2.onclick = ()=> { togglePlay(); updateNowBar(); };

prevBtn.onclick = prevTrack;
prevBtn2.onclick = prevTrack;
nextBtn.onclick = nextTrack;
nextBtn2.onclick = nextTrack;

shuffleBtn.onclick = ()=> {
  isShuffle = !isShuffle;
  shuffleBtn.style.opacity = isShuffle ? '1' : '0.6';
};
repeatBtn.onclick = ()=> {
  repeatMode = (repeatMode+1)%3;
  const labels = ['Off','All','One'];
  repeatBtn.textContent = 'Repeat: ' + labels[repeatMode];
};

/* previous track */
function prevTrack(){
  if(tracks.length===0) return;
  currentIndex = (currentIndex-1+tracks.length)%tracks.length;
  playIndex(currentIndex);
}

/* next track (respecting shuffle & repeat) */
function nextTrack(){
  if(tracks.length===0) return;
  if(repeatMode===2){
    // repeat single
    playIndex(currentIndex);
    return;
  }
  if(isShuffle){
    const next = Math.floor(Math.random()*tracks.length);
    playIndex(next);
    return;
  }
  if(currentIndex < tracks.length-1){
    playIndex(currentIndex+1);
  } else {
    if(repeatMode===1){
      playIndex(0);
    } else {
      // end; pause
      audio.pause();
      audio.currentTime = 0;
      updateNowBar();
    }
  }
}

/* Audio element events */
audio.addEventListener('timeupdate', ()=>{
  const pct = (audio.currentTime / (audio.duration || 1)) * 100;
  progressFill.style.width = pct + '%';
  seekFill.style.width = pct + '%';
  curTime.textContent = formatTime(audio.currentTime);
  durTime.textContent = formatTime(audio.duration || 0);
  // update small nowbar too
  document.getElementById('progressFill').style.width = pct + '%';
});
audio.addEventListener('play', ()=> { playBtn.textContent = '⏸'; playBtn2.textContent = '⏸'; });
audio.addEventListener('pause', ()=> { playBtn.textContent = '▶'; playBtn2.textContent = '▶'; });
audio.addEventListener('ended', ()=> { nextTrack(); });

/* Modal open/close */
openNowBtn.onclick = ()=> { playerModal.classList.remove('hidden'); renderQueue(); updateNowBar(); };
closePlayer.onclick = ()=> { playerModal.classList.add('hidden'); };
openQueueBtn.onclick = ()=> { 
  // quick open: if nothing playing show home
  if(currentIndex<0){ alert('Nothing playing'); return; }
  playerModal.classList.remove('hidden'); renderQueue();
};

/* Video handling */
function openVideo(url){
  // open in new tab or iframe - for simplicity open in new tab
  if(url.includes('youtube') || url.includes('youtu.be')){
    // convert watch?v= to embed if you prefer, but opening in new tab is safest on mobile
    window.open(url, '_blank');
  } else {
    // direct mp4 -> open in new tab
    window.open(url, '_blank');
  }
}

/* Simple search */
searchInput.addEventListener('input', (e)=> {
  const q = e.target.value.trim().toLowerCase();
  if(!q){ renderAlbums(); return; }
  // filter tracks for search results — show as album-like cards for results
  const results = tracks.filter(t => (t.title + ' ' + t.artist + ' ' + (t.album||'')).toLowerCase().includes(q));
  albumGrid.innerHTML = '';
  results.forEach((t,i)=> {
    const card = document.createElement('div'); card.className='album-card';
    card.innerHTML = `<img class="album-art" src="${t.artwork}"><div class="album-meta"><div style="font-weight:700">${escapeHtml(t.title)}</div><div class="album-meta muted">${escapeHtml(t.artist)}</div></div>`;
    card.onclick = ()=> playIndex(tracks.findIndex(tt => tt.id === t.id));
    albumGrid.appendChild(card);
  });
});

/* Seek bar interaction */
seekBar.addEventListener('click', (e)=> {
  const r = seekBar.getBoundingClientRect();
  const pct = (e.clientX - r.left) / r.width;
  if(audio.duration) audio.currentTime = pct * audio.duration;
});

/* simple helper: format seconds to mm:ss */
function formatTime(sec){
  if(!sec || isNaN(sec)) return '0:00';
  const s = Math.floor(sec%60); const m = Math.floor(sec/60);
  return m + ':' + (s<10?('0'+s):s);
}

/* Utility: escape html for safety */
function escapeHtml(s){ return String(s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* UI binding for play controls (some already bound) */
function bindUI(){
  // double-binding for buttons in header area (already set)
  prevBtn.addEventListener('click', prevTrack);
  nextBtn.addEventListener('click', nextTrack);
  // keyboard support (desktop)
  document.addEventListener('keydown', (e)=> {
    if(e.code==='Space'){ e.preventDefault(); togglePlay(); }
    if(e.code==='ArrowRight') nextTrack();
    if(e.code==='ArrowLeft') prevTrack();
  });
}

/* Public helper to load your track data from a JSON/Sheet (optional) */
/* Example usage:
   fetch('tracks.json').then(r=>r.json()).then(data=>{ tracks = data; renderAlbums(); });
*/

/* Initialize */
init();
