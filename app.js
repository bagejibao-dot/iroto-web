(() => {
  "use strict";

  const els = {
    canvas: document.getElementById("stage"),
    langSelect: document.getElementById("langSelect"),
    topbar: document.querySelector(".topbar"),
    emptyState: document.getElementById("emptyState"),
    choosePhotoBtn: document.getElementById("choosePhotoBtn"),
    cameraBtn: document.getElementById("cameraBtn"),
    photoBtn: document.getElementById("photoBtn"),
    fileInput: document.getElementById("fileInput"),
    cameraInput: document.getElementById("cameraInput"),
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
    photoSourceDialog: document.getElementById("photoSourceDialog"),
    sourceAlbumBtn: document.getElementById("sourceAlbumBtn"),
    sourceCameraBtn: document.getElementById("sourceCameraBtn"),
    sourceCancelBtn: document.getElementById("sourceCancelBtn"),
    cameraDialog: document.getElementById("cameraDialog"),
    cameraPreview: document.getElementById("cameraPreview"),
    cameraStatus: document.getElementById("cameraStatus"),
    takePhotoBtn: document.getElementById("takePhotoBtn"),
    closeCameraBtn: document.getElementById("closeCameraBtn")
  };

  const ctx = els.canvas.getContext("2d", { alpha: false });
  const sampleCanvas = document.createElement("canvas");
  const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });

  const I18N = {
    ja: {
      htmlLang: "ja",
      fileNone: "写真未選択",
      heroText: "写真を選択または撮影し、スマートフォンを傾けて演奏します。",
      hint: "Android は Chrome、iPhone は Safari を推奨します。モーションセンサーの使用を許可してください。",
      choosePhoto: "写真を選択",
      takePhotoFromHome: "写真を撮影",
      photoTitle: "写真を選択",
      recordTitle: "録画",
      recordTimerLabel: "録画時間",
      sensorTitle: "センサーを有効化 / 再センター",
      play: "再生",
      stop: "停止",
      sourceTitle: "写真の選択",
      sourceText: "新しい演奏用の写真を選択してください。",
      sourceAlbum: "写真を選択",
      sourceCamera: "写真を撮影",
      cancel: "キャンセル",
      saveTitle: "演奏動画を保存",
      recordDone: "録画が完了しました。",
      recordFormat: "形式",
      recordSize: "サイズ",
      discardConfirm: "録画データを削除しますか？この操作は元に戻せません。",
      fileName: "ファイル名",
      discard: "削除",
      save: "保存",
      cameraTitle: "写真を撮影",
      cameraOpening: "カメラを起動しています...",
      cameraOpened: "カメラが起動しました",
      cameraOpenFailed: "カメラを起動できません。ファイル選択に切り替えます。",
      cameraNotReady: "カメラ映像の準備ができていません",
      photoCreateFailed: "写真の生成に失敗しました",
      photoReadFailed: "写真の読み込みに失敗しました。",
      takePhoto: "撮影",
      compatTitle: "互換性チェック",
      compatHint: "センサー機能は通常 HTTPS が必要です。録画形式はブラウザに応じて MP4 または WebM が自動選択されます。",
      close: "閉じる",
      sensorLabel: "センサー",
      compatStatusUnavailable: "不可",
      compatStatusDepends: "環境依存",
      compatSecure: "安全なコンテキスト / HTTPS",
      compatSecureNote: "Android Chrome でセンサーを使うには通常 HTTPS が必要です",
      compatAudioNote: "音を合成するために使用します",
      compatOrientationNote: "傾き操作に使用します",
      compatMotionNote: "加速度 fallback に使用します",
      compatIOS: "iOS センサー権限",
      compatIOSNote: "iOS ではボタン操作による許可が必要です",
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
      heroText: "选择或拍摄一张照片，倾斜手机来演奏。",
      hint: "Android 建议使用 Chrome，iPhone 建议使用 Safari，并允许运动传感器权限。",
      choosePhoto: "选择照片",
      takePhotoFromHome: "拍摄照片",
      photoTitle: "选择照片",
      recordTitle: "录制",
      recordTimerLabel: "录制时间",
      sensorTitle: "启用 / 回正传感器",
      play: "播放",
      stop: "停止",
      sourceTitle: "照片来源",
      sourceText: "请选择新的演奏照片。",
      sourceAlbum: "选择照片",
      sourceCamera: "拍摄照片",
      cancel: "取消",
      saveTitle: "保存演奏视频",
      recordDone: "录制完成。",
      recordFormat: "格式",
      recordSize: "大小",
      discardConfirm: "要删除这段录制吗？此操作无法撤销。",
      fileName: "文件名",
      discard: "删除",
      save: "保存",
      cameraTitle: "拍摄照片",
      cameraOpening: "正在打开摄像头...",
      cameraOpened: "摄像头已打开",
      cameraOpenFailed: "无法打开摄像头。将改用文件选择。",
      cameraNotReady: "摄像头画面尚未准备好",
      photoCreateFailed: "照片生成失败",
      photoReadFailed: "照片读取失败。",
      takePhoto: "拍照",
      compatTitle: "兼容性状态",
      compatHint: "传感器功能通常需要 HTTPS。录制格式会根据浏览器自动选择 MP4 或 WebM。",
      close: "关闭",
      sensorLabel: "传感器",
      compatStatusUnavailable: "不可用",
      compatStatusDepends: "视平台而定",
      compatSecure: "安全上下文 / HTTPS",
      compatSecureNote: "Android Chrome 传感器通常需要 HTTPS",
      compatAudioNote: "用于合成声音",
      compatOrientationNote: "用于倾斜控制",
      compatMotionNote: "用于加速度 fallback",
      compatIOS: "iOS 传感器权限",
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
      heroText: "Select or take a photo, then tilt your phone to perform.",
      hint: "Chrome is recommended on Android, Safari on iPhone. Please allow motion sensor access.",
      choosePhoto: "Choose Photo",
      takePhotoFromHome: "Take Photo",
      photoTitle: "Choose Photo",
      recordTitle: "Record",
      recordTimerLabel: "Recording time",
      sensorTitle: "Enable / Recenter Sensor",
      play: "Play",
      stop: "Stop",
      sourceTitle: "Photo Source",
      sourceText: "Choose a new photo for performance.",
      sourceAlbum: "Choose Photo",
      sourceCamera: "Take Photo",
      cancel: "Cancel",
      saveTitle: "Save Performance Video",
      recordDone: "Recording completed.",
      recordFormat: "Format",
      recordSize: "Size",
      discardConfirm: "Delete this recording? This cannot be undone.",
      fileName: "File name",
      discard: "Delete",
      save: "Save",
      cameraTitle: "Take Photo",
      cameraOpening: "Opening camera...",
      cameraOpened: "Camera is ready",
      cameraOpenFailed: "Could not open the camera. Switching to file picker.",
      cameraNotReady: "Camera preview is not ready yet",
      photoCreateFailed: "Could not create photo",
      photoReadFailed: "Could not load the photo.",
      takePhoto: "Capture",
      compatTitle: "Compatibility Check",
      compatHint: "Sensor features usually require HTTPS. Recording format is selected automatically as MP4 or WebM depending on the browser.",
      close: "Close",
      sensorLabel: "Sensor",
      compatStatusUnavailable: "Unavailable",
      compatStatusDepends: "Depends",
      compatSecure: "Secure Context / HTTPS",
      compatSecureNote: "Android Chrome usually requires HTTPS for motion sensors",
      compatAudioNote: "Used for sound synthesis",
      compatOrientationNote: "Used for tilt control",
      compatMotionNote: "Used as acceleration fallback",
      compatIOS: "iOS Sensor Permission",
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

  function applyLanguage(lang) {
    state.currentLang = I18N[lang] ? lang : "ja";
    if (els.langSelect) els.langSelect.value = state.currentLang;
    document.documentElement.lang = t("htmlLang");

    if (!state.image) els.fileName.textContent = t("fileNone");
    setText("#emptyState p:not(.hint)", t("heroText"));
    setText("#emptyState .hint", t("hint"));
    els.choosePhotoBtn.textContent = t("choosePhoto");
    els.cameraBtn.textContent = t("takePhotoFromHome");
    els.photoBtn.title = t("photoTitle");
    els.recordBtn.title = t("recordTitle");
    if (els.recordTimer) els.recordTimer.title = t("recordTimerLabel");
    els.sensorBtn.title = t("sensorTitle");
    els.sensorStatus.textContent = t("sensorLabel");
    els.playBtn.setAttribute("aria-label", state.playing ? t("stop") : t("play"));
    els.helpBtn.setAttribute("aria-label", t("compatTitle"));

    setText("#photoSourceDialog h2", t("sourceTitle"));
    setText("#photoSourceDialog p", t("sourceText"));
    els.sourceAlbumBtn.textContent = t("sourceAlbum");
    els.sourceCameraBtn.textContent = t("sourceCamera");
    els.sourceCancelBtn.textContent = t("cancel");

    setText("#saveDialog h2", t("saveTitle"));
    if (els.saveDialog?.open && state.recordedBlob) updateRecordInfo();
    else els.recordInfo.textContent = t("recordDone");
    const inputLabel = document.querySelector("#saveDialog .input-label");
    if (inputLabel && inputLabel.firstChild) inputLabel.firstChild.textContent = t("fileName") + "\n          ";
    els.discardBtn.textContent = t("discard");
    els.saveBtn.textContent = t("save");

    setText("#cameraDialog h2", t("cameraTitle"));
    if (!els.cameraStatus.textContent || ["正在打开摄像头...", "カメラを起動しています...", "Opening camera..."].includes(els.cameraStatus.textContent)) {
      els.cameraStatus.textContent = t("cameraOpening");
    }
    els.closeCameraBtn.textContent = t("cancel");
    els.takePhotoBtn.textContent = t("takePhoto");

    setText("#compatDialog h2", t("compatTitle"));
    setText("#compatDialog .hint", t("compatHint"));
    const compatClose = document.querySelector("#compatDialog .primary-btn");
    if (compatClose) compatClose.textContent = t("close");

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
    recorder: null,
    recordedChunks: [],
    recordedBlob: null,
    recordedMime: "",
    recordedExt: "webm",
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

    // v2.2: match the app-like full-screen photo behavior.
    // Use cover instead of contain so the display and recorded video fill the
    // canvas without black bars. The crop is centered and the aspect ratio is
    // preserved.
    const scale = Math.max(cw / iw, ch / ih);
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
    if (!state.image || state.trail.length < 2) return;
    const now = performance.now();
    const r = state.imageRect;
    const baseRadius = cursorRadius();

    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let i = 1; i < state.trail.length; i++) {
      const a = state.trail[i - 1];
      const b = state.trail[i];
      const age = now - b.t;
      if (age < 0 || age > TRAIL_DURATION_MS) continue;
      const life = 1 - age / TRAIL_DURATION_MS;

      const x1 = r.x + a.x * r.w;
      const y1 = r.y + a.y * r.h;
      const x2 = r.x + b.x * r.w;
      const y2 = r.y + b.y * r.h;

      ctx.strokeStyle = `rgba(120,225,255,${0.13 * life})`;
      ctx.lineWidth = Math.max(14, baseRadius * (1.05 + 0.72 * life));
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      ctx.strokeStyle = `rgba(255,255,255,${0.58 * life})`;
      ctx.lineWidth = Math.max(7, baseRadius * (0.52 + 0.40 * life));
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    state.trail = state.trail.filter(p => now - p.t <= TRAIL_DURATION_MS);
  }

  function cursorRadius() {
    // v1.5: restore the smaller cursor size after v1.4 rollback.
    // Keep the compact app-like visual from v1.1 / v1.2.
    const dpr = Math.max(1, els.canvas.width / Math.max(1, window.innerWidth));
    return Math.max(20 * dpr, Math.min(state.imageRect.w, state.imageRect.h) * 0.036);
  }

  function drawCursor() {
    if (!state.image || !state.playing) return;
    const r = state.imageRect;
    const x = r.x + state.normX * r.w;
    const y = r.y + state.normY * r.h;
    const radius = cursorRadius() * 0.98;

    ctx.save();
    ctx.lineCap = "round";

    ctx.strokeStyle = "rgba(255,255,255,0.84)";
    ctx.lineWidth = Math.max(1.2, els.canvas.width / window.innerWidth * 1.2);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    // v1.5: restore the thicker internal color recognition ring, closer to
    // the Android app's visible sampling layer.
    ctx.strokeStyle = state.sampleColor;
    ctx.globalAlpha = 0.95;
    ctx.lineWidth = Math.max(6.8, radius * 0.30);
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.78, 0, Math.PI * 2);
    ctx.stroke();

    const label = state.currentNoteLabel || "Rest";
    ctx.globalAlpha = 1;
    ctx.font = `800 ${label === "Rest" ? radius * 0.44 : radius * 0.56}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "rgba(0,0,0,0.82)";
    ctx.shadowBlur = radius * 0.16;
    ctx.shadowOffsetY = radius * 0.05;
    ctx.fillStyle = label === "Rest" ? "rgba(245,248,252,0.92)" : "#fff";
    ctx.fillText(label, x, y - radius * 0.03);

    ctx.restore();
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
    // Browsers only allow fullscreen from user gestures. This mirrors Android's
    // always-immersive app feel as much as the web platform allows.
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
    // Stay fullscreen after playback, matching the Android app's immersive state.
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

  function startRecording() {
    if (!els.canvas.captureStream || !window.MediaRecorder || !audio.recorderDest) {
      alert(t("recordingUnsupported"));
      state.recordArmed = false;
      updateRecordButton();
      return;
    }

    const stream = els.canvas.captureStream(60);
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

    state.recorder.onstop = () => {
      state.recordedBlob = new Blob(state.recordedChunks, { type: state.recordedMime });
      showSaveDialog();
    };

    state.recorder.start(250);
    state.recording = true;
    state.recordArmed = false;
    startRecordingTimer();
    updateRecordButton();
  }

  function stopRecording() {
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
    if (state.playing) stopPlaying();
    if (els.photoSourceDialog && typeof els.photoSourceDialog.showModal === "function") {
      els.photoSourceDialog.showModal();
    } else {
      els.fileInput.click();
    }
  }

  function loadFile(file) {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => enterImage(img, file.name || "Iroto", url);
    img.onerror = () => {
      URL.revokeObjectURL(url);
      alert(t("photoReadFailed"));
    };
    img.src = url;
  }

  function loadBlobAsImage(blob, name) {
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => enterImage(img, name || "Camera_Photo.jpg", url);
    img.onerror = () => {
      URL.revokeObjectURL(url);
      alert(t("photoReadFailed"));
    };
    img.src = url;
  }

  async function openCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      // Desktop browsers often ignore capture=environment and open a file picker.
      // Use this only as a fallback when real camera API is unavailable.
      els.cameraInput.click();
      return;
    }

    try {
      stopCameraStream();
      els.cameraStatus.textContent = t("cameraOpening");
      els.cameraPreview.srcObject = null;
      els.cameraDialog.showModal();

      const constraints = {
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: false
      };
      state.cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
      els.cameraPreview.srcObject = state.cameraStream;
      await els.cameraPreview.play();
      els.cameraStatus.textContent = t("cameraOpened");
    } catch (err) {
      console.warn(err);
      stopCameraStream();
      els.cameraStatus.textContent = t("cameraOpenFailed");
      setTimeout(() => {
        if (els.cameraDialog.open) els.cameraDialog.close();
        els.cameraInput.click();
      }, 700);
    }
  }

  function stopCameraStream() {
    if (state.cameraStream) {
      for (const track of state.cameraStream.getTracks()) track.stop();
      state.cameraStream = null;
    }
    if (els.cameraPreview) els.cameraPreview.srcObject = null;
  }

  function captureCameraPhoto() {
    const video = els.cameraPreview;
    const vw = video.videoWidth || 1280;
    const vh = video.videoHeight || 720;
    if (!vw || !vh) {
      els.cameraStatus.textContent = t("cameraNotReady");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = vw;
    canvas.height = vh;
    const c = canvas.getContext("2d");
    c.drawImage(video, 0, 0, vw, vh);

    canvas.toBlob(blob => {
      if (!blob) {
        els.cameraStatus.textContent = t("photoCreateFailed");
        return;
      }
      const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      loadBlobAsImage(blob, `Iroto_${stamp}.jpg`);
      stopCameraStream();
      els.cameraDialog.close();
    }, "image/jpeg", 0.95);
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
      [t("compatCamera"), !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia), t("compatCameraNote")],
      ["Canvas captureStream", !!els.canvas.captureStream, t("compatCaptureNote")],
      ["MediaRecorder", !!window.MediaRecorder, t("compatRecorderNote")],
      [t("compatMp4"), !!(window.MediaRecorder && MediaRecorder.isTypeSupported && (MediaRecorder.isTypeSupported("video/mp4") || MediaRecorder.isTypeSupported("video/mp4;codecs=avc1.42E01E,mp4a.40.2"))), t("compatMp4Note")],
      ["PWA / Service Worker", "serviceWorker" in navigator, t("compatPwaNote")]
    ];

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
    els.cameraBtn.addEventListener("click", openCamera);
    els.sourceAlbumBtn.addEventListener("click", () => { els.photoSourceDialog.close(); els.fileInput.click(); });
    els.sourceCameraBtn.addEventListener("click", () => { els.photoSourceDialog.close(); openCamera(); });
    els.sourceCancelBtn.addEventListener("click", () => els.photoSourceDialog.close());

    els.fileInput.addEventListener("change", e => loadFile(e.target.files?.[0]));
    els.cameraInput.addEventListener("change", e => loadFile(e.target.files?.[0]));
    els.takePhotoBtn.addEventListener("click", captureCameraPhoto);
    els.closeCameraBtn.addEventListener("click", () => { stopCameraStream(); els.cameraDialog.close(); });
    els.cameraDialog.addEventListener("close", stopCameraStream);

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
      // Android v5.26 stage touch only reveals controls or opens image selection.
      // It never moves the crosshair.
      if (!state.image) {
        els.fileInput.click();
        return;
      }
      if (state.playing) showControlsTemporarily(1800);
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
