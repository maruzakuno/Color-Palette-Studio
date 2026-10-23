import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { readFileSync } from "node:fs";

class FakeElement {
  constructor(tagName = "div") {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.listeners = {};
    this.style = { setProperty() {} };
    this.classList = { toggle() {} };
    this.attributes = {};
    this.value = "";
    this.checked = false;
    this.hidden = false;
    this.textContent = "";
    this.dataset = {};
  }

  appendChild(child) { this.children.push(child); return child; }
  addEventListener(name, listener) { this.listeners[name] = listener; }
  setAttribute(name, value) { this.attributes[name] = value; }
  getAttribute(name) { return this.attributes[name] ?? null; }
  removeAttribute(name) { delete this.attributes[name]; }
  querySelector() { return new FakeElement("use"); }
  querySelectorAll() { return []; }
  scrollIntoView() {}
  focus() {}
  select() {}
  click() {}
  remove() {}
  set innerHTML(value) { this._innerHTML = value; if (value === "") this.children = []; }
  get innerHTML() { return this._innerHTML || ""; }
}

function bootApp() {
  const elements = new Map();
  const documentElement = new FakeElement("html");
  const documentListeners = {};
  const document = {
    documentElement,
    body: new FakeElement("body"),
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, new FakeElement());
      return elements.get(id);
    },
    createElement(tagName) { return new FakeElement(tagName); },
    querySelectorAll() { return []; },
    addEventListener(name, listener) { documentListeners[name] = listener; },
    execCommand() { return true; },
  };
  const storage = new Map();
  const context = vm.createContext({
    console,
    document,
    localStorage: {
      getItem(key) { return storage.get(key) ?? null; },
      setItem(key, value) { storage.set(key, value); },
    },
    matchMedia: () => ({ matches: false }),
    setTimeout,
    Blob,
    URL,
  });
  context.window = context;
  context.globalThis = context;
  context.window.addEventListener = () => {};
  context.window.matchMedia = () => ({ matches: false });
  context.window.scrollY = 0;

  const profiles = readFileSync(new URL("../content-types.js", import.meta.url), "utf8");
  const aspectRatios = readFileSync(new URL("../aspect-ratios.js", import.meta.url), "utf8");
  const islamicArtStyles = readFileSync(new URL("../islamic-art-styles.js", import.meta.url), "utf8");
  const app = readFileSync(new URL("../script.js", import.meta.url), "utf8");
  vm.runInContext(profiles, context, { filename: "content-types.js" });
  vm.runInContext(aspectRatios, context, { filename: "aspect-ratios.js" });
  vm.runInContext(islamicArtStyles, context, { filename: "islamic-art-styles.js" });
  vm.runInContext(app, context, { filename: "script.js" });
  documentListeners.DOMContentLoaded();
  return { elements };
}

test("boots with five groups and 24 selectable deliverable types", () => {
  const { elements } = bootApp();
  const select = elements.get("contentType");

  assert.equal(select.children.length, 7);
  assert.equal(select.children.flatMap((group) => group.children).length, 26);
  assert.equal(select.value, "Book / Report Cover");
});

test("changing deliverable type regenerates type-specific preview and prompt guidance", () => {
  const { elements } = bootApp();
  const select = elements.get("contentType");
  select.value = "Emergency Alert / Disease Advisory";
  select.listeners.change({ target: select });

  assert.equal(elements.get("previewType").textContent, "EMERGENCY ALERT / DISEASE ADVISORY");
  assert.match(elements.get("promptOutput").value, /understandable within three seconds/i);
  assert.match(elements.get("promptOutput").value, /Do not fabricate medical instructions/i);
});

test("boots with 20 grouped ratios and preserves the default ratio", () => {
  const { elements } = bootApp();
  const select = elements.get("aspectRatio");

  assert.equal(select.children.length, 5);
  assert.equal(select.children.flatMap((group) => group.children).length, 20);
  assert.equal(select.value, "3:4 (Portrait Cover)");
});

test("shows compatibility warnings and regenerates complete ratio guidance", () => {
  const { elements } = bootApp();
  const contentType = elements.get("contentType");
  const aspectRatio = elements.get("aspectRatio");

  contentType.value = "Research Poster";
  contentType.listeners.change({ target: contentType });
  aspectRatio.value = "9:16 (Story / Reel)";
  aspectRatio.listeners.change({ target: aspectRatio });

  assert.equal(elements.get("aspectRatioHint").dataset.status, "warning");
  assert.match(elements.get("aspectRatioHint").textContent, /A0 Portrait/);
  assert.match(elements.get("promptOutput").value, /CANVAS_SIZE = "1080 × 1920 px"/);
  assert.match(elements.get("promptOutput").value, /CROP_STRATEGY/);
  assert.match(elements.get("promptOutput").value, /EXPORT_PROFILE/);
});

test("adds nine Islamic styles and applies Narathiwat-specific cultural guidance", () => {
  const { elements } = bootApp();
  const artStyle = elements.get("artStyle");
  const islamicGroup = artStyle.children.at(-1);

  assert.equal(islamicGroup.label, "8. กลุ่มอิสลามและมลายูมุสลิม (Islamic & Malay-Muslim)");
  assert.equal(islamicGroup.children.length, 9);
  assert.equal(islamicGroup.children[1].value, "Malay-Muslim Narathiwat Heritage");

  artStyle.value = "Malay-Muslim Narathiwat Heritage";
  artStyle.listeners.change({ target: artStyle });

  const prompt = elements.get("promptOutput").value;
  assert.match(prompt, /Thai Malay-Muslim communities of Narathiwat/);
  assert.match(prompt, /Southern Thailand/);
  assert.match(prompt, /hijab or tudung/i);
  assert.match(prompt, /pseudo-Arabic\/Jawi gibberish/i);
});

test("non-figurative Islamic style overrides the people checkbox", () => {
  const { elements } = bootApp();
  const artStyle = elements.get("artStyle");
  const includePeople = elements.get("includePeople");

  includePeople.checked = true;
  artStyle.value = "Non-Figurative Islamic Sacred-Safe";
  artStyle.listeners.change({ target: artStyle });

  const prompt = elements.get("promptOutput").value;
  assert.match(prompt, /No human or animal figures/);
  assert.doesNotMatch(prompt, /Include authentic Thai healthcare professionals/);
});
