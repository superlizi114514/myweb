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
