<template>
  <div class="tech-template">
    <!-- 顶部通知栏 -->
    <div class="top-bar">
      <div class="top-content">
        <span>新品首发 | 智能手表Pro 限时立减200元</span>
        <a>立即查看 ></a>
      </div>
    </div>

    <!-- 主导航 -->
    <nav class="navbar">
      <div class="nav-left">
        <div class="logo">
          <span class="logo-icon">MI</span>
          <span class="logo-text">米科技</span>
        </div>
        <div class="nav-links">
          <a v-for="(link, i) in navLinks" :key="i" class="nav-link" :class="{ active: i === 0 }">{{ link }}</a>
        </div>
      </div>
      <div class="nav-right">
        <div class="search-box">
          <input type="text" placeholder="搜索商品" />
          <button class="search-btn">🔍</button>
        </div>
        <div class="user-actions">
          <a class="user-link">登录</a>
          <a class="user-link">注册</a>
          <a class="cart-link">
            <span>🛒</span>
            <span class="cart-count">2</span>
          </a>
        </div>
      </div>
    </nav>

    <!-- 分类导航 -->
    <div class="category-nav">
      <div class="category-container">
        <div class="category-menu">
          <span class="menu-title">全部商品分类</span>
        </div>
        <div class="category-list">
          <a v-for="(cat, i) in categories" :key="i" class="cat-item">{{ cat }}</a>
        </div>
      </div>
    </div>

    <!-- 主横幅轮播 -->
    <section class="hero-banner">
      <div class="banner-container">
        <div class="banner-slide" :style="{ background: banners[currentBanner].bg }">
          <div class="banner-content">
            <div class="banner-tag" v-if="banners[currentBanner].tag">{{ banners[currentBanner].tag }}</div>
            <h2>{{ banners[currentBanner].title }}</h2>
            <p>{{ banners[currentBanner].desc }}</p>
            <div class="banner-price">
              <span class="price-label">起售价</span>
              <span class="price-value">¥{{ banners[currentBanner].price }}</span>
            </div>
            <button class="banner-btn">立即购买</button>
          </div>
          <div class="banner-visual">
            <span class="banner-emoji">{{ banners[currentBanner].emoji }}</span>
          </div>
        </div>
        <div class="banner-dots">
          <span
            v-for="(b, i) in banners"
            :key="i"
            class="dot"
            :class="{ active: i === currentBanner }"
            @click="currentBanner = i"
          ></span>
        </div>
        <div class="banner-side">
          <div v-for="(item, i) in sideItems" :key="i" class="side-item" :style="{ background: item.bg }">
            <div class="side-info">
              <span class="side-title">{{ item.title }}</span>
              <span class="side-price">¥{{ item.price }}起</span>
            </div>
            <span class="side-emoji">{{ item.emoji }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 热门商品 -->
    <section class="hot-products">
      <div class="section-header">
        <h2>热门商品</h2>
        <a class="more-link">查看全部 ></a>
      </div>
      <div class="products-grid">
        <div
          v-for="(product, i) in hotProducts"
          :key="i"
          class="product-card"
          :style="{ animationDelay: i * 0.1 + 's' }"
        >
          <div class="product-image" :style="{ background: product.bg }">
            <span class="product-emoji">{{ product.emoji }}</span>
            <span class="product-tag" v-if="product.tag">{{ product.tag }}</span>
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="product-desc">{{ product.desc }}</p>
            <div class="product-price">
              <span class="current">¥{{ product.price }}</span>
              <span class="original" v-if="product.original">¥{{ product.original }}</span>
            </div>
            <div class="product-sales">已售{{ product.sales }}+</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 新品发布 -->
    <section class="new-releases">
      <div class="section-header">
        <h2>新品发布</h2>
        <a class="more-link">更多新品 ></a>
      </div>
      <div class="releases-grid">
        <div
          v-for="(item, i) in newReleases"
          :key="i"
          class="release-card"
          :style="{ animationDelay: i * 0.15 + 's' }"
        >
          <div class="release-header" :style="{ background: item.bg }">
            <span class="release-emoji">{{ item.emoji }}</span>
            <span class="release-badge">新品</span>
          </div>
          <div class="release-body">
            <h3>{{ item.name }}</h3>
            <p class="release-specs">{{ item.specs }}</p>
            <div class="release-features">
              <span v-for="(f, fi) in item.features" :key="fi">{{ f }}</span>
            </div>
            <div class="release-footer">
              <span class="release-price">¥{{ item.price }}起</span>
              <button class="buy-btn">了解详情</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 品质服务 -->
    <section class="services">
      <div class="service-item" v-for="(s, i) in services" :key="i">
        <span class="service-icon">{{ s.icon }}</span>
        <div class="service-info">
          <span class="service-title">{{ s.title }}</span>
          <span class="service-desc">{{ s.desc }}</span>
        </div>
      </div>
    </section>

    <!-- 智能家居 -->
    <section class="smart-home">
      <div class="section-header">
        <h2>智能家居</h2>
        <a class="more-link">探索更多 ></a>
      </div>
      <div class="home-grid">
        <div class="home-main" :style="{ background: smartHome.main.bg }">
          <span class="home-emoji">{{ smartHome.main.emoji }}</span>
          <div class="home-info">
            <h3>{{ smartHome.main.name }}</h3>
            <p>{{ smartHome.main.desc }}</p>
            <span class="home-price">¥{{ smartHome.main.price }}起</span>
          </div>
        </div>
        <div class="home-side">
          <div
            v-for="(item, i) in smartHome.items"
            :key="i"
            class="home-item"
            :style="{ background: item.bg, animationDelay: i * 0.1 + 's' }"
          >
            <div class="home-item-info">
              <span class="home-item-name">{{ item.name }}</span>
              <span class="home-item-price">¥{{ item.price }}</span>
            </div>
            <span class="home-item-emoji">{{ item.emoji }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-main">
        <div class="footer-links">
          <div class="link-group" v-for="(group, i) in footerLinks" :key="i">
            <h4>{{ group.title }}</h4>
            <a v-for="(link, li) in group.links" :key="li">{{ link }}</a>
          </div>
        </div>
        <div class="footer-contact">
          <div class="hotline">
            <span class="hotline-label">客服热线</span>
            <span class="hotline-number">400-100-5678</span>
          </div>
          <div class="contact-btns">
            <button class="contact-btn">人工客服</button>
            <button class="contact-btn outline">在线反馈</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 米科技 版权所有 | 京ICP备10046444号</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navLinks = ['手机', '电视', '笔记本', '平板', '穿戴', '音频', '路由', '智能家居']

const categories = ['手机通讯', '电视影音', '电脑平板', '智能穿戴', '智能家居', '生活电器', '出行户外']

const currentBanner = ref(0)

const banners = ref([
  { emoji: '📱', title: '米14 Pro', desc: '骁龙8 Gen3 | 徕卡影像 | IP68防水', price: 4999, tag: '热卖', bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' },
  { emoji: '📺', title: '米电视 大师 86"', desc: 'Mini LED | 4K 144Hz | 杜比全景声', price: 12999, tag: '旗舰', bg: 'linear-gradient(135deg, #0f3460 0%, #16213e 100%)' },
  { emoji: '⌚', title: '米手表 S3', desc: 'AMOLED屏幕 | eSIM独立通话 | 14天续航', price: 1299, tag: '新品', bg: 'linear-gradient(135deg, #1a1a2e 0%, #2c3e50 100%)' }
])

const sideItems = ref([
  { emoji: '🎧', title: '降噪耳机4 Pro', price: 999, bg: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { emoji: '💻', title: '米笔记本Pro 16', price: 6499, bg: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { emoji: '🎮', title: '游戏手柄Pro', price: 299, bg: 'linear-gradient(135deg, #4facfe, #00f2fe)' }
])

const hotProducts = ref([
  { emoji: '📱', name: '米14', desc: '骁龙8 Gen3 | 徕卡专业光学', price: 3999, original: 4299, sales: 12580, tag: '热卖', bg: 'linear-gradient(135deg, #2c3e50, #3498db)' },
  { emoji: '⌚', name: '手环8 Pro', desc: 'AMOLED屏 | 血氧监测 | 15天续航', price: 349, sales: 8920, bg: 'linear-gradient(135deg, #e74c3c, #c0392b)' },
  { emoji: '🔊', name: '米音箱Pro', desc: 'HIFI音质 | 智能语音 | 全屋控制', price: 399, sales: 6750, bg: 'linear-gradient(135deg, #f39c12, #e67e22)' },
  { emoji: '🔌', name: '智能插座2', desc: '远程控制 | 功率统计 | 过载保护', price: 49, sales: 23450, bg: 'linear-gradient(135deg, #27ae60, #2ecc71)' },
  { emoji: '💡', name: '智能台灯Pro', desc: '护眼光源 | APP控制 | 定时开关', price: 199, sales: 11230, tag: '爆款', bg: 'linear-gradient(135deg, #9b59b6, #8e44ad)' }
])

const newReleases = ref([
  { emoji: '📱', name: '米14 Ultra', specs: '骁龙8 Gen3 | 16GB+512GB', features: ['徕卡四摄', '卫星通信', '钛合金机身'], price: 6499, bg: 'linear-gradient(135deg, #1a1a2e, #2c3e50)' },
  { emoji: '💻', name: '米笔记本Air 14', specs: '酷睿Ultra7 | 16GB+512GB', features: ['2.8K OLED', '轻薄机身', '长续航'], price: 5499, bg: 'linear-gradient(135deg, #34495e, #2c3e50)' },
  { emoji: '⌚', name: '米手表S3 eSIM', specs: '独立通话 | 14天续航', features: ['钛金属', '蓝宝石镜面', '健康监测'], price: 1999, bg: 'linear-gradient(135deg, #2c3e50, #4a69bd)' }
])

const services = ref([
  { icon: '🚚', title: '全国配送', desc: '满99包邮，急速送达' },
  { icon: '🔄', title: '7天无理由', desc: '退换无忧，售后保障' },
  { icon: '🛠️', title: '专业维修', desc: '官方售后，品质保障' },
  { icon: '💬', title: '在线客服', desc: '7x24小时，随时解答' }
])

const smartHome = ref({
  main: { emoji: '🏠', name: '全屋智能套装', desc: '一键控制全屋智能设备', price: 2999, bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' },
  items: [
    { emoji: '💡', name: '智能吸顶灯', price: 299, bg: 'linear-gradient(135deg, #f39c12, #e67e22)' },
    { emoji: '🌡️', name: '温湿度传感器', price: 79, bg: 'linear-gradient(135deg, #3498db, #2980b9)' },
    { emoji: '🔒', name: '智能门锁X', price: 1299, bg: 'linear-gradient(135deg, #2c3e50, #34495e)' },
    { emoji: '📹', name: '摄像头Pro', price: 399, bg: 'linear-gradient(135deg, #e74c3c, #c0392b)' }
  ]
})

const footerLinks = ref([
  { title: '帮助中心', links: ['账户管理', '购物指南', '订单操作'] },
  { title: '服务支持', links: ['售后政策', '自助服务', '相关下载'] },
  { title: '线下门店', links: ['米之家', '服务网点', '授权体验店'] },
  { title: '关于米科技', links: ['了解我们', '加入我们', '联系我们'] }
])

let bannerTimer = null

onMounted(() => {
  bannerTimer = setInterval(() => {
    currentBanner.value = (currentBanner.value + 1) % banners.value.length
  }, 4000)
})

onUnmounted(() => {
  if (bannerTimer) clearInterval(bannerTimer)
})
</script>

<style scoped>
.tech-template {
  min-height: 100vh;
  background: #f5f5f5;
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 顶部通知栏 */
.top-bar {
  background: #333;
  color: #b0b0b0;
  font-size: 12px;
}

.top-content {
  max-width: 1226px;
  margin: 0 auto;
  padding: 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.top-content a {
  color: #ff6700;
  cursor: pointer;
}

/* 主导航 */
.navbar {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-left, .nav-right {
  display: flex;
  align-items: center;
}

.navbar > * {
  max-width: 1226px;
  margin: 0 auto;
  padding: 0 20px;
}

.navbar {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: #ff6700;
  color: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.nav-links {
  display: flex;
  gap: 32px;
  margin-left: 40px;
}

.nav-link {
  font-size: 14px;
  color: #333;
  cursor: pointer;
  padding: 8px 0;
  transition: color 0.2s;
}

.nav-link:hover, .nav-link.active {
  color: #ff6700;
}

.search-box {
  display: flex;
  border: 2px solid #ff6700;
  border-radius: 4px;
  overflow: hidden;
}

.search-box input {
  border: none;
  padding: 8px 12px;
  width: 180px;
  font-size: 13px;
  outline: none;
}

.search-btn {
  background: #fff;
  border: none;
  padding: 0 12px;
  cursor: pointer;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: 20px;
}

.user-link {
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.user-link:hover {
  color: #ff6700;
}

.cart-link {
  position: relative;
  cursor: pointer;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6700;
  color: #fff;
  font-size: 10px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 分类导航 */
.category-nav {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.category-container {
  max-width: 1226px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.category-menu {
  background: #ff6700;
  color: #fff;
  padding: 12px 24px;
  cursor: pointer;
}

.menu-title {
  font-size: 14px;
}

.category-list {
  display: flex;
  gap: 32px;
  padding: 12px 24px;
}

.cat-item {
  font-size: 13px;
  color: #666;
  cursor: pointer;
  transition: color 0.2s;
}

.cat-item:hover {
  color: #ff6700;
}

/* 主横幅 */
.hero-banner {
  max-width: 1226px;
  margin: 20px auto;
  padding: 0 20px;
}

.banner-container {
  display: flex;
  gap: 12px;
}

.banner-slide {
  flex: 1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 60px;
  position: relative;
  overflow: hidden;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.banner-content {
  color: #fff;
  z-index: 1;
}

.banner-tag {
  display: inline-block;
  padding: 4px 12px;
  background: #ff6700;
  border-radius: 4px;
  font-size: 12px;
  margin-bottom: 16px;
}

.banner-content h2 {
  font-size: 42px;
  font-weight: 300;
  margin-bottom: 12px;
}

.banner-content p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
}

.banner-price {
  margin-bottom: 24px;
}

.price-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  margin-right: 8px;
}

.price-value {
  font-size: 28px;
  font-weight: 600;
  color: #ff6700;
}

.banner-btn {
  padding: 12px 32px;
  background: #ff6700;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.banner-btn:hover {
  background: #f25807;
  transform: translateY(-2px);
}

.banner-visual {
  z-index: 1;
}

.banner-emoji {
  font-size: 120px;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.banner-dots {
  position: absolute;
  bottom: 20px;
  left: 60px;
  display: flex;
  gap: 8px;
}

.dot {
  width: 24px;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: #fff;
  width: 32px;
}

.banner-side {
  width: 240px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.side-item {
  flex: 1;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.3s;
}

.side-item:hover {
  transform: translateX(-5px);
}

.side-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.side-title {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
}

.side-price {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
}

.side-emoji {
  font-size: 32px;
}

/* 热门商品 */
.hot-products, .new-releases, .smart-home {
  max-width: 1226px;
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
  font-weight: 500;
  color: #333;
}

.more-link {
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.more-link:hover {
  color: #ff6700;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.product-card {
  background: #fff;
  border-radius: 8px;
  padding: 24px 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 140px;
  height: 140px;
  margin: 0 auto 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.product-emoji {
  font-size: 56px;
}

.product-tag {
  position: absolute;
  top: 0;
  left: 0;
  background: #ff6700;
  color: #fff;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px 0;
}

.product-info h3 {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 8px;
  color: #333;
}

.product-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  margin-bottom: 4px;
}

.current {
  font-size: 18px;
  font-weight: 600;
  color: #ff6700;
}

.original {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
  margin-left: 4px;
}

.product-sales {
  font-size: 11px;
  color: #999;
}

/* 新品发布 */
.releases-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.release-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.release-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.release-header {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.release-emoji {
  font-size: 80px;
}

.release-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #ff6700;
  color: #fff;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 4px;
}

.release-body {
  padding: 20px;
}

.release-body h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.release-specs {
  font-size: 12px;
  color: #999;
  margin-bottom: 12px;
}

.release-features {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.release-features span {
  font-size: 11px;
  color: #666;
  background: #f5f5f5;
  padding: 4px 8px;
  border-radius: 4px;
}

.release-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.release-price {
  font-size: 18px;
  font-weight: 600;
  color: #ff6700;
}

.buy-btn {
  padding: 8px 20px;
  background: #fff;
  border: 1px solid #ff6700;
  color: #ff6700;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.buy-btn:hover {
  background: #ff6700;
  color: #fff;
}

/* 服务 */
.services {
  max-width: 1226px;
  margin: 40px auto;
  padding: 0 20px;
  display: flex;
  background: #fff;
  border-radius: 8px;
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
  gap: 4px;
}

.service-title {
  font-size: 14px;
  font-weight: 500;
}

.service-desc {
  font-size: 12px;
  color: #999;
}

/* 智能家居 */
.home-grid {
  display: flex;
  gap: 12px;
}

.home-main {
  width: 600px;
  border-radius: 8px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.3s;
}

.home-main:hover {
  transform: scale(1.02);
}

.home-emoji {
  font-size: 100px;
}

.home-info {
  color: #fff;
}

.home-info h3 {
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 8px;
}

.home-info p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 16px;
}

.home-price {
  font-size: 16px;
  color: #ff6700;
}

.home-side {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.home-item {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.home-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.home-item-name {
  font-size: 14px;
  font-weight: 500;
  display: block;
  margin-bottom: 4px;
}

.home-item-price {
  font-size: 14px;
  color: #ff6700;
}

.home-item-emoji {
  font-size: 36px;
}

/* 底部 */
.footer {
  background: #1f1f1f;
  color: #fff;
  padding: 40px 0 0;
  margin-top: 60px;
}

.footer-main {
  max-width: 1226px;
  margin: 0 auto;
  padding: 0 20px 40px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #333;
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
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;
  cursor: pointer;
  transition: color 0.2s;
}

.link-group a:hover {
  color: #ff6700;
}

.footer-contact {
  text-align: right;
}

.hotline-label {
  font-size: 12px;
  color: #888;
  display: block;
  margin-bottom: 4px;
}

.hotline-number {
  font-size: 24px;
  font-weight: 500;
  color: #ff6700;
  display: block;
  margin-bottom: 16px;
}

.contact-btns {
  display: flex;
  gap: 12px;
}

.contact-btn {
  padding: 10px 24px;
  background: #ff6700;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.contact-btn.outline {
  background: transparent;
  border: 1px solid #666;
  color: #888;
}

.footer-bottom {
  padding: 24px 20px;
  text-align: center;
}

.footer-bottom p {
  font-size: 12px;
  color: #666;
}
</style>