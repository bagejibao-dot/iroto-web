# nofs13 检查记录

## 基底与改动范围

基底：`Iroto_Web_logo_v3_browser_help_nofs12.zip`，未覆盖原包。

- `node --check app.js` 和两个 CSS 文件的 PostCSS 解析通过。
- 共比较 133 个既有顶层具名函数，131 个逐字一致。只修改 helpSymbol 与 syncDialogViewport；还原这两个函数和版本常量后，整个app.js与nofs12完全一致。
- HTML只改变资源版本查询和底部版本文字。
- ui.css仅添加语言框16px和控制区域touch-action规则，并调整帮助示意SVG的展示宽高。没有改主界面按钮盒子大小、字体全局比例、输入框16px、弹窗主题或取色参数。
- 以下文件逐字节不变：styles.css, iroto-logo.svg, apple-touch-icon.png, icon-192.png, icon-512.png, manifest.webmanifest, sw.js。
- 无测试状态接口、模拟对象、测试图片、录制样本进入发布包。

## 实际基线核对

nofs12 在390px竖屏中语言框字号11.5px，在844px横屏中12px；新版本均为16px，外框几何尺寸不变。常规比例下，本地Chromium没有复现用户的全页放大，因此这是一项基于可见代码和WebKit聚焦缩放机制的针对性修正，不把它声明为已经证实的唯一根因。

## 布局与视口检查

Chromium 144.0.7559.96，Linux headless实现，通过离线HTML/CSS/JS注入。429项重复断言通过，主要是多视口下的相同边界检查，不代表覆盖所有浏览器和全部功能。

- 11种CSS视口：320×568、360×640、390×780、430×932、568×320、667×375、844×390、932×430、640×280、1024×768、280×560。
- 每种视口切换日、中、英，打开帮助并滚到顶部/底部；检查弹窗边界、文字容器水平溢出、关闭X与版本页脚可见。
- 语言框保持92px或96px宽、38px高。English和两种CJK标签均在框内；控件字体16px。
- 播放／停止示意圆44×44px，图形组30×20px，包含独立斜杠路径。没有修改主界面播放按钮。
- 390×780下主界面语言框、问号、照片选择按钮、底部说明和舞台的坐标及尺寸，与nofs12一致。
- Chromium CDP实际应用1.5倍页面放大：程序未把它重置或反向缩小；帮助窗口重新排入可见区域。恢复1倍后原布局继续。
- 用受控VisualViewport对象检查8种键盘/陈旧方向尺寸/偏移/空值条件，以及接口缺失回退：弹窗不超出当前布局视口，舞台宽度不变，文件名字号16px。
- 上述对象测试不是iOS真实键盘或旋转通知时序。用户主动放大后主界面会按正常网页放大，而不是将用户缩放强行取消。

## 交互与录制检查

18项流程检查通过。在Chromium里使用iPhone用户代理（不是Safari实现），Web Audio与MediaRecorder使用真实浏览器功能。

- 三语选择、原照片选择input（image/*、无capture）、图片解码、播放/录制。
- 录制中打开与关闭帮助、从390×780切到844×390：录制起点与输出尺寸不变。
- 文件名默认编辑、全选退格、中间删字、Enter结束编辑。编辑后原照片与弹窗保留。
- 删除二次确认可取消，录制Blob与名称保留。
- 实际下载Iroto_nofs13_test.mp4；ffprobe为1440×1080，VP9视频/Opus音频，约4.149秒，136007字节。这是有限流程冒烟，不证明手机60fps或硬件编码质量。
- 保存后重播与停止通过；全屏请求次数0，无未捕获脚本异常。
- 已目视查看日语帮助竖屏及保存横屏截图。

## 实现依据

WebKit WKContentViewInteraction.mm：聚焦元素的信息（含字号）参与缩放以展示输入控件。
https://github.com/WebKit/WebKit/blob/main/Source/WebKit/UIProcess/ios/WKContentViewInteraction.mm

WebKit “More Responsive Tapping on iOS”：touch-action: manipulation抑制双击缩放，同时允许滚动和双指连续缩放。
https://webkit.org/blog/5610/more-responsive-tapping-on-ios/

MDN VisualViewport：布局视口与可见视口的区别，键盘与手动缩放会改变可见视口。
https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport

## 尚未验证

WebKit运行器在本环境不可用，没有实体iPhone/iPad/Android测试。未直接复现iOS选项菜单、保存后的原生键盘缩放、系统页面缩放百分比、辅助功能放大、Safari工具栏动画或硬件传感器/振动。该版本是针对可查明风险的小范围修正，不是所有iPhone尺寸与状态的无bug保证。
