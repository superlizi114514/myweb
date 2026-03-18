<template>
  <div class="shanxin-page">
    <div class="max-w-6xl mx-auto px-6 py-24">
      <!-- Back Button -->
      <button @click="$router.back()" class="mb-8 inline-flex items-center text-gray-400 hover:text-white transition-colors">
        ← 返回
      </button>

      <!-- Header -->
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-3 mb-6">
          <span class="text-5xl">🎯</span>
          <h1 class="text-5xl font-bold text-white">山信黑红榜</h1>
          <span class="text-5xl">🏆</span>
        </div>
        <p class="text-xl text-gray-400 mb-4">山东信息职业技术学院红黑榜平台</p>
        <div class="flex justify-center gap-4 flex-wrap">
          <a href="https://sxhh.online" target="_blank" class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity">
            🚀 立即访问
          </a>
          <a href="https://github.com/superlizi114514/shanxin-heihongbang" target="_blank" class="inline-flex items-center gap-2 bg-[#2a2a3e] text-white px-6 py-3 rounded-full font-medium border border-white/10 hover:border-purple-500/50 transition-colors">
            ⭐ GitHub
          </a>
        </div>
      </div>

      <!-- Project Info Cards -->
      <div class="grid md:grid-cols-3 gap-6 mb-16">
        <div class="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl p-6 border border-purple-500/20">
          <div class="text-3xl mb-3">📱</div>
          <h3 class="text-white font-bold mb-2">技术栈</h3>
          <p class="text-gray-400 text-sm">Vue3 + Vite + Node.js + TypeScript + Cloudflare D1</p>
        </div>
        <div class="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl p-6 border border-purple-500/20">
          <div class="text-3xl mb-3">🚀</div>
          <h3 class="text-white font-bold mb-2">部署平台</h3>
          <p class="text-gray-400 text-sm">Vercel 全球边缘网络 + Cloudflare Pages</p>
        </div>
        <div class="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl p-6 border border-purple-500/20">
          <div class="text-3xl mb-3">💾</div>
          <h3 class="text-white font-bold mb-2">数据库</h3>
          <p class="text-gray-400 text-sm">Cloudflare D1 (SQLite) + Vercel Blob 图片存储</p>
        </div>
      </div>

      <!-- Features -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-white mb-8 text-center">核心功能</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="text-2xl mb-3">👤</div>
            <h3 class="text-white font-bold mb-2">人员点评</h3>
            <p class="text-gray-400 text-sm">支持学生/老师身份选择，红榜黑榜分类点评，可上传图片</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="text-2xl mb-3">🏪</div>
            <h3 class="text-white font-bold mb-2">商家点评</h3>
            <p class="text-gray-400 text-sm">学校周边商家评价系统，帮助同学避坑选好店</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="text-2xl mb-3">👍</div>
            <h3 class="text-white font-bold mb-2">点赞互动</h3>
            <p class="text-gray-400 text-sm">点评点赞功能，1 赞=1 小票，防重复点赞设计</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="text-2xl mb-3">📊</div>
            <h3 class="text-white font-bold mb-2">排行榜</h3>
            <p class="text-gray-400 text-sm">人员/商家热度榜单，按点评数和点赞数排序</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="text-2xl mb-3">💰</div>
            <h3 class="text-white font-bold mb-2">赞助系统</h3>
            <p class="text-gray-400 text-sm">VIP/SVIP/MVIP 会员赞助，支持自定义赞助展示</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="text-2xl mb-3">🎁</div>
            <h3 class="text-white font-bold mb-2">兑换码</h3>
            <p class="text-gray-400 text-sm">兑换码奖励系统，支持 VIP 天数、点评次数等奖励</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="text-2xl mb-3">📸</div>
            <h3 class="text-white font-bold mb-2">图片上传</h3>
            <p class="text-gray-400 text-sm">点评支持配图，Vercel Blob 存储，支持放大预览</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="text-2xl mb-3">🔍</div>
            <h3 class="text-white font-bold mb-2">搜索功能</h3>
            <p class="text-gray-400 text-sm">支持按关键词、类型搜索人员和商家</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="text-2xl mb-3">🛡️</div>
            <h3 class="text-white font-bold mb-2">举报管理</h3>
            <p class="text-gray-400 text-sm">用户举报 + 管理员审核机制，维护社区环境</p>
          </div>
        </div>
      </div>

      <!-- Update Timeline -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-white mb-8 text-center">更新日志</h2>
        <div class="space-y-4">
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="flex items-center gap-4 mb-3">
              <span class="text-purple-400 font-bold">2026-03-14</span>
              <span class="text-xs text-gray-500">最新版本</span>
            </div>
            <ul class="text-gray-400 text-sm space-y-1">
              <li>✨ 新增兑换码功能：VIP 天数、SVIP 天数、MVIP 天数、重置点评次数、自定义称号</li>
              <li>✨ 管理后台兑换码管理：批量生成、使用限制、有效期设置</li>
              <li>✨ 图片上传功能：点评支持配图，Vercel Blob 存储</li>
            </ul>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="flex items-center gap-4 mb-3">
              <span class="text-purple-400 font-bold">2026-03-13</span>
            </div>
            <ul class="text-gray-400 text-sm space-y-1">
              <li>✨ 人员点评点赞功能：防重复点赞，1 赞=1 小票</li>
              <li>✨ 人员身份选项：学生/老师分类</li>
              <li>🐛 修复票数扣减时区 BUG</li>
            </ul>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <div class="flex items-center gap-4 mb-3">
              <span class="text-purple-400 font-bold">2026-03-12</span>
            </div>
            <ul class="text-gray-400 text-sm space-y-1">
              <li>🐛 修复 D1 SQLite 兼容性问题</li>
              <li>🐛 修复赞助管理加载失败</li>
              <li>✨ 添加页面加载状态提示</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Gallery -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-white mb-8 text-center">项目截图</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl overflow-hidden border border-purple-500/20">
            <div class="aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
              <span class="text-gray-500">首页界面</span>
            </div>
          </div>
          <div class="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl overflow-hidden border border-purple-500/20">
            <div class="aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
              <span class="text-gray-500">人员点评页</span>
            </div>
          </div>
          <div class="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl overflow-hidden border border-purple-500/20">
            <div class="aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
              <span class="text-gray-500">排行榜页面</span>
            </div>
          </div>
          <div class="bg-gradient-to-br from-[#1a1a2e] to-[#2a2a3e] rounded-2xl overflow-hidden border border-purple-500/20">
            <div class="aspect-video bg-gradient-to-br from-purple-900/20 to-blue-900/20 flex items-center justify-center">
              <span class="text-gray-500">管理后台</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tech Highlights -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-white mb-8 text-center">技术亮点</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <h3 class="text-white font-bold mb-3">🚀 Cloudflare D1 数据库</h3>
            <p class="text-gray-400 text-sm">使用 Cloudflare D1 边缘数据库，解决 SQLite 兼容性问题，支持 RETURNING 语法适配，时区处理优化（UTC+8）</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <h3 class="text-white font-bold mb-3">☁️ Vercel 全球部署</h3>
            <p class="text-gray-400 text-sm">前后端分离部署，使用 Vercel Token 自动化部署，边缘网络加速全球访问</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <h3 class="text-white font-bold mb-3">📦 Vercel Blob 图片存储</h3>
            <p class="text-gray-400 text-sm">人员点评支持上传图片，最大 5MB，支持 JPG/PNG/GIF/WEBP 格式，公共访问配置</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-purple-500/10">
            <h3 class="text-white font-bold mb-3">🔐 邮箱验证码登录</h3>
            <p class="text-gray-400 text-sm">图形验证码 + 邮箱验证码双重验证，支持手机号可选绑定，邀请码系统</p>
          </div>
        </div>
      </div>

      <!-- Footer CTA -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-white mb-4">感兴趣吗？</h2>
        <div class="flex justify-center gap-4 flex-wrap">
          <a href="https://sxhh.online" target="_blank" class="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-opacity">
            🌐 访问线上版本
          </a>
          <a href="https://github.com/superlizi114514/shanxin-heihongbang" target="_blank" class="inline-flex items-center gap-2 bg-[#2a2a3e] text-white px-8 py-4 rounded-full font-medium border border-white/10 hover:border-purple-500/50 transition-colors">
            📄 查看源代码
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShanxinHeihongbang'
}
</script>

<style scoped>
.shanxin-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 100%);
}
</style>
