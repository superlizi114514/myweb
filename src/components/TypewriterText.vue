<template>
  <span class="typewriter">
    <span v-for="(char, index) in displayText" :key="index" 
          class="char"
          :style="{ opacity: shouldShow(index) ? 1 : 0 }">
      {{ char }}
    </span>
    <span class="cursor" :class="{ blinking: isTyping }">|</span>
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
    delay: {
      type: Number,
      default: 100
    },
    startDelay: {
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      displayText: '',
      currentIndex: 0,
      isTyping: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.typeWriter()
    }, this.startDelay)
  },
  methods: {
    typeWriter() {
      if (this.currentIndex <= this.text.length) {
        this.displayText = this.text.slice(0, this.currentIndex)
        this.currentIndex++
        setTimeout(() => {
          this.typeWriter()
        }, this.delay)
      } else {
        this.isTyping = false
      }
    },
    shouldShow(index) {
      return index < this.currentIndex
    }
  },
  watch: {
    text() {
      this.displayText = ''
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

.char {
  opacity: 0;
  transition: opacity 0.1s ease;
  display: inline;
}

.cursor {
  display: inline-block;
  color: #667eea;
  font-weight: bold;
  margin-left: 2px;
}

.cursor.blinking {
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
