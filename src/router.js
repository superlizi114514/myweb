import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Projects from './views/Projects.vue'
import Blog from './views/Blog.vue'
import Shop from './views/Shop.vue'
import OpenClawDeploy from './views/OpenClawDeploy.vue'
import WebsiteBuild from './views/WebsiteBuild.vue'
import ContactInfo from './views/ContactInfo.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/openclaw-deploy', name: 'OpenClawDeploy', component: OpenClawDeploy },
  { path: '/website-build', name: 'WebsiteBuild', component: WebsiteBuild },
  { path: '/contact-info', name: 'ContactInfo', component: ContactInfo },
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
