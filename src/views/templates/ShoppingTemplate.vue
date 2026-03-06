<template>
  <div class="shopping-template">
    <!-- 顶部导航 -->
    <nav class="navbar">
      <div class="logo">潮流商城</div>
      <div class="search-bar">
        <input type="text" placeholder="搜索商品..." />
        <button>搜索</button>
      </div>
      <div class="nav-actions">
        <a>登录</a>
        <a>购物车(0)</a>
      </div>
    </nav>

    <!-- 分类导航 -->
    <div class="category-nav">
      <a v-for="(cat, i) in categories" :key="i" class="cat-link" :class="{ active: i === 0 }">
        {{ cat.name }}
      </a>
    </div>

    <!-- 促销横幅 -->
    <section class="promo-banner">
      <div class="promo-content">
        <span class="promo-tag">限时特惠</span>
        <span class="promo-text">春季新品上市 全场满299包邮</span>
      </div>
    </section>

    <!-- 商品列表 - 核心区域 -->
    <section class="products">
      <div class="products-header">
        <h2>全部商品</h2>
        <div class="sort-options">
          <span class="sort-label">排序：</span>
          <a class="active">综合</a>
          <a>销量</a>
          <a>价格</a>
          <a>新品</a>
        </div>
      </div>
      <div class="product-grid">
        <div v-for="(product, i) in products" :key="i" class="product-card" :style="{ animationDelay: i * 0.05 + 's' }">
          <div class="product-image" :style="{ background: product.color }">
            <span class="product-tag" v-if="product.tag">{{ product.tag }}</span>
          </div>
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-desc">{{ product.desc }}</p>
            <div class="product-price">
              <span class="current-price">¥{{ product.price }}</span>
              <span class="original-price" v-if="product.originalPrice">¥{{ product.originalPrice }}</span>
            </div>
            <div class="product-sales">已售 {{ product.sales }}+</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-content">
        <p>© 2024 潮流商城</p>
        <div class="footer-links">
          <a>关于我们</a>
          <a>联系客服</a>
          <a>退换货政策</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const categories = ref([
  { name: '全部' },
  { name: '上装' },
  { name: '下装' },
  { name: '鞋靴' },
  { name: '箱包' },
  { name: '配饰' }
])

const products = ref([
  { name: '简约纯棉T恤 透气舒适多色可选', desc: '春季新款', price: 99, originalPrice: 159, sales: 2341, color: 'linear-gradient(135deg, #667eea, #764ba2)', tag: '热卖' },
  { name: '休闲工装裤 耐磨面料宽松版型', desc: '工装风', price: 189, sales: 1856, color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { name: '复古运动鞋 轻便舒适百搭款式', desc: '复古风', price: 299, originalPrice: 399, sales: 3421, color: 'linear-gradient(135deg, #4facfe, #00f2fe)', tag: '新品' },
  { name: '帆布双肩包 大容量防水面料', desc: '学生款', price: 159, sales: 987, color: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
  { name: '简约帆布带手表 日系风格防水', desc: '日系风', price: 199, sales: 1543, color: 'linear-gradient(135deg, #fa709a, #fee140)' },
  {name: '棒球帽 防晒透气可调节', desc: '四季款', price: 69, sales: 2156, color: 'linear-gradient(135deg, #a18cd1, #fbc2eb)' },
  { name: '针织开衫 春秋薄款百搭', desc: '春秋款', price: 149, originalPrice: 199, sales: 876, color: 'linear-gradient(135deg, #ffecd2, #fcb69f)', tag: '折扣' },
  { name: '牛仔裤 修身显瘦弹力', desc: '修身款', price: 179, sales: 1234, color: 'linear-gradient(135deg, #2c3e50, #4a69bd)' }
])
</script>

<style scoped>
.shopping-template {
  min-height: 100vh;
  background: #f5f5f5;
  color: #333;
}

/* 导航栏 */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: #e74c3c;
}

.search-bar {
  display: flex;
  flex: 1;
  max-width: 400px;
  margin: 0 40px;
}

.search-bar input {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #e74c3c;
  border-right: none;
  border-radius: 4px 0 0 4px;
  font-size: 14px;
}

.search-bar button {
  padding: 8px 20px;
  background: #e74c3c;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.nav-actions {
  display: flex;
  gap: 20px;
}

.nav-actions a {
  font-size: 14px;
  color: #666;
  cursor: pointer;
}

.nav-actions a:hover {
  color: #e74c3c;
}

/* 分类导航 */
.category-nav {
  display: flex;
  gap: 8px;
  padding: 12px 20px;
  background: #fff;
  border-bottom: 1px solid #eee;
  overflow-x: auto;
}

.cat-link {
  padding: 6px 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  white-space: nowrap;
  border-radius: 4px;
  transition: all 0.2s;
}

.cat-link:hover {
  background: #f5f5f5;
}

.cat-link.active {
  background: #e74c3c;
  color: #fff;
}

/* 促销横幅 */
.promo-banner {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  padding: 10px 20px;
}

.promo-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.promo-tag {
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  font-size: 12px;
  color: #fff;
}

.promo-text {
  font-size: 14px;
  color: #fff;
}

/* 商品列表 */
.products {
  padding: 16px;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.products-header h2 {
  font-size: 16px;
  font-weight: 600;
}

.sort-options {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-label {
  font-size: 13px;
  color: #999;
}

.sort-options a {
  font-size: 13px;
  color: #666;
  cursor: pointer;
}

.sort-options a.active {
  color: #e74c3c;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

@media (min-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

.product-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
  animation: fadeIn 0.4s ease forwards;
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.product-image {
  position: relative;
  height: 0;
  padding-bottom: 100%;
}

.product-placeholder {
  position: absolute;
  inset: 0;
}

.product-tag {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 2px 6px;
  background: #e74c3c;
  color: #fff;
  border-radius: 2px;
  font-size: 11px;
}

.product-info {
  padding: 10px;
}

.product-name {
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  height: 36px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 6px;
}

.product-desc {
  font-size: 12px;
  color: #999;
  margin-bottom: 6px;
}

.product-price {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-bottom: 4px;
}

.current-price {
  font-size: 16px;
  font-weight: 700;
  color: #e74c3c;
}

.original-price {
  font-size: 12px;
  color: #999;
  text-decoration: line-through;
}

.product-sales {
  font-size: 11px;
  color: #999;
}

/* 底部 */
.footer {
  background: #fff;
  padding: 20px;
  border-top: 1px solid #eee;
}

.footer-content {
  text-align: center;
}

.footer-content p {
  font-size: 13px;
  color: #999;
  margin-bottom: 10px;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.footer-links a {
  font-size: 12px;
  color: #666;
  cursor: pointer;
}
</style>