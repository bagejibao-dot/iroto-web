# nofs7 检查记录

## 源码边界

- node --check app.js 通过。
- 与 nofs6 对比，115 个既有具名函数逐字一致，包括传感器、方向同步、取色、准星平滑、计时起点、节拍点时序、强弱拍振动、录制和下载等函数。
- 3 个既有函数有变化：applyLanguage（iOS 选图按钮文案）、loadFile（iOS 非图片校验）、wireEvents（初始化 file input 类型）。新增 configurePhotoFilePicker / isImageFileCandidate 两个导入辅助函数。
- 另外修改版本常量、增加独立的 iOS 文件选择识别常量和三语文案。没有改变用于渲染/传感器处理的 IS_MOBILE 判断。
- CSS 只修改 #recordElapsed 一段，明确行高/边距并添加可见字形边界修正。没有叠加新的整页覆盖样式，也没有裁切文字。
- HTML 仅更新版本号和资源查询参数。SVG、PNG、manifest、sw.js 逐字节不变。

## 本地 Chromium 检查

Chromium 144.0.7559.96，离线注入本地 HTML/CSS/JS；测试专用状态接口不在发布包内。

- 6 种视口：320×568、390×780、430×932、568×320、844×390、640×280。
- 三语言、控制栏显示/隐藏、00:00 / 12:34 / 25:01:01，共 108 组几何组合。文字框与圆点的垂直中心同计时框一致，偏差 <0.1 CSS px；水平边界未溢出。
- 在三种视口的黑色测试底图上，按截图白色字形像素测量，实际数字上下空白误差约 0.17 CSS px。这比只核对 DOM 框更接近可见对齐，但不是 iPhone 字体测试。
- 禁用 text-box-trim 时核对原行框 flex 居中回退；不宣称旧浏览器具有相同的字形精确对齐。
- 毛玻璃仍为 blur(10px)，提示层仍不拦截点击，非录制隐藏整个计时框。
- 模拟 iPhone 用户代理及 iPadOS 桌面用户代理，确认 accept 为 application/octet-stream、无 capture；Mac 桌面和 Android 为 image/*。三语文件按钮文字正常。
- JPEG / PNG / WebP、通用 MIME 图片导入通过。PDF 和损坏 JPEG 分别触发类型/解码提示，原图保留；取消选择不清空原图；出错后重新选图可继续。
- 实际 Web Audio + MediaRecorder 录制、视口旋转、停止、命名窗口、下载通过，产物 sample.mp4，167283 字节。旋转未重置计时起点，全屏申请次数为 0。
- 没有观察到未捕获脚本异常。

## 本次没有验证的内容

没有实体 iPhone/iPad/Android 测试，没有 iOS 原生文件选择 UI。因此，设置 accept 和成功注入测试文件，不等于已经证明 iOS 原生菜单不再出现拍照，也不等于验证了 Files 中所有格式都能正常点选。需要在 iPhone 上核对这两点。

没有重测所有既有功能，没有声称消除全部历史问题。HEIC/TIFF 的实际解码能力、Safari 旧版本、硬件传感器和系统键盘行为不在本地验证覆盖范围内。
