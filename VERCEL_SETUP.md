# Vercel 自动部署配置指南

本项目已配置 GitHub Actions 自动部署到 Vercel。每次推送到 `main` 分支时,会自动触发部署。

## 配置步骤

### 1. 创建 Vercel 项目

1. 访问 https://vercel.com 并使用 GitHub 账号登录
2. 点击 "Add New..." → "Project"
3. 导入 `Si-infra` 仓库
4. **重要**: 在部署前,先添加环境变量(见下方步骤 3)
5. 点击 "Deploy" 完成首次部署

### 2. 获取 Vercel Token

1. 访问 https://vercel.com/account/tokens
2. 点击 "Create Token"
3. 输入 Token 名称(如 `github-actions`)
4. 选择 Scope: "Full Account"
5. 点击 "Create" 并**复制 Token**(只显示一次!)

### 3. 获取 Vercel 项目信息

#### 方法一: 通过 Vercel Dashboard

1. 进入您的 Vercel 项目
2. 点击 "Settings" → "General"
3. 找到 "Project ID" 并复制
4. 返回 Vercel 首页,点击右上角头像 → "Settings"
5. 在 "General" 中找到 "Your ID" (这是 ORG_ID)

#### 方法二: 通过 Vercel CLI (推荐)

在本地项目目录运行:
```bash
# 登录 Vercel
vercel login

# 链接项目
vercel link

# 查看项目信息
cat .vercel/project.json
```

您会看到类似这样的内容:
```json
{
  "orgId": "team_xxxxxxxxxxxxx",
  "projectId": "prj_xxxxxxxxxxxxx"
}
```

### 4. 配置 GitHub Secrets

1. 访问您的 GitHub 仓库: https://github.com/rocloveai/Si-infra
2. 点击 "Settings" → "Secrets and variables" → "Actions"
3. 点击 "New repository secret" 添加以下三个 secrets:

   **Secret 1: VERCEL_TOKEN**
   - Name: `VERCEL_TOKEN`
   - Value: 步骤 2 中获取的 Token

   **Secret 2: VERCEL_ORG_ID**
   - Name: `VERCEL_ORG_ID`
   - Value: 步骤 3 中获取的 orgId (如 `team_xxxxxxxxxxxxx`)

   **Secret 3: VERCEL_PROJECT_ID**
   - Name: `VERCEL_PROJECT_ID`
   - Value: 步骤 3 中获取的 projectId (如 `prj_xxxxxxxxxxxxx`)

### 5. 配置 Vercel 环境变量

在 Vercel 项目设置中添加环境变量:

1. 进入 Vercel 项目 → "Settings" → "Environment Variables"
2. 添加以下变量(所有环境都选择):

   **变量 1: NEXT_PUBLIC_SUPABASE_URL**
   - Value: 您的 Supabase 项目 URL
   - 示例: `https://xxxxxxxxxxxxx.supabase.co`

   **变量 2: NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: 您的 Supabase Anon Key
   - 在 Supabase Dashboard → Settings → API 中获取

### 6. 触发自动部署

配置完成后,有两种方式触发部署:

**方式一: 推送代码**
```bash
git add .
git commit -m "Configure Vercel deployment"
git push origin main
```

**方式二: 手动触发**
1. 访问 GitHub 仓库 → "Actions"
2. 选择 "Deploy to Vercel" 工作流
3. 点击 "Run workflow"

### 7. 查看部署状态

1. 在 GitHub 仓库的 "Actions" 标签页查看工作流运行状态
2. 在 Vercel Dashboard 查看部署详情
3. 部署成功后,访问 Vercel 提供的域名

---

## 常见问题

### Q: 部署失败,提示 "Invalid token"
**A:** 检查 `VERCEL_TOKEN` 是否正确配置,Token 是否过期。

### Q: 部署失败,提示 "Project not found"
**A:** 检查 `VERCEL_PROJECT_ID` 和 `VERCEL_ORG_ID` 是否正确。

### Q: 网站访问报错 "Missing environment variables"
**A:** 在 Vercel 项目设置中添加 Supabase 环境变量。

### Q: 如何回滚到之前的版本?
**A:** 在 Vercel Dashboard → Deployments 中找到之前的部署,点击 "Promote to Production"。

### Q: 如何配置自定义域名?
**A:** 在 Vercel 项目 → Settings → Domains 中添加域名,并按提示配置 DNS。

---

## 工作流说明

GitHub Actions 工作流 (`.github/workflows/deploy.yml`) 会在以下情况触发:

- ✅ 推送到 `main` 分支
- ✅ 创建针对 `main` 分支的 Pull Request

工作流执行步骤:
1. 检出代码
2. 设置 Node.js 环境
3. 安装 Vercel CLI
4. 拉取 Vercel 环境配置
5. 构建项目
6. 部署到 Vercel 生产环境

---

## 获取永久域名

部署成功后,您会获得:

1. **Vercel 默认域名**: `your-project.vercel.app`
   - 永久有效
   - 自动 HTTPS
   - 全球 CDN 加速

2. **自定义域名** (可选):
   - 在 Vercel 项目设置中添加
   - 需要配置 DNS 记录
   - 示例: `si-infra.com`

---

## 下一步

配置完成后,您的网站将:
- ✅ 每次代码推送自动部署
- ✅ 拥有永久访问域名
- ✅ 全球 CDN 加速
- ✅ 自动 HTTPS 证书
- ✅ 无限带宽(免费套餐)

如有问题,请查看:
- GitHub Actions 运行日志
- Vercel 部署日志
- 本文档的常见问题部分
