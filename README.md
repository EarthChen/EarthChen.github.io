# EarthChen 在线工具集

个人在线工具导航站点，托管于 GitHub Pages。

## 访问地址

**主页**: https://earthchen.github.io/

## 工具列表

所有工具已统一迁移至 [web-tools](https://github.com/EarthChen/web-tools) 项目。

| 工具 | 描述 | 地址 |
|------|------|------|
| 证件照处理工具 | 智能抠图、背景替换、尺寸调整、体积压缩 | [/web-tools/photo-tool](https://earthchen.github.io/web-tools/photo-tool) |
| PDF 转 PNG | 免费在线将 PDF 文档转换为高质量 PNG 图片 | [/web-tools/pdf2png](https://earthchen.github.io/web-tools/pdf2png) |
| JSON 工具集 | 格式化、压缩、对比、JSONPath 查询等 | [/web-tools/json-tools](https://earthchen.github.io/web-tools/json-tools) |
| CSV/Excel 互转 | 高性能 CSV/Excel 互转，支持大文件 | [/web-tools/excelcsv-tool](https://earthchen.github.io/web-tools/excelcsv-tool) |

## 功能特性

- 响应式设计，适配手机/平板/电脑
- 支持深色/浅色模式切换
- 美观的渐变背景动画
- 毛玻璃效果卡片

## 技术栈

- React 18
- Vite
- Tailwind CSS
- pnpm

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

推送到 master 分支后 GitHub Actions 会自动构建并部署到 GitHub Pages。

## License

MIT
