<template>
  <div class="restaurant-template">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">江南小馆</div>
      <div class="nav-links">
        <a v-for="(link, i) in navLinks" :key="i">{{ link }}</a>
      </div>
      <button class="reserve-btn">预约订座</button>
    </nav>

    <!-- 主横幅 -->
    <section class="hero">
      <div class="hero-bg">
        <div class="steam steam1"></div>
        <div class="steam steam2"></div>
      </div>
      <div class="hero-content">
        <span class="badge animate-scale-in">地道江南风味</span>
        <h1 class="animate-slide-up">江南小馆</h1>
        <p class="animate-fade-in">传承百年工艺，精选本地食材</p>
        <div class="hero-buttons animate-scale-in">
          <button class="btn-primary">查看菜单</button>
          <button class="btn-outline">在线预订</button>
        </div>
      </div>
    </section>

    <!-- 招牌菜品 -->
    <section class="specials">
      <h2>招牌菜品</h2>
      <div class="dishes-grid">
        <div v-for="(dish, i) in dishes" :key="i" class="dish-card" :style="{ animationDelay: i * 0.1 + 's' }">
          <div class="dish-image" :style="{ background: dish.bg }">
            <span class="dish-emoji">{{ dish.emoji }}</span>
            <span class="dish-tag" v-if="dish.tag">{{ dish.tag }}</span>
          </div>
          <div class="dish-info">
            <h3>{{ dish.name }}</h3>
            <p>{{ dish.desc }}</p>
            <div class="dish-footer">
              <span class="price">¥{{ dish.price }}</span>
              <button class="add-btn">点餐</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 关于餐厅 -->
    <section class="about">
      <div class="about-content">
        <h2>关于我们</h2>
        <p>江南小馆创立于2010年，主打正宗江浙菜系。我们坚持选用当季新鲜食材，传承传统烹饪工艺，为食客呈现地道的江南风味。</p>
        <div class="features">
          <div class="feature">
            <span class="feature-icon">🏠</span>
            <span>私密包厢</span>
          </div>
          <div class="feature">
            <span class="feature-icon">🅿️</span>
            <span>免费停车</span>
          </div>
          <div class="feature">
            <span class="feature-icon">👶</span>
            <span>儿童座椅</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 预订 -->
    <section class="reservation">
      <h2>在线预订</h2>
      <div class="res-form">
        <input type="text" placeholder="您的姓名" />
        <input type="tel" placeholder="联系电话" />
        <input type="date" />
        <select>
          <option>选择时间</option>
          <option>11:00</option>
          <option>12:00</option>
          <option>18:00</option>
        </select>
        <select>
          <option>用餐人数</option>
          <option>2人</option>
          <option>4人</option>
          <option>6人</option>
        </select>
        <button class="submit-btn">确认预订</button>
      </div>
    </section>

    <!-- 底部 -->
    <footer class="footer">
      <div class="footer-info">
        <div class="footer-brand">江南小馆</div>
        <p>营业时间: 周一至周日 11:00 - 22:00</p>
        <p>地址: 城市中心大道88号</p>
        <p>电话: 400-888-8888</p>
      </div>
      <p class="copyright">© 2024 江南小馆</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navLinks = ['首页', '菜单', '关于', '联系']

const dishes = ref([
  { emoji: '🐟', name: '西湖醋鱼', desc: '正宗杭帮菜，酸甜适口', price: 88, tag: '招牌', bg: 'linear-gradient(135deg, #c0392b, #e74c3c)' },
  { emoji: '🥩', name: '东坡肉', desc: '肥而不腻，入口即化', price: 78, tag: '推荐', bg: 'linear-gradient(135deg, #8b4513, #a0522d)' },
  { emoji: '🍜', name: '片儿川', desc: '杭州传统面食', price: 28, bg: 'linear-gradient(135deg, #d4a574, #deb887)' },
  { emoji: '🥬', name: '龙井虾仁', desc: '明前龙井配鲜虾', price: 98, bg: 'linear-gradient(135deg, #2e8b57, #3cb371)' },
  { emoji: '🍲', name: '老鸭煲', desc: '文火慢炖，滋补养生', price: 128, bg: 'linear-gradient(135deg, #4a4a4a, #666)' },
  { emoji: '🍰', name: '桂花糖藕', desc: '应季甜品，清香软糯', price: 38, bg: 'linear-gradient(135deg, #deb887, #f5deb3)' }
])
</script>

<style scoped>
.restaurant-template {
  min-height: 100vh;
  background: linear-gradient(180deg, #1a0a0a 0%, #2d1810 100%);
  color: #fff;
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 60px;
  background: rgba(26, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: #d4af37;
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
  color: #d4af37;
}

.reserve-btn {
  padding: 10px 24px;
  border: 1px solid #d4af37;
  background: transparent;
  color: #d4af37;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.reserve-btn:hover {
  background: #d4af37;
  color: #1a0a0a;
}

.hero {
  position: relative;
  padding: 100px 60px;
  text-align: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.steam {
  position: absolute;
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.2), transparent);
  border-radius: 50%;
  animation: steamRise 4s ease-in-out infinite;
}

.steam1 { bottom: 20%; left: 20%; }
.steam2 { bottom: 30%; right: 25%; animation-delay: -2s; }

@keyframes steamRise {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  50% { opacity: 0.5; }
  100% { transform: translateY(-150px) scale(2); opacity: 0; }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.badge {
  display: inline-block;
  padding: 8px 20px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.1));
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 20px;
  font-size: 14px;
  color: #d4af37;
  margin-bottom: 20px;
}

.hero h1 {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #d4af37, #f4e4ba, #d4af37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero p {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 32px;
  letter-spacing: 4px;
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
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  border: none;
  background: linear-gradient(135deg, #d4af37, #c9a227);
  color: #1a0a0a;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(212, 175, 55, 0.4);
}

.btn-outline {
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: transparent;
  color: #fff;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
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
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

.animate-slide-up { animation: slideUp 0.6s ease forwards; }
.animate-fade-in { animation: fadeIn 0.6s ease forwards; opacity: 0; animation-delay: 0.2s; }
.animate-scale-in { animation: scaleIn 0.5s ease forwards; opacity: 0; animation-delay: 0.4s; }

.specials, .about, .reservation {
  padding: 80px 60px;
  max-width: 1200px;
  margin: 0 auto;
}

.specials h2, .about h2, .reservation h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 40px;
  text-align: center;
  color: #d4af37;
}

.dishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.dish-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(212, 175, 55, 0.1);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  animation: slideUp 0.5s ease forwards;
  opacity: 0;
}

.dish-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(212, 175, 55, 0.1);
}

.dish-image {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.dish-emoji {
  font-size: 48px;
}

.dish-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  background: linear-gradient(135deg, #d4af37, #c9a227);
  color: #1a0a0a;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.dish-info {
  padding: 16px;
}

.dish-info h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.dish-info p {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
}

.dish-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 20px;
  font-weight: 700;
  color: #d4af37;
}

.add-btn {
  padding: 8px 16px;
  border: none;
  background: linear-gradient(135deg, #d4af37, #c9a227);
  color: #1a0a0a;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.2s;
}

.add-btn:hover {
  transform: scale(1.05);
}

.about {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin: 0 60px;
  max-width: none;
}

.about-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.about-content p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin-bottom: 32px;
}

.features {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}

.feature {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
}

.feature-icon {
  font-size: 20px;
}

.reservation {
  text-align: center;
}

.res-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  max-width: 500px;
  margin: 0 auto;
}

.res-form input, .res-form select {
  padding: 12px 16px;
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 14px;
}

.res-form input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.submit-btn {
  grid-column: span 2;
  padding: 14px;
  border: none;
  background: linear-gradient(135deg, #d4af37, #c9a227);
  color: #1a0a0a;
  font-size: 15px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.2s;
}

.submit-btn:hover {
  transform: scale(1.02);
}

.footer {
  background: #0a0505;
  padding: 60px;
  text-align: center;
}

.footer-brand {
  font-size: 24px;
  font-weight: 700;
  color: #d4af37;
  margin-bottom: 16px;
}

.footer-info p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
}

.copyright {
  margin-top: 24px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.3);
}
</style>