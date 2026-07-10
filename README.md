# Iroto Web v2.13

这是 Iroto Web v2.13：恢复自动全屏 + 恢复底部浏览器/权限提示版。

## 1. 恢复自动全屏

普通网页模式下，网页不能隐藏手机系统状态栏或浏览器顶部区域。  
要让横屏演奏界面获得更多空间，只能使用浏览器 Fullscreen API，或让用户把网页添加到主屏幕/PWA 后以 standalone 方式打开。

因此 v2.13 恢复播放时自动进入浏览器全屏：

```text
点击播放 → 尝试进入浏览器全屏
```

注意：浏览器可能仍然显示一次“如何退出全屏”的系统提示。这个提示是浏览器安全提示，网页无法隐藏。

## 2. 恢复首页底部提示

v2.12 隐藏了首页底部提示。  
v2.13 恢复显示浏览器推荐与权限提示，但不再包含“请选择已保存照片”的说明。

```text
日本語：Android は Chrome、iPhone は Safari 推奨。すべての権限を許可してください。
中文：Android 建议 Chrome，iPhone 建议 Safari。请允许所有权限。
English：Chrome on Android, Safari on iPhone. Allow all permissions.
```

## 3. 版本号更新

资源路径更新为：

```text
app.js?v=2.13.0
styles.css?v=2.13.0
manifest.webmanifest?v=2.13.0
```

## 4. 保持不变

- v1.6 的矩阵相对旋转传感器逻辑保持不变
- 拍照功能继续移除，只保留照片导入
- 独立 1080p 录制画布保持
- WebM 时长元数据修正保持
