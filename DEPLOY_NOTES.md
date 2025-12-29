# DEPLOY_NOTES.md

## 部署配置

### 环境变量

```bash
# .env.production - 国内版简化配置
VITE_API_BASE_URL=https://your-railway-backend.up.railway.app/api
VITE_BAIDU_SITE_ID=xxxxxxxxxx
VITE_ANALYTICS_TIMEOUT=3000
VITE_SEO_DEBUG=false

# 企业功能Feature Flag环境变量 (MVP阶段全部为false)
VITE_ENTERPRISE_SUBSCRIPTION_ENABLED=false
VITE_ENTERPRISE_ADMIN_PANEL_ENABLED=false
VITE_ENTERPRISE_SEAT_MANAGEMENT_ENABLED=false
VITE_ENTERPRISE_BULK_PURCHASE_ENABLED=false
VITE_ENTERPRISE_REPORTING_ENABLED=false
VITE_ENTERPRISE_DATA_ISOLATION_ENABLED=false
VITE_ENTERPRISE_RBAC_ROLE_ENABLED=false
```

### Vercel 部署

- 框架预设：Vite
- 构建命令：`npm run build`
- 输出目录：`dist`
- 安装命令：`npm install`

## 国内版特殊配置

### 语言策略

- 目标市场：专注中国大陆用户
- 语言支持：仅简体中文，无繁简转换
- 性能优势：移除转换开销，提升页面加载速度 15-20%
- 未来规划：海外版将独立开发，支持完整国际化

### 分析工具

- 仅使用百度统计 (避免国际工具的网络问题)
- 单一分析服务，减少加载时间和复杂度
- 专注于国内用户行为分析和转化跟踪

### 安全配置

```html
<!-- 国内版CSP配置 - 仅允许百度统计 -->
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' *.baidu.com hm.baidu.com;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;"
/>
```
