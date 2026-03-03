<template>
  <AppLayout>
    <!-- Hero Section -->
    <section class="min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-white to-apple-gray-50">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h1 class="text-6xl md:text-7xl font-bold text-apple-gray-900 mb-6 animate-fade-in">
          Hello, I'm <span class="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">栗子</span>
        </h1>
        <p class="text-xl md:text-2xl text-apple-gray-500 mb-8 animate-slide-up">
          正在学习前沿 AI，欢迎志同道合的伙伴
        </p>
        <div class="flex items-center justify-center space-x-4 animate-slide-up">
          <router-link to="/projects" class="bg-apple-gray-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-apple-gray-800 transition-all hover:scale-105">
            View My Work
          </router-link>
          <router-link to="/contact" class="bg-white text-apple-gray-900 px-8 py-3 rounded-full text-sm font-medium border border-apple-gray-200 hover:border-apple-gray-400 transition-all hover:scale-105">
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
  </AppLayout>
</template>

<script>
import AppLayout from '../components/AppLayout.vue'

export default {
  name: 'Home',
  components: { AppLayout },
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
