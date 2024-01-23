import { JSDOM } from "jsdom";

const dom = new JSDOM();
global.document = dom.window.document;

const script = global.document.createElement("script");
script.setAttribute("src", "/");

const currentScript = { value: script, configurable: true };
Object.defineProperty(global.document, "currentScript", currentScript);
