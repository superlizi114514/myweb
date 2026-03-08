<template>
  <div class="home-container" ref="containerRef" @mousemove="handleMouseMove">
    <!-- CRT 扫描线效果 -->
    <div class="scanlines"></div>

    <!-- 粒子背景 -->
    <div class="particles-container">
      <div v-for="particle in particles" :key="particle.id"
           class="particle"
           :style="particle.style">
      </div>
    </div>

    <!-- 鼠标跟随光晕 -->
    <div class="cursor-glow" :style="cursorGlowStyle"></div>

    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="glow-orb orb-3"></div>
      <div class="grid-overlay"></div>
      <!-- 新增：动态网格 -->
      <div class="dynamic-grid" :style="dynamicGridStyle"></div>
    </div>

    <!-- Background Tags -->
    <BackgroundTags />

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="max-w-5xl mx-auto px-6 py-20">
        <!-- Avatar -->
        <div class="avatar-wrapper">
          <div class="avatar-ring"></div>
          <div class="avatar-glow"></div>
          <img src="/avatar.jpg" alt="Avatar" class="avatar-img" />
          <div class="status-dot"></div>
        </div>

        <!-- Title -->
        <div class="title-section">
          <h1 class="hero-title">
            <TypewriterText
              text="Hello, I'm 栗子"
              :speed="150"
              :startDelay="300"
            />
          </h1>
          <p class="hero-subtitle">
            <span v-for="(char, index) in subtitleText" :key="index"
                  :style="{ animationDelay: `${2 + index * 0.05}s` }"
                  class="char-animate">
              {{ char }}
            </span>
          </p>
        </div>

        <!-- CTA Buttons -->
        <div class="cta-buttons">
          <router-link to="/templates" class="btn btn-primary">
            <span>浏览模板</span>
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
          <router-link to="/about" class="btn btn-secondary">
            <span>关于我</span>
          </router-link>
          <a href="https://v.douyin.com/di64-2AO-WM/" target="_blank" class="btn btn-glass">
            <svg class="btn-icon-sm" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            <span>抖音</span>
          </a>
        </div>

        <!-- Scroll Indicator -->
        <div class="scroll-indicator">
          <div class="mouse">
            <div class="wheel"></div>
          </div>
          <span>向下滚动</span>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="projects-section">
      <div class="max-w-5xl mx-auto px-6">
        <div class="section-header">
          <span class="section-tag">Portfolio</span>
          <h2 class="section-title">精选项目</h2>
          <p class="section-desc">探索我的最新作品</p>
        </div>

        <div class="projects-grid">
          <div v-for="project in featuredProjects" :key="project.id"
               class="project-card group"
               @mousemove="handleCardTilt"
               @mouseleave="resetCardTilt"
               @click="$router.push(project.link)">
            <div class="card-shine"></div>
            <div class="card-image">
              <img :src="project.image" :alt="project.title" />
              <div class="card-overlay">
                <span class="view-btn">查看详情</span>
              </div>
            </div>
            <div class="card-content">
              <span class="card-category">{{ project.category }}</span>
              <h3 class="card-title">{{ project.title }}</h3>
              <p class="card-desc">{{ project.description }}</p>
            </div>
          </div>
        </div>

        <div class="section-footer">
          <router-link to="/projects" class="link-more">
            查看全部项目
            <svg class="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="skills-section">
      <div class="max-w-5xl mx-auto px-6">
        <div class="section-header">
          <span class="section-tag">Tech Stack</span>
          <h2 class="section-title glitch-text" data-text="技能栈">技能栈</h2>
          <p class="section-desc">我熟悉的技术与工具</p>
        </div>

        <div class="skills-grid">
          <div v-for="(skill, index) in skills" :key="skill"
               class="skill-tag"
               :style="{ animationDelay: `${index * 0.05}s` }">
            <span class="skill-icon">{{ getSkillIcon(skill) }}</span>
            {{ skill }}
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="max-w-5xl mx-auto px-6">
        <div class="stats-grid">
          <div v-for="(stat, index) in stats" :key="stat.label" class="stat-card">
            <div class="stat-value">
              <span class="stat-number">{{ animatedStats[index] }}</span>
              <span class="stat-suffix">{{ stat.suffix }}</span>
            </div>
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-bar">
              <div class="stat-bar-fill" :style="{ width: `${(animatedStats[index] / stat.value) * 100}%` }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Terminal Section -->
    <section class="terminal-section" ref="terminalSection">
      <div class="max-w-5xl mx-auto px-6">
        <div class="terminal-window">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="terminal-title">zsh ~ 栗子的终端</span>
          </div>
          <div class="terminal-body">
            <div class="terminal-line" :class="{ 'visible': terminalLines[0] }">
              <span class="prompt">$</span>
              <span class="command">whoami</span>
            </div>
            <div class="terminal-output" :class="{ 'visible': terminalLines[1] }">
              <span class="output-highlight">栗子</span> - 前端开发者 & AI 探索者
            </div>
            <div class="terminal-line" :class="{ 'visible': terminalLines[2] }">
              <span class="prompt">$</span>
              <span class="command">cat skills.txt</span>
            </div>
            <div class="terminal-output skills-output" :class="{ 'visible': terminalLines[3] }">
              <span v-for="(skill, i) in skills" :key="skill" class="skill-chip" :style="{ animationDelay: `${i * 0.1}s` }">
                {{ skill }}
              </span>
            </div>
            <div class="terminal-line" :class="{ 'visible': terminalLines[4] }">
              <span class="prompt">$</span>
              <span class="command">{{ currentCommand }}</span>
              <span class="cursor-blink">▊</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-card">
        <div class="cta-content">
          <h2 class="cta-title">有想法？让我们一起实现</h2>
          <p class="cta-desc">从想法到落地，栗子工作室陪你走完全程</p>
          <router-link to="/contact-info" class="btn btn-primary btn-lg">
            开始合作
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TypewriterText from '../components/TypewriterText.vue'
import BackgroundTags from '../components/BackgroundTags.vue'

export default {
  name: 'Home',
  components: {
    TypewriterText,
    BackgroundTags
  },
  data() {
    return {
      subtitleText: '正在学习前沿 AI，探索技术与创意的交汇点',
      mouseX: 0,
      mouseY: 0,
      particles: [],
      containerRef: null,
      featuredProjects: [
        {
          id: 1,
          title: '云端 OpenClaw 部署',
          description: '在云端服务器部署 OpenClaw AI 代理框架，实现 24/7 在线服务',
          image: '/images/ai-robot.jpg',
          category: 'AI',
          link: '/openclaw-deploy?from=home'
        },
        {
          id: 2,
          title: '个人网站搭建',
          description: '从零开始搭建深色科技风个人网站，Vue 3 + Tailwind CSS',
          image: '/images/cyberpunk-city.jpg',
          category: 'Web',
          link: '/website-build?from=home'
        },
      ],
      skills: [
        'Vue.js', 'React', 'TypeScript', 'Node.js', 'Python',
        'AI/LLM', 'Figma', 'Tailwind CSS', 'Vercel', 'Git'
      ],
      stats: [
        { label: '项目经验', value: 50, suffix: '+' },
        { label: '代码行数', value: 100, suffix: 'K+' },
        { label: '杯咖啡', value: 999, suffix: '+' },
        { label: 'AI 对话', value: 10, suffix: 'K+' },
      ],
      animatedStats: [0, 0, 0, 0],
      statsVisible: false,
      // 终端动态效果
      terminalLines: [false, false, false, false, false],
      currentCommand: '',
      fullCommand: 'echo "Welcome to my world! 🚀"'
    }
  },
  computed: {
    cursorGlowStyle() {
      return {
        left: `${this.mouseX}px`,
        top: `${this.mouseY}px`,
      }
    },
    dynamicGridStyle() {
      const offsetX = (this.mouseX / window.innerWidth - 0.5) * 20
      const offsetY = (this.mouseY / window.innerHeight - 0.5) * 20
      return {
        transform: `translate(${offsetX}px, ${offsetY}px)`
      }
    }
  },
  mounted() {
    this.initParticles()
    // 确保 DOM 渲染完成后再初始化观察器
    this.$nextTick(() => {
      setTimeout(() => {
        this.initScrollObserver()
        this.initTerminalObserver()
      }, 100)
    })
    // 初始化统计数据
    this.animatedStats = this.stats.map(() => 0)
  },
  beforeUnmount() {
    // 清理定时器
    if (this.terminalTimer) clearInterval(this.terminalTimer)
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.clientX
      this.mouseY = e.clientY
    },
    initParticles() {
      const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#a78bfa']
      const particleCount = 60

      for (let i = 0; i < particleCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)]
        const size = Math.random() * 4 + 2
        const x = Math.random() * 100
        const y = Math.random() * 100
        const duration = Math.random() * 20 + 15
        const delay = Math.random() * -20

        this.particles.push({
          id: i,
          style: {
            left: `${x}%`,
            top: `${y}%`,
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            boxShadow: `0 0 ${size * 3}px ${color}`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }
        })
      }
    },
    initScrollObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.statsVisible) {
            this.statsVisible = true
            this.animateStats()
          }
        })
      }, { threshold: 0.3 })

      const statsSection = document.querySelector('.stats-section')
      if (statsSection) {
        observer.observe(statsSection)
      }
    },
    initTerminalObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.startTerminalAnimation()
            observer.disconnect()
          }
        })
      }, { threshold: 0.5 })

      const terminalSection = this.$refs.terminalSection
      if (terminalSection) {
        observer.observe(terminalSection)
      }
    },
    startTerminalAnimation() {
      // 逐行显示终端内容
      const delays = [0, 300, 800, 1100, 1800]
      delays.forEach((delay, index) => {
        setTimeout(() => {
          this.terminalLines[index] = true
          if (index === 4) {
            this.startTypingEffect()
          }
        }, delay)
      })
    },
    startTypingEffect() {
      let charIndex = 0
      this.terminalTimer = setInterval(() => {
        if (charIndex < this.fullCommand.length) {
          this.currentCommand += this.fullCommand[charIndex]
          charIndex++
        } else {
          clearInterval(this.terminalTimer)
          // 循环播放
          setTimeout(() => {
            this.currentCommand = ''
            this.startTypingEffect()
          }, 3000)
        }
      }, 80)
    },
    animateStats() {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      this.stats.forEach((stat, index) => {
        let step = 0
        const timer = setInterval(() => {
          step++
          const progress = step / steps
          const easeOut = 1 - Math.pow(1 - progress, 3)
          this.animatedStats[index] = Math.floor(stat.value * easeOut)

          if (step >= steps) {
            clearInterval(timer)
            this.animatedStats[index] = stat.value
          }
        }, interval)
      })
    },
    handleCardTilt(e, cardId) {
      const card = e.currentTarget
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 15
      const rotateY = (centerX - x) / 15

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
    },
    resetCardTilt(e) {
      const card = e.currentTarget
      card.style.transform = ''
    },
    getSkillIcon(skill) {
      const icons = {
        'Vue.js': '⚡',
        'React': '⚛️',
        'TypeScript': '📘',
        'Node.js': '🟢',
        'Python': '🐍',
        'AI/LLM': '🤖',
        'Figma': '🎨',
        'Tailwind CSS': '💨',
        'Vercel': '▲',
        'Git': '📦'
      }
      return icons[skill] || '💡'
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%);
  position: relative;
  overflow-x: hidden;
}

/* CRT 扫描线效果 */
.scanlines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 2px
  );
  opacity: 0.15;
}

/* 粒子系统 */
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
  opacity: 0.6;
}

@keyframes particleFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, -50px) scale(1.2);
    opacity: 0.8;
  }
  50% {
    transform: translate(-20px, -100px) scale(0.8);
    opacity: 0.5;
  }
  75% {
    transform: translate(40px, -50px) scale(1.1);
    opacity: 0.7;
  }
}

/* 鼠标跟随光晕 */
.cursor-glow {
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
  pointer-events: none;
  z-index: 2;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease-out;
}

/* 动态网格 */
.dynamic-grid {
  position: absolute;
  inset: -50px;
  background-image:
    linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  transition: transform 0.3s ease-out;
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
  filter: blur(120px);
  opacity: 0.4;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -150px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  bottom: 20%;
  left: -100px;
  animation: float 25s ease-in-out infinite reverse;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  bottom: -50px;
  right: 20%;
  animation: float 18s ease-in-out infinite;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 80px 80px;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(40px, -40px) scale(1.1); }
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  text-align: center;
}

/* Avatar */
.avatar-wrapper {
  position: relative;
  width: 140px;
  height: 140px;
  margin: 0 auto 2rem;
}

.avatar-ring {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.avatar-glow {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  filter: blur(30px);
  opacity: 0.5;
  animation: pulse 3s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
}

.avatar-img {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #1a1a2e;
  background: #1a1a2e;
}

.status-dot {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: #22c55e;
  border-radius: 50%;
  border: 3px solid #1a1a2e;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Title */
.title-section {
  margin-bottom: 2.5rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #fff 0%, #a78bfa 50%, #60a5fa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #9ca3af;
  letter-spacing: 0.5px;
}

.char-animate {
  display: inline-block;
  opacity: 0;
  animation: fadeInChar 0.5s ease-out forwards;
}

@keyframes fadeInChar {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* CTA Buttons */
.cta-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(102, 126, 234, 0.5);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(139, 92, 246, 0.5);
}

.btn-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-glass:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-lg {
  padding: 1rem 2rem;
  font-size: 1rem;
}

.btn-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.btn:hover .btn-icon {
  transform: translateX(4px);
}

.btn-icon-sm {
  width: 1rem;
  height: 1rem;
}

/* Scroll Indicator */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  animation: bounce 2s ease-in-out infinite;
}

.mouse {
  width: 24px;
  height: 40px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.wheel {
  width: 4px;
  height: 8px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 2px;
  animation: scroll 2s ease-in-out infinite;
}

@keyframes scroll {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(6px); opacity: 0.5; }
}

.scroll-indicator span {
  font-size: 0.75rem;
  color: #6b7280;
}

/* Sections */
.projects-section,
.skills-section,
.stats-section,
.terminal-section {
  padding: 6rem 0;
  position: relative;
  z-index: 1;
}

/* Glitch Text Effect */
.glitch-text {
  position: relative;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  left: 2px;
  text-shadow: -2px 0 #ff00ff;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch-text::after {
  left: -2px;
  text-shadow: -2px 0 #00ffff;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(31px, 9999px, 94px, 0); }
  5% { clip: rect(70px, 9999px, 71px, 0); }
  10% { clip: rect(29px, 9999px, 24px, 0); }
  15% { clip: rect(69px, 9999px, 56px, 0); }
  20% { clip: rect(14px, 9999px, 82px, 0); }
  25% { clip: rect(97px, 9999px, 34px, 0); }
  30% { clip: rect(47px, 9999px, 10px, 0); }
  35% { clip: rect(23px, 9999px, 98px, 0); }
  40% { clip: rect(56px, 9999px, 38px, 0); }
  45% { clip: rect(78px, 9999px, 87px, 0); }
  50% { clip: rect(9px, 9999px, 43px, 0); }
  55% { clip: rect(65px, 9999px, 12px, 0); }
  60% { clip: rect(34px, 9999px, 76px, 0); }
  65% { clip: rect(89px, 9999px, 23px, 0); }
  70% { clip: rect(45px, 9999px, 67px, 0); }
  75% { clip: rect(12px, 9999px, 89px, 0); }
  80% { clip: rect(67px, 9999px, 45px, 0); }
  85% { clip: rect(23px, 9999px, 78px, 0); }
  90% { clip: rect(56px, 9999px, 34px, 0); }
  95% { clip: rect(89px, 9999px, 12px, 0); }
  100% { clip: rect(34px, 9999px, 67px, 0); }
}

@keyframes glitch-anim2 {
  0% { clip: rect(65px, 9999px, 23px, 0); }
  5% { clip: rect(12px, 9999px, 89px, 0); }
  10% { clip: rect(78px, 9999px, 45px, 0); }
  15% { clip: rect(34px, 9999px, 67px, 0); }
  20% { clip: rect(89px, 9999px, 12px, 0); }
  25% { clip: rect(45px, 9999px, 78px, 0); }
  30% { clip: rect(23px, 9999px, 56px, 0); }
  35% { clip: rect(67px, 9999px, 34px, 0); }
  40% { clip: rect(89px, 9999px, 23px, 0); }
  45% { clip: rect(12px, 9999px, 78px, 0); }
  50% { clip: rect(56px, 9999px, 45px, 0); }
  55% { clip: rect(34px, 9999px, 89px, 0); }
  60% { clip: rect(78px, 9999px, 12px, 0); }
  65% { clip: rect(23px, 9999px, 67px, 0); }
  70% { clip: rect(45px, 9999px, 34px, 0); }
  75% { clip: rect(89px, 9999px, 56px, 0); }
  80% { clip: rect(12px, 9999px, 23px, 0); }
  85% { clip: rect(67px, 9999px, 89px, 0); }
  90% { clip: rect(34px, 9999px, 12px, 0); }
  95% { clip: rect(78px, 9999px, 45px, 0); }
  100% { clip: rect(56px, 9999px, 78px, 0); }
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 9999px;
  font-size: 0.75rem;
  color: #a78bfa;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.section-desc {
  color: #6b7280;
  font-size: 1rem;
}

/* Project Cards */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-image {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .card-image img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .card-overlay {
  opacity: 1;
}

.view-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}

.card-content {
  padding: 1.5rem;
}

.card-category {
  font-size: 0.75rem;
  color: #a78bfa;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: white;
  margin: 0.5rem 0;
}

.card-desc {
  color: #9ca3af;
  font-size: 0.875rem;
  line-height: 1.5;
}

.section-footer {
  text-align: center;
}

.link-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #a78bfa;
  font-weight: 500;
  transition: all 0.3s ease;
}

.link-more:hover {
  color: #c4b5fd;
}

.link-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.3s ease;
}

.link-more:hover .link-icon {
  transform: translateX(4px);
}

/* Skills */
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.skill-tag {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 9999px;
  color: #d1d5db;
  font-size: 0.875rem;
  transition: all 0.3s ease;
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-tag:hover {
  background: rgba(139, 92, 246, 0.1);
  border-color: rgba(139, 92, 246, 0.3);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
}

.skill-icon {
  margin-right: 0.5rem;
}

/* Stats Section */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #667eea, #764ba2, transparent);
}

.stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-suffix {
  font-size: 1.5rem;
}

.stat-label {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.stat-bar {
  margin-top: 1rem;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.stat-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #a78bfa);
  border-radius: 2px;
  transition: width 2s ease-out;
}

/* Terminal Section */
.terminal-window {
  background: rgba(0, 0, 0, 0.85);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(139, 92, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.terminal-header {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
  padding: 0.875rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.terminal-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transition: transform 0.2s ease;
}

.dot:hover {
  transform: scale(1.2);
}

.dot.red { background: linear-gradient(135deg, #ff5f56, #e0443e); }
.dot.yellow { background: linear-gradient(135deg, #ffbd2e, #dea123); }
.dot.green { background: linear-gradient(135deg, #27ca40, #1aab2d); }

.terminal-title {
  color: #6b7280;
  font-size: 0.75rem;
  margin-left: auto;
  font-family: 'SF Mono', 'Fira Code', monospace;
}

.terminal-body {
  padding: 1.5rem;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 0.9rem;
  line-height: 2;
  min-height: 280px;
}

.terminal-line {
  margin-bottom: 0.25rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.4s ease;
}

.terminal-line.visible {
  opacity: 1;
  transform: translateY(0);
}

.prompt {
  color: #27ca40;
  margin-right: 0.75rem;
  font-weight: 600;
}

.command {
  color: #667eea;
  font-weight: 500;
}

.terminal-output {
  color: #9ca3af;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.4s ease;
}

.terminal-output.visible {
  opacity: 1;
  transform: translateX(0);
}

.output-highlight {
  color: #f472b6;
  font-weight: 600;
}

.skills-output {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.skill-chip {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  border-radius: 9999px;
  color: #c4b5fd;
  font-size: 0.8rem;
  opacity: 0;
  transform: scale(0.8);
  animation: popIn 0.3s ease forwards;
}

@keyframes popIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.cursor-blink {
  color: #667eea;
  animation: blink-cursor 0.8s infinite;
  font-weight: 300;
}

/* Card Shine Effect */
.card-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.05) 45%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.05) 55%,
    transparent 60%
  );
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  pointer-events: none;
  z-index: 10;
}

.project-card:hover .card-shine {
  transform: translateX(100%);
}

/* CTA Section */
.cta-section {
  padding: 6rem 1.5rem;
  position: relative;
  z-index: 1;
}

.cta-card {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 2rem;
  text-align: center;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
}

.cta-desc {
  color: #9ca3af;
  margin-bottom: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .cta-card {
    padding: 2rem;
  }

  .cta-title {
    font-size: 1.5rem;
  }
}
</style>