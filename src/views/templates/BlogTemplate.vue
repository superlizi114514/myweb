<template>
  <div class="blog-template">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <span class="logo-icon">📝</span>
          <span class="logo-text">掘金博客</span>
        </div>
        <div class="nav-links">
          <a v-for="(link, i) in navLinks" :key="i" :class="{ active: i === 0 }">{{ link }}</a>
        </div>
        <div class="nav-right">
          <div class="search-box">
            <input type="text" placeholder="搜索文章..." v-model="searchText" />
            <button class="search-btn">🔍</button>
          </div>
          <button class="write-btn">✏️ 写文章</button>
        </div>
      </div>
    </nav>

    <!-- 主视觉区 -->
    <section class="hero">
      <div class="hero-bg">
        <div class="floating-shape shape1"></div>
        <div class="floating-shape shape2"></div>
      </div>
      <div class="hero-content">
        <h1 class="animate-slide-up">技术博客</h1>
        <p class="animate-fade-in">分享前端开发、产品设计、技术思考</p>
        <div class="hero-tags animate-scale-in">
          <span v-for="(tag, i) in heroTags" :key="i" @click="filterByTag(tag)">{{ tag }}</span>
        </div>
      </div>
    </section>

    <!-- 主要内容区 -->
    <main class="main-content">
      <!-- 左侧文章列表 -->
      <div class="articles-section">
        <div class="section-header">
          <div class="filter-tabs">
            <button v-for="(tab, i) in filterTabs" :key="i"
                    :class="{ active: activeFilter === i }"
                    @click="activeFilter = i">
              {{ tab }}
            </button>
          </div>
          <select class="sort-select">
            <option>最新发布</option>
            <option>最多阅读</option>
            <option>最多点赞</option>
          </select>
        </div>

        <!-- 置顶文章 -->
        <article class="article-card featured" v-if="featuredArticle">
          <div class="article-cover" :style="{ background: featuredArticle.bg }">
            <span class="featured-badge">置顶</span>
          </div>
          <div class="article-body">
            <div class="article-meta">
              <span class="category">{{ featuredArticle.category }}</span>
              <span class="date">{{ featuredArticle.date }}</span>
            </div>
            <h2>{{ featuredArticle.title }}</h2>
            <p>{{ featuredArticle.excerpt }}</p>
            <div class="article-footer">
              <div class="author">
                <span class="avatar">{{ featuredArticle.author.avatar }}</span>
                <span class="name">{{ featuredArticle.author.name }}</span>
              </div>
              <div class="stats">
                <span>👁 {{ featuredArticle.views }}</span>
                <span>❤️ {{ featuredArticle.likes }}</span>
                <span>💬 {{ featuredArticle.comments }}</span>
              </div>
            </div>
          </div>
        </article>

        <!-- 文章列表 -->
        <article v-for="(post, i) in articles" :key="i" class="article-card" :style="{ animationDelay: i * 0.05 + 's' }">
          <div class="article-main">
            <div class="article-meta">
              <span class="category" :style="{ background: post.categoryBg }">{{ post.category }}</span>
              <span class="date">{{ post.date }}</span>
              <span class="read-time">{{ post.readTime }}分钟阅读</span>
            </div>
            <h2 @click="viewArticle(post)">{{ post.title }}</h2>
            <p class="article-excerpt">{{ post.excerpt }}</p>
            <div class="article-footer">
              <div class="author">
                <span class="avatar">{{ post.author.avatar }}</span>
                <div class="author-info">
                  <span class="name">{{ post.author.name }}</span>
                  <span class="title">{{ post.author.title }}</span>
                </div>
              </div>
              <div class="article-actions">
                <span class="action" :class="{ liked: post.liked }" @click="toggleLike(post)">
                  {{ post.liked ? '❤️' : '🤍' }} {{ post.likes }}
                </span>
                <span class="action">💬 {{ post.comments }}</span>
              </div>
            </div>
          </div>
          <div class="article-thumb" v-if="post.thumb" :style="{ background: post.thumb }">
            <span class="thumb-icon">{{ post.icon }}</span>
          </div>
        </article>

        <!-- 分页 -->
        <div class="pagination">
          <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">上一页</button>
          <span class="page-num active">1</span>
          <span class="page-num">2</span>
          <span class="page-num">3</span>
          <button class="page-btn" @click="currentPage++">下一页</button>
        </div>
      </div>

      <!-- 右侧边栏 -->
      <aside class="sidebar">
        <!-- 作者卡片 -->
        <div class="author-card">
          <div class="author-header">
            <span class="author-avatar">👨‍💻</span>
            <div class="author-info">
              <h3>前端小王</h3>
              <p>全栈工程师 @ 某大厂</p>
            </div>
          </div>
          <div class="author-stats">
            <div><strong>128</strong><span>文章</span></div>
            <div><strong>12.5k</strong><span>粉丝</span></div>
            <div><strong>56.8k</strong><span>阅读</span></div>
          </div>
          <button class="follow-btn">+ 关注</button>
        </div>

        <!-- 热门文章 -->
        <div class="hot-articles">
          <h4>🔥 热门文章</h4>
          <div v-for="(item, i) in hotArticles" :key="i" class="hot-item">
            <span class="hot-rank" :class="'top-' + (i + 1)">{{ i + 1 }}</span>
            <div class="hot-info">
              <h5>{{ item.title }}</h5>
              <span class="hot-views">{{ item.views }}阅读</span>
            </div>
          </div>
        </div>

        <!-- 标签云 -->
        <div class="tag-cloud">
          <h4>🏷️ 标签云</h4>
          <div class="tags">
            <span v-for="(tag, i) in tags" :key="i" class="tag" :style="{ fontSize: tag.size + 'px' }">
              {{ tag.name }}
            </span>
          </div>
        </div>

        <!-- 订阅 -->
        <div class="subscribe-card">
          <h4>📬 订阅更新</h4>
          <p>获取最新文章推送</p>
          <input type="email" placeholder="your@email.com" v-model="email" />
          <button class="subscribe-btn" @click="subscribe">订阅</button>
        </div>
      </aside>
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <a>关于我们</a>
          <a>联系合作</a>
          <a>用户协议</a>
          <a>隐私政策</a>
          <a>RSS订阅</a>
        </div>
        <p>© 2024 掘金博客 - 基于 Vue.js 构建</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navLinks = ['首页', '分类', '标签', '归档', '关于']
const searchText = ref('')
const activeFilter = ref(0)
const currentPage = ref(1)
const email = ref('')

const filterTabs = ['推荐', '最新', '热门', '关注']

const heroTags = ['Vue.js', 'React', 'TypeScript', 'Node.js', 'CSS', '性能优化', '面试']

const featuredArticle = ref({
  category: '前端开发',
  date: '2024-01-20',
  title: '2024年前端技术趋势展望：AI、RSC、边缘计算如何改变前端开发',
  excerpt: '回顾2023年前端领域的重要变化，展望2024年可能的技术趋势，包括AI辅助开发、React Server Components、边缘计算等...',
  bg: 'linear-gradient(135deg, #667eea, #764ba2)',
  author: { avatar: '👨‍💻', name: '前端小王' },
  views: '12.5k',
  likes: 856,
  comments: 128
})

const articles = ref([
  {
    category: 'Vue', categoryBg: '#42b883',
    date: '2024-01-18', readTime: 8,
    title: 'Vue 3.4 新特性详解：defineModel、v-bind同名简写与更多改进',
    excerpt: 'Vue 3.4 版本带来了许多令人兴奋的新特性，本文将深入解析这些新功能的使用方法和最佳实践...',
    author: { avatar: '👨', name: 'Vue达人', title: 'Vue核心团队成员' },
    likes: 234, comments: 45, liked: false,
    thumb: 'linear-gradient(135deg, #42b883, #35495e)', icon: '💚'
  },
  {
    category: 'React', categoryBg: '#61dafb',
    date: '2024-01-17', readTime: 12,
    title: 'React Server Components 完全指南：从原理到实践',
    excerpt: 'RSC 是 React 的未来，本文将带你深入理解 Server Components 的工作原理和使用场景...',
    author: { avatar: '👩', name: 'React专家', title: '全栈工程师' },
    likes: 189, comments: 67, liked: true,
    thumb: 'linear-gradient(135deg, #61dafb, #21a1f1)', icon: '⚛️'
  },
  {
    category: 'TypeScript', categoryBg: '#3178c6',
    date: '2024-01-16', readTime: 10,
    title: 'TypeScript 5.3 新特性：Import Attributes 与更多类型改进',
    excerpt: 'TypeScript 5.3 引入了 Import Attributes、互动类型推断等新特性，让我们来看看如何利用它们...',
    author: { avatar: '🧑', name: 'TS爱好者', title: '类型体操选手' },
    likes: 156, comments: 23, liked: false
  },
  {
    category: 'CSS', categoryBg: '#264de4',
    date: '2024-01-15', readTime: 6,
    title: 'CSS 容器查询实战：响应式设计的新范式',
    excerpt: '容器查询让我们可以基于组件的容器尺寸而非视口尺寸来调整样式，这是响应式设计的重大变革...',
    author: { avatar: '👩‍🎨', name: 'CSS魔法师', title: 'UI设计师' },
    likes: 312, comments: 89, liked: false,
    thumb: 'linear-gradient(135deg, #264de4, #c73e6d)', icon: '🎨'
  },
  {
    category: 'Node.js', categoryBg: '#68a063',
    date: '2024-01-14', readTime: 15,
    title: 'Node.js 性能优化全攻略：从内存管理到异步处理',
    excerpt: 'Node.js 应用的性能优化是一个系统工程，本文将从多个维度介绍优化策略...',
    author: { avatar: '👨‍💻', name: '后端老王', title: 'Node.js专家' },
    likes: 278, comments: 56, liked: false
  }
])

const hotArticles = ref([
  { title: '前端工程化最佳实践', views: '8.5k' },
  { title: 'Webpack 5 完全指南', views: '7.2k' },
  { title: '面试必问的JS基础题', views: '6.8k' },
  { title: 'React Hooks 最佳实践', views: '5.9k' },
  { title: 'TypeScript 类型体操入门', views: '4.5k' }
])

const tags = ref([
  { name: 'Vue.js', size: 16 },
  { name: 'React', size: 15 },
  { name: 'TypeScript', size: 14 },
  { name: 'JavaScript', size: 16 },
  { name: 'CSS', size: 12 },
  { name: 'Node.js', size: 13 },
  { name: 'Webpack', size: 11 },
  { name: '面试', size: 14 },
  { name: '性能优化', size: 12 },
  { name: '架构', size: 11 }
])

const filterByTag = (tag) => {
  alert(`筛选标签：${tag}`)
}

const viewArticle = (post) => {
  alert(`打开文章：${post.title}`)
}

const toggleLike = (post) => {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

const subscribe = () => {
  if (email.value) {
    alert(`已订阅：${email.value}`)
    email.value = ''
  }
}
</script>

<style scoped>
.blog-template {
  min-height: 100vh;
  background: #f5f5f5;
  color: #333;
}

.navbar {
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  font-size: 24px;
}

.logo-text {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #1e80ff, #00c6ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  font-size: 14px;
  color: #515767;
  cursor: pointer;
  transition: color 0.2s;
}

.nav-links a:hover, .nav-links a.active {
  color: #1e80ff;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f4f5f5;
  border-radius: 20px;
  padding: 0 12px;
}

.search-box input {
  border: none;
  background: transparent;
  padding: 8px;
  width: 160px;
  font-size: 13px;
  outline: none;
}

.search-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.write-btn {
  padding: 8px 20px;
  border: none;
  background: linear-gradient(135deg, #1e80ff, #00c6ff);
  color: #fff;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
}

.hero {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 80px 20px;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  animation: float 8s ease-in-out infinite;
}

.shape1 {
  width: 300px;
  height: 300px;
  background: rgba(30, 128, 255, 0.2);
  top: -50px;
  left: -50px;
}

.shape2 {
  width: 200px;
  height: 200px;
  background: rgba(0, 198, 255, 0.2);
  bottom: -30px;
  right: -30px;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
}

.hero p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 32px;
}

.hero-tags {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-tags span {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  font-size: 13px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
}

.hero-tags span:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: #1e80ff;
}

.animate-slide-up { animation: slideUp 0.6s ease forwards; }
.animate-fade-in { animation: fadeIn 0.6s ease forwards; animation-delay: 0.2s; opacity: 0; }
.animate-scale-in { animation: scaleIn 0.5s ease forwards; animation-delay: 0.4s; opacity: 0; }

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
}

.articles-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 12px 16px;
  border-radius: 8px;
}

.filter-tabs {
  display: flex;
  gap: 0;
}

.filter-tabs button {
  padding: 8px 16px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #515767;
  cursor: pointer;
  position: relative;
}

.filter-tabs button.active {
  color: #1e80ff;
  font-weight: 500;
}

.filter-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #1e80ff;
}

.sort-select {
  padding: 6px 12px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  font-size: 13px;
  color: #515767;
  background: #fff;
}

.article-card {
  display: flex;
  gap: 20px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  cursor: pointer;
  transition: box-shadow 0.2s;
  animation: fadeIn 0.3s ease forwards;
}

.article-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.article-card.featured {
  flex-direction: column;
  border-left: 4px solid #1e80ff;
}

.article-card.featured .article-cover {
  height: 200px;
  border-radius: 8px;
  position: relative;
}

.featured-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 12px;
  background: #f53f3f;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
}

.article-main {
  flex: 1;
  min-width: 0;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}

.category {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
}

.date, .read-time {
  font-size: 12px;
  color: #8a919f;
}

.article-card h2 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.4;
  transition: color 0.2s;
}

.article-card h2:hover {
  color: #1e80ff;
}

.article-excerpt {
  font-size: 14px;
  color: #8a919f;
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author .avatar {
  font-size: 24px;
}

.author-info {
  display: flex;
  flex-direction: column;
}

.author-info .name {
  font-size: 13px;
  font-weight: 500;
}

.author-info .title {
  font-size: 11px;
  color: #8a919f;
}

.article-actions {
  display: flex;
  gap: 16px;
}

.action {
  font-size: 13px;
  color: #8a919f;
  cursor: pointer;
}

.action.liked {
  color: #f53f3f;
}

.article-thumb {
  width: 140px;
  height: 100px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.thumb-icon {
  font-size: 36px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 20px;
}

.page-btn {
  padding: 8px 16px;
  border: 1px solid #e8e8e8;
  background: #fff;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-num {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.page-num.active {
  background: #1e80ff;
  color: #fff;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.author-card, .hot-articles, .tag-cloud, .subscribe-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.author-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.author-avatar {
  font-size: 40px;
}

.author-card .author-info h3 {
  font-size: 16px;
  font-weight: 600;
}

.author-card .author-info p {
  font-size: 12px;
  color: #8a919f;
}

.author-stats {
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  border-top: 1px solid #f4f5f5;
  border-bottom: 1px solid #f4f5f5;
  margin-bottom: 16px;
}

.author-stats div {
  text-align: center;
}

.author-stats strong {
  display: block;
  font-size: 16px;
  color: #252933;
}

.author-stats span {
  font-size: 12px;
  color: #8a919f;
}

.follow-btn {
  width: 100%;
  padding: 10px;
  border: 1px solid #1e80ff;
  background: #fff;
  color: #1e80ff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.follow-btn:hover {
  background: #1e80ff;
  color: #fff;
}

.hot-articles h4, .tag-cloud h4, .subscribe-card h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 16px;
}

.hot-item {
  display: flex;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #f4f5f5;
  cursor: pointer;
}

.hot-item:last-child {
  border-bottom: none;
}

.hot-rank {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #8a919f;
}

.hot-rank.top-1 { color: #f53f3f; }
.hot-rank.top-2 { color: #ff7d00; }
.hot-rank.top-3 { color: #ffb400; }

.hot-info h5 {
  font-size: 13px;
  font-weight: 400;
  margin-bottom: 4px;
  line-height: 1.4;
}

.hot-item:hover h5 {
  color: #1e80ff;
}

.hot-views {
  font-size: 11px;
  color: #8a919f;
}

.tag-cloud .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  padding: 4px 10px;
  background: #f4f5f5;
  border-radius: 4px;
  font-size: 12px;
  color: #515767;
  cursor: pointer;
  transition: all 0.2s;
}

.tag:hover {
  background: #e8f3ff;
  color: #1e80ff;
}

.subscribe-card p {
  font-size: 13px;
  color: #8a919f;
  margin-bottom: 12px;
}

.subscribe-card input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  font-size: 13px;
  margin-bottom: 12px;
}

.subscribe-btn {
  width: 100%;
  padding: 10px;
  border: none;
  background: linear-gradient(135deg, #1e80ff, #00c6ff);
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.footer {
  background: #fff;
  border-top: 1px solid #eee;
  padding: 40px 20px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 20px;
}

.footer-links a {
  font-size: 14px;
  color: #515767;
  cursor: pointer;
}

.footer-links a:hover {
  color: #1e80ff;
}

.footer p {
  font-size: 13px;
  color: #8a919f;
}
</style>