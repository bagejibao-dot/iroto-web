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

---

# Beat haptic test build

This package is based on the v2.14.1 minimal fix build.

Only the haptic behavior was changed:

```text
Before:
Vibration happened when a new sounding note appeared.

After:
Vibration follows the metronome.
Beat 1: strong vibration
Beats 2, 3, 4: weak vibration
Eighth-note subdivisions: no vibration
```

Technical note:

```text
Browser Vibration API cannot control amplitude reliably.
Strong / weak is simulated by vibration duration:
Strong = 30 ms
Weak = 12 ms
```

No fullscreen logic, orientation lock, sensor behavior, cursor smoothing, recording, photo import, layout, or icon design was changed.

---

# Stronger beat haptic adjustment

This package is based on the beat-haptic test build.

Only the beat haptic strength difference was changed:

```text
Weak beats:
single short pulse, about 14–22 ms

Strong beat:
double pulse, about 50–70 ms + 20–32 ms gap + 50–70 ms
```

At the current max BPM 160:

```text
One quarter-note beat = 375 ms
Strongest haptic pattern is about 120–172 ms, safely shorter than one beat
```

No fullscreen logic, orientation lock, sensor behavior, cursor smoothing, recording, photo import, layout, or icon design was changed.

---

# Logo test build

This package is based on `Iroto Web v2.14.1 beat haptic stronger`.

Only the homepage logo was changed:

```text
Original homepage logo: built-in text/icon
New homepage logo: uploaded SVG file, packaged as iroto-logo.svg
```

The SVG was checked for:

```text
No script tag
No foreignObject
No external URL reference
No inline event handler
```

No fullscreen logic, orientation lock, sensor behavior, cursor smoothing, haptics, recording, photo import, or control layout was changed.

Version/cache suffix:

```text
2.14.1-beat-haptic-stronger-logo-test
```

---

# Logo v2 build

This package is based on `Iroto Web v2.14.1 beat haptic stronger logo test`.

Changes:

```text
1. Replaced homepage logo with the newly uploaded SVG.
2. Removed the duplicated "Iroto Web" text under the homepage logo.
3. Updated Chinese homepage bottom hint:
   Android 建议使用 Chrome，iPhone 建议使用 Safari。
   请允许所有权限。
4. Updated Japanese homepage bottom hint:
   Android は Chrome、iPhone は Safari の使用を推奨します。
   すべての権限を許可してください。
5. Added favicon / apple-touch-icon / manifest icons based on the uploaded logo.
```

Icon behavior note:

```text
Android Chrome Add to Home Screen usually uses manifest icons.
iPhone Safari Add to Home Screen usually uses apple-touch-icon.
Browser bookmark icons usually use favicon.
```

The SVG was checked for:

```text
No script tag
No foreignObject
No external URL reference
No inline event handler
```

No fullscreen logic, orientation lock, sensor behavior, cursor smoothing, haptics, recording, photo import, or control layout was changed.

Version/cache suffix:

```text
2.14.1-beat-haptic-stronger-logo-v2
```

---

# Logo v3 replacement

This package uses the newly uploaded SVG file:

```text
/mnt/data/sehuan-1.svg
```

The packaged logo is:

```text
iroto-logo.svg
```

SHA-256 check:

```text
uploaded: 39f08e4affa5f8599cb7d593ce12c7c2a8ec3a73401f533317a20e0a970e5579
packaged: 39f08e4affa5f8599cb7d593ce12c7c2a8ec3a73401f533317a20e0a970e5579
```

The PNG icons were regenerated from this same SVG:

```text
apple-touch-icon.png
icon-192.png
icon-512.png
```

No fullscreen logic, orientation lock, sensor behavior, cursor smoothing, haptics, recording, photo import, or control layout was changed.

Version/cache suffix:

```text
2.14.1-beat-haptic-stronger-logo-v3
```

---

# Shortcut icon build

This package is based on the logo v3 build.

Goals:

```text
1. Prefer browser shortcut behavior over installed-app behavior.
2. Keep opening in the normal Chrome browser UI.
3. Make home-screen icons smaller inside the icon frame.
4. Use the same dark background for Chrome shortcut and install-style icon assets.
```

Changes:

```text
manifest display: fullscreen → browser
manifest icon purpose: any maskable → any
service worker registration: disabled if registration code is present
favicon / apple-touch-icon: use padded PNG icon instead of the raw SVG
icon-192 / icon-512 / apple-touch-icon: regenerated with dark background and 50% logo scale
```

Notes:

```text
Chrome may still show UI wording that depends on the Chrome version and device.
However, display: browser and no service worker registration make the page less likely to be treated as a full installable PWA.
```

Version/cache suffix:

```text
2.14.1-beat-haptic-stronger-logo-shortcut
```


---

Shortcut icon v2 tweak: increased home-screen logo scale from about 50% to about 64% while keeping the same dark background and browser-shortcut behavior.
