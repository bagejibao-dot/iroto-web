(() => {
  "use strict";

  const IROTO_WEB_VERSION = "2.14.7";

  const els = {
    canvas: document.getElementById("stage"),
    langSelect: document.getElementById("langSelect"),
    topbar: document.querySelector(".topbar"),
    emptyState: document.getElementById("emptyState"),
    choosePhotoBtn: document.getElementById("choosePhotoBtn"),
    cameraBtn: document.getElementById("cameraBtn"),
    photoBtn: document.getElementById("photoBtn"),
    fileInput: document.getElementById("fileInput"),
    fileName: document.getElementById("fileName"),
    bottomBar: document.getElementById("bottomBar"),
    playBtn: document.getElementById("playBtn"),
    recordBtn: document.getElementById("recordBtn"),
    recordTimer: document.getElementById("recordTimer"),
    sensorBtn: document.getElementById("sensorBtn"),
    sensorStatus: document.getElementById("sensorStatus"),
    bpmMinus: document.getElementById("bpmMinus"),
    bpmPlus: document.getElementById("bpmPlus"),
    bpmLabel: document.getElementById("bpmLabel"),
    saveDialog: document.getElementById("saveDialog"),
    saveNameInput: document.getElementById("saveNameInput"),
    saveBtn: document.getElementById("saveBtn"),
    discardBtn: document.getElementById("discardBtn"),
    recordInfo: document.getElementById("recordInfo"),
    helpBtn: document.getElementById("helpBtn"),
    compatDialog: document.getElementById("compatDialog"),
    compatList: document.getElementById("compatList"),
    compatVersion: document.getElementById("compatVersion"),
    closeCameraBtn: document.getElementById("closeCameraBtn")
  };

  const ctx = els.canvas.getContext("2d", { alpha: false });
  const sampleCanvas = document.createElement("canvas");
  const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });
  const recordingCanvas = document.createElement("canvas");
  const recordingCtx = recordingCanvas.getContext("2d", { alpha: false });

  const I18N = {
    ja: {
      htmlLang: "ja",
      fileNone: "写真未選択",
      heroText: "写真を選択し、傾けて演奏しましょう。",
      heroHtml: "写真を選択し、<br>傾けて演奏しましょう。",
      hint: "Android は Chrome、iPhone は Safari 推奨。すべての権限を許可してください。",
      hintHtml: "Android は Chrome、iPhone は Safari 推奨。<br>すべての権限を許可してください。",
      choosePhoto: "写真を選択",
      takePhotoFromHome: "写真を選択",
      photoTitle: "写真を選択",
      recordTitle: "録画",
      recordTimerLabel: "録画時間",
      sensorTitle: "センサーを有効化 / 再センター",
      play: "再生",
      stop: "停止",
      sourceTitle: "写真の選択",
      sourceText: "保存済みの写真を選択してください。",
      sourceAlbum: "写真を選択",
      sourceCamera: "写真を選択",
      cancel: "キャンセル",
      saveTitle: "演奏動画を保存",
      recordDone: "録画が完了しました。",
      recordFormat: "形式",
      recordSize: "サイズ",
      discardConfirm: "録画を削除しますか？",
      fileName: "ファイル名",
      discard: "削除",
      save: "保存",
      cameraTitle: "写真を選択",
      cameraOpening: "カメラを起動しています...",
      cameraOpened: "カメラが起動しました",
      cameraOpenFailed: "カメラを起動できません。ファイル選択に切り替えます。",
      cameraNotReady: "カメラ映像の準備ができていません",
      photoCreateFailed: "写真の生成に失敗しました",
      photoReadFailed: "写真の読み込みに失敗しました。",
      takePhoto: "写真を選択",
      compatTitle: "互換性チェック",
      compatHint: "権限が求められた場合は、すべて許可してください。録画形式は自動選択されます。",
      close: "閉じる",
      sensorLabel: "センサー",
      compatStatusUnavailable: "不可",
      compatStatusDepends: "要確認",
      compatSecure: "HTTPS / 安全な接続",
      compatSecureNote: "Android Chrome では HTTPS が必要です",
      compatAudioNote: "音を合成するために使用します",
      compatOrientationNote: "傾き操作に使用します",
      compatMotionNote: "加速度の補助判定に使用します",
      compatIOS: "iOS 権限",
      compatIOSNote: "iOS では許可操作が必要です",
      compatCamera: "getUserMedia カメラ",
      compatCameraNote: "ブラウザで直接撮影するために使用します",
      compatCaptureNote: "画面録画に使用します",
      compatRecorderNote: "ブラウザ内で動画を録画するために使用します",
      compatMp4: "MP4 録画",
      compatMp4Note: "非対応時は WebM を自動使用します",
      compatPwaNote: "ホーム画面への追加に使用します",
      recordingUnsupported: "現在のブラウザは Canvas 録画に対応していません。Chrome / Edge / Safari の新しいバージョンを試してください。"
    },
    zh: {
      htmlLang: "zh-CN",
      fileNone: "未选择照片",
      heroText: "选择照片，倾斜手机演奏。",
      heroHtml: "选择照片，<br>倾斜手机演奏。",
      hint: "Android 建议 Chrome，iPhone 建议 Safari。请允许所有权限。",
      hintHtml: "Android 建议 Chrome，iPhone 建议 Safari。<br>请允许所有权限。",
      choosePhoto: "选择照片",
      takePhotoFromHome: "选择照片",
      photoTitle: "选择照片",
      recordTitle: "录制",
      recordTimerLabel: "录制时间",
      sensorTitle: "启用 / 回正传感器",
      play: "播放",
      stop: "停止",
      sourceTitle: "照片来源",
      sourceText: "请选择新的演奏照片。",
      sourceAlbum: "选择照片",
      sourceCamera: "选择照片",
      cancel: "取消",
      saveTitle: "保存演奏视频",
      recordDone: "录制完成。",
      recordFormat: "格式",
      recordSize: "大小",
      discardConfirm: "要删除这段录制吗？此操作无法撤销。",
      fileName: "文件名",
      discard: "删除",
      save: "保存",
      cameraTitle: "选择照片",
      cameraOpening: "正在打开摄像头...",
      cameraOpened: "摄像头已打开",
      cameraOpenFailed: "无法打开摄像头。将改用文件选择。",
      cameraNotReady: "摄像头画面尚未准备好",
      photoCreateFailed: "照片生成失败",
      photoReadFailed: "照片读取失败。",
      takePhoto: "选择照片",
      compatTitle: "兼容性状态",
      compatHint: "如出现权限请求，请允许所有权限。录制格式会自动选择。",
      close: "关闭",
      sensorLabel: "传感器",
      compatStatusUnavailable: "不可用",
      compatStatusDepends: "视平台而定",
      compatSecure: "安全上下文 / HTTPS",
      compatSecureNote: "Android Chrome 的部分功能通常需要 HTTPS",
      compatAudioNote: "用于合成声音",
      compatOrientationNote: "用于倾斜控制",
      compatMotionNote: "用于加速度 fallback",
      compatIOS: "iOS 权限",
      compatIOSNote: "iOS 需点击按钮授权",
      compatCamera: "getUserMedia 摄像头",
      compatCameraNote: "用于浏览器直接拍照",
      compatCaptureNote: "用于录制画面",
      compatRecorderNote: "用于浏览器端录制视频",
      compatMp4: "MP4 录制",
      compatMp4Note: "不支持时自动用 WebM",
      compatPwaNote: "用于安装到主屏幕",
      recordingUnsupported: "当前浏览器不支持 Canvas 录制。请尝试 Chrome / Edge / Safari 新版本。"
    },
    en: {
      htmlLang: "en",
      fileNone: "No photo selected",
      heroText: "Select a photo, then tilt to perform.",
      heroHtml: "Select a photo,<br>then tilt to perform.",
      hint: "We recommend Chrome on Android and Safari on iPhone. Please allow all permissions.",
      hintHtml: "We recommend Chrome on Android and Safari on iPhone.<br>Please allow all permissions.",
      choosePhoto: "Choose Photo",
      takePhotoFromHome: "Choose Photo",
      photoTitle: "Choose Photo",
      recordTitle: "Record",
      recordTimerLabel: "Recording time",
      sensorTitle: "Enable / Recenter Sensor",
      play: "Play",
      stop: "Stop",
      sourceTitle: "Photo Source",
      sourceText: "Choose a new photo for performance.",
      sourceAlbum: "Choose Photo",
      sourceCamera: "Choose Photo",
      cancel: "Cancel",
      saveTitle: "Save Performance Video",
      recordDone: "Recording completed.",
      recordFormat: "Format",
      recordSize: "Size",
      discardConfirm: "Delete this recording? This cannot be undone.",
      fileName: "File name",
      discard: "Delete",
      save: "Save",
      cameraTitle: "Choose Photo",
      cameraOpening: "Opening camera...",
      cameraOpened: "Camera is ready",
      cameraOpenFailed: "Could not open the camera. Switching to file picker.",
      cameraNotReady: "Camera preview is not ready yet",
      photoCreateFailed: "Could not create photo",
      photoReadFailed: "Could not load the photo.",
      takePhoto: "Choose Photo",
      compatTitle: "Compatibility Check",
      compatHint: "When permissions are requested, allow all permissions. Recording format is selected automatically.",
      close: "Close",
      sensorLabel: "Sensor",
      compatStatusUnavailable: "Unavailable",
      compatStatusDepends: "Depends",
      compatSecure: "Secure Context / HTTPS",
      compatSecureNote: "Android Chrome usually requires HTTPS for some features",
      compatAudioNote: "Used for sound synthesis",
      compatOrientationNote: "Used for tilt control",
      compatMotionNote: "Used as acceleration fallback",
      compatIOS: "iOS Permissions",
      compatIOSNote: "iOS requires permission from a button tap",
      compatCamera: "getUserMedia Camera",
      compatCameraNote: "Used to take photos directly in the browser",
      compatCaptureNote: "Used to record the canvas",
      compatRecorderNote: "Used for browser video recording",
      compatMp4: "MP4 Recording",
      compatMp4Note: "Automatically uses WebM if unsupported",
      compatPwaNote: "Used for adding to home screen",
      recordingUnsupported: "This browser does not support Canvas recording. Try a newer version of Chrome / Edge / Safari."
    }
  };

  function t(key) {
    const pack = I18N[state.currentLang] || I18N.ja;
    return pack[key] || I18N.ja[key] || key;
  }

  function setText(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.textContent = value;
  }

  function setHtml(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = value;
  }

  function applyLanguage(lang) {
    state.currentLang = I18N[lang] ? lang : "ja";
    if (els.langSelect) els.langSelect.value = state.currentLang;
    document.documentElement.lang = t("htmlLang");

    if (!state.image) els.fileName.textContent = t("fileNone");
    setHtml("#homeLead", t("heroHtml"));
    setHtml("#homeHint", t("hintHtml"));
    els.choosePhotoBtn.textContent = t("choosePhoto");
    els.photoBtn.title = t("photoTitle");
    els.recordBtn.title = t("recordTitle");
    if (els.recordTimer) els.recordTimer.title = t("recordTimerLabel");
    els.sensorBtn.title = t("sensorTitle");
    els.sensorStatus.textContent = t("sensorLabel");
    els.playBtn.setAttribute("aria-label", state.playing ? t("stop") : t("play"));
    els.helpBtn.setAttribute("aria-label", t("compatTitle"));

    setText("#saveDialog h2", t("saveTitle"));
    if (els.saveDialog?.open && state.recordedBlob) updateRecordInfo();
    else els.recordInfo.textContent = t("recordDone");
    const inputLabel = document.querySelector("#saveDialog .input-label");
    if (inputLabel && inputLabel.firstChild) inputLabel.firstChild.textContent = t("fileName") + "\n          ";
    els.discardBtn.textContent = t("discard");
    els.saveBtn.textContent = t("save");

    setText("#compatDialog h2", t("compatTitle"));
    setText("#compatDialog .hint", t("compatHint"));
    const compatClose = document.querySelector("#compatDialog .primary-btn");
    if (compatClose) compatClose.textContent = t("close");
    if (els.compatVersion) els.compatVersion.textContent = `v${IROTO_WEB_VERSION} Stable Test`;

    updateBpm(0);
    updateCompatDialog();
  }


  const IS_MOBILE = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const state = {
    image: null,
    imageName: "Iroto",
    imageBaseName: "Iroto",
    imageRect: { x: 0, y: 0, w: 0, h: 0 },
    normX: 0.5,
    normY: 0.5,
    targetNormX: 0.5,
    targetNormY: 0.5,
    sampleColor: "#ffffff",
    currentMidi: null,
    currentNoteLabel: "Rest",
    candidateMapping: null,
    committedMapping: { midi: null, note: "Rest", css: "#ffffff", velocity: 0 },
    stableCandidateMidi: null,
    stableCandidateMapping: { midi: null, note: "Rest", css: "#ffffff", velocity: 0 },
    stableCandidateSinceMs: 0,
    smoothR: 255,
    smoothG: 255,
    smoothB: 255,
    smoothValue: 0,
    hasSmoothColor: false,
    hasSmoothValue: false,
    accelOffsetX: 0,
    accelOffsetY: 0,
    lastMotionAtMs: 0,
    pageState: "home",
    hasPushedPerformanceHistory: false,
    firstImageLoaded: false,
    autoSensorTried: false,
    lastSensorTargetX: 0.5,
    lastSensorTargetY: 0.5,
    hasSensorTarget: false,
    baselineRotationMatrix: null,
    fallbackEulerBaseline: null,
    bpmRepeatTimer: null,
    bpmRepeatInterval: null,
    playing: false,
    bpm: 100,
    currentLang: "ja",
    recordArmed: false,
    recording: false,
    recordingStartedAtMs: 0,
    recordingTimerId: null,
    recordingCanvasWidth: 0,
    recordingCanvasHeight: 0,
    recorder: null,
    recordedChunks: [],
    recordedBlob: null,
    recordedMime: "",
    recordedExt: "webm",
    recordingDurationMs: 0,
    sensorEnabled: false,
    sensorMode: "touch",
    sensorSource: "none",
    sensorWatchTimer: null,
    sensorLastValidAt: 0,
    sensorValidCount: 0,
    motionBaseline: null,
    baseline: null,
    lastTick: performance.now(),
    nextEighthAt: 0,
    eighthCounter: 0,
    candidateMidi: null,
    candidateVelocity: 0.0,
    lastQuantizeTime: 0,
    trail: [],
    controlsVisible: true,
    cameraStream: null,
    transportHideTimer: null,
    lastCanvasCssW: 0,
    lastCanvasCssH: 0,
    lockedOrientation: false,
    playOrientationType: "portrait-primary"
  };

  const TRAIL_DURATION_MS = 950;
  const TRAIL_SAMPLE_INTERVAL_MS = 24;
  const TRAIL_MAX_POINTS = 120;
  let lastTrailAdd = 0;

  const audio = {
    ctx: null,
    master: null,
    recorderDest: null,
    melodyOsc1: null,
    melodyOsc2: null,
    melodyGain: null,
    noiseBuffer: null
  };

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function sanitizeName(name) {
    return (name || "Iroto")
      .replace(/\.[^.]+$/, "")
      .replace(/[\\/:*?"<>|]+/g, "_")
      .replace(/\s+/g, "_")
      .slice(0, 80) || "Iroto";
  }

  function resizeCanvas() {
    // v0.5: mobile Chrome can drop frames badly when drawing full screen at
    // devicePixelRatio 2-3. Limit DPR to keep interaction smooth. The Android
    // native app remains the high-quality path; the Web version prioritizes
    // compatibility and responsive interaction.
    const cssW = Math.max(1, window.innerWidth);
    const cssH = Math.max(1, window.innerHeight);
    // v0.7: after moving color sampling off the main canvas, restore a sharper
    // display DPR. This keeps imported photos closer to the Android app visual.
    const maxDpr = IS_MOBILE ? 2.0 : 2.0;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const w = Math.max(1, Math.round(cssW * dpr));
    const h = Math.max(1, Math.round(cssH * dpr));
    if (els.canvas.width !== w || els.canvas.height !== h) {
      els.canvas.width = w;
      els.canvas.height = h;
      state.lastCanvasCssW = cssW;
      state.lastCanvasCssH = cssH;
    }
  }

  function prepareSampleCanvas(img) {
    // v0.5: sample colors from a small offscreen canvas instead of the main
    // display canvas. This avoids expensive getImageData() calls on the full
    // screen canvas and keeps touch / tilt control smoother.
    if (!img) return;
    const iw = img.naturalWidth || img.width || 1;
    const ih = img.naturalHeight || img.height || 1;
    const maxSide = 2048;
    const scale = Math.min(1, maxSide / Math.max(iw, ih));
    const sw = Math.max(2, Math.round(iw * scale));
    const sh = Math.max(2, Math.round(ih * scale));
    sampleCanvas.width = sw;
    sampleCanvas.height = sh;
    sampleCtx.clearRect(0, 0, sw, sh);
    sampleCtx.drawImage(img, 0, 0, sw, sh);
  }

  function computeImageRect() {
    const cw = els.canvas.width;
    const ch = els.canvas.height;
    if (!state.image) {
      state.imageRect = { x: 0, y: 0, w: cw, h: ch };
      return;
    }

    const iw = state.image.naturalWidth || state.image.width;
    const ih = state.image.naturalHeight || state.image.height;

    // v2.3: performance display keeps the original photo aspect ratio.
    // Recording uses a separate photo-aspect canvas, so the on-screen image
    // should not be stretched or cropped to full screen.
    const scale = Math.min(cw / iw, ch / ih);
    const w = iw * scale;
    const h = ih * scale;
    state.imageRect = { x: (cw - w) / 2, y: (ch - h) / 2, w, h };
  }

  function screenToNorm(clientX, clientY) {
    const rect = els.canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * (els.canvas.width / rect.width);
    const y = (clientY - rect.top) * (els.canvas.height / rect.height);
    const r = state.imageRect;
    return {
      x: clamp((x - r.x) / Math.max(1, r.w), 0, 1),
      y: clamp((y - r.y) / Math.max(1, r.h), 0, 1)
    };
  }

  function setPointerNorm(clientX, clientY) {
    const n = screenToNorm(clientX, clientY);
    state.targetNormX = n.x;
    state.targetNormY = n.y;
  }

  function evenDimension(value) {
    return Math.max(2, Math.round(value / 2) * 2);
  }

  function setupRecordingCanvas() {
    if (!state.image) return false;
    const iw = state.image.naturalWidth || state.image.width || 1;
    const ih = state.image.naturalHeight || state.image.height || 1;
    const aspect = iw / ih;

    let rw;
    let rh;
    if (aspect >= 1) {
      rh = 1080;
      rw = rh * aspect;
      if (rw > 1920) {
        rw = 1920;
        rh = rw / aspect;
      }
    } else {
      rw = 1080;
      rh = rw / aspect;
      if (rh > 1920) {
        rh = 1920;
        rw = rh * aspect;
      }
    }

    recordingCanvas.width = evenDimension(rw);
    recordingCanvas.height = evenDimension(rh);
    state.recordingCanvasWidth = recordingCanvas.width;
    state.recordingCanvasHeight = recordingCanvas.height;
    return true;
  }

  function recordingCursorRadius(rect) {
    return Math.max(20, Math.min(rect.w, rect.h) * 0.036);
  }

  function drawRecordingFrame() {
    if (!state.recording || !state.image || !recordingCtx || !recordingCanvas.width || !recordingCanvas.height) return;

    const cw = recordingCanvas.width;
    const ch = recordingCanvas.height;
    const r = { x: 0, y: 0, w: cw, h: ch };

    recordingCtx.save();
    recordingCtx.clearRect(0, 0, cw, ch);
    recordingCtx.fillStyle = "#000";
    recordingCtx.fillRect(0, 0, cw, ch);

    // Recording canvas follows the photo aspect ratio, so drawing the image
    // to the full canvas preserves aspect ratio without black bars.
    recordingCtx.drawImage(state.image, 0, 0, cw, ch);

    if (state.playing) {
      if (!state.currentMidi) {
        recordingCtx.fillStyle = "rgba(0,0,0,0.08)";
        recordingCtx.fillRect(0, 0, cw, ch);
      }

      drawTrailOn(recordingCtx, r, recordingCursorRadius(r), false);
      drawCursorOn(recordingCtx, r, recordingCursorRadius(r) * 0.98, Math.max(1.2, cw / 1080 * 1.2));
    }

    recordingCtx.restore();
  }

  function drawTrailOn(targetCtx, rect, baseRadius, pruneTrail = true) {
    if (!state.image || state.trail.length < 2) return;
    const now = performance.now();

    targetCtx.lineCap = "round";
    targetCtx.lineJoin = "round";

    for (let i = 1; i < state.trail.length; i++) {
      const a = state.trail[i - 1];
      const b = state.trail[i];
      const age = now - b.t;
      if (age < 0 || age > TRAIL_DURATION_MS) continue;
      const life = 1 - age / TRAIL_DURATION_MS;

      const x1 = rect.x + a.x * rect.w;
      const y1 = rect.y + a.y * rect.h;
      const x2 = rect.x + b.x * rect.w;
      const y2 = rect.y + b.y * rect.h;

      targetCtx.strokeStyle = `rgba(120,225,255,${0.13 * life})`;
      targetCtx.lineWidth = Math.max(14, baseRadius * (1.05 + 0.72 * life));
      targetCtx.beginPath();
      targetCtx.moveTo(x1, y1);
      targetCtx.lineTo(x2, y2);
      targetCtx.stroke();

      targetCtx.strokeStyle = `rgba(255,255,255,${0.58 * life})`;
      targetCtx.lineWidth = Math.max(7, baseRadius * (0.52 + 0.40 * life));
      targetCtx.beginPath();
      targetCtx.moveTo(x1, y1);
      targetCtx.lineTo(x2, y2);
      targetCtx.stroke();
    }

    if (pruneTrail) state.trail = state.trail.filter(p => now - p.t <= TRAIL_DURATION_MS);
  }

  function drawCursorOn(targetCtx, rect, radius, lineWidth) {
    if (!state.image || !state.playing) return;
    const x = rect.x + state.normX * rect.w;
    const y = rect.y + state.normY * rect.h;

    targetCtx.save();
    targetCtx.lineCap = "round";

    targetCtx.strokeStyle = "rgba(255,255,255,0.84)";
    targetCtx.lineWidth = lineWidth;
    targetCtx.beginPath();
    targetCtx.arc(x, y, radius, 0, Math.PI * 2);
    targetCtx.stroke();

    targetCtx.strokeStyle = state.sampleColor;
    targetCtx.globalAlpha = 0.95;
    targetCtx.lineWidth = Math.max(6.8, radius * 0.30);
    targetCtx.beginPath();
    targetCtx.arc(x, y, radius * 0.78, 0, Math.PI * 2);
    targetCtx.stroke();

    const label = state.currentNoteLabel || "Rest";
    targetCtx.globalAlpha = 1;
    targetCtx.font = `800 ${label === "Rest" ? radius * 0.44 : radius * 0.56}px system-ui, sans-serif`;
    targetCtx.textAlign = "center";
    targetCtx.textBaseline = "middle";
    targetCtx.shadowColor = "rgba(0,0,0,0.82)";
    targetCtx.shadowBlur = radius * 0.16;
    targetCtx.shadowOffsetY = radius * 0.05;
    targetCtx.fillStyle = label === "Rest" ? "rgba(245,248,252,0.92)" : "#fff";
    targetCtx.fillText(label, x, y - radius * 0.03);

    targetCtx.restore();
  }

  function draw() {
    resizeCanvas();
    computeImageRect();

    const cw = els.canvas.width;
    const ch = els.canvas.height;
    ctx.clearRect(0, 0, cw, ch);
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cw, ch);

    if (state.image) {
      const r = state.imageRect;
      ctx.drawImage(state.image, r.x, r.y, r.w, r.h);

      if (state.playing) {
        updateCrosshair();

        // v0.6: continuously sample only as the next quantized candidate.
        // Visual note / Rest state is latched on the eighth-note tick, matching
        // the App's quantized performance feel and avoiding Rest flicker.
        const mapping = sampleAndMap();
        updateAudioCandidate(mapping);

        if (!state.currentMidi) {
          ctx.fillStyle = "rgba(0,0,0,0.08)";
          ctx.fillRect(r.x, r.y, r.w, r.h);
        }

        addTrailPoint();
        drawTrail();
        drawCursor();
      }
    } else {
      ctx.fillStyle = "#06080c";
      ctx.fillRect(0, 0, cw, ch);
    }

    if (state.recording) drawRecordingFrame();

    requestAnimationFrame(draw);
  }

  function updateCrosshair() {
    const smoothing = state.playing ? 0.16 : 0.22;
    state.normX += (state.targetNormX - state.normX) * smoothing;
    state.normY += (state.targetNormY - state.normY) * smoothing;
    state.normX = clamp(state.normX, 0, 1);
    state.normY = clamp(state.normY, 0, 1);
  }

  function sampleAndMap() {
    if (!state.image || !sampleCanvas.width || !sampleCanvas.height) {
      return state.committedMapping || { midi: null, note: "Rest", css: "#ffffff", velocity: 0 };
    }

    // Android v5.26 samples a circular region around the cursor:
    // displayRadius = crosshairRadius * SAMPLE_RADIUS_MULTIPLIER
    // srcRadius is converted back to bitmap/source coordinates.
    const SAMPLE_RADIUS_MULTIPLIER = 1.85;
    const COLOR_SMOOTHING_ALPHA = 0.32;
    const VALUE_SMOOTHING_ALPHA = 0.22;

    const srcX = Math.round(clamp(state.normX, 0, 1) * (sampleCanvas.width - 1));
    const srcY = Math.round(clamp(state.normY, 0, 1) * (sampleCanvas.height - 1));

    const displayRadius = cursorRadius() * SAMPLE_RADIUS_MULTIPLIER;
    const srcRadius = Math.max(3, Math.round(displayRadius / Math.max(1, state.imageRect.w) * sampleCanvas.width));
    const step = Math.max(1, Math.floor(srcRadius / 10));

    let rSum = 0, gSum = 0, bSum = 0, count = 0;
    for (let y = srcY - srcRadius; y <= srcY + srcRadius; y += step) {
      if (y < 0 || y >= sampleCanvas.height) continue;
      for (let x = srcX - srcRadius; x <= srcX + srcRadius; x += step) {
        if (x < 0 || x >= sampleCanvas.width) continue;
        const dx = x - srcX;
        const dy = y - srcY;
        if (dx * dx + dy * dy > srcRadius * srcRadius) continue;
        const d = sampleCtx.getImageData(x, y, 1, 1).data;
        rSum += d[0];
        gSum += d[1];
        bSum += d[2];
        count++;
      }
    }

    if (count <= 0) return state.committedMapping || { midi: null, note: "Rest", css: "#ffffff", velocity: 0 };

    const rawR = rSum / count;
    const rawG = gSum / count;
    const rawB = bSum / count;

    if (!state.hasSmoothColor) {
      state.smoothR = rawR;
      state.smoothG = rawG;
      state.smoothB = rawB;
      state.hasSmoothColor = true;
    } else {
      state.smoothR = (1 - COLOR_SMOOTHING_ALPHA) * state.smoothR + COLOR_SMOOTHING_ALPHA * rawR;
      state.smoothG = (1 - COLOR_SMOOTHING_ALPHA) * state.smoothG + COLOR_SMOOTHING_ALPHA * rawG;
      state.smoothB = (1 - COLOR_SMOOTHING_ALPHA) * state.smoothB + COLOR_SMOOTHING_ALPHA * rawB;
    }

    const r = Math.max(0, Math.min(255, Math.round(state.smoothR)));
    const g = Math.max(0, Math.min(255, Math.round(state.smoothG)));
    const b = Math.max(0, Math.min(255, Math.round(state.smoothB)));
    const css = `rgb(${r},${g},${b})`;
    state.sampleColor = css;

    const hsv = rgbToHsv(r, g, b);
    if (!state.hasSmoothValue) {
      state.smoothValue = hsv.v;
      state.hasSmoothValue = true;
    } else {
      state.smoothValue = (1 - VALUE_SMOOTHING_ALPHA) * state.smoothValue + VALUE_SMOOTHING_ALPHA * hsv.v;
    }

    const rawMapping = mapHsvToMusic(hsv.h, hsv.s, state.smoothValue, r, g, b, css);
    const now = performance.now();

    if (!sameMidi(state.stableCandidateMidi, rawMapping.midi)) {
      state.stableCandidateMidi = rawMapping.midi;
      state.stableCandidateMapping = rawMapping;
      state.stableCandidateSinceMs = now;
    } else {
      state.stableCandidateMapping = rawMapping;
    }

    if (now - state.stableCandidateSinceMs >= stableMsForCurrentBpm()) {
      state.committedMapping = state.stableCandidateMapping;
    }

    return state.committedMapping || rawMapping;
  }

  function stableMsForCurrentBpm() {
    const ms = Math.round(45 - (state.bpm - 60) * 0.14);
    return clamp(ms, 25, 45);
  }

  function sameMidi(a, b) {
    if (a == null && b == null) return true;
    if (a == null || b == null) return false;
    return a === b;
  }

  function mapHsvToMusic(h, s, v, r, g, b, css) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;

    // Android v5.26 neutral / pale sky Rest rules.
    if (v < 0.020) return { midi: null, note: "Rest", css, velocity: 0 };
    if (v > 0.985 && s < 0.055) return { midi: null, note: "Rest", css, velocity: 0 };
    if (s < 0.025 && chroma < 7) return { midi: null, note: "Rest", css, velocity: 0 };
    if (v < 0.10 && s < 0.040 && chroma < 10) return { midi: null, note: "Rest", css, velocity: 0 };
    if (v > 0.78 && s < 0.115 && chroma < 32) return { midi: null, note: "Rest", css, velocity: 0 };
    if (v > 0.88 && s < 0.160 && chroma < 44) return { midi: null, note: "Rest", css, velocity: 0 };

    const velocity = velocityFromSaturation(s, v);

    let pc;
    if (h < 15 || h >= 345) pc = 0;
    else if (h < 35) pc = 2;
    else if (h < 65) pc = 4;
    else if (h < 150) pc = 5;
    else if (h < 190) pc = 7;
    else if (h < 250) pc = 9;
    else pc = 11;

    let octave;
    if (v < 0.333) octave = 3;
    else if (v < 0.666) octave = 4;
    else octave = (s < 0.220 && chroma < 64) ? 4 : 5;

    const midi = (octave + 1) * 12 + pc;
    return { midi, note: noteName(midi), css, velocity };
  }

  function rgbToHsv(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    if (d !== 0) {
      if (max === r) h = ((g - b) / d) % 6;
      else if (max === g) h = (b - r) / d + 2;
      else h = (r - g) / d + 4;
      h *= 60;
      if (h < 0) h += 360;
    }
    return { h, s: max === 0 ? 0 : d / max, v: max };
  }

  function velocityFromSaturation(s, v) {
    let normalized = (s - 0.025) / 0.75;
    normalized = clamp(normalized, 0, 1);

    const curved = Math.pow(normalized, 0.65);
    let velocity = 0.28 + curved * 0.72;

    if (v < 0.20) velocity *= 0.78;

    if (v > 0.70 && s < 0.25) {
      const pale = (0.25 - s) / 0.25;
      velocity *= (1.0 - pale * 0.42);
    }

    return clamp(velocity, 0.14, 1.0);
  }

  function noteName(midi) {
    const names = ["C", "?", "D", "?", "E", "F", "?", "G", "?", "A", "?", "B"];
    return names[midi % 12] + (Math.floor(midi / 12) - 1);
  }

  function addTrailPoint() {
    const now = performance.now();
    if (now - lastTrailAdd < TRAIL_SAMPLE_INTERVAL_MS) return;
    lastTrailAdd = now;

    state.trail.push({
      t: now,
      x: state.normX,
      y: state.normY
    });

    if (state.trail.length > TRAIL_MAX_POINTS) state.trail.shift();
  }

  function drawTrail() {
    drawTrailOn(ctx, state.imageRect, cursorRadius(), true);
  }

  function cursorRadius() {
    // v1.5: restore the smaller cursor size after v1.4 rollback.
    // Keep the compact app-like visual from v1.1 / v1.2.
    const dpr = Math.max(1, els.canvas.width / Math.max(1, window.innerWidth));
    return Math.max(20 * dpr, Math.min(state.imageRect.w, state.imageRect.h) * 0.036);
  }

  function drawCursor() {
    drawCursorOn(ctx, state.imageRect, cursorRadius() * 0.98, Math.max(1.2, els.canvas.width / window.innerWidth * 1.2));
  }

  async function ensureAudio() {
    if (audio.ctx) {
      if (audio.ctx.state !== "running") await audio.ctx.resume();
      return;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) throw new Error("Web Audio API is not supported.");

    audio.ctx = new AudioContext();
    audio.master = audio.ctx.createGain();
    audio.master.gain.value = 0.85;
    audio.master.connect(audio.ctx.destination);

    audio.recorderDest = audio.ctx.createMediaStreamDestination();
    audio.master.connect(audio.recorderDest);

    audio.melodyGain = audio.ctx.createGain();
    audio.melodyGain.gain.value = 0.0001;
    audio.melodyGain.connect(audio.master);

    audio.melodyOsc1 = audio.ctx.createOscillator();
    audio.melodyOsc2 = audio.ctx.createOscillator();
    audio.melodyOsc1.type = "sine";
    audio.melodyOsc2.type = "triangle";
    audio.melodyOsc1.connect(audio.melodyGain);
    audio.melodyOsc2.connect(audio.melodyGain);
    audio.melodyOsc1.start();
    audio.melodyOsc2.start();

    audio.noiseBuffer = makeNoiseBuffer(audio.ctx);
  }

  function makeNoiseBuffer(ac) {
    const buffer = ac.createBuffer(1, ac.sampleRate * 0.25, ac.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  function updateAudioCandidate(mapping) {
    state.candidateMapping = mapping;
    state.candidateMidi = mapping.midi;
    state.candidateVelocity = mapping.velocity;
  }

  function latchQuantizedMapping() {
    const mapping = state.candidateMapping || sampleAndMap();
    const previousMidi = state.currentMidi;
    state.currentMidi = mapping.midi;
    state.currentNoteLabel = mapping.note;
    state.sampleColor = mapping.css;

    // Android v5.26 haptic follows note events, not a plain metronome pulse.
    // In Web v0.8, vibrate only when the quantized pitch/Rest state changes
    // into a sounding note. This avoids constant beat vibration while preserving
    // color-change feedback.
    if (mapping.midi != null && mapping.midi !== previousMidi && "vibrate" in navigator) {
      const duration = 10;
      try { navigator.vibrate(duration); } catch (err) { /* ignore */ }
    }
  }

  function quantizeLoop() {
    if (!state.playing || !audio.ctx) return;

    const now = audio.ctx.currentTime;
    if (state.nextEighthAt === 0) state.nextEighthAt = now;

    while (now >= state.nextEighthAt) {
      triggerTick(state.nextEighthAt);
      state.nextEighthAt += 60 / state.bpm / 2;
    }

    requestAnimationFrame(quantizeLoop);
  }

  function triggerTick(t) {
    const pos = state.eighthCounter % 8;
    triggerHat(t);
    if (pos === 0 || pos === 4) triggerKick(t);
    if (pos === 2 || pos === 6) triggerSnare(t);

    latchQuantizedMapping();
    applyCandidateNote(t);
    state.eighthCounter++;
  }

  function applyCandidateNote(t) {
    if (!audio.ctx || !audio.melodyGain) return;
    const midi = state.candidateMidi;
    const gain = audio.melodyGain.gain;

    if (midi == null) {
      gain.cancelScheduledValues(t);
      gain.setTargetAtTime(0.0001, t, 0.045);
      return;
    }

    const freq = 440 * Math.pow(2, (midi - 69) / 12);
    audio.melodyOsc1.frequency.setTargetAtTime(freq, t, 0.005);
    audio.melodyOsc2.frequency.setTargetAtTime(freq * 2, t, 0.005);
    const amp = 0.05 + state.candidateVelocity * 0.16;
    gain.cancelScheduledValues(t);
    gain.setTargetAtTime(amp, t, 0.025);
  }

  function triggerKick(t) {
    if (!audio.ctx) return;
    const osc = audio.ctx.createOscillator();
    const gain = audio.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(105, t);
    osc.frequency.exponentialRampToValueAtTime(38, t + 0.24);
    gain.gain.setValueAtTime(0.5, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    osc.connect(gain);
    gain.connect(audio.master);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  function triggerSnare(t) {
    if (!audio.ctx) return;
    const src = audio.ctx.createBufferSource();
    const gain = audio.ctx.createGain();
    src.buffer = audio.noiseBuffer;
    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    src.connect(gain);
    gain.connect(audio.master);
    src.start(t);
    src.stop(t + 0.2);
  }

  function triggerHat(t) {
    if (!audio.ctx) return;
    const src = audio.ctx.createBufferSource();
    const filter = audio.ctx.createBiquadFilter();
    const gain = audio.ctx.createGain();
    src.buffer = audio.noiseBuffer;
    filter.type = "highpass";
    filter.frequency.value = 6500;
    gain.gain.setValueAtTime(0.06, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(audio.master);
    src.start(t);
    src.stop(t + 0.07);
  }

  function setPerformanceUiVisible(visible) {
    state.controlsVisible = !!visible;
    const targets = [els.topbar, els.bottomBar];
    for (const el of targets) {
      if (!el) continue;
      el.classList.toggle("performance-hidden", !visible);
      el.classList.toggle("performance-visible", visible);
    }

    if (els.sensorBtn) {
      const showRecenter = state.playing && visible;
      els.sensorBtn.classList.toggle("hidden", !showRecenter);
      els.sensorBtn.classList.toggle("performance-hidden", !showRecenter);
      els.sensorBtn.classList.toggle("performance-visible", showRecenter);
    }

    // Android v5.26 behavior:
    // - standby: center play button is visible
    // - playing: center stop button is visible only when controls are visible
    if (state.playing) {
      els.playBtn.classList.toggle("transport-hidden", !visible);
    } else {
      els.playBtn.classList.remove("transport-hidden");
    }
  }

  function setTransportButton(playing) {
    els.playBtn.classList.toggle("playing", playing);
    els.playBtn.textContent = playing ? "" : "▶";
    els.playBtn.setAttribute("aria-label", playing ? t("stop") : t("play"));
    els.playBtn.classList.remove("transport-hidden");
  }

  function showControlsTemporarily(ms = 1800) {
    if (!state.image) return;
    setPerformanceUiVisible(true);
    clearTimeout(state.transportHideTimer);
    if (state.playing) {
      state.transportHideTimer = setTimeout(() => {
        if (state.playing) setPerformanceUiVisible(false);
      }, ms);
    }
  }

  function hideControlsImmediately() {
    if (!state.image || !state.playing) return;
    clearTimeout(state.transportHideTimer);
    setPerformanceUiVisible(false);
  }

  function toggleControlsFromStageTap() {
    if (!state.image) return;
    if (!state.playing) {
      showControlsTemporarily(1800);
      return;
    }

    // v2.14: video-player style behavior.
    // Tap once when UI is hidden -> show it temporarily.
    // Tap again on the empty photo area when UI is visible -> hide it immediately.
    if (state.controlsVisible) {
      hideControlsImmediately();
    } else {
      showControlsTemporarily(1800);
    }
  }

  function showTransportTemporarily(ms = 1500) {
    // Backward-compatible alias for older calls.
    showControlsTemporarily(ms);
  }

  function currentOrientationType() {
    if (screen.orientation && screen.orientation.type) return screen.orientation.type;
    return window.innerWidth >= window.innerHeight ? "landscape-primary" : "portrait-primary";
  }

  function getDisplayRotationCode() {
    const type = currentOrientationType();
    const angle = screen.orientation && typeof screen.orientation.angle === "number"
      ? screen.orientation.angle
      : (type.includes("secondary") ? 270 : 0);

    // Android Surface constants:
    // ROTATION_0 = 0, ROTATION_90 = 1, ROTATION_180 = 2, ROTATION_270 = 3.
    if (type.startsWith("landscape")) {
      if (type.includes("secondary") || angle === 270 || angle === -90) return 3;
      return 1;
    }
    if (type.startsWith("portrait") && (type.includes("secondary") || angle === 180)) return 2;
    return 0;
  }

  function beginImmersiveFromGesture() {
    // v2.13: restore browser fullscreen for performance.
    // In normal web page mode, mobile status/browser bars cannot be hidden by
    // CSS. Fullscreen may show a native exit hint, but it gives the landscape
    // performance screen enough usable space.
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      try {
        const p = document.documentElement.requestFullscreen({ navigationUI: "hide" });
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch (err) {
        // ignore; playback and UI still work
      }
    }
  }

  async function lockOrientationForPlay() {
    state.playOrientationType = currentOrientationType();
    state.playDisplayRotation = getDisplayRotationCode();
    state.lockedOrientation = false;

    beginImmersiveFromGesture();

    if (!screen.orientation || !screen.orientation.lock) return;
    const lockType = state.playOrientationType.startsWith("landscape") ? "landscape" : "portrait";
    try {
      await screen.orientation.lock(lockType);
      state.lockedOrientation = true;
    } catch (err) {
      console.warn("Orientation lock failed", err);
      state.lockedOrientation = false;
    }
  }

  function unlockOrientationAfterPlay() {
    if (screen.orientation && screen.orientation.unlock && state.lockedOrientation) {
      try { screen.orientation.unlock(); } catch (err) { console.warn(err); }
    }
    state.lockedOrientation = false;
    // v2.13: playback may enter browser fullscreen automatically.
  }

  function resetPerformanceState() {
    state.currentMidi = null;
    state.currentNoteLabel = "Rest";
    state.candidateMidi = null;
    state.candidateVelocity = 0;
    state.candidateMapping = null;
    state.committedMapping = { midi: null, note: "Rest", css: "#ffffff", velocity: 0 };
    state.stableCandidateMidi = null;
    state.stableCandidateMapping = { midi: null, note: "Rest", css: "#ffffff", velocity: 0 };
    state.stableCandidateSinceMs = performance.now();
    state.hasSmoothColor = false;
    state.hasSmoothValue = false;
    state.smoothR = 255;
    state.smoothG = 255;
    state.smoothB = 255;
    state.smoothValue = 0;
    state.accelOffsetX = 0;
    state.accelOffsetY = 0;
    state.playDisplayRotation = getDisplayRotationCode();
    state.motionBaseline = null;
    state.baseline = null;
    state.baselineRotationMatrix = null;
    state.fallbackEulerBaseline = null;
    state.targetNormX = state.normX = 0.5;
    state.targetNormY = state.normY = 0.5;
    state.lastSensorTargetX = 0.5;
    state.lastSensorTargetY = 0.5;
    state.hasSensorTarget = false;
  }

  async function startPlaying() {
    if (!state.image) return;

    beginImmersiveFromGesture();

    // Web sensors require a user gesture. The play button is the closest
    // equivalent to Android's always-registered sensor listener, so enable it
    // automatically here instead of requiring the user to press the recenter icon.
    if (!state.sensorEnabled) {
      await requestSensor();
    }

    // Android v5.26 play button logic: recenter + prepareForPlayback before
    // setPlaying(true). Do this after permission flow so the first sensor event
    // received during playback becomes the fresh baseline.
    resetPerformanceState();
    recenter();
    state.playOrientationType = currentOrientationType();
    state.playDisplayRotation = getDisplayRotationCode();

    await lockOrientationForPlay();
    await ensureAudio();

    state.playing = true;
    updateRecordButton();
    state.eighthCounter = 0;
    state.nextEighthAt = audio.ctx.currentTime + 0.05;
    state.trail = [];
    state.candidateMapping = sampleAndMap();
    latchQuantizedMapping();
    setTransportButton(true);
    showControlsTemporarily(1800);
    quantizeLoop();

    if (state.recordArmed) startRecording();
  }

  function stopPlaying() {
    state.playing = false;
    updateRecordButton();
    unlockOrientationAfterPlay();
    setPerformanceUiVisible(true);
    els.sensorBtn.classList.add("hidden");
    setTransportButton(false);
    clearTimeout(state.transportHideTimer);
    state.nextEighthAt = 0;
    state.trail = [];
    state.currentMidi = null;
    state.currentNoteLabel = "Rest";
    if (audio.melodyGain && audio.ctx) {
      audio.melodyGain.gain.setTargetAtTime(0.0001, audio.ctx.currentTime, 0.03);
    }

    if (state.recording) stopRecording();
    state.recordArmed = false;
    updateRecordButton();
  }

  function chooseMimeType() {
    if (!window.MediaRecorder || !MediaRecorder.isTypeSupported) {
      return { mime: "", ext: "webm" };
    }

    const candidates = [
      ["video/mp4;codecs=avc1.42E01E,mp4a.40.2", "mp4"],
      ["video/mp4", "mp4"],
      ["video/webm;codecs=vp9,opus", "webm"],
      ["video/webm;codecs=vp8,opus", "webm"],
      ["video/webm", "webm"]
    ];

    for (const [mime, ext] of candidates) {
      if (MediaRecorder.isTypeSupported(mime)) return { mime, ext };
    }
    return { mime: "", ext: "webm" };
  }

  function formatElapsedTime(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (minutes < 60) {
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }
    const hours = Math.floor(minutes / 60);
    const restMinutes = minutes % 60;
    return `${hours}:${String(restMinutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function updateRecordingTimer() {
    if (!state.recording || !els.recordTimer) return;
    const elapsed = performance.now() - state.recordingStartedAtMs;
    els.recordTimer.textContent = `● ${formatElapsedTime(elapsed)}`;
  }

  function startRecordingTimer() {
    if (!els.recordTimer) return;
    state.recordingStartedAtMs = performance.now();
    els.recordTimer.textContent = "● 00:00";
    els.recordTimer.classList.remove("hidden");
    clearInterval(state.recordingTimerId);
    state.recordingTimerId = setInterval(updateRecordingTimer, 250);
  }

  function stopRecordingTimer() {
    clearInterval(state.recordingTimerId);
    state.recordingTimerId = null;
    state.recordingStartedAtMs = 0;
    if (els.recordTimer) {
      els.recordTimer.classList.add("hidden");
      els.recordTimer.textContent = "● 00:00";
    }
  }

  function readEbmlIdLength(firstByte) {
    if (firstByte >= 0x80) return 1;
    if (firstByte >= 0x40) return 2;
    if (firstByte >= 0x20) return 3;
    if (firstByte >= 0x10) return 4;
    return 0;
  }

  function readEbmlSize(bytes, pos) {
    const first = bytes[pos];
    if (!first) return null;

    let length = 1;
    let marker = 0x80;
    while (length <= 8 && (first & marker) === 0) {
      marker >>= 1;
      length++;
    }
    if (length > 8 || pos + length > bytes.length) return null;

    let value = first & (marker - 1);
    let unknown = value === (marker - 1);
    for (let i = 1; i < length; i++) {
      value = value * 256 + bytes[pos + i];
      if (bytes[pos + i] !== 0xff) unknown = false;
    }

    return { value, length, unknown };
  }

  function readEbmlElement(bytes, pos, end) {
    if (pos >= end) return null;
    const idLen = readEbmlIdLength(bytes[pos]);
    if (!idLen || pos + idLen >= end) return null;

    let id = 0;
    for (let i = 0; i < idLen; i++) id = id * 256 + bytes[pos + i];

    const size = readEbmlSize(bytes, pos + idLen);
    if (!size) return null;

    const dataStart = pos + idLen + size.length;
    const dataEnd = size.unknown ? end : dataStart + size.value;
    if (dataStart > end || (!size.unknown && dataEnd > end)) return null;

    return {
      id,
      idLen,
      sizeLen: size.length,
      size: size.value,
      unknownSize: size.unknown,
      headerStart: pos,
      dataStart,
      dataEnd
    };
  }

  function findEbmlChild(bytes, start, end, targetId) {
    let pos = start;
    while (pos < end) {
      const el = readEbmlElement(bytes, pos, end);
      if (!el) return null;
      if (el.id === targetId) return el;
      if (el.unknownSize) return null;
      pos = el.dataEnd;
    }
    return null;
  }

  function encodeEbmlSize(value, preferredLength = 0) {
    const lengths = preferredLength ? [preferredLength, 1, 2, 3, 4, 5, 6, 7, 8] : [1, 2, 3, 4, 5, 6, 7, 8];
    for (const length of lengths) {
      if (length < 1 || length > 8) continue;
      const max = Math.pow(2, 7 * length) - 2; // all-ones is reserved for unknown size
      if (value > max) continue;

      const bytes = new Uint8Array(length);
      let remaining = value;
      for (let i = length - 1; i >= 0; i--) {
        bytes[i] = remaining & 0xff;
        remaining = Math.floor(remaining / 256);
      }
      bytes[0] |= 1 << (8 - length);
      return bytes;
    }
    return null;
  }

  function readUnsignedInteger(bytes, start, end) {
    let value = 0;
    for (let i = start; i < end; i++) value = value * 256 + bytes[i];
    return value;
  }

  function makeWebmDurationElement(durationMs, timecodeScale) {
    const durationTicks = Math.max(1, durationMs * 1_000_000 / (timecodeScale || 1_000_000));
    const out = new Uint8Array(11);
    out[0] = 0x44;
    out[1] = 0x89;
    out[2] = 0x88; // size = 8 bytes
    new DataView(out.buffer).setFloat64(3, durationTicks, false);
    return out;
  }

  async function fixWebmDurationMetadata(blob, durationMs) {
    if (!blob || !durationMs || durationMs < 250) return blob;
    if (!/webm/i.test(blob.type || "") && state.recordedExt !== "webm") return blob;

    const buffer = await blob.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const segment = findEbmlChild(bytes, 0, bytes.length, 0x18538067);
    if (!segment) return blob;

    const segmentEnd = segment.unknownSize ? bytes.length : segment.dataEnd;
    const info = findEbmlChild(bytes, segment.dataStart, segmentEnd, 0x1549a966);
    if (!info || info.unknownSize) return blob;

    const timecodeScaleEl = findEbmlChild(bytes, info.dataStart, info.dataEnd, 0x2ad7b1);
    const timecodeScale = timecodeScaleEl
      ? readUnsignedInteger(bytes, timecodeScaleEl.dataStart, timecodeScaleEl.dataEnd)
      : 1_000_000;

    const durationElement = makeWebmDurationElement(durationMs, timecodeScale);
    const existingDuration = findEbmlChild(bytes, info.dataStart, info.dataEnd, 0x4489);

    let newInfoData;
    if (existingDuration) {
      const before = bytes.slice(info.dataStart, existingDuration.headerStart);
      const after = bytes.slice(existingDuration.dataEnd, info.dataEnd);
      newInfoData = new Uint8Array(before.length + durationElement.length + after.length);
      newInfoData.set(before, 0);
      newInfoData.set(durationElement, before.length);
      newInfoData.set(after, before.length + durationElement.length);
    } else {
      const oldInfoData = bytes.slice(info.dataStart, info.dataEnd);
      newInfoData = new Uint8Array(oldInfoData.length + durationElement.length);
      newInfoData.set(oldInfoData, 0);
      newInfoData.set(durationElement, oldInfoData.length);
    }

    const delta = (info.idLen + info.sizeLen + newInfoData.length) - (info.dataEnd - info.headerStart);
    if (delta !== 0 && !segment.unknownSize) {
      // Avoid rewriting finite Segment size fields in a risky way. Chrome's
      // MediaRecorder normally uses unknown Segment size, so this branch should
      // rarely be hit.
      return blob;
    }

    const newInfoSize = encodeEbmlSize(newInfoData.length, info.sizeLen);
    if (!newInfoSize) return blob;

    const infoId = bytes.slice(info.headerStart, info.headerStart + info.idLen);
    const beforeInfo = bytes.slice(0, info.headerStart);
    const afterInfo = bytes.slice(info.dataEnd);

    const fixed = new Uint8Array(beforeInfo.length + infoId.length + newInfoSize.length + newInfoData.length + afterInfo.length);
    let offset = 0;
    fixed.set(beforeInfo, offset); offset += beforeInfo.length;
    fixed.set(infoId, offset); offset += infoId.length;
    fixed.set(newInfoSize, offset); offset += newInfoSize.length;
    fixed.set(newInfoData, offset); offset += newInfoData.length;
    fixed.set(afterInfo, offset);

    return new Blob([fixed], { type: blob.type || "video/webm" });
  }

  async function finalizeRecordedBlob(blob) {
    if (state.recordedExt === "webm" || /webm/i.test(blob?.type || "")) {
      try {
        return await fixWebmDurationMetadata(blob, state.recordingDurationMs);
      } catch (err) {
        console.warn("WebM duration metadata fix failed", err);
        return blob;
      }
    }
    return blob;
  }

  function startRecording() {
    if (!setupRecordingCanvas() || !recordingCanvas.captureStream || !window.MediaRecorder || !audio.recorderDest) {
      alert(t("recordingUnsupported"));
      state.recordArmed = false;
      updateRecordButton();
      return;
    }

    drawRecordingFrame();
    const stream = recordingCanvas.captureStream(60);
    for (const track of audio.recorderDest.stream.getAudioTracks()) {
      stream.addTrack(track);
    }

    const { mime, ext } = chooseMimeType();
    const options = mime ? { mimeType: mime, videoBitsPerSecond: 8_000_000, audioBitsPerSecond: 192_000 } : {};
    state.recordedChunks = [];
    state.recordedMime = mime || "video/webm";
    state.recordedExt = ext;

    try {
      state.recorder = new MediaRecorder(stream, options);
    } catch (err) {
      console.warn(err);
      alert("录制初始化失败。当前浏览器可能不支持该视频格式。");
      return;
    }

    state.recorder.ondataavailable = e => {
      if (e.data && e.data.size > 0) state.recordedChunks.push(e.data);
    };

    state.recorder.onstop = async () => {
      const rawBlob = new Blob(state.recordedChunks, { type: state.recordedMime });
      state.recordedBlob = await finalizeRecordedBlob(rawBlob);
      showSaveDialog();
    };

    state.recording = true;
    state.recordingDurationMs = 0;
    drawRecordingFrame();
    state.recorder.start();
    state.recordArmed = false;
    startRecordingTimer();
    updateRecordButton();
  }

  function stopRecording() {
    if (state.recordingStartedAtMs) {
      state.recordingDurationMs = Math.max(0, performance.now() - state.recordingStartedAtMs);
    }
    state.recording = false;
    stopRecordingTimer();
    updateRecordButton();
    if (state.recorder && state.recorder.state !== "inactive") {
      state.recorder.stop();
    }
  }

  function setFilenameText(value) {
    els.saveNameInput.textContent = value || "Iroto";
  }

  function getFilenameText() {
    return (els.saveNameInput.textContent || "").trim();
  }

  function selectFilenameText() {
    const range = document.createRange();
    range.selectNodeContents(els.saveNameInput);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  function showSaveDialog() {
    setFilenameText(state.imageBaseName || "Iroto");
    updateRecordInfo();
    els.saveDialog.showModal();
    setTimeout(() => {
      els.saveNameInput.focus({ preventScroll: true });
      selectFilenameText();
    }, 80);
  }

  function updateRecordInfo() {
    const ext = state.recordedExt || "webm";
    els.recordInfo.textContent = `${t("recordFormat")}：.${ext} / ${t("recordSize")}：${formatBytes(state.recordedBlob?.size || 0)}`;
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  }

  function saveRecording() {
    if (!state.recordedBlob) return;
    const name = sanitizeName(getFilenameText() || state.imageBaseName || "Iroto");
    const a = document.createElement("a");
    const url = URL.createObjectURL(state.recordedBlob);
    a.href = url;
    a.download = `${name}.${state.recordedExt || "webm"}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    els.saveDialog.close();
  }

  function discardRecording() {
    if (!confirm(t("discardConfirm"))) return;
    state.recordedBlob = null;
    state.recordedChunks = [];
    els.saveDialog.close();
  }

  function updateRecordButton() {
    const unavailableDuringPlay = state.playing && !state.recording;
    els.recordBtn.classList.toggle("armed", state.recordArmed || state.recording);
    els.recordBtn.classList.toggle("disabled", unavailableDuringPlay);
    els.recordBtn.setAttribute("aria-disabled", unavailableDuringPlay ? "true" : "false");
    els.recordBtn.textContent = (state.recordArmed || state.recording) ? "●" : "○";
  }

  function isSecureEnoughForSensors() {
    return window.isSecureContext ||
      location.protocol === "https:" ||
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1";
  }

  function setSensorStatus(text, level = "") {
    if (!els.sensorStatus) return;
    els.sensorStatus.textContent = text;
    els.sensorStatus.classList.remove("ok", "warn", "bad");
    if (level) els.sensorStatus.classList.add(level);
  }

  async function requestSensor() {
    if (!isSecureEnoughForSensors()) {
      state.sensorMode = "touch";
      return false;
    }

    const hasOrientation = "DeviceOrientationEvent" in window;
    const hasMotion = "DeviceMotionEvent" in window;

    if (!hasOrientation && !hasMotion) {
      state.sensorMode = "touch";
      updateCompatDialog();
      return false;
    }

    try {
      if (hasOrientation && typeof DeviceOrientationEvent.requestPermission === "function") {
        const result = await DeviceOrientationEvent.requestPermission();
        if (result !== "granted") return false;
      }

      if (hasMotion && typeof DeviceMotionEvent.requestPermission === "function") {
        const result = await DeviceMotionEvent.requestPermission();
        if (result !== "granted") return false;
      }

      window.removeEventListener("deviceorientation", onOrientation, true);
      window.removeEventListener("devicemotion", onMotion, true);

      if (hasOrientation) window.addEventListener("deviceorientation", onOrientation, true);
      if (hasMotion) window.addEventListener("devicemotion", onMotion, true);

      state.sensorEnabled = true;
      state.sensorMode = "sensor";
      state.sensorSource = "waiting";
      state.baseline = null;
      state.motionBaseline = null;
      state.sensorLastValidAt = 0;
      state.sensorValidCount = 0;
      els.sensorBtn.classList.add("sensor-on");
      setSensorStatus("", "");

      clearTimeout(state.sensorWatchTimer);
      state.sensorWatchTimer = setTimeout(() => {
        if (state.sensorEnabled && state.sensorValidCount === 0) {
          // Keep UI clean, but leave a console hint for debugging.
          console.warn("No sensor data received. Check HTTPS and Chrome Motion sensors permission.");
        }
      }, 1800);

      updateCompatDialog();
      return true;
    } catch (err) {
      console.warn(err);
      state.sensorMode = "touch";
      return false;
    }
  }

  function markSensorValid(source) {
    state.sensorSource = source;
    state.sensorLastValidAt = performance.now();
    state.sensorValidCount++;
    // v0.8: keep the performance UI clean like the Android app. Sensor status is
    // not displayed next to the recenter button.
  }

  function landscapeDirectionForRotation(displayRotation) {
    // Android v5.26: Surface.ROTATION_270 reverses both landscape axes.
    return displayRotation === 3 ? -1 : 1;
  }

  function isLandscapeForPlay() {
    const type = state.playing ? state.playOrientationType : currentOrientationType();
    if (String(type).startsWith("landscape")) return true;
    if (String(type).startsWith("portrait")) return false;
    return window.innerWidth > window.innerHeight;
  }

  function applyTiltRelative(relativePitch, relativeRoll) {
    const PORTRAIT_X_TILT_RAD = 22 * Math.PI / 180;
    const PORTRAIT_Y_TILT_RAD = 22 * Math.PI / 180;
    const LANDSCAPE_X_TILT_RAD = 22 * Math.PI / 180;
    const LANDSCAPE_Y_TILT_RAD = 22 * Math.PI / 180;

    // v1.6: After switching to matrix-based relative pitch/roll, use the same
    // signs as Android v5.26. Earlier web versions used beta/gamma subtraction
    // and therefore needed web-specific sign corrections.
    const LANDSCAPE_X_SIGN = -1;
    const LANDSCAPE_Y_SIGN = -1;

    let dx;
    let dy;
    if (isLandscapeForPlay()) {
      const landscapeDirection = landscapeDirectionForRotation(state.playDisplayRotation || getDisplayRotationCode());
      dx = landscapeDirection * LANDSCAPE_X_SIGN * clamp(relativePitch / (2 * LANDSCAPE_X_TILT_RAD), -0.5, 0.5);
      dy = landscapeDirection * LANDSCAPE_Y_SIGN * clamp(relativeRoll / (2 * LANDSCAPE_Y_TILT_RAD), -0.5, 0.5);
    } else {
      dx = clamp(relativeRoll / (2 * PORTRAIT_X_TILT_RAD), -0.5, 0.5);
      dy = -clamp(relativePitch / (2 * PORTRAIT_Y_TILT_RAD), -0.5, 0.5);
    }

    state.tiltBaseX = clamp(0.5 + dx, 0, 1);
    state.tiltBaseY = clamp(0.5 + dy, 0, 1);
    applyTargetWithAcceleration();
  }

  function applyTargetWithAcceleration() {
    const bx = typeof state.tiltBaseX === "number" ? state.tiltBaseX : 0.5;
    const by = typeof state.tiltBaseY === "number" ? state.tiltBaseY : 0.5;
    state.targetNormX = clamp(bx + state.accelOffsetX, 0, 1);
    state.targetNormY = clamp(by + state.accelOffsetY, 0, 1);
  }

  function decayAccelerationOffset(dt) {
    const ACCEL_DECAY_PER_SECOND = 6.0;
    const decay = Math.exp(-ACCEL_DECAY_PER_SECOND * dt);
    state.accelOffsetX *= decay;
    state.accelOffsetY *= decay;
    if (Math.abs(state.accelOffsetX) < 0.001) state.accelOffsetX = 0;
    if (Math.abs(state.accelOffsetY) < 0.001) state.accelOffsetY = 0;
  }

  function deviceOrientationToMatrix(alphaDeg, betaDeg, gammaDeg) {
    // Web DeviceOrientation uses intrinsic Z-X-Y style angles.
    // This row-major matrix lets us imitate Android v5.26:
    // relativeMatrix = baseline^T * current
    const z = (alphaDeg || 0) * Math.PI / 180;
    const x = (betaDeg || 0) * Math.PI / 180;
    const y = (gammaDeg || 0) * Math.PI / 180;

    const cZ = Math.cos(z), sZ = Math.sin(z);
    const cX = Math.cos(x), sX = Math.sin(x);
    const cY = Math.cos(y), sY = Math.sin(y);

    return [
      cZ * cY - sZ * sX * sY, -cX * sZ, cY * sZ * sX + cZ * sY,
      cY * sZ + cZ * sX * sY,  cZ * cX, sZ * sY - cZ * cY * sX,
      -cX * sY,                 sX,      cX * cY
    ];
  }

  function multiplyTransposeLeft(left, right) {
    // Returns left^T * right for 3x3 row-major matrices, same as Android v5.26.
    return [
      left[0] * right[0] + left[3] * right[3] + left[6] * right[6],
      left[0] * right[1] + left[3] * right[4] + left[6] * right[7],
      left[0] * right[2] + left[3] * right[5] + left[6] * right[8],

      left[1] * right[0] + left[4] * right[3] + left[7] * right[6],
      left[1] * right[1] + left[4] * right[4] + left[7] * right[7],
      left[1] * right[2] + left[4] * right[5] + left[7] * right[8],

      left[2] * right[0] + left[5] * right[3] + left[8] * right[6],
      left[2] * right[1] + left[5] * right[4] + left[8] * right[7],
      left[2] * right[2] + left[5] * right[5] + left[8] * right[8]
    ];
  }

  function onOrientation(e) {
    if (!state.sensorEnabled || !state.playing) return;

    const alpha = typeof e.alpha === "number" ? e.alpha : null; // z
    const beta = typeof e.beta === "number" ? e.beta : null;    // x
    const gamma = typeof e.gamma === "number" ? e.gamma : null; // y
    if (beta == null || gamma == null || !Number.isFinite(beta) || !Number.isFinite(gamma)) return;

    let relativePitch;
    let relativeRoll;

    if (alpha != null && Number.isFinite(alpha)) {
      const rotationMatrix = deviceOrientationToMatrix(alpha, beta, gamma);

      if (!state.baselineRotationMatrix) {
        state.baselineRotationMatrix = rotationMatrix.slice();
        state.fallbackEulerBaseline = { beta, gamma };
        markSensorValid("orientation");
        return;
      }

      const relativeMatrix = multiplyTransposeLeft(state.baselineRotationMatrix, rotationMatrix);

      // Same extraction as Android v5.26:
      // relativePitch = atan2(-relativeMatrix[7], relativeMatrix[8])
      // relativeRoll  = atan2(-relativeMatrix[6], relativeMatrix[8])
      relativePitch = Math.atan2(-relativeMatrix[7], relativeMatrix[8]);
      relativeRoll = Math.atan2(-relativeMatrix[6], relativeMatrix[8]);
    } else {
      // Fallback for browsers that do not expose alpha. Convert to the matrix
      // convention expected by applyTiltRelative so the signs remain consistent.
      if (!state.fallbackEulerBaseline) {
        state.fallbackEulerBaseline = { beta, gamma };
        markSensorValid("orientation");
        return;
      }
      relativePitch = -(beta - state.fallbackEulerBaseline.beta) * Math.PI / 180;
      relativeRoll = (gamma - state.fallbackEulerBaseline.gamma) * Math.PI / 180;
    }

    applyTiltRelative(relativePitch, relativeRoll);
    markSensorValid("orientation");
  }

  function onMotion(e) {
    // v0.9: Disable Web acceleration nudge by default.
    //
    // Android v5.26 uses TYPE_LINEAR_ACCELERATION, but Android Chrome's
    // DeviceMotion acceleration values vary by device/browser and were causing
    // conflict with DeviceOrientation, resulting in jumps and reversed nudge.
    // Keep the crosshair controlled by the stabilized tilt path first. After
    // tilt feels correct, acceleration can be tuned separately with device logs.
    return;
  }

  function recenter() {
    state.baseline = null;
    state.motionBaseline = null;
    state.baselineRotationMatrix = null;
    state.fallbackEulerBaseline = null;
    state.accelOffsetX = 0;
    state.accelOffsetY = 0;
    state.lastMotionAtMs = 0;
    state.tiltBaseX = 0.5;
    state.tiltBaseY = 0.5;
    state.targetNormX = 0.5;
    state.targetNormY = 0.5;
    state.normX = 0.5;
    state.normY = 0.5;
    state.lastSensorTargetX = 0.5;
    state.lastSensorTargetY = 0.5;
    state.hasSensorTarget = false;
    setSensorStatus("", "");
  }

  function enterPerformanceHistoryIfNeeded() {
    state.pageState = "performance";
    if (!state.hasPushedPerformanceHistory && window.history && history.pushState) {
      try {
        history.pushState({ iroto: "performance" }, "", location.href);
        state.hasPushedPerformanceHistory = true;
      } catch (err) {
        // ignore
      }
    }
  }

  function returnToHomeFromPerformance() {
    if (!state.image && state.pageState === "home") return;

    if (state.playing) stopPlaying();
    if (state.recording) stopRecording();

    state.image = null;
    state.imageName = "Iroto";
    state.imageBaseName = "Iroto";
    state.pageState = "home";
    state.hasPushedPerformanceHistory = false;
    state.recordArmed = false;
    resetPerformanceState();
    updateRecordButton();

    els.fileName.textContent = t("fileNone");
    els.emptyState.classList.remove("hidden");
    els.bottomBar.classList.add("hidden");
    els.playBtn.classList.add("hidden");
    els.sensorBtn.classList.add("hidden");
    els.sensorStatus.classList.add("hidden");
    setPerformanceUiVisible(true);
    if (document.fullscreenElement && document.exitFullscreen) {
      try {
        const p = document.exitFullscreen();
        if (p && typeof p.catch === "function") p.catch(() => {});
      } catch (err) {
        // ignore
      }
    }
  }

  function enterImage(img, name, revokeUrl) {
    state.image = img;
    state.imageName = name || "Iroto";
    state.imageBaseName = sanitizeName(state.imageName);
    els.fileName.textContent = state.imageName;
    prepareSampleCanvas(img);

    els.emptyState.classList.add("hidden");
    els.bottomBar.classList.remove("hidden");
    els.playBtn.classList.remove("hidden");
    els.sensorBtn.classList.add("hidden");
    els.sensorStatus.classList.add("hidden");
    setPerformanceUiVisible(true);
    enterPerformanceHistoryIfNeeded();

    state.targetNormX = state.normX = 0.5;
    state.targetNormY = state.normY = 0.5;
    state.lastSensorTargetX = 0.5;
    state.lastSensorTargetY = 0.5;
    state.hasSensorTarget = false;
    resetPerformanceState();
    state.trail = [];
    state.recordArmed = false;
    state.recording = false;
    updateRecordButton();

    setTransportButton(false);
    showTransportTemporarily(1800);

    if (revokeUrl) {
      setTimeout(() => URL.revokeObjectURL(revokeUrl), 1000);
    }
  }

  function showPhotoSourceDialog() {
    // v2.10: photo replacement opens the system file picker directly.
    if (state.playing) stopPlaying();
    els.fileInput.click();
  }

  function displayNameForLoadedFile(file) {
    const raw = (file && file.name) ? file.name : "";
    return raw.length > 28 ? `${raw.slice(0, 18)}…${raw.slice(-7)}` : (raw || "Iroto");
  }

  function loadFile(file, source = "file") {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    const displayName = displayNameForLoadedFile(file);
    img.onload = () => enterImage(img, displayName || "Iroto", url);
    img.onerror = () => {
      URL.revokeObjectURL(url);
      alert(t("photoReadFailed"));
    };
    img.src = url;
  }

  function startBpmRepeat(delta) {
    updateBpm(delta);
    if (state.playing) showControlsTemporarily(2200);
    stopBpmRepeat();
    state.bpmRepeatTimer = setTimeout(() => {
      if (state.playing) showControlsTemporarily(2200);
      state.bpmRepeatInterval = setInterval(() => {
        updateBpm(delta);
        if (state.playing) showControlsTemporarily(2200);
      }, 140);
    }, 420);
  }

  function stopBpmRepeat() {
    if (state.bpmRepeatTimer) {
      clearTimeout(state.bpmRepeatTimer);
      state.bpmRepeatTimer = null;
    }
    if (state.bpmRepeatInterval) {
      clearInterval(state.bpmRepeatInterval);
      state.bpmRepeatInterval = null;
    }
    if (state.playing) showControlsTemporarily(1800);
  }

  function updateBpm(delta) {
    state.bpm = clamp(state.bpm + delta, 60, 160);
    els.bpmLabel.textContent = `BPM ${state.bpm}`;
  }

  function updateCompatDialog() {
    const checks = [
      [t("compatSecure"), isSecureEnoughForSensors(), t("compatSecureNote")],
      ["Web Audio", !!(window.AudioContext || window.webkitAudioContext), t("compatAudioNote")],
      ["DeviceOrientation", "DeviceOrientationEvent" in window, t("compatOrientationNote")],
      ["DeviceMotion", "DeviceMotionEvent" in window, t("compatMotionNote")],
      [t("compatIOS"), !(typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") ? null : true, t("compatIOSNote")],
      ["Canvas captureStream", !!els.canvas.captureStream, t("compatCaptureNote")],
      ["MediaRecorder", !!window.MediaRecorder, t("compatRecorderNote")],
      [t("compatMp4"), !!(window.MediaRecorder && MediaRecorder.isTypeSupported && (MediaRecorder.isTypeSupported("video/mp4") || MediaRecorder.isTypeSupported("video/mp4;codecs=avc1.42E01E,mp4a.40.2"))), t("compatMp4Note")],
      ["PWA / Service Worker", "serviceWorker" in navigator, t("compatPwaNote")]
    ];

    if (els.compatVersion) els.compatVersion.textContent = `v${IROTO_WEB_VERSION} Stable Test`;
    els.compatList.innerHTML = "";
    for (const [name, ok, note] of checks) {
      const row = document.createElement("div");
      row.className = "compat-row";
      const status = ok === true ? "OK" : ok === false ? t("compatStatusUnavailable") : t("compatStatusDepends");
      const cls = ok === true ? "compat-ok" : ok === false ? "compat-bad" : "compat-warn";
      row.innerHTML = `<div><b>${name}</b><br><small>${note}</small></div><strong class="${cls}">${status}</strong>`;
      els.compatList.appendChild(row);
    }
  }

  function wireEvents() {
    els.saveNameInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        els.saveNameInput.blur();
      }
    });
    els.saveNameInput.addEventListener("paste", e => {
      e.preventDefault();
      const text = (e.clipboardData || window.clipboardData).getData("text/plain");
      document.execCommand("insertText", false, text);
    });

    els.langSelect?.addEventListener("change", e => applyLanguage(e.target.value));
    els.choosePhotoBtn.addEventListener("click", () => els.fileInput.click());
    els.photoBtn.addEventListener("click", showPhotoSourceDialog);

    els.fileInput.addEventListener("change", e => {
      loadFile(e.target.files?.[0], "file");
      e.target.value = "";
    });

    els.playBtn.addEventListener("click", async () => {
      if (state.playing) stopPlaying();
      else await startPlaying();
    });

    els.recordBtn.addEventListener("click", () => {
      if (state.playing) return;
      state.recordArmed = !state.recordArmed;
      updateRecordButton();
    });

    els.sensorBtn.addEventListener("click", async () => {
      if (!state.sensorEnabled) await requestSensor();
      recenter();
      showControlsTemporarily(1800);
    });

    const bindBpmButton = (button, delta) => {
      button.addEventListener("pointerdown", e => {
        e.preventDefault();
        e.stopPropagation();
        startBpmRepeat(delta);
      });
      button.addEventListener("pointerup", e => { e.preventDefault(); e.stopPropagation(); stopBpmRepeat(); });
      button.addEventListener("pointercancel", e => { e.preventDefault(); e.stopPropagation(); stopBpmRepeat(); });
      button.addEventListener("pointerleave", e => { e.preventDefault(); e.stopPropagation(); stopBpmRepeat(); });
      button.addEventListener("click", e => e.preventDefault());
      button.addEventListener("contextmenu", e => e.preventDefault());
      button.addEventListener("selectstart", e => e.preventDefault());
    };
    bindBpmButton(els.bpmMinus, -2);
    bindBpmButton(els.bpmPlus, 2);

    els.saveBtn.addEventListener("click", saveRecording);
    els.discardBtn.addEventListener("click", discardRecording);

    els.helpBtn.addEventListener("click", () => {
      updateCompatDialog();
      els.compatDialog.showModal();
    });

    els.canvas.addEventListener("pointerdown", e => {
      e.preventDefault();
      // Stage touch only controls UI visibility or opens image selection.
      // It never moves the crosshair.
      if (!state.image) {
        els.fileInput.click();
        return;
      }
      toggleControlsFromStageTap();
    });

    window.addEventListener("keydown", e => {
      if (e.key === "Escape" || e.key === "Backspace") {
        if (state.image) {
          e.preventDefault();
          returnToHomeFromPerformance();
        }
      }
    });

    window.addEventListener("blur", stopBpmRepeat);

    window.addEventListener("popstate", () => {
      if (state.image || state.pageState === "performance") {
        returnToHomeFromPerformance();
      }
    });
  }

  async function registerSW() {
    // v1.4 development rollback build:
    // Disable Service Worker registration to avoid stale cached app.js/index.html
    // while testing Netlify uploads. Also unregister older Iroto service workers
    // for this origin where possible.
    if ("serviceWorker" in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const reg of registrations) {
          await reg.unregister();
        }
      } catch (err) {
        console.warn("Service worker unregister failed", err);
      }
    }

    if ("caches" in window) {
      try {
        const keys = await caches.keys();
        for (const key of keys) {
          if (String(key).includes("iroto")) await caches.delete(key);
        }
      } catch (err) {
        console.warn("Cache cleanup failed", err);
      }
    }
  }

  wireEvents();
  applyLanguage("ja");
  registerSW();
  requestAnimationFrame(draw);
})();
