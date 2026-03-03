# My Portfolio - Apple Style

一个采用 Apple 设计风格的 Vue 3 个人作品集网站 + 博客。

## 🎨 特性

- ✨ Apple 极简设计美学
- 🚀 Vue 3 + Vite 快速构建
- 📱 完全响应式
- 🎯 Vue Router 路由
- 🗃️ Pinia 状态管理
- 💨 Tailwind CSS 样式
- 📝 博客功能
- 🚀 Vercel 一键部署

## 📦 页面结构

- **首页** - Hero 区域 + 精选项目 + 技能展示
- **关于我** - 个人故事 + 时间线 + 技能分类
- **项目集** - 项目展示 + 分类筛选
- **博客** - 文章列表 + 详情
- **联系** - 联系方式 + 留言表单

## 🛠️ 开发

```bash
# 进入项目目录
cd my-portfolio

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 🚀 部署到 Vercel

### 方式 1：Vercel CLI（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 方式 2：GitHub + Vercel

1. 将代码推送到 GitHub
2. 访问 [vercel.com](https://vercel.com)
3. 导入 GitHub 仓库
4. 自动部署完成！

## 📝 自定义内容

### 修改个人信息

编辑以下文件替换占位内容：
- `src/views/Home.vue` - 首页姓名、介绍
- `src/views/About.vue` - 关于页面、时间线、技能
- `src/views/Projects.vue` - 项目列表
- `src/views/Blog.vue` - 博客文章
- `src/views/Contact.vue` - 联系方式
- `src/components/AppLayout.vue` - 社交链接

### 替换图片

图片使用 picsum 占位图，替换为你自己的图片：
- 本地图片放在 `public/` 目录
- 或使用外部图片 URL

## 📄 许可证

MIT
