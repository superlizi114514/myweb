import { createApp } from 'vue'
import './style.css'

const App = {
  template: `
    <div style="font-family: Arial; padding: 40px;">
      <h1 style="color: #42b883;">🎉 Success!</h1>
      <p>If you see this, Vue is working correctly!</p>
      <p style="margin-top: 20px; padding: 20px; background: #f5f5f7; border-radius: 8px;">
        This is a simplified version without router.
      </p>
    </div>
  `
}

const app = createApp(App)
app.mount('#app')

console.log('✅ Simple app mounted!');
