<template>
  <div class="max-w-4xl mx-auto px-6 py-24">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-apple-gray-900 mb-6">Blog</h1>
        <p class="text-xl text-apple-gray-500">Thoughts, tutorials, and insights</p>
      </div>

      <!-- Posts List -->
      <div class="space-y-12">
        <article v-for="post in posts" :key="post.id" class="group cursor-pointer">
          <div class="flex flex-col md:flex-row gap-6 items-start">
            <div class="w-full md:w-64 flex-shrink-0">
              <div class="bg-apple-gray-50 rounded-xl overflow-hidden aspect-[16/10]">
                <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-xs text-blue-500 font-medium">{{ post.category }}</span>
                <span class="text-xs text-apple-gray-400">•</span>
                <span class="text-xs text-apple-gray-400">{{ post.date }}</span>
              </div>
              <h2 class="text-2xl font-bold text-apple-gray-900 mb-3 group-hover:text-blue-500 transition-colors">
                {{ post.title }}
              </h2>
              <p class="text-apple-gray-500 mb-4">{{ post.excerpt }}</p>
              <span class="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors">
                Read more →
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-center mt-16 space-x-2">
        <button class="px-4 py-2 rounded-lg text-sm text-apple-gray-500 hover:bg-apple-gray-100 transition-colors">
          Previous
        </button>
        <button class="px-4 py-2 rounded-lg text-sm bg-apple-gray-900 text-white">
          1
        </button>
        <button class="px-4 py-2 rounded-lg text-sm text-apple-gray-500 hover:bg-apple-gray-100 transition-colors">
          2
        </button>
        <button class="px-4 py-2 rounded-lg text-sm text-apple-gray-500 hover:bg-apple-gray-100 transition-colors">
          Next
        </button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      posts: [
        {
          id: 1,
          title: 'OpenClaw AI 代理入门教程',
          excerpt: '从零开始学习如何部署和配置 OpenClaw AI 代理框架，实现自动化任务处理。',
          category: 'AI 教程',
          date: 'Mar 1, 2024',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop'
        },
        {
          id: 2,
          title: 'AI Agent 应用场景分享',
          excerpt: '探索 AI Agent 在实际工作和生活中的应用场景，提升效率的实用技巧。',
          category: 'AI 应用',
          date: 'Feb 25, 2024',
          image: 'https://images.unsplash.com/photo-1676277791608-2d929d4b954f?w=400&h=250&fit=crop'
        },
        {
          id: 3,
          title: 'Vue 3 性能优化实践',
          excerpt: '分享 Vue 3 项目性能优化的实战经验和最佳实践。',
          category: '开发技巧',
          date: 'Feb 20, 2024',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop'
        },
      ]
    }
  }
}
</script>
