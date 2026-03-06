<template>
  <div class="education-template">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">在线学习平台</div>
      <div class="nav-links">
        <a v-for="(link, i) in navLinks" :key="i">{{ link }}</a>
      </div>
      <div class="auth-btns">
        <button class="btn-login">登录</button>
        <button class="btn-signup">免费注册</button>
      </div>
    </nav>

    <!-- 主横幅 -->
    <section class="hero">
      <div class="hero-visual">
        <div class="particle p1"></div>
        <div class="particle p2"></div>
        <div class="particle p3"></div>
      </div>
      <div class="hero-content">
        <h1 class="animate-slide-up">在线学习，随时随地</h1>
        <p class="animate-fade-in">覆盖编程、设计、商业等多个领域</p>
        <div class="hero-stats animate-slide-up">
          <div class="stat" v-for="(stat, i) in heroStats" :key="i" :style="{ animationDelay: i * 0.1 + 's' }">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>
        <button class="start-btn animate-scale-in">开始学习</button>
      </div>
    </section>

    <!-- 课程分类 -->
    <section class="categories">
      <h2>课程分类</h2>
      <div class="cat-grid">
        <div v-for="(cat, i) in categories" :key="i" class="cat-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="cat-icon" :style="{ background: cat.bg }">{{ cat.icon }}</div>
          <h3>{{ cat.name }}</h3>
          <p>{{ cat.count }} 门课程</p>
        </div>
      </div>
    </section>

    <!-- 热门课程 -->
    <section class="popular-courses">
      <h2>热门课程</h2>
      <div class="courses-grid">
        <div v-for="(course, i) in courses" :key="i" class="course-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="course-header" :style="{ background: course.bg }">
            <span class="course-emoji">{{ course.emoji }}</span>
            <span class="course-level">{{ course.level }}</span>
          </div>
          <div class="course-body">
            <h3>{{ course.title }}</h3>
            <p class="instructor">{{ course.instructor }}</p>
            <div class="course-meta">
              <span>{{ course.duration }}</span>
              <span>{{ course.students }}人学习</span>
            </div>
            <div class="course-footer">
              <div class="rating">⭐ {{ course.rating }}</div>
              <div class="price">¥{{ course.price }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-brand">在线学习平台</div>
        <div class="footer-links">
          <a>关于我们</a>
          <a>帮助中心</a>
          <a>联系我们</a>
        </div>
      </div>
      <p class="copyright">© 2024 在线学习平台</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navLinks = ['首页', '课程', '讲师', '关于']

const heroStats = ref([
  { value: '1000+', label: '在线课程' },
  { value: '50万+', label: '注册学员' },
  { value: '200+', label: '认证讲师' }
])

const categories = ref([
  { icon: '💻', name: '编程开发', count: 128, bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { icon: '🎨', name: '设计创意', count: 86, bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { icon: '📊', name: '数据分析', count: 64, bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { icon: '📈', name: '商业管理', count: 52, bg: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { icon: '🗣️', name: '语言学习', count: 78, bg: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { icon: '🎬', name: '影视制作', count: 45, bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' }
])

const courses = ref([
  { emoji: '⚛️', title: 'Vue3 从入门到实战', instructor: '张老师', level: '进阶', duration: '36课时', students: '12.5k', rating: 4.9, price: 299, bg: 'linear-gradient(135deg, #42b883, #35495e)' },
  { emoji: '🐍', title: 'Python 数据分析', instructor: '李老师', level: '入门', duration: '48课时', students: '28.3k', rating: 4.8, price: 399, bg: 'linear-gradient(135deg, #3776ab, #ffd43b)' },
  { emoji: '🎯', title: 'UI设计实战课程', instructor: '王老师', level: '进阶', duration: '24课时', students: '8.7k', rating: 4.9, price: 249, bg: 'linear-gradient(135deg, #e74c3c, #c0392b)' },
  { emoji: '📱', title: 'React Native 开发', instructor: '刘老师', level: '进阶', duration: '32课时', students: '6.2k', rating: 4.7, price: 349, bg: 'linear-gradient(135deg, #61dafb, #21a1f1)' }
])
</script>

<style scoped>
.education-template {
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0a1a 0%, #1a1a3a 50%, #0f0f2a 100%);
  color: #fff;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 60px;
  background: rgba(10, 10, 26, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(79, 172, 254, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 40px;
}

.nav-links a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #4facfe;
}

.auth-btns {
  display: flex;
  gap: 12px;
}

.btn-login {
  padding: 8px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-signup {
  padding: 8px 20px;
  border: none;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: #0a0a1a;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.hero {
  position: relative;
  padding: 100px 60px;
  text-align: center;
  overflow: hidden;
}

.hero-visual {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: #4facfe;
  border-radius: 50%;
  animation: particleFloat 8s ease-in-out infinite;
}

.p1 { top: 20%; left: 30%; animation-delay: 0s; }
.p2 { top: 50%; right: 20%; animation-delay: -3s; }
.p3 { bottom: 30%; left: 50%; animation-delay: -6s; }

@keyframes particleFloat {
  0%, 100% { transform: translateY(0); opacity: 0.3; }
  50% { transform: translateY(-50px); opacity: 0.8; }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero h1 {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 40px;
}

.stat {
  text-align: center;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.stat-value {
  display: block;
  font-size: 36px;
  font-weight: 700;
  color: #4facfe;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.start-btn {
  padding: 16px 48px;
  border: none;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: #0a0a1a;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 30px rgba(79, 172, 254, 0.3);
}

.start-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(79, 172, 254, 0.4);
}

/* 动画 */
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

.animate-slide-up { animation: slideUp 0.6s ease forwards; }
.animate-fade-in { animation: fadeIn 0.6s ease forwards; opacity: 0; animation-delay: 0.2s; }
.animate-scale-in { animation: scaleIn 0.5s ease forwards; opacity: 0; animation-delay: 0.6s; }

.categories, .popular-courses {
  padding: 80px 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.categories h2, .popular-courses h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 40px;
  text-align: center;
  background: linear-gradient(135deg, #fff, #4facfe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
}

.cat-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.cat-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(79, 172, 254, 0.1);
}

.cat-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 16px;
}

.cat-card h3 {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
}

.cat-card p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.popular-courses {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin: 0 60px 80px;
  max-width: none;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.course-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.course-header {
  padding: 40px;
  text-align: center;
  position: relative;
}

.course-emoji {
  font-size: 40px;
}

.course-level {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  font-size: 12px;
}

.course-body {
  padding: 16px;
}

.course-body h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.instructor {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
}

.course-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 12px;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.rating {
  font-size: 13px;
  color: #fbbf24;
}

.price {
  font-size: 20px;
  font-weight: 700;
  color: #4facfe;
}

.footer {
  background: #050510;
  padding: 40px 60px;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto 20px;
}

.footer-brand {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-links {
  display: flex;
  gap: 32px;
}

.footer-links a {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.footer-links a:hover {
  color: #4facfe;
}

.copyright {
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.3);
}
</style>