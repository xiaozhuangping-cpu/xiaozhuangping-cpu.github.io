# 小庄 Studio · 个人作品集博客

个人站点部署在 https://xiaozhuangping-cpu.github.io/ 。页面使用静态 HTML / CSS / JavaScript，作品列表从云端 Supabase 的 `public.blog_works` 读取，修改数据库后刷新博客即可看到更新。

## 维护作品

在 Supabase 项目 Table Editor 中打开 `public.blog_works`：

- `published`：是否在博客显示；`false` 的记录不会通过公开接口返回。
- `sort_order`：同一展示优先级内数字越小越靠前；在线项目仍排在其他作品之前。
- `data`：JSON 对象，包含作品信息。可以复制已有记录修改；字段示例：

```json
{
  "cat": "web", "title": "作品名称", "for": "适用对象", "desc": "作品介绍",
  "icon": "✳️", "hue": 105, "time": "在线", "live": true,
  "img": "assets/works/example.jpg", "gallery": ["https://example.com/image.jpg"],
  "tags": ["React", "Supabase"],
  "links": [{"label": "在线体验 →", "href": "https://example.com/", "primary": true}]
}
```

分类 `cat` 可用 `video`、`admin`、`app`、`ext`、`web`。`img`、`gallery`、`links` 可省略；图片和视频可以填写可公开访问的 HTTP(S) 地址，或博客仓库中已有资源的相对路径。博客不会自动上传文件。删除记录前请确认；推荐先将 `published` 设为 `false`。前台使用公开客户端 key，只能读取已发布作品；增删改通过 Supabase 管理后台完成。

其他文案修改 `index.html`，配色修改 `style.css`。数据库初始化脚本位于 `supabase/migrations/20261111000000_blog_works.sql`，已包含原有 15 条作品的初始数据；不要在已有数据的项目重复运行。云端现有电商演示重置函数不直接操作该独立表，修改重置逻辑时需重新核验。

## 本地预览

```sh
python3 -m http.server 8000
```

访问 http://localhost:8000 。推送 `main` 后 GitHub Pages 自动发布。站点及其中作品由作者策划，使用 AI 辅助生成。
