<template>
  <div class="home-container">
    <!-- Background Tags -->
    <BackgroundTags />
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="max-w-4xl mx-auto px-6 text-center py-32">
        <!-- Avatar -->
        <div class="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg">
          <img src="/avatar.jpg" alt="Avatar" class="w-full h-full rounded-full object-cover bg-white" loading="eager" fetchpriority="high" />
        </div>
        
        <h1 class="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          <TypewriterText 
            text="Hello, I'm 栗子" 
            :speed="150" 
            :startDelay="300"
          />
        </h1>
        <p class="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          正在学习前沿 AI，探索技术与创意的交汇点
        </p>
        <div class="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed min-h-[3rem]">
          <TypewriterText 
            v-if="showWelcome"
            text="这里是我的空间 我将向你展示我的全部 欢迎志同道合的朋友" 
            :speed="100" 
            :startDelay="2000"
          />
        </div>
        <div class="flex items-center justify-center space-x-4">
          <router-link to="/projects" class="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
            <span>View My Work</span>
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
          <a href="https://v.douyin.com/di64-2AO-WM/" target="_blank" class="w-full sm:w-auto bg-[#1a1a2e] text-white px-8 py-3 rounded-full text-sm font-medium border border-white/20 hover:border-white/40 hover:bg-[#2a2a3e] transition-all flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
            <span>抖音</span>
          </a>
          <router-link to="/about" class="w-full sm:w-auto bg-[#1a1a2e] text-white px-8 py-3 rounded-full text-sm font-medium border border-white/20 hover:border-white/40 hover:bg-[#2a2a3e] transition-all">
            About Me
          </router-link>
        </div>

        <!-- Scroll Indicator -->
        <div class="mt-20 animate-bounce">
          <svg class="w-6 h-6 text-apple-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="py-24 bg-gradient-to-b from-[#0a0a0f] to-[#16161e] relative">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      <div class="max-w-5xl mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">Featured Projects</h2>
          <p class="text-gray-400">精选项目展示</p>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="project in featuredProjects" :key="project.id" class="group cursor-pointer">
            <div class="bg-[#1a1a2e] rounded-2xl overflow-hidden aspect-[4/3] mb-4 border border-white/10 hover:border-purple-500/50 transition-all duration-300">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-lg font-semibold text-white mb-2">{{ project.title }}</h3>
            <p class="text-gray-400 text-sm">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-24 bg-gradient-to-b from-[#16161e] to-[#0f0f1a] relative">
      <div class="max-w-5xl mx-auto px-6 relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-white mb-4">Skills & Technologies</h2>
          <p class="text-gray-400">技术栈与工具</p>
        </div>
        <div class="flex flex-wrap justify-center gap-3">
          <span v-for="skill in skills" :key="skill" class="bg-[#1a1a2e]/80 backdrop-blur-sm px-6 py-3 rounded-full text-sm text-gray-300 border border-purple-500/30 hover:border-purple-400 hover:text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
            {{ skill }}
          </span>
        </div>
      </div>
    </section>

    <!-- Music Player -->
    <MusicPlayer />
  </div>
</template>

<script>
import TypewriterText from '../components/TypewriterText.vue'
import MusicPlayer from '../components/MusicPlayer.vue'
import BackgroundTags from '../components/BackgroundTags.vue'

export default {
  name: 'Home',
  components: {
    TypewriterText,
    MusicPlayer,
    BackgroundTags
  },
  data() {
    return {
      showWelcome: true,
      featuredProjects: [
        { 
          id: 1, 
          title: '云端 OpenClaw 部署', 
          description: '在云端服务器部署 OpenClaw AI 代理框架，实现 24/7 在线服务', 
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop'
        },
        { 
          id: 2, 
          title: 'AI Agent 开发', 
          description: '基于 OpenClaw 开发自定义 AI Agent，实现自动化任务处理', 
          image: 'https://images.unsplash.com/photo-1676277791608-2d929d4b954f?w=800&h=600&fit=crop'
        },
      ],
      skills: [
        'Vue.js', 'React', 'TypeScript', 'Node.js', 'Python',
        'UI/UX Design', 'Figma', 'Tailwind CSS', 'GraphQL', 'AWS'
      ]
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
  position: relative;
}

/* 头像预加载动画 */
.hero-section img {
  content-visibility: auto;
  contain-intrinsic-size: 128px;
}

/* 渐显动画 */
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

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.hero-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.hero-section > div {
  position: relative;
  z-index: 2;
}

/* 深色主题文字颜色 */
.hero-section h1 {
  color: #ffffff !important;
}

.hero-section p {
  color: #a1a1aa !important;
}
</style>
