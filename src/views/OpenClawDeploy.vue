<template>
  <div class="deploy-page">
    <div class="max-w-4xl mx-auto px-6 py-24">
      <!-- Header -->
      <div class="mb-16">
        <router-link to="/projects" class="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>Back to Projects</span>
        </router-link>
        <h1 class="text-4xl md:text-5xl font-bold text-white mb-6">VPS 部署 OpenClaw 完整教程</h1>
        <div class="flex items-center gap-4 text-gray-400">
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            2024 年 3 月
          </span>
          <span class="flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            10 分钟阅读
          </span>
        </div>
      </div>

      <!-- Cost Summary -->
      <div class="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 mb-12 border border-purple-500/30">
        <h2 class="text-2xl font-bold text-white mb-4">💰 成本总结</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
            <h3 class="text-lg font-semibold text-white mb-2">阿里云学生服务器</h3>
            <p class="text-3xl font-bold text-purple-400">¥9.9</p>
            <p class="text-gray-400 text-sm mt-2">每月 / 学生优惠</p>
          </div>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
            <h3 class="text-lg font-semibold text-white mb-2">Coding Plan</h3>
            <p class="text-3xl font-bold text-blue-400">¥7</p>
            <p class="text-gray-400 text-sm mt-2">每月 / 内网穿透</p>
          </div>
        </div>
        <div class="mt-6 bg-[#0a0a0f] rounded-xl p-6 border border-purple-500/50">
          <p class="text-gray-400">总费用</p>
          <p class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">¥17/月</p>
        </div>
      </div>

      <!-- Content -->
      <div class="prose prose-invert max-w-none">
        <!-- Prerequisites -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">1</span>
            准备工作
          </h2>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
            <h3 class="text-lg font-semibold text-white mb-4">所需材料</h3>
            <ul class="space-y-3 text-gray-300">
              <li class="flex items-start gap-3">
                <span class="text-purple-400 mt-1">✓</span>
                <span>阿里云学生账号（需要学生认证）</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-purple-400 mt-1">✓</span>
                <span>Coding.net 账号</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-purple-400 mt-1">✓</span>
                <span>SSH 客户端（Windows 推荐 PowerShell，Mac/Linux 用终端）</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-purple-400 mt-1">✓</span>
                <span>Git（用于代码管理）</span>
              </li>
            </ul>
          </div>
        </section>

        <!-- Step 1 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">2</span>
            购买阿里云学生服务器
          </h2>
          <div class="space-y-6">
            <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-4">步骤</h3>
              <ol class="space-y-4 text-gray-300">
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">2.1</span>
                  <span>访问 <a href="https://www.aliyun.com/" target="_blank" class="text-purple-400 hover:underline">阿里云官网</a>，完成学生认证</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">2.2</span>
                  <span>进入"云翼计划"或"学生机"页面</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">2.3</span>
                  <span>选择最便宜的配置（通常 2 核 2G 或 2 核 4G）</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">2.4</span>
                  <span>选择操作系统：推荐 Ubuntu 22.04 LTS</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-purple-400 font-bold">2.5</span>
                  <span>完成支付，记录公网 IP、账号密码</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <!-- Step 2 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">3</span>
            配置 Coding Plan 内网穿透
          </h2>
          <div class="space-y-6">
            <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-4">步骤</h3>
              <ol class="space-y-4 text-gray-300">
                <li class="flex items-start gap-3">
                  <span class="text-blue-400 font-bold">3.1</span>
                  <span>访问 <a href="https://coding.net/" target="_blank" class="text-blue-400 hover:underline">Coding.net</a> 注册账号</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-blue-400 font-bold">3.2</span>
                  <span>购买 Coding Plan（7 元/月）</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-blue-400 font-bold">3.3</span>
                  <span>在 Coding 控制台配置内网穿透规则</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="text-blue-400 font-bold">3.4</span>
                  <span>获取穿透域名和配置信息</span>
                </li>
              </ol>
            </div>
          </div>
        </section>

        <!-- Step 3 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">4</span>
            连接 VPS 服务器
          </h2>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
            <h3 class="text-lg font-semibold text-white mb-4">SSH 连接命令</h3>
            <div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto">
              <code class="text-green-400 text-sm">ssh root@你的服务器 IP</code>
            </div>
            <p class="text-gray-400 text-sm mt-3">首次连接会询问是否信任，输入 yes 即可</p>
          </div>
        </section>

        <!-- Step 4 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">5</span>
            安装 OpenClaw
          </h2>
          <div class="space-y-6">
            <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-4">安装步骤</h3>
              <div class="space-y-4">
                <div>
                  <p class="text-gray-400 text-sm mb-2">1. 更新系统包</p>
                  <div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto">
                    <code class="text-green-400 text-sm">apt update && apt upgrade -y</code>
                  </div>
                </div>
                <div>
                  <p class="text-gray-400 text-sm mb-2">2. 安装 Node.js</p>
                  <div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto">
                    <code class="text-green-400 text-sm">curl -fsSL https://deb.nodesource.com/setup_20.x | bash -<br/>apt install -y nodejs</code>
                  </div>
                </div>
                <div>
                  <p class="text-gray-400 text-sm mb-2">3. 克隆 OpenClaw 仓库</p>
                  <div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto">
                    <code class="text-green-400 text-sm">git clone https://github.com/openclaw/openclaw.git<br/>cd openclaw</code>
                  </div>
                </div>
                <div>
                  <p class="text-gray-400 text-sm mb-2">4. 安装依赖</p>
                  <div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto">
                    <code class="text-green-400 text-sm">npm install</code>
                  </div>
                </div>
                <div>
                  <p class="text-gray-400 text-sm mb-2">5. 配置环境变量</p>
                  <div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto">
                    <code class="text-green-400 text-sm">cp .env.example .env<br/>nano .env  # 编辑配置</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Step 5 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">6</span>
            配置 QQ 机器人
          </h2>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
            <h3 class="text-lg font-semibold text-white mb-4">QQ 机器人配置</h3>
            <ol class="space-y-4 text-gray-300">
              <li class="flex items-start gap-3">
                <span class="text-purple-400 font-bold">6.1</span>
                <span>访问 <a href="https://bot.q.qq.com/" target="_blank" class="text-purple-400 hover:underline">QQ 机器人开放平台</a></span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-purple-400 font-bold">6.2</span>
                <span>创建机器人应用，获取 AppID 和 Token</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-purple-400 font-bold">6.3</span>
                <span>在 OpenClaw 配置文件中填入 QQ 机器人信息</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="text-purple-400 font-bold">6.4</span>
                <span>邀请机器人加入你的 QQ 群</span>
              </li>
            </ol>
          </div>
        </section>

        <!-- Step 6 -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">7</span>
            启动服务
          </h2>
          <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
            <h3 class="text-lg font-semibold text-white mb-4">启动命令</h3>
            <div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto">
              <code class="text-green-400 text-sm">npm run start</code>
            </div>
            <p class="text-gray-400 text-sm mt-3">建议使用 PM2 保持服务运行：</p>
            <div class="bg-[#0a0a0f] rounded-lg p-4 overflow-x-auto mt-2">
              <code class="text-green-400 text-sm">npm install -g pm2<br/>pm2 start npm --name "openclaw" -- run start<br/>pm2 save<br/>pm2 startup</code>
            </div>
          </div>
        </section>

        <!-- Troubleshooting -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">8</span>
            常见问题
          </h2>
          <div class="space-y-4">
            <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-3">Q: 学生认证失败怎么办？</h3>
              <p class="text-gray-300">A: 确保使用学信网可查的学籍信息，如果是大专/本科在读应该都能通过。</p>
            </div>
            <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-3">Q: SSH 连接不上？</h3>
              <p class="text-gray-300">A: 检查安全组是否开放了 22 端口，确认公网 IP 是否正确。</p>
            </div>
            <div class="bg-[#1a1a2e] rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-3">Q: OpenClaw 启动报错？</h3>
              <p class="text-gray-300">A: 查看日志文件，通常是配置错误或端口被占用，检查.env 文件配置。</p>
            </div>
          </div>
        </section>

        <!-- Conclusion -->
        <section class="mb-12">
          <div class="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 border border-purple-500/30">
            <h2 class="text-2xl font-bold text-white mb-4">🎉 完成！</h2>
            <p class="text-gray-300 mb-4">恭喜你成功部署 OpenClaw！现在你的 AI 代理已经 24/7 在线运行了。</p>
            <p class="text-gray-300">总成本：<span class="text-purple-400 font-bold">¥17/月</span>，享受你的 AI 助手吧！</p>
          </div>
        </section>
      </div>

      <!-- Back button -->
      <div class="text-center mt-16 pb-12">
        <router-link to="/projects" class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          <span>返回项目列表</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpenClawDeploy'
}
</script>

<style scoped>
.deploy-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #2a2a3e 100%);
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.prose :deep(h3) {
  color: #ffffff;
  margin-top: 1.5em;
}

.prose :deep(code) {
  font-family: 'JetBrains Mono', monospace;
}
</style>
