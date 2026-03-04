<template>
  <div class="contact-page">
    <div class="max-w-4xl mx-auto px-6 py-24">
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-6">Get in Touch</h1>
        <p class="text-xl text-gray-400">Let's build something amazing together</p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <div>
          <h2 class="text-2xl font-bold text-white mb-6">Contact Information</h2>
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 rounded-full bg-[#2a2a3e] flex items-center justify-center flex-shrink-0 border border-white/10">
                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-300">Email</p>
                <a href="mailto:3471023785@qq.com" class="text-purple-400 hover:text-purple-300">3471023785@qq.com</a>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 rounded-full bg-[#2a2a3e] flex items-center justify-center flex-shrink-0 border border-white/10">
                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-300">Location</p>
                <p class="text-gray-400">中国山东</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-bold text-white mb-6">Send a Message</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input v-model="form.name" type="text" class="w-full px-4 py-3 rounded-xl border border-white/20 bg-[#2a2a3e] text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all" placeholder="Your name" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input v-model="form.email" type="email" class="w-full px-4 py-3 rounded-xl border border-white/20 bg-[#2a2a3e] text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all" placeholder="your@email.com" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea v-model="form.message" rows="5" class="w-full px-4 py-3 rounded-xl border border-white/20 bg-[#2a2a3e] text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none" placeholder="Your message..." required></textarea>
            </div>
            <button type="submit" class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-[1.02]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      console.log('Form submitted:', this.form)
      alert('Thanks for your message! I\'ll get back to you soon.')
      this.form = { name: '', email: '', message: '' }
    }
  }
}
</script>

<style scoped>
.contact-page {
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

@media (max-width: 768px) {
  .contact-page > div {
    padding-left: 20px;
    padding-right: 20px;
  }
  
  .grid.md\:grid-cols-2 {
    grid-template-columns: 1fr;
    gap: 8rem;
  }
}
</style>
