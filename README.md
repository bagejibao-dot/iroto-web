# Iroto Web v2.14

这是 Iroto Web v2.14：演奏界面点击画面切换 UI 显示/隐藏版。

## 1. 演奏中点击画面的逻辑调整

之前的逻辑是：

```text
点击照片区域 → 显示 UI → 等几秒自动隐藏
```

v2.14 改成更接近一般视频 App 的逻辑：

```text
UI 隐藏时点击照片区域 → 显示 UI，并几秒后自动隐藏
UI 显示时再次点击照片空白处 → 立即隐藏 UI
```

这样不需要等待自动隐藏。

## 2. 不影响按钮操作

点击顶部/底部 UI 按钮不会触发这个画面点击逻辑。  
这个逻辑只作用于照片 / canvas 区域。

## 3. 版本号更新

资源路径更新为：

```text
app.js?v=2.14.0
styles.css?v=2.14.0
manifest.webmanifest?v=2.14.0
```

## 4. 保持不变

- v1.6 的矩阵相对旋转传感器逻辑保持不变
- 自动全屏保持 v2.13
- 底部浏览器推荐和权限提示保持 v2.13
- 拍照功能继续移除，只保留照片导入
- 独立 1080p 录制画布保持
- WebM 时长元数据修正保持

---

# v2.14.1 追加内容

这是基于用户重新上传的 v2.14 文件制作的最小修改版。  
没有修改传感器、准星平滑、全屏、点击画面隐藏 UI、录制等手感相关逻辑。

只追加：

```text
兼容性检查弹窗底部显示当前版本号：v2.14.1
```

资源路径更新为：

```text
app.js?v=2.14.1
styles.css?v=2.14.1
manifest.webmanifest?v=2.14.1
```

---

# Minimal fix based on v2.14.1

This package is based directly on the uploaded v2.14.1 file.

Only these three changes were made:

```text
1. Japanese compatibility status: 「環境依存」→「要確認」
2. Language selector border-radius set to 999px
3. English home hint:
   We recommend Chrome on Android and Safari on iPhone.
   Please allow all permissions.
```

No version number, fullscreen logic, orientation lock, sensor behavior, cursor smoothing, recording, photo import, layout, or icon design was changed.
