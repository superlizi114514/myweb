<template>
  <div class="fitness-template">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <span class="logo-icon">💪</span>
          <span class="logo-text">SuperFit健身</span>
        </div>
        <div class="nav-links">
          <a v-for="(link, i) in navLinks" :key="i" :class="{ active: i === 0 }">{{ link }}</a>
        </div>
        <div class="nav-right">
          <a class="phone">📞 400-888-8888</a>
          <button class="trial-btn">免费体验</button>
        </div>
      </div>
    </nav>

    <!-- 主横幅 -->
    <section class="hero">
      <div class="hero-bg">
        <div class="pulse-circle"></div>
        <div class="pulse-circle delay"></div>
      </div>
      <div class="hero-content">
        <span class="hero-tag animate-slide-down">🏆 城市最佳健身俱乐部</span>
        <h1 class="animate-slide-up">专业健身<br/>科学训练</h1>
        <p class="animate-fade-in">先进设备 · 专业教练 · 舒适环境 · 科学饮食</p>
        <div class="hero-stats animate-scale-in">
          <div class="stat">
            <span class="stat-value">5000+</span>
            <span class="stat-label">会员</span>
          </div>
          <div class="stat">
            <span class="stat-value">50+</span>
            <span class="stat-label">课程</span>
          </div>
          <div class="stat">
            <span class="stat-value">30+</span>
            <span class="stat-label">教练</span>
          </div>
        </div>
        <div class="hero-buttons animate-scale-in">
          <button class="btn-primary" @click="showBooking = true">预约体验</button>
          <button class="btn-outline">了解更多</button>
        </div>
      </div>
    </section>

    <!-- 课程时间表 -->
    <section class="schedule">
      <div class="schedule-header">
        <h2>📅 今日课程</h2>
        <div class="date-selector">
          <span v-for="(day, i) in weekDays" :key="i"
                :class="{ active: selectedDay === i }"
                @click="selectedDay = i">
            {{ day }}
          </span>
        </div>
      </div>
      <div class="schedule-grid">
        <div v-for="(cls, i) in todayClasses" :key="i" class="class-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="class-time">
            <span class="time">{{ cls.time }}</span>
            <span class="duration">{{ cls.duration }}</span>
          </div>
          <div class="class-info">
            <h3>{{ cls.name }}</h3>
            <p class="instructor">教练：{{ cls.instructor }}</p>
            <div class="class-meta">
              <span class="level" :style="{ background: cls.levelColor }">{{ cls.level }}</span>
              <span class="spots">剩余{{ cls.spots }}位</span>
            </div>
          </div>
          <button class="book-btn" :disabled="cls.spots === 0" @click="bookClass(cls)">
            {{ cls.spots > 0 ? '预约' : '已满' }}
          </button>
        </div>
      </div>
    </section>

    <!-- 课程体系 -->
    <section class="programs">
      <div class="section-header">
        <h2>🎯 课程体系</h2>
        <a class="more-link">查看全部 ></a>
      </div>
      <div class="program-grid">
        <div v-for="(prog, i) in programs" :key="i" class="program-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="prog-icon" :style="{ background: prog.bg }">{{ prog.icon }}</div>
          <h3>{{ prog.name }}</h3>
          <p>{{ prog.desc }}</p>
          <div class="prog-meta">
            <span>{{ prog.duration }}</span>
            <span>{{ prog.calories }}卡/课时</span>
          </div>
          <button class="learn-btn">了解详情</button>
        </div>
      </div>
    </section>

    <!-- 教练团队 -->
    <section class="trainers">
      <div class="section-header">
        <h2>⭐ 明星教练</h2>
        <a class="more-link">全部教练 ></a>
      </div>
      <div class="trainers-grid">
        <div v-for="(trainer, i) in trainers" :key="i" class="trainer-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="trainer-avatar">{{ trainer.avatar }}</div>
          <div class="trainer-info">
            <h3>{{ trainer.name }}</h3>
            <p class="title">{{ trainer.title }}</p>
            <p class="spec">擅长：{{ trainer.spec }}</p>
            <div class="trainer-stats">
              <span>学员 {{ trainer.students }}+</span>
              <span>评分 {{ trainer.rating }}</span>
            </div>
            <button class="appoint-btn">预约私教</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 会员套餐 -->
    <section class="pricing">
      <div class="section-header center">
        <h2>💰 会员套餐</h2>
        <p>选择适合你的健身方案</p>
      </div>
      <div class="pricing-grid">
        <div v-for="(plan, i) in pricing" :key="i" class="pricing-card" :class="{ popular: plan.popular }" :style="{ animationDelay: i * 0.15 + 's' }">
          <div class="plan-badge" v-if="plan.popular">最受欢迎</div>
          <h3>{{ plan.name }}</h3>
          <div class="price">
            <span class="amount">¥{{ plan.price }}</span>
            <span class="period">/{{ plan.period }}</span>
          </div>
          <ul class="features-list">
            <li v-for="(f, j) in plan.features" :key="j" :class="{ check: f.included }">
              {{ f.included ? '✓' : '✗' }} {{ f.name }}
            </li>
          </ul>
          <button class="buy-btn" :class="{ primary: plan.popular }">立即购买</button>
        </div>
      </div>
    </section>

    <!-- 环境展示 -->
    <section class="gallery">
      <h2>🏠 场馆环境</h2>
      <div class="gallery-grid">
        <div v-for="(item, i) in gallery" :key="i" class="gallery-item" :style="{ background: item.bg }">
          <span class="gallery-icon">{{ item.icon }}</span>
          <span class="gallery-name">{{ item.name }}</span>
        </div>
      </div>
    </section>

    <!-- 用户评价 -->
    <section class="reviews">
      <h2>💬 会员评价</h2>
      <div class="reviews-slider">
        <div v-for="(review, i) in reviews" :key="i" class="review-card">
          <div class="review-header">
            <span class="review-avatar">{{ review.avatar }}</span>
            <div>
              <span class="review-name">{{ review.name }}</span>
              <span class="review-rating">⭐ {{ review.rating }}</span>
            </div>
          </div>
          <p class="review-content">"{{ review.content }}"</p>
          <span class="review-date">{{ review.date }}</span>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-info">
          <div class="footer-brand">💪 SuperFit健身</div>
          <p>营业时间：6:00 - 23:00</p>
          <p>地址：城市中心广场3楼</p>
          <p>电话：400-888-8888</p>
        </div>
        <div class="footer-links">
          <a>关于我们</a>
          <a>课程介绍</a>
          <a>教练团队</a>
          <a>常见问题</a>
        </div>
        <div class="footer-qr">
          <div class="qr-placeholder">📱</div>
          <p>扫码预约体验</p>
        </div>
      </div>
      <p class="copyright">© 2024 SuperFit健身 版权所有</p>
    </footer>

    <!-- 预约弹窗 -->
    <div class="modal" v-if="showBooking" @click.self="showBooking = false">
      <div class="modal-content">
        <h3>预约免费体验</h3>
        <form @submit.prevent="submitBooking">
          <input type="text" placeholder="您的姓名" v-model="booking.name" required />
          <input type="tel" placeholder="联系电话" v-model="booking.phone" required />
          <select v-model="booking.type">
            <option value="">选择体验项目</option>
            <option>器械训练</option>
            <option>瑜伽课程</option>
            <option>动感单车</option>
            <option>拳击训练</option>
          </select>
          <input type="date" v-model="booking.date" required />
          <button type="submit" class="submit-btn">确认预约</button>
        </form>
        <button class="close-btn" @click="showBooking = false">×</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navLinks = ['首页', '课程', '教练', '价格', '环境', '关于']
const selectedDay = ref(0)
const showBooking = ref(false)

const weekDays = ['今天', '明天', '周三', '周四', '周五', '周六', '周日']

const booking = ref({
  name: '',
  phone: '',
  type: '',
  date: ''
})

const todayClasses = ref([
  { time: '07:00', duration: '60分钟', name: '晨间瑜伽', instructor: '李老师', level: '入门', levelColor: '#52c41a', spots: 5 },
  { time: '09:00', duration: '45分钟', name: '动感单车', instructor: '王教练', level: '中级', levelColor: '#faad14', spots: 3 },
  { time: '10:30', duration: '50分钟', name: '普拉提', instructor: '张老师', level: '入门', levelColor: '#52c41a', spots: 8 },
  { time: '14:00', duration: '60分钟', name: '力量训练', instructor: '陈教练', level: '高级', levelColor: '#f5222d', spots: 2 },
  { time: '16:00', duration: '45分钟', name: '有氧搏击', instructor: '刘教练', level: '中级', levelColor: '#faad14', spots: 6 },
  { time: '19:00', duration: '50分钟', name: '拉丁舞', instructor: '赵老师', level: '入门', levelColor: '#52c41a', spots: 0 }
])

const bookClass = (cls) => {
  alert(`已预约：${cls.name} ${cls.time}`)
}

const programs = ref([
  { icon: '🏃', name: '有氧训练', desc: '燃脂塑形，提升心肺功能', duration: '45分钟', calories: 500, bg: '#e74c3c' },
  { icon: '💪', name: '力量训练', desc: '增肌塑形，打造完美身材', duration: '60分钟', calories: 400, bg: '#f39c12' },
  { icon: '🧘', name: '瑜伽课程', desc: '身心放松，提升柔韧性', duration: '50分钟', calories: 200, bg: '#9b59b6' },
  { icon: '🚴', name: '动感单车', desc: '高效燃脂，释放压力', duration: '40分钟', calories: 450, bg: '#27ae60' }
])

const trainers = ref([
  { avatar: '👨', name: '张伟', title: '高级私人教练', spec: '增肌减脂', students: 350, rating: 4.9 },
  { avatar: '👩', name: '李娜', title: '瑜伽导师', spec: '瑜伽普拉提', students: 280, rating: 4.8 },
  { avatar: '🧑', name: '王强', title: '体能教练', spec: '功能性训练', students: 420, rating: 4.9 },
  { avatar: '👨', name: '刘洋', title: '搏击教练', spec: '拳击散打', students: 200, rating: 4.7 }
])

const pricing = ref([
  {
    name: '月卡', price: 299, period: '月', popular: false,
    features: [
      { name: '器械使用', included: true },
      { name: '团课不限', included: true },
      { name: '更衣柜', included: true },
      { name: '私教课程', included: false },
      { name: '营养指导', included: false }
    ]
  },
  {
    name: '季卡', price: 699, period: '季', popular: true,
    features: [
      { name: '器械使用', included: true },
      { name: '团课不限', included: true },
      { name: '更衣柜', included: true },
      { name: '私教2节', included: true },
      { name: '营养指导', included: true }
    ]
  },
  {
    name: '年卡', price: 1999, period: '年', popular: false,
    features: [
      { name: '器械使用', included: true },
      { name: '团课不限', included: true },
      { name: '专属衣柜', included: true },
      { name: '私教10节', included: true },
      { name: '营养指导', included: true }
    ]
  }
])

const gallery = ref([
  { icon: '🏋️', name: '器械区', bg: 'linear-gradient(135deg, #2c3e50, #3498db)' },
  { icon: '🏃', name: '有氧区', bg: 'linear-gradient(135deg, #e74c3c, #c0392b)' },
  { icon: '🧘', name: '瑜伽室', bg: 'linear-gradient(135deg, #9b59b6, #8e44ad)' },
  { icon: '🚴', name: '单车房', bg: 'linear-gradient(135deg, #27ae60, #2ecc71)' },
  { icon: '🏊', name: '游泳区', bg: 'linear-gradient(135deg, #3498db, #2980b9)' },
  { icon: '🧖', name: '休息区', bg: 'linear-gradient(135deg, #f39c12, #e67e22)' }
])

const reviews = ref([
  { avatar: '👨', name: '张先生', rating: 4.9, content: '教练非常专业，设备也很齐全，环境干净整洁，强烈推荐！', date: '2024-01-15' },
  { avatar: '👩', name: '李女士', rating: 4.8, content: '瑜伽课氛围很好，老师很有耐心，每次来都很放松。', date: '2024-01-12' },
  { avatar: '🧑', name: '王先生', rating: 5.0, content: '三个月减重15斤，感谢教练的指导，继续坚持！', date: '2024-01-10' }
])

const submitBooking = () => {
  alert(`预约成功！我们将尽快联系您。`)
  showBooking.value = false
  booking.value = { name: '', phone: '', type: '', date: '' }
}
</script>

<style scoped>
.fitness-template {
  min-height: 100vh;
  background: #f5f5f5;
  color: #333;
}

.navbar {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
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
  font-size: 20px;
  font-weight: 700;
  color: #e74c3c;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  font-size: 15px;
  color: #333;
  cursor: pointer;
}

.nav-links a:hover, .nav-links a.active {
  color: #e74c3c;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.phone {
  font-size: 14px;
  color: #666;
}

.trial-btn {
  padding: 8px 20px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.hero {
  position: relative;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 80px 20px;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
}

.pulse-circle {
  position: absolute;
  width: 400px;
  height: 400px;
  border: 2px solid rgba(231, 76, 60, 0.3);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 3s ease-out infinite;
}

.pulse-circle.delay {
  animation-delay: 1.5s;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.hero-tag {
  display: inline-block;
  padding: 8px 20px;
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: 48px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 16px;
  line-height: 1.2;
}

.hero p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 32px;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-bottom: 32px;
}

.stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 36px;
  font-weight: 700;
  color: #e74c3c;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn-primary, .btn-outline {
  padding: 14px 40px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
}

.btn-primary {
  background: #e74c3c;
  color: #fff;
  border: none;
}

.btn-outline {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.animate-slide-down { animation: slideDown 0.5s ease forwards; }
.animate-slide-up { animation: slideUp 0.5s ease forwards; animation-delay: 0.2s; opacity: 0; }
.animate-fade-in { animation: fadeIn 0.5s ease forwards; animation-delay: 0.4s; opacity: 0; }
.animate-scale-in { animation: scaleIn 0.5s ease forwards; animation-delay: 0.6s; opacity: 0; }

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
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

.schedule, .programs, .trainers, .pricing, .gallery, .reviews {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.schedule-header, .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header.center {
  flex-direction: column;
  text-align: center;
}

.section-header.center p {
  color: #666;
  margin-top: 8px;
}

.section-header h2 {
  font-size: 22px;
  font-weight: 600;
}

.more-link {
  font-size: 14px;
  color: #e74c3c;
  cursor: pointer;
}

.date-selector {
  display: flex;
  gap: 8px;
}

.date-selector span {
  padding: 8px 16px;
  background: #f5f5f5;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
}

.date-selector span.active {
  background: #e74c3c;
  color: #fff;
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.class-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  animation: fadeIn 0.3s ease forwards;
}

.class-time {
  text-align: center;
  min-width: 60px;
}

.class-time .time {
  display: block;
  font-size: 18px;
  font-weight: 600;
}

.class-time .duration {
  font-size: 11px;
  color: #999;
}

.class-info {
  flex: 1;
}

.class-info h3 {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 4px;
}

.instructor {
  font-size: 12px;
  color: #999;
  margin-bottom: 6px;
}

.class-meta {
  display: flex;
  gap: 10px;
}

.level {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
  color: #fff;
}

.spots {
  font-size: 11px;
  color: #e74c3c;
}

.book-btn {
  padding: 8px 16px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.book-btn:disabled {
  background: #ddd;
  color: #999;
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.program-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  animation: fadeIn 0.3s ease forwards;
}

.prog-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin: 0 auto 16px;
}

.program-card h3 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
}

.program-card p {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}

.prog-meta {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 12px;
  color: #999;
  margin-bottom: 16px;
}

.learn-btn {
  padding: 8px 24px;
  background: transparent;
  border: 1px solid #e74c3c;
  color: #e74c3c;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.trainers {
  background: #fff;
  padding: 40px 20px;
  max-width: none;
}

.trainers-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.trainer-card {
  text-align: center;
  animation: fadeIn 0.3s ease forwards;
}

.trainer-avatar {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin: 0 auto 16px;
}

.trainer-info h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.trainer-info .title {
  font-size: 13px;
  color: #e74c3c;
  margin-bottom: 4px;
}

.trainer-info .spec {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.trainer-stats {
  display: flex;
  justify-content: center;
  gap: 16px;
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
}

.appoint-btn {
  padding: 8px 24px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.pricing-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px 24px;
  text-align: center;
  position: relative;
  animation: fadeIn 0.3s ease forwards;
}

.pricing-card.popular {
  border: 2px solid #e74c3c;
  transform: scale(1.05);
}

.plan-badge {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  padding: 6px 20px;
  background: #e74c3c;
  color: #fff;
  border-radius: 20px;
  font-size: 12px;
}

.pricing-card h3 {
  font-size: 20px;
  margin-bottom: 16px;
}

.price {
  margin-bottom: 24px;
}

.price .amount {
  font-size: 36px;
  font-weight: 700;
  color: #e74c3c;
}

.price .period {
  font-size: 14px;
  color: #999;
}

.features-list {
  list-style: none;
  text-align: left;
  margin-bottom: 24px;
}

.features-list li {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  color: #666;
}

.features-list li.check {
  color: #333;
}

.buy-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
}

.buy-btn.primary {
  background: #e74c3c;
  color: #fff;
  border: none;
}

.gallery h2, .reviews h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.gallery-item {
  height: 120px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.gallery-name {
  font-size: 12px;
  color: #fff;
}

.reviews-slider {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.review-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
}

.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.review-avatar {
  font-size: 32px;
}

.review-name {
  display: block;
  font-size: 14px;
  font-weight: 500;
}

.review-rating {
  font-size: 12px;
  color: #f5a623;
}

.review-content {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin-bottom: 12px;
}

.review-date {
  font-size: 12px;
  color: #999;
}

.footer {
  background: #1a1a1a;
  color: #fff;
  padding: 60px 20px 30px;
}

.footer-main {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto 40px;
}

.footer-brand {
  font-size: 20px;
  font-weight: 600;
  color: #e74c3c;
  margin-bottom: 16px;
}

.footer-info p, .footer-links a {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
}

.footer-links a {
  display: block;
  cursor: pointer;
}

.footer-links a:hover {
  color: #e74c3c;
}

.qr-placeholder {
  width: 100px;
  height: 100px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin-bottom: 8px;
}

.footer-qr p {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
}

.copyright {
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
}

.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  width: 400px;
  position: relative;
}

.modal-content h3 {
  font-size: 20px;
  margin-bottom: 24px;
  text-align: center;
}

.modal-content form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.modal-content input, .modal-content select {
  padding: 12px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  font-size: 14px;
}

.submit-btn {
  padding: 12px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
}
</style>