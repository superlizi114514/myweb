<template>
  <div class="portfolio-template">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">张明 / 设计师</div>
      <div class="nav-links">
        <a v-for="(link, i) in navLinks" :key="i" class="nav-link">{{ link }}</a>
      </div>
    </nav>

    <!-- 主视觉区 -->
    <section class="hero">
      <div class="hero-visual">
        <div class="floating-shape shape1"></div>
        <div class="floating-shape shape2"></div>
      </div>
      <div class="hero-content">
        <span class="greeting animate-slide-down">你好，我是</span>
        <h1 class="animate-slide-up">
          <span class="name">张明</span>
          <span class="role">UI/UX Designer</span>
        </h1>
        <p class="hero-desc animate-fade-in">5年设计经验，专注于移动端产品设计和企业级应用</p>
        <div class="hero-buttons animate-scale-in">
          <button class="btn-primary">查看作品</button>
          <button class="btn-outline">下载简历</button>
        </div>
      </div>
    </section>

    <!-- 技能 -->
    <section class="skills-section">
      <h2>专业技能</h2>
      <div class="skills-grid">
        <div v-for="(skill, i) in skills" :key="i" class="skill-item" :style="{ animationDelay: i * 0.1 + 's' }">
          <span class="skill-name">{{ skill.name }}</span>
          <div class="skill-bar">
            <div class="skill-level" :style="{ width: skill.level + '%' }"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 作品展示 -->
    <section class="works">
      <h2>代表作品</h2>
      <div class="works-grid">
        <div v-for="(work, i) in works" :key="i" class="work-card" :style="{ animationDelay: i * 0.15 + 's' }">
          <div class="work-image" :style="{ background: work.bg }">
            <span class="work-icon">{{ work.icon }}</span>
          </div>
          <div class="work-info">
            <h3>{{ work.title }}</h3>
            <p>{{ work.category }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 工作经历 -->
    <section class="experience">
      <h2>工作经历</h2>
      <div class="exp-timeline">
        <div v-for="(exp, i) in experience" :key="i" class="exp-item" :style="{ animationDelay: i * 0.2 + 's' }">
          <div class="exp-period">{{ exp.period }}</div>
          <div class="exp-content">
            <h3>{{ exp.company }}</h3>
            <p class="exp-role">{{ exp.role }}</p>
            <p class="exp-desc">{{ exp.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系方式 -->
    <section class="contact animate-scale-in">
      <h2>联系我</h2>
      <div class="contact-info">
        <div class="contact-item">
          <span class="label">邮箱</span>
          <span>zhangming@example.com</span>
        </div>
        <div class="contact-item">
          <span class="label">电话</span>
          <span>138-0000-0000</span>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <p>© 2024 张明 - UI/UX设计师</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navLinks = ['首页', '作品', '经历', '联系']

const skills = ref([
  { name: 'UI设计', level: 95 },
  { name: 'UX设计', level: 90 },
  { name: 'Figma', level: 95 },
  { name: 'Sketch', level: 85 },
  { name: 'Photoshop', level: 80 },
  { name: 'After Effects', level: 70 }
])

const works = ref([
  { icon: '📱', title: '电商App重设计', category: '移动端UI', bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { icon: '💻', title: '企业管理后台', category: 'Web端UI', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { icon: '🏦', title: '金融理财App', category: '移动端UI', bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  { icon: '🏥', title: '医疗预约系统', category: '产品设计', bg: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { icon: '🛒', title: '新零售小程序', category: '小程序UI', bg: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { icon: '📊', title: '数据可视化大屏', category: '数据可视化', bg: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' }
])

const experience = ref([
  { period: '2022 - 至今', company: '某科技公司', role: '高级UI设计师', desc: '负责公司核心产品的UI设计工作' },
  { period: '2020 - 2022', company: '某设计工作室', role: 'UI设计师', desc: '为客户提供品牌和界面设计服务' },
  { period: '2019 - 2020', company: '某互联网公司', role: 'UI设计师', desc: '参与多个Web和移动项目设计' }
])
</script>

<style scoped>
.portfolio-template {
  min-height: 100vh;
  background: #0a0a0f;
  color: #fff;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 60px;
  background: rgba(10, 10, 15, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 16px;
  font-weight: 600;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #a855f7;
}

.hero {
  position: relative;
  padding: 120px 60px;
  text-align: center;
  overflow: hidden;
}

.hero-visual {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  animation: float 10s ease-in-out infinite;
}

.shape1 {
  width: 400px;
  height: 400px;
  background: rgba(168, 85, 247, 0.2);
  top: -100px;
  left: -100px;
}

.shape2 {
  width: 300px;
  height: 300px;
  background: rgba(236, 72, 153, 0.2);
  bottom: -50px;
  right: -50px;
  animation-delay: -5s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(30px, -30px) scale(1.1); }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.greeting {
  display: block;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
}

.hero h1 {
  margin-bottom: 24px;
}

.name {
  display: block;
  font-size: 64px;
  font-weight: 800;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
}

.role {
  display: block;
  font-size: 20px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  letter-spacing: 4px;
  margin-top: 8px;
}

.hero-desc {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-primary, .btn-outline {
  padding: 14px 32px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  border: none;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  color: #fff;
  box-shadow: 0 10px 30px rgba(168, 85, 247, 0.4);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(168, 85, 247, 0.5);
}

.btn-outline {
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: #fff;
}

.btn-outline:hover {
  border-color: #a855f7;
}

/* 动画 */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

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

.animate-slide-down { animation: slideDown 0.6s ease forwards; }
.animate-slide-up { animation: slideUp 0.6s ease forwards; opacity: 0; animation-delay: 0.2s; }
.animate-fade-in { animation: fadeIn 0.6s ease forwards; opacity: 0; animation-delay: 0.4s; }
.animate-scale-in { animation: scaleIn 0.5s ease forwards; opacity: 0; animation-delay: 0.6s; }

.skills-section, .works, .experience, .contact {
  padding: 80px 60px;
  max-width: 1000px;
  margin: 0 auto;
}

.skills-section h2, .works h2, .experience h2, .contact h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 48px;
  text-align: center;
  background: linear-gradient(135deg, #fff, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 16px;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.skill-name {
  width: 120px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.skill-bar {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.skill-level {
  height: 100%;
  background: linear-gradient(135deg, #a855f7, #ec4899);
  border-radius: 4px;
  transition: width 1s ease;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.work-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.work-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(168, 85, 247, 0.2);
}

.work-image {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-icon {
  font-size: 48px;
  transition: transform 0.3s;
}

.work-card:hover .work-icon {
  transform: scale(1.1);
}

.work-info {
  padding: 20px;
}

.work-info h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.work-info p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.experience {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  margin: 0 60px 80px;
  max-width: none;
}

.exp-timeline {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
}

.exp-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #a855f7, #ec4899);
}

.exp-item {
  display: flex;
  gap: 32px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.exp-item:last-child {
  border-bottom: none;
}

.exp-period {
  width: 120px;
  font-size: 14px;
  color: #a855f7;
  flex-shrink: 0;
  padding-left: 20px;
  position: relative;
}

.exp-period::before {
  content: '';
  position: absolute;
  left: -5px;
  top: 8px;
  width: 12px;
  height: 12px;
  background: #a855f7;
  border-radius: 50%;
}

.exp-content h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.exp-role {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
}

.exp-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.contact {
  text-align: center;
  padding: 60px;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1));
  border-radius: 20px;
  margin: 0 60px 80px;
  max-width: none;
}

.contact-info {
  display: flex;
  justify-content: center;
  gap: 60px;
  flex-wrap: wrap;
}

.contact-item {
  text-align: center;
}

.contact-item .label {
  display: block;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
}

.contact-item span:last-child {
  font-size: 16px;
}

.footer {
  padding: 40px 60px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.4);
}
</style>