# 栗子的个人网站 - My Web

一个采用现代设计风格的 Vue 3 个人网站，支持全局音乐播放器。

**在线预览:** https://superlizi114514.github.io/myweb/

---

## 🎨 特性

- ✨ 现代渐变设计美学
- 🚀 Vue 3 + Vite 快速构建
- 📱 完全响应式（手机端优化）
- 🎯 Vue Router 路由导航
- 🎵 **全局音乐播放器**（所有页面可用）
- 💨 Tailwind CSS 样式
- 🚀 Vercel / GitHub Pages 部署

---

## 📦 页面结构

| 页面 | 路由 | 描述 |
|------|------|------|
| 首页 | `/` | Hero 区域 + 精选项目 + 技能展示 |
| 关于我 | `/about` | 个人故事 + 介绍 |
| 项目集 | `/projects` | 项目展示 |
| 博客 | `/blog` | 文章列表 |
| 商店 | `/shop` | 商品展示 |
| 联系 | `/contact` | 联系方式 |

---

## 🎵 音乐播放器功能

**特点:**
- 🎧 固定于页面左下角，所有页面可用
- 🎼 支持多首歌曲切换
- 🔊 可调节音量
- 💾 自动保存播放状态（localStorage）
- 📱 手机端优化

**添加新歌曲:**
编辑 `src/components/MusicPlayer.vue` 中的 `songs` 数组：

```javascript
songs: [
  { name: '歌曲名', url: '/myweb/music3.mp3' },
  // 添加更多歌曲...
]
```

音乐文件放在 `public/myweb/` 目录下。

---

## 🛠️ 开发

```bash
# 进入项目目录
cd myweb

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

---

## 🚀 部署

### 方式 1：GitHub Pages（当前使用）

```bash
# 构建
npm run build

# 推送 gh-pages 分支
# 配置 GitHub Pages 使用 gh-pages 分支
```

### 方式 2：Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

---

## 📁 项目结构

```
myweb/
├── public/
│   └── myweb/
│       ├── music1.mp3      # 音乐文件
│       └── music2.mp3
├── src/
│   ├── components/
│   │   ├── MusicPlayer.vue    # 🎵 音乐播放器组件
│   │   ├── TypewriterText.vue # 打字机效果文字
│   │   ├── BackgroundTags.vue # 背景标签
│   │   └── ...
│   ├── views/
│   │   ├── Home.vue           # 首页
│   │   ├── About.vue          # 关于页
│   │   ├── Projects.vue       # 项目页
│   │   ├── Blog.vue           # 博客页
│   │   ├── Shop.vue           # 商店页
│   │   └── ...
│   ├── App.vue                # 主应用（含全局音乐播放器）
│   └── main.js
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

## 🔧 技术栈

- **框架:** Vue 3
- **构建工具:** Vite
- **路由:** Vue Router 4
- **样式:** Tailwind CSS
- **部署:** GitHub Pages

---

## 📝 自定义内容

### 修改个人信息
- `src/views/Home.vue` - 首页姓名、介绍、项目
- `src/views/About.vue` - 关于页面内容
- `src/App.vue` - 页脚版权信息

### 修改音乐
- `src/components/MusicPlayer.vue` - 歌曲列表
- `public/myweb/` - 音乐文件目录

---

## 📄 许可证

MIT

---

**© 2026 栗子 · Powered by OpenClaw + Qwen3.5-Plus**
