<template>
  <div class="ui-showcase">
    <!-- 头部 -->
    <div class="showcase-header">
      <h1 class="title">
        <span class="gradient-text">UI Components Lab</span>
      </h1>
      <p class="subtitle">简洁 · 创意 · 交互</p>
    </div>

    <!-- 组件网格 -->
    <div class="components-grid">

      <!-- 1. 磁吸按钮 -->
      <div class="component-card" ref="magnetCard">
        <div class="card-header">
          <span class="card-icon">🧲</span>
          <span class="card-title">磁吸按钮</span>
        </div>
        <div class="card-body">
          <div class="magnet-container" @mousemove="handleMagnetMove" @mouseleave="handleMagnetLeave">
            <button class="magnet-btn" :style="magnetStyle">
              <span>Hover Me</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 2. 3D 翻转登录表单 -->
      <div class="component-card">
        <div class="card-header">
          <span class="card-icon">🔐</span>
          <span class="card-title">3D 翻转表单</span>
        </div>
        <div class="card-body">
          <div class="flip-container" :class="{ flipped: showLoginForm }">
            <div class="flipper">
              <div class="front">
                <div class="form-card login">
                  <div class="form-decoration">
                    <div class="glow-orb orb-1"></div>
                    <div class="glow-orb orb-2"></div>
                  </div>
                  <div class="form-icon">🔑</div>
                  <h3>欢迎回来</h3>
                  <input type="text" placeholder="用户名" class="form-input" />
                  <input type="password" placeholder="密码" class="form-input" />
                  <button class="submit-btn" @click.stop="showLoginForm = !showLoginForm">
                    <span>登录</span>
                    <svg class="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </button>
                  <p class="form-tip">没有账号？<span @click.stop="showLoginForm = !showLoginForm" class="link">去注册</span></p>
                </div>
              </div>
              <div class="back">
                <div class="form-card register">
                  <div class="form-decoration">
                    <div class="glow-orb orb-3"></div>
                    <div class="glow-orb orb-4"></div>
                  </div>
                  <div class="form-icon">✨</div>
                  <h3>创建账号</h3>
                  <input type="email" placeholder="邮箱" class="form-input" />
                  <input type="password" placeholder="密码" class="form-input" />
                  <input type="password" placeholder="确认密码" class="form-input" />
                  <button class="submit-btn" @click.stop="showLoginForm = !showLoginForm">
                    <span>注册</span>
                    <svg class="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                    </svg>
                  </button>
                  <p class="form-tip">已有账号？<span @click.stop="showLoginForm = !showLoginForm" class="link">去登录</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 液态进度条 -->
      <div class="component-card">
        <div class="card-header">
          <span class="card-icon">📊</span>
          <span class="card-title">液态进度条</span>
        </div>
        <div class="card-body">
          <div class="progress-section">
            <div class="liquid-progress">
              <div class="liquid-fill" :style="{ height: `${progress}%` }">
                <div class="wave wave-1"></div>
                <div class="wave wave-2"></div>
                <div class="wave wave-3"></div>
              </div>
              <span class="progress-text">{{ progress }}%</span>
            </div>
            <div class="progress-controls">
              <input type="range" v-model="progress" min="0" max="100" class="slider" />
            </div>
          </div>
        </div>
      </div>

      <!-- 4. 粒子按钮 -->
      <div class="component-card">
        <div class="card-header">
          <span class="card-icon">✨</span>
          <span class="card-title">粒子爆炸按钮</span>
        </div>
        <div class="card-body">
          <div class="particle-btn-container">
            <button class="particle-btn" @click="explodeParticles">
              <span>点击爆炸</span>
            </button>
            <div v-for="particle in particles" :key="particle.id"
                 class="particle"
                 :style="particle.style">
            </div>
          </div>
        </div>
      </div>

      <!-- 5. 波纹按钮 -->
      <div class="component-card">
        <div class="card-header">
          <span class="card-icon">🌊</span>
          <span class="card-title">波纹扩散</span>
        </div>
        <div class="card-body">
          <button class="ripple-btn" @click="createRipple" ref="rippleBtn">
            点击我
            <span v-for="ripple in ripples" :key="ripple.id"
                  class="ripple"
                  :style="ripple.style">
            </span>
          </button>
        </div>
      </div>

      <!-- 6. 光标追踪卡片 -->
      <div class="component-card">
        <div class="card-header">
          <span class="card-icon">🎯</span>
          <span class="card-title">光标追踪</span>
        </div>
        <div class="card-body">
          <div class="tracker-card" @mousemove="handleTrackMove" @mouseleave="handleTrackLeave">
            <div class="tracker-glow" :style="glowStyle"></div>
            <div class="tracker-content">
              <span>移动鼠标查看效果</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 7. 玻璃态卡片 -->
      <div class="component-card">
        <div class="card-header">
          <span class="card-icon">🔮</span>
          <span class="card-title">玻璃态</span>
        </div>
        <div class="card-body">
          <div class="glass-card">
            <div class="glass-content">
              <span class="glass-icon">💎</span>
              <span class="glass-text">Glassmorphism</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 8. 弹性开关 -->
      <div class="component-card">
        <div class="card-header">
          <span class="card-icon">🔘</span>
          <span class="card-title">弹性开关</span>
        </div>
        <div class="card-body">
          <div class="toggle-container">
            <label class="toggle" :class="{ active: toggleOn }" @click="toggleOn = !toggleOn">
              <span class="toggle-slider"></span>
            </label>
            <span class="toggle-status">{{ toggleOn ? 'ON' : 'OFF' }}</span>
          </div>
        </div>
      </div>

      <!-- 9. 浮动标签输入框 -->
      <div class="component-card">
        <div class="card-header">
          <span class="card-icon">📝</span>
          <span class="card-title">浮动标签输入</span>
        </div>
        <div class="card-body">
          <div class="input-group">
            <div class="floating-input">
              <input type="text" id="username" v-model="inputValue" placeholder=" " />
              <label for="username">用户名</label>
              <div class="input-line"></div>
            </div>
            <div class="floating-input">
              <input type="email" id="email" v-model="emailValue" placeholder=" " />
              <label for="email">邮箱地址</label>
              <div class="input-line"></div>
            </div>
            <p class="input-hint" v-if="inputValue">已输入：{{ inputValue }}</p>
          </div>
        </div>
      </div>

      <!-- 10. 渐变边框按钮 -->
      <div class="component-card">
        <div class="card-header">
          <span class="card-icon">🌈</span>
          <span class="card-title">旋转渐变边框</span>
        </div>
        <div class="card-body">
          <div class="gradient-border-btn">
            <div class="gradient-bg"></div>
            <span class="btn-text">Hover Effect</span>
          </div>
        </div>
      </div>

      <!-- 11. 悬浮卡片组 -->
      <div class="component-card">
        <div class="card-header">
          <span class="card-icon">🎴</span>
          <span class="card-title">悬浮卡片</span>
          <span class="card-hint">点击翻转</span>
        </div>
        <div class="card-body">
          <div class="card-stack">
            <div v-for="n in 3" :key="n"
                 class="stack-card"
                 :class="{ 'active': activeCard === n }"
                 :style="getCardStyle(n)"
                 @mouseenter="hoveredCard = n"
                 @mouseleave="hoveredCard = null"
                 @click="clickCard">
              <span>Card {{ n }}</span>
            </div>
          </div>
          <div class="card-indicator">
            <span v-for="n in 3" :key="n" :class="{ active: activeCard === n }"></span>
          </div>
        </div>
      </div>

      <!-- 12. 加载动画 -->
      <div class="component-card">
        <div class="card-header">
          <span class="card-icon">⏳</span>
          <span class="card-title">创意加载</span>
        </div>
        <div class="card-body">
          <div class="loader-container">
            <div class="dot-loader">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- 底部 -->
    <div class="showcase-footer">
      <p>More components coming soon...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UIShowcase',
  data() {
    return {
      showLoginForm: false,
      magnetStyle: {},
      progress: 65,
      particles: [],
      particleId: 0,
      ripples: [],
      rippleId: 0,
      glowStyle: {},
      toggleOn: false,
      typewriterText: '',
      hoveredCard: null,
      activeCard: 1,
      isFlipping: false,
      // 表单输入
      inputValue: '',
      emailValue: ''
    }
  },
  mounted() {
    this.rippleBtn = this.$refs.rippleBtn
  },
  methods: {
    // 卡片点击循环
    clickCard() {
      if (this.isFlipping) return
      this.isFlipping = true

      const oldActive = this.activeCard
      this.activeCard = this.activeCard === 3 ? 1 : this.activeCard + 1

      setTimeout(() => {
        this.isFlipping = false
      }, 600)
    },
    // 磁吸按钮
    handleMagnetMove(e) {
      const container = e.currentTarget
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const maxX = 80
      const maxY = 80

      const deltaX = ((e.clientX - centerX) / (rect.width / 2)) * maxX
      const deltaY = ((e.clientY - centerY) / (rect.height / 2)) * maxY

      this.magnetStyle = {
        transform: `translate(${deltaX}px, ${deltaY}px)`
      }
    },
    handleMagnetLeave() {
      this.magnetStyle = {}
    },

    // 粒子爆炸
    explodeParticles() {
      const btn = event.currentTarget
      const rect = btn.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20
        const velocity = 80 + Math.random() * 40

        this.particles.push({
          id: this.particleId++,
          style: {
            left: '50%',
            top: '50%',
            backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
            '--tx': `${Math.cos(angle) * velocity}px`,
            '--ty': `${Math.sin(angle) * velocity}px`,
          }
        })
      }

      setTimeout(() => {
        this.particles = []
      }, 600)
    },

    // 波纹效果
    createRipple(e) {
      const btn = e.currentTarget
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      this.ripples.push({
        id: this.rippleId++,
        style: {
          left: `${x}px`,
          top: `${y}px`,
        }
      })

      setTimeout(() => {
        this.ripples.shift()
      }, 600)
    },

    // 光标追踪
    handleTrackMove(e) {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      this.glowStyle = {
        left: `${x}px`,
        top: `${y}px`,
      }
    },
    handleTrackLeave() {
      this.glowStyle = { opacity: 0 }
    },

    // 打字机输入
    handleTypewriter(e) {
      this.typewriterText = e.target.textContent
    },

    // 卡片堆叠
    getCardStyle(n) {
      // 根据激活卡片计算位置
      const getRelativePos = (cardIndex) => {
        const diff = cardIndex - this.activeCard
        if (diff === 0) {
          // 当前激活的卡片
          return { y: 0, z: 40, scale: 1.1, opacity: 1, rotate: 0, isTop: true }
        } else if (diff > 0) {
          // 激活卡片后面的
          return {
            y: diff * 10,
            z: 40 - diff * 15,
            scale: Math.max(0.85, 1.1 - diff * 0.12),
            opacity: Math.max(0.5, 1 - diff * 0.2),
            rotate: diff * 2,
            isTop: false
          }
        } else {
          // 激活卡片前面的（已经翻过的）
          const absDiff = Math.abs(diff)
          return {
            y: -absDiff * 10 - 20,
            z: -absDiff * 20,
            scale: Math.max(0.75, 1 - absDiff * 0.15),
            opacity: Math.max(0.3, 0.7 - absDiff * 0.2),
            rotate: diff * 3,
            isTop: false
          }
        }
      }

      const style = getRelativePos(n)

      return {
        transform: `translateY(${style.y}px) translateZ(${style.z}px) scale(${style.scale}) rotate(${style.rotate}deg)`,
        opacity: style.opacity,
        zIndex: style.isTop ? 100 : n,
        boxShadow: style.isTop
          ? '0 25px 80px rgba(139, 92, 246, 0.5), 0 0 60px rgba(139, 92, 246, 0.3)'
          : '0 10px 30px rgba(0, 0, 0, 0.2)',
        borderColor: style.isTop ? 'rgba(139, 92, 246, 0.9)' : 'rgba(139, 92, 246, 0.2)',
        cursor: style.isTop ? 'pointer' : 'default'
      }
    }
  }
}
</script>

<style scoped>
.ui-showcase {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%);
  padding: 4rem 1.5rem;
  position: relative;
}

/* 头部 */
.showcase-header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #a78bfa 50%, #f472b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  color: #6b7280;
  font-size: 1.1rem;
  letter-spacing: 2px;
}

/* 组件网格 */
.components-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.component-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.component-card:hover {
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 10px 40px rgba(139, 92, 246, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);
  flex-wrap: wrap;
}

.card-icon {
  font-size: 1.25rem;
}

.card-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e5e7eb;
}

.card-hint {
  font-size: 0.7rem;
  color: #a78bfa;
  background: rgba(139, 92, 246, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  margin-left: auto;
}

.card-body {
  padding: 1.5rem;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 1. 磁吸按钮 */
.magnet-container {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.magnet-btn {
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.15s ease-out;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

/* 2. 3D 翻转表单 */
.flip-container {
  width: 100%;
  height: 280px;
  perspective: 1200px;
}

.flipper {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.flip-container.flipped .flipper {
  transform: rotateY(180deg) rotateX(10deg);
}

.front, .back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back {
  transform: rotateY(180deg);
}

.form-card {
  width: 85%;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(20px);
  box-shadow:
    0 25px 80px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 0 60px rgba(139, 92, 246, 0.1);
  position: relative;
  overflow: hidden;
}

.form-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.1), transparent 30deg);
  animation: borderRotate 8s linear infinite;
  pointer-events: none;
}

@keyframes borderRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.form-decoration {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  opacity: 0.35;
  animation: orbFloat 8s ease-in-out infinite;
}

.orb-1 {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -40px;
  right: -40px;
  animation-delay: 0s;
}

.orb-2 {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  bottom: -30px;
  left: -30px;
  animation-delay: 4s;
}

.orb-3 {
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  top: 50%;
  left: -40px;
  animation-delay: 2s;
}

.orb-4 {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #a78bfa, #c4b5fd);
  bottom: -30px;
  right: 40%;
  animation-delay: 6s;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}

.form-icon {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 0.5rem;
  filter: drop-shadow(0 0 15px rgba(139, 92, 246, 0.5));
  animation: iconPulse 2s ease-in-out infinite;
}

@keyframes iconPulse {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.1) rotate(10deg); }
}

.form-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(135deg, #fff 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.5px;
}

.form-input {
  width: 100%;
  padding: 0.7rem 0.875rem;
  margin-bottom: 0.7rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: white;
  font-size: 0.85rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #a78bfa;
  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    0 0 0 3px rgba(167, 139, 250, 0.1),
    0 0 20px rgba(167, 139, 250, 0.15);
  transform: translateY(-1px);
}

.form-input::placeholder {
  color: #6b7280;
}

.submit-btn {
  width: 100%;
  padding: 0.7rem;
  margin-top: 0.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  position: relative;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s ease;
}

.submit-btn:hover::before {
  left: 100%;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 25px rgba(102, 126, 234, 0.4),
    0 0 30px rgba(102, 126, 234, 0.2);
}

.submit-btn:active {
  transform: translateY(-1px);
}

.btn-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.submit-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.form-tip {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #6b7280;
}

.form-tip .link {
  color: #a78bfa;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
}

.form-tip .link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #a78bfa;
  transition: width 0.3s ease;
}

.form-tip .link:hover::after {
  width: 100%;
}

/* 3. 液态进度条 */
.progress-section {
  width: 100%;
}

.liquid-progress {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  margin: 0 auto 1rem;
}

.liquid-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  transition: height 0.3s ease;
}

.liquid-fill::before {
  content: '';
  position: absolute;
  top: -10px;
  left: 0;
  width: 100%;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  filter: blur(8px);
}

.wave {
  position: absolute;
  width: 200%;
  height: 40px;
  background: transparent;
  border: 3px solid rgba(255, 255, 255, 0.4);
  border-radius: 45%;
  animation: wave 4s linear infinite;
  left: -50%;
  top: -5px;
  opacity: 0.6;
}

.wave-1 { animation-delay: 0s; animation-duration: 4s; }
.wave-2 { animation-delay: -1.3s; animation-duration: 4.5s; opacity: 0.4; }
.wave-3 { animation-delay: -2.6s; animation-duration: 5s; opacity: 0.3; }

@keyframes wave {
  0% { transform: translateX(0) rotate(0deg); }
  50% { transform: translateX(25%) rotate(180deg); }
  100% { transform: translateX(50%) rotate(360deg); }
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  font-weight: 700;
  color: white;
  z-index: 10;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.1);
  appearance: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

/* 4. 粒子按钮 */
.particle-btn-container {
  position: relative;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.particle-btn {
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(245, 87, 108, 0.4);
}

.particle {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  pointer-events: none;
  animation: explode 0.6s ease-out forwards;
  --tx: 0;
  --ty: 0;
}

@keyframes explode {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(0);
    opacity: 0;
  }
}

/* 5. 波纹按钮 */
.ripple-btn {
  position: relative;
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(79, 172, 254, 0.4);
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: rippleAnim 0.8s ease-out forwards;
  pointer-events: none;
  width: 20px;
  height: 20px;
  margin-left: -10px;
  margin-top: -10px;
}

@keyframes rippleAnim {
  to {
    transform: scale(15);
    opacity: 0;
  }
}

/* 6. 光标追踪卡片 */
.tracker-card {
  width: 100%;
  height: 120px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  cursor: crosshair;
}

.tracker-glow {
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%);
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  z-index: 1;
}

.tracker-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #9ca3af;
  font-size: 0.85rem;
}

/* 7. 玻璃态卡片 */
.glass-card {
  width: 140px;
  height: 80px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.glass-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.glass-icon {
  font-size: 1.5rem;
}

.glass-text {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
}

/* 8. 弹性开关 */
.toggle-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.toggle {
  width: 60px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.toggle.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.toggle-slider {
  position: absolute;
  top: 4px;
  left: 4px;
  width: 24px;
  height: 24px;
  background: white;
  border-radius: 50%;
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.toggle.active .toggle-slider {
  transform: translateX(28px);
}

.toggle-status {
  font-size: 0.9rem;
  font-weight: 700;
  color: #a78bfa;
  min-width: 30px;
}

/* 9. 浮动标签输入框 */
.input-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.floating-input {
  position: relative;
  width: 100%;
  padding-top: 0.5rem;
}

.floating-input input {
  width: 100%;
  padding: 1.25rem 0.75rem 0.5rem;
  font-size: 1rem;
  color: #fff;
  background: rgba(255, 255, 255, 0.03);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  outline: none;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.floating-input input:focus {
  background: rgba(255, 255, 255, 0.05);
  border-color: #a78bfa;
  box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.15);
  transform: translateY(-2px);
}

.floating-input label {
  position: absolute;
  left: 0.75rem;
  top: 1.1rem;
  font-size: 0.95rem;
  color: #6b7280;
  pointer-events: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left center;
}

/* 输入框聚焦或有值时，标签上浮 */
.floating-input input:focus ~ label,
.floating-input input:not(:placeholder-shown) ~ label {
  top: -0.6rem;
  font-size: 0.75rem;
  color: #a78bfa;
  font-weight: 600;
}

.input-line {
  position: absolute;
  bottom: 8px;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #667eea, #a78bfa, #764ba2, transparent);
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
}

.floating-input input:focus ~ .input-line {
  width: calc(100% - 1.5rem);
}

.input-hint {
  font-size: 0.8rem;
  color: #a78bfa;
  text-align: right;
  font-weight: 500;
}

/* 10. 旋转渐变边框 */
.gradient-border-btn {
  position: relative;
  padding: 1rem 2rem;
  background: #1a1a2e;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}

.gradient-bg {
  position: absolute;
  inset: -2px;
  background: conic-gradient(from 0deg, transparent 0deg, #667eea 90deg, #a78bfa 180deg, #f472b6 270deg, transparent 360deg);
  border-radius: 12px;
  animation: rotate 3s linear infinite;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gradient-border-btn:hover .gradient-bg {
  opacity: 1;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.btn-text {
  position: relative;
  z-index: 1;
  color: white;
  font-weight: 600;
}

/* 11. 悬浮卡片组 */
.card-stack {
  position: relative;
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

.card-indicator {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-top: 1rem;
}

.card-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.3);
  transition: all 0.3s ease;
}

.card-indicator span.active {
  background: linear-gradient(135deg, #667eea 0%, #a78bfa 100%);
  width: 24px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(167, 139, 250, 0.5);
}

.stack-card {
  position: absolute;
  width: 140px;
  height: 80px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.25) 0%, rgba(167, 139, 250, 0.25) 100%);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e5e7eb;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.stack-card span {
  position: relative;
  z-index: 2;
}

.stack-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.stack-card.active::before {
  opacity: 1;
}

.stack-card.active {
  border-color: rgba(139, 92, 246, 0.9);
  box-shadow:
    0 25px 80px rgba(139, 92, 246, 0.5),
    0 0 60px rgba(139, 92, 246, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* 12. 加载动画 */
.loader-container {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot-loader {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }
.dot:nth-child(3) { }

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

/* 底部 */
.showcase-footer {
  text-align: center;
  padding: 3rem 0;
  margin-top: 2rem;
}

.showcase-footer p {
  color: #6b7280;
  font-size: 0.9rem;
}

/* 响应式 */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .components-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}
</style>
