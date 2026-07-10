# Iroto Web v2.15

这是 Iroto Web v2.15：加入加速度平移补偿 + 修正全屏横屏照片视觉居中版。

## 1. 加入接近 App 版体验的加速度补偿

v2.14 中虽然请求了 DeviceMotion 权限，但 `onMotion()` 实际上直接 `return`，所以没有真正使用加速度控制。

v2.15 重新启用 `DeviceMotion.acceleration`，作为倾斜控制之外的平移补偿：

```text
DeviceOrientation：控制主要倾斜位置
DeviceMotion.acceleration：提供平移时的轻微补偿
```

为了避免 Web 端常见的漂移和 8 字形绕圈，v2.15 没有使用双重积分，而是使用：

```text
加速度 → 低通平滑 → 有上限的 offset → 自动衰减
```

这样更接近 App 版的“平移时有反应，但不会一直漂移”的感觉。

## 2. 修正全屏横屏照片视觉不居中

非全屏时照片已经居中。  
问题主要出现在浏览器全屏横屏后，刘海 / 摄像头 / safe-area 让视觉中心偏移。

v2.15 在全屏横屏时，会用 safe-area 计算可视中心：

```text
非全屏：保持原来的 canvas 中心
全屏横屏：按 safe-area 可视区域居中
```

## 3. 版本号更新

资源路径更新为：

```text
app.js?v=2.15.0
styles.css?v=2.15.0
manifest.webmanifest?v=2.15.0
```

## 4. 保持不变

- v1.6 的矩阵相对旋转传感器逻辑保持
- 自动全屏保持
- 点击画面显示/隐藏 UI 保持 v2.14
- 拍照功能继续移除，只保留照片导入
- 独立 1080p 录制画布保持
- WebM 时长元数据修正保持
