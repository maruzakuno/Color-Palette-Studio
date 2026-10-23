import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const script = readFileSync(new URL("../script.js", import.meta.url), "utf8");

test("loads aspect ratio profiles before the application script", () => {
  const profilesIndex = html.indexOf('<script src="aspect-ratios.js"></script>');
  const appIndex = html.indexOf('<script src="script.js"></script>');

  assert.ok(profilesIndex >= 0, "aspect-ratios.js must be loaded by index.html");
  assert.ok(profilesIndex < appIndex, "aspect-ratios.js must load before script.js");
});

test("provides a live recommendation status beside the ratio selector", () => {
  assert.match(html, /id="aspectRatioHint"/);
  assert.match(script, /function renderAspectRatioOptions\(\)/);
  assert.match(script, /function renderAspectRatioHint\(\)/);
  assert.match(script, /ASPECT_RATIO_GROUPS/);
});

test("normalizes saved ratios and injects the shared guidance into the prompt", () => {
  assert.match(script, /state\.aspectRatio = normalizeAspectRatio\(state\.aspectRatio\)/);
  assert.match(script, /buildAspectRatioGuidance\(state\.aspectRatio\)/);
  assert.match(script, /\$\{ratioGuidance\.configuration\}/);
});
