<template>
  <div class="contact-page" @mousemove="handleMouseMove">
    <!-- 背景粒子 -->
    <div class="particles-container">
      <div v-for="particle in particles" :key="particle.id"
           class="particle"
           :style="particle.style">
      </div>
    </div>

    <!-- 鼠标光晕 -->
    <div class="cursor-glow" :style="cursorGlowStyle"></div>

    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
    </div>

    <div class="max-w-2xl mx-auto px-6 py-24 relative z-10">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-block mb-6">
          <div class="contact-icon-wrapper">
            <div class="contact-icon-ring"></div>
            <svg class="contact-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
        </div>
        <h1 class="text-5xl font-bold mb-4 contact-title">
          <span class="title-gradient">联系我</span>
        </h1>
        <p class="text-xl text-gray-400">有任何需求都可以联系我，期待与你合作</p>
      </div>

      <!-- Contact Cards -->
      <div class="space-y-6">
        <!-- WeChat Card -->
        <div class="contact-card"
             :class="{ 'copied': wechatCopied }"
             @mouseenter="hoveredCard = 'wechat'"
             @mouseleave="hoveredCard = null">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="card-header">
              <div class="icon-wrapper wechat">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .406.33.733.733.733a.816.816 0 0 0 .378-.095l2.597-1.5a.86.86 0 0 1 .695-.095 10.157 10.157 0 0 0 2.511.314c.244 0 .484-.018.724-.035-.733-2.196.144-4.153 1.518-5.355 1.142-1.002 2.855-1.435 4.534-1.435h.012c-.48-2.855-3.475-5.122-7.188-5.122zm-2.54 3.845c.84 0 1.523.684 1.523 1.523 0 .84-.684 1.524-1.523 1.524-.84 0-1.524-.683-1.524-1.523 0-.84.683-1.524 1.524-1.524zm5.575 0c.84 0 1.523.684 1.523 1.523 0 .84-.683 1.524-1.523 1.524-.84 0-1.523-.683-1.523-1.523 0-.84.683-1.524 1.523-1.524zm6.982-.906c-3.801 0-6.885 2.614-6.885 5.838 0 1.763.926 3.35 2.403 4.47a.466.466 0 0 1 .17.528l-.31 1.173c-.015.056-.038.112-.038.169 0 .322.262.582.583.582a.65.65 0 0 0 .3-.075l2.064-1.19a.682.682 0 0 1 .552-.075 8.063 8.063 0 0 0 1.994.249c.194 0 .384-.014.575-.028-.582-1.743.114-3.297 1.205-4.252.907-.795 2.267-1.139 3.601-1.139h.01c-.382-2.266-2.761-4.063-5.709-4.063zm-2.016 3.05c.667 0 1.209.542 1.209 1.209s-.542 1.209-1.209 1.209-1.209-.542-1.209-1.209.542-1.209 1.209-1.209zm4.425 0c.667 0 1.209.542 1.209 1.209s-.542 1.209-1.209 1.209-1.209-.542-1.209-1.209.542-1.209 1.209-1.209z"/>
                </svg>
              </div>
              <div class="card-info">
                <h2 class="card-title">微信</h2>
                <p class="card-subtitle">推荐首选</p>
              </div>
              <button @click="copyWechat" class="copy-btn wechat-btn">
                <span v-if="!wechatCopied">复制</span>
                <span v-else class="copied-text">✓ 已复制</span>
              </button>
            </div>
            <div class="id-display">
              <span class="id-text">SiNianNiQWQ</span>
            </div>
            <div class="card-hint">
              <span class="hint-icon">💡</span>
              <span>添加时请备注来意，我会尽快通过</span>
            </div>
          </div>
        </div>

        <!-- QQ Card -->
        <div class="contact-card"
             :class="{ 'copied': qqCopied }"
             @mouseenter="hoveredCard = 'qq'"
             @mouseleave="hoveredCard = null">
          <div class="card-glow"></div>
          <div class="card-content">
            <div class="card-header">
              <div class="icon-wrapper qq">
                <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.774 9.214c-.13.65-.506.813-1.037.52l-2.875-2.116-1.388 1.335c-.153.153-.283.283-.58.283l.207-2.932 5.33-4.813c.23-.204-.052-.318-.356-.108l-6.601 4.156-2.846-.89c-.62-.195-.633-.623.13-.925l11.11-4.275c.515-.195.964.12.816.852z"/>
                </svg>
              </div>
              <div class="card-info">
                <h2 class="card-title">QQ</h2>
                <p class="card-subtitle">在线时间较长</p>
              </div>
              <button @click="copyQQ" class="copy-btn qq-btn">
                <span v-if="!qqCopied">复制</span>
                <span v-else class="copied-text">✓ 已复制</span>
              </button>
            </div>
            <div class="id-display">
              <span class="id-text">3471023785</span>
            </div>
            <div class="card-hint">
              <span class="hint-icon">💡</span>
              <span>QQ在线时间更长，消息回复更及时</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tips Section -->
      <div class="tips-section">
        <div class="tips-card">
          <h3 class="tips-title">
            <span class="tips-icon">⚡</span>
            快速响应
          </h3>
          <div class="tips-grid">
            <div class="tip-item">
              <span class="tip-emoji">🎨</span>
              <span>网页开发</span>
            </div>
            <div class="tip-item">
              <span class="tip-emoji">🤖</span>
              <span>AI 定制</span>
            </div>
            <div class="tip-item">
              <span class="tip-emoji">💻</span>
              <span>代码服务</span>
            </div>
            <div class="tip-item">
              <span class="tip-emoji">🚀</span>
              <span>技术咨询</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="text-center mt-12">
        <router-link to="/" class="back-link">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>返回首页</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',
  data() {
    return {
      qqCopied: false,
      wechatCopied: false,
      qqNumber: '3471023785',
      wechatId: 'SiNianNiQWQ',
      mouseX: 0,
      mouseY: 0,
      hoveredCard: null,
      particles: []
    }
  },
  computed: {
    cursorGlowStyle() {
      return {
        left: `${this.mouseX}px`,
        top: `${this.mouseY}px`,
      }
    }
  },
  mounted() {
    this.initParticles()
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    },
    initParticles() {
      const colors = ['#22c55e', '#10b981', '#34d399', '#6ee7b7']
      for (let i = 0; i < 30; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = Math.random() * 3 + 1
        this.particles.push({
          id: i,
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${size * 3}px ${color}`,
            animationDuration: `${Math.random() * 20 + 15}s`,
            animationDelay: `${Math.random() * -20}s`,
          }
        })
      }
    },
    copyQQ() {
      navigator.clipboard.writeText(this.qqNumber).then(() => {
        this.qqCopied = true
        setTimeout(() => { this.qqCopied = false }, 2000)
      })
    },
    copyWechat() {
      navigator.clipboard.writeText(this.wechatId).then(() => {
        this.wechatCopied = true
        setTimeout(() => { this.wechatCopied = false }, 2000)
      })
    }
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #0f1a15 50%, #0a0f0d 100%);
  position: relative;
  overflow: hidden;
}

/* 粒子背景 */
.particles-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.particle {
  position: absolute;
  border-radius: 50%;
  animation: particleFloat linear infinite;
  opacity: 0.5;
}

@keyframes particleFloat {
  0%, 100% { transform: translate(0, 0); opacity: 0.3; }
  50% { transform: translate(20px, -30px); opacity: 0.7; }
}

/* 鼠标光晕 */
.cursor-glow {
  position: fixed;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%);
  pointer-events: none;
  z-index: 2;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;
}

/* 背景装饰 */
.bg-decoration {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #22c55e, #10b981);
  top: -100px;
  right: -100px;
  animation: float 25s ease-in-out infinite;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #34d399, #6ee7b7);
  bottom: -50px;
  left: -50px;
  animation: float 20s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}

/* Header */
.contact-icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto;
}

.contact-icon-ring {
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: linear-gradient(135deg, #22c55e, #10b981, #34d399);
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.contact-icon {
  position: relative;
  width: 100%;
  height: 100%;
  background: #0f1a15;
  border-radius: 50%;
  padding: 20px;
  color: #22c55e;
}

.contact-title {
  position: relative;
}

.title-gradient {
  background: linear-gradient(135deg, #fff 0%, #22c55e 50%, #34d399 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Contact Cards */
.contact-card {
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 1.25rem;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-card:hover {
  transform: translateY(-4px);
  border-color: rgba(255, 255, 255, 0.1);
}

.contact-card.copied {
  border-color: rgba(34, 197, 94, 0.5);
}

.card-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34, 197, 94, 0.1) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.contact-card:hover .card-glow {
  opacity: 1;
}

.card-content {
  position: relative;
  padding: 1.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.icon-wrapper {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.contact-card:hover .icon-wrapper {
  transform: scale(1.05);
}

.icon-wrapper.wechat {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
}

.icon-wrapper.qq {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.card-info {
  flex: 1;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
}

.card-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
}

.copy-btn {
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.copy-btn.wechat-btn {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.copy-btn.wechat-btn:hover {
  background: rgba(34, 197, 94, 0.25);
}

.copy-btn.qq-btn {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.copy-btn.qq-btn:hover {
  background: rgba(59, 130, 246, 0.25);
}

.copied-text {
  color: #22c55e;
}

.id-display {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.id-text {
  font-size: 1.75rem;
  font-weight: 700;
  font-family: 'SF Mono', 'Fira Code', monospace;
  background: linear-gradient(135deg, #fff 0%, #22c55e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card-hint {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #6b7280;
}

.hint-icon {
  font-size: 1rem;
}

/* Tips Section */
.tips-section {
  margin-top: 2.5rem;
}

.tips-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
}

.tips-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
}

.tips-icon {
  font-size: 1.25rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.tip-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.75rem;
  font-size: 0.875rem;
  color: #9ca3af;
  transition: all 0.3s ease;
}

.tip-item:hover {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.tip-emoji {
  font-size: 1.25rem;
}

/* Back Link */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #6b7280;
  font-size: 0.9rem;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
}

.back-link:hover {
  color: #22c55e;
  border-color: rgba(34, 197, 94, 0.3);
  background: rgba(34, 197, 94, 0.05);
}

/* Responsive */
@media (max-width: 640px) {
  .id-text {
    font-size: 1.25rem;
  }

  .tips-grid {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-wrap: wrap;
  }

  .copy-btn {
    width: 100%;
    text-align: center;
  }
}
</style>