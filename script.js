(() => {
  "use strict";

  const {
    CONTENT_TYPE_GROUPS,
    DEFAULT_CONTENT_TYPE,
    normalizeContentType,
    buildContentTypeGuidance,
    getExampleContent,
  } = globalThis.HealthPromptContentTypes;

  const {
    ASPECT_RATIO_GROUPS,
    DEFAULT_ASPECT_RATIO,
    normalizeAspectRatio,
    getAspectRatioCompatibility,
    buildAspectRatioGuidance,
  } = globalThis.HealthPromptAspectRatios;

  const {
    ISLAMIC_ART_STYLE_GROUP,
    buildIslamicArtStyleGuidance,
  } = globalThis.HealthPromptIslamicArtStyles;

  const STYLE_TAGS = [
    "Premium Thai HEALTH Cover style", "Cinematic Photography", "Ultra Photorealistic",
    "8K", "300 DPI", "Luxurious, elegant, and formal",
    "Balanced composition, sharp focus, realistic lighting and shadows",
    "Accurate and legible Thai text", "No additional taglines or extra text",
    "Do not alter the face", "No distorted uniforms", "No watermarks",
    "No duplicate people", "No deformed hands or fingers", "Professional Print Quality",
    "Luxury Government Report", "Realistic Skin Texture", "Realistic Fabric",
    "Metallic Gold Reflection", "Sharp Focus", "High-end Editorial Design",
  ];

  const LS_KEY = "healthPromptStudio.state.v1";
  const THEME_KEY = "healthPromptStudio.theme";

  const els = {
    colorPaletteStyle: document.getElementById("colorPaletteStyle"),
    content: document.getElementById("contentInput"),
    clearContentBtn: document.getElementById("clearContentBtn"),
    useExampleContentBtn: document.getElementById("useExampleContentBtn"),
    attachFileBtn: document.getElementById("attachFileBtn"),
    attachFileInput: document.getElementById("attachFileInput"),
    attachFileStatus: document.getElementById("attachFileStatus"),
    attachFileReport: document.getElementById("attachFileReport"),
    department: document.getElementById("department"),
    contentType: document.getElementById("contentType"),
    aspectRatio: document.getElementById("aspectRatio"),
    aspectRatioHint: document.getElementById("aspectRatioHint"),
    backgroundPattern: document.getElementById("backgroundPattern"),
    artStyle: document.getElementById("artStyle"),
    includePeople: document.getElementById("includePeople"),
    includeMetallic: document.getElementById("includeMetallic"),
    previewType: document.getElementById("previewType"),
    previewTitle: document.getElementById("previewTitle"),
    previewRatio: document.getElementById("previewRatio"),
    output: document.getElementById("promptOutput"),
    copyBtn: document.getElementById("copyBtn"),
    copyStatus: document.getElementById("copyStatus"),
    exportJsonBtn: document.getElementById("exportJsonBtn"),
    footerExportJson: document.getElementById("footerExportJson"),
    styleTags: document.getElementById("styleTags"),
    themeBtn: document.getElementById("themeBtn"),
    nav: document.getElementById("nav"),
  };

  let state = {
    colorPaletteStyle: els.colorPaletteStyle.value,
    content: "",
    contentType: DEFAULT_CONTENT_TYPE,
    aspectRatio: DEFAULT_ASPECT_RATIO,
    backgroundPattern: els.backgroundPattern.value,
    artStyle: els.artStyle.value,
    department: "",
    includePeople: true,
    includeMetallic: true,
  };

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      state = { ...state, ...saved };
    } catch (_) { /* ignore corrupt storage */ }
    state.contentType = normalizeContentType(state.contentType);
    state.aspectRatio = normalizeAspectRatio(state.aspectRatio);
  }

  function saveState() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (_) { /* storage unavailable */ }
  }

  function renderContentTypeOptions() {
    els.contentType.innerHTML = "";
    CONTENT_TYPE_GROUPS.forEach((group) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = group.label;
      group.types.forEach((type) => {
        const option = document.createElement("option");
        option.value = type.value;
        option.textContent = type.label;
        optgroup.appendChild(option);
      });
      els.contentType.appendChild(optgroup);
    });
  }

  function renderAspectRatioOptions() {
    els.aspectRatio.innerHTML = "";
    ASPECT_RATIO_GROUPS.forEach((group) => {
      const optgroup = document.createElement("optgroup");
      optgroup.label = group.label;
      group.ratios.forEach((ratio) => {
        const option = document.createElement("option");
        option.value = ratio.value;
        option.textContent = ratio.label;
        optgroup.appendChild(option);
      });
      els.aspectRatio.appendChild(optgroup);
    });
  }

  function renderIslamicArtStyleOptions() {
    const optgroup = document.createElement("optgroup");
    optgroup.label = ISLAMIC_ART_STYLE_GROUP.label;
    ISLAMIC_ART_STYLE_GROUP.styles.forEach((style) => {
      const option = document.createElement("option");
      option.value = style.value;
      option.textContent = style.label;
      optgroup.appendChild(option);
    });
    els.artStyle.appendChild(optgroup);
  }

  function renderAspectRatioHint() {
    const compatibility = getAspectRatioCompatibility(state.contentType, state.aspectRatio);
    els.aspectRatioHint.textContent = compatibility.message;
    els.aspectRatioHint.dataset.status = compatibility.isRecommended ? "recommended" : "warning";
  }

  function renderStyleTags() {
    els.styleTags.innerHTML = STYLE_TAGS
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");
  }

  function renderPreview() {
    els.previewType.textContent = state.contentType.toUpperCase();
    els.previewTitle.textContent = state.content.trim() || "หัวข้อของคุณจะแสดงที่นี่";
    els.previewRatio.textContent = state.aspectRatio;
  }

  function buildPrompt() {
    const typeGuidance = buildContentTypeGuidance(state.contentType);
    const ratioGuidance = buildAspectRatioGuidance(state.aspectRatio);
    const islamicStyleGuidance = buildIslamicArtStyleGuidance(state.artStyle, state.includePeople) || {
      configuration: "",
      peopleDirection: state.includePeople
        ? "Include authentic Thai healthcare professionals or public-service staff: natural poses, anatomically correct hands, realistic skin texture, inclusive human-centered composition."
        : "No human figures — focus entirely on typography, iconography, and abstract/environmental elements.",
      visualDirection: "",
      constraints: "",
    };
    const metallicLine = state.includeMetallic
      ? `Metallic Gold/Silver accents may be used where appropriate, applied to borders, ribbons, and decorative details only.`
      : `No metallic effects — keep all surfaces matte and flat.`;
    const peopleLine = islamicStyleGuidance.peopleDirection;

    return `##MASTER PROMPT — PREMIUM VISUAL DESIGN V3.0##

สร้างภาพ
[01] CORE CONFIGURATION
COLOR_PALETTE_STYLE = "${state.colorPaletteStyle || "Not set — choose a cohesive style appropriate to CONTENT"}"
CONTENT = "${state.content.trim()}"
CONTENT_TYPE = "${state.contentType}"
ASPECT_RATIO = "${state.aspectRatio}"
${ratioGuidance.configuration}
BACKGROUND_PATTERN = "${state.backgroundPattern || "None — flat background"}"
DEPARTMENT = "${state.department || "ไม่ระบุกลุ่มงาน"}"
ART_STYLE = "${state.artStyle || "Not set — default to photorealistic editorial rendering"}"
${islamicStyleGuidance.configuration}
${typeGuidance.configuration}

[02] DESIGN CONCEPT
Create a world-class premium Thai educational and government visual composition. Combine Premium Thai Educational Report, Luxury Academic Cover, Elegant Government Report, and high-end editorial design. The result must be sophisticated, modern, clean, visually impressive, credible, and suitable for professional healthcare communication.

[03] GLOBAL COLOR SYSTEM
${state.colorPaletteStyle ? `Follow the COLOR_PALETTE_STYLE defined in [01]: ${state.colorPaletteStyle}.` : "Choose a single cohesive color scheme appropriate to CONTENT and CONTENT_TYPE."} Apply it consistently to backgrounds, typography, lighting, borders, ribbons, decorative details, gradients, icons, illustrations, data graphics, and environmental accents. Derive lighter, darker, softer, translucent, and complementary tonal variations from that scheme for legibility and depth. Do not mix in unrelated or clashing color themes. Maintain excellent readability and accessibility. ${metallicLine}
Color system best practices: use exactly one primary color for brand identity; define a clear accent/secondary color reserved for CTAs, highlights, or alerts; keep the total combined palette to 3–5 colors; ensure strong background-to-text contrast for accessibility; keep usage consistent as a reusable design system.

[04] COMPOSITION & VISUAL HIERARCHY
${typeGuidance.composition}
Establish a striking primary focal point, elegant headline area, well-balanced secondary information, clean supporting details, generous negative space, disciplined grid alignment, and clear visual hierarchy. Use premium typography with precise Thai character shaping, correct vowels, tone marks, spelling, and line breaks. Do not invent names, dates, numbers, institutions, statistics, medical claims, or logos.
${state.backgroundPattern ? `Background treatment: Apply ${state.backgroundPattern} as a subtle decorative background layer, rendered in tonal variations of the chosen color scheme only, kept low-contrast so it never competes with foreground text or subjects.` : "Background treatment: Keep the background flat and clean with no decorative pattern."}

[05] ADAPTIVE VISUAL DIRECTION
Deliverable-specific direction: ${typeGuidance.visualDirection}
${islamicStyleGuidance.visualDirection}
Select subject-appropriate imagery and illustrations based on CONTENT. ${peopleLine} For infographics and dashboards, prioritize data legibility and clean chart structures. Use sharp typography zones, cinematic lighting, sophisticated depth, and cohesive composition.
${state.artStyle ? `Render characters and subjects in the ART_STYLE defined in [01]: "${state.artStyle}". Keep this rendering style consistent across every figure, prop, and illustrated element in the frame.` : "No specific ART_STYLE selected — default to photorealistic, editorial-quality rendering."}

[06] QUALITY & OUTPUT
Ultra-realistic, masterpiece, highly detailed, cinematic lighting, professional magazine quality, high-end editorial finishing, production-grade visual presentation. ${ratioGuidance.output}
Style standard: ${STYLE_TAGS.join(" / ")}.
Dimensional rendering mandate: Nothing in the frame may read as flat, single-tone, or flat-vector. Every zone — icons, illustrations, lines, borders, and photographic elements — must use realistic, varied color tones with visible dimensional lighting, shadow, and material richness, consistent with a premium photorealistic infographic treatment.

[07] NEGATIVE CONSTRAINTS
Deliverable-specific constraints: ${typeGuidance.constraints}
${islamicStyleGuidance.constraints}
No mismatched color palettes, accidental default blue-gold decoration unless specified in [01], clutter, poor contrast, illegible text, incorrect Thai spelling, distorted anatomy, duplicate people, extra fingers, fake charts, fabricated values, watermark, random lettering, or uncontrolled gradients.

NEGATIVE PROMPT: Distorted Thai characters, misspelled words, hallucinated data, deformed maps, swapped district boundaries, unreadable tables, blurred numbers, disproportionate logos, cluttered layout, messy composition, low resolution, flat design, cartoonish style, bad anatomy, distorted doctor, unreadable text, oversaturated colors, cheap template aesthetics, random English gibberish, watermarks, extra logos, redundant graphic elements, grainy texture, artifacts.

[08] THAI TEXT ACCURACY & QUALITY STANDARD
1. 100% Thai Text Accuracy: All Thai text must strictly follow the official Thai spelling, grammar, orthography, and dictionary standards established by the Royal Society of Thailand.
2. Exact Original Text Preservation: Preserve all original words, sentences, numbers, punctuation marks, and formatting exactly as provided. Do not modify, rewrite, add, remove, rearrange, embellish, or fabricate any text.
3. Correct Thai Character Structure: Ensure that every Thai consonant, vowel, tone mark, diacritic, and punctuation mark is accurately formed, correctly positioned, and properly aligned according to Thai writing standards.
4. Zero Text Distortion: No misspelled words, malformed characters, missing letters, duplicated characters, overlapping text, misplaced vowels, incorrect tone marks, or distorted typography.
5. Ultra-Sharp Typography: All text must be exceptionally clear, highly legible, precisely rendered, and perfectly defined, with crisp, clean character edges and professional typography.
6. No Blur or Haze: All images and text must remain completely sharp and clear. No blurring, haziness, softness, ghosting, motion blur, or unwanted diffusion.
7. High-Resolution Image Quality: Produce high-resolution, ultra-detailed, tack-sharp visuals with clean edges, accurate proportions, and professional print-ready quality.
8. Zero Visual Artifacts: No pixelation, digital noise, compression artifacts, duplicated elements, warped objects, distorted letters, or unintended visual imperfections.
9. No Text Embellishment: Do not apply decorative effects, excessive glow, shadows, reflections, gradients, or artistic filters that reduce text clarity, readability, or accuracy.
10. Strict Original Content Integrity: Maintain the exact meaning, spelling, sequence, structure, and authenticity of all original content without alteration or creative interpretation.
11. Professional Layout and Alignment: Maintain consistent spacing, precise alignment, balanced typography, proper line breaks, and clean text placement without clipping or overlapping elements.
12. Maximum Readability Priority: Text accuracy, character integrity, image sharpness, and readability must always take precedence over decorative effects, artistic styling, and visual enhancements.
13. Final Quality Verification: Carefully inspect every word, character, vowel, tone mark, number, punctuation mark, and image detail before final output. Correct any detected error without modifying the intended original content.
14. Zero-Tolerance Quality Standard: The final output must contain no detectable spelling errors, malformed Thai characters, missing text, blurred typography, image distortion, or unauthorized content modifications.

FINAL RULE: All visual color decisions must stay consistent with the single color scheme established in [03]. Never introduce a clashing or unrelated color theme elsewhere in the prompt.

CONTENT TO RENDER (from [01]): "${state.content.trim()}"`;
  }

  function renderPrompt() {
    els.output.value = buildPrompt();
  }

  function exportJson() {
    download(`health-prompt-${Date.now()}.json`, JSON.stringify(state, null, 2), "application/json");
  }

  function download(filename, text, mime) {
    const blob = new Blob([text], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(els.output.value);
      els.copyStatus.textContent = "คัดลอกแล้ว ✓";
    } catch (_) {
      els.output.select();
      document.execCommand("copy");
      els.copyStatus.textContent = "คัดลอกแล้ว ✓";
    }
    setTimeout(() => { els.copyStatus.textContent = ""; }, 2200);
  }

  function applyTheme(theme) {
    if (theme === "light" || theme === "dark") {
      document.documentElement.setAttribute("data-theme", theme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const use = els.themeBtn.querySelector("use");
    if (use) use.setAttribute("href", currentIsDark() ? "#i-sun" : "#i-moon");
  }

  function currentIsDark() {
    const explicit = document.documentElement.getAttribute("data-theme");
    if (explicit) return explicit === "dark";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function toggleTheme() {
    const next = currentIsDark() ? "light" : "dark";
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch (_) { /* storage unavailable */ }
  }

  function readFileAsText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("อ่านไฟล์ไม่สำเร็จ"));
      reader.readAsText(file, "utf-8");
    });
  }

  function readFileAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(reader.error || new Error("อ่านไฟล์ไม่สำเร็จ"));
      reader.readAsArrayBuffer(file);
    });
  }

  function extractDocTextHeuristic(buffer) {
    const bytes = new Uint8Array(buffer);
    let text = "";
    for (let i = 0; i < bytes.length - 1; i += 2) {
      const code = bytes[i] | (bytes[i + 1] << 8);
      const isAscii = code >= 0x20 && code <= 0x7e;
      const isThai = code >= 0x0e00 && code <= 0x0e7f;
      const isBreak = code === 0x0a || code === 0x0d || code === 0x09;
      if (isAscii || isThai || isBreak) {
        text += String.fromCharCode(code);
      } else if (code !== 0x0000) {
        text += " ";
      }
    }
    return text
      .replace(/[ \t]{2,}/g, " ")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  async function extractTextFromFile(file) {
    const name = file.name.toLowerCase();

    if (name.endsWith(".txt") || name.endsWith(".md")) {
      return { text: await readFileAsText(file), method: "อ่านข้อความโดยตรง" };
    }

    if (name.endsWith(".docx")) {
      if (!window.mammoth) throw new Error("ไลบรารีอ่านไฟล์ Word ยังโหลดไม่เสร็จ ลองใหม่อีกครั้ง");
      const buffer = await readFileAsArrayBuffer(file);
      const result = await window.mammoth.extractRawText({ arrayBuffer: buffer });
      return { text: result.value, method: "แยกข้อความด้วย mammoth.js" };
    }

    if (name.endsWith(".doc")) {
      const buffer = await readFileAsArrayBuffer(file);
      const text = extractDocTextHeuristic(buffer);
      return {
        text,
        method: "ดึงข้อความแบบเบื้องต้น (UTF-16 scrape)",
        note: "ไฟล์ .doc เก่าดึงข้อความแบบเบื้องต้น อาจมีตัวอักษรแปลกปนมา แนะนำแปลงเป็น .docx เพื่อความแม่นยำ",
      };
    }

    if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
      if (!window.XLSX) throw new Error("ไลบรารีอ่านไฟล์ Excel ยังโหลดไม่เสร็จ ลองใหม่อีกครั้ง");
      const buffer = await readFileAsArrayBuffer(file);
      const workbook = window.XLSX.read(buffer, { type: "array" });
      const text = workbook.SheetNames
        .map((sheetName) => `# ${sheetName}\n${window.XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName])}`)
        .join("\n\n");
      return { text, method: "แปลงชีทเป็นข้อความด้วย SheetJS", sheetNames: workbook.SheetNames };
    }

    throw new Error("รองรับเฉพาะไฟล์ .txt, .md, .docx, .doc, .xlsx, .xls");
  }

  function renderAttachFileReport(file, extracted, cleanedText) {
    const wordCount = (cleanedText.match(/\S+/g) || []).length;
    const lineCount = cleanedText ? cleanedText.split(/\r\n|\r|\n/).length : 0;
    const preview = cleanedText.slice(0, 220);
    const sheetRow = extracted.sheetNames
      ? `<div><dt>ชีท</dt><dd>${extracted.sheetNames.length} ชีท — ${extracted.sheetNames.join(", ")}</dd></div>`
      : "";

    els.attachFileReport.innerHTML = `
      <div class="ar-head">
        <span>รายงานการประมวลผลไฟล์</span>
        <span class="ar-badge deleted">ลบไฟล์ต้นฉบับแล้ว</span>
      </div>
      <dl>
        <dt>ชื่อไฟล์</dt><dd>${file.name}</dd>
        <dt>ขนาด</dt><dd>${(file.size / 1024).toLocaleString("th-TH", { maximumFractionDigits: 1 })} KB</dd>
        <dt>วิธีประมวลผล</dt><dd>${extracted.method || "-"}</dd>
        <dt>จำนวนตัวอักษร</dt><dd>${cleanedText.length.toLocaleString("th-TH")}</dd>
        <dt>จำนวนคำ</dt><dd>${wordCount.toLocaleString("th-TH")}</dd>
        <dt>จำนวนบรรทัด</dt><dd>${lineCount.toLocaleString("th-TH")}</dd>
        ${sheetRow}
      </dl>
      ${extracted.note ? `<p class="ar-note">⚠ ${extracted.note}</p>` : ""}
      <pre class="ar-preview">${preview.replace(/[<>&]/g, (ch) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[ch]))}${cleanedText.length > preview.length ? "…" : ""}</pre>
    `;
    els.attachFileReport.hidden = false;
  }

  function bindEvents() {
    els.colorPaletteStyle.addEventListener("change", (e) => {
      state.colorPaletteStyle = e.target.value;
      renderPrompt();
      saveState();
    });

    els.content.addEventListener("input", (e) => {
      state.content = e.target.value;
      renderPreview();
      renderPrompt();
      saveState();
    });
    els.clearContentBtn.addEventListener("click", () => {
      state.content = "";
      els.content.value = "";
      els.content.focus();
      els.attachFileStatus.textContent = "";
      els.attachFileReport.hidden = true;
      els.attachFileReport.innerHTML = "";
      renderPreview();
      renderPrompt();
      saveState();
    });
    els.useExampleContentBtn.addEventListener("click", () => {
      const example = getExampleContent(state.contentType);
      if (!example) return;
      state.content = example;
      els.content.value = example;
      els.content.focus();
      els.attachFileStatus.textContent = "";
      els.attachFileReport.hidden = true;
      els.attachFileReport.innerHTML = "";
      renderPreview();
      renderPrompt();
      saveState();
    });
    els.attachFileBtn.addEventListener("click", () => {
      els.attachFileInput.click();
    });
    els.attachFileInput.addEventListener("change", async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      els.attachFileReport.hidden = true;
      els.attachFileStatus.textContent = `กำลังวิเคราะห์ไฟล์ "${file.name}"…`;
      try {
        const extracted = await extractTextFromFile(file);
        const cleaned = extracted.text.trim();
        state.content = cleaned;
        els.content.value = cleaned;
        els.attachFileStatus.textContent = `ประมวลผลไฟล์ "${file.name}" เสร็จสิ้น — อ่านในเบราว์เซอร์เท่านั้น ไม่มีการอัปโหลดขึ้นเซิร์ฟเวอร์`;
        renderAttachFileReport(file, extracted, cleaned);
        renderPreview();
        renderPrompt();
        saveState();
      } catch (err) {
        els.attachFileStatus.textContent = `อ่านไฟล์ "${file.name}" ไม่สำเร็จ: ${err && err.message ? err.message : "ไม่รองรับไฟล์นี้"}`;
      } finally {
        e.target.value = "";
      }
    });
    els.contentType.addEventListener("change", (e) => {
      state.contentType = e.target.value;
      renderAspectRatioHint();
      renderPreview();
      renderPrompt();
      saveState();
    });
    els.aspectRatio.addEventListener("change", (e) => {
      state.aspectRatio = e.target.value;
      renderAspectRatioHint();
      renderPreview();
      renderPrompt();
      saveState();
    });
    els.backgroundPattern.addEventListener("change", (e) => {
      state.backgroundPattern = e.target.value;
      renderPrompt();
      saveState();
    });
    els.artStyle.addEventListener("change", (e) => {
      state.artStyle = e.target.value;
      renderPrompt();
      saveState();
    });
    els.department.addEventListener("change", (e) => {
      const oldDept = state.department;
      const newDept = e.target.value;
      const oldPrefix = oldDept ? `${oldDept} — ` : "";
      let content = state.content || "";
      if (oldPrefix && content.startsWith(oldPrefix)) {
        content = content.slice(oldPrefix.length);
      }
      if (newDept) {
        content = `${newDept} — ${content}`;
      }
      state.department = newDept;
      state.content = content;
      els.content.value = content;
      renderPreview();
      renderPrompt();
      saveState();
    });
    els.includePeople.addEventListener("change", (e) => {
      state.includePeople = e.target.checked;
      renderPrompt();
      saveState();
    });
    els.includeMetallic.addEventListener("change", (e) => {
      state.includeMetallic = e.target.checked;
      renderPrompt();
      saveState();
    });
    els.copyBtn.addEventListener("click", copyPrompt);
    els.exportJsonBtn.addEventListener("click", exportJson);
    els.footerExportJson.addEventListener("click", exportJson);
    els.themeBtn.addEventListener("click", toggleTheme);

    document.querySelectorAll("[data-goto]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.getElementById(btn.dataset.goto)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });

    window.addEventListener("scroll", () => {
      els.nav.classList.toggle("scrolled", window.scrollY > 8);
    }, { passive: true });
  }

  function restoreFormFromState() {
    els.colorPaletteStyle.value = state.colorPaletteStyle || "";
    els.content.value = state.content || "";
    els.contentType.value = state.contentType;
    els.aspectRatio.value = state.aspectRatio;
    els.backgroundPattern.value = state.backgroundPattern || "";
    els.artStyle.value = state.artStyle || "";
    els.department.value = state.department || "";
    els.includePeople.checked = state.includePeople;
    els.includeMetallic.checked = state.includeMetallic;
  }

  function init() {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) applyTheme(savedTheme);
    } catch (_) { /* storage unavailable */ }

    updateThemeIcon();
    renderContentTypeOptions();
    renderAspectRatioOptions();
    renderIslamicArtStyleOptions();
    loadState();
    restoreFormFromState();
    renderAspectRatioHint();
    renderStyleTags();
    renderPreview();
    renderPrompt();
    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
