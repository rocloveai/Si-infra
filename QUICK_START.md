# 🚀 快速开始 - 5 分钟部署到 Vercel

## 第一步: 获取 Vercel 信息 (2 分钟)

### 1. 获取 Vercel Token

访问: https://vercel.com/account/tokens

```
点击 "Create Token"
→ 名称: github-actions
→ Scope: Full Account
→ 点击 "Create"
→ 复制 Token (只显示一次!)
```

### 2. 首次部署项目到 Vercel

访问: https://vercel.com

```
点击 "Add New..." → "Project"
→ 选择 "Si-infra" 仓库
→ 点击 "Deploy"
```

**重要**: 首次部署后,记录以下信息:

打开项目 → Settings → General:
- **Project ID**: `prj_xxxxxxxxxxxxx`

点击右上角头像 → Settings → General:
- **Your ID** (ORG_ID): `team_xxxxxxxxxxxxx`

---

## 第二步: 配置 GitHub Secrets (2 分钟)

访问: https://github.com/rocloveai/Si-infra/settings/secrets/actions

点击 "New repository secret" 添加 3 个 secrets:

| Name | Value | 说明 |
|------|-------|------|
| `VERCEL_TOKEN` | 第一步获取的 Token | Vercel API Token |
| `VERCEL_ORG_ID` | `team_xxxxx...` | 您的 Vercel 账户 ID |
| `VERCEL_PROJECT_ID` | `prj_xxxxx...` | Si-infra 项目 ID |

---

## 第三步: 配置 Supabase 环境变量 (1 分钟)

在 Vercel 项目中添加环境变量:

访问: https://vercel.com/[your-username]/si-infra/settings/environment-variables

添加 2 个变量(所有环境都选择):

| Name | Value | 获取位置 |
|------|-------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJxxx...` | Supabase → Settings → API |

---

## 第四步: 触发部署 (1 分钟)

### 方式一: 推送代码(推荐)

```bash
cd Si-infra
git add .
git commit -m "Setup Vercel auto-deployment"
git push origin main
```

### 方式二: 手动触发

访问: https://github.com/rocloveai/Si-infra/actions

```
选择 "Deploy to Vercel" 工作流
→ 点击 "Run workflow"
→ 点击绿色 "Run workflow" 按钮
```

---

## 完成! 🎉

等待 2-3 分钟,部署完成后:

1. **查看部署状态**: https://github.com/rocloveai/Si-infra/actions
2. **访问网站**: https://si-infra.vercel.app (或您的自定义域名)
3. **Vercel Dashboard**: https://vercel.com

---

## 验证清单

- [ ] Vercel Token 已创建
- [ ] 项目已首次部署到 Vercel
- [ ] 3 个 GitHub Secrets 已配置
- [ ] 2 个 Supabase 环境变量已添加
- [ ] 代码已推送或手动触发部署
- [ ] GitHub Actions 显示绿色勾号
- [ ] 网站可以正常访问

---

## 后续使用

配置完成后,每次您推送代码到 `main` 分支:
- ✅ 自动触发 GitHub Actions
- ✅ 自动构建项目
- ✅ 自动部署到 Vercel
- ✅ 2-3 分钟后更新生效

无需任何手动操作!

---

## 遇到问题?

查看详细配置指南: [VERCEL_SETUP.md](./VERCEL_SETUP.md)

常见问题:
- **部署失败**: 检查 GitHub Actions 日志
- **网站报错**: 检查 Vercel 环境变量
- **Token 无效**: 重新创建 Vercel Token
