import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

const moduleUrl = new URL("../islamic-art-styles.js", import.meta.url);
if (existsSync(moduleUrl)) {
  await import(`${moduleUrl.href}?test=${Date.now()}`);
}

const api = globalThis.HealthPromptIslamicArtStyles || {};
const {
  ISLAMIC_ART_STYLE_GROUP = { styles: [] },
  ISLAMIC_ART_STYLES = [],
  getIslamicArtStyleProfile = () => null,
  buildIslamicArtStyleGuidance = () => null,
} = api;

test("exposes nine Islamic and Malay-Muslim styles", () => {
  assert.equal(ISLAMIC_ART_STYLE_GROUP.label, "8. กลุ่มอิสลามและมลายูมุสลิม (Islamic & Malay-Muslim)");
  assert.equal(ISLAMIC_ART_STYLES.length, 9);
  assert.equal(ISLAMIC_ART_STYLE_GROUP.styles.length, 9);
  assert.equal(new Set(ISLAMIC_ART_STYLES.map((style) => style.value)).size, 9);
});

test("every Islamic style contains complete cultural-safety metadata", () => {
  for (const style of ISLAMIC_ART_STYLES) {
    assert.ok(style.id, `${style.value} is missing id`);
    assert.ok(style.label, `${style.value} is missing label`);
    assert.ok(style.culturalContext, `${style.value} is missing cultural context`);
    assert.ok(style.motifs.length > 0, `${style.value} is missing motifs`);
    assert.ok(style.modestyStandard, `${style.value} is missing modesty standard`);
    assert.ok(style.figurePolicy, `${style.value} is missing figure policy`);
    assert.ok(style.sacredTextPolicy, `${style.value} is missing sacred text policy`);
    assert.ok(style.visualDirection, `${style.value} is missing visual direction`);
    assert.ok(style.constraints.length > 0, `${style.value} is missing constraints`);
  }
});

test("Narathiwat heritage guidance prioritizes local Malay-Muslim identity", () => {
  const guidance = buildIslamicArtStyleGuidance("Malay-Muslim Narathiwat Heritage", true);

  assert.match(guidance.configuration, /Thai Malay-Muslim communities of Narathiwat/i);
  assert.match(guidance.visualDirection, /Southern Thailand/i);
  assert.match(guidance.constraints, /generic Gulf or Arab stereotypes/i);
  assert.match(guidance.peopleDirection, /hijab|tudung/i);
});

test("all Islamic guidance blocks prohibit fabricated sacred text and disrespectful placement", () => {
  for (const style of ISLAMIC_ART_STYLES) {
    const guidance = buildIslamicArtStyleGuidance(style.value, true);
    assert.match(guidance.constraints, /Do not fabricate Qur'anic verses/i);
    assert.match(guidance.constraints, /floor, footwear, clothing, disposable items, or medical waste/i);
    assert.match(guidance.constraints, /pseudo-Arabic/i);
  }
});

test("non-figurative sacred-safe style overrides the people checkbox", () => {
  const guidance = buildIslamicArtStyleGuidance("Non-Figurative Islamic Sacred-Safe", true);

  assert.match(guidance.peopleDirection, /No human or animal figures/i);
});

test("ordinary art styles remain outside Islamic-specific guidance", () => {
  assert.equal(getIslamicArtStyleProfile("Photorealistic"), null);
  assert.equal(buildIslamicArtStyleGuidance("Photorealistic", true), null);
});
