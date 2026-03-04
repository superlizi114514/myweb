<template>
  <div class="shop-page ">
    <div class="max-w-6xl mx-auto px-6 py-24">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
          Services & Shop
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          提供网页开发、代码创作、AI 应用定制等服务
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <!-- Service 1: 网页创作 -->
        <div class="service-card group transparent rounded-2xl p-8 border border-white/10 hover:border-purple-400 hover:shadow-xl transition-all duration-300">
          <div class="card-icon mb-6">
            <div class="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">网页创作</h3>
          <p class="text-gray-300 mb-6">
            定制化网站开发，包含响应式设计、现代化 UI/UX、性能优化
          </p>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3 text-gray-200">
              <span class="w-2 h-2 bg-purple-600 rounded-full"></span>
              <span>企业官网 / 个人作品集</span>
            </li>
            <li class="flex items-center gap-3 text-gray-200">
              <span class="w-2 h-2 bg-purple-600 rounded-full"></span>
              <span>电商页面 / 落地页</span>
            </li>
            <li class="flex items-center gap-3 text-gray-200">
              <span class="w-2 h-2 bg-purple-600 rounded-full"></span>
              <span>后台管理系统</span>
            </li>
          </ul>
          <div class="relative"><button @click="showBuyOptions = !showBuyOptions" class="block w-full py-3 px-6 bg-purple-600 text-white text-center font-semibold rounded-xl hover:bg-purple-700 transition-colors">购买 ▼</button><div v-if="showBuyOptions" class="absolute z-10 w-full mt-2 bg-gray-800 rounded-xl shadow-xl overflow-hidden"><a href="tencent://message/?uin=3471023785" class="block px-6 py-3 text-white hover:bg-gray-700 transition-colors">QQ 联系</a><a href="https://m.tb.cn/h.iXXX6S4" target="_blank" class="block px-6 py-3 text-white hover:bg-gray-700 transition-colors border-t border-gray-700">闲鱼主页</a></div></div>
            购买 
          </a>
        </div>

        <!-- Service 2: 代码创作 -->
        <div class="service-card group featured transparent rounded-2xl p-8 border-2 border-purple-500 hover:shadow-2xl transition-all duration-300 relative">
          <div class="absolute top-4 right-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            热门推荐
          </div>
          <div class="card-icon mb-6">
            <div class="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4M7 12l4 4 4-4m-4-4a4 4 0 100-8 4 4 0 000 8z"/>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">代码创作</h3>
          <p class="text-gray-300 mb-6">
            高质量代码编写与优化，支持多种编程语言和框架
          </p>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3 text-gray-200">
              <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>前端/后端开发</span>
            </li>
            <li class="flex items-center gap-3 text-gray-200">
              <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>API 集成与开发</span>
            </li>
            <li class="flex items-center gap-3 text-gray-200">
              <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
              <span>代码优化与重构</span>
            </li>
          </ul>
          <div class="relative"><button @click="showBuyOptions2 = !showBuyOptions2" class="block w-full py-3 px-6 bg-blue-600 text-white text-center font-semibold rounded-xl hover:bg-blue-700 transition-colors">购买 ▼</button><div v-if="showBuyOptions2" class="absolute z-10 w-full mt-2 bg-gray-800 rounded-xl shadow-xl overflow-hidden"><a href="tencent://message/?uin=3471023785" class="block px-6 py-3 text-white hover:bg-gray-700 transition-colors">QQ 联系</a><a href="https://m.tb.cn/h.iXXX6S4" target="_blank" class="block px-6 py-3 text-white hover:bg-gray-700 transition-colors border-t border-gray-700">闲鱼主页</a></div></div>
            购买 
          </a>
        </div>

        <!-- Service 3: AI 思路分享 -->
        <div class="service-card group transparent rounded-2xl p-8 border border-white/10 hover:border-green-400 hover:shadow-xl transition-all duration-300">
          <div class="card-icon mb-6">
            <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">AI 思路分享</h3>
          <p class="text-gray-300 mb-6">
            AI 应用开发经验分享，包含提示词工程、自动化流程设计
          </p>
          <ul class="space-y-3 mb-8">
            <li class="flex items-center gap-3 text-gray-200">
              <span class="w-2 h-2 bg-green-600 rounded-full"></span>
              <span>提示词模板分享</span>
            </li>
            <li class="flex items-center gap-3 text-gray-200">
              <span class="w-2 h-2 bg-green-600 rounded-full"></span>
              <span>自动化工作流设计</span>
            </li>
            <li class="flex items-center gap-3 text-gray-200">
              <span class="w-2 h-2 bg-green-600 rounded-full"></span>
              <span>1 对 1 咨询服务</span>
            </li>
          </ul>
          <div class="space-y-3">
            <div class="relative"><button @click="showBuyOptions3 = !showBuyOptions3" class="block w-full py-3 px-6 bg-green-600 text-white text-center font-semibold rounded-xl hover:bg-green-700 transition-colors">购买 ▼</button><div v-if="showBuyOptions3" class="absolute z-10 w-full mt-2 bg-gray-800 rounded-xl shadow-xl overflow-hidden"><a href="tencent://message/?uin=3471023785" class="block px-6 py-3 text-white hover:bg-gray-700 transition-colors">QQ 联系</a><a href="https://m.tb.cn/h.iXXX6S4" target="_blank" class="block px-6 py-3 text-white hover:bg-gray-700 transition-colors border-t border-gray-700">闲鱼主页</a></div></div>
              购买 
            </a>
            <p class="text-center text-gray-500 text-sm">或添加微信咨询</p>
          </div>
        </div>
      </div>

      <!-- Contact Section -->
      <div class="text-center py-16 bg-white/5 rounded-2xl">
        <h2 class="text-3xl font-bold text-white mb-4">需要定制服务？</h2>
        <p class="text-gray-300 mb-8">告诉我你的需求，我会为你提供详细的方案和报价</p>
        <a href="https://m.tb.cn/h.iXXX6S4" target="_blank" class="inline-flex items-center gap-2 py-3 px-8 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.774 9.214c-.13.65-.506.813-1.037.52l-2.875-2.116-1.388 1.335c-.153.153-.283.283-.58.283l.207-2.932 5.33-4.813c.23-.204-.052-.318-.356-.108l-6.601 4.156-2.846-.89c-.62-.195-.633-.623.13-.925l11.11-4.275c.515-.195.964.12.816.852z"/></svg>
          联系购买
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBuyOptions: false,
      showBuyOptions2: false,
      showBuyOptions3: false
    }
  },

  name: 'Shop'
}
</script>

<style scoped>
.shop-page {
  background: transparent;
}

.service-card:hover {
  transform: translateY(-4px);
}

.service-card.featured {
  transform: scale(1.02);
}

.service-card.featured:hover {
  transform: translateY(-4px) scale(1.02);
}
</style>
