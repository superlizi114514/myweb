<template>
  <div class="max-w-5xl mx-auto px-6 py-24">
    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-5xl font-bold text-apple-gray-900 mb-6">Projects</h1>
      <p class="text-xl text-apple-gray-500">A collection of my recent work</p>
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
            ? 'bg-apple-gray-900 text-white' 
            : 'bg-apple-gray-100 text-apple-gray-600 hover:bg-apple-gray-200'
        ]"
      >
        {{ filter }}
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="grid md:grid-cols-2 gap-8">
      <div v-for="project in filteredProjects" :key="project.id" class="group cursor-pointer">
        <div class="bg-apple-gray-50 rounded-2xl overflow-hidden aspect-[4/3] mb-4">
          <img :src="project.image" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div class="flex items-center gap-2 mb-2">
          <span v-for="tag in project.tags" :key="tag" class="text-xs text-apple-gray-500 bg-apple-gray-100 px-3 py-1 rounded-full">
            {{ tag }}
          </span>
        </div>
        <h3 class="text-xl font-semibold text-apple-gray-900 mb-2">{{ project.title }}</h3>
        <p class="text-apple-gray-500">{{ project.description }}</p>
        <a :href="project.link" target="_blank" class="inline-flex items-center mt-4 text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors">
          View Project →
        </a>
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
          title: '云端 OpenClaw 部署', 
          description: '在云端服务器部署 OpenClaw AI 代理框架，实现 24/7 在线服务', 
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
          tags: ['OpenClaw', 'Linux', 'Docker'],
          category: 'AI',
          link: '#'
        },
        { 
          id: 2, 
          title: 'AI Agent 开发', 
          description: '基于 OpenClaw 开发自定义 AI Agent，实现自动化任务处理', 
          image: 'https://images.unsplash.com/photo-1676277791608-2d929d4b954f?w=800&h=600&fit=crop',
          tags: ['AI Agent', 'Node.js', 'Automation'],
          category: 'AI',
          link: '#'
        },
        { 
          id: 3, 
          title: '个人作品集网站', 
          description: 'Apple 风格的 Vue 3 个人网站，展示项目与技能', 
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
          tags: ['Vue.js', 'Vercel', 'Tailwind'],
          category: 'Web',
          link: '#'
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
