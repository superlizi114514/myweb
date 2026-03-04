<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h1 class="text-6xl md:text-7xl font-bold mb-6">
          <span class="text-apple-gray-900">Hello, I'm </span>
          <TypewriterText 
            text="栗子" 
            :delay="150" 
            :startDelay="300"
            class="gradient-text"
          />
        </h1>
        <p class="text-xl md:text-2xl text-apple-gray-500 mb-8 animate-slide-up" style="animation-delay: 0.5s">
          正在学习前沿 AI，欢迎志同道合的伙伴
        </p>
        <div class="flex items-center justify-center space-x-4 animate-slide-up" style="animation-delay: 0.8s">
          <router-link to="/projects" class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all">
            View My Work
          </router-link>
          <router-link to="/contact" class="bg-white/80 backdrop-blur-sm text-apple-gray-900 px-8 py-3 rounded-full text-sm font-medium border border-white/50 hover:border-purple-300 hover:shadow-lg hover:scale-105 transition-all">
            Get in Touch
          </router-link>
        </div>
      </div>
    </section>

    <!-- Featured Projects -->
    <section class="py-24 bg-white">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-apple-gray-900 mb-12 text-center">Featured Projects</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="project in featuredProjects" :key="project.id" class="group cursor-pointer">
            <div class="bg-apple-gray-50 rounded-2xl overflow-hidden aspect-[4/3] mb-4">
              <img :src="project.image" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h3 class="text-lg font-semibold text-apple-gray-900 mb-2">{{ project.title }}</h3>
            <p class="text-apple-gray-500 text-sm">{{ project.description }}</p>
          </div>
        </div>
        <div class="text-center mt-12">
          <router-link to="/projects" class="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors">
            View all projects →
          </router-link>
        </div>
      </div>
    </section>

    <!-- Skills Section -->
    <section class="py-24 bg-apple-gray-50">
      <div class="max-w-5xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-apple-gray-900 mb-12 text-center">Skills & Technologies</h2>
        <div class="flex flex-wrap justify-center gap-3">
          <span v-for="skill in skills" :key="skill" class="bg-white px-6 py-3 rounded-full text-sm text-apple-gray-700 shadow-sm hover:shadow-md transition-shadow">
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
        { id: 1, title: 'Project One', description: 'A beautiful web application', image: 'https://picsum.photos/800/600?random=1' },
        { id: 2, title: 'Project Two', description: 'Mobile-first design system', image: 'https://picsum.photos/800/600?random=2' },
        { id: 3, title: 'Project Three', description: 'E-commerce platform', image: 'https://picsum.photos/800/600?random=3' },
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
}

.hero-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hero-section > div {
  position: relative;
  z-index: 1;
}

.gradient-text {
  background: linear-gradient(135deg, #fff 0%, #f0f0f0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}
</style>
