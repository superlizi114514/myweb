<template>
  <AppLayout>
    <div class="max-w-4xl mx-auto px-6 py-24">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-apple-gray-900 mb-6">Get in Touch</h1>
        <p class="text-xl text-apple-gray-500">Let's build something amazing together</p>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <!-- Contact Info -->
        <div>
          <h2 class="text-2xl font-bold text-apple-gray-900 mb-6">Contact Information</h2>
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 rounded-full bg-apple-gray-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-apple-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-apple-gray-900">Email</p>
                <a href="mailto:3471023785@qq.com" class="text-apple-gray-500 hover:text-apple-gray-700">3471023785@qq.com</a>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="w-10 h-10 rounded-full bg-apple-gray-100 flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-apple-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <div>
                <p class="text-sm font-medium text-apple-gray-900">Location</p>
                <p class="text-apple-gray-500">中国山东</p>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="mt-12">
            <h3 class="text-lg font-semibold text-apple-gray-900 mb-4">Follow Me</h3>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 rounded-full bg-apple-gray-100 flex items-center justify-center hover:bg-apple-gray-200 transition-colors">
                <svg class="w-5 h-5 text-apple-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-4.442 0-.981.351-1.782.922-2.405-.924-.115-1.897-.466-1.897-1.964 0-.435.155-.862.414-1.232.833-.252 2.737.31 2.737.31.798-.222 1.662-.335 2.531-.335.868 0 1.733.113 2.531.335 0 0 1.904-.562 2.737-.31.259.37.414.797.414 1.232 0 1.498-.974 1.849-1.897 1.964.571.623.922 1.424.922 2.405 0 3.113-2.802 4.136-5.467 4.442.344.299.655.829.762 1.604.685.307 2.422.837 3.492-.997.695-1.304 2.422-1.834 3.492-1.237 0 0 .791-.371 1.333 1.756 0 0-.695 2.142-4.033 1.416v2.234c0 .316.194.688.793.577C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-apple-gray-100 flex items-center justify-center hover:bg-apple-gray-200 transition-colors">
                <svg class="w-5 h-5 text-apple-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.92 4.92 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-apple-gray-100 flex items-center justify-center hover:bg-apple-gray-200 transition-colors">
                <svg class="w-5 h-5 text-apple-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div>
          <h2 class="text-2xl font-bold text-apple-gray-900 mb-6">Send a Message</h2>
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-apple-gray-700 mb-2">Name</label>
              <input v-model="form.name" type="text" class="w-full px-4 py-3 rounded-xl border border-apple-gray-200 focus:border-apple-gray-400 focus:ring-2 focus:ring-apple-gray-100 outline-none transition-all" placeholder="Your name" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-apple-gray-700 mb-2">Email</label>
              <input v-model="form.email" type="email" class="w-full px-4 py-3 rounded-xl border border-apple-gray-200 focus:border-apple-gray-400 focus:ring-2 focus:ring-apple-gray-100 outline-none transition-all" placeholder="your@email.com" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-apple-gray-700 mb-2">Message</label>
              <textarea v-model="form.message" rows="5" class="w-full px-4 py-3 rounded-xl border border-apple-gray-200 focus:border-apple-gray-400 focus:ring-2 focus:ring-apple-gray-100 outline-none transition-all resize-none" placeholder="Your message..." required></textarea>
            </div>
            <button type="submit" class="w-full bg-apple-gray-900 text-white py-3 rounded-xl font-medium hover:bg-apple-gray-800 transition-all hover:scale-[1.02]">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '../components/AppLayout.vue'

export default {
  name: 'Contact',
  components: { AppLayout },
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
