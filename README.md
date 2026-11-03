# 小庄 Studio · 个人作品集博客

纯静态（HTML / CSS / JS，零依赖）个人站点，部署在 GitHub Pages：
https://xiaozhuangping-cpu.github.io/

## 内容

- 技能介绍：视频制作 / 管理系统 / App 开发 / 网页插件 / 网页官网
- 精选项目、可筛选的作品集（点击卡片弹窗查看详情）
- 合作流程、联系方式
- 响应式布局（手机 / 平板 / 桌面），暗色 / 亮色主题切换

## 修改

| 想改什么 | 改哪里 |
|---|---|
| 作品列表 | `main.js` 顶部的 `WORKS` 数组 |
| 技能、文案、联系方式 | `index.html` |
| 配色、字体 | `style.css` 顶部 `:root` 变量 |

## 本地预览

```bash
python3 -m http.server 8000
# 打开 http://localhost:8000
```

推送到 `main` 分支后 GitHub Pages 会自动更新。
