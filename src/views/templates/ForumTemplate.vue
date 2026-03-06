<template>
  <div class="forum-template">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-left">
        <div class="logo">
          <span class="logo-icon">C</span>
          <span class="logo-text">码农社区</span>
        </div>
        <nav class="nav">
          <a v-for="(item, i) in navItems" :key="i" :class="{ active: i === 0 }">{{ item }}</a>
        </nav>
      </div>
      <div class="header-actions">
        <div class="search-box">
          <input type="text" placeholder="搜索帖子、用户、话题..." class="search-input" />
          <button class="search-btn">🔍</button>
        </div>
        <button class="btn-create">✏️ 发帖</button>
        <div class="user-menu">
          <span class="avatar">👤</span>
          <span class="notif-badge">3</span>
        </div>
      </div>
    </header>

    <main class="main-content">
      <!-- 左侧边栏 -->
      <div class="sidebar">
        <div class="user-card">
          <div class="user-header">
            <div class="avatar-lg">👤</div>
            <div class="user-info">
              <h3>码农小王</h3>
              <p class="user-title">全栈工程师</p>
            </div>
          </div>
          <div class="user-stats">
            <div class="stat"><strong>128</strong><span>帖子</span></div>
            <div class="stat"><strong>1.2k</strong><span>粉丝</span></div>
            <div class="stat"><strong>356</strong><span>关注</span></div>
          </div>
          <div class="user-level">
            <span class="level-badge">Lv.5</span>
            <div class="level-bar"><div class="level-progress" style="width: 65%"></div></div>
            <span class="level-text">距下一等级还需350经验</span>
          </div>
        </div>

        <div class="hot-topics">
          <h4>🔥 热门话题</h4>
          <ul>
            <li v-for="(topic, i) in hotTopics" :key="i" class="topic-item" @click="selectedTopic = topic">
              <span class="rank" :class="'rank-' + (i + 1)">{{ i + 1 }}</span>
              <div class="topic-info">
                <span class="topic-name">{{ topic.name }}</span>
                <span class="topic-count">{{ topic.count }}讨论</span>
              </div>
            </li>
          </ul>
        </div>

        <div class="recommend-authors">
          <h4>⭐ 推荐关注</h4>
          <div v-for="(author, i) in recommendAuthors" :key="i" class="author-item">
            <span class="author-avatar">{{ author.avatar }}</span>
            <div class="author-info">
              <span class="author-name">{{ author.name }}</span>
              <span class="author-desc">{{ author.desc }}</span>
            </div>
            <button class="follow-btn" :class="{ followed: author.followed }" @click="author.followed = !author.followed">
              {{ author.followed ? '已关注' : '关注' }}
            </button>
          </div>
        </div>
      </div>

      <!-- 帖子列表 -->
      <div class="content-area">
        <div class="category-tabs">
          <button v-for="(cat, i) in categories" :key="i"
                  :class="['tab', { active: activeCat === i }]"
                  @click="activeCat = i">
            {{ cat.name }}
            <span class="tab-count" v-if="cat.count">{{ cat.count }}</span>
          </button>
        </div>

        <div class="posts-list">
          <article v-for="(post, i) in filteredPosts" :key="i" class="post-card" :style="{ animationDelay: i * 0.05 + 's' }">
            <div class="post-header">
              <div class="author-info">
                <div class="author-avatar" :style="{ background: post.avatarBg }">{{ post.avatar }}</div>
                <div>
                  <span class="author-name">{{ post.author }}</span>
                  <span class="author-badge" v-if="post.badge">{{ post.badge }}</span>
                  <span class="post-time">{{ post.time }}</span>
                </div>
              </div>
              <div class="post-tags">
                <span class="post-tag" v-for="(tag, ti) in post.tags" :key="ti" :style="{ background: tagColors[ti % tagColors.length] }">{{ tag }}</span>
              </div>
            </div>
            <h3 class="post-title" @click="viewPost(post)">{{ post.title }}</h3>
            <p class="post-preview">{{ post.preview }}</p>
            <div class="post-images" v-if="post.images">
              <div v-for="(img, ii) in post.images" :key="ii" class="post-img" :style="{ background: img }"></div>
            </div>
            <div class="post-footer">
              <div class="post-actions">
                <span class="action" :class="{ liked: post.liked }" @click="toggleLike(post)">
                  {{ post.liked ? '❤️' : '🤍' }} {{ post.likes }}
                </span>
                <span class="action" @click="showComments(post)">💬 {{ post.comments }}</span>
                <span class="action">👁 {{ post.views }}</span>
                <span class="action" @click="collectPost(post)">
                  {{ post.collected ? '⭐' : '☆' }} 收藏
                </span>
              </div>
              <span class="post-share">分享 →</span>
            </div>
          </article>
        </div>

        <div class="load-more">
          <button class="load-btn" @click="loadMore">加载更多</button>
        </div>
      </div>

      <!-- 右侧边栏 -->
      <div class="right-sidebar">
        <div class="announcement">
          <h4>📢 公告</h4>
          <ul>
            <li>• 社区发帖规范更新</li>
            <li>• 优秀创作者激励计划</li>
            <li>• 春节活动获奖名单公布</li>
          </ul>
        </div>

        <div class="activity-card">
          <h4>🎯 每日签到</h4>
          <p>连续签到可获得积分奖励</p>
          <button class="signin-btn" :class="{ signed: isSigned }" @click="isSigned = true">
            {{ isSigned ? '✓ 已签到' : '立即签到' }}
          </button>
          <div class="signin-streak">已连续签到 <strong>7</strong> 天</div>
        </div>

        <div class="rank-card">
          <h4>🏆 活跃榜</h4>
          <div class="rank-tabs">
            <span :class="{ active: rankTab === 'daily' }" @click="rankTab = 'daily'">日榜</span>
            <span :class="{ active: rankTab === 'weekly' }" @click="rankTab = 'weekly'">周榜</span>
            <span :class="{ active: rankTab === 'monthly' }" @click="rankTab = 'monthly'">月榜</span>
          </div>
          <div class="rank-list">
            <div v-for="(user, i) in rankUsers" :key="i" class="rank-item">
              <span class="rank-num" :class="'top-' + (i + 1)">{{ i + 1 }}</span>
              <span class="rank-avatar">{{ user.avatar }}</span>
              <span class="rank-name">{{ user.name }}</span>
              <span class="rank-score">{{ user.score }}分</span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 回到顶部 -->
    <div class="back-top" @click="scrollToTop" v-show="showBackTop">↑</div>

    <footer class="footer">
      <p>© 2024 码农社区 | 关于我们 | 用户协议 | 隐私政策</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const navItems = ['首页', '关注', '消息', '收藏', '历史']
const activeCat = ref(0)
const selectedTopic = ref(null)
const isSigned = ref(false)
const rankTab = ref('daily')
const showBackTop = ref(false)

const categories = ref([
  { name: '推荐', count: '' },
  { name: '最新', count: 'NEW' },
  { name: '热门', count: '🔥' },
  { name: '精华', count: '' },
  { name: '问答', count: '' },
  { name: '分享', count: '' }
])

const tagColors = ['#e8f4fd', '#fff3e0', '#f3e5f5', '#e8f5e9', '#fce4ec']

const hotTopics = ref([
  { name: 'Vue3 组合式API', count: 2356 },
  { name: '前端性能优化', count: 1892 },
  { name: 'TypeScript实战', count: 1654 },
  { name: '面试经验分享', count: 1432 },
  { name: '开源项目推荐', count: 1287 }
])

const recommendAuthors = ref([
  { avatar: '👨', name: '前端小哥', desc: '专注Vue生态', followed: false },
  { avatar: '👩', name: '全栈小姐姐', desc: 'Node.js专家', followed: true },
  { avatar: '🧑', name: '架构师老王', desc: '10年经验', followed: false }
])

const posts = ref([
  {
    avatar: '👨', avatarBg: '#e3f2fd', author: '前端小哥', badge: '优质作者', time: '2小时前',
    tags: ['Vue', '前端'], title: 'Vue3 项目实战经验分享，从入门到精通的完整指南',
    preview: '最近完成了一个Vue3项目，分享一些开发过程中的心得体会，包括组合式API的最佳实践、性能优化技巧等...',
    likes: 256, comments: 89, views: '2.3k', liked: false, collected: false
  },
  {
    avatar: '👩', avatarBg: '#fce4ec', author: '全栈小姐姐', time: '5小时前',
    tags: ['Node.js', '后端'], title: 'Node.js 后端架构设计：如何构建高并发服务',
    preview: '分享一下个人在Node.js后端项目中的架构设计思路，包括微服务拆分、数据库优化、缓存策略等...',
    likes: 189, comments: 56, views: '1.8k', liked: true, collected: true,
    images: ['#f5f5f5', '#e0e0e0', '#f0f0f0']
  },
  {
    avatar: '🧑', avatarBg: '#e8f5e9', author: '架构师老王', badge: '认证专家', time: '昨天',
    tags: ['架构', '微前端'], title: '微前端架构实践总结：从 qiankun 到 Module Federation',
    preview: '在大型项目中实践微前端的一些经验，对比了多种技术方案的优缺点...',
    likes: 423, comments: 134, views: '5.6k', liked: false, collected: false
  },
  {
    avatar: '👨', avatarBg: '#fff3e0', author: '算法工程师', time: '昨天',
    tags: ['算法', '面试'], title: '大厂面试必问的数据结构与算法题总结',
    preview: '整理了近期面试中遇到的高频算法题，附带详细解答和优化思路...',
    likes: 567, comments: 178, views: '8.2k', liked: false, collected: true
  },
  {
    avatar: '👩', avatarBg: '#f3e5f5', author: 'UI设计师', time: '2天前',
    tags: ['设计', 'CSS'], title: '2024年前端必知的CSS新特性，建议收藏！',
    preview: 'CSS这些年新增了很多强大的特性，本文盘点那些实用的CSS新功能...',
    likes: 312, comments: 67, views: '4.1k', liked: false, collected: false
  }
])

const rankUsers = ref([
  { avatar: '👨', name: '前端小哥', score: 1256 },
  { avatar: '👩', name: '全栈小姐姐', score: 987 },
  { avatar: '🧑', name: '架构师老王', score: 876 },
  { avatar: '👨', name: '算法达人', score: 654 },
  { avatar: '👩', name: '后端专家', score: 543 }
])

const filteredPosts = computed(() => posts.value)

const toggleLike = (post) => {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

const collectPost = (post) => {
  post.collected = !post.collected
}

const showComments = (post) => {
  alert(`查看 ${post.title} 的评论`)
}

const viewPost = (post) => {
  alert(`打开文章：${post.title}`)
}

const loadMore = () => {
  alert('加载更多帖子...')
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showBackTop.value = window.scrollY > 300
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.forum-template {
  min-height: 100vh;
  background: #f4f5f5;
  color: #333;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #1e80ff, #00c6ff);
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav a {
  font-size: 14px;
  color: #515767;
  cursor: pointer;
  position: relative;
  padding: 18px 0;
}

.nav a:hover, .nav a.active {
  color: #1e80ff;
}

.nav a.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: #1e80ff;
  border-radius: 2px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f4f5f5;
  border-radius: 4px;
  padding: 0 8px;
}

.search-input {
  border: none;
  background: transparent;
  padding: 8px;
  width: 200px;
  font-size: 13px;
  outline: none;
}

.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.btn-create {
  padding: 8px 16px;
  border: none;
  background: linear-gradient(135deg, #1e80ff, #00c6ff);
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
}

.user-menu {
  position: relative;
  cursor: pointer;
}

.avatar {
  font-size: 24px;
}

.notif-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #f53f3f;
  color: #fff;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-content {
  display: grid;
  grid-template-columns: 240px 1fr 260px;
  gap: 20px;
  padding: 20px 40px;
  max-width: 1400px;
  margin: 0 auto;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.user-card {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.avatar-lg {
  width: 48px;
  height: 48px;
  background: #e8f3ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.user-info h3 {
  font-size: 15px;
  font-weight: 600;
}

.user-title {
  font-size: 12px;
  color: #8a919f;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  padding: 16px 0;
  border-top: 1px solid #f4f5f5;
  border-bottom: 1px solid #f4f5f5;
}

.stat {
  text-align: center;
}

.stat strong {
  display: block;
  font-size: 16px;
  color: #252933;
}

.stat span {
  font-size: 12px;
  color: #8a919f;
}

.user-level {
  padding-top: 16px;
}

.level-badge {
  display: inline-block;
  padding: 2px 8px;
  background: linear-gradient(135deg, #ffba0d, #ff9a0d);
  color: #fff;
  border-radius: 4px;
  font-size: 11px;
  margin-bottom: 8px;
}

.level-bar {
  height: 4px;
  background: #e8e8e8;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 6px;
}

.level-progress {
  height: 100%;
  background: linear-gradient(90deg, #1e80ff, #00c6ff);
  border-radius: 2px;
}

.level-text {
  font-size: 11px;
  color: #8a919f;
}

.hot-topics, .recommend-authors, .announcement, .activity-card, .rank-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
}

.hot-topics h4, .recommend-authors h4, .announcement h4, .activity-card h4, .rank-card h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #252933;
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f4f5f5;
  cursor: pointer;
}

.topic-item:last-child {
  border-bottom: none;
}

.topic-item:hover .topic-name {
  color: #1e80ff;
}

.rank {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #8a919f;
}

.rank-1 { color: #f53f3f; }
.rank-2 { color: #ff7d00; }
.rank-3 { color: #ffb400; }

.topic-info {
  flex: 1;
}

.topic-name {
  font-size: 13px;
  color: #252933;
  transition: color 0.2s;
}

.topic-count {
  font-size: 11px;
  color: #8a919f;
}

.author-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f4f5f5;
}

.author-item:last-child {
  border-bottom: none;
}

.author-avatar {
  font-size: 28px;
}

.author-info {
  flex: 1;
}

.author-name {
  display: block;
  font-size: 13px;
  font-weight: 500;
}

.author-desc {
  font-size: 11px;
  color: #8a919f;
}

.follow-btn {
  padding: 4px 12px;
  border: 1px solid #1e80ff;
  background: #fff;
  color: #1e80ff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.follow-btn:hover {
  background: #1e80ff;
  color: #fff;
}

.follow-btn.followed {
  background: #f4f5f5;
  border-color: #e8e8e8;
  color: #8a919f;
}

.content-area {
  min-width: 0;
}

.category-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 16px;
  background: #fff;
  padding: 0 16px;
  border-radius: 8px;
  border-bottom: 1px solid #e8e8e8;
}

.tab {
  padding: 16px 20px;
  border: none;
  border-radius: 0;
  background: transparent;
  color: #515767;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.tab:hover {
  color: #1e80ff;
}

.tab.active {
  color: #1e80ff;
  font-weight: 500;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #1e80ff;
}

.tab-count {
  margin-left: 4px;
  font-size: 10px;
  color: #f53f3f;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.post-card {
  background: #fff;
  border-radius: 8px;
  padding: 16px 20px;
  cursor: pointer;
  animation: fadeIn 0.3s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.post-card:hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.author-name {
  font-size: 14px;
  font-weight: 500;
  color: #252933;
}

.author-badge {
  margin-left: 6px;
  padding: 2px 6px;
  background: #e8f3ff;
  color: #1e80ff;
  border-radius: 2px;
  font-size: 10px;
}

.post-time {
  display: block;
  font-size: 12px;
  color: #8a919f;
  margin-top: 2px;
}

.post-tags {
  display: flex;
  gap: 8px;
}

.post-tag {
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 12px;
  color: #515767;
}

.post-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #252933;
  line-height: 1.5;
}

.post-title:hover {
  color: #1e80ff;
}

.post-preview {
  color: #8a919f;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-images {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.post-img {
  width: 120px;
  height: 80px;
  border-radius: 4px;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-actions {
  display: flex;
  gap: 20px;
}

.action {
  color: #8a919f;
  font-size: 13px;
  cursor: pointer;
  transition: color 0.2s;
}

.action:hover {
  color: #1e80ff;
}

.action.liked {
  color: #f53f3f;
}

.post-share {
  font-size: 12px;
  color: #8a919f;
  cursor: pointer;
}

.load-more {
  text-align: center;
  padding: 20px;
}

.load-btn {
  padding: 10px 40px;
  border: 1px solid #e8e8e8;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #515767;
}

.right-sidebar {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.announcement ul {
  padding-left: 8px;
}

.announcement li {
  font-size: 13px;
  color: #515767;
  padding: 6px 0;
  cursor: pointer;
}

.announcement li:hover {
  color: #1e80ff;
}

.activity-card p {
  font-size: 12px;
  color: #8a919f;
  margin-bottom: 12px;
}

.signin-btn {
  width: 100%;
  padding: 10px;
  border: none;
  background: linear-gradient(135deg, #1e80ff, #00c6ff);
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.signin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 128, 255, 0.3);
}

.signin-btn.signed {
  background: #e8e8e8;
  color: #8a919f;
}

.signin-streak {
  text-align: center;
  font-size: 12px;
  color: #8a919f;
  margin-top: 12px;
}

.signin-streak strong {
  color: #1e80ff;
}

.rank-card .rank-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  border-bottom: 1px solid #f4f5f5;
  padding-bottom: 10px;
}

.rank-tabs span {
  font-size: 13px;
  color: #8a919f;
  cursor: pointer;
}

.rank-tabs span.active {
  color: #1e80ff;
  font-weight: 500;
}

.rank-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
}

.rank-num {
  width: 18px;
  font-size: 12px;
  font-weight: 600;
  color: #8a919f;
}

.rank-num.top-1 { color: #f53f3f; }
.rank-num.top-2 { color: #ff7d00; }
.rank-num.top-3 { color: #ffb400; }

.rank-avatar {
  font-size: 20px;
}

.rank-name {
  flex: 1;
  font-size: 13px;
}

.rank-score {
  font-size: 12px;
  color: #8a919f;
}

.back-top {
  position: fixed;
  bottom: 80px;
  right: 30px;
  width: 44px;
  height: 44px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 99;
}

.footer {
  padding: 24px;
  text-align: center;
  color: #8a919f;
  font-size: 13px;
  border-top: 1px solid #e8e8e8;
  background: #fff;
}

.footer p {
  cursor: pointer;
}
</style>