# 本次验证记录

## 差异边界

源码与基准逐函数回退比对通过：仅全屏入口函数有行为变化。styles.css、manifest、SVG 与三种 PNG 的 SHA-256 与基准一致。语法检查通过。

## 本地浏览器流程检查

测试环境：Chromium 离线页面，原 HTML/CSS/JS；模拟移动可视区域、HTTPS 可用条件、方向锁定拒绝/不可用。未进行实体 Safari 或 Android 传感器测试。

- portrait_lock_denied（393 × 720）：通过；全屏申请 0 次，脚本异常 0。
  实际录制下载文件：67237 字节。
- landscape_lock_denied（844 × 320）：通过；全屏申请 0 次，脚本异常 0。
- portrait_lock_missing_permissions_granted（390 × 700）：通过；全屏申请 0 次，脚本异常 0。

所有场景验证了三语切换、图片显示、播放/停止/重播、控制层显示/隐藏、替换照片和返回选择页。
