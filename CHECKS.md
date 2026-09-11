# nofs10 检查记录

## 源码范围

- node --check app.js 通过；与 nofs9 对比，120 个既有顶层具名函数中 118 个逐字一致。
- 修改 startRecording（码率、真实 MIME、日志和错误/视频轨道清理）和 wireEvents（防选字事件与编辑框快捷键排除）。新增四个辅助函数：getRecordingBitrateOptions, updateRecordedMimeType, isTextEntryTarget, preventControlTextSelection。
- 录制格式优先级 chooseMimeType、画布尺寸、captureStream(60)、声音与音频会话、传感器、准星、节拍/振动、显示/隐藏、旋转函数均逐字一致。
- CSS仅增加自动文字缩放规则及限定范围的防选字规则，没有更改任何尺寸、颜色、位置或响应式断点。HTML仅 nofs9→nofs10 资源/版本更新。
- SVG、三张PNG、manifest、sw.js逐字节不变。测试接口、日志样本、截图及模拟代码未放入发布包。

## 本地受控检查

Node 的实际码率/MIME 辅助函数测试 42 项通过。包括横竖同画幅码率一致、最小/最大码率、无效 MIME 忽略、MP4/WebM真实类型保留。

Chromium 144.0.7559.96，使用离线 HTML/CSS/JS 注入；通过临时测试接口观察状态。iPhone/Android用户代理和方向/音频会话均为测试条件，不是真实操作系统。

- 6种视口×中日英三语，18组横竖往返：回到原方向时，浏览器推荐文字的computed font-size、line-height和DOM宽高与切换前相同；继承text-size-adjust:100%。该测试验证规则/回归，不复现Safari真实文字膨胀算法。
- 顶部/底部按钮、BPM、播放/停止、回正等防选字样式生效；selectstart/contextmenu/dragstart对非编辑控件取消，对原生语言select及文件名编辑框不取消。
- 真实鼠标长按BPM重复调整、保持UI显示且无文本选中。未实际测试iOS原生长按菜单。
- 保存名称默认全选后Backspace删空、保留演奏图片和弹窗；可中间删字、全选替换。删除后contenteditable保留一个空br是浏览器行为，不视为可见文字。
- 照片按钮仍打开accept=image/*的原输入，未添加capture或新的来源限制。
- 模拟 MediaRecorder 构造、start同步、异步error三种失败，均取消录制状态并释放本次视频轨道，保持共享音频轨道live，无错误后保存窗口。
- 真实MP4及强制WebM候选分支录制下载通过；两种文件由ffprobe读到视频和音频轨道。
- 录制中旋转后计时起点与录制画布不变；停止重播声音上下文正常；全屏申请次数为0。Audio Session测试替身停止后恢复auto。
- 本次完成的各测试没有未捕获脚本异常/Promise拒绝。原程序其他潜在问题没有宣称一并修复。

## 同图、同轨迹本地对比

两次录制使用同一张1440×1080测试图，以及相同的按时间生成的轨迹。真实运行时长及捕获帧数略不同，因此按单位时长比较，而不是仅比较总字节数。

| 项目 | nofs9 | nofs10 |
|---|---:|---:|
| 请求视频码率 | 8,000,000 bps | 4,500,000 bps |
| 输出尺寸 | 1440×1080 | 1440×1080 |
| 视频/音频 | VP9 / Opus，MP4容器 | VP9 / Opus，MP4容器 |
| 文件字节数 | 1331392 | 1087495 |
| ffprobe时长 | 4.734188 s | 4.829042 s |
| 平均总码率 | 2249833 bps | 1801591 bps |

本地样本的平均总码率约减少 19.9%。这不是 Android / iPhone 两台设备的对比，也不是固定节省比例。

**性能限制：** 虽然两次captureStream都请求60fps，此离线软件绘制/编码环境中ffprobe实际平均帧率仅约8.6–8.8fps。该样本适用于录制流程、格式、相同环境下目标码率效果的有限检查，不能用于证明手机上的60fps性能、最终画质或高运动画面的压缩质量。

## 未覆盖

没有实体Safari/iPhone的原生选字、真正自动字体膨胀、iOS照片菜单、静音开关或手机硬件编码测试；没有用户两端的原视频，不能查明差异的唯一根因。没有新增麦克风权限、摄像头或网络上传。请以实机同图、同BPM、同时间长度的录制结果作为最终判断。

## 实现依据

Apple《Customizing Style Sheets》中text-size-adjust说明；Apple Safari CSS Reference中的user-select/touch-callout；W3C MediaStream Recording对bitrate hint与actual MIME的定义。浏览器的码率报告也不等于通过文件计算出的平均实际码率。
