<template>
  <div class="projects-page">
    <div class="max-w-5xl mx-auto px-6 py-24">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-white mb-6">Projects</h1>
        <p class="text-xl text-gray-400">A collection of my recent work</p>
      </div>

      <!-- Filter -->
    <div class="flex flex-wrap justify-center gap-3 mb-12">
      <button 
        v-for="filter in filters" 
        :key="filter"
        @click="activeFilter = filter"
        :class="[
          'px-6 py-2 rounded-full text-sm font-medium transition-all',
          activeFilter === filter 
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
            : 'bg-[#2a2a3e] text-gray-300 border border-white/10 hover:border-purple-500/50'
        ]"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="grid md:grid-cols-2 gap-8">
      <div v-for="project in filteredProjects" :key="project.id" class="group cursor-pointer">
        <div class="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl overflow-hidden aspect-[4/3] mb-4 border border-purple-500/20 hover:border-purple-400 transition-all shadow-lg">
          <img :src="project.image" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
        </div>
        <div class="flex items-center gap-2 mb-2">
          <span v-for="tag in project.tags" :key="tag" class="text-xs text-white bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/40">
            {{ tag }}
          </span>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">{{ project.title }}</h3>
        <p class="text-gray-200 text-base">{{ project.description }}</p>
        <router-link :to="project.link" class="inline-flex items-center mt-4 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
          View Project →
        </router-link>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  data() {
    return {
      activeFilter: 'All',
      filters: ['All', 'Web', 'Mobile', 'Design', 'AI'],
      projects: [
        { 
          id: 1, 
          title: 'VPS 部署 OpenClaw', 
          description: '阿里云学生机 9.9 元/月 + Coding Plan 7 元/月，总费用 17 元/月的 AI 代理部署方案', 
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
          tags: ['OpenClaw', '阿里云', 'VPS', '学生优惠'],
          category: 'AI',
          link: '/openclaw-deploy'
        },
        { 
          id: 2, 
          title: '个人网站搭建全记录', 
          description: '从零开始搭建深色科技风个人网站，包含 OpenClaw + 千问 3.5Plus 完整开发过程', 
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
          tags: ['Vue.js', 'OpenClaw', 'Qwen3.5', 'GitHub Pages'],
          category: 'Web',
          link: '/website-build'
        },

      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === 'All') {
        return this.projects
      }
      return this.projects.filter(p => p.category === this.activeFilter)
    }
  }
}
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 100%);
}
</style>
