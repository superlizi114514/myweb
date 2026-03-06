<template>
  <div class="minimal-template">
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">MUJI Studio</div>
        <div class="nav-links">
          <a v-for="(link, i) in navLinks" :key="i" :class="{ active: i === 0 }">{{ link }}</a>
        </div>
        <button class="contact-btn">联系我们</button>
      </div>
    </nav>

    <!-- 主视觉 -->
    <section class="hero">
      <div class="hero-content">
        <span class="hero-label">Design Studio</span>
        <h1>简约设计<br/>专注体验</h1>
        <p>我们相信好的设计应该是简单的、有意义的、持久的</p>
        <div class="hero-buttons">
          <button class="btn-primary">查看作品</button>
          <button class="btn-outline">了解更多</button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="floating-block b1"></div>
        <div class="floating-block b2"></div>
        <div class="floating-block b3"></div>
      </div>
    </section>

    <!-- 服务 -->
    <section class="services">
      <div class="section-header">
        <span class="section-label">Services</span>
        <h2>服务项目</h2>
      </div>
      <div class="services-grid">
        <div v-for="(service, i) in services" :key="i" class="service-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <span class="service-num">0{{ i + 1 }}</span>
          <h3>{{ service.title }}</h3>
          <p>{{ service.desc }}</p>
          <ul class="service-list">
            <li v-for="(item, j) in service.items" :key="j">{{ item }}</li>
          </ul>
          <button class="service-btn">了解详情</button>
        </div>
      </div>
    </section>

    <!-- 作品 -->
    <section class="works">
      <div class="section-header">
        <span class="section-label">Works</span>
        <h2>精选作品</h2>
      </div>
      <div class="works-filter">
        <span v-for="(filter, i) in filters" :key="i"
              :class="{ active: activeFilter === i }"
              @click="activeFilter = i">
          {{ filter }}
        </span>
      </div>
      <div class="works-grid">
        <div v-for="(item, i) in filteredWorks" :key="i" class="work-item" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="work-image" :style="{ background: item.bg }">
            <span class="work-icon">{{ item.icon }}</span>
            <div class="work-overlay">
              <button class="view-btn">查看项目</button>
            </div>
          </div>
          <div class="work-info">
            <h3>{{ item.title }}</h3>
            <p>{{ item.category }}</p>
          </div>
        </div>
      </div>
      <div class="works-more">
        <button class="more-btn">查看全部作品</button>
      </div>
    </section>

    <!-- 流程 -->
    <section class="process">
      <div class="section-header">
        <span class="section-label">Process</span>
        <h2>工作流程</h2>
      </div>
      <div class="process-grid">
        <div v-for="(step, i) in processSteps" :key="i" class="process-step">
          <div class="step-num">{{ i + 1 }}</div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 客户 -->
    <section class="clients">
      <div class="section-header">
        <span class="section-label">Clients</span>
        <h2>合作伙伴</h2>
      </div>
      <div class="clients-grid">
        <div v-for="(client, i) in clients" :key="i" class="client-item">
          <span class="client-logo">{{ client.logo }}</span>
          <span class="client-name">{{ client.name }}</span>
        </div>
      </div>
    </section>

    <!-- 数据 -->
    <section class="stats">
      <div class="stat-item" v-for="(stat, i) in stats" :key="i">
        <span class="stat-value">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </section>

    <!-- 联系 -->
    <section class="contact">
      <div class="contact-content">
        <div class="contact-info">
          <h2>开始合作</h2>
          <p>如果您有项目想要咨询，欢迎随时联系我们</p>
          <div class="contact-details">
            <div class="contact-item">
              <span class="label">邮箱</span>
              <span>hello@muji.studio</span>
            </div>
            <div class="contact-item">
              <span class="label">电话</span>
              <span>010-88888888</span>
            </div>
            <div class="contact-item">
              <span class="label">地址</span>
              <span>北京市朝阳区建国路88号</span>
            </div>
          </div>
        </div>
        <form class="contact-form" @submit.prevent="submitForm">
          <input type="text" placeholder="您的姓名" v-model="form.name" required />
          <input type="email" placeholder="电子邮箱" v-model="form.email" required />
          <input type="text" placeholder="项目名称" v-model="form.project" />
          <textarea placeholder="项目描述" v-model="form.message" rows="4"></textarea>
          <button type="submit" class="submit-btn">发送消息</button>
        </form>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="brand-logo">MUJI</span>
          <span class="brand-text">Studio</span>
        </div>
        <div class="footer-links">
          <a>作品</a>
          <a>服务</a>
          <a>关于</a>
          <a>联系</a>
        </div>
        <p class="copyright">© 2024 MUJI Studio. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const navLinks = ['作品', '服务', '关于', '联系']
const activeFilter = ref(0)
const filters = ['全部', '品牌设计', 'UI设计', '网页设计']

const form = ref({
  name: '',
  email: '',
  project: '',
  message: ''
})

const services = ref([
  { title: '品牌设计', desc: '塑造独特的品牌形象', items: ['Logo设计', 'VI系统', '品牌策略', '品牌命名'] },
  { title: 'UI设计', desc: '打造优质的用户体验', items: ['网页设计', '移动应用', '后台系统', '设计系统'] },
  { title: '体验设计', desc: '以用户为中心的设计', items: ['用户研究', '交互设计', '原型设计', '可用性测试'] }
])

const works = ref([
  { title: '云端科技', category: '品牌设计', icon: '☁️', bg: '#f8f9fa', type: '品牌设计' },
  { title: '智能助手App', category: 'UI设计', icon: '📱', bg: '#e9ecef', type: 'UI设计' },
  { title: '创意工作室', category: '网页设计', icon: '🎨', bg: '#f1f3f4', type: '网页设计' },
  { title: '金融服务平台', category: 'UI设计', icon: '💰', bg: '#e8eaed', type: 'UI设计' },
  { title: '艺术画廊', category: '品牌设计', icon: '🖼️', bg: '#f5f5f5', type: '品牌设计' },
  { title: '电商平台', category: '网页设计', icon: '🛒', bg: '#eceff1', type: '网页设计' }
])

const filteredWorks = computed(() => {
  if (activeFilter.value === 0) return works.value
  return works.value.filter(w => w.type === filters[activeFilter.value])
})

const processSteps = ref([
  { title: '发现', desc: '深入了解客户需求与目标' },
  { title: '策略', desc: '制定项目方向与设计策略' },
  { title: '设计', desc: '创意设计与视觉呈现' },
  { title: '交付', desc: '最终交付与持续支持' }
])

const clients = ref([
  { logo: 'A', name: 'Alpha Tech' },
  { logo: 'B', name: 'Beta Corp' },
  { logo: 'C', name: 'Cloud Inc' },
  { logo: 'D', name: 'Delta Ltd' },
  { logo: 'E', name: 'Echo Design' },
  { logo: 'F', name: 'Future Lab' }
])

const stats = ref([
  { value: '150+', label: '完成项目' },
  { value: '50+', label: '服务客户' },
  { value: '8', label: '年经验' },
  { value: '15', label: '设计奖项' }
])

const submitForm = () => {
  alert('消息已发送，我们会尽快联系您！')
  form.value = { name: '', email: '', project: '', message: '' }
}
</script>

<style scoped>
.minimal-template {
  min-height: 100vh;
  background: #fafafa;
  color: #1a1a1a;
}

.navbar {
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.logo {
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 2px;
}

.nav-links {
  display: flex;
  gap: 40px;
}

.nav-links a {
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
}

.nav-links a:hover, .nav-links a.active {
  color: #1a1a1a;
}

.contact-btn {
  padding: 10px 24px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  font-size: 13px;
  cursor: pointer;
}

.hero {
  position: relative;
  min-height: 80vh;
  display: flex;
  align-items: center;
  padding: 80px 20px;
  overflow: hidden;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-label {
  font-size: 12px;
  letter-spacing: 4px;
  color: #999;
  text-transform: uppercase;
}

.hero h1 {
  font-size: 56px;
  font-weight: 300;
  letter-spacing: -1px;
  margin: 24px 0;
  line-height: 1.2;
}

.hero p {
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
  font-weight: 300;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn-primary {
  padding: 14px 36px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.btn-outline {
  padding: 14px 36px;
  background: transparent;
  color: #1a1a1a;
  border: 1px solid #1a1a1a;
  font-size: 14px;
  cursor: pointer;
}

.hero-visual {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.floating-block {
  position: absolute;
  background: #e0e0e0;
}

.b1 {
  width: 200px;
  height: 200px;
  top: 15%;
  right: 15%;
  animation: float1 6s ease-in-out infinite;
}

.b2 {
  width: 100px;
  height: 100px;
  top: 60%;
  right: 25%;
  background: #d0d0d0;
  animation: float2 8s ease-in-out infinite;
}

.b3 {
  width: 60px;
  height: 60px;
  top: 30%;
  right: 35%;
  background: #c0c0c0;
  animation: float3 5s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(20px) rotate(-5deg); }
}

@keyframes float3 {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

.services, .works, .process, .clients, .contact {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-label {
  font-size: 11px;
  letter-spacing: 4px;
  color: #999;
  text-transform: uppercase;
}

.section-header h2 {
  font-size: 32px;
  font-weight: 300;
  margin-top: 12px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.service-card {
  padding: 40px;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.service-card:hover {
  border-color: #1a1a1a;
}

.service-num {
  font-size: 48px;
  font-weight: 200;
  color: #e0e0e0;
}

.service-card h3 {
  font-size: 20px;
  font-weight: 400;
  margin: 16px 0 12px;
}

.service-card > p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.service-list {
  list-style: none;
  margin-bottom: 24px;
}

.service-list li {
  font-size: 13px;
  color: #666;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.service-btn {
  padding: 10px 24px;
  background: transparent;
  border: 1px solid #1a1a1a;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.service-btn:hover {
  background: #1a1a1a;
  color: #fff;
}

.works {
  background: #fff;
  max-width: none;
  padding: 100px 20px;
}

.works-filter {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 48px;
}

.works-filter span {
  font-size: 14px;
  color: #999;
  cursor: pointer;
  padding-bottom: 8px;
  border-bottom: 1px solid transparent;
}

.works-filter span.active {
  color: #1a1a1a;
  border-color: #1a1a1a;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.work-item {
  cursor: pointer;
  animation: fadeIn 0.5s ease forwards;
}

.work-image {
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.work-icon {
  font-size: 48px;
  transition: transform 0.3s;
}

.work-overlay {
  position: absolute;
  inset: 0;
  background: rgba(26, 26, 26, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.work-item:hover .work-overlay {
  opacity: 1;
}

.work-item:hover .work-icon {
  transform: scale(1.1);
}

.view-btn {
  padding: 12px 24px;
  background: #fff;
  color: #1a1a1a;
  border: none;
  font-size: 13px;
  cursor: pointer;
}

.work-info {
  padding: 20px 0;
}

.work-info h3 {
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 4px;
}

.work-info p {
  font-size: 13px;
  color: #999;
}

.works-more {
  text-align: center;
  margin-top: 48px;
}

.more-btn {
  padding: 14px 40px;
  background: transparent;
  border: 1px solid #1a1a1a;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.more-btn:hover {
  background: #1a1a1a;
  color: #fff;
}

.process-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
}

.process-step {
  text-align: center;
}

.step-num {
  width: 48px;
  height: 48px;
  background: #1a1a1a;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  margin: 0 auto 20px;
}

.process-step h3 {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 8px;
}

.process-step p {
  font-size: 14px;
  color: #666;
}

.clients-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 24px;
}

.client-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  background: #fff;
}

.client-logo {
  width: 48px;
  height: 48px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
}

.client-name {
  font-size: 12px;
  color: #999;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 100px;
  padding: 80px 20px;
  background: #1a1a1a;
  color: #fff;
}

.stat-item {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 48px;
  font-weight: 200;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.contact {
  background: #fff;
  max-width: none;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-info h2 {
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 16px;
}

.contact-info > p {
  font-size: 16px;
  color: #666;
  margin-bottom: 40px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-item .label {
  font-size: 12px;
  color: #999;
}

.contact-item span:last-child {
  font-size: 15px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-form input, .contact-form textarea {
  padding: 16px;
  border: 1px solid #e8e8e8;
  font-size: 14px;
  transition: border-color 0.2s;
}

.contact-form input:focus, .contact-form textarea:focus {
  outline: none;
  border-color: #1a1a1a;
}

.submit-btn {
  padding: 16px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
}

.footer {
  padding: 40px 20px;
  border-top: 1px solid #e8e8e8;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-brand {
  margin-bottom: 20px;
}

.brand-logo {
  font-size: 24px;
  font-weight: 600;
}

.brand-text {
  font-size: 24px;
  font-weight: 300;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 20px;
}

.footer-links a {
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.copyright {
  font-size: 12px;
  color: #999;
}
</style>