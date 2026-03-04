<template>
  <div class="shop-page">
    <div class="max-w-6xl mx-auto px-6 py-24">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">
          Services & Shop
        </h1>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">
          提供网页开发、代码创作、AI 应用定制等服务
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-3 gap-8 mb-16">
        <!-- Service 1 -->
        <div class="service-card group">
          <div class="card-icon">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">网页创作</h3>
          <p class="text-gray-400 mb-6">
            定制化网站开发，包含响应式设计、现代化 UI/UX、性能优化。擅长 Vue.js、React、Tailwind CSS 等技术栈。
          </p>
          <ul class="space-y-2 mb-6">
            <li class="flex items-center gap-2 text-gray-300 text-sm">
              <span class="text-purple-400">✓</span>
              <span>企业官网 / 个人作品集</span>
            </li>
            <li class="flex items-center gap-2 text-gray-300 text-sm">
              <span class="text-purple-400">✓</span>
              <span>电商页面 / 落地页</span>
            </li>
            <li class="flex items-center gap-2 text-gray-300 text-sm">
              <span class="text-purple-400">✓</span>
              <span>后台管理系统</span>
            </li>
          </ul>
          <a href="https://m.tb.cn/h.iXXX6S4?tk=78fdUHnev25" target="_blank" class="btn-primary">
            立即购买
          </a>
        </div>

        <!-- Service 2 -->
        <div class="service-card group featured">
          <div class="featured-badge">热门推荐</div>
          <div class="card-icon">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4M7 12l4 4 4-4m-4-4a4 4 0 100-8 4 4 0 000 8z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">代码创作</h3>
          <p class="text-gray-400 mb-6">
            高质量代码编写与优化，包含功能开发、Bug 修复、性能优化、代码审查。支持多种编程语言和框架。
          </p>
          <ul class="space-y-2 mb-6">
            <li class="flex items-center gap-2 text-gray-300 text-sm">
              <span class="text-purple-400">✓</span>
              <span>前端/后端开发</span>
            </li>
            <li class="flex items-center gap-2 text-gray-300 text-sm">
              <span class="text-purple-400">✓</span>
              <span>API 集成与开发</span>
            </li>
            <li class="flex items-center gap-2 text-gray-300 text-sm">
              <span class="text-purple-400">✓</span>
              <span>代码优化与重构</span>
            </li>
          </ul>
          <a href="https://m.tb.cn/h.iXXX6S4?tk=78fdUHnev25" target="_blank" class="btn-primary">
            立即购买
          </a>
        </div>

        <!-- Service 3 -->
        <div class="service-card group">
          <div class="card-icon">
            <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-white mb-3">AI 思路分享</h3>
          <p class="text-gray-400 mb-6">
            AI 应用开发咨询、技术方案设计、OpenClaw 部署指导。分享 AI Agent 开发经验和最佳实践。
          </p>
          <ul class="space-y-2 mb-6">
            <li class="flex items-center gap-2 text-gray-300 text-sm">
              <span class="text-purple-400">✓</span>
              <span>AI 应用定制咨询</span>
            </li>
            <li class="flex items-center gap-2 text-gray-300 text-sm">
              <span class="text-purple-400">✓</span>
              <span>OpenClaw 部署指导</span>
            </li>
            <li class="flex items-center gap-2 text-gray-300 text-sm">
              <span class="text-purple-400">✓</span>
              <span>技术方案设计</span>
            </li>
          </ul>
          <a href="#" class="btn-secondary" @click.prevent="showWeChat = true">
            微信咨询
          </a>
        </div>
      </div>

      <!-- WeChat Modal -->
      <div v-if="showWeChat" class="modal-overlay" @click="showWeChat = false">
        <div class="modal-content" @click.stop>
          <button @click="showWeChat = false" class="modal-close">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <h3 class="text-2xl font-bold text-white mb-6">微信联系</h3>
          <div class="wechat-qr">
            <div class="qr-placeholder">
              <svg class="w-32 h-32 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/>
              </svg>
              <p class="text-gray-500 text-sm mt-4">请添加微信</p>
              <p class="text-purple-400 text-lg font-mono mt-2">3471023785</p>
            </div>
          </div>
          <p class="text-gray-400 text-sm mt-6 text-center">
            扫描二维码或搜索微信号添加
          </p>
        </div>
      </div>

      <!-- Contact Info -->
      <div class="text-center mt-16 pt-16 border-t border-white/10">
        <h3 class="text-2xl font-bold text-white mb-6">其他联系方式</h3>
        <div class="flex flex-wrap justify-center gap-6">
          <a href="https://v.douyin.com/di64-2AO-WM/" target="_blank" class="contact-link">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            <span>抖音主页</span>
          </a>
          <a href="https://m.tb.cn/h.iXXX6S4?tk=78fdUHnev25" target="_blank" class="contact-link">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <span>闲鱼店铺</span>
          </a>
          <a href="mailto:3471023785@qq.com" class="contact-link">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span>3471023785@qq.com</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shop',
  data() {
    return {
      showWeChat: false
    }
  }
}
</script>

<style scoped>
.shop-page {
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

.service-card {
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.8) 0%, rgba(42, 42, 62, 0.8) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
}

.service-card:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
}

.service-card.featured {
  border-color: rgba(139, 92, 246, 0.5);
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: linear-gradient(135deg, #8b5cf6 0%, #764ba2 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
}

.service-card:hover .card-icon {
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
  transform: scale(1.1);
}

.card-icon svg {
  color: #a78bfa;
  transition: all 0.3s ease;
}

.service-card:hover .card-icon svg {
  color: #c4b5fd;
}

.btn-primary {
  display: inline-block;
  width: 100%;
  text-align: center;
  background: linear-gradient(135deg, #8b5cf6 0%, #764ba2 100%);
  color: white;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(139, 92, 246, 0.3);
}

.btn-secondary {
  display: inline-block;
  width: 100%;
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: modalIn 0.3s ease;
}

@keyframes modalIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content {
  background: linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 3rem;
  max-width: 400px;
  width: 90%;
  position: relative;
  animation: modalSlide 0.3s ease;
}

@keyframes modalSlide {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-close svg {
  color: #9ca3af;
}

.wechat-qr {
  display: flex;
  justify-content: center;
}

.qr-placeholder {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 2px dashed rgba(139, 92, 246, 0.3);
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #9ca3af;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: white;
  border-color: rgba(139, 92, 246, 0.5);
  background: rgba(139, 92, 246, 0.1);
  transform: translateY(-2px);
}

.contact-link svg {
  transition: all 0.3s ease;
}

.contact-link:hover svg {
  color: #a78bfa;
  transform: scale(1.1);
}

/* 手机端优化 */
@media (max-width: 768px) {
  .shop-page > div {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .grid.md\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
  
  .service-card {
    padding: 2rem;
  }
  
  .modal-content {
    padding: 2rem;
  }
}
</style>