<template>
  <div class="max-w-4xl mx-auto px-6 py-24">
    <!-- Hero -->
    <div class="text-center mb-16">
      <h1 class="text-5xl font-bold text-apple-gray-900 mb-6">About Me</h1>
      <p class="text-xl text-apple-gray-500">AI 技术探索者 · 山东 · 中国</p>
    </div>

    <!-- Profile Image -->
    <div class="flex justify-center mb-12">
      <div class="w-48 h-48 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-lg">
        <img src="/avatar.jpg" alt="Profile" class="w-full h-full rounded-full object-cover bg-white" loading="eager" fetchpriority="high" />
      </div>
    </div>

    <!-- Story -->
    <div class="prose prose-lg max-w-none mb-16">
      <p class="text-apple-gray-600 leading-relaxed">
        你好！我是栗子，一名 AI 技术探索者，位于中国山东。我专注于学习和实践前沿 AI 技术，
        致力于将 AI 能力与实际应用相结合。
      </p>
      <p class="text-apple-gray-600 leading-relaxed">
        目前主要研究 OpenClaw 等 AI 代理框架的部署与应用，探索 AI 在日常工作和生活中的无限可能。
      </p>
      <p class="text-apple-gray-600 leading-relaxed">
        我相信 AI 将改变世界，希望与志同道合的伙伴一起探索这个令人兴奋的新领域。
      </p>
    </div>

    <!-- Timeline -->
    <div class="mb-16">
      <h2 class="text-2xl font-bold text-apple-gray-900 mb-8">Experience</h2>
      <div class="space-y-8">
        <div v-for="(item, index) in timeline" :key="index" class="relative pl-8 border-l-2 border-apple-gray-200">
          <div class="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-apple-gray-900"></div>
          <div class="mb-1 text-sm text-apple-gray-500">{{ item.period }}</div>
          <h3 class="text-lg font-semibold text-apple-gray-900">{{ item.role }}</h3>
          <p class="text-apple-gray-600">{{ item.company }}</p>
          <p class="text-apple-gray-500 text-sm mt-2">{{ item.description }}</p>
        </div>
      </div>
    </div>

    <!-- Skills -->
    <div>
      <h2 class="text-2xl font-bold text-apple-gray-900 mb-8">Skills</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="(category, catIndex) in skillsCategories" :key="catIndex">
          <h3 class="text-sm font-semibold text-apple-gray-900 mb-4 uppercase tracking-wide">{{ category.name }}</h3>
          <div class="flex flex-wrap gap-2">
            <span v-for="skill in category.skills" :key="skill" class="bg-apple-gray-100 px-4 py-2 rounded-lg text-sm text-apple-gray-700">
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold text-apple-gray-900 mb-8">联系我</h2>
      <div class="flex flex-wrap gap-4">
        <a href="tencent://message/?uin=3471023785" class="flex items-center gap-3 bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.003 2c-1.699 0-3.26.32-4.683.903-5.867 2.407-6.066 9.397.199 11.836v2.72c0 1.279-1.081 2.33-2.367 2.33-1.285 0-2.329-1.051-2.329-2.33V16.3c0-.552-.448-1-1-1s-1 .448-1 1v1.159c0 1.852 1.501 3.359 3.352 3.359 1.851 0 3.351-1.507 3.351-3.359v-2.72c6.265-2.439 6.066-9.429.199-11.836C15.263 2.32 13.702 2 12.003 2zM9.003 20.003c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2zm6.003 0c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"/></svg>
          <span>QQ: 3471023785</span>
        </a>
        <a href="https://www.douyin.com/user/self?from_tab_name=main" target="_blank" class="flex items-center gap-3 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
          <span>抖音</span>
        </a>
        <a href="https://m.tb.cn/h.iXXX6S4?tk=78fdUHnev25" target="_blank" class="flex items-center gap-3 bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-yellow-600 transition-all">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
          <span>闲鱼</span>
        </a>
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
        { period: '2024 - Present', role: 'AI 技术探索者', company: '独立研究', description: '学习与实践前沿 AI 技术，部署云端 OpenClaw 框架' },
        { period: '2023 - 2024', role: 'AI 爱好者', company: '自学', description: '开始接触 AI 代理技术，学习 Agent 开发与应用' },
      ],
      skillsCategories: [
        { name: 'AI 技术', skills: ['OpenClaw', 'AI Agent', 'Prompt Engineering', 'LLM 应用'] },
        { name: '部署运维', skills: ['云端部署', 'Docker', 'Linux', 'Vercel'] },
        { name: '开发工具', skills: ['Git', 'VS Code', 'Node.js', 'Vue.js'] },
      ]
    }
  }
}
</script>
