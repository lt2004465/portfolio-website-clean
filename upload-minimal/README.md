# Lennon - 个人作品集网站

一个现代化的个人作品集网站，专为文案创作者和广告人设计。

## ✨ 特性

- 🎨 现代化设计，完全响应式
- ⚡ Next.js 14 + FastAPI 高性能架构  
- 🔐 JWT认证的管理后台
- 📱 移动端优化
- 🚀 一键部署到Vercel + Railway

## 🛠️ 技术栈

**前端**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand

**后端**
- FastAPI
- PostgreSQL
- SQLAlchemy
- JWT认证

## 🚀 快速开始

### 本地开发

1. **克隆项目**
   ```bash
   git clone <your-repo-url>
   cd your-portfolio
   ```

2. **启动后端**
   ```bash
   cd backend
   uv sync --dev
   uv run uvicorn main:app --reload --port 8000
   ```

3. **启动前端**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **访问应用**
   - 前端: http://localhost:3000
   - 后端API: http://localhost:8000
   - API文档: http://localhost:8000/docs

### 部署到线上

详细部署指南请查看 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📁 项目结构

```
个人作品集网站/
├── frontend/          # Next.js前端
├── backend/           # FastAPI后端
├── 项目文档/           # 项目文档
└── DEPLOYMENT.md      # 部署指南
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
