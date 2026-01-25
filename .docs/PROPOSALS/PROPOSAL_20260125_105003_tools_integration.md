# 提案：工具集成与开发流程优化

**提案编号**: PROPOSAL_20260125_105003  
**创建时间**: 2026-01-25  
**状态**: Completed

---

## 背景

当前 `EarthChen.github.io` 作为个人在线工具集主页，已有一个工具 `photo-tools`（证件照处理工具）。现需要：
1. 添加 `pdf2png`（Python 项目）作为第二个工具入口
2. 统一管理多个工具仓库
3. 优化 `photo-tools` 的开发流程

## 目标

- 扩展工具集，增加 pdf2png 导航入口
- 使用 git submodule 统一管理工具仓库代码
- 将 photo-tools 包管理器迁移到 pnpm
- 为 photo-tools 配置分支预览流水线

---

## 实施计划

### 阶段一：主页添加 pdf2png 工具卡片

- [x] **1.1** 修改 `index.html`，将第一个"更多工具"占位卡片替换为 pdf2png 工具卡片
- [x] **1.2** 卡片链接指向 GitHub 仓库：`https://github.com/EarthChen/pdf2png`
- [x] **1.3** 更新 `README.md` 工具列表

### 阶段二：配置 Git Submodule

- [x] **2.1** 添加 `photo-tools` 为 submodule：`git submodule add git@github.com:EarthChen/photo-tools.git`
- [x] **2.2** 添加 `pdf2png` 为 submodule：`git submodule add git@github.com:EarthChen/pdf2png.git`
- [x] **2.3** 创建 `.gitmodules` 配置文件（自动生成）
- [x] **2.4** 提交 submodule 配置

### 阶段三：photo-tools 迁移到 pnpm

- [x] **3.1** 进入 `photo-tools` 子模块目录
- [x] **3.2** 删除旧的包管理器锁文件（`package-lock.json`）
- [x] **3.3** 使用 `pnpm install` 安装依赖，生成 `pnpm-lock.yaml`
- [x] **3.4** 更新 `deploy.yml` 工作流以使用 pnpm
- [x] **3.5** 在 photo-tools 仓库提交更改并推送

### 阶段四：photo-tools 流水线配置

- [x] **4.1** 创建 `.github/workflows/preview.yml` 用于预览非 main 分支
- [x] **4.2** 修改 `.github/workflows/deploy.yml` 已在阶段三完成（使用 pnpm）
- [x] **4.3** 配置预览环境（使用 GitHub Actions artifact + PR 评论通知）
- [x] **4.4** 已推送，流水线将自动触发部署

---

## 执行顺序

```
阶段一 → 阶段二 → 阶段三 → 阶段四
```

每个阶段完成后将调用反馈工具确认后再进入下一阶段。

---

## 风险与注意事项

1. **Submodule 与 GitHub Pages**: GitHub Pages 默认不会自动拉取 submodule，每个工具需要独立部署到各自仓库的 GitHub Pages
2. **pnpm 兼容性**: 需确认 photo-tools 项目的依赖与 pnpm 兼容
3. **流水线权限**: 需要确保 GitHub Actions 有足够权限进行部署

---

## 审批

请确认是否批准此提案并开始执行。
