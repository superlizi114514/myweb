<template>
  <div class="background-tags">
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" 
         class="tag-row"
         :style="{ 
           top: `${rowIndex * 25}%`,
           animationDelay: `${rowIndex * -15}s`,
           animationDirection: rowIndex % 2 === 0 ? 'normal' : 'reverse'
         }">
      <span v-for="(tag, index) in extendedTags" 
            :key="`${rowIndex}-${index}`"
            class="floating-tag">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundTags',
  data() {
    return {
      rows: 4,
      tags: [
        'AI',
        'Delta Force',
        'VALORANT',
        'Arena Breakout',
        'Ave Mujica',
        'MyGO!!!!!',
        'けいおん！',
        'OpenClaw',
        'Trae',
        'GLM',
        'Qwen3.5-Plus',
        'DeepSeek',
        'ニセコイ'
      ]
    }
  },
  computed: {
    extendedTags() {
      // 重复标签以填满整行，确保动画无缝
      return [...this.tags, ...this.tags]
    }
  }
}
</script>

<style scoped>
.background-tags {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
  opacity: 0.7;
}

.tag-row {
  position: absolute;
  left: 0;
  width: max-content;
  display: flex;
  align-items: center;
  white-space: nowrap;
  animation: scroll-left 80s linear infinite;
  will-change: transform;
}

.floating-tag {
  display: inline-block;
  padding: 8px 20px;
  margin: 0 12px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 24px;
  font-size: 14px;
  color: rgba(99, 102, 241, 0.7);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
  white-space: nowrap;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 不同行的变化和可见性增强 */
.tag-row:nth-child(1) {
  top: 10% !important;
}

.tag-row:nth-child(2) {
  top: 35% !important;
}

.tag-row:nth-child(3) {
  top: 60% !important;
}

.tag-row:nth-child(4) {
  top: 85% !important;
}
</style>
