<template>
  <div class="contact-page">
    <div class="max-w-2xl mx-auto px-6 py-24">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-white mb-4">联系方式</h1>
        <p class="text-xl text-gray-300">有任何需求都可以联系我</p>
      </div>

      <!-- QQ Card -->
      <div class="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.774 9.214c-.13.65-.506.813-1.037.52l-2.875-2.116-1.388 1.335c-.153.153-.283.283-.58.283l.207-2.932 5.33-4.813c.23-.204-.052-.318-.356-.108l-6.601 4.156-2.846-.89c-.62-.195-.633-.623.13-.925l11.11-4.275c.515-.195.964.12.816.852z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">QQ 联系</h2>
            <p class="text-gray-300">点击复制 QQ 号</p>
          </div>
        </div>

        <!-- QQ Number -->
        <div class="bg-white/5 rounded-xl p-6 mb-6">
          <div class="flex items-center justify-between gap-4">
            <div class="text-3xl font-bold text-blue-400 font-mono">3471023785</div>
            <button @click="copyQQ" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {{ copied ? '已复制 ✓' : '复制' }}
            </button>
          </div>
        </div>

        <!-- Instructions -->
        <div class="bg-blue-500/10 rounded-xl p-6 border border-blue-500/30">
          <h3 class="text-lg font-bold text-blue-400 mb-3">💡 添加说明</h3>
          <ol class="space-y-2 text-gray-300">
            <li class="flex items-start gap-2">
              <span class="text-blue-400 font-bold">1.</span>
              <span>点击上方"复制"按钮复制 QQ 号</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-400 font-bold">2.</span>
              <span>打开 QQ，搜索并添加好友</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-400 font-bold">3.</span>
              <span class="text-yellow-400">⚠️ 重要：添加时请备注您的需求（如：网页开发/代码定制/AI 咨询等）</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-400 font-bold">4.</span>
              <span>我会尽快通过并为您详细说明</span>
            </li>
          </ol>
        </div>
      </div>

      <!-- Future: WeChat -->
      <div class="bg-white/5 rounded-xl p-6 border border-white/10 opacity-60">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .406.33.733.733.733a.816.816 0 0 0 .378-.095l2.597-1.5a.86.86 0 0 1 .695-.095 10.157 10.157 0 0 0 2.511.314c.244 0 .484-.018.724-.035-.733-2.196.144-4.153 1.518-5.355 1.142-1.002 2.855-1.435 4.534-1.435h.012c-.48-2.855-3.475-5.122-7.188-5.122zm-2.54 3.845c.84 0 1.523.684 1.523 1.523 0 .84-.684 1.524-1.523 1.524-.84 0-1.524-.683-1.524-1.523 0-.84.683-1.524 1.524-1.524zm5.575 0c.84 0 1.523.684 1.523 1.523 0 .84-.683 1.524-1.523 1.524-.84 0-1.523-.683-1.523-1.523 0-.84.683-1.524 1.523-1.524zm6.982-.906c-3.801 0-6.885 2.614-6.885 5.838 0 1.763.926 3.35 2.403 4.47a.466.466 0 0 1 .17.528l-.31 1.173c-.015.056-.038.112-.038.169 0 .322.262.582.583.582a.65.65 0 0 0 .3-.075l2.064-1.19a.682.682 0 0 1 .552-.075 8.063 8.063 0 0 0 1.994.249c.194 0 .384-.014.575-.028-.582-1.743.114-3.297 1.205-4.252.907-.795 2.267-1.139 3.601-1.139h.01c-.382-2.266-2.761-4.063-5.709-4.063zm-2.016 3.05c.667 0 1.209.542 1.209 1.209s-.542 1.209-1.209 1.209-1.209-.542-1.209-1.209.542-1.209 1.209-1.209zm4.425 0c.667 0 1.209.542 1.209 1.209s-.542 1.209-1.209 1.209-1.209-.542-1.209-1.209.542-1.209 1.209-1.209z"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-400">微信联系（即将上线）</h2>
            <p class="text-gray-500">后续将添加微信联系方式</p>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="text-center mt-8">
        <router-link to="/shop" class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          返回 Shop
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactInfo',
  data() {
    return {
      copied: false,
      qqNumber: '3471023785'
    }
  },
  methods: {
    copyQQ() {
      navigator.clipboard.writeText(this.qqNumber).then(() => {
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, 2000)
      })
    }
  }
}
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
  background: transparent;
}
</style>
