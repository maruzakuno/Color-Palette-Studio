(() => {
  "use strict";

  const PALETTES = [
    { id: "medical-blue", name: "Medical Blue", category: "Healthcare",
      colors: { primary: "#1d4ed8", secondary: "#1e3a8a", tertiary: "#60a5fa", metallic: "#93c5fd", bg: "#f5f8ff" } },
    { id: "trust-teal", name: "Trust Teal", category: "Healthcare",
      colors: { primary: "#0f766e", secondary: "#115e59", tertiary: "#2dd4bf", metallic: "#5eead4", bg: "#f2fbfa" } },
    { id: "care-mint", name: "Care Mint", category: "Healthcare",
      colors: { primary: "#059669", secondary: "#047857", tertiary: "#6ee7b7", metallic: "#a7f3d0", bg: "#f3fdf8" } },
    { id: "wellness-coral", name: "Wellness Coral", category: "Healthcare",
      colors: { primary: "#e11d48", secondary: "#9f1239", tertiary: "#fb7185", metallic: "#fecdd3", bg: "#fff6f7" } },
    { id: "luxury-emerald-gold", name: "Luxury Emerald & Gold", category: "Government Luxury",
      colors: { primary: "#0f766e", secondary: "#065f46", tertiary: "#14b8a6", metallic: "#c9a227", bg: "#fffdf7" } },
    { id: "royal-navy-gold", name: "Royal Navy & Gold", category: "Government Luxury",
      colors: { primary: "#1e2a5e", secondary: "#101936", tertiary: "#3b4d8f", metallic: "#d4af37", bg: "#fbfaf6" } },
    { id: "imperial-maroon-gold", name: "Imperial Maroon & Gold", category: "Government Luxury",
      colors: { primary: "#7f1d1d", secondary: "#4c0519", tertiary: "#b91c1c", metallic: "#e5c158", bg: "#fdf8f2" } },
    { id: "violet-ai", name: "Violet AI", category: "Modern Tech",
      colors: { primary: "#6d28d9", secondary: "#4c1d95", tertiary: "#a78bfa", metallic: "#c4b5fd", bg: "#f8f6ff" } },
    { id: "corporate-steel", name: "Corporate Steel", category: "Corporate",
      colors: { primary: "#334155", secondary: "#1e293b", tertiary: "#64748b", metallic: "#94a3b8", bg: "#f6f7f9" } },
    { id: "corporate-amber", name: "Corporate Amber", category: "Corporate",
      colors: { primary: "#b45309", secondary: "#78350f", tertiary: "#f59e0b", metallic: "#fcd34d", bg: "#fffaf0" } },
    { id: "neutral-sand", name: "Neutral Sand", category: "Neutral",
      colors: { primary: "#78716c", secondary: "#44403c", tertiary: "#a8a29e", metallic: "#d6d3d1", bg: "#faf9f7" } },
    { id: "neutral-ivory", name: "Neutral Ivory", category: "Neutral",
      colors: { primary: "#57534e", secondary: "#292524", tertiary: "#a3a3a3", metallic: "#e7e5e4", bg: "#fdfcfb" } },
    { id: "sunrise-health", name: "Sunrise Health", category: "Healthcare",
      colors: { primary: "#ea580c", secondary: "#9a3412", tertiary: "#fb923c", metallic: "#fed7aa", bg: "#fff8f2" } },
    { id: "deep-sapphire-silver", name: "Deep Sapphire & Silver", category: "Government Luxury",
      colors: { primary: "#1e3a8a", secondary: "#172554", tertiary: "#3b82f6", metallic: "#cbd5e1", bg: "#f6f8fc" } },
    { id: "vibrant-gradient", name: "Vibrant Gradient", category: "Vibrant Gradient",
      colors: { primary: "#ff5e62", secondary: "#c724b1", tertiary: "#2dd4ff", metallic: "#ffd93d", bg: "#fffaf5" } },

    // กลุ่มที่ 1: กระตุ้นความสนใจและพลังงาน
    { id: "red-yellow", name: "แดง - เหลือง (Red & Yellow)", category: "กระตุ้นความสนใจและพลังงาน",
      colors: { primary: "#dc2626", secondary: "#facc15", tertiary: "#f97316", metallic: "#fde047", bg: "#fff8e1" } },
    { id: "orange-black", name: "ส้ม - ดำ (Orange & Black)", category: "กระตุ้นความสนใจและพลังงาน",
      colors: { primary: "#f97316", secondary: "#111827", tertiary: "#fb923c", metallic: "#9ca3af", bg: "#fff7ed" } },
    { id: "coral-white", name: "คอรัลสว่าง - ขาว (Vibrant Coral & White)", category: "กระตุ้นความสนใจและพลังงาน",
      colors: { primary: "#ff6b6b", secondary: "#f8fafc", tertiary: "#ff8787", metallic: "#ffd6d6", bg: "#fff5f5" } },
    { id: "neon-green-darkgrey", name: "เขียวนีออน - เทาเข้ม (Neon Green & Dark Grey)", category: "กระตุ้นความสนใจและพลังงาน",
      colors: { primary: "#4ade80", secondary: "#27272a", tertiary: "#22c55e", metallic: "#a3e635", bg: "#f3f4f6" } },

    // กลุ่มที่ 2: หรูหราและพรีเมียม
    { id: "powderblue-softwhite", name: "ฟ้าพาสเทล - ขาวนวล (Powder Blue & Soft White)", category: "หรูหราและพรีเมียม",
      colors: { primary: "#b0e0e6", secondary: "#fdfaf6", tertiary: "#7ec8e3", metallic: "#cbe8f0", bg: "#fefcf9" } },
    { id: "champagnegold-cream", name: "ทองแชมเปญ - ครีม (Champagne Gold & Cream)", category: "หรูหราและพรีเมียม",
      colors: { primary: "#e9c46a", secondary: "#fff8e7", tertiary: "#f4e4ba", metallic: "#d4af37", bg: "#fffaf0" } },
    { id: "emerald-gold-classic", name: "เขียวมรกต - ทอง (Emerald Green & Gold)", category: "หรูหราและพรีเมียม",
      colors: { primary: "#0f9d58", secondary: "#065f46", tertiary: "#10b981", metallic: "#d4af37", bg: "#f0fdf4" } },
    { id: "charcoal-rosegold", name: "ชาร์โคล - โรสโกลด์ (Charcoal & Rose Gold)", category: "หรูหราและพรีเมียม",
      colors: { primary: "#36454f", secondary: "#b76e79", tertiary: "#4b5563", metallic: "#e8b4b8", bg: "#fdf6f3" } },
    { id: "black-metallicsilver", name: "ดำ - เงินเมทัลลิก (Black & Metallic Silver)", category: "หรูหราและพรีเมียม",
      colors: { primary: "#0a0a0a", secondary: "#c0c0c0", tertiary: "#27272a", metallic: "#d1d5db", bg: "#f5f5f5" } },

    // กลุ่มที่ 3: น่าเชื่อถือและเทคโนโลยี
    { id: "navyblue-white", name: "กรมท่า - ขาว (Navy Blue & White)", category: "น่าเชื่อถือและเทคโนโลยี",
      colors: { primary: "#1e3a8a", secondary: "#f8fafc", tertiary: "#3b5998", metallic: "#93c5fd", bg: "#f6f8fc" } },
    { id: "teal-crispwhite", name: "ทีล - ขาวสะอาด (Teal & Crisp White)", category: "น่าเชื่อถือและเทคโนโลยี",
      colors: { primary: "#14b8a6", secondary: "#f8fffe", tertiary: "#2dd4bf", metallic: "#5eead4", bg: "#f0fdfa" } },
    { id: "skyblue-lightgrey", name: "ฟ้าสกายบลู - เทาอ่อน (Sky Blue & Light Grey)", category: "น่าเชื่อถือและเทคโนโลยี",
      colors: { primary: "#38bdf8", secondary: "#e5e7eb", tertiary: "#7dd3fc", metallic: "#bae6fd", bg: "#f7fafc" } },
    { id: "indigo-pearlwhite", name: "คราม - ขาวมุก (Indigo & Pearl White)", category: "น่าเชื่อถือและเทคโนโลยี",
      colors: { primary: "#4338ca", secondary: "#f5f3ff", tertiary: "#6366f1", metallic: "#c7d2fe", bg: "#f8f7ff" } },

    // กลุ่มที่ 4: ธรรมชาติและออร์แกนิก
    { id: "sagegreen-beige", name: "เขียวเซจ - เบจ (Sage Green & Beige)", category: "ธรรมชาติและออร์แกนิก",
      colors: { primary: "#87a96b", secondary: "#e8dcc8", tertiary: "#a3b18a", metallic: "#ddbea9", bg: "#faf6f0" } },
    { id: "terracotta-warmwhite", name: "เทอร์ราคอตตา - ขาววอร์มไวท์ (Terracotta & Warm White)", category: "ธรรมชาติและออร์แกนิก",
      colors: { primary: "#e2725b", secondary: "#fdf6ec", tertiary: "#cb6843", metallic: "#f0c9a0", bg: "#fdf8f3" } },
    { id: "olivegreen-woodbrown", name: "เขียวโอลีฟ - น้ำตาลไม้ (Olive Green & Wood Brown)", category: "ธรรมชาติและออร์แกนิก",
      colors: { primary: "#6b7a3a", secondary: "#6f4e37", tertiary: "#808000", metallic: "#c8a165", bg: "#f5f1e6" } },
    { id: "mustard-forestgreen", name: "เหลืองมัสตาร์ด - เขียวป่า (Mustard Yellow & Forest Green)", category: "ธรรมชาติและออร์แกนิก",
      colors: { primary: "#e3a008", secondary: "#1b4332", tertiary: "#ffc300", metallic: "#d4a017", bg: "#faf6e9" } },

    // กลุ่มที่ 5: นุ่มนวลและเป็นมิตร
    { id: "millennialpink-softgrey", name: "ชมพูมิลเลนเนียล - เทาอ่อน (Millennial Pink & Soft Grey)", category: "นุ่มนวลและเป็นมิตร",
      colors: { primary: "#f4c2c2", secondary: "#d9d9d9", tertiary: "#f8b4b4", metallic: "#fcdada", bg: "#fdf7f7" } },
    { id: "lavender-mint", name: "ลาเวนเดอร์ - มินต์ (Lavender & Mint)", category: "นุ่มนวลและเป็นมิตร",
      colors: { primary: "#b497d6", secondary: "#98ddca", tertiary: "#c9a6e0", metallic: "#a8e6cf", bg: "#faf6ff" } },
    { id: "peach-pastelyellow", name: "พีช - เหลืองพาสเทล (Peach & Pastel Yellow)", category: "นุ่มนวลและเป็นมิตร",
      colors: { primary: "#ffb6a3", secondary: "#fff3a3", tertiary: "#ffcab0", metallic: "#ffe9a8", bg: "#fffaf0" } },
  ];


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

  const POPULAR = ["Luxury Emerald & Gold", "Medical Blue", "Royal Navy & Gold", "Violet AI"];

  const LS_KEY = "healthPromptStudio.state.v1";
  const THEME_KEY = "healthPromptStudio.theme";

  const els = {
    heroSearch: document.getElementById("q"),
    navSearch: document.getElementById("navSearch"),
    qClear: document.getElementById("qClear"),
    quick: document.getElementById("quick"),
    stats: document.getElementById("stats"),
    tiles: document.getElementById("tiles"),
    pills: document.getElementById("pills"),
    resCount: document.getElementById("resCount"),
    grid: document.getElementById("paletteGrid"),
    content: document.getElementById("contentInput"),
    clearContentBtn: document.getElementById("clearContentBtn"),
    department: document.getElementById("department"),
    contentType: document.getElementById("contentType"),
    aspectRatio: document.getElementById("aspectRatio"),
    backgroundPattern: document.getElementById("backgroundPattern"),
    includePeople: document.getElementById("includePeople"),
    includeMetallic: document.getElementById("includeMetallic"),
    previewType: document.getElementById("previewType"),
    previewTitle: document.getElementById("previewTitle"),
    previewSwatches: document.getElementById("previewSwatches"),
    previewRatio: document.getElementById("previewRatio"),
    output: document.getElementById("promptOutput"),
    copyBtn: document.getElementById("copyBtn"),
    copyStatus: document.getElementById("copyStatus"),
    exportJsonBtn: document.getElementById("exportJsonBtn"),
    exportCssBtn: document.getElementById("exportCssBtn"),
    footerExportJson: document.getElementById("footerExportJson"),
    footerExportCss: document.getElementById("footerExportCss"),
    styleTags: document.getElementById("styleTags"),
    themeBtn: document.getElementById("themeBtn"),
    nav: document.getElementById("nav"),
    navCredit: document.getElementById("navCredit"),
  };

  let state = {
    paletteId: "luxury-emerald-gold",
    category: "All",
    query: "",
    content: "",
    contentType: els.contentType.value,
    aspectRatio: els.aspectRatio.value,
    backgroundPattern: els.backgroundPattern.value,
    department: "",
    includePeople: true,
    includeMetallic: true,
  };

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
      state = { ...state, ...saved };
    } catch (_) { /* ignore corrupt storage */ }
  }

  function saveState() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (_) { /* storage unavailable */ }
  }

  function getPalette() {
    return PALETTES.find((p) => p.id === state.paletteId) || PALETTES[0];
  }

  function categories() {
    return Array.from(new Set(PALETTES.map((p) => p.category)));
  }

  function categoryGradient(cat) {
    const sample = PALETTES.find((p) => p.category === cat);
    return `linear-gradient(135deg, ${sample.colors.primary}, ${sample.colors.metallic})`;
  }

  function filteredPalettes() {
    const q = state.query.trim().toLowerCase();
    return PALETTES.filter((p) => {
      const matchCat = state.category === "All" || p.category === state.category;
      const matchQuery = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }

  function setCategory(cat) {
    state.category = cat;
    renderTiles();
    renderPills();
    renderGrid();
    saveState();
  }

  function renderTiles() {
    els.tiles.innerHTML = "";
    categories().forEach((cat) => {
      const count = PALETTES.filter((p) => p.category === cat).length;
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "tile";
      tile.style.setProperty("--g", categoryGradient(cat));
      tile.setAttribute("aria-pressed", String(state.category === cat));
      tile.innerHTML = `
        <div class="tile-top">
          <span class="gico"><svg class="i"><use href="#i-palette"/></svg></span>
          <span class="num">${count}<small>พาเลต</small></span>
        </div>
        <h3>${cat}</h3>
      `;
      tile.addEventListener("click", () => {
        setCategory(cat);
        document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      els.tiles.appendChild(tile);
    });
  }

  function renderPills() {
    els.pills.innerHTML = "";
    ["All", ...categories()].forEach((cat) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pill-btn";
      btn.textContent = cat === "All" ? "ทั้งหมด" : cat;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", String(state.category === cat));
      btn.addEventListener("click", () => setCategory(cat));
      els.pills.appendChild(btn);
    });
  }

  function renderGrid() {
    const list = filteredPalettes();
    els.resCount.textContent = `${list.length} พาเลต`;
    els.grid.innerHTML = "";
    list.forEach((p) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "card palette-card";
      card.setAttribute("role", "option");
      card.setAttribute("aria-selected", String(p.id === state.paletteId));
      card.innerHTML = `
        <span class="swatches">
          <span style="background:${p.colors.primary}"></span>
          <span style="background:${p.colors.secondary}"></span>
          <span style="background:${p.colors.tertiary}"></span>
          <span style="background:${p.colors.metallic}"></span>
        </span>
        <span class="pname">${p.name}</span>
        <span class="pcat">${p.category}</span>
      `;
      card.addEventListener("click", () => {
        state.paletteId = p.id;
        renderGrid();
        applyPaletteToUI();
        renderPreview();
        renderPrompt();
        saveState();
      });
      els.grid.appendChild(card);
    });
  }

  function applyPaletteToUI() {
    const p = getPalette().colors;
    const root = document.documentElement.style;
    root.setProperty("--p-primary", p.primary);
    root.setProperty("--p-secondary", p.secondary);
    root.setProperty("--p-tertiary", p.tertiary);
    root.setProperty("--p-metallic", p.metallic);
    root.setProperty("--p-bg", p.bg);
  }

  function renderNavCredit() {
    els.navCredit.textContent = state.department
      ? `${state.department} สำนักงานสาธารณสุขจังหวัดนราธิวาส`
      : "สำนักงานสาธารณสุขจังหวัดนราธิวาส";
  }

  function renderStyleTags() {
    els.styleTags.innerHTML = STYLE_TAGS
      .map((t) => `<span class="tag">${t}</span>`)
      .join("");
  }

  function renderStats() {
    const cats = categories();
    els.stats.innerHTML = `
      <div><b>${PALETTES.length}</b><small>พาเลตสี</small></div>
      <div><b>${cats.length}</b><small>หมวดหมู่</small></div>
      <div><b>07</b><small>ส่วนโครงสร้างพรอมป์</small></div>
    `;
  }

  function renderQuick() {
    els.quick.innerHTML = '<span>ยอดนิยม</span>' + POPULAR
      .map((name) => `<button type="button" data-name="${name}">${name}</button>`)
      .join("");
    els.quick.querySelectorAll("button[data-name]").forEach((btn) => {
      btn.addEventListener("click", () => {
        setQuery(btn.dataset.name);
      });
    });
  }

  function setQuery(value) {
    state.query = value;
    els.heroSearch.value = value;
    els.navSearch.value = value;
    els.qClear.hidden = !value;
    renderGrid();
    saveState();
    document.getElementById("results").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderPreview() {
    const p = getPalette();
    els.previewType.textContent = state.contentType.toUpperCase();
    els.previewTitle.textContent = state.content.trim() || "หัวข้อของคุณจะแสดงที่นี่";
    els.previewRatio.textContent = state.aspectRatio;
    els.previewSwatches.innerHTML = Object.values(p.colors)
      .map((c) => `<span style="background:${c}"></span>`)
      .join("");
  }

  function buildPrompt() {
    const p = getPalette();
    const c = p.colors;
    const metallicLine = state.includeMetallic
      ? `Metallic Gold/Silver accents may be used if present in the palette (${c.metallic}), applied to borders, ribbons, and decorative details only.`
      : `No metallic effects — keep all surfaces matte and flat within the palette tones.`;
    const peopleLine = state.includePeople
      ? `Include authentic Thai healthcare professionals or public-service staff: natural poses, anatomically correct hands, realistic skin texture, inclusive human-centered composition.`
      : `No human figures — focus entirely on typography, iconography, and abstract/environmental elements.`;

    return `##MASTER PROMPT — PREMIUM VISUAL DESIGN V3.0##

สร้างภาพ
[01] CORE CONFIGURATION
COLOR_THEME = "${p.name}" — Primary ${c.primary}, Secondary ${c.secondary}, Tertiary ${c.tertiary}, Metallic/Accent ${c.metallic}, Background ${c.bg}
CONTENT = "${state.content.trim()}"
CONTENT_TYPE = "${state.contentType}"
ASPECT_RATIO = "${state.aspectRatio}"
BACKGROUND_PATTERN = "${state.backgroundPattern || "None — flat background"}"
DEPARTMENT = "${state.department || "ไม่ระบุกลุ่มงาน"}"

[02] DESIGN CONCEPT
Create a world-class premium Thai educational and government visual composition. Combine Premium Thai Educational Report, Luxury Academic Cover, Elegant Government Report, and high-end editorial design. The result must be sophisticated, modern, clean, visually impressive, credible, and suitable for professional healthcare communication.

[03] GLOBAL COLOR SYSTEM
Use ONLY the palette defined in COLOR_THEME [01] as the controlling theme. Apply it consistently to backgrounds, typography, lighting, borders, ribbons, decorative details, gradients, icons, illustrations, data graphics, and environmental accents. You may derive lighter, darker, softer, translucent, and complementary tonal variations from the selected palette for legibility and depth. Do not incorporate the names or palettes of any unselected themes. Maintain excellent readability and accessibility. ${metallicLine}

[04] COMPOSITION & VISUAL HIERARCHY
Establish a striking primary focal point, elegant headline area, well-balanced secondary information, clean supporting details, generous negative space, disciplined grid alignment, and clear visual hierarchy. Use premium typography with precise Thai character shaping, correct vowels, tone marks, spelling, and line breaks. Do not invent names, dates, numbers, institutions, statistics, medical claims, or logos.
${state.backgroundPattern ? `Background treatment: Apply ${state.backgroundPattern} as a subtle decorative background layer, rendered in tonal variations of COLOR_THEME [01] only, kept low-contrast so it never competes with foreground text or subjects.` : "Background treatment: Keep the background flat and clean with no decorative pattern."}

[05] ADAPTIVE VISUAL DIRECTION
Select subject-appropriate imagery and illustrations based on CONTENT. ${peopleLine} For infographics and dashboards, prioritize data legibility and clean chart structures. Use sharp typography zones, cinematic lighting, sophisticated depth, and cohesive composition.

[06] QUALITY & OUTPUT
Ultra-realistic, masterpiece, highly detailed, cinematic lighting, professional magazine quality, high-end editorial finishing, production-grade visual presentation, intended 8K aesthetic. Compose for the exact ASPECT_RATIO selected in [01]. For professional print, use an appropriate high-resolution export and 300 DPI metadata when available.
Style standard: ${STYLE_TAGS.join(" / ")}.

[07] NEGATIVE CONSTRAINTS
No mismatched color palettes, accidental default blue-gold decoration unless specified in [01], clutter, poor contrast, illegible text, incorrect Thai spelling, distorted anatomy, duplicate people, extra fingers, fake charts, fabricated values, watermark, random lettering, or uncontrolled gradients.

NEGATIVE PROMPT: Distorted Thai characters, misspelled words, hallucinated data, deformed maps, swapped district boundaries, unreadable tables, blurred numbers, disproportionate logos, cluttered layout, messy composition, low resolution, flat design, cartoonish style, bad anatomy, distorted doctor, unreadable text, oversaturated colors, cheap template aesthetics, random English gibberish, watermarks, extra logos, redundant graphic elements, grainy texture, artifacts.

FINAL RULE: All visual color decisions must derive from the single COLOR_THEME configuration in [01]. Never override it elsewhere in the prompt.

CONTENT TO RENDER (from [01]): "${state.content.trim()}"`;
  }

  function renderPrompt() {
    els.output.value = buildPrompt();
  }

  function exportJson() {
    const p = getPalette();
    const data = { palette: p, ...state };
    download(`health-prompt-${p.id}.json`, JSON.stringify(data, null, 2), "application/json");
  }

  function exportCssVars() {
    const c = getPalette().colors;
    const css = `:root {\n  --hp-primary: ${c.primary};\n  --hp-secondary: ${c.secondary};\n  --hp-tertiary: ${c.tertiary};\n  --hp-metallic: ${c.metallic};\n  --hp-bg: ${c.bg};\n}\n`;
    download(`health-prompt-${getPalette().id}.css`, css, "text/css");
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

  function bindEvents() {
    [els.heroSearch, els.navSearch].forEach((input) => {
      input.addEventListener("input", (e) => {
        state.query = e.target.value;
        const other = e.target === els.heroSearch ? els.navSearch : els.heroSearch;
        other.value = e.target.value;
        els.qClear.hidden = !e.target.value;
        renderGrid();
        saveState();
      });
    });
    els.qClear.addEventListener("click", () => setQuery(""));

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
      renderPreview();
      renderPrompt();
      saveState();
    });
    els.contentType.addEventListener("change", (e) => {
      state.contentType = e.target.value;
      renderPreview();
      renderPrompt();
      saveState();
    });
    els.aspectRatio.addEventListener("change", (e) => {
      state.aspectRatio = e.target.value;
      renderPreview();
      renderPrompt();
      saveState();
    });
    els.backgroundPattern.addEventListener("change", (e) => {
      state.backgroundPattern = e.target.value;
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
      renderNavCredit();
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
    els.exportCssBtn.addEventListener("click", exportCssVars);
    els.footerExportJson.addEventListener("click", exportJson);
    els.footerExportCss.addEventListener("click", exportCssVars);
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
    els.content.value = state.content || "";
    els.contentType.value = state.contentType;
    els.aspectRatio.value = state.aspectRatio;
    els.backgroundPattern.value = state.backgroundPattern || "";
    els.department.value = state.department || "";
    els.includePeople.checked = state.includePeople;
    els.includeMetallic.checked = state.includeMetallic;
    els.heroSearch.value = state.query || "";
    els.navSearch.value = state.query || "";
    els.qClear.hidden = !state.query;
  }

  function init() {
    try {
      const savedTheme = localStorage.getItem(THEME_KEY);
      if (savedTheme) applyTheme(savedTheme);
    } catch (_) { /* storage unavailable */ }

    updateThemeIcon();
    loadState();
    restoreFormFromState();
    renderNavCredit();
    renderStyleTags();
    renderStats();
    renderQuick();
    renderTiles();
    renderPills();
    renderGrid();
    applyPaletteToUI();
    renderPreview();
    renderPrompt();
    bindEvents();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
