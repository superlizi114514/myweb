<template>
  <div class="about-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="grid-overlay"></div>
    </div>

    <div class="max-w-5xl mx-auto px-6 py-20 relative z-10">
      <!-- Hero Section -->
      <div class="hero-section text-center mb-20">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
          <span class="text-sm text-gray-400">About Me</span>
        </div>

        <!-- Avatar -->
        <div class="avatar-container mb-8">
          <div class="avatar-ring">
            <img src="/avatar.jpg" alt="栗子" class="avatar-img" loading="eager" />
          </div>
          <div class="avatar-glow"></div>
        </div>

        <h1 class="text-5xl md:text-6xl font-bold mb-4">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">栗子</span>
        </h1>
        <p class="text-xl text-gray-400 mb-6">AI 技术探索者 · 栗子工作室创始人</p>
        <div class="flex items-center justify-center gap-2 text-gray-500">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <span>山东，中国</span>
        </div>
      </div>

      <!-- Story Card -->
      <div class="glass-card p-8 md:p-10 mb-12">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </span>
          我的故事
        </h2>
        <div class="story-content space-y-5">
          <p class="text-gray-300 leading-relaxed text-lg">
            你好！我是栗子，一名 AI 技术探索者，也是 <span class="text-purple-400 font-medium">栗子工作室</span> 的创始人。
          </p>
          <p class="text-gray-300 leading-relaxed text-lg">
            站在 2026 年的今天，AI 已经深深融入了软件开发的每一个环节。我专注于学习与实践前沿 AI 技术，致力于将 AI 能力与创意落地相结合。
          </p>
          <p class="text-gray-300 leading-relaxed text-lg">
            栗子工作室不出售冷冰冰的软件——我们出售的是一段 <span class="text-pink-400 font-medium">从想法到落地的完整旅程</span>。从一个模糊的想法，到清晰的需求定义；从概念设计，到精心打磨的交互细节；从功能实现，到持续迭代优化。
          </p>
          <p class="text-gray-300 leading-relaxed text-lg">
            AI 是我们的工具，但真正引导一切的，是对 <span class="text-blue-400 font-medium">「打动人心」</span> 这个目标的坚持。
          </p>
        </div>
      </div>

      <!-- Timeline -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </span>
          成长历程
        </h2>
        <div class="timeline-container">
          <div v-for="(item, index) in timeline" :key="index" class="timeline-item" :style="{ animationDelay: `${index * 0.15}s` }">
            <div class="timeline-marker">
              <div class="marker-dot"></div>
              <div class="marker-line"></div>
            </div>
            <div class="timeline-content glass-card p-6">
              <div class="flex items-start justify-between mb-3">
                <span class="text-sm font-medium text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full">{{ item.period }}</span>
                <span v-if="item.current" class="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">Current</span>
              </div>
              <h3 class="text-xl font-bold text-white mb-1">{{ item.role }}</h3>
              <p class="text-purple-300 text-sm mb-3">{{ item.company }}</p>
              <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Skills -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </span>
          技术栈
        </h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(category, catIndex) in skillsCategories" :key="catIndex" class="glass-card p-6 group hover:border-purple-500/50 transition-all duration-300">
            <div class="flex items-center gap-3 mb-4">
              <span class="w-10 h-10 rounded-xl bg-gradient-to-br flex items-center justify-center" :class="category.gradient">
                <component :is="category.icon" class="w-5 h-5 text-white" />
              </span>
              <h3 class="font-semibold text-white">{{ category.name }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="skill in category.skills" :key="skill" class="skill-tag">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Philosophy -->
      <div class="philosophy-section glass-card p-8 md:p-10 mb-12">
        <div class="flex items-center gap-3 mb-6">
          <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </span>
          <h2 class="text-2xl font-bold text-white">核心理念</h2>
        </div>
        <blockquote class="text-xl text-gray-300 italic leading-relaxed pl-6 border-l-4 border-purple-500">
          "门槛的降低，从来都不意味着价值的贬损。在人人都能做的时代，做得足够好已经不够了——你必须做得足够独特、足够动人、足够让人记住。"
        </blockquote>
        <p class="text-right text-gray-500 mt-4">—— 栗子，2026</p>
      </div>

      <!-- Contact -->
      <div class="glass-card p-8 md:p-10">
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </span>
          联系我
        </h2>
        <p class="text-gray-400 mb-6">期待与你一起探索 AI 的无限可能，欢迎志同道合的朋友联系交流！</p>
        <div class="flex flex-wrap gap-4">
          <a href="tencent://message/?uin=3471023785" class="contact-btn bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-blue-500/30">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.003 2c-1.699 0-3.26.32-4.683.903-5.867 2.407-6.066 9.397.199 11.836v2.72c0 1.279-1.081 2.33-2.367 2.33-1.285 0-2.329-1.051-2.329-2.33V16.3c0-.552-.448-1-1-1s-1 .448-1 1v1.159c0 1.852 1.501 3.359 3.352 3.359 1.851 0 3.351-1.507 3.351-3.359v-2.72c6.265-2.439 6.066-9.429.199-11.836C15.263 2.32 13.702 2 12.003 2zM9.003 20.003c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2zm6.003 0c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"/></svg>
            <span>QQ: 3471023785</span>
          </a>
          <a href="https://v.douyin.com/di64-2AO-WM/" target="_blank" class="contact-btn bg-gradient-to-r from-gray-800 to-black hover:shadow-gray-800/30">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            <span>抖音</span>
          </a>
          <a href="https://m.tb.cn/h.iXXX6S4?tk=78fdUHnev25" target="_blank" class="contact-btn bg-gradient-to-r from-yellow-600 to-amber-500 hover:shadow-yellow-500/30">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
            <span>闲鱼</span>
          </a>
          <router-link to="/shop" class="contact-btn bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-purple-500/30">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span>栗子工作室</span>
          </router-link>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="text-center mt-12 pb-8">
        <router-link to="/" class="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors group">
          <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  name: 'About',
  data() {
    return {
      timeline: [
        {
          period: '2026 - Present',
          role: '栗子工作室创始人',
          company: '独立工作室',
          description: '专注于 AI 驱动的创意落地，提供从想法到产品的完整旅程。不出售软件，出售打动人心的作品。',
          current: true
        },
        {
          period: '2025',
          role: 'AI 应用开发者',
          company: '自由职业',
          description: '深入探索 AI Agent 开发，部署云端 OpenClaw 框架，为客户提供 AI 解决方案定制服务。'
        },
        {
          period: '2024',
          role: 'AI 技术学习者',
          company: '自学研究',
          description: '开始系统学习 AI 代理技术与 Prompt Engineering，探索 LLM 在实际场景中的应用可能。'
        },
        {
          period: '2023',
          role: 'AI 探索起步',
          company: '兴趣驱动',
          description: '初次接触 AI 技术，被其无限可能所吸引，开始了 AI 学习之旅的第一步。'
        },
      ],
      skillsCategories: [
        {
          name: 'AI 技术',
          skills: ['OpenClaw', 'AI Agent', 'Prompt Engineering', 'LLM 应用', 'Claude API'],
          gradient: 'from-purple-500 to-pink-500',
          icon: 'svg'
        },
        {
          name: '开发工具',
          skills: ['Vue.js', 'Node.js', 'Git', 'VS Code', 'Vite'],
          gradient: 'from-blue-500 to-cyan-500',
          icon: 'svg'
        },
        {
          name: '部署运维',
          skills: ['云端部署', 'Docker', 'Linux', 'Vercel', 'GitHub Actions'],
          gradient: 'from-green-500 to-emerald-500',
          icon: 'svg'
        },
      ]
    }
  }
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%);
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
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
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -100px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  bottom: 20%;
  left: -50px;
  animation: float 15s ease-in-out infinite reverse;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}

/* 玻璃卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  transition: all 0.4s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(139, 92, 246, 0.2);
}

/* Avatar */
.avatar-container {
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto;
}

.avatar-ring {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2, #f093fb, #667eea);
  background-size: 300% 300%;
  animation: gradient-rotate 4s ease infinite;
  padding: 4px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: #1a1a2e;
}

.avatar-glow {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  filter: blur(30px);
  opacity: 0.4;
  z-index: -1;
  animation: pulse-glow 3s ease-in-out infinite;
}

@keyframes gradient-rotate {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
}

/* Timeline */
.timeline-container {
  position: relative;
}

.timeline-item {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.marker-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  box-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
  flex-shrink: 0;
}

.marker-line {
  width: 2px;
  flex: 1;
  background: linear-gradient(to bottom, rgba(102, 126, 234, 0.5), transparent);
  margin-top: 8px;
}

.timeline-item:last-child .marker-line {
  display: none;
}

.timeline-content {
  flex: 1;
  margin-bottom: 0;
}

.timeline-content:hover {
  transform: translateX(8px);
  border-color: rgba(139, 92, 246, 0.3);
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

/* Skills */
.skill-tag {
  background: rgba(139, 92, 246, 0.1);
  border: 1px solid rgba(139, 92, 246, 0.2);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  color: #c4b5fd;
  transition: all 0.3s ease;
}

.skill-tag:hover {
  background: rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.4);
  color: #fff;
}

/* Contact Button */
.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px currentColor;
}

/* Story Content */
.story-content p {
  position: relative;
  padding-left: 16px;
}

.story-content p::before {
  content: '';
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

/* Philosophy */
.phosophy-section {
  position: relative;
}

/* Hero Section */
.hero-section {
  position: relative;
}
</style>