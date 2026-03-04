<template>
  <div class="music-player">
    <button @click="openPlayer" class="play-btn" :class="{ playing: isPlaying }">
      <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
      </svg>
    </button>
    <div class="music-info" v-if="isPlaying">
      <span class="music-note">♪</span>
      <span class="music-text">网易云歌单</span>
    </div>
    <!-- 隐藏的网易云 iframe -->
    <iframe 
      v-if="isPlaying"
      ref="player"
      :src="playerUrl"
      width="1" 
      height="1" 
      frameborder="0"
      allow="autoplay">
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data() {
    return {
      isPlaying: false,
      playlistId: '2355066086',
      playerUrl: ''
    }
  },
  methods: {
    openPlayer() {
      if (!this.isPlaying) {
        // 打开网易云歌单页面
        window.open(`https://music.163.com/playlist?id=${this.playlistId}`, '_blank')
        this.isPlaying = true
      }
    }
  }
}
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
}

.play-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.play-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.play-btn.playing {
  background: linear-gradient(135deg, #ec4141 0%, #c32727 100%);
  border-color: transparent;
  animation: pulse 2s ease-in-out infinite;
}

.play-btn.playing .icon {
  color: white;
}

.icon {
  width: 20px;
  height: 20px;
  color: #333;
}

.music-info {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease;
}

.music-note {
  font-size: 16px;
  color: #ec4141;
  animation: bounce 0.5s ease infinite;
}

.music-text {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

@keyframes pulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 4px 12px rgba(236, 65, 65, 0.3);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(236, 65, 65, 0.5);
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
