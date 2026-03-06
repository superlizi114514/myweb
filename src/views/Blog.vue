<template>
  <div class="blog-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="grid-overlay"></div>
    </div>

    <div class="max-w-5xl mx-auto px-6 py-20 relative z-10">
      <!-- Header -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <span class="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
          <span class="text-sm text-gray-400">Latest Posts</span>
        </div>
        <h1 class="text-6xl md:text-7xl font-bold mb-6">
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">Blog</span>
        </h1>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto">思考、教程与洞见 — 记录技术与创意的交汇</p>
      </div>

      <!-- Featured Post (第一篇文章大图展示) -->
      <article v-if="posts.length" class="featured-post group cursor-pointer mb-16" @click="openPost(posts[0])">
        <div class="glass-card overflow-hidden">
          <div class="flex flex-col lg:flex-row">
            <div class="lg:w-1/2 relative overflow-hidden">
              <img :src="posts[0].image" :alt="posts[0].title" class="w-full h-64 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a1a2e]/90 lg:block hidden"></div>
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {{ posts[0].category }}
                </span>
              </div>
            </div>
            <div class="lg:w-1/2 p-8 flex flex-col justify-center">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-gray-400 text-sm">{{ posts[0].date }}</span>
                <span class="text-gray-600">•</span>
                <span class="text-gray-400 text-sm">5 min read</span>
              </div>
              <h2 class="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                {{ posts[0].title }}
              </h2>
              <p class="text-gray-400 mb-6 line-clamp-3">{{ posts[0].excerpt }}</p>
              <div class="flex items-center gap-2 text-purple-400 group-hover:gap-4 transition-all duration-300">
                <span class="font-medium">阅读全文</span>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- Posts Grid -->
      <div class="grid md:grid-cols-2 gap-6">
        <article v-for="(post, index) in posts.slice(1)" :key="post.id"
                 class="post-card group cursor-pointer"
                 :style="{ animationDelay: `${index * 0.1}s` }"
                 @click="openPost(post)">
          <div class="glass-card h-full overflow-hidden">
            <div class="relative overflow-hidden">
              <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] to-transparent opacity-60"></div>
              <div class="absolute top-3 left-3">
                <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-white/10 backdrop-blur-sm">
                  {{ post.category }}
                </span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-gray-500 text-xs">{{ post.date }}</span>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                {{ post.title }}
              </h3>
              <p class="text-gray-400 text-sm line-clamp-2 mb-4">{{ post.excerpt }}</p>
              <div class="flex items-center gap-2 text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>了解更多</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>

    <!-- Article Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="selectedPost" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="closePost">
          <div class="absolute inset-0 bg-black/80 backdrop-blur-xl"></div>
          <div class="modal-content relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-white/10 shadow-2xl">
            <!-- Modal Header Image -->
            <div class="relative h-56 overflow-hidden">
              <img :src="selectedPost.image" :alt="selectedPost.title" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#1a1a2e] via-[#1a1a2e]/50 to-transparent"></div>
              <button @click="closePost" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:rotate-90 duration-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
              <!-- Category Badge -->
              <div class="absolute bottom-4 left-6">
                <span class="px-4 py-1.5 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-sm">
                  {{ selectedPost.category }}
                </span>
              </div>
            </div>
            <!-- Modal Content -->
            <div class="p-8 overflow-y-auto max-h-[calc(90vh-14rem)]">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-gray-400 text-sm">{{ selectedPost.date }}</span>
                <span class="text-gray-600">•</span>
                <span class="text-gray-400 text-sm">5 min read</span>
              </div>
              <h2 class="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">{{ selectedPost.title }}</h2>
              <div class="article-content" v-html="selectedPost.content"></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      selectedPost: null,
      posts: [
        {
          id: 1,
          title: 'AI时代的软件创作：门槛降低了，但价值永存',
          excerpt: '每个人都有使用AI写软件的权利，但这不代表软件变得廉价。当作品足以打动人心，那才是最重要的。栗子工作室的态度：出售的不是软件，而是从想法到落地的完整旅程。',
          category: '思考随笔',
          date: 'Mar 6, 2026',
          image: '/images/ai-brain.jpg',
          content: `
            <p>站在2026年的今天，AI已经深深融入了软件开发的每一个环节。无论是代码生成、界面设计，还是架构规划，AI都在以前所未有的方式降低着创作的门槛。一个从未写过代码的人，只要能够清晰表达自己的想法，就能在AI的帮助下完成一个可用的软件原型。</p>

            <p>有人说，这会让软件变得廉价。当人人都能开发，程序员的价值何在？当AI能写出完美的代码，软件开发这个职业是否终将消失？</p>

            <p>我的答案是否定的。</p>

            <p>门槛的降低，从来都不意味着价值的贬损。就像相机的普及没有让摄影变得廉价——真正打动人心的照片，依然需要摄影师对光影的理解、对瞬间的捕捉、对情感的诠释。同理，AI让代码变得触手可及，但让作品真正"活"起来的，依然是创作者对用户需求的理解、对美的追求、对细节的执着。</p>

            <p>这也是栗子工作室的态度。</p>

            <p>我们不出售一个冷冰冰的软件或网站。我们出售的是一整个流程——从一个模糊的想法，到清晰的需求定义；从最初的概念设计，到精心打磨的交互细节；从功能实现，到部署上线，再到持续的迭代优化。在这个过程中，AI是我们的工具，但真正引导一切的，是我们对"打动人心"这个目标的坚持。</p>

            <p>当我为一个客户开发网站时，我不会问"你想要什么功能"。我会问"你希望访问者感受到什么"、"你想传达什么样的故事"。这些问题，AI暂时还无法真正理解。它可以帮助我实现想法，但想法本身，来自于对人的理解、对场景的洞察。</p>

            <p>门槛变低了，这很好。这意味着更多人有能力将自己的想法变为现实。但服务的标准，只会越来越高。因为在人人都能做的时代，做得足够好已经不够了——你必须做得足够独特、足够动人、足够让人记住。</p>

            <p>所以，未来的软件开发会是什么样？</p>

            <p>我认为，它更像是一场共创。AI负责执行层面的繁重工作，而人类专注于创意、情感、价值的传递。我们不再是"写代码的人"，我们是"用技术与AI，帮助人们实现想法的人"。</p>

            <p>每个人都有使用AI写软件的权利，这没错。但当你希望你的作品不仅仅是"能用"，而是"好用"、"好看"、"好感动"，那就是我们可以帮助你的地方。</p>

            <p>栗子工作室，出售的不是终点，而是一段从想法到落地的完整旅程。</p>

            <p class="signature">—— 栗子，2026年3月</p>
          `
        },
        ]
    }
  },
  methods: {
    openPost(post) {
      if (post.content) {
        this.selectedPost = post
        document.body.style.overflow = 'hidden'
      } else if (post.link) {
        this.$router.push(post.link)
      }
    },
    closePost() {
      this.selectedPost = null
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%);
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.bg-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -100px;
  right: -100px;
  animation: float 20s ease-in-out infinite;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  bottom: 20%;
  left: -50px;
  animation: float 15s ease-in-out infinite reverse;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}

/* 玻璃卡片 */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  transition: all 0.4s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 0 60px rgba(139, 92, 246, 0.1);
  transform: translateY(-4px);
}

/* 特色文章 */
.featured-post .glass-card:hover {
  transform: translateY(-8px);
}

/* 文章卡片动画 */
.post-card {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 行数限制 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Modal 动画 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.95) translateY(20px);
}

/* 文章内容样式 */
.article-content :deep(p) {
  color: #d1d5db;
  line-height: 1.9;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.article-content :deep(p:first-of-type) {
  font-size: 1.15rem;
  color: #e5e7eb;
}

.article-content :deep(.signature) {
  text-align: right;
  color: #9ca3af;
  font-style: italic;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>