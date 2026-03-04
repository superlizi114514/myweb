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
    <audio ref="audio" :src="songs[currentIndex].url" @ended="nextSong" @play="isPlaying = true" @pause="isPlaying = false" preload="auto" crossorigin="anonymous"></audio>
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
        { name: 'Music 1', url: '/myweb/music1.mp3' },
        { name: 'Music 2', url: '/myweb/music2.mp3' },
      ]
    }
  },
  mounted() {
    console.log('MusicPlayer mounted, songs:', this.songs)
    const audio = this.$refs.audio
    if (audio) {
      audio.addEventListener('error', (e) => {
        console.error('Audio error:', e)
        console.error('Audio src:', audio.src)
        console.error('Audio error code:', audio.error?.code)
        console.error('Audio error message:', audio.error?.message)
      })
      audio.addEventListener('loadeddata', () => {
        console.log('Audio loaded successfully')
      })
    }
  },
  methods: {
    async togglePlay() {
      const audio = this.$refs.audio
      if (!audio) {
        console.error('❌ Audio element not found')
        return
      }
      
      const currentSong = this.songs[this.currentIndex]
      const fullUrl = window.location.origin + currentSong.url
      
      console.log('🎵 Current song:', currentSong.name)
      console.log('🎵 Audio URL:', currentSong.url)
      console.log('🎵 Full URL:', fullUrl)
      console.log('🎵 Audio readyState:', audio.readyState)
      
      try {
        if (this.isPlaying) {
          audio.pause()
          this.isPlaying = false
          console.log('⏸ Music paused')
        } else {
          // 设置音频源并播放
          audio.src = fullUrl
          audio.load()
          
          console.log('⏳ Loading audio...')
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              reject(new Error('加载超时，请检查音乐文件是否存在'))
            }, 10000)
            
            audio.addEventListener('canplaythrough', () => {
              clearTimeout(timeout)
              resolve()
            }, { once: true })
            
            audio.addEventListener('error', (e) => {
              clearTimeout(timeout)
              console.error('❌ Audio load error:', e)
              console.error('❌ Error code:', audio.error?.code)
              console.error('❌ Error message:', audio.error?.message)
              reject(new Error('音频加载失败'))
            }, { once: true })
          })
          
          console.log('✅ Audio loaded, starting playback...')
          await audio.play()
          this.isPlaying = true
          console.log('▶️ Music started:', currentSong.name)
        }
      } catch (e) {
        console.error('❌ Playback failed:', e.message)
        alert('播放失败：' + e.message + '\n\n请检查：\n1. 打开浏览器控制台（F12）查看详细错误\n2. 确认音乐文件已上传到服务器\n3. 检查网络请求是否被拦截')
      }
    },
    nextSong() {
      this.currentIndex = (this.currentIndex + 1) % this.songs.length
      console.log('⏭ Next song:', this.songs[this.currentIndex].name)
      this.$nextTick(() => {
        this.togglePlay()
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
