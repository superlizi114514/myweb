<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-apple-gray-100">
      <div class="max-w-5xl mx-auto px-6">
        <div class="flex items-center justify-between h-12">
          <router-link to="/" class="text-apple-gray-900 font-semibold text-sm hover:text-apple-gray-600 transition-colors">
            My Portfolio
          </router-link>
          
          <div class="flex items-center space-x-6">
            <router-link to="/about" class="text-apple-gray-500 text-xs hover:text-apple-gray-900 transition-colors">
              About
            </router-link>
            <router-link to="/projects" class="text-apple-gray-500 text-xs hover:text-apple-gray-900 transition-colors">
              Projects
            </router-link>
            <router-link to="/blog" class="text-apple-gray-500 text-xs hover:text-apple-gray-900 transition-colors">
              Blog
            </router-link>
            <router-link to="/contact" class="text-apple-gray-500 text-xs hover:text-apple-gray-900 transition-colors">
              Contact
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-12">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-apple-gray-50 border-t border-apple-gray-100 py-8">
      <div class="max-w-5xl mx-auto px-6">
        <div class="flex items-center justify-between">
          <p class="text-apple-gray-400 text-xs">
            © 2024 My Portfolio. Designed with Apple aesthetics.
          </p>
          <div class="flex items-center space-x-4">
            <a href="#" class="text-apple-gray-400 hover:text-apple-gray-600 transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-4.442 0-.981.351-1.782.922-2.405-.924-.115-1.897-.466-1.897-1.964 0-.435.155-.862.414-1.232.833-.252 2.737.31 2.737.31.798-.222 1.662-.335 2.531-.335.868 0 1.733.113 2.531.335 0 0 1.904-.562 2.737-.31.259.37.414.797.414 1.232 0 1.498-.974 1.849-1.897 1.964.571.623.922 1.424.922 2.405 0 3.113-2.802 4.136-5.467 4.442.344.299.655.829.762 1.604.685.307 2.422.837 3.492-.997.695-1.304 2.422-1.834 3.492-1.237 0 0 .791-.371 1.333 1.756 0 0-.695 2.142-4.033 1.416v2.234c0 .316.194.688.793.577C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="#" class="text-apple-gray-400 hover:text-apple-gray-600 transition-colors">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.92 4.92 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
