# Inkling — 官方落地页

Inkling 技能的官方网站。这是一个基于 Vite + React 19 + Tailwind CSS v4 的静态站点，部署在 GitHub Pages。

## 技术栈

- **构建**：Vite 8
- **框架**：React 19
- **样式**：Tailwind CSS v4（Vite 插件模式）
- **图标**：lucide-react
- **字体**：Fraunces（衬线显示字）、Inter（无衬线正文）、JetBrains Mono（等宽）
- **部署**：GitHub Pages

## 本地开发

```bash
npm install
npm run dev        # 启动开发服务器
npm run build      # 构建生产版本
npm run preview    # 预览生产版本
npm run deploy     # 部署到 GitHub Pages
```

## 目录结构

```
.
├── index.html              # 入口 HTML（含 Google Fonts 链接）
├── vite.config.js          # Vite 配置（集成 Tailwind v4 插件）
├── public/
│   └── favicon.svg         # 站点图标
└── src/
    ├── main.jsx            # React 挂载入口
    ├── index.css           # Tailwind 入口 + 设计 Token + 自定义动画
    └── App.jsx             # 落地页主体（含 i18n）
```

## 设计

- 编辑式深色基调（暖墨黑 `#0a0905` + 琥珀重点色 `#d4a574`）
- 非对称版式，1240px 主容器
- 显式的大字体反差（Fraunces 衬线显示字 + Inter 正文 + JetBrains Mono 标签）
- 收敛图（convergence diagram）作为 Hero 视觉锚点
- 中英双语切换（顶部 ZH / EN 开关）

## 部署

构建产物输出至 `dist/`，自动部署到 `https://eververdants.github.io/inkling`。

## 许可

MIT
