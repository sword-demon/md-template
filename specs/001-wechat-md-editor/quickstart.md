# Quickstart: 微信公众号 Markdown 编辑器

本指南帮助开发者快速启动项目开发环境。

## Prerequisites

- Node.js 20.x 或更高版本
- pnpm 9.x（推荐）或 npm/yarn
- 现代浏览器（Chrome、Firefox、Safari、Edge）

## 1. 项目初始化

```bash
# 创建 Next.js 项目
pnpm create next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"

# 安装核心依赖
pnpm add unified remark-parse remark-gfm remark-rehype rehype-stringify zod

# 安装 shadcn/ui CLI
pnpm add -D @shadcn/ui

# 初始化 shadcn/ui
pnpm dlx shadcn@latest init
```

## 2. 配置 TypeScript Strict Mode

编辑 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## 3. 安装 shadcn/ui 组件

```bash
# 基础组件
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add select
pnpm dlx shadcn@latest add toast
pnpm dlx shadcn@latest add dropdown-menu
```

## 4. 创建目录结构

```bash
# 创建组件目录
mkdir -p components/{layout,editor,preview}
mkdir -p lib/{markdown,styles,clipboard,hooks}
mkdir -p types
mkdir -p __tests__/{unit,integration}
```

## 5. 配置 Neobrutalism 主题

编辑 `app/globals.css`：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Neobrutalism Colors */
    --color-primary: #FFE135;
    --color-secondary: #FF6B6B;
    --color-accent: #4ECDC4;
    --color-background: #FFFFFF;
    --color-surface: #F5F5F5;
    --color-text: #000000;
    
    /* Neobrutalism Border */
    --border-width: 3px;
    --border-color: #000000;
    
    /* Neobrutalism Shadow */
    --shadow-offset: 4px;
    --shadow-color: #000000;
  }
}

/* Neobrutalism Button Style */
.btn-neo {
  @apply border-[3px] border-black bg-[var(--color-primary)] px-4 py-2 font-bold;
  box-shadow: 4px 4px 0 var(--shadow-color);
  transition: transform 0.1s, box-shadow 0.1s;
}

.btn-neo:hover {
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0 var(--shadow-color);
}

.btn-neo:active {
  transform: translate(4px, 4px);
  box-shadow: none;
}
```

## 6. 验证开发环境

```bash
# 启动开发服务器
pnpm dev

# 访问 http://localhost:3000
```

## 7. 运行测试

```bash
# 安装测试依赖
pnpm add -D vitest @testing-library/react @testing-library/jest-dom jsdom

# 运行测试
pnpm test
```

## 8. 构建验证

```bash
# TypeScript 类型检查
pnpm tsc --noEmit

# ESLint 检查
pnpm lint

# 生产构建
pnpm build
```

## Quick Verification Checklist

- [ ] `pnpm dev` 启动成功，访问 localhost:3000 显示页面
- [ ] TypeScript strict 模式启用（`pnpm tsc --noEmit` 无错误）
- [ ] TailwindCSS 生效（页面显示样式）
- [ ] shadcn/ui 组件可用（Button 等组件渲染正常）

## Common Issues

### 1. pnpm 未安装

```bash
npm install -g pnpm
```

### 2. Node 版本过低

```bash
# 使用 nvm 切换版本
nvm install 20
nvm use 20
```

### 3. TypeScript 严格模式报错

确保所有函数参数和返回值都有类型标注，避免使用 `any`。

### 4. shadcn/ui 初始化失败

确保 `components.json` 配置正确，tailwind 路径匹配项目结构。

## Next Steps

1. 阅读 [plan.md](./plan.md) 了解完整实现计划
2. 阅读 [data-model.md](./data-model.md) 了解数据结构
3. 阅读 [contracts/](./contracts/) 了解组件接口
4. 执行 `/speckit.tasks` 生成任务清单
