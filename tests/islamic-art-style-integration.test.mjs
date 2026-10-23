import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const script = readFileSync(new URL("../script.js", import.meta.url), "utf8");

test("loads Islamic art style profiles before the application script", () => {
  const profilesIndex = html.indexOf('<script src="islamic-art-styles.js"></script>');
  const appIndex = html.indexOf('<script src="script.js"></script>');

  assert.ok(profilesIndex >= 0, "islamic-art-styles.js must be loaded by index.html");
  assert.ok(profilesIndex < appIndex, "islamic-art-styles.js must load before script.js");
});

test("renders the Islamic style group from shared profile data", () => {
  assert.match(script, /function renderIslamicArtStyleOptions\(\)/);
  assert.match(script, /ISLAMIC_ART_STYLE_GROUP/);
  assert.match(script, /option\.value = style\.value/);
  assert.match(script, /optgroup\.appendChild\(option\)/);
});

test("injects Islamic guidance into configuration, visual direction, and constraints", () => {
  assert.match(script, /buildIslamicArtStyleGuidance\(state\.artStyle, state\.includePeople\)/);
  assert.match(script, /\$\{islamicStyleGuidance\.configuration\}/);
  assert.match(script, /\$\{islamicStyleGuidance\.visualDirection\}/);
  assert.match(script, /\$\{islamicStyleGuidance\.constraints\}/);
});
