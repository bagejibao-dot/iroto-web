# nofs8 检查记录

## 源码范围

- `node --check app.js` 通过。
- 与 nofs7 对比，115 个既有具名函数逐字一致。
- 修改 applyLanguage / loadFile / wireEvents，仅用于恢复选图文案和原来的图片导入方式。
- 删除 nofs7 专门为 iOS Files 入口增加的 USE_IOS_FILE_PICKER 常量、两组翻译键及 configurePhotoFilePicker / isImageFileCandidate 辅助函数。
- JavaScript 在忽略版本常量后，与 nofs6 完全一致。这是对 nofs7 图片入口改动的准确撤回；并非使用旧版样式。
- styles.css 与 nofs7 逐字节一致，保留其数字字形垂直对齐修正。CSS SHA-256：`b2d9fad23af88c70fc798ac8f1fbaefa772530c3b2f895bcbbe1a63fa7a4baa1`。
- HTML 只更新 nofs7 → nofs8 资源查询版本和版本文字；其 file input 保持 image/*、无 capture。
- SVG、三张 PNG、manifest 和 sw.js 与 nofs7 逐字节一致。
- 测试接口、模拟代码、截图和样本视频未放入发布包。

## 本地 Chromium 检查

浏览器：Chromium 144.0.7559.96。本地 URL 导航受运行环境限制，使用离线 HTML/CSS/JS 注入测试；临时公开只用于测试的状态接口，交付代码不包含这些接口。

本轮 183 项重复断言通过，属于有限的导入与录制冒烟检查，不是全部功能或全部浏览器的覆盖。

- 模拟 iPhone、iPad、iPadOS 桌面用户代理、Android、桌面五种用户代理/触摸条件。它们全部使用 Chromium，不是五种真实系统。
- 每种环境分别切换日语、中文、英文：选择按钮和替换按钮恢复照片文案；accept 始终为 image/*，没有 capture。
- 点击首页选择和演奏页替换按钮会触发同一个 file input；注入测试文件可正常显示照片。
- 取消以空文件结果模拟：不清空原图。重新选择同一张照片可导入。
- JPEG、PNG、WebP 以及空/通用 MIME 的图片通过原解码路径。损坏 JPEG 和 PDF 弹出原读取失败提示，旧图保留；错误后再次选择可继续。
- 演奏中替换照片按原规则先停止，再打开选择入口；未录制时没有常驻视觉节拍器。
- 实际录制过程中检查 390×780、844×390、640×280，控制栏显示和隐藏各一次：时间与圆点垂直中心偏差小于 1 CSS px；文字在胶囊内部，text-box-trim: trim-both 和 blur(10px) 保持。
- 改变视口尺寸后录制继续，计时正常增长；停止后提示层隐藏、保存窗口正常出现。
- 实际 Web Audio / MediaRecorder 下载完成。样本为 photo_green.mp4，168511 字节；ffprobe 读取到 1440×1080 视频轨道与音频轨道，时长约 4.143 秒。
- 全部页面全屏申请次数为 0；没有观察到未捕获脚本异常或 Promise 拒绝。

## 尚未验证

没有实体 iPhone/iPad Safari 或 Android 手机测试；本地 filechooser 事件与文件注入不证明原生菜单实际显示哪些项目。没有验证照片权限交互、Safari HEIC 等格式解码、真实传感器、硬件触觉或全部浏览器版本。

未重新测试所有已有功能，也未改变其它已知或潜在问题。
