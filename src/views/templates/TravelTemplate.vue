<template>
  <div class="travel-template">
    <!-- 顶部导航 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo">
          <span class="logo-icon">✈️</span>
          <span class="logo-text">携程旅行</span>
        </div>
        <div class="nav-links">
          <a v-for="(link, i) in navLinks" :key="i" :class="{ active: i === 0 }">{{ link }}</a>
        </div>
        <div class="nav-right">
          <span class="nav-phone">📞 400-888-8888</span>
          <a class="login-link">登录</a>
          <a class="register-link">注册</a>
        </div>
      </div>
    </nav>

    <!-- 主横幅 -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <h1>发现你的下一次旅行</h1>
        <p>全球精选酒店、机票、景点门票，一站式预订</p>

        <!-- 搜索框 -->
        <div class="search-panel">
          <div class="search-tabs">
            <span v-for="(tab, i) in searchTabs" :key="i"
                  :class="{ active: activeTab === i }"
                  @click="activeTab = i">
              {{ tab.icon }} {{ tab.name }}
            </span>
          </div>
          <div class="search-form">
            <div class="search-row">
              <div class="search-item large">
                <label>出发城市</label>
                <input type="text" v-model="search.from" placeholder="请输入出发城市" />
              </div>
              <div class="swap-btn" @click="swapCity">⇄</div>
              <div class="search-item large">
                <label>目的城市</label>
                <input type="text" v-model="search.to" placeholder="请输入目的城市" />
              </div>
              <div class="search-item">
                <label>出发日期</label>
                <input type="date" v-model="search.date" />
              </div>
              <div class="search-item" v-if="activeTab !== 2">
                <label>返回日期</label>
                <input type="date" v-model="search.returnDate" />
              </div>
              <button class="search-btn">搜索</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 快捷入口 -->
    <section class="quick-entry">
      <div class="entry-grid">
        <div v-for="(entry, i) in quickEntries" :key="i" class="entry-item" @click="goEntry(entry)">
          <span class="entry-icon">{{ entry.icon }}</span>
          <span class="entry-name">{{ entry.name }}</span>
        </div>
      </div>
    </section>

    <!-- 特惠推荐 -->
    <section class="deals">
      <div class="section-header">
        <h2>🔥 限时特惠</h2>
        <a class="more-link">更多优惠 ></a>
      </div>
      <div class="deals-grid">
        <div v-for="(deal, i) in deals" :key="i" class="deal-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="deal-image" :style="{ background: deal.bg }">
            <span class="deal-emoji">{{ deal.emoji }}</span>
            <span class="deal-tag" v-if="deal.tag">{{ deal.tag }}</span>
          </div>
          <div class="deal-info">
            <h3>{{ deal.title }}</h3>
            <p class="deal-desc">{{ deal.desc }}</p>
            <div class="deal-price">
              <span class="current">¥{{ deal.price }}</span>
              <span class="original">¥{{ deal.original }}</span>
            </div>
            <div class="deal-meta">
              <span>{{ deal.sales }}人已购</span>
              <span class="countdown">{{ deal.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门目的地 -->
    <section class="destinations">
      <div class="section-header">
        <h2>🗺️ 热门目的地</h2>
        <div class="dest-tabs">
          <span v-for="(tab, i) in destTabs" :key="i"
                :class="{ active: activeDest === i }"
                @click="activeDest = i">
            {{ tab }}
          </span>
        </div>
      </div>
      <div class="dest-grid">
        <div v-for="(dest, i) in destinations" :key="i" class="dest-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="dest-image" :style="{ background: dest.bg }">
            <span class="dest-emoji">{{ dest.emoji }}</span>
          </div>
          <div class="dest-info">
            <h3>{{ dest.name }}</h3>
            <p>{{ dest.country }}</p>
            <div class="dest-meta">
              <span class="rating">⭐ {{ dest.rating }}</span>
              <span class="price">¥{{ dest.price }}起</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 精选酒店 -->
    <section class="hotels">
      <div class="section-header">
        <h2>🏨 精选酒店</h2>
        <a class="more-link">查看全部 ></a>
      </div>
      <div class="hotel-grid">
        <div v-for="(hotel, i) in hotels" :key="i" class="hotel-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="hotel-image" :style="{ background: hotel.bg }">
            <span class="hotel-emoji">{{ hotel.emoji }}</span>
            <div class="hotel-tags">
              <span v-for="(tag, ti) in hotel.tags" :key="ti">{{ tag }}</span>
            </div>
          </div>
          <div class="hotel-info">
            <h3>{{ hotel.name }}</h3>
            <p class="hotel-location">📍 {{ hotel.location }}</p>
            <div class="hotel-features">
              <span v-for="(f, fi) in hotel.features" :key="fi">{{ f }}</span>
            </div>
            <div class="hotel-footer">
              <div class="hotel-rating">
                <span class="score">{{ hotel.score }}</span>
                <span class="reviews">{{ hotel.reviews }}条评价</span>
              </div>
              <div class="hotel-price">
                <span class="label">起</span>
                <span class="amount">¥{{ hotel.price }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务保障 -->
    <section class="services">
      <div class="service-item" v-for="(s, i) in services" :key="i">
        <span class="service-icon">{{ s.icon }}</span>
        <div class="service-info">
          <span class="service-title">{{ s.title }}</span>
          <span class="service-desc">{{ s.desc }}</span>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-links">
          <div class="link-group" v-for="(group, i) in footerGroups" :key="i">
            <h4>{{ group.title }}</h4>
            <a v-for="(link, li) in group.links" :key="li">{{ link }}</a>
          </div>
        </div>
        <div class="footer-contact">
          <h4>客服热线</h4>
          <p class="hotline">400-888-8888</p>
          <p>服务时间：全天24小时</p>
          <div class="contact-btns">
            <button>在线客服</button>
            <button>意见反馈</button>
          </div>
        </div>
      </div>
      <p class="copyright">© 2024 携程旅行 | 京ICP备00000000号</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navLinks = ['首页', '酒店', '机票', '火车票', '旅游', '景点门票']
const activeTab = ref(0)
const activeDest = ref(0)

const searchTabs = [
  { name: '机票', icon: '✈️' },
  { name: '酒店', icon: '🏨' },
  { name: '火车票', icon: '🚄' },
  { name: '旅游', icon: '🎒' }
]

const search = ref({
  from: '北京',
  to: '',
  date: '',
  returnDate: ''
})

const swapCity = () => {
  const temp = search.value.from
  search.value.from = search.value.to
  search.value.to = temp
}

const quickEntries = ref([
  { icon: '🏖️', name: '海岛游' },
  { icon: '🏔️', name: '山水游' },
  { icon: '🏰', name: '古镇游' },
  { icon: '🎢', name: '乐园游' },
  { icon: '🌸', name: '赏花游' },
  { icon: '⛷️', name: '滑雪游' },
  { icon: '🚗', name: '自驾游' },
  { icon: '🎪', name: '亲子游' }
])

const goEntry = (entry) => {
  alert(`进入：${entry.name}`)
}

const deals = ref([
  { emoji: '🏖️', title: '三亚5天4晚自由行', desc: '含往返机票+海边酒店', price: 1999, original: 3999, sales: 2356, time: '剩余2天', tag: '限时', bg: 'linear-gradient(135deg, #00b4db, #0083b0)' },
  { emoji: '🗼', title: '日本东京7日游', desc: '含机票+酒店+签证', price: 4999, original: 6999, sales: 1892, time: '剩余3天', tag: '爆款', bg: 'linear-gradient(135deg, #ff758c, #ff7eb3)' },
  { emoji: '🏝️', title: '马尔代夫6天4晚', desc: '水上屋+含早晚餐', price: 12999, original: 19999, sales: 876, time: '剩余5天', bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { emoji: '🗽', title: '美国西海岸10日游', desc: '洛杉矶+拉斯维加斯', price: 9999, original: 14999, sales: 654, time: '剩余7天', bg: 'linear-gradient(135deg, #f093fb, #f5576c)' }
])

const destTabs = ['国内', '亚洲', '欧洲', '美洲', '海岛']

const destinations = ref([
  { emoji: '🏔️', name: '云南', country: '中国', rating: 4.9, price: 1299, bg: 'linear-gradient(135deg, #11998e, #38ef7d)' },
  { emoji: '🌸', name: '日本', country: '亚洲', rating: 4.8, price: 3999, bg: 'linear-gradient(135deg, #ff758c, #ff7eb3)' },
  { emoji: '🏛️', name: '希腊', country: '欧洲', rating: 4.9, price: 8999, bg: 'linear-gradient(135deg, #00b4db, #0083b0)' },
  { emoji: '🏖️', name: '巴厘岛', country: '印尼', rating: 4.7, price: 4999, bg: 'linear-gradient(135deg, #f5af19, #f12711)' },
  { emoji: '🗽', name: '纽约', country: '美国', rating: 4.8, price: 9999, bg: 'linear-gradient(135deg, #232526, #414345)' },
  { emoji: '🗼', name: '巴黎', country: '法国', rating: 4.9, price: 7999, bg: 'linear-gradient(135deg, #667eea, #764ba2)' }
])

const hotels = ref([
  { emoji: '🏨', name: '上海外滩华尔道夫酒店', location: '外滩/陆家嘴', tags: ['豪华', '江景'], features: ['免费WiFi', '健身房', '泳池'], score: 4.9, reviews: 2356, price: 2588, bg: 'linear-gradient(135deg, #2c3e50, #3498db)' },
  { emoji: '🏨', name: '北京王府井希尔顿酒店', location: '王府井/东单', tags: ['商务', '地标'], features: ['免费停车', '行政酒廊'], score: 4.8, reviews: 1892, price: 1288, bg: 'linear-gradient(135deg, #c0392b, #e74c3c)' },
  { emoji: '🏨', name: '三亚亚特兰蒂斯酒店', location: '海棠湾', tags: ['亲子', '水上乐园'], features: ['水族馆', '水上乐园'], score: 4.9, reviews: 5678, price: 2188, bg: 'linear-gradient(135deg, #00b4db, #0083b0)' }
])

const services = ref([
  { icon: '🔒', title: '支付安全', desc: '多重加密保障' },
  { icon: '🔄', title: '退改无忧', desc: '7天无理由退款' },
  { icon: '📞', title: '24小时客服', desc: '随时为您服务' },
  { icon: '💰', title: '价格保证', desc: '买贵退差价' }
])

const footerGroups = ref([
  { title: '关于我们', links: ['公司介绍', '联系我们', '加入我们', '媒体报道'] },
  { title: '帮助中心', links: ['常见问题', '预订指南', '退订政策', '支付说明'] },
  { title: '合作伙伴', links: ['酒店加盟', '旅行社合作', '广告合作', '代理加盟'] }
])
</script>

<style scoped>
.travel-template {
  min-height: 100vh;
  background: #f5f7fa;
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
  font-size: 28px;
}

.logo-text {
  font-size: 20px;
  font-weight: 700;
  color: #ff7d00;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  font-size: 15px;
  color: #333;
  cursor: pointer;
  position: relative;
}

.nav-links a:hover, .nav-links a.active {
  color: #ff7d00;
}

.nav-links a.active::after {
  content: '';
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  height: 3px;
  background: #ff7d00;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-phone {
  font-size: 14px;
  color: #666;
}

.login-link, .register-link {
  font-size: 14px;
  cursor: pointer;
}

.login-link {
  color: #666;
}

.register-link {
  padding: 6px 16px;
  background: #ff7d00;
  color: #fff;
  border-radius: 4px;
}

.hero {
  position: relative;
  padding: 60px 20px 100px;
  background: linear-gradient(135deg, #1a365d 0%, #2d3748 100%);
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>');
  background-size: 30px 30px;
  opacity: 0.5;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 36px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
}

.hero p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 32px;
}

.search-panel {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.search-tabs {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e8e8e8;
}

.search-tabs span {
  padding: 16px 32px;
  font-size: 15px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.search-tabs span:hover {
  color: #ff7d00;
}

.search-tabs span.active {
  background: #fff;
  color: #ff7d00;
  font-weight: 500;
  border-bottom: 2px solid #ff7d00;
}

.search-form {
  padding: 24px;
}

.search-row {
  display: flex;
  align-items: flex-end;
  gap: 16px;
}

.search-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.search-item.large {
  flex: 1;
}

.search-item label {
  font-size: 12px;
  color: #999;
}

.search-item input {
  padding: 12px 16px;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  font-size: 14px;
  min-width: 140px;
}

.swap-btn {
  width: 36px;
  height: 36px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 4px;
}

.swap-btn:hover {
  background: #ff7d00;
  color: #fff;
}

.search-btn {
  padding: 12px 48px;
  background: linear-gradient(135deg, #ff7d00, #ff9500);
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 125, 0, 0.4);
}

.quick-entry {
  max-width: 1200px;
  margin: -40px auto 0;
  padding: 0 20px;
  position: relative;
  z-index: 10;
}

.entry-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 16px;
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.entry-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  cursor: pointer;
  transition: transform 0.2s;
}

.entry-item:hover {
  transform: translateY(-4px);
}

.entry-icon {
  font-size: 32px;
}

.entry-name {
  font-size: 13px;
  color: #333;
}

.deals, .destinations, .hotels {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 22px;
  font-weight: 600;
}

.more-link {
  font-size: 14px;
  color: #ff7d00;
  cursor: pointer;
}

.dest-tabs {
  display: flex;
  gap: 24px;
}

.dest-tabs span {
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.dest-tabs span.active {
  color: #ff7d00;
  font-weight: 500;
}

.deals-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.deal-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  animation: fadeIn 0.4s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.deal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.deal-image {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.deal-emoji {
  font-size: 48px;
}

.deal-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 10px;
  background: #ff4d4f;
  color: #fff;
  font-size: 11px;
  border-radius: 4px;
}

.deal-info {
  padding: 16px;
}

.deal-info h3 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
}

.deal-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
}

.deal-price {
  margin-bottom: 8px;
}

.deal-price .current {
  font-size: 20px;
  font-weight: 700;
  color: #ff4d4f;
}

.deal-price .original {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
  margin-left: 8px;
}

.deal-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #999;
}

.countdown {
  color: #ff4d4f;
}

.dest-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.dest-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  animation: fadeIn 0.4s ease forwards;
}

.dest-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.dest-image {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dest-emoji {
  font-size: 40px;
}

.dest-info {
  padding: 12px;
}

.dest-info h3 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 4px;
}

.dest-info p {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.dest-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating {
  font-size: 12px;
  color: #666;
}

.dest-meta .price {
  font-size: 14px;
  font-weight: 600;
  color: #ff7d00;
}

.hotel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.hotel-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  animation: fadeIn 0.4s ease forwards;
}

.hotel-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.hotel-image {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hotel-emoji {
  font-size: 56px;
}

.hotel-tags {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 8px;
}

.hotel-tags span {
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 11px;
  border-radius: 4px;
}

.hotel-info {
  padding: 16px;
}

.hotel-info h3 {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 6px;
}

.hotel-location {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
}

.hotel-features {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.hotel-features span {
  padding: 2px 8px;
  background: #f5f5f5;
  font-size: 11px;
  color: #666;
  border-radius: 4px;
}

.hotel-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}

.score {
  font-size: 18px;
  font-weight: 700;
  color: #ff7d00;
}

.reviews {
  font-size: 11px;
  color: #999;
}

.hotel-price .label {
  font-size: 12px;
  color: #999;
}

.hotel-price .amount {
  font-size: 20px;
  font-weight: 700;
  color: #ff4d4f;
}

.services {
  display: flex;
  background: #fff;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  border-radius: 12px;
}

.service-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 32px 16px;
  border-right: 1px solid #f0f0f0;
}

.service-item:last-child {
  border-right: none;
}

.service-icon {
  font-size: 28px;
}

.service-info {
  display: flex;
  flex-direction: column;
}

.service-title {
  font-size: 14px;
  font-weight: 500;
}

.service-desc {
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

.footer-links {
  display: flex;
  gap: 80px;
}

.link-group h4 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 16px;
}

.link-group a {
  display: block;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 10px;
  cursor: pointer;
}

.link-group a:hover {
  color: #ff7d00;
}

.footer-contact h4 {
  font-size: 14px;
  margin-bottom: 12px;
}

.hotline {
  font-size: 24px;
  font-weight: 600;
  color: #ff7d00;
  margin-bottom: 8px;
}

.footer-contact p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 16px;
}

.contact-btns {
  display: flex;
  gap: 12px;
}

.contact-btns button {
  padding: 8px 20px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
}

.copyright {
  text-align: center;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
}
</style>