<template>
  <div class="corporate-template">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <span class="logo-icon">◈</span>
          <span class="logo-text">智领科技</span>
        </div>
        <div class="nav-menu">
          <a v-for="(item, i) in navItems" :key="i" :class="{ active: i === 0 }">{{ item }}</a>
        </div>
        <button class="cta-btn">免费咨询</button>
      </div>
    </nav>

    <!-- 主视觉区 -->
    <section class="hero">
      <div class="hero-visual">
        <div class="grid-bg"></div>
        <div class="glow-orb orb-1"></div>
        <div class="glow-orb orb-2"></div>
      </div>
      <div class="hero-content">
        <div class="hero-badge animate-slide-down">企业级解决方案提供商</div>
        <h1 class="animate-slide-up">
          <span class="line1">数字化转型</span>
          <span class="line2">技术服务商</span>
        </h1>
        <p class="animate-fade-in">为企业提供软件开发、系统集成、技术咨询等一站式服务</p>
        <div class="hero-buttons animate-scale-in">
          <button class="btn-primary" @click="showConsult = true">免费咨询</button>
          <button class="btn-outline">查看案例</button>
        </div>
      </div>
      <div class="hero-stats animate-slide-up">
        <div class="stat" v-for="(stat, i) in stats" :key="i">
          <span class="stat-value">{{ stat.value }}</span>
          <span class="stat-label">{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <!-- 合作伙伴 -->
    <section class="partners">
      <p>信赖我们的企业</p>
      <div class="partner-logos">
        <span v-for="(p, i) in partners" :key="i" class="partner-logo">{{ p }}</span>
      </div>
    </section>

    <!-- 核心服务 -->
    <section class="services">
      <div class="section-header">
        <span class="section-label">Services</span>
        <h2>核心服务</h2>
        <p>全方位的技术解决方案，助力企业数字化升级</p>
      </div>
      <div class="services-grid">
        <div v-for="(service, i) in services" :key="i" class="service-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="service-icon">{{ service.icon }}</div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.desc }}</p>
          <ul class="service-features">
            <li v-for="(f, j) in service.features" :key="j">{{ f }}</li>
          </ul>
          <button class="service-btn">了解详情</button>
        </div>
      </div>
    </section>

    <!-- 解决方案 -->
    <section class="solutions">
      <div class="section-header">
        <span class="section-label">Solutions</span>
        <h2>行业解决方案</h2>
      </div>
      <div class="solutions-grid">
        <div v-for="(sol, i) in solutions" :key="i" class="solution-card" :style="{ background: sol.bg }">
          <span class="sol-icon">{{ sol.icon }}</span>
          <h3>{{ sol.title }}</h3>
          <p>{{ sol.desc }}</p>
          <a class="sol-link">查看方案 →</a>
        </div>
      </div>
    </section>

    <!-- 成功案例 -->
    <section class="cases">
      <div class="section-header">
        <span class="section-label">Cases</span>
        <h2>成功案例</h2>
      </div>
      <div class="cases-grid">
        <div v-for="(c, i) in cases" :key="i" class="case-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="case-header" :style="{ background: c.bg }">
            <span class="case-icon">{{ c.icon }}</span>
          </div>
          <div class="case-body">
            <span class="case-industry">{{ c.industry }}</span>
            <h3>{{ c.title }}</h3>
            <p>{{ c.desc }}</p>
            <div class="case-results">
              <div v-for="(r, j) in c.results" :key="j" class="result-item">
                <span class="result-value">{{ r.value }}</span>
                <span class="result-label">{{ r.label }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section class="tech-stack">
      <div class="section-header">
        <span class="section-label">Tech Stack</span>
        <h2>技术能力</h2>
      </div>
      <div class="tech-grid">
        <div v-for="(tech, i) in techStack" :key="i" class="tech-item">
          <span class="tech-icon">{{ tech.icon }}</span>
          <span class="tech-name">{{ tech.name }}</span>
        </div>
      </div>
    </section>

    <!-- 关于我们 -->
    <section class="about">
      <div class="about-content">
        <div class="about-text">
          <span class="section-label">About Us</span>
          <h2>关于智领科技</h2>
          <p>智领科技成立于2018年，是一家专注于企业数字化转型的技术服务公司。我们拥有50+技术工程师，服务超过200家企业客户，覆盖金融、制造、零售、医疗等多个行业。</p>
          <div class="about-features">
            <div class="feature" v-for="(f, i) in features" :key="i">
              <span class="check">✓</span>
              <span>{{ f }}</span>
            </div>
          </div>
          <button class="about-btn">了解更多</button>
        </div>
        <div class="about-visual">
          <div class="visual-card">
            <div class="visual-stat" v-for="(s, i) in visualStats" :key="i">
              <span class="visual-value">{{ s.value }}</span>
              <span class="visual-label">{{ s.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 团队 -->
    <section class="team">
      <div class="section-header">
        <span class="section-label">Team</span>
        <h2>核心团队</h2>
      </div>
      <div class="team-grid">
        <div v-for="(member, i) in team" :key="i" class="team-card">
          <div class="member-avatar">{{ member.avatar }}</div>
          <h3>{{ member.name }}</h3>
          <p class="member-role">{{ member.role }}</p>
          <p class="member-desc">{{ member.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-info">
          <div class="footer-brand">
            <span class="brand-icon">◈</span>
            <span>智领科技</span>
          </div>
          <p>专业的企业数字化转型服务商</p>
          <div class="footer-contact">
            <p>📞 400-000-0000</p>
            <p>📧 contact@zhiling.tech</p>
            <p>📍 北京市海淀区中关村科技园</p>
          </div>
        </div>
        <div class="footer-links">
          <div class="link-group" v-for="(group, i) in footerGroups" :key="i">
            <h4>{{ group.title }}</h4>
            <a v-for="(link, j) in group.links" :key="j">{{ link }}</a>
          </div>
        </div>
      </div>
      <p class="copyright">© 2024 智领科技 版权所有 | 京ICP备00000000号</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navItems = ['首页', '服务', '案例', '关于', '联系']
const showConsult = ref(false)

const stats = ref([
  { value: '200+', label: '服务客户' },
  { value: '50+', label: '技术团队' },
  { value: '98%', label: '客户满意度' },
  { value: '5年', label: '行业经验' }
])

const partners = ref(['华为', '阿里', '腾讯', '百度', '京东', '字节'])

const services = ref([
  { icon: '💻', title: '软件开发', desc: '定制化软件开发，满足企业个性化需求', features: ['需求分析', '架构设计', '开发测试', '运维支持'] },
  { icon: '🔗', title: '系统集成', desc: '打通企业各系统，实现数据互联互通', features: ['数据对接', '流程优化', '平台整合', '统一门户'] },
  { icon: '📊', title: '数据分析', desc: '数据采集、清洗、可视化一站式服务', features: ['数据采集', '数据治理', '可视化大屏', 'BI报表'] },
  { icon: '☁️', title: '云服务', desc: '云架构设计、迁移、运维全流程支持', features: ['云架构设计', '系统迁移', '云原生改造', '运维托管'] },
  { icon: '🔒', title: '安全服务', desc: '网络安全评估、防护体系建设', features: ['安全评估', '渗透测试', '安全加固', '应急响应'] },
  { icon: '🛠️', title: '技术支持', desc: '7×24小时技术支持，快速响应', features: ['技术咨询', '故障处理', '性能优化', '驻场服务'] }
])

const solutions = ref([
  { icon: '🏦', title: '金融科技', desc: '数字银行、智能风控、支付系统', bg: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
  { icon: '🏭', title: '智能制造', desc: 'MES系统、工业物联网、数字工厂', bg: 'linear-gradient(135deg, #0f3460, #16213e)' },
  { icon: '🛒', title: '新零售', desc: '电商系统、会员营销、供应链管理', bg: 'linear-gradient(135deg, #2c3e50, #3498db)' },
  { icon: '🏥', title: '医疗健康', desc: 'HIS系统、远程医疗、健康管理', bg: 'linear-gradient(135deg, #27ae60, #2ecc71)' }
])

const cases = ref([
  { icon: '🏦', industry: '金融', title: '某银行数字化转型项目', desc: '为客户提供完整的数字化银行解决方案，实现业务线上化、智能化。', bg: 'linear-gradient(135deg, #1a1a2e, #16213e)', results: [{ value: '60%', label: '效率提升' }, { value: '40%', label: '成本降低' }] },
  { icon: '🏭', industry: '制造', title: '某汽车厂商MES系统', desc: '打造智能化生产管理系统，实现生产过程可视化和质量追溯。', bg: 'linear-gradient(135deg, #0f3460, #16213e)', results: [{ value: '30%', label: '产能提升' }, { value: '50%', label: '缺陷降低' }] },
  { icon: '🛒', industry: '零售', title: '某连锁品牌电商系统', desc: '构建全渠道零售平台，打通线上线下业务闭环。', bg: 'linear-gradient(135deg, #2c3e50, #3498db)', results: [{ value: '200%', label: '销售增长' }, { value: '80%', label: '复购提升' }] }
])

const techStack = ref([
  { icon: '⚛️', name: 'React/Vue' },
  { icon: '🟢', name: 'Node.js' },
  { icon: '☕', name: 'Java' },
  { icon: '🐍', name: 'Python' },
  { icon: '🔷', name: 'Go' },
  { icon: '🗄️', name: 'MySQL' },
  { icon: '🍃', name: 'MongoDB' },
  { icon: '🔴', name: 'Redis' },
  { icon: '🐳', name: 'Docker' },
  { icon: '☸️', name: 'K8s' },
  { icon: '☁️', name: 'AWS/阿里云' },
  { icon: '📡', name: '微服务' }
])

const features = ref(['K8s原生支持', '自动运维', '按量计费', '7×24技术支持'])

const visualStats = ref([
  { value: '50+', label: '技术专家' },
  { value: '200+', label: '成功案例' },
  { value: '98%', label: '满意度' }
])

const team = ref([
  { avatar: '👨‍💼', name: '张明', role: '创始人 & CEO', desc: '前阿里技术总监，15年技术管理经验' },
  { avatar: '👨‍💻', name: '李强', role: 'CTO', desc: '前华为架构师，专注分布式系统' },
  { avatar: '👩‍💼', name: '王芳', role: '产品总监', desc: '10年产品经验，擅长企业服务' }
])

const footerGroups = ref([
  { title: '服务项目', links: ['软件开发', '系统集成', '数据分析', '云服务'] },
  { title: '解决方案', links: ['金融科技', '智能制造', '新零售', '医疗健康'] },
  { title: '关于我们', links: ['公司介绍', '团队成员', '发展历程', '加入我们'] }
])
</script>

<style scoped>
.corporate-template {
  min-height: 100vh;
  background: #030712;
  color: #fff;
}

.navbar {
  background: rgba(3, 7, 18, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
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
  color: #60a5fa;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  gap: 40px;
}

.nav-menu a {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: color 0.3s;
}

.nav-menu a:hover, .nav-menu a.active {
  color: #60a5fa;
}

.cta-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.hero {
  position: relative;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  overflow: hidden;
}

.hero-visual {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridMove 20s linear infinite;
}

@keyframes gridMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: rgba(59, 130, 246, 0.15);
  top: 10%;
  left: 10%;
}

.orb-2 {
  width: 300px;
  height: 300px;
  background: rgba(139, 92, 246, 0.15);
  bottom: 20%;
  right: 10%;
}

.hero-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-block;
  padding: 10px 24px;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 30px;
  font-size: 14px;
  color: #60a5fa;
  margin-bottom: 30px;
}

.hero h1 {
  margin-bottom: 20px;
}

.hero h1 .line1, .hero h1 .line2 {
  display: block;
  font-size: 52px;
  font-weight: 800;
  line-height: 1.2;
  background: linear-gradient(135deg, #fff, #93c5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 40px;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 60px;
}

.btn-primary, .btn-outline {
  padding: 14px 32px;
  font-size: 15px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  border: none;
}

.btn-outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
}

.hero-stats {
  display: flex;
  gap: 60px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 32px;
  font-weight: 700;
  color: #60a5fa;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.animate-slide-down { animation: slideDown 0.6s ease forwards; }
.animate-slide-up { animation: slideUp 0.6s ease forwards; opacity: 0; animation-delay: 0.2s; }
.animate-fade-in { animation: fadeIn 0.6s ease forwards; opacity: 0; animation-delay: 0.4s; }
.animate-scale-in { animation: scaleIn 0.5s ease forwards; opacity: 0; animation-delay: 0.6s; }

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

.partners {
  padding: 40px 20px;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
}

.partners p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
}

.partner-logos {
  display: flex;
  justify-content: center;
  gap: 60px;
}

.partner-logo {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.3);
}

.services, .solutions, .cases, .tech-stack, .about, .team {
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-label {
  font-size: 12px;
  letter-spacing: 4px;
  color: #60a5fa;
}

.section-header h2 {
  font-size: 32px;
  font-weight: 700;
  margin: 12px 0;
}

.section-header p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.service-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 32px;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.service-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
}

.service-icon {
  font-size: 36px;
  margin-bottom: 20px;
}

.service-card h3 {
  font-size: 18px;
  margin-bottom: 12px;
}

.service-card > p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
}

.service-features {
  list-style: none;
  margin-bottom: 20px;
}

.service-features li {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  padding: 6px 0;
}

.service-btn {
  padding: 8px 20px;
  background: transparent;
  border: 1px solid rgba(59, 130, 246, 0.5);
  color: #60a5fa;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.solutions {
  background: rgba(0, 0, 0, 0.3);
  max-width: none;
  padding: 100px 20px;
}

.solutions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.solution-card {
  border-radius: 16px;
  padding: 32px;
  cursor: pointer;
  transition: transform 0.3s;
}

.solution-card:hover {
  transform: translateY(-8px);
}

.sol-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.solution-card h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.solution-card p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
}

.sol-link {
  font-size: 13px;
  color: #60a5fa;
}

.cases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.case-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.case-header {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.case-icon {
  font-size: 48px;
}

.case-body {
  padding: 24px;
}

.case-industry {
  font-size: 12px;
  color: #60a5fa;
  margin-bottom: 8px;
}

.case-body h3 {
  font-size: 16px;
  margin-bottom: 8px;
}

.case-body > p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
}

.case-results {
  display: flex;
  gap: 24px;
}

.result-value {
  display: block;
  font-size: 20px;
  font-weight: 600;
  color: #60a5fa;
}

.result-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.tech-stack {
  background: rgba(0, 0, 0, 0.3);
  max-width: none;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
}

.tech-icon {
  font-size: 28px;
}

.tech-name {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.about-text h2 {
  font-size: 32px;
  margin: 12px 0 20px;
}

.about-text > p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
  margin-bottom: 24px;
}

.about-features {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  font-size: 13px;
}

.check {
  color: #22c55e;
}

.about-btn {
  padding: 12px 32px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
}

.visual-card {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 40px;
  display: flex;
  justify-content: space-around;
}

.visual-stat {
  text-align: center;
}

.visual-value {
  display: block;
  font-size: 36px;
  font-weight: 700;
  color: #60a5fa;
}

.visual-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.team-card {
  text-align: center;
  padding: 32px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
}

.member-avatar {
  font-size: 56px;
  margin-bottom: 16px;
}

.team-card h3 {
  font-size: 18px;
  margin-bottom: 4px;
}

.member-role {
  font-size: 13px;
  color: #60a5fa;
  margin-bottom: 12px;
}

.member-desc {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

.footer {
  background: #0a0a0f;
  padding: 60px 20px 30px;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto 40px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 600;
  color: #60a5fa;
  margin-bottom: 12px;
}

.brand-icon {
  font-size: 24px;
}

.footer-info p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
}

.footer-contact {
  margin-top: 20px;
}

.footer-contact p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
}

.footer-links {
  display: flex;
  gap: 80px;
}

.link-group h4 {
  font-size: 14px;
  margin-bottom: 16px;
}

.link-group a {
  display: block;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 10px;
  cursor: pointer;
}

.link-group a:hover {
  color: #60a5fa;
}

.copyright {
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.3);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
}
</style>