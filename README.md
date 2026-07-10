# Iroto Web v2.17

这是 Iroto Web v2.17：基于 Android App v5.26 的稳定手感基准版。

## 1. 以 App v5.26 为基准，而不是继续凭感觉微调

v2.16 为了压制左右 8 字形轨迹，加入了横向特殊削弱和主轴分离。  
这些处理虽然可能局部改善，但会让手感越来越偏离 App。

v2.17 已撤掉这些实验性处理，改成更接近 Android v5.26 的稳定基准逻辑。

## 2. 加速度逻辑按 App v5.26 移植

Android App v5.26 使用：

```java
Sensor.TYPE_LINEAR_ACCELERATION
performanceView.addLinearAcceleration(event.values[0], event.values[1], event.timestamp);
```

核心逻辑：

```text
只使用 X/Y 线性加速度
不使用 Z 轴
不做加速度双重积分
超过阈值后累加一个短暂 nudge
nudge 按指数衰减回中心
```

移植参数：

```text
ACCEL_THRESHOLD = 0.75
ACCEL_GAIN = 0.018
ACCEL_DECAY_PER_SECOND = 6.0
ACCEL_MAX_OFFSET = 0.26
```

## 3. 准星平滑也改回 App 版

Android v5.26：

```java
normX += (targetNormX - normX) * 0.24f;
normY += (targetNormY - normY) * 0.24f;
```

Web v2.17 也改为固定 `0.24`。  
这会比 v2.16 更接近 App 的响应速度。

## 4. 版本号

资源路径更新为：

```text
app.js?v=2.17.0
styles.css?v=2.17.0
manifest.webmanifest?v=2.17.0
```

兼容性检查弹窗底部显示：

```text
v2.17.0
```

## 5. 保持不变

- v1.6 的矩阵相对旋转传感器逻辑保持
- 自动全屏保持
- 全屏横屏 safe-area 居中保持
- 点击画面显示/隐藏 UI 保持
- 拍照功能继续移除，只保留照片导入
- 独立 1080p 录制画布保持
- WebM 时长元数据修正保持
