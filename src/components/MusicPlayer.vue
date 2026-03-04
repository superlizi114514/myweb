<template>
  <div class="music-player" :class="{ expanded: showVolume }">
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
      <span class="music-text">{{ songs[currentIndex].name }}</span>
    </div>
    
    <!-- Volume Control -->
    <div class="volume-control" v-show="showVolume">
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.1" 
        v-model="volume"
        @input="changeVolume"
        class="volume-slider"
      />
    </div>
    
    <button @click.stop="showVolume = !showVolume" class="volume-btn" :class="{ active: showVolume }">
      <svg v-if="volume > 0" class="icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
      </svg>
      <svg v-else class="icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
      </svg>
    </button>
    
    <audio ref="audio" :src="songs[currentIndex].url" @ended="nextSong" @play="isPlaying = true" @pause="isPlaying = false" preload="auto" crossorigin="anonymous" :volume="volume"></audio>
  </div>
</template>

<script>
export default {
  name: 'MusicPlayer',
  data() {
    return {
      isPlaying: false,
      currentIndex: 0,
      volume: 0.7,
      showVolume: false,
      songs: [
        { name: 'Music 1', url: '/myweb/music1.mp3' },
        { name: 'Music 2', url: '/myweb/music2.mp3' },
      ]
    }
  },
  mounted() {
    // 从 localStorage 恢复播放状态
    const savedState = localStorage.getItem('musicState')
    if (savedState) {
      const state = JSON.parse(savedState)
      this.currentIndex = state.currentIndex || 0
      this.volume = state.volume || 0.7
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
    changeVolume() {
      const audio = this.$refs.audio
      if (audio) {
        audio.volume = this.volume
        this.saveState()
      }
    },
    saveState() {
      localStorage.setItem('musicState', JSON.stringify({
        currentIndex: this.currentIndex,
        volume: this.volume
      }))
    },
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
          audio.volume = this.volume
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
              reject(new Error('音频加载失败'))
            }, { once: true })
          })
          
          console.log('✅ Audio loaded, starting playback...')
          await audio.play()
          this.isPlaying = true
          this.saveState()
          console.log('▶️ Music started:', currentSong.name)
        }
      } catch (e) {
        console.error('❌ Playback failed:', e.message)
      }
    },
    nextSong() {
      this.currentIndex = (this.currentIndex + 1) % this.songs.length
      this.saveState()
      this.togglePlay()
    }
  },
  watch: {
    currentIndex() {
      this.saveState()
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
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 10px 14px;
  border-radius: 30px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.music-player.expanded {
  padding-right: 20px;
}

.play-btn, .volume-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.play-btn:hover, .volume-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.play-btn.playing {
  background: linear-gradient(135deg, #ec4141 0%, #c32727 100%);
  border-color: transparent;
}

.play-btn.playing .icon, .volume-btn.active .icon {
  color: white;
}

.volume-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: transparent;
}

.icon {
  width: 18px;
  height: 18px;
  color: #333;
}

.music-info {
  display: flex;
  align-items: center;
  gap: 6px;
  animation: slideIn 0.3s ease;
}

.music-note {
  font-size: 14px;
  color: #ec4141;
  animation: bounce 0.5s ease infinite;
}

.music-text {
  font-size: 12px;
  color: #666;
  font-weight: 500;
  white-space: nowrap;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.volume-slider {
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  outline: none;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.volume-slider::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
