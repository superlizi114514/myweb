<template>
  <div class="templates-page">
    <div class="max-w-6xl mx-auto px-6 py-16">
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
          Website Templates
        </h1>
        <p class="text-gray-400 text-lg">选择您喜欢的模板，快速搭建您的网站</p>
      </div>

      <!-- Templates Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="template in templates"
          :key="template.id"
          class="template-card group cursor-pointer"
          @click="goToTemplate(template.path)"
        >
          <div class="card-image-wrapper">
            <div class="card-image" :style="{ background: template.gradient }">
              <span class="template-icon">{{ template.icon }}</span>
            </div>
            <div class="card-overlay">
              <span class="view-btn">查看模板</span>
            </div>
          </div>
          <div class="card-content">
            <h3 class="card-title">{{ template.name }}</h3>
            <p class="card-desc">{{ template.description }}</p>
            <div class="card-tags">
              <span v-for="tag in template.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Templates',
  data() {
    return {
      templates: [
        {
          id: 1,
          name: '购物商城',
          path: '/shopping',
          icon: '🛒',
          description: '现代化电商模板，支持商品展示、分类导航、促销活动',
          gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          tags: ['电商', '响应式']
        },
        {
          id: 2,
          name: '企业官网',
          path: '/corporate',
          icon: '🏢',
          description: '专业企业形象展示，适合公司介绍、团队展示',
          gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          tags: ['企业', '专业']
        },
        {
          id: 3,
          name: '社区论坛',
          path: '/forum',
          icon: '💬',
          description: '社区交流平台模板，支持帖子列表、用户互动',
          gradient: 'linear-gradient(135deg, #ee0979 0%, #ff6a00 100%)',
          tags: ['社区', '互动']
        },
        {
          id: 4,
          name: '在线教育',
          path: '/education',
          icon: '📚',
          description: '教育平台模板，课程展示、学习进度追踪',
          gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          tags: ['教育', '课程']
        },
        {
          id: 5,
          name: '音乐播放',
          path: '/music',
          icon: '🎵',
          description: '音乐主题模板，专辑展示、播放列表',
          gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          tags: ['音乐', '娱乐']
        },
        {
          id: 6,
          name: '健身运动',
          path: '/fitness',
          icon: '💪',
          description: '健身主题模板，课程安排、教练介绍',
          gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          tags: ['健身', '运动']
        },
        {
          id: 7,
          name: '宠物之家',
          path: '/pet',
          icon: '🐾',
          description: '宠物主题模板，宠物展示、服务介绍',
          gradient: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
          tags: ['宠物', '可爱']
        },
        {
          id: 8,
          name: '个人作品集',
          path: '/portfolio',
          icon: '🎨',
          description: '作品展示模板，项目案例、技能展示',
          gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)',
          tags: ['作品', '创意']
        },
        {
          id: 9,
          name: '餐厅美食',
          path: '/restaurant',
          icon: '🍽️',
          description: '餐厅主题模板，菜品展示、在线预订',
          gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
          tags: ['餐饮', '美食']
        },
        {
          id: 10,
          name: '旅游出行',
          path: '/travel',
          icon: '✈️',
          description: '旅游主题模板，目的地展示、行程规划',
          gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
          tags: ['旅游', '探索']
        },
        {
          id: 11,
          name: '极简风格',
          path: '/minimal',
          icon: '✨',
          description: '极简设计模板，简洁优雅、专注内容',
          gradient: 'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
          tags: ['极简', '优雅']
        }
      ]
    }
  },
  methods: {
    goToTemplate(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.templates-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
}

.template-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.template-card:hover {
  transform: translateY(-8px);
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 20px 40px rgba(139, 92, 246, 0.2);
}

.card-image-wrapper {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.template-card:hover .card-image {
  transform: scale(1.05);
}

.template-icon {
  font-size: 48px;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.template-card:hover .card-overlay {
  opacity: 1;
}

.view-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 8px;
}

.card-desc {
  font-size: 14px;
  color: #9ca3af;
  line-height: 1.5;
  margin-bottom: 12px;
}

.card-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag {
  font-size: 12px;
  padding: 4px 10px;
  background: rgba(139, 92, 246, 0.2);
  color: #a78bfa;
  border-radius: 12px;
}
</style>