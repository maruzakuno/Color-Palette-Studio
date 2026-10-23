(function (root) {
  "use strict";

  function defineType(config) {
    return Object.freeze({
      ...config,
      recommendedRatios: Object.freeze(config.recommendedRatios),
      requiredZones: Object.freeze(config.requiredZones),
      constraints: Object.freeze(config.constraints),
    });
  }

  const CONTENT_TYPE_GROUPS = [
    {
      label: "เอกสารและสิ่งพิมพ์ราชการ",
      types: [
        defineType({
          id: "book-report-cover", value: "Book / Report Cover", label: "ปกหนังสือ / ปกรายงาน",
          textDensity: "low", hierarchy: "title-first", safeArea: "10%",
          recommendedRatios: ["3:4", "A4 Portrait"], requiredZones: ["organization", "title", "subtitle", "date or edition"],
          composition: "Build a premium cover with one dominant title zone, a restrained institutional identifier, a clear subtitle area, and generous negative space.",
          visualDirection: "Use a single memorable hero visual or refined abstract motif appropriate to the subject; keep the result formal, timeless, and publication-ready.",
          constraints: ["Do not create interior-page elements or dense body copy.", "Do not invent an edition, date, logo, or organization name."],
          exampleContent: "ปกรายงานประจำปี งานสาธารณสุขปฐมภูมิ จังหวัดนราธิวาส ปีงบประมาณ 2569 — สำนักงานสาธารณสุขจังหวัดนราธิวาส",
          suggestedColorTheme: "เขียวมรกต-ทอง (ทางการ หรูหรา)",
        }),
        defineType({
          id: "annual-report-cover", value: "Annual Report Cover", label: "ปกรายงานประจำปี",
          textDensity: "low", hierarchy: "year-and-title-first", safeArea: "10%",
          recommendedRatios: ["3:4", "A4 Portrait"], requiredZones: ["report title", "reporting year", "organization", "theme visual"],
          composition: "Prioritize the report year and title, followed by the organization name, with a disciplined annual-publication grid and strong cover identity.",
          visualDirection: "Express measurable progress, public trust, and forward momentum through credible healthcare or civic imagery and restrained data-inspired details.",
          constraints: ["Do not fabricate performance figures or awards.", "Do not resemble a commercial magazine cover."],
          exampleContent: "รายงานประจำปี 2568 สำนักงานสาธารณสุขจังหวัดนราธิวาส — ก้าวสู่ระบบสุขภาพปฐมภูมิที่เข้มแข็งและยั่งยืน",
          suggestedColorTheme: "น้ำเงินกรมท่า-ทอง (น่าเชื่อถือ เป็นทางการ)",
        }),
        defineType({
          id: "policy-brief", value: "Policy Brief / Executive Summary", label: "Policy Brief / บทสรุปผู้บริหาร",
          textDensity: "medium", hierarchy: "decision-first", safeArea: "8%",
          recommendedRatios: ["A4 Portrait", "3:4"], requiredZones: ["policy title", "key message", "evidence summary", "recommended action"],
          composition: "Use an executive reading path: policy title, one decisive key message, compact evidence highlights, then a clearly separated recommended-action zone.",
          visualDirection: "Favor sober editorial design, concise evidence cards, and subtle policy or public-health imagery that supports rapid decision-making.",
          constraints: ["Do not fabricate evidence, recommendations, citations, or statistics.", "Avoid decorative elements that compete with the decision message."],
          exampleContent: "Policy Brief: มาตรการเร่งรัดคัดกรองความดันโลหิตสูงและเบาหวานเชิงรุกในระดับตำบล จังหวัดนราธิวาส",
          suggestedColorTheme: "น้ำเงินเข้ม-เทา (สุขุม น่าเชื่อถือ)",
        }),
        defineType({
          id: "fact-sheet", value: "Fact Sheet / One-page Brief", label: "Fact Sheet / เอกสารสรุปหน้าเดียว",
          textDensity: "medium-high", hierarchy: "key-facts-first", safeArea: "7%",
          recommendedRatios: ["A4 Portrait", "3:4"], requiredZones: ["topic", "key facts", "supporting explanation", "source or contact"],
          composition: "Use a modular one-page grid with highly scannable fact blocks, prominent verified numbers, short explanations, and a compact source area.",
          visualDirection: "Combine crisp pictograms, restrained charts, and clear typographic contrast for fast public comprehension.",
          constraints: ["Do not invent facts, numbers, sources, QR codes, or contact details.", "Avoid long paragraph walls."],
          exampleContent: "Fact Sheet: สถานการณ์โรคไข้เลือดออก จังหวัดนราธิวาส ประจำสัปดาห์ — ข้อมูลเฝ้าระวังและคำแนะนำป้องกันโรค",
          suggestedColorTheme: "ฟ้า-ขาว (ชัดเจน อ่านง่าย)",
        }),
        defineType({
          id: "brochure-leaflet", value: "Brochure / Leaflet", label: "โบรชัวร์ / แผ่นพับ",
          textDensity: "medium", hierarchy: "panel-by-panel", safeArea: "8% plus fold-safe margins",
          recommendedRatios: ["A4 Landscape", "A4 Portrait"], requiredZones: ["front cover", "inside information panels", "call to action", "contact panel"],
          composition: "Design a coherent panel sequence with fold-safe margins, a strong front panel, logically chunked inside panels, and a clear final action panel.",
          visualDirection: "Maintain visual continuity across every panel using repeated motifs, consistent headings, and accessible health-communication graphics.",
          constraints: ["Do not place essential text across fold lines.", "Do not fabricate addresses, phone numbers, QR codes, or service claims."],
          exampleContent: "แผ่นพับประชาสัมพันธ์: วิธีดูแลสุขภาพช่วงมัสยิดในเดือนรอมฎอน สำหรับผู้สูงอายุและผู้ป่วยโรคเรื้อรัง",
          suggestedColorTheme: "เขียวมิ้นต์-ขาว (เป็นมิตร อบอุ่น)",
        }),
        defineType({
          id: "manual-guideline-cover", value: "Manual / Guideline Cover", label: "ปกคู่มือ / แนวทางปฏิบัติ",
          textDensity: "low", hierarchy: "subject-and-version-first", safeArea: "10%",
          recommendedRatios: ["A4 Portrait", "3:4"], requiredZones: ["manual title", "scope or audience", "organization", "version or year"],
          composition: "Create an authoritative manual cover with a precise title block, visible scope or audience cue, and a stable institutional grid.",
          visualDirection: "Use subject-specific technical or service imagery with calm structure, practical clarity, and restrained official styling.",
          constraints: ["Do not imply accreditation or legal authority not supplied in CONTENT.", "Do not invent a version number or publication year."],
          exampleContent: "คู่มือแนวทางปฏิบัติงานหน่วยบริการปฐมภูมิ (PCU) สำหรับเจ้าหน้าที่สาธารณสุข จังหวัดนราธิวาส",
          suggestedColorTheme: "เทาเข้ม-น้ำเงิน (เป็นทางการ มั่นคง)",
        }),
        defineType({
          id: "certificate", value: "Certificate", label: "เกียรติบัตร / ประกาศนียบัตร",
          textDensity: "low", hierarchy: "recipient-name-first", safeArea: "12%",
          recommendedRatios: ["A4 Landscape", "A4 Portrait"], requiredZones: ["official heading", "recipient name", "recognition statement", "date", "signature areas"],
          composition: "Use a formal symmetrical layout with a dominant recipient-name zone, elegant recognition text, balanced seals or ornaments, and clearly reserved signature areas.",
          visualDirection: "Apply refined ceremonial details, precise borders, premium paper cues, and restrained metallic accents without sacrificing legibility.",
          constraints: ["Do not invent recipient names, signatories, dates, seals, or signatures.", "Do not render signature-like marks unless explicitly supplied."],
          exampleContent: "เกียรติบัตร มอบให้แก่เจ้าหน้าที่สาธารณสุขดีเด่น ประจำปี 2569 สำนักงานสาธารณสุขจังหวัดนราธิวาส",
          suggestedColorTheme: "ทองแชมเปญ-ครีม (หรูหรา เป็นเกียรติ)",
        }),
        defineType({
          id: "performance-agreement-cover", value: "Performance Agreement (PA) Cover", label: "ปกบันทึกข้อตกลงการพัฒนางาน (PA)",
          textDensity: "low-medium", hierarchy: "portrait-and-identity-first", safeArea: "8%",
          recommendedRatios: ["A4 Portrait", "3:4"],
          requiredZones: [
            "emblem/logo at top",
            "document title and English subtitle (e.g. Performance Agreement : PA)",
            "fiscal year callout banner with effective date range",
            "large photorealistic portrait of the staff member in official uniform",
            "small circular or diamond-framed collage of supporting work-activity photos",
            "nameplate panel with full name and position/professional level",
            "organization name and affiliation hierarchy footer",
            "ornate floral and ribbon frame elements",
          ],
          composition: "Build a formal personnel-document cover: emblem at the top, document title and English subtitle beneath it, a bold fiscal-year callout with its effective date range, a large dominant portrait of the staff member in official uniform positioned to one side, a small cluster of circular or diamond-framed supporting activity photos opposite the portrait, an elegant nameplate panel stating full name and position/professional level, and a closing footer listing the organization name and its full affiliation hierarchy. Frame the composition with ornate floral and ribbon border elements and a large faint watermark of the document's initials behind the portrait.",
          visualDirection: "Use an elegant, ceremonial, photorealistic official-document style: a sharp, faithful portrait photo of the person (never alter the face), a soft natural outdoor/school-building background behind the portrait, premium floral bouquets and flowing ribbon graphics in the COLOR_THEME tones, metallic gold accents on frames and dividers, and a bright soft-glow sky backdrop.",
          constraints: [
            "Do not alter, distort, or reinterpret the subject's face if a reference image is supplied — keep it 100% faithful.",
            "Do not fabricate the staff member's name, position, professional level, fiscal year, effective dates, organization name, or affiliation hierarchy beyond what CONTENT specifies.",
            "Do not duplicate the portrait subject or show more than one main portrait figure.",
          ],
          exampleContent: "บันทึกข้อตกลงในการพัฒนางาน (Performance Agreement : PA) ประจำปีงบประมาณ 2570 — นางสาวยิ้มแย้ม แจ่มใส ตำแหน่งครู วิทยฐานะครูชำนาญการพิเศษ โรงเรียนสุขใจวิทยา",
          suggestedColorTheme: "ม่วง-ทอง (หรูหรา เป็นทางการ)",
        }),
      ],
    },
    {
      label: "ประชาสัมพันธ์และรณรงค์",
      types: [
        defineType({
          id: "campaign-key-visual", value: "Campaign Key Visual", label: "ภาพหลักประจำโครงการ",
          textDensity: "low", hierarchy: "campaign-message-first", safeArea: "10%",
          recommendedRatios: ["1:1", "4:5", "16:9"], requiredZones: ["campaign message", "hero visual", "organization lockup", "adaptation space"],
          composition: "Create one ownable campaign idea with a dominant message, memorable hero visual, and flexible clear zones for adaptation across multiple formats.",
          visualDirection: "Aim for immediate recognition, emotional relevance, and a distinctive visual system that remains credible for public health.",
          constraints: ["Do not introduce an unsupported slogan, mascot, or logo.", "Avoid overly complex scenes that cannot scale across formats."],
          exampleContent: "ภาพหลักโครงการ \"นราธิวาสปลอดโรคไม่ติดต่อเรื้อรัง\" รณรงค์ปรับเปลี่ยนพฤติกรรมสุขภาพระดับชุมชน",
          suggestedColorTheme: "ส้ม-ฟ้าสด (มีพลัง ดึงดูดสายตา)",
        }),
        defineType({
          id: "public-health-poster", value: "Public Health Poster", label: "โปสเตอร์ประชาสัมพันธ์สุขภาพ",
          textDensity: "medium", hierarchy: "headline-action-first", safeArea: "8%",
          recommendedRatios: ["3:4", "4:5", "A4 Portrait"], requiredZones: ["headline", "core health message", "supporting visual", "recommended action", "official source"],
          composition: "Lead with a readable headline, one core health message, a supporting visual, and a distinct action area that works at viewing distance.",
          visualDirection: "Use approachable, culturally relevant health imagery with clear emotional tone and strong foreground-background separation.",
          constraints: ["Do not fabricate medical claims, statistics, or official guidance.", "Avoid fear-inducing imagery unless explicitly required."],
          exampleContent: "โปสเตอร์ประชาสัมพันธ์: ล้างมือให้สะอาด ป้องกันโรคติดต่อในฤดูฝน จังหวัดนราธิวาส",
          suggestedColorTheme: "เขียว-ฟ้า (สุขภาพ สดชื่น)",
        }),
        defineType({
          id: "emergency-alert", value: "Emergency Alert / Disease Advisory", label: "ประกาศเตือนภัย / แจ้งเตือนโรค",
          textDensity: "low", hierarchy: "urgent-headline-first", safeArea: "8%",
          recommendedRatios: ["1:1", "4:5", "9:16"], requiredZones: ["urgent headline", "risk or affected group", "required action", "effective period", "official source"],
          composition: "Make the alert understandable within three seconds: urgent headline first, immediate risk second, required action third, and official source last.",
          visualDirection: "Use high contrast, unmistakable warning hierarchy, restrained symbols, and highly legible action instructions suitable for rapid public recognition.",
          constraints: ["Do not fabricate medical instructions, outbreak status, dates, affected areas, or emergency contacts.", "Do not use decoration that reduces urgency or readability."],
          exampleContent: "ประกาศเตือนภัย: สถานการณ์น้ำท่วม ระวังโรคฉี่หนูและโรคระบบทางเดินอาหาร ในพื้นที่จังหวัดนราธิวาส",
          suggestedColorTheme: "แดง-ดำ (เร่งด่วน ชัดเจนสูง)",
        }),
        defineType({
          id: "social-media-post", value: "Social Media Post", label: "โพสต์โซเชียลมีเดีย",
          textDensity: "low", hierarchy: "hook-first", safeArea: "10%",
          recommendedRatios: ["1:1", "4:5"], requiredZones: ["short hook", "single message", "supporting visual", "source or action"],
          composition: "Use a thumb-stopping hook, one focused message, and a clear visual focal point with mobile-safe typography and generous edge margins.",
          visualDirection: "Favor bold simplicity, authentic people or icons, and high legibility on small screens while preserving official credibility.",
          constraints: ["Do not overload the image with paragraph text.", "Do not invent hashtags, handles, links, or calls to action."],
          exampleContent: "โพสต์โซเชียลมีเดีย: ชวนตรวจสุขภาพประจำปีฟรี ที่โรงพยาบาลส่งเสริมสุขภาพตำบลใกล้บ้านคุณ",
          suggestedColorTheme: "ชมพู-ม่วง (สดใส ทันสมัย)",
        }),
        defineType({
          id: "social-media-carousel", value: "Social Media Carousel", label: "ภาพชุด Carousel",
          textDensity: "medium", hierarchy: "narrative-sequence", safeArea: "10%",
          recommendedRatios: ["1:1", "4:5"], requiredZones: ["cover slide", "sequenced content slides", "summary slide", "action or source slide"],
          composition: "Design a multi-slide narrative: compelling cover, one idea per slide, consistent navigation cues, concise summary, and a final source or action slide.",
          visualDirection: "Maintain a unified grid, recurring visual language, and controlled variation so every slide feels related but not repetitive.",
          constraints: ["Do not repeat identical information across slides.", "Do not invent slide counts, facts, sources, or calls to action."],
          exampleContent: "ภาพชุด Carousel: 5 วิธีดูแลสุขภาพจิตในวัยทำงาน สำหรับเจ้าหน้าที่สาธารณสุขจังหวัดนราธิวาส",
          suggestedColorTheme: "ฟ้า-เหลือง (สนุก มีชีวิตชีวา)",
        }),
        defineType({
          id: "website-hero-banner", value: "Website Hero Banner", label: "แบนเนอร์หน้าเว็บไซต์",
          textDensity: "low", hierarchy: "headline-and-action-first", safeArea: "12% with responsive crop protection",
          recommendedRatios: ["16:9", "21:9"], requiredZones: ["headline", "supporting line", "action area", "responsive image focal point"],
          composition: "Use a wide responsive composition with protected text and action zones, plus a hero focal point that survives desktop and mobile cropping.",
          visualDirection: "Create polished web-ready depth with clean negative space and a clear split between interface text and imagery.",
          constraints: ["Do not bake functional buttons or navigation into the image.", "Keep essential subjects away from likely crop edges."],
          exampleContent: "แบนเนอร์หน้าเว็บไซต์: สำนักงานสาธารณสุขจังหวัดนราธิวาส — บริการสุขภาพเพื่อประชาชนทุกคน",
          suggestedColorTheme: "น้ำเงิน-ฟ้าไล่เฉด (ทันสมัย เว็บไซต์)",
        }),
        defineType({
          id: "backdrop-stage-screen", value: "Backdrop / Stage Screen", label: "ฉากหลังเวที / จอเวที",
          textDensity: "low", hierarchy: "event-title-first", safeArea: "15% plus center-stage clearance",
          recommendedRatios: ["16:9", "21:9"], requiredZones: ["event title", "date and venue", "organization area", "speaker-safe center zone"],
          composition: "Build a wide event identity with a readable title and protected center-stage area so people do not block critical text or logos.",
          visualDirection: "Use large-scale shapes, premium depth, and controlled lighting that remains clean on LED screens and in event photography.",
          constraints: ["Do not place important information behind the speaker zone.", "Do not invent sponsors, dates, venues, or event partners."],
          exampleContent: "ฉากหลังเวที: พิธีมอบรางวัลหน่วยบริการปฐมภูมิดีเด่น ประจำปี 2569 สำนักงานสาธารณสุขจังหวัดนราธิวาส",
          suggestedColorTheme: "น้ำเงินเข้ม-ทอง (หรูหรา งานพิธี)",
        }),
        defineType({
          id: "roll-up-banner", value: "Roll-up Banner / Standee", label: "โรลอัป / สแตนดี้",
          textDensity: "medium", hierarchy: "top-to-bottom", safeArea: "8% with bottom hardware clearance",
          recommendedRatios: ["1:2", "9:16"], requiredZones: ["top headline", "central message", "supporting benefits", "bottom source or contact"],
          composition: "Use a strong vertical reading path from headline to central visual to supporting points, keeping essential content above the roll-up hardware zone.",
          visualDirection: "Prioritize distance readability, a tall central focal point, and simple repeated cues suitable for physical display.",
          constraints: ["Do not place small text or essential details near the floor.", "Do not invent contact details, QR codes, or service locations."],
          exampleContent: "โรลอัป: จุดบริการตรวจสุขภาพเคลื่อนที่ สำนักงานสาธารณสุขจังหวัดนราธิวาส",
          suggestedColorTheme: "เขียว-ขาว (สะอาด เป็นทางการ)",
        }),
      ],
    },
    {
      label: "ความรู้และการสื่อสารสุขภาพ",
      types: [
        defineType({
          id: "infographic", value: "Infographic", label: "อินโฟกราฟิก",
          textDensity: "medium-high", hierarchy: "insight-first", safeArea: "7%",
          recommendedRatios: ["3:4", "4:5", "9:16"], requiredZones: ["title", "key insight", "structured facts", "visual explanation", "source"],
          composition: "Organize information into a clear top-to-bottom story with one key insight, modular fact sections, meaningful icons or diagrams, and a visible source zone.",
          visualDirection: "Use information-driven graphics, consistent pictograms, and purposeful visual encoding rather than decorative chart-like elements.",
          constraints: ["Do not fabricate data, labels, sources, or chart values.", "Do not use charts that lack a meaningful scale or relationship."],
          exampleContent: "อินโฟกราฟิก: 5 สัญญาณเตือนโรคไข้เลือดออก และวิธีป้องกันยุงลายในบ้าน",
          suggestedColorTheme: "ฟ้า-ส้ม (ข้อมูลชัดเจน น่าสนใจ)",
        }),
        defineType({
          id: "step-by-step-guide", value: "Step-by-step Guide", label: "คู่มือแบบเป็นขั้นตอน",
          textDensity: "medium", hierarchy: "numbered-sequence", safeArea: "8%",
          recommendedRatios: ["3:4", "4:5", "9:16"], requiredZones: ["goal", "numbered steps", "supporting demonstrations", "completion or caution note"],
          composition: "Present a strict numbered sequence with one action per step, consistent visual demonstrations, and unmistakable directional flow.",
          visualDirection: "Use simple instructional scenes or icons, repeated framing, and accessible cues that reduce cognitive load.",
          constraints: ["Do not reorder, omit, or invent procedural steps.", "Do not imply medical safety where instructions have not been verified."],
          exampleContent: "คู่มือขั้นตอน: วิธีล้างมือ 7 ขั้นตอน ตามมาตรฐานกระทรวงสาธารณสุข",
          suggestedColorTheme: "เขียวมิ้นต์-ขาว (เรียบง่าย ปฏิบัติตามง่าย)",
        }),
        defineType({
          id: "process-flowchart", value: "Process Flowchart", label: "ผังกระบวนการ",
          textDensity: "medium", hierarchy: "flow-and-decision-first", safeArea: "8%",
          recommendedRatios: ["16:9", "A4 Landscape", "3:4"], requiredZones: ["start", "process nodes", "decision nodes", "connectors", "end states"],
          composition: "Map a single unambiguous flow with consistent node types, directional connectors, clear decision branches, and visibly distinct end states.",
          visualDirection: "Use disciplined diagram geometry, concise labels, and strong connector contrast with minimal decorative imagery.",
          constraints: ["Do not create missing steps, branches, owners, or outcomes.", "Avoid crossed connectors and ambiguous flow direction."],
          exampleContent: "ผังกระบวนการ: ขั้นตอนการส่งต่อผู้ป่วยจาก รพ.สต. สู่โรงพยาบาลแม่ข่าย จังหวัดนราธิวาส",
          suggestedColorTheme: "เทา-ฟ้า (เป็นระบบ ชัดเจน)",
        }),
        defineType({
          id: "patient-journey", value: "Patient Journey / Service Journey", label: "เส้นทางผู้รับบริการ",
          textDensity: "medium", hierarchy: "journey-stage-first", safeArea: "8%",
          recommendedRatios: ["16:9", "A4 Landscape", "3:4"], requiredZones: ["journey stages", "patient actions", "service touchpoints", "pain points", "support opportunities"],
          composition: "Lay out chronological journey stages with aligned patient actions, service touchpoints, experience cues, and clearly separated support opportunities.",
          visualDirection: "Use human-centered illustrations and a continuous path that communicates empathy, continuity of care, and service coordination.",
          constraints: ["Do not invent service steps, wait times, patient quotes, or outcomes.", "Do not expose identifiable patient information."],
          exampleContent: "เส้นทางผู้รับบริการ: ขั้นตอนการรับบริการฝากครรภ์ที่โรงพยาบาลส่งเสริมสุขภาพตำบล",
          suggestedColorTheme: "ชมพูพาสเทล-ฟ้า (อบอุ่น ใส่ใจ)",
        }),
      ],
    },
    {
      label: "ข้อมูล สถิติ และการบริหาร",
      types: [
        defineType({
          id: "dashboard-data-visual", value: "Dashboard / Data Visual", label: "แดชบอร์ด / ข้อมูลเชิงภาพ",
          textDensity: "high", hierarchy: "kpi-overview-first", safeArea: "5%",
          recommendedRatios: ["16:9", "A4 Landscape"], requiredZones: ["summary KPIs", "trend visuals", "breakdowns", "filters or context", "data source"],
          composition: "Use a strict dashboard grid with top-level KPIs, comparable chart panels, consistent scales, clear labels, and a compact context or source area.",
          visualDirection: "Prioritize analytical clarity, restrained depth, accessible chart colors, and consistent data encoding over decorative illustration.",
          constraints: ["Do not fabricate metrics, trends, labels, filters, or chart values.", "Do not use 3D charts or misleading axes."],
          exampleContent: "KPI Dashboard: หน้าจอสรุปผลการดำเนินงานหลัก (Key Performance Indicators) ของหน่วยงาน นำเสนอข้อมูลในรูปแบบภาพ (Data Visualization) เช่น กราฟแท่ง กราฟเส้นแนวโน้ม แผนภูมิวงกลม และสัญญาณสถานะสี เพื่อให้ผู้บริหารเห็นภาพรวมผลงานแบบเรียลไทม์และตัดสินใจได้รวดเร็ว จังหวัดนราธิวาส",
          suggestedColorTheme: "น้ำเงิน-เทา (ข้อมูล วิเคราะห์)",
        }),
        defineType({
          id: "kpi-scorecard", value: "KPI Scorecard", label: "สรุปตัวชี้วัด KPI",
          textDensity: "high", hierarchy: "status-versus-target-first", safeArea: "6%",
          recommendedRatios: ["16:9", "A4 Landscape", "A4 Portrait"], requiredZones: ["KPI name", "actual value", "target", "status", "trend", "reporting period"],
          composition: "Create a repeatable scorecard grid that pairs every KPI with actual, target, status, trend, and reporting period using consistent visual semantics.",
          visualDirection: "Use compact executive styling with accessible status indicators and strong numeric typography designed for comparison.",
          constraints: ["Do not infer KPI status, targets, trends, or reporting periods.", "Do not rely on color alone to communicate status."],
          exampleContent: "KPI Scorecard: ผลการดำเนินงานตัวชี้วัดงานสาธารณสุขปฐมภูมิ ไตรมาสที่ 4 เทียบค่าเป้าหมายรายอำเภอ จังหวัดนราธิวาส",
          suggestedColorTheme: "น้ำเงินเข้ม-เขียว (ผลงาน ความสำเร็จ)",
        }),
        defineType({
          id: "geographic-disease-map", value: "Geographic Map / Disease Map", label: "แผนที่ข้อมูล / แผนที่โรค",
          textDensity: "medium", hierarchy: "map-pattern-first", safeArea: "7%",
          recommendedRatios: ["16:9", "A4 Landscape", "3:4"], requiredZones: ["accurate map", "legend", "geographic labels", "time period", "data source"],
          composition: "Center an accurate map with a readable legend, consistent geographic labels, declared time period, and clearly separated supporting statistics.",
          visualDirection: "Use accessible sequential or categorical map encoding, precise boundaries, and restrained contextual icons.",
          constraints: ["Do not fabricate or alter boundaries, district names, case counts, locations, or map data.", "Do not imply geographic precision beyond the supplied dataset."],
          exampleContent: "แผนที่ข้อมูล: การกระจายตัวของผู้ป่วยโรคไข้เลือดออกรายอำเภอ จังหวัดนราธิวาส ปี 2569",
          suggestedColorTheme: "ฟ้า-แดงอ่อน (แผนที่ ข้อมูลโรค)",
        }),
      ],
    },
    {
      label: "วิชาการและการนำเสนอ",
      types: [
        defineType({
          id: "presentation-slide", value: "Presentation Slide", label: "สไลด์นำเสนอ",
          textDensity: "low-medium", hierarchy: "single-message-first", safeArea: "7%",
          recommendedRatios: ["16:9", "4:3"], requiredZones: ["slide title", "single takeaway", "supporting visual or evidence", "source or footer"],
          composition: "Design one clear takeaway per slide with a strong title, concise evidence, large presentation-safe typography, and a consistent footer zone.",
          visualDirection: "Use a polished presentation system with deliberate alignment, simple visual storytelling, and enough negative space for projection.",
          constraints: ["Do not produce a document-like wall of text.", "Do not invent evidence, speaker names, dates, or slide numbers."],
          exampleContent: "สไลด์นำเสนอ: ผลการดำเนินงานตามนโยบาย 3 หมอ ประจำปีงบประมาณ 2569 จังหวัดนราธิวาส",
          suggestedColorTheme: "น้ำเงิน-ทอง (เป็นทางการ นำเสนอ)",
        }),
        defineType({
          id: "research-poster", value: "Research Poster", label: "โปสเตอร์วิชาการ",
          textDensity: "high", hierarchy: "finding-first", safeArea: "6%",
          recommendedRatios: ["A0 Portrait", "A1 Portrait", "16:9"], requiredZones: ["title and authors", "background or objective", "method", "results", "conclusion", "references or contact"],
          composition: "Use a rigorous multi-column academic grid with the principal finding visible first, then objective, method, results, conclusion, and compact reference or contact zones.",
          visualDirection: "Balance scholarly density with readable charts, tables, and diagrams; keep the strongest evidence visually dominant at poster-viewing distance.",
          constraints: ["Do not fabricate authors, affiliations, methods, findings, citations, or statistical values.", "Do not shrink body text below practical poster readability."],
          exampleContent: "โปสเตอร์วิชาการ: ปัจจัยที่มีผลต่อการควบคุมระดับน้ำตาลในเลือดของผู้ป่วยเบาหวาน จังหวัดนราธิวาส",
          suggestedColorTheme: "น้ำเงินกรมท่า-ขาว (วิชาการ น่าเชื่อถือ)",
        }),
      ],
    },
    {
      label: "ประวัติและเอกลักษณ์หน่วยงาน",
      types: [
        defineType({
          id: "organization-history-infographic", value: "Organization History Infographic", label: "อินโฟกราฟิกประวัติหน่วยงาน/สถานศึกษา",
          textDensity: "high", hierarchy: "chronological-timeline-first", safeArea: "6%",
          recommendedRatios: ["A4 Portrait", "3:4"],
          requiredZones: [
            "emblem and header banner",
            "title and subtitle",
            "general information panel (name, location, affiliation, founding date, area, service/education level)",
            "founding background narrative with archival photo",
            "chronological development timeline with milestone photos",
            "key people profile cards",
            "past-and-present photo gallery",
            "current status summary with pull-quote callout",
            "footer tagline icon strip",
          ],
          composition: "Build a dense multi-section vertical infographic in this fixed order: an emblem/crest with header banner at top; a bold title and subtitle block; an icon-led general-information panel listing name, location, affiliation, founding date, area, and service/education level; a narrative history section paired with one archival photo; a horizontal chronological timeline of development milestones, each with a small photo and short caption; a row of key-people profile cards (photo, name, role, period); a past-vs-present photo gallery grid; a current-status summary paired with a pull-quote callout; and a footer strip of tagline icons.",
          visualDirection: "Use an ornate premium government/education visual system: a circular emblem or crest at the top, gold-bordered panel cards, floral corner ornaments, a cohesive teal/navy-and-gold (or COLOR_THEME-matched) color system, real photographic building and people imagery, and a clear left-to-right chronological flow for the timeline row.",
          constraints: [
            "Do not fabricate the organization name, founding date, location, area, headcount, or any named person shown in the people or photo sections unless supplied in CONTENT.",
            "Do not invent timeline milestone years, captions, or events beyond what CONTENT specifies.",
            "Keep every panel's text fully inside its own card — no overflow, clipping, or overlap across section borders.",
          ],
          exampleContent: "ประวัติโรงพยาบาลส่งเสริมสุขภาพตำบล — จากจุดเริ่มต้นสู่หน่วยบริการปฐมภูมิต้นแบบ จังหวัดนราธิวาส",
          suggestedColorTheme: "เขียวมรกต-ทอง (ทางการ สถาบัน)",
        }),
      ],
    },
    {
      label: "ปฏิทินและกำหนดการกิจกรรม",
      types: [
        defineType({
          id: "academic-calendar", value: "Academic Calendar / Events Calendar", label: "ปฏิทินงานวิชาการ/กิจกรรม",
          textDensity: "high", hierarchy: "month-grid-first", safeArea: "5%",
          recommendedRatios: ["A4 Portrait", "3:4"],
          requiredZones: [
            "emblem, flag, and header banner",
            "title block (calendar title, semester/term, academic year, organization name)",
            "motto tagline and small highlight callout",
            "monthly grid cards, each with a themed illustration and a numbered list of dated activities",
            "notes/remarks section",
            "activity goals section",
            "contact and follow-channel section (website, social handles, QR code)",
            "footer tagline banner",
          ],
          composition: "Design a dense multi-month calendar poster: emblem/flag header with title block and motto at top; a uniform grid of monthly cards (as many as CONTENT specifies) each carrying a month icon, month name, a themed illustrative scene, and a numbered list of dated activities; a notes/remarks panel and an activity-goals panel beneath the grid; a contact/follow-channel panel with website, social handles, and a QR code placeholder; and a closing tagline banner at the very bottom.",
          visualDirection: "Use a bright, cheerful, audience-friendly illustrated system: a mascot-framed header, vivid color blocks distinguishing each month card, rounded card borders, playful seasonal icons per month, and consistent friendly typography. Pairs well with a Chibi or Flat Illustration / Vector Art ART_STYLE.",
          constraints: [
            "Do not fabricate specific dates, activity names, organization name, website, or social handles beyond what CONTENT specifies.",
            "Keep each month card's activity list legible — do not overcrowd beyond what cleanly fits the card.",
            "Do not alter the number or order of months supplied in CONTENT.",
          ],
          exampleContent: "ปฏิทินงานวิชาการ ภาคเรียนที่ 2 ปีการศึกษา 2569 โรงเรียนสุขใจวิทยา — เดือนพฤศจิกายน 2569 ถึง มิถุนายน 2570",
          suggestedColorTheme: "รุ้งสดใสหลากสี (สดใส เป็นมิตร)",
        }),
      ],
    },
  ];

  const CONTENT_TYPES = Object.freeze(CONTENT_TYPE_GROUPS.flatMap((group) => group.types));
  const DEFAULT_CONTENT_TYPE = "Book / Report Cover";
  const LEGACY_CONTENT_TYPES = Object.freeze({
    Poster: "Public Health Poster",
    Infographic: "Infographic",
    "Dashboard / Data Visual": "Dashboard / Data Visual",
    "Certificate / Document Header": "Certificate",
  });

  function normalizeContentType(value) {
    const migrated = LEGACY_CONTENT_TYPES[value] || value;
    return CONTENT_TYPES.some((type) => type.value === migrated) ? migrated : DEFAULT_CONTENT_TYPE;
  }

  function getContentTypeProfile(value) {
    const normalized = normalizeContentType(value);
    return CONTENT_TYPES.find((type) => type.value === normalized) || CONTENT_TYPES[0];
  }

  function getExampleContent(value) {
    return getContentTypeProfile(value).exampleContent || "";
  }

  function getSuggestedColorTheme(value) {
    return getContentTypeProfile(value).suggestedColorTheme || "";
  }

  function buildContentTypeGuidance(value) {
    const profile = getContentTypeProfile(value);
    return {
      profile,
      configuration: `TEXT_DENSITY = "${profile.textDensity}"\nSAFE_AREA = "${profile.safeArea}"\nFORMAT_NOTE = "Common formats for this deliverable: ${profile.recommendedRatios.join(", ")}; the selected ASPECT_RATIO remains controlling"\nREQUIRED_ZONES = "${profile.requiredZones.join(" / ")}"`,
      composition: `${profile.composition} Use a ${profile.hierarchy} hierarchy, ${profile.textDensity} text density, and preserve a ${profile.safeArea} safe area. Required zones: ${profile.requiredZones.join(", ")}.`,
      visualDirection: profile.visualDirection,
      constraints: profile.constraints.join(" "),
    };
  }

  const api = Object.freeze({
    CONTENT_TYPE_GROUPS: Object.freeze(CONTENT_TYPE_GROUPS),
    CONTENT_TYPES,
    DEFAULT_CONTENT_TYPE,
    getContentTypeProfile,
    normalizeContentType,
    buildContentTypeGuidance,
    getExampleContent,
    getSuggestedColorTheme,
  });

  root.HealthPromptContentTypes = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(typeof globalThis !== "undefined" ? globalThis : window);
