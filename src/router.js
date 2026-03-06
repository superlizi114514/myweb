import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Projects from './views/Projects.vue'
import Blog from './views/Blog.vue'
import Shop from './views/Shop.vue'
import Templates from './views/Templates.vue'
import OpenClawDeploy from './views/OpenClawDeploy.vue'
import WebsiteBuild from './views/WebsiteBuild.vue'
import ContactInfo from './views/ContactInfo.vue'

// 模板网站页面
import ShoppingTemplate from './views/templates/ShoppingTemplate.vue'
import CorporateTemplate from './views/templates/CorporateTemplate.vue'
import ForumTemplate from './views/templates/ForumTemplate.vue'
import EducationTemplate from './views/templates/EducationTemplate.vue'
import MusicTemplate from './views/templates/MusicTemplate.vue'
import FitnessTemplate from './views/templates/FitnessTemplate.vue'
import PetTemplate from './views/templates/PetTemplate.vue'
import PortfolioTemplate from './views/templates/PortfolioTemplate.vue'
import RestaurantTemplate from './views/templates/RestaurantTemplate.vue'
import TravelTemplate from './views/templates/TravelTemplate.vue'
import MinimalTemplate from './views/templates/MinimalTemplate.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/templates', name: 'Templates', component: Templates },
  { path: '/openclaw-deploy', name: 'OpenClawDeploy', component: OpenClawDeploy },
  { path: '/website-build', name: 'WebsiteBuild', component: WebsiteBuild },
  { path: '/contact-info', name: 'ContactInfo', component: ContactInfo },
  
  // 模板网站子页面
  { path: '/shopping', name: 'Shopping', component: ShoppingTemplate },
  { path: '/corporate', name: 'Corporate', component: CorporateTemplate },
  { path: '/forum', name: 'Forum', component: ForumTemplate },
  { path: '/education', name: 'Education', component: EducationTemplate },
  { path: '/music', name: 'Music', component: MusicTemplate },
  { path: '/fitness', name: 'Fitness', component: FitnessTemplate },
  { path: '/pet', name: 'Pet', component: PetTemplate },
  { path: '/portfolio', name: 'Portfolio', component: PortfolioTemplate },
  { path: '/restaurant', name: 'Restaurant', component: RestaurantTemplate },
  { path: '/travel', name: 'Travel', component: TravelTemplate },
  { path: '/minimal', name: 'Minimal', component: MinimalTemplate },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  },
})

export default router
