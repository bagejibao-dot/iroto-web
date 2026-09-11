# nofs14 检查记录

## 修改边界

基底：Iroto_Web_logo_v3_browser_help_nofs13.zip。

- index.html：只将帮助标题栏的占位元素和 X 对调位置，以及更新 nofs14 资源参数和版本文字。
- ui.css：只调整 .ui-close 的默认外观和聚焦样式。原 1px border 保留，移除额外 2px outline；键盘焦点通过原边框提亮表示。其他按钮的聚焦轮廓仍保留。
- app.js：只改版本常量。把该常量还原后与 nofs13 完全一致。
- styles.css、SVG、三张 PNG、manifest.webmanifest、sw.js 逐字节不变。
- node --check app.js 通过；PostCSS 解析两份 CSS 通过；HTML 没有重复 ID。
- 发布包不包含测试代码、模拟接口或截图。

## 本地浏览器核对

Chromium 144.0.7559.96，移动视口／触摸模拟。环境不允许本地测试 URL 导航，因此离线注入交付的 HTML、CSS、JS 和 SVG；不是实体 Safari。

7 种视口（320×568、360×640、390×780、430×932、568×320、844×390、640×280）× 日语、中文、英文，共 21 组前后对照：

- X 在标题右侧，镜像保留旧左侧位置的边距；点击范围 44×44px，SVG 居中。
- 标题、窗口、正文和版本页脚的几何位置／尺寸与 nofs13 保持相同，允许浮点误差小于 0.15 CSS px。
- 窗口处于可见区域内，正文无水平滚动溢出，关闭按钮和标题不重叠。
- 自动聚焦、重新键盘聚焦后：border 为 1px，outline 为 none / 0px，box-shadow 为 none。
- 正文滚动到底时，X、标题及版本页脚位置不动。
- 点击 X、重新打开、Escape 关闭均正常；版本后缀为 nofs14。
- 完成的页面测试未观察到未捕获脚本异常。

已目视核对日语竖屏、英语横屏截图，确认仅剩一条细圈。

## 限制

无实体 iPhone Safari / Android 测试；没有重测所有录制、传感器、系统键盘与硬件功能。这些 JavaScript 功能与 nofs13 的原代码保持一致，而不是已在本轮重新进行全功能验证。
