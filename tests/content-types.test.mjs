import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";

const moduleUrl = new URL("../content-types.js", import.meta.url);
if (existsSync(moduleUrl)) {
  await import(`${moduleUrl.href}?test=${Date.now()}`);
}

const api = globalThis.HealthPromptContentTypes || {};
const {
  CONTENT_TYPE_GROUPS = [],
  CONTENT_TYPES = [],
  DEFAULT_CONTENT_TYPE,
  getContentTypeProfile = () => ({}),
  normalizeContentType = () => undefined,
  buildContentTypeGuidance = () => ({}),
} = api;

test("exposes the approved 26 deliverable types in grouped order", () => {
  assert.equal(CONTENT_TYPES.length, 26);
  assert.deepEqual(
    CONTENT_TYPE_GROUPS.map((group) => group.label),
    [
      "เอกสารและสิ่งพิมพ์ราชการ",
      "ประชาสัมพันธ์และรณรงค์",
      "ความรู้และการสื่อสารสุขภาพ",
      "ข้อมูล สถิติ และการบริหาร",
      "วิชาการและการนำเสนอ",
      "ประวัติและเอกลักษณ์หน่วยงาน",
      "ปฏิทินและกำหนดการกิจกรรม",
    ],
  );
  assert.equal(new Set(CONTENT_TYPES.map((type) => type.value)).size, 26);
  assert.equal(DEFAULT_CONTENT_TYPE, "Book / Report Cover");
});

test("every deliverable type has complete adaptive prompt metadata", () => {
  for (const type of CONTENT_TYPES) {
    assert.ok(type.id, `${type.value} is missing id`);
    assert.ok(type.label, `${type.value} is missing label`);
    assert.ok(type.textDensity, `${type.value} is missing textDensity`);
    assert.ok(type.hierarchy, `${type.value} is missing hierarchy`);
    assert.match(type.safeArea, /%/, `${type.value} safeArea must be explicit`);
    assert.ok(type.recommendedRatios.length > 0, `${type.value} is missing ratios`);
    assert.ok(type.requiredZones.length > 0, `${type.value} is missing required zones`);
    assert.ok(type.visualDirection, `${type.value} is missing visual direction`);
    assert.ok(type.constraints.length > 0, `${type.value} is missing constraints`);
  }
});

test("emergency alerts generate urgency-specific composition and safety guidance", () => {
  const profile = getContentTypeProfile("Emergency Alert / Disease Advisory");
  const guidance = buildContentTypeGuidance(profile.value);

  assert.equal(profile.hierarchy, "urgent-headline-first");
  assert.match(guidance.composition, /three seconds/i);
  assert.match(guidance.visualDirection, /high contrast/i);
  assert.match(guidance.constraints, /Do not fabricate medical instructions/i);
});

test("legacy saved content types migrate to the closest new deliverable", () => {
  assert.equal(normalizeContentType("Poster"), "Public Health Poster");
  assert.equal(normalizeContentType("Infographic"), "Infographic");
  assert.equal(normalizeContentType("Dashboard / Data Visual"), "Dashboard / Data Visual");
  assert.equal(normalizeContentType("Certificate / Document Header"), "Certificate");
  assert.equal(normalizeContentType("unknown type"), DEFAULT_CONTENT_TYPE);
});

test("unknown guidance falls back to the default deliverable profile", () => {
  assert.deepEqual(
    buildContentTypeGuidance("unknown type"),
    buildContentTypeGuidance(DEFAULT_CONTENT_TYPE),
  );
});

test("type guidance never overrides the aspect ratio explicitly selected by the user", () => {
  const guidance = buildContentTypeGuidance("Website Hero Banner");

  assert.match(guidance.configuration, /selected ASPECT_RATIO remains controlling/i);
});
