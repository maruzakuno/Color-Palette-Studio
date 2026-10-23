import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

const moduleUrl = new URL("../aspect-ratios.js", import.meta.url);
if (existsSync(moduleUrl)) {
  await import(`${moduleUrl.href}?test=${Date.now()}`);
}

const api = globalThis.HealthPromptAspectRatios || {};
const {
  ASPECT_RATIO_GROUPS = [],
  ASPECT_RATIOS = [],
  DEFAULT_ASPECT_RATIO,
  normalizeAspectRatio = () => undefined,
  getAspectRatioProfile = () => ({}),
  getAspectRatioCompatibility = () => ({}),
  buildAspectRatioGuidance = () => ({}),
} = api;

test("exposes the approved 20 aspect ratios in five workflow groups", () => {
  assert.equal(ASPECT_RATIOS.length, 20);
  assert.deepEqual(
    ASPECT_RATIO_GROUPS.map((group) => group.label),
    ["Social Media", "ทั่วไปและงาน Editorial", "Presentation และหน้าจอ", "สิ่งพิมพ์", "ป้ายและงานอีเวนต์"],
  );
  assert.equal(new Set(ASPECT_RATIOS.map((ratio) => ratio.value)).size, 20);
  assert.equal(DEFAULT_ASPECT_RATIO, "3:4 (Portrait Cover)");
});

test("every ratio contains complete canvas and layout metadata", () => {
  for (const ratio of ASPECT_RATIOS) {
    assert.ok(ratio.id, `${ratio.value} is missing id`);
    assert.ok(ratio.label, `${ratio.value} is missing label`);
    assert.ok(ratio.resolution, `${ratio.value} is missing resolution`);
    assert.ok(ratio.orientation, `${ratio.value} is missing orientation`);
    assert.deepEqual(Object.keys(ratio.safeArea).sort(), ["bottom", "left", "right", "top"]);
    assert.ok(ratio.bleed, `${ratio.value} is missing bleed`);
    assert.ok(ratio.focalZone, `${ratio.value} is missing focal zone`);
    assert.ok(ratio.textScale, `${ratio.value} is missing text scale`);
    assert.ok(ratio.cropStrategy, `${ratio.value} is missing crop strategy`);
    assert.ok(ratio.exportProfile, `${ratio.value} is missing export profile`);
    assert.ok(ratio.recommendedFor.length > 0, `${ratio.value} is missing recommendations`);
  }
});

test("migrates all five legacy dropdown values", () => {
  assert.equal(normalizeAspectRatio("3:4 (Portrait Cover)"), "3:4 (Portrait Cover)");
  assert.equal(normalizeAspectRatio("1:1 (Square)"), "1:1 (Square Social)");
  assert.equal(normalizeAspectRatio("16:9 (Widescreen)"), "16:9 (Widescreen)");
  assert.equal(normalizeAspectRatio("9:16 (Vertical Social)"), "9:16 (Story / Reel)");
  assert.equal(normalizeAspectRatio("A4 Portrait (210:297)"), "A4 Portrait (210:297)");
  assert.equal(normalizeAspectRatio("unknown"), DEFAULT_ASPECT_RATIO);
});

test("recommends vertical social for alerts and warns when research posters use it", () => {
  const recommended = getAspectRatioCompatibility("Emergency Alert / Disease Advisory", "9:16 (Story / Reel)");
  const warning = getAspectRatioCompatibility("Research Poster", "9:16 (Story / Reel)");

  assert.equal(recommended.isRecommended, true);
  assert.equal(warning.isRecommended, false);
  assert.match(warning.message, /A0 Portrait/);
  assert.ok(warning.recommendedValues.includes("A1 Portrait (594:841)"));
});

test("builds complete prompt guidance without changing the selected ratio", () => {
  const guidance = buildAspectRatioGuidance("17:40 (85 × 200 cm Roll-up)");

  assert.equal(guidance.profile.value, "17:40 (85 × 200 cm Roll-up)");
  assert.match(guidance.configuration, /CANVAS_SIZE/);
  assert.match(guidance.configuration, /ORIENTATION/);
  assert.match(guidance.configuration, /SAFE_AREA/);
  assert.match(guidance.configuration, /CROP_STRATEGY/);
  assert.match(guidance.configuration, /EXPORT_PROFILE/);
  assert.match(guidance.configuration, /bottom/i);
});

test("unknown guidance falls back to the default ratio", () => {
  assert.deepEqual(getAspectRatioProfile("unknown"), getAspectRatioProfile(DEFAULT_ASPECT_RATIO));
});
