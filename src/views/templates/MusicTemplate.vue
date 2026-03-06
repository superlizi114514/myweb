<template>
  <div class="music-template">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">音乐平台</div>
      <div class="nav-links">
        <a v-for="(link, i) in navLinks" :key="i">{{ link }}</a>
      </div>
      <div class="search-box">
        <input type="text" placeholder="搜索音乐、歌手..." />
      </div>
    </nav>

    <!-- 主横幅 -->
    <section class="hero">
      <div class="visualizer">
        <div v-for="n in 20" :key="n" class="bar" :style="{ animationDelay: n * 0.05 + 's' }"></div>
      </div>
      <div class="hero-content">
        <h1 class="animate-slide-up">发现好音乐</h1>
        <p class="animate-fade-in">海量正版音乐，高品质在线试听</p>
        <div class="hero-buttons animate-scale-in">
          <button class="btn-primary">开始听歌</button>
          <button class="btn-outline">浏览歌单</button>
        </div>
      </div>
    </section>

    <!-- 正在播放 -->
    <section class="now-playing">
      <div class="player-card">
        <div class="album-art" :style="{ background: currentSong.bg }">
          <span class="song-emoji">{{ currentSong.emoji }}</span>
        </div>
        <div class="song-info">
          <h2>{{ currentSong.title }}</h2>
          <p class="artist">{{ currentSong.artist }}</p>
          <div class="progress-bar">
            <div class="progress" :style="{ width: '35%' }"></div>
          </div>
          <div class="time">
            <span>1:23</span>
            <span>3:45</span>
          </div>
          <div class="controls">
            <button class="ctrl-btn">⏮</button>
            <button class="ctrl-btn play">▶</button>
            <button class="ctrl-btn">⏭</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门歌单 -->
    <section class="playlists">
      <h2>热门歌单</h2>
      <div class="playlist-grid">
        <div v-for="(pl, i) in playlists" :key="i" class="playlist-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="pl-cover" :style="{ background: pl.bg }">
            <span class="pl-emoji">{{ pl.emoji }}</span>
          </div>
          <h3>{{ pl.name }}</h3>
          <p>{{ pl.tracks }}首</p>
        </div>
      </div>
    </section>

    <!-- 热门歌曲 -->
    <section class="top-songs">
      <h2>热门歌曲</h2>
      <div class="songs-list">
        <div v-for="(song, i) in topSongs" :key="i" class="song-item" :style="{ animationDelay: i * 0.1 + 's' }">
          <span class="rank">{{ i + 1 }}</span>
          <div class="song-cover" :style="{ background: song.bg }">
            <span>{{ song.emoji }}</span>
          </div>
          <div class="song-details">
            <h3>{{ song.title }}</h3>
            <p>{{ song.artist }}</p>
          </div>
          <span class="duration">{{ song.duration }}</span>
          <button class="play-btn">▶</button>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-links">
        <a>关于我们</a>
        <a>用户协议</a>
        <a>隐私政策</a>
        <a>联系我们</a>
      </div>
      <p class="copyright">© 2024 音乐平台 版权所有</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navLinks = ['首页', '发现', '歌单', '歌手', '我的']

const currentSong = ref({
  emoji: '🎸',
  title: '夜空中最亮的星',
  artist: '逃跑计划',
  bg: 'linear-gradient(135deg, #667eea, #764ba2)'
})

const playlists = ref([
  { emoji: '🌙', name: '深夜听歌', tracks: 50, bg: 'linear-gradient(135deg, #2c3e50, #4a69bd)' },
  { emoji: '🏃', name: '运动健身', tracks: 35, bg: 'linear-gradient(135deg, #e74c3c, #c0392b)' },
  { emoji: '☕', name: '咖啡时光', tracks: 42, bg: 'linear-gradient(135deg, #8b4513, #a0522d)' },
  { emoji: '🌈', name: '治愈系', tracks: 60, bg: 'linear-gradient(135deg, #3498db, #2980b9)' },
  { emoji: '🎸', name: '摇滚精选', tracks: 38, bg: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
  { emoji: '🎹', name: '古典音乐', tracks: 45, bg: 'linear-gradient(135deg, #9b59b6, #8e44ad)' }
])

const topSongs = ref([
  { emoji: '🎤', title: '起风了', artist: '买辣椒也用券', duration: '5:22', bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { emoji: '🎸', title: '平凡之路', artist: '朴树', duration: '4:46', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { emoji: '🎹', title: '晴天', artist: '周杰伦', duration: '4:29', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { emoji: '🎻', title: '夜曲', artist: '周杰伦', duration: '3:46', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { emoji: '🥁', title: '海阔天空', artist: 'Beyond', duration: '5:25', bg: 'linear-gradient(135deg, #fa709a, #fee140)' }
])
</script>

<style scoped>
.music-template {
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0015 0%, #1a0030 50%, #0f0020 100%);
  color: #fff;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 60px;
  background: rgba(10, 0, 21, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(168, 85, 247, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 40px;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #a855f7;
}

.search-box input {
  padding: 10px 16px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  width: 200px;
  font-size: 14px;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.hero {
  position: relative;
  padding: 80px 60px;
  text-align: center;
  overflow: hidden;
}

.visualizer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 4px;
  padding: 20px;
}

.bar {
  width: 6px;
  height: 20px;
  background: linear-gradient(180deg, #a855f7, #ec4899);
  border-radius: 3px;
  animation: visualize 0.8s ease-in-out infinite;
}

@keyframes visualize {
  0%, 100% { height: 20px; }
  50% { height: 60px; }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #a855f7, #ec4899, #f472b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-primary, .btn-outline {
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  border: none;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: #fff;
  box-shadow: 0 10px 30px rgba(168, 85, 247, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(168, 85, 247, 0.5);
}

.btn-outline {
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: #fff;
}

.btn-outline:hover {
  border-color: #a855f7;
}

/* 动画 */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-slide-up { animation: slideUp 0.6s ease forwards; }
.animate-fade-in { animation: fadeIn 0.6s ease forwards; opacity: 0; animation-delay: 0.2s; }
.animate-scale-in { animation: scaleIn 0.5s ease forwards; opacity: 0; animation-delay: 0.4s; }

.now-playing {
  padding: 60px;
  display: flex;
  justify-content: center;
}

.player-card {
  display: flex;
  gap: 32px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
}

.album-art {
  width: 140px;
  height: 140px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.song-emoji {
  font-size: 48px;
  animation: rotate 10s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.song-info {
  flex: 1;
}

.song-info h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.artist {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  margin-bottom: 20px;
}

.progress-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-bottom: 8px;
}

.progress {
  height: 100%;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-radius: 2px;
}

.time {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 20px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.ctrl-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.ctrl-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.ctrl-btn.play {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #a855f7, #ec4899);
}

.playlists, .top-songs {
  padding: 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.playlists h2, .top-songs h2 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 32px;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.playlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
}

.playlist-card {
  cursor: pointer;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
  transition: transform 0.3s;
}

.playlist-card:hover {
  transform: translateY(-5px);
}

.pl-cover {
  height: 160px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.pl-emoji {
  font-size: 40px;
}

.playlist-card h3 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.playlist-card p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.top-songs {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  margin: 0 60px 60px;
  max-width: none;
}

.songs-list {
  max-width: 800px;
  margin: 0 auto;
}

.song-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
  transition: background 0.3s;
}

.song-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.rank {
  font-size: 18px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.2);
  min-width: 24px;
}

.song-cover {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.song-details {
  flex: 1;
}

.song-details h3 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.song-details p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.duration {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
}

.play-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.3s;
}

.song-item:hover .play-btn {
  opacity: 1;
}

.footer {
  padding: 40px 60px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 20px;
}

.footer-links a {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.footer-links a:hover {
  color: #a855f7;
}

.copyright {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
}
</style>