<template>
  <span class="typewriter">
    <span class="text-wrapper">
      <span v-for="(char, index) in fullText" :key="index" 
            class="char"
            :class="{ 
              'visible': index < currentIndex,
              'cursor': index === currentIndex && isTyping
            }">
        {{ char }}
      </span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'TypewriterText',
  props: {
    text: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 150
    },
    startDelay: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      fullText: '',
      currentIndex: 0,
      isTyping: true
    }
  },
  mounted() {
    this.fullText = this.text
    setTimeout(() => {
      this.typeWriter()
    }, this.startDelay)
  },
  methods: {
    typeWriter() {
      if (this.currentIndex <= this.fullText.length) {
        this.currentIndex++
        // 随机速度，让打字更自然
        const randomSpeed = this.speed + Math.random() * 100 - 50
        setTimeout(() => {
          this.typeWriter()
        }, randomSpeed)
      } else {
        this.isTyping = false
      }
    }
  },
  watch: {
    text(newText) {
      this.fullText = newText
      this.currentIndex = 0
      this.isTyping = true
      setTimeout(() => {
        this.typeWriter()
      }, this.startDelay)
    }
  }
}
</script>

<style scoped>
.typewriter {
  display: inline;
  font-family: inherit;
}

.text-wrapper {
  display: inline;
}

.char {
  display: inline;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.char.visible {
  opacity: 1;
  transform: translateY(0);
}

.char.cursor {
  position: relative;
}

.char.cursor::after {
  content: '|';
  position: absolute;
  left: 100%;
  color: #fff;
  font-weight: bold;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
