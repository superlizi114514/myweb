<template>
  <div class="build-page">
    <div class="max-w-4xl mx-auto px-6 py-24">
      <!-- Header -->
      <div class="mb-16">
        <router-link to="/blog" class="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>Back to Blog</span>
        </router-link>
        <h1 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
          个人网站搭建全记录
        </h1>
        <div class="flex items-center gap-4 text-gray-400">
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            2024 年 3 月 4 日
          </span>
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            15 分钟阅读
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="prose prose-invert max-w-none">
        <!-- Summary -->
        <div class="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/30 mb-12">
          <h2 class="text-2xl font-bold text-white mb-4">📋 项目概述</h2>
          <p class="text-gray-300 mb-4">
            使用 OpenClaw AI 代理框架 + 千问 3.5Plus，从零开始搭建深色科技风个人网站。
            包含完整的需求分析、设计决策、代码实现和部署流程。
          </p>
          <div class="grid md:grid-cols-3 gap-4 mt-6">
            <div class="bg-[#1a1a2e] rounded-xl p-4 border border-white/10">
              <p class="text-gray-400 text-sm">技术栈</p>
              <p class="text-white font-medium">Vue 3 + Vite + Tailwind</p>
            </div>
            <div class="bg-[#1a1a2e] rounded-xl p-4 border border-white/10">
              <p class="text-gray-400 text-sm">AI 工具</p>
              <p class="text-white font-medium">OpenClaw + Qwen3.5-Plus</p>
            </div>
            <div class="bg-[#1a1a2e] rounded-xl p-4 border border-white/10">
              <p class="text-gray-400 text-sm">部署平台</p>
              <p class="text-white font-medium">GitHub Pages</p>
            </div>
          </div>
        </div>

        <!-- Step 1 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">1</span>
            需求分析
          </h2>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
            <h3 class="text-lg font-semibold text-white mb-4">目标</h3>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-start gap-3">
                <span class="text-purple-400 mt-1">✓</span>
                <span>深色科技风设计，区别于常见的白色背景网站</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-purple-400 mt-1">✓</span>
                <span>响应式布局，完美适配手机和桌面端</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-purple-400 mt-1">✓</span>
                <span>包含个人介绍、项目展示、博客文章等核心功能</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-purple-400 mt-1">✓</span>
                <span>免费部署到 GitHub Pages，零成本运维</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Step 2 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">2</span>
            技术选型
          </h2>
          <div class="space-y-6">
            <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-4">前端框架</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <p class="text-purple-400 font-medium mb-2">✅ 最终选择</p>
                  <p class="text-gray-300">Vue 3 + Vite + Tailwind CSS v4</p>
                  <p class="text-gray-400 text-sm mt-2">理由：快速开发、热更新、现代化工作流</p>
                </div>
                <div>
                  <p class="text-gray-500 font-medium mb-2">❌ 备选方案</p>
                  <p class="text-gray-400">React / Next.js / Nuxt</p>
                </div>
              </div>
            </div>
            <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-4">AI 辅助</h3>
              <p class="text-gray-300 mb-3">使用 OpenClaw 框架部署在 VPS 上，通过千问 3.5Plus 模型辅助：</p>
              <ul class="space-y-2 text-gray-400">
                <li>• 代码生成和优化</li>
                <li>• Bug 排查和修复</li>
                <li>• 设计建议和文案撰写</li>
                <li>• 实时对话式开发</li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Step 3 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">3</span>
            设计过程
          </h2>
          <div class="space-y-6">
            <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-4">配色方案</h3>
              <div class="grid grid-cols-5 gap-4 mb-4">
                <div class="text-center">
                  <div class="w-full aspect-square rounded-lg bg-[#0a0a0f] mb-2 border border-white/10"></div>
                  <p class="text-xs text-gray-400">#0a0a0f<br/>主背景</p>
                </div>
                <div class="text-center">
                  <div class="w-full aspect-square rounded-lg bg-[#1a1a2e] mb-2 border border-white/10"></div>
                  <p class="text-xs text-gray-400">#1a1a2e<br/>次级背景</p>
                </div>
                <div class="text-center">
                  <div class="w-full aspect-square rounded-lg bg-[#2a2a3e] mb-2 border border-white/10"></div>
                  <p class="text-xs text-gray-400">#2a2a3e<br/>卡片背景</p>
                </div>
                <div class="text-center">
                  <div class="w-full aspect-square rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] mb-2"></div>
                  <p class="text-xs text-gray-400">#667eea<br/>强调色</p>
                </div>
                <div class="text-center">
                  <div class="w-full aspect-square rounded-lg bg-white mb-2"></div>
                  <p class="text-xs text-gray-400">#ffffff<br/>文字</p>
                </div>
              </div>
            </div>
            <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-4">核心设计原则</h3>
              <ul class="space-y-3 text-gray-300">
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">1.</span>
                  <span>深色背景 + 高对比度文字，确保可读性</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">2.</span>
                  <span>紫色渐变作为强调色，营造科技感</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">3.</span>
                  <span>毛玻璃效果和渐变边框增加层次感</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">4.</span>
                  <span>流畅的动画和过渡效果提升体验</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <!-- Step 4 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">4</span>
            开发流程
          </h2>
          <div class="space-y-6">
            <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-4">关键步骤</h3>
              <ol class="space-y-4 text-gray-300">
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">4.1</span>
                  <div>
                    <p class="font-medium">初始化项目</p>
                    <p class="text-gray-400 text-sm">npm create vite@latest my-portfolio -- --template vue</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">4.2</span>
                  <div>
                    <p class="font-medium">配置 Tailwind CSS v4</p>
                    <p class="text-gray-400 text-sm">使用 @import "tailwindcss" 新语法</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">4.3</span>
                  <div>
                    <p class="font-medium">创建核心组件</p>
                    <p class="text-gray-400 text-sm">导航栏、音乐播放器、背景弹幕等</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">4.4</span>
                  <div>
                    <p class="font-medium">实现页面路由</p>
                    <p class="text-gray-400 text-sm">Home / About / Projects / Blog</p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">4.5</span>
                  <div>
                    <p class="font-medium">优化手机端 UI</p>
                    <p class="text-gray-400 text-sm">汉堡菜单、响应式布局、触摸优化</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <!-- Step 5 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">5</span>
            部署上线
          </h2>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
            <h3 class="text-lg font-semibold text-white mb-4">GitHub Pages 部署</h3>
            <div class="space-y-4 text-gray-300">
              <p>1. 配置 vite.config.js 设置 base 路径</p>
              <div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto">
                <code class="text-green-400 text-sm">export default defineConfig({<br/>  base: '/myweb/',<br/>  // ...<br/>})</code>
              </div>
              <p>2. 创建 GitHub Actions 工作流</p>
              <div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto">
                <code class="text-green-400 text-sm">.github/workflows/deploy.yml</code>
              </div>
              <p>3. 推送到 GitHub 自动部署</p>
              <div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto">
                <code class="text-green-400 text-sm">git push origin main</code>
              </div>
              <p class="text-purple-400 mt-4">✨ 访问地址：https://superlizi114514.github.io/myweb/</p>
            </div>
          </div>
        </section>

        <!-- Conclusion -->
        <section class="mb-12">
          <div class="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/30">
            <h2 class="text-2xl font-bold text-white mb-4">🎉 项目总结</h2>
            <p class="text-gray-300 mb-4">
              通过 OpenClaw + 千问 3.5Plus 的辅助，从零开始完成了个人网站的搭建。
              整个开发过程高效流畅，AI 在代码生成、Bug 修复、设计建议等方面提供了巨大帮助。
            </p>
            <div class="grid md:grid-cols-2 gap-4 mt-6">
              <div class="bg-[#1a1a2e] rounded-xl p-4 border border-white/10">
                <p class="text-gray-400 text-sm mb-2">💡 关键收获</p>
                <p class="text-white">AI 辅助开发可以显著提升效率，但需要准确表达需求</p>
              </div>
              <div class="bg-[#1a1a2e] rounded-xl p-4 border border-white/10">
                <p class="text-gray-400 text-sm mb-2">⚠️ 注意事项</p>
                <p class="text-white">深色主题需要特别注意文字对比度，确保可读性</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Back button -->
        <div class="text-center mt-16 pb-12">
          <router-link to="/blog" class="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>返回博客列表</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WebsiteBuild'
}
</script>

<style scoped>
.build-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #2a2a3e 100%);
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.prose :deep(h3) {
  color: #ffffff;
  margin-top: 1.5em;
}

.prose :deep(code) {
  font-family: 'JetBrains Mono', monospace;
}

/* 手机端优化 */
@media (max-width: 768px) {
  .build-page > div {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>