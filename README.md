# Si-Infra

Web2 论坛 — 极简工业风，聚焦 AI、Stablecoin、Web3。

## 技术栈

- **Next.js 14** (App Router)
- **Tailwind CSS**
- **Supabase**（Auth、Database、Storage）
- 默认深色模式，背景色 `#1b2634`

## 功能

- **邮箱登录/注册**：`/login`
- **发帖**：登录后导航栏「发帖」→ `/new`，支持 Markdown 与图片上传
- **分类**：首页展示全部最新帖；AI / Stablecoin / Web3 为分类过滤
- **帖子详情**：`/post/[id]`，Markdown 渲染、评论
- **视频嵌入**：正文中的 YouTube、Bilibili 链接自动以播放器形式嵌入

## 本地开发

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 Supabase

1. 在 [Supabase](https://supabase.com) 创建项目。
2. 复制 `.env.local.example` 为 `.env.local`，填入：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. 在 Supabase **SQL Editor** 中执行 `supabase/schema.sql`，创建表与 RLS。
4. 在 **Storage** 中新建公开桶 `post-images`，策略：认证用户可上传、所有人可读。
5. （可选）在 **Database → Replication** 中为 `public.comments` 开启 Realtime，以实时看到新评论。

### 3. 启动

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)。

## 导航

- **Si-Infra**（Logo）→ 首页
- **AI** / **Stablecoin** / **Web3** → 分类页
- **About** → 关于
- **登录** / **发帖** / **退出** → 根据登录态显示
