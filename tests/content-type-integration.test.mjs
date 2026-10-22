import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const script = readFileSync(new URL("../script.js", import.meta.url), "utf8");

test("loads content type profiles before the application script", () => {
  const profilesIndex = html.indexOf('<script src="content-types.js"></script>');
  const appIndex = html.indexOf('<script src="script.js"></script>');

  assert.ok(profilesIndex >= 0, "content-types.js must be loaded by index.html");
  assert.ok(profilesIndex < appIndex, "content-types.js must load before script.js");
});

test("renders grouped content type options from the shared profile data", () => {
  assert.match(script, /function renderContentTypeOptions\(\)/);
  assert.match(script, /CONTENT_TYPE_GROUPS/);
  assert.match(script, /document\.createElement\("optgroup"\)/);
  assert.match(script, /document\.createElement\("option"\)/);
});

test("injects adaptive type guidance into configuration, composition, visuals, and constraints", () => {
  assert.match(script, /buildContentTypeGuidance\(state\.contentType\)/);
  assert.match(script, /\$\{typeGuidance\.configuration\}/);
  assert.match(script, /\$\{typeGuidance\.composition\}/);
  assert.match(script, /\$\{typeGuidance\.visualDirection\}/);
  assert.match(script, /\$\{typeGuidance\.constraints\}/);
});

test("normalizes legacy localStorage values before restoring the form", () => {
  assert.match(script, /state\.contentType = normalizeContentType\(state\.contentType\)/);
});
