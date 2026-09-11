# Iroto Web — recording timer alignment / no fullscreen 7

版本：`2.14.1-beat-haptic-stronger-logo-v3-browser-nofs7`

直接基于 nofs6 修改。保留不自动全屏、旋转后操作轴同步、仅录制时显示居中计时框、毛玻璃和 280 ms 红白白白节拍点。

## 本次修改

### 录制时间的垂直对齐

录制数字保留原等宽字体、字号和固定宽度。单独明确数字的单行行高与零内外边距；使用 `text-box-trim: trim-both` 与 `text-box-edge: cap alphabetic` 修正字体顶部/底部不对称留白。这样 flex 居中参照的是可见数字高度，而不是包含字体留白的行框。计时框和节拍点本身的大小、位置不变。

Safari 18.2 起支持这组文字边界属性；Chrome 从 133 起支持。未支持的浏览器忽略这些属性，保留原来的单行 flex 居中，不使用硬编码像素位移。

### iPhone / iPad 选择图片：尝试避开相机来源菜单

**本版有明确的使用取舍：iOS 上改走“文件”，不再直接打开“照片图库”。**

现有 `accept="image/*"` 会使 iOS WebKit 提供照片图库/拍照/选取文件的来源菜单。仅删掉 `capture` 不够；在当前 WebKit 源码中，空的 accept 类型也会允许图片/视频来源。

本版只在 iPhone/iPad（含以 Mac 身份访问网页的 iPadOS）设置 `accept="application/octet-stream"`，尝试通过通用数据类型进入文档选择路径。它是基于 WebKit 实现的变通办法，不是 HTML 标准提供的“禁用拍照”属性。尚未通过实体 iPhone 验证，具体系统菜单仍由浏览器/系统决定。

- iOS 上按钮文字同步为「画像ファイルを選択 / 选择图片文件 / Choose Image File」。
- 首页、演奏中替换照片等入口仍使用同一个 file input。
- Android 和桌面仍为 `accept="image/*"`，不改变原先选图方式。
- 因“文件”允许更多类型，在导入前拦截明显的非图片；不明/通用 MIME 仍交由原图片解码器验证。
- 取消选择、选错文件或解码失败不会清空原来的照片。
- 未添加相机访问、照片上传、格式转换或额外的权限申请。

iPhone 可先在“照片”中选择已保存的图片，通过分享菜单“存储到文件”，再回网页导入。若 HEIC 等格式无法读取，可改用 JPEG / PNG；本次没有加入 HEIC 转换库。

## 不变的内容

传感器、准星平滑、方向切换、取色、音频时序、强弱拍振动、节拍点 280 ms 亮灭时序、计时起点、录像画布/编码和视频保存不变。SVG、三张 PNG 图标、manifest 和 sw.js 与 nofs6 逐字节一致。桌面快捷方式仍使用 browser 模式。

## 更新

解压后，把文件夹里的内容覆盖到原发布目录，保留 index.html 的位置。版本与 HTML 资源查询标识以 `nofs7` 结尾。nofs6 未覆盖，便于对比。

## 验证与限制

见 CHECKS.md。已做本地 Chromium 的几何、文字像素、选图与录制流程检查。模拟 iPhone 的用户代理只用于验证代码分支，不会生成 iOS 原生选择菜单，也不能证明原生拍照项已经消失。实体 iPhone / iPad 仍需确认本版能否直接打开“文件”，以及已保存图片是否可选。

## 实现依据

- WebKit iOS 文件选择实现（`presentWithParameters`、`UTIsForMIMETypes`、`showDocumentPickerMenu`）：
  https://github.com/WebKit/WebKit/blob/main/Source/WebKit/UIProcess/ios/forms/WKFileUploadPanel.mm
- Apple：Uniform Type Identifiers — a reintroduction（public.image 属于 public.data）：
  https://developer.apple.com/videos/play/tech-talks/10696/
- WebKit Safari 18.2，Text box：
  https://webkit.org/blog/16301/webkit-features-in-safari-18-2/
- Chrome，CSS text-box-trim：
  https://developer.chrome.com/blog/css-text-box-trim

以上实现分析是变通方案的依据，不是对所有 iOS 版本的兼容保证。
