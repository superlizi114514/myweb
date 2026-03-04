<template>
  <div class="background-tags">
    <div v-for="(row, rowIndex) in rows" :key="rowIndex" 
         class="tag-row"
         :style="{ 
           top: `${rowIndex * (100 / rows.length)}%`,
           animationDelay: `${rowIndex * -2}s`,
           animationDirection: rowIndex % 2 === 0 ? 'normal' : 'reverse'
         }">
      <span v-for="(tag, tagIndex) in extendedTags" 
            :key="`${rowIndex}-${tagIndex}`"
            class="floating-tag"
            :style="{ animationDelay: `${tagIndex * 0.5}s` }">
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
      // 重复标签以填满整行
      return [...this.tags, ...this.tags, ...this.tags]
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
  opacity: 0.6;
}

.tag-row {
  position: absolute;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;
  animation: scroll-left 60s linear infinite;
}

.floating-tag {
  display: inline-block;
  padding: 6px 16px;
  margin: 0 20px;
  background: rgba(99, 102, 241, 0.08);
  border: 1px solid rgba(99, 102, 241, 0.15);
  border-radius: 20px;
  font-size: 13px;
  color: rgba(99, 102, 241, 0.6);
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 不同行的变化 */
.tag-row:nth-child(1) .floating-tag {
  font-size: 12px;
  opacity: 0.5;
}

.tag-row:nth-child(2) .floating-tag {
  font-size: 14px;
  opacity: 0.6;
}

.tag-row:nth-child(3) .floating-tag {
  font-size: 13px;
  opacity: 0.4;
}

.tag-row:nth-child(4) .floating-tag {
  font-size: 15px;
  opacity: 0.5;
}
</style>
