# Search Console 接入准备指南

**文档版本**: 1.0
**创建日期**: 2025-12-09
**适用阶段**: 网站上线后执行

---

## 📋 概述

本指南提供了在网站正式上线后,如何将多维AI课堂接入百度/Google/Bing Search Console的详细步骤。

**重要提醒**:
- ⚠️ 本文档中的操作需要等网站能够从公网访问后才能执行
- ✅ 现阶段可以做的准备工作已在"准备工作"章节中列出
- ⏸️ 实际的sitemap提交和抓取监控需要等网站上线后执行

---

## 🔧 准备工作(现在就可以做)

### 1. 域名级验证

在三大搜索平台创建Domain Property,使用DNS TXT记录方式验证域名所有权。

**优势**:
- 只需域名拥有权即可,不要求站点已上线
- 后续换服务器、换子域都无需重新验证
- 为上线后的快速接入打好基础

**操作步骤**:

#### 百度站长平台

1. 访问: https://ziyuan.baidu.com/
2. 点击"用户中心" → "站点管理" → "添加网站"
3. 输入域名: `www.doviai.com`
4. 选择验证方式: "DNS验证"
5. 复制提供的TXT记录
6. 在域名DNS管理后台添加TXT记录:
   ```
   主机记录: @
   记录类型: TXT
   记录值: [百度提供的验证代码]
   TTL: 600
   ```
7. 等待DNS生效(通常5-30分钟)
8. 返回百度站长平台点击"完成验证"

#### Google Search Console

1. 访问: https://search.google.com/search-console
2. 点击"添加资源" → "网址前缀"
3. 输入网址: `https://www.doviai.com`
4. 选择验证方式: "DNS记录"
5. 复制提供的TXT记录
6. 在域名DNS管理后台添加TXT记录(同百度)
7. 点击"验证"按钮

#### Bing Webmaster Tools

1. 访问: https://www.bing.com/webmasters
2. 点击"添加站点"
3. 输入网址: `https://www.doviai.com`
4. 选择验证方式: "XML文件验证"或"DNS验证"
5. 按照指引完成验证

### 2. robots.txt 和 sitemap.xml 准备

✅ **已完成**:
- `frontend/public/robots.txt` - 爬虫控制文件
- `frontend/public/sitemap.xml` - 站点地图(自动生成)
- `package.json` 中的 `npm run sitemap` 命令

**验证方式**:
```bash
# 本地验证sitemap生成
npm run sitemap

# 检查生成的文件
cat frontend/public/sitemap.xml
```

### 3. API密钥和推送脚本准备

**百度LinkSubmit API**:
1. 登录百度站长平台
2. 进入"数据引入" → "链接提交"
3. 选择"主动推送"方式
4. 复制接口调用地址和Token
5. 创建环境变量:
   ```bash
   BAIDU_PUSH_URL=http://data.zz.baidu.com/urls?site=www.doviai.com&token=YOUR_TOKEN
   ```

**Google Indexing API** (可选):
1. 访问 Google Cloud Console
2. 启用 Indexing API
3. 创建服务账号并下载JSON密钥
4. 在Search Console中添加服务账号为所有者
5. 保存JSON密钥到环境变量

**Bing URL Submission API**:
1. 登录 Bing Webmaster Tools
2. 访问"设置" → "API访问"
3. 生成API密钥
4. 保存到环境变量

---

## 🚀 上线后执行步骤

### Phase 1: 站点地图提交(上线当天)

#### 1. 验证站点可访问性

```bash
# 使用curl测试
curl -I https://www.doviai.com
curl -I https://www.doviai.com/sitemap.xml
curl -I https://www.doviai.com/robots.txt

# 预期结果: 返回200状态码
```

#### 2. 提交sitemap到百度

1. 登录百度站长平台
2. 进入"数据引入" → "sitemap"
3. 点击"添加新数据"
4. 输入sitemap地址: `https://www.doviai.com/sitemap.xml`
5. 选择更新周期: "周级更新"
6. 点击"提交"

#### 3. 提交sitemap到Google

1. 打开Google Search Console
2. 选择资源: `https://www.doviai.com`
3. 左侧菜单 → "站点地图"
4. 输入sitemap URL: `sitemap.xml`
5. 点击"提交"

#### 4. 提交sitemap到Bing

1. 打开Bing Webmaster Tools
2. 选择站点: `www.doviai.com`
3. 左侧菜单 → "站点地图"
4. 输入sitemap URL: `https://www.doviai.com/sitemap.xml`
5. 点击"提交"

### Phase 2: 手动抓取测试(上线后1小时内)

#### Google Rich Results Test

1. 访问: https://search.google.com/test/rich-results
2. 输入URL测试:
   - `https://www.doviai.com/`
   - `https://www.doviai.com/program/aigc-intermediate`
   - `https://www.doviai.com/course/photoshop-ai-design-basic`
3. 验证JSON-LD结构化数据是否被正确识别

#### 百度抓取诊断

1. 登录百度站长平台
2. 进入"抓取诊断"工具
3. 输入URL: `https://www.doviai.com/`
4. 点击"抓取"按钮
5. 检查返回状态:
   - HTTP状态码: 200 ✅
   - 页面类型: HTML
   - 字符集: UTF-8
   - 网页大小: >0KB

### Phase 3: 监控与优化(上线后7天内)

#### 监控指标

在Search Console中关注以下指标:

**抓取统计**:
- 每日抓取页面数
- 每日下载的千字节数
- 每日下载页面所用时间

**索引覆盖率**:
- 有效页面数(目标: 16个,与sitemap对应)
- 已排除页面数
- 错误数(目标: 0)

**结构化数据**:
- Course结构化数据项目数
- Program结构化数据项目数
- 错误和警告(目标: 0)

#### 常见问题处理

**问题1: sitemap提交后未被处理**
- 解决: 检查robots.txt是否正确配置
- 等待24-48小时,搜索引擎需要时间处理

**问题2: 部分URL未被索引**
- 解决: 在Search Console中手动请求索引
- 检查内部链接是否充足

**问题3: 结构化数据警告**
- 解决: 使用Rich Results Test重新验证
- 修复JSON-LD中的错误字段

---

## 📊 监控面板设置(可选)

### Google Data Studio 集成

1. 创建新报告
2. 添加数据源: Google Search Console
3. 创建图表:
   - 折线图: 每日抓取页面数
   - 饼图: 索引状态分布
   - 表格: Top 10高展现查询词

### 自定义监控脚本

创建 `scripts/check-indexing.js`:

```javascript
// 定期检查索引状态的脚本示例
import fetch from 'node-fetch'

const SITEMAP_URL = 'https://www.doviai.com/sitemap.xml'

async function checkIndexing() {
  // 获取sitemap中的所有URL
  const response = await fetch(SITEMAP_URL)
  const xml = await response.text()

  // 解析URL列表
  const urls = xml.match(/<loc>(.*?)<\/loc>/g)
    .map(loc => loc.replace(/<\/?loc>/g, ''))

  console.log(`总URL数: ${urls.length}`)

  // 逐个检查URL是否可访问
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: 'HEAD' })
      console.log(`${res.status} - ${url}`)
    } catch (error) {
      console.error(`ERROR - ${url}: ${error.message}`)
    }
  }
}

checkIndexing()
```

---

## ✅ 完成检查清单

### 准备阶段(现在可做)

- [ ] 百度站长平台域名验证完成
- [ ] Google Search Console域名验证完成
- [ ] Bing Webmaster Tools域名验证完成
- [ ] robots.txt文件已创建并测试
- [ ] sitemap.xml自动生成脚本已就绪
- [ ] 百度LinkSubmit API密钥已获取
- [ ] 监控面板已搭建(可选)

### 上线当天(网站可访问后)

- [ ] 站点首页返回200状态码
- [ ] sitemap.xml可公网访问
- [ ] robots.txt可公网访问
- [ ] 百度sitemap提交成功
- [ ] Google sitemap提交成功
- [ ] Bing sitemap提交成功
- [ ] 手动抓取测试通过(至少首页)
- [ ] JSON-LD结构化数据验证通过

### 上线后一周

- [ ] 百度抓取统计有数据
- [ ] Google抓取统计有数据
- [ ] 索引覆盖率达到80%以上
- [ ] 无严重错误和警告
- [ ] 结构化数据项目数符合预期

---

## 📚 参考资源

### 官方文档

- [百度站长平台使用指南](https://ziyuan.baidu.com/college/courseinfo?id=267)
- [Google Search Console帮助](https://support.google.com/webmasters)
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)

### sitemap协议

- [Sitemaps XML格式](https://www.sitemaps.org/protocol.html)
- [Google sitemap最佳实践](https://developers.google.com/search/docs/advanced/sitemaps/overview)

### 结构化数据

- [Schema.org Course](https://schema.org/Course)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [JSON-LD规范](https://json-ld.org/)

---

**更新记录**:
- 2025-12-09: 初始版本,基于Phase 3实施计划创建
