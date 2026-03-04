<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="max-w-4xl mx-auto px-6 text-center py-32">
        <!-- Avatar -->
        <div class="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg">
          <img src="/avatar.jpg" alt="Avatar" class="w-full h-full rounded-full object-cover bg-white" />
        </div>
        
        <h1 class="text-5xl md:text-6xl font-bold mb-6 text-apple-gray-900">
          <TypewriterText 
            text="Hello, I'm 栗子" 
            :speed="150" 
            :startDelay="300"
          />
        </h1>
        <p class="text-lg md:text-xl text-apple-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          正在学习前沿 AI，探索技术与创意的交汇点
        </p>
        <div class="flex items-center justify-center space-x-4">
          <router-link to="/projects" class="group bg-apple-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-apple-gray-800 transition-all flex items-center gap-2">
            <span>View My Work</span>
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
          <router-link to="/contact" class="bg-white text-apple-gray-900 px-8 py-3 rounded-full text-sm font-medium border border-apple-gray-200 hover:border-apple-gray-400 hover:shadow-md transition-all">
            Get in Touch
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
    <section class="py-24 bg-white">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-apple-gray-900 mb-4">Featured Projects</h2>
          <p class="text-apple-gray-500">精选项目展示</p>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <div v-for="project in featuredProjects" :key="project.id" class="group cursor-pointer">
            <div class="bg-apple-gray-50 rounded-2xl overflow-hidden aspect-[4/3] mb-4">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-lg font-semibold text-apple-gray-900 mb-2">{{ project.title }}</h3>
            <p class="text-apple-gray-500 text-sm">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-24 bg-gradient-to-b from-white to-apple-gray-50">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-apple-gray-900 mb-4">Skills & Technologies</h2>
          <p class="text-apple-gray-500">技术栈与工具</p>
        </div>
        <div class="flex flex-wrap justify-center gap-3">
          <span v-for="skill in skills" :key="skill" class="bg-white px-6 py-3 rounded-full text-sm text-apple-gray-700 border border-apple-gray-200 hover:border-blue-500 hover:text-blue-500 transition-all shadow-sm hover:shadow-md">
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

export default {
  name: 'Home',
  components: {
    TypewriterText,
    MusicPlayer
  },
  data() {
    return {
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
        'OpenClaw', 'AI Agent', 'Vue.js', 'Node.js', 'Python',
        'Linux', 'Docker', 'Git', 'Prompt Engineering'
      ]
    }
  }
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: #ffffff;
}

.hero-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

/* 微妙的背景装饰 */
.hero-section::before {
  content: '';
  position: absolute;
  top: -10%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-section::after {
  content: '';
  position: absolute;
  bottom: -10%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
}

.hero-section > div {
  position: relative;
  z-index: 1;
}
</style>
