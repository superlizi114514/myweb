<template>
  <div class="music-player">
    <button @click.stop="togglePlay" class="play-btn" :class="{ playing: isPlaying }">
      <svg v-if="!isPlaying" class="icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
      <svg v-else class="icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
      </svg>
    </button>
    <div class="music-info" v-if="isPlaying">
      <span class="music-note">♪</span>
      <span class="music-text">正在播放</span>
    </div>
    <audio ref="audio" :src="songs[currentIndex].url" @ended="nextSong" @play="isPlaying = true" @pause="isPlaying = false"></audio>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data() {
    return {
      isPlaying: false,
      currentIndex: 0,
      songs: [
        { name: 'Music 1', url: '/music1.mp3' },
        { name: 'Music 2', url: '/music2.mp3' },
        { name: 'Music 3', url: '/music.mp3' },
      ]
    }
  },
  methods: {
    async togglePlay() {
      const audio = this.$refs.audio
      if (!audio) {
        console.error('Audio element not found')
        return
      }
      try {
        if (this.isPlaying) {
          audio.pause()
        } else {
          await audio.play()
          console.log('Music started playing:', this.songs[this.currentIndex].name)
        }
      } catch (e) {
        console.error('播放失败:', e)
        alert('播放失败，请检查音乐文件是否存在')
      }
    },
    nextSong() {
      this.currentIndex = (this.currentIndex + 1) % this.songs.length
      console.log('Playing next song:', this.songs[this.currentIndex].name)
      this.$nextTick(() => {
        this.$refs.audio.play().catch(e => console.error('自动播放失败:', e))
      })
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
