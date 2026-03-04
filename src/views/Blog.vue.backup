<template>
  <div class="blog-page">
    <div class="max-w-4xl mx-auto px-6 py-24">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-white mb-6">Blog</h1>
        <p class="text-xl text-gray-400">Thoughts, tutorials, and insights</p>
      </div>

      <!-- Posts List -->
      <div class="space-y-12">
        <article v-for="post in posts" :key="post.id" class="group cursor-pointer">
          <div class="flex flex-col md:flex-row gap-6 items-start">
            <div class="w-full md:w-64 flex-shrink-0">
              <div class="bg-[#1a1a2e] rounded-xl overflow-hidden aspect-[16/10] border border-white/10">
                <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <span class="text-xs text-purple-400 font-medium">{{ post.category }}</span>
                <span class="text-xs text-gray-500">•</span>
                <span class="text-xs text-gray-400">{{ post.date }}</span>
              </div>
              <h2 class="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {{ post.title }}
              </h2>
              <p class="text-gray-400 mb-4">{{ post.excerpt }}</p>
              <router-link :to="post.link || '#'" class="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors">
                阅读全文 →
              </router-link>
            </div>
          </div>
        </article>
      </div>


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
          title: '个人网站搭建全记录',
          excerpt: '使用 OpenClaw + 千问 3.5Plus，从零开始搭建深色科技风个人网站。包含完整的需求分析、设计决策、代码实现和部署流程。',
          category: '开发记录',
          date: 'Mar 4, 2024',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
          link: '/website-build'
        },
        {
          id: 2,
          title: 'VPS 部署 OpenClaw 完整教程',
          excerpt: '阿里云学生机 9.9 元/月 + Coding Plan 7 元/月，总费用 17 元/月的 AI 代理部署方案。详细步骤、命令和常见问题解答。',
          category: 'AI 教程',
          date: 'Mar 1, 2024',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop',
          link: '/openclaw-deploy'
        },
      ]
    }
  }
}
</script>
