<template>
  <div class="min-h-screen" :class="pageClass">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10">
      <div class="max-w-5xl mx-auto px-6">
        <div class="flex items-center justify-between h-14">
          <router-link to="/" class="text-white font-bold text-lg hover:text-purple-400 transition-colors">
            栗子<span class="text-purple-400">.dev</span>
          </router-link>
          
          <div class="hidden md:flex items-center space-x-6">
            <router-link to="/about" class="text-gray-400 text-sm hover:text-white transition-colors">
              About
            </router-link>
            <router-link to="/projects" class="text-gray-400 text-sm hover:text-white transition-colors">
              Projects
            </router-link>
            <router-link to="/blog" class="text-gray-400 text-sm hover:text-white transition-colors">
              Blog
            </router-link>
          </div>
          
          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div v-show="mobileMenuOpen" class="md:hidden py-4 border-t border-white/10">
          <div class="flex flex-col space-y-4">
            <router-link to="/about" @click="mobileMenuOpen = false" class="text-gray-400 hover:text-white transition-colors">
              About
            </router-link>
            <router-link to="/projects" @click="mobileMenuOpen = false" class="text-gray-400 hover:text-white transition-colors">
              Projects
            </router-link>
            <router-link to="/blog" @click="mobileMenuOpen = false" class="text-gray-400 hover:text-white transition-colors">
              Blog
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-14">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-[#0a0a0f] border-t border-white/10 py-8">
      <div class="max-w-5xl mx-auto px-6">
        <div class="flex items-center justify-between">
          <p class="text-gray-500 text-sm">
            © 2024 栗子。Powered by OpenClaw + Qwen3.5-Plus
          </p>
          <div class="flex items-center space-x-4">
            <a href="https://github.com/superlizi114514" target="_blank" class="text-gray-500 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-4.442 0-.981.351-1.782.922-2.405-.924-.115-1.897-.466-1.897-1.964 0-.435.155-.862.414-1.232.833-.252 2.737.31 2.737.31.798-.222 1.662-.335 2.531-.335.868 0 1.733.113 2.531.335 0 0 1.904-.562 2.737-.31.259.37.414.797.414 1.232 0 1.498-.974 1.849-1.897 1.964.571.623.922 1.424.922 2.405 0 3.113-2.802 4.136-5.467 4.442.344.299.655.829.762 1.604.685.307 2.422.837 3.492-.997.695-1.304 2.422-1.834 3.492-1.237 0 0 .791-.371 1.333 1.756 0 0-.695 2.142-4.033 1.416v2.234c0 .316.194.688.793.577C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.home-page {
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
}

.default-page {
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #2a2a3e 100%);
}

/* 手机端优化 */
@media (max-width: 768px) {
  :deep(.max-w-5xl) {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  :deep(nav .max-w-5xl) {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>

<script>
export default {
  name: 'AppLayout',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  computed: {
    pageClass() {
      // 根据当前路由返回不同的背景类
      const path = this.$route.path
      if (path === '/') return 'home-page'
      return 'default-page'
    }
  }
}
</script>
