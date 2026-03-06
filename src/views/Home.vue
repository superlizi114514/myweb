<template>
  <div class="home-container">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="glow-orb orb-3"></div>
      <div class="grid-overlay"></div>
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
               @click="$router.push(project.link)">
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
          <h2 class="section-title">技能栈</h2>
          <p class="section-desc">我熟悉的技术与工具</p>
        </div>

        <div class="skills-grid">
          <div v-for="(skill, index) in skills" :key="skill"
               class="skill-tag"
               :style="{ animationDelay: `${index * 0.05}s` }">
            {{ skill }}
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
      ]
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
.skills-section {
  padding: 6rem 0;
  position: relative;
  z-index: 1;
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