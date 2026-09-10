# nofs2 验证记录

## 修改边界

JavaScript 语法检查通过。新增屏幕旋转同步处理及其取消逻辑；修改方向读取、演奏开始时方向快照、停止/重置的取消处理，并在解释姿态事件前同步屏幕方向。HTML 仅更新资源版本字符串。

逐函数比较确认以下函数与 nofs1 一致：`updateCrosshair`、`applyTiltRelative`、`deviceOrientationToMatrix`、`multiplyTransposeLeft`、`onMotion`、`recenter`、`lockOrientationForPlay`、`triggerBeatHaptic`、`drawRecordingFrame`、`startRecording`、`stopRecording`、`saveRecording`、`showPhotoSourceDialog`、`updateCompatDialog`。

CSS、manifest、SVG、三种 PNG 图标及 Service Worker 文件逐字节一致。

## 浏览器测试

环境：本地 Chromium 无头浏览器，离线加载原页面 HTML/CSS/SVG/JS。测试中模拟屏幕方向接口、姿态事件及非全屏锁定拒绝，另注入只用于观察状态的测试接口；测试接口及模拟代码不包含在发布包内。

19 项方向测试和 18 项回归断言通过，其中包括：

- 竖屏进入横屏后，左右/上下轴按横屏规则对应；横屏返回竖屏后恢复。
- 两种横屏方向以及不改变窗口尺寸的左右横屏切换。
- 缺少 ScreenOrientation 时的旧式 `window.orientation` 90° / -90° / 0° 路径。
- 两种方向接口都缺失时，宽高变化可切换横竖屏；此项不代表能区分左右横屏。
- 大幅姿态倾斜不会触发方向重置；重复通知、地址栏导致的高度变化不会重设基准（有屏幕方向接口时）。
- 丢失方向事件后，下一次姿态数据处理前能检测新的屏幕方向。
- 快速切换取最终方向；取消的切换不会迟到重置；停止会取消未完成的切换。
- 未旋转时，240 组相同输入的目标坐标和准星坐标与 nofs1 完全一致。
- 旋转时同一 MediaRecorder 保持运行，尺寸不变，节拍计数和录制计时不中断。
- 录制停止后可正常打开命名窗口并下载文件。此次 Chromium 样本约 2.43 秒、1440×1080，含视频与音频轨道；视频格式选择及编码器逻辑未改。
- 三语兼容性窗口、换图重播、返回选择页，以及缺少 alpha 的原有回退分支。

上述测试的全屏申请次数为 0；未捕获脚本异常和 Promise 拒绝均为 0。

## 尚未验证

实体 iPhone Safari / Android Chrome 的系统旋转动画、实际传感器噪声、硬件触觉、后台挂起、系统文件选择及相册编码兼容性。本次验证不等于整个应用没有其他既有问题。
