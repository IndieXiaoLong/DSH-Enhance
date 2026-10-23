window.__ModuleLoader__.load({
  id: "dsh-enhance",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);
var import_react6 = require("react");

// src/client/locales.ts
var NS = "dsh-enhance";
var en = {
  "panel.title": "DSH Enhance",
  "panel.subtitle": "Conversation tools",
  "panel.width": "Conversation width",
  "panel.widthHint": "{value}rem \xB7 drag between 38 and 90rem",
  "panel.widthReset": "Reset to 48rem",
  "panel.timeline": "Message timeline",
  "panel.timelineHint": "Show the fixed rail on the right",
  "panel.hideNativeTurnNav": "Hide native turn navigation",
  "panel.hideNativeTurnNavHint": "Hide the horizontal turn rail DSH draws on the right",
  "panel.folders": "Conversation folders",
  "panel.foldersHint": "{folders} folders \xB7 {filed} filed conversations",
  "panel.hideFiled": "Hide filed conversations",
  "panel.hideFiledHint": "Keep organized chats out of the native session list",
  "panel.showStrip": "Show folder bar in sidebar",
  "panel.nameNewSession": "Name new conversations",
  "panel.nameNewSessionHint": "Ask for a title when starting from a workspace +",
  "panel.close": "Close",
  "panel.resetBall": "Reset floating button position",
  "panel.version": "dsh-enhance v{version}",
  "folder.title": "Folders",
  "folder.new": "New folder",
  "folder.name": "Folder name",
  "folder.create": "Create",
  "folder.cancel": "Cancel",
  "folder.save": "Save",
  "folder.rename": "Rename",
  "folder.delete": "Delete",
  "folder.deleteConfirm": "Delete folder \u201C{name}\u201D? Conversations inside become unfiled.",
  "folder.empty": "No folders yet",
  "folder.emptyHint": "Create one, then drag a conversation onto it.",
  "folder.unfiled": "Unfiled",
  "folder.dropHere": "Drop conversations here",
  "folder.filed": "{count} filed",
  "folder.remove": "Remove from folder",
  "folder.open": "Open conversation",
  "folder.collapse": "Collapse folders",
  "folder.expand": "Expand folders",
  "folder.noSessions": "No conversations in this folder",
  "folder.more": "More actions",
  "folder.stripHint": "Drag a conversation onto a folder",
  "timeline.label": "Conversation timeline",
  "timeline.collapse": "Hide timeline",
  "timeline.expand": "Show timeline",
  "timeline.top": "Jump to first message",
  "timeline.bottom": "Jump to last message",
  "timeline.user": "You",
  "timeline.turn": "Turn {turn}",
  "timeline.empty": "No messages yet",
  "newSession.title": "Name new conversation",
  "newSession.subtitle": "Create a conversation in \u201C{workspace}\u201D",
  "newSession.name": "Conversation name",
  "newSession.placeholder": "e.g. Fix the login flow",
  "newSession.hint": "The name is saved as the conversation title; you can rename it later.",
  "newSession.skip": "Skip naming",
  "newSession.cancel": "Cancel",
  "newSession.create": "Create conversation",
  "newSession.creating": "Creating\u2026",
  "newSession.failed": "Could not create the conversation: {message}",
  "newSession.renameFailed": "Conversation created, but naming failed: {message}",
  "fileDrag.dropHint": "Drop to reference {name}",
  "fileDrag.noSession": "Open a conversation before dropping a file into the composer",
  "fileDrag.unsupported": "This path contains characters a reference cannot carry",
  "fileDrag.locked": "The composer cannot accept a file reference right now",
  "fileDrag.failed": "Could not add the file reference: {message}",
  "edit.cta": "Edit & resend",
  "edit.title": "Edit the last prompt",
  "edit.placeholder": "Edit the prompt\u2026",
  "edit.attachments": "Attachments from the original message are not resent.",
  "edit.send": "Send",
  "edit.sending": "Sending\u2026",
  "edit.cancel": "Cancel",
  "edit.empty": "The prompt cannot be empty",
  "edit.running": "Stop the running turn before editing",
  "edit.noWorkspace": "Could not determine the target workspace",
  "edit.done": "Edited and resent; the original conversation is archived",
  "edit.doneKept": "Edited and resent; the original conversation was kept",
  "edit.failed": "Could not edit and resend: {message}",
  "common.untitled": "Untitled",
  "common.justNow": "just now"
};
var zh = {
  "panel.title": "DSH Enhance",
  "panel.subtitle": "\u5BF9\u8BDD\u589E\u5F3A\u5DE5\u5177",
  "panel.width": "\u5BF9\u8BDD\u5BBD\u5EA6",
  "panel.widthHint": "{value}rem \xB7 \u53EF\u5728 38\u201390rem \u4E4B\u95F4\u8C03\u6574",
  "panel.widthReset": "\u6062\u590D\u9ED8\u8BA4 48rem",
  "panel.timeline": "\u6D88\u606F\u65F6\u95F4\u7EBF",
  "panel.timelineHint": "\u5728\u53F3\u4FA7\u663E\u793A\u56FA\u5B9A\u65F6\u95F4\u7EBF\u5BFC\u822A",
  "panel.hideNativeTurnNav": "\u9690\u85CF\u539F\u751F\u8F6E\u6B21\u5BFC\u822A",
  "panel.hideNativeTurnNavHint": "\u9690\u85CF DSH \u53F3\u4FA7\u81EA\u5E26\u7684\u6A2A\u6761\u8F6E\u6B21\u5BFC\u822A",
  "panel.folders": "\u5BF9\u8BDD\u6587\u4EF6\u5939",
  "panel.foldersHint": "{folders} \u4E2A\u6587\u4EF6\u5939 \xB7 \u5DF2\u5F52\u6863 {filed} \u4E2A\u5BF9\u8BDD",
  "panel.hideFiled": "\u4ECE\u539F\u751F\u5217\u8868\u9690\u85CF\u5DF2\u5F52\u6863\u5BF9\u8BDD",
  "panel.hideFiledHint": "\u8BA9\u6574\u7406\u8FC7\u7684\u5BF9\u8BDD\u4E0D\u518D\u6324\u5728\u5386\u53F2\u8BB0\u5F55\u91CC",
  "panel.showStrip": "\u5728\u4FA7\u8FB9\u680F\u663E\u793A\u6587\u4EF6\u5939\u680F",
  "panel.nameNewSession": "\u65B0\u5EFA\u5BF9\u8BDD\u65F6\u547D\u540D",
  "panel.nameNewSessionHint": "\u70B9\u51FB\u5DE5\u4F5C\u533A\u201C+\u201D\u65F6\u5148\u8F93\u5165\u5BF9\u8BDD\u540D\u79F0",
  "panel.close": "\u5173\u95ED",
  "panel.resetBall": "\u91CD\u7F6E\u60AC\u6D6E\u7403\u4F4D\u7F6E",
  "panel.version": "dsh-enhance v{version}",
  "folder.title": "\u6587\u4EF6\u5939",
  "folder.new": "\u65B0\u5EFA\u6587\u4EF6\u5939",
  "folder.name": "\u6587\u4EF6\u5939\u540D\u79F0",
  "folder.create": "\u521B\u5EFA",
  "folder.cancel": "\u53D6\u6D88",
  "folder.save": "\u4FDD\u5B58",
  "folder.rename": "\u91CD\u547D\u540D",
  "folder.delete": "\u5220\u9664",
  "folder.deleteConfirm": "\u5220\u9664\u6587\u4EF6\u5939\u201C{name}\u201D\uFF1F\u5176\u4E2D\u7684\u5BF9\u8BDD\u4F1A\u56DE\u5230\u672A\u5F52\u6863\u72B6\u6001\u3002",
  "folder.empty": "\u8FD8\u6CA1\u6709\u6587\u4EF6\u5939",
  "folder.emptyHint": "\u65B0\u5EFA\u4E00\u4E2A\uFF0C\u7136\u540E\u628A\u5BF9\u8BDD\u62D6\u5230\u5B83\u4E0A\u9762\u3002",
  "folder.unfiled": "\u672A\u5F52\u6863",
  "folder.dropHere": "\u628A\u5BF9\u8BDD\u62D6\u5230\u8FD9\u91CC",
  "folder.filed": "\u5DF2\u5F52\u6863 {count} \u4E2A",
  "folder.remove": "\u79FB\u51FA\u6587\u4EF6\u5939",
  "folder.open": "\u6253\u5F00\u5BF9\u8BDD",
  "folder.collapse": "\u6536\u8D77\u6587\u4EF6\u5939",
  "folder.expand": "\u5C55\u5F00\u6587\u4EF6\u5939",
  "folder.noSessions": "\u8FD9\u4E2A\u6587\u4EF6\u5939\u91CC\u8FD8\u6CA1\u6709\u5BF9\u8BDD",
  "folder.more": "\u66F4\u591A\u64CD\u4F5C",
  "folder.stripHint": "\u62D6\u52A8\u5BF9\u8BDD\u5230\u6587\u4EF6\u5939\u5373\u53EF\u6574\u7406",
  "timeline.label": "\u5BF9\u8BDD\u65F6\u95F4\u7EBF",
  "timeline.collapse": "\u9690\u85CF\u65F6\u95F4\u7EBF",
  "timeline.expand": "\u663E\u793A\u65F6\u95F4\u7EBF",
  "timeline.top": "\u8DF3\u5230\u7B2C\u4E00\u6761\u6D88\u606F",
  "timeline.bottom": "\u8DF3\u5230\u6700\u540E\u4E00\u6761\u6D88\u606F",
  "timeline.user": "\u4F60",
  "timeline.turn": "\u7B2C {turn} \u8F6E",
  "timeline.empty": "\u8FD8\u6CA1\u6709\u6D88\u606F",
  "newSession.title": "\u547D\u540D\u65B0\u5BF9\u8BDD",
  "newSession.subtitle": "\u5728\u201C{workspace}\u201D\u4E2D\u521B\u5EFA\u5BF9\u8BDD",
  "newSession.name": "\u5BF9\u8BDD\u540D\u79F0",
  "newSession.placeholder": "\u4F8B\u5982\uFF1A\u4FEE\u590D\u767B\u5F55\u95EE\u9898",
  "newSession.hint": "\u540D\u79F0\u4F1A\u7ACB\u5373\u4FDD\u5B58\u4E3A\u5BF9\u8BDD\u6807\u9898\uFF0C\u4E4B\u540E\u4ECD\u53EF\u968F\u65F6\u91CD\u547D\u540D\u3002",
  "newSession.skip": "\u8DF3\u8FC7\u547D\u540D",
  "newSession.cancel": "\u53D6\u6D88",
  "newSession.create": "\u521B\u5EFA\u5BF9\u8BDD",
  "newSession.creating": "\u521B\u5EFA\u4E2D\u2026",
  "newSession.failed": "\u521B\u5EFA\u5BF9\u8BDD\u5931\u8D25\uFF1A{message}",
  "newSession.renameFailed": "\u5BF9\u8BDD\u5DF2\u521B\u5EFA\uFF0C\u4F46\u547D\u540D\u5931\u8D25\uFF1A{message}",
  "fileDrag.dropHint": "\u677E\u5F00\u4EE5\u5F15\u7528 {name}",
  "fileDrag.noSession": "\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u5BF9\u8BDD\uFF0C\u518D\u628A\u6587\u4EF6\u62D6\u8FDB\u8F93\u5165\u6846",
  "fileDrag.unsupported": "\u8FD9\u4E2A\u8DEF\u5F84\u5305\u542B\u65E0\u6CD5\u5199\u5165\u6587\u4EF6\u5F15\u7528\u7684\u5B57\u7B26",
  "fileDrag.locked": "\u5F53\u524D\u65E0\u6CD5\u63D2\u5165\u6587\u4EF6\u5F15\u7528\uFF0C\u8BF7\u7B49\u8F93\u5165\u6846\u7A7A\u95F2\u540E\u91CD\u8BD5",
  "fileDrag.failed": "\u65E0\u6CD5\u63D2\u5165\u6587\u4EF6\u5F15\u7528\uFF1A{message}",
  "edit.cta": "\u7F16\u8F91\u5E76\u91CD\u53D1",
  "edit.title": "\u7F16\u8F91\u4E0A\u4E00\u6761\u63D0\u793A\u8BCD",
  "edit.placeholder": "\u4FEE\u6539\u63D0\u793A\u8BCD\u2026",
  "edit.attachments": "\u539F\u6D88\u606F\u4E2D\u7684\u9644\u4EF6\u4E0D\u4F1A\u968F\u7F16\u8F91\u91CD\u53D1\u3002",
  "edit.send": "\u53D1\u9001",
  "edit.sending": "\u53D1\u9001\u4E2D\u2026",
  "edit.cancel": "\u53D6\u6D88",
  "edit.empty": "\u63D0\u793A\u8BCD\u4E0D\u80FD\u4E3A\u7A7A",
  "edit.running": "\u5BF9\u8BDD\u6B63\u5728\u8FD0\u884C\uFF0C\u8BF7\u5148\u505C\u6B62\u518D\u7F16\u8F91",
  "edit.noWorkspace": "\u65E0\u6CD5\u786E\u5B9A\u76EE\u6807\u5DE5\u4F5C\u533A",
  "edit.done": "\u5DF2\u7F16\u8F91\u5E76\u91CD\u53D1\uFF1B\u539F\u5BF9\u8BDD\u5DF2\u5F52\u6863",
  "edit.doneKept": "\u5DF2\u7F16\u8F91\u5E76\u91CD\u53D1\uFF1B\u539F\u5BF9\u8BDD\u672A\u5F52\u6863",
  "edit.failed": "\u7F16\u8F91\u91CD\u53D1\u5931\u8D25\uFF1A{message}",
  "common.untitled": "\u672A\u547D\u540D",
  "common.justNow": "\u521A\u521A"
};

// src/client/styles.css
var styles_default = `/* dsh-enhance \u2014 folder strip, timeline rail, floating tools, export menu. */

.dsh-enhance-sidebar-mount {
  display: block;
  margin: 6px 8px 2px;
  font-family: inherit;
}

/* \u2500\u2500 Sidebar folder strip \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.dsh-fx-strip {
  --dsh-fx-border: var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.24));
  --dsh-fx-text: var(--dsw-alias-label-primary, #1f2328);
  --dsh-fx-muted: var(--dsw-alias-label-tertiary, #6b7280);
  --dsh-fx-hover: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.1));
  border: 1px solid var(--dsh-fx-border);
  border-radius: 10px;
  background: color-mix(in srgb, var(--dsw-alias-bg-base, #fff) 72%, transparent);
  padding: 5px 6px 6px;
  color: var(--dsh-fx-text);
  font-size: 12px;
  line-height: 1.35;
  box-sizing: border-box;
}

.dsh-fx-strip *,
.dsh-fx-panel *,
.dsh-fx-timeline * {
  box-sizing: border-box;
}

.dsh-fx-strip-head {
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 22px;
}

.dsh-fx-strip-title {
  font-weight: 600;
  letter-spacing: 0.01em;
}

.dsh-fx-strip-count {
  min-width: 16px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--dsh-fx-hover);
  color: var(--dsh-fx-muted);
  font-size: 10px;
  line-height: 16px;
  text-align: center;
}

.dsh-fx-strip-head .dsh-fx-icon-button:last-child {
  margin-left: auto;
}

.dsh-fx-icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--dsh-fx-muted, var(--dsw-alias-label-tertiary, #6b7280));
  cursor: pointer;
}

.dsh-fx-icon-button:hover {
  background: var(--dsh-fx-hover, var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.1)));
  color: var(--dsh-fx-text, var(--dsw-alias-label-primary, #1f2328));
}

.dsh-fx-strip-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.dsh-fx-inline-form {
  display: flex;
  gap: 4px;
  align-items: center;
}

.dsh-fx-input {
  min-width: 0;
  flex: 1;
  height: 26px;
  padding: 0 7px;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.3));
  border-radius: 6px;
  background: var(--dsw-alias-bg-base, #fff);
  color: var(--dsw-alias-label-primary, #1f2328);
  font: inherit;
  outline: none;
}

.dsh-fx-input:focus {
  border-color: var(--dsw-alias-state-business-primary, #4d6bfe);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 22%, transparent);
}

.dsh-fx-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  height: 26px;
  padding: 0 9px;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.3));
  border-radius: 6px;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
}

.dsh-fx-button:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.1));
}

.dsh-fx-button:disabled {
  opacity: 0.45;
  cursor: default;
}

.dsh-fx-button.is-primary {
  border-color: transparent;
  background: var(--dsw-alias-state-business-primary, #4d6bfe);
  color: #fff;
}

.dsh-fx-button.is-primary:hover:not(:disabled) {
  filter: brightness(1.05);
  background: var(--dsw-alias-state-business-primary, #4d6bfe);
}

.dsh-fx-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.dsh-fx-chip {
  --dsh-fx-color: var(--dsw-alias-state-business-primary, #5b8def);
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  max-width: 100%;
  height: 24px;
  padding: 0 5px 0 6px;
  border: 1px solid transparent;
  border-radius: 7px;
  background: color-mix(in srgb, var(--dsh-fx-color) 9%, transparent);
  color: var(--dsw-alias-label-secondary, #4b5563);
  font: inherit;
  cursor: pointer;
  user-select: none;
  transition: border-color 120ms ease, background 120ms ease;
}

.dsh-fx-chip-main {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.dsh-fx-chip:hover,
.dsh-fx-chip.is-active {
  border-color: color-mix(in srgb, var(--dsh-fx-color) 45%, transparent);
  background: color-mix(in srgb, var(--dsh-fx-color) 15%, transparent);
}

.dsh-fx-chip.is-over {
  border-color: var(--dsh-fx-color);
  background: color-mix(in srgb, var(--dsh-fx-color) 26%, transparent);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsh-fx-color) 22%, transparent);
}

.dsh-fx-chip.is-unfiled {
  --dsh-fx-color: var(--dsw-alias-label-tertiary, #6b7280);
}

.dsh-fx-chip-dot {
  width: 7px;
  height: 7px;
  border-radius: 2px;
  flex: none;
  background: var(--dsh-fx-color);
}

.dsh-fx-chip-name {
  max-width: 118px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11.5px;
}

.dsh-fx-chip-count {
  color: var(--dsw-alias-label-caption, #9ca3af);
  font-size: 10px;
  font-variant-numeric: tabular-nums;
}

.dsh-fx-chip-more {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  margin-left: 1px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.55;
}

.dsh-fx-chip:hover .dsh-fx-chip-more,
.dsh-fx-chip-more:focus-visible {
  opacity: 1;
}

.dsh-fx-chip-more:hover {
  background: color-mix(in srgb, currentColor 12%, transparent);
}

.dsh-fx-folder-menu {
  position: absolute;
  z-index: 90;
  top: calc(100% + 4px);
  right: 0;
  min-width: 132px;
  padding: 4px;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.28));
  border-radius: 8px;
  background: var(--dsw-alias-bg-layer-1, #fff);
  box-shadow: var(--dsw-elevation-panel, 0 8px 24px rgba(0, 0, 0, 0.16));
}

.dsh-fx-folder-menu button {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 28px;
  padding: 0 8px;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: var(--dsw-alias-label-primary, #1f2328);
  font: inherit;
  font-size: 12px;
  text-align: left;
  cursor: pointer;
}

.dsh-fx-folder-menu button:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.1));
}

.dsh-fx-folder-menu button.is-danger {
  color: var(--dsw-alias-state-error-primary, #dc2626);
}

.dsh-fx-empty {
  display: flex;
  flex-direction: column;
  gap: 1px;
  padding: 4px 4px 2px;
  color: var(--dsw-alias-label-tertiary, #6b7280);
}

.dsh-fx-empty small {
  color: var(--dsw-alias-label-caption, #9ca3af);
  font-size: 10.5px;
}

.dsh-fx-sessions {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 212px;
  overflow-y: auto;
  padding-top: 4px;
  border-top: 1px dashed var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.22));
}

.dsh-fx-sessions-empty {
  padding: 6px 4px;
  color: var(--dsw-alias-label-caption, #9ca3af);
  font-size: 11px;
}

.dsh-fx-session {
  display: flex;
  align-items: center;
  gap: 5px;
  min-height: 26px;
  padding: 2px 4px;
  border-radius: 6px;
  color: var(--dsw-alias-label-secondary, #4b5563);
  cursor: pointer;
}

.dsh-fx-session:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.1));
  color: var(--dsw-alias-label-primary, #1f2328);
}

.dsh-fx-session > svg {
  flex: none;
  opacity: 0.5;
}

.dsh-fx-session-title {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11.5px;
}

.dsh-fx-session-remove {
  flex: none;
  width: 18px;
  height: 18px;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: inherit;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
  opacity: 0;
}

.dsh-fx-session:hover .dsh-fx-session-remove,
.dsh-fx-session-remove:focus-visible {
  opacity: 0.7;
}

.dsh-fx-session-remove:hover {
  background: color-mix(in srgb, currentColor 12%, transparent);
  opacity: 1;
}

/* Hide filed conversations in the native list when enabled. */
html[data-dsh-enhance-hide-filed] [data-row-key^="session:"][data-dsh-enhance-filed] {
  display: none !important;
}

/*
 * Native blank Sessions paint the localized "New Session" placeholder even
 * after an explicit rename. Replace only that row's visible text with the
 * saved title until the first turn makes the Session non-blank.
 */
[data-row-key^="session:"] > span[data-dsh-enhance-title] {
  font-size: 0 !important;
}

[data-row-key^="session:"] > span[data-dsh-enhance-title]::after {
  content: attr(data-dsh-enhance-title);
  font-size: 14px;
}

/* \u2500\u2500 Timeline rail \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.dsh-fx-timeline {
  position: fixed;
  z-index: 55;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  width: 16px;
  padding: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
  transform: translateY(-50%);
  pointer-events: auto;
  opacity: 0.82;
  transition: opacity 140ms ease;
}

.dsh-fx-timeline:hover,
.dsh-fx-timeline:focus-within {
  opacity: 1;
}

.dsh-fx-timeline-head,
.dsh-fx-timeline-foot {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  flex: none;
}

.dsh-fx-timeline-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--dsw-alias-label-tertiary, #6b7280);
  cursor: pointer;
  opacity: 0.5;
}

.dsh-fx-timeline:hover .dsh-fx-timeline-control {
  opacity: 0.9;
}

.dsh-fx-timeline-control:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.12));
  color: var(--dsw-alias-label-primary, #1f2328);
}

.dsh-fx-timeline-track {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  gap: 10px;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 0;
  min-height: 0;
}

.dsh-fx-timeline-track::-webkit-scrollbar {
  display: none;
}

.dsh-fx-timeline-line {
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 50%;
  width: 1px;
  background: var(--dsw-alias-border-l4, rgba(127, 127, 127, 0.28));
  transform: translateX(-50%);
}

.dsh-fx-timeline-dot {
  position: relative;
  z-index: 1;
  width: 9px;
  height: 9px;
  padding: 0;
  border: 1.5px solid var(--dsw-alias-border-l4, #9ca3af);
  border-radius: 50%;
  background: var(--dsw-alias-bg-base, #fff);
  cursor: pointer;
  flex: none;
  transition: transform 120ms ease, background 120ms ease, border-color 120ms ease;
}

.dsh-fx-timeline-dot.is-user {
  border-color: var(--dsw-alias-state-business-primary, #4d6bfe);
}

.dsh-fx-timeline-dot.is-steering {
  border-style: dashed;
}

/* Hide DSH's native horizontal TurnNavigator when the quick panel asks for it. */
[data-dsh-enhance-native-turn-nav] {
  display: none !important;
}

.dsh-fx-timeline-dot:hover {
  transform: scale(1.25);
  border-color: var(--dsw-alias-label-primary, #1f2328);
}

.dsh-fx-timeline-dot.is-active {
  transform: scale(1.4);
  border-color: var(--dsw-alias-state-business-primary, #4d6bfe);
  background: var(--dsw-alias-state-business-primary, #4d6bfe);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 22%, transparent);
}

.dsh-fx-timeline-reopen {
  position: fixed;
  z-index: 56;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 30px;
  padding: 0;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.24));
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-1, #fff);
  color: var(--dsw-alias-label-tertiary, #6b7280);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transform: translateY(-50%);
  cursor: pointer;
  pointer-events: auto;
  opacity: 0.55;
}

.dsh-fx-timeline-reopen:hover {
  opacity: 1;
}

.dsh-fx-timeline-preview {
  position: fixed;
  z-index: 70;
  width: 300px;
  max-height: 150px;
  overflow: hidden;
  padding: 8px 10px;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.2));
  border-radius: 9px;
  background: var(--dsw-alias-bg-layer-1, #fff);
  color: var(--dsw-alias-label-primary, #1f2328);
  box-shadow: var(--dsw-elevation-panel, 0 10px 30px rgba(0, 0, 0, 0.16));
  pointer-events: none;
}

.dsh-fx-preview-head {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--dsw-alias-label-secondary, #4b5563);
}

.dsh-fx-preview-head strong {
  font-weight: 600;
}

.dsh-fx-preview-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--dsw-alias-label-tertiary, #6b7280);
}

.dsh-fx-preview-dot.is-user {
  background: var(--dsw-alias-state-business-primary, #4d6bfe);
}

.dsh-fx-preview-turn {
  margin-left: auto;
  color: var(--dsw-alias-label-caption, #9ca3af);
  font-variant-numeric: tabular-nums;
}

.dsh-fx-timeline-preview p {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 4px 0 0;
  font-size: 11.5px;
  line-height: 1.45;
  color: var(--dsw-alias-label-tertiary, #6b7280);
  white-space: pre-wrap;
}

/* \u2500\u2500 Floating button + panel \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.dsh-fx-ball {
  position: fixed;
  z-index: 60;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 35%, transparent);
  border-radius: 50%;
  background:
    radial-gradient(circle at 32% 26%, rgba(255, 255, 255, 0.92), rgba(255, 255, 255, 0) 46%),
    linear-gradient(150deg, color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 88%, #fff), var(--dsw-alias-state-business-primary, #4d6bfe));
  color: #fff;
  box-shadow:
    0 8px 22px color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 32%, transparent),
    inset 0 0 0 1px rgba(255, 255, 255, 0.18);
  cursor: grab;
  pointer-events: auto;
  touch-action: none;
  transition: transform 120ms ease, box-shadow 120ms ease;
  -webkit-app-region: no-drag;
}

.dsh-fx-ball:hover {
  transform: translateY(-1px) scale(1.03);
}

.dsh-fx-ball.is-open {
  background: var(--dsw-alias-bg-layer-1, #fff);
  color: var(--dsw-alias-label-primary, #1f2328);
  border-color: var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.3));
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
}

.dsh-fx-ball.is-dragging {
  cursor: grabbing;
  transition: none;
}

.dsh-fx-panel {
  position: fixed;
  z-index: 61;
  width: 304px;
  max-height: 78vh;
  overflow-y: auto;
  padding: 12px;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.22));
  border-radius: 14px;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--dsw-alias-bg-layer-1, #fff) 96%, transparent), var(--dsw-alias-bg-layer-1, #fff));
  color: var(--dsw-alias-label-primary, #1f2328);
  box-shadow: var(--dsw-elevation-panel, 0 18px 48px rgba(0, 0, 0, 0.2));
  backdrop-filter: blur(18px);
  pointer-events: auto;
  font-size: 12px;
  animation: dsh-fx-pop 140ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

@keyframes dsh-fx-pop {
  from {
    opacity: 0;
    transform: translateY(4px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.dsh-fx-panel-head {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
}

.dsh-fx-panel-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 12%, transparent);
  color: var(--dsw-alias-state-business-primary, #4d6bfe);
  flex: none;
}

.dsh-fx-panel-heading {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.dsh-fx-panel-heading strong {
  font-size: 13px;
  line-height: 1.3;
}

.dsh-fx-panel-heading span {
  color: var(--dsw-alias-label-tertiary, #6b7280);
  font-size: 10.5px;
}

.dsh-fx-panel-section {
  padding: 9px 0;
  border-top: 1px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.18));
}

.dsh-fx-panel-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 5px;
}

.dsh-fx-panel-label {
  font-weight: 600;
  font-size: 12px;
}

.dsh-fx-panel-value {
  margin-left: auto;
  color: var(--dsw-alias-state-business-primary, #4d6bfe);
  font-variant-numeric: tabular-nums;
  font-weight: 600;
}

.dsh-fx-panel-hint {
  color: var(--dsw-alias-label-tertiary, #6b7280);
  font-size: 10.5px;
  line-height: 1.45;
}

.dsh-fx-panel-hint.is-inline {
  margin-left: auto;
  text-align: right;
}

.dsh-fx-panel-actions {
  display: flex;
  gap: 6px;
  margin-top: 7px;
}

.dsh-fx-panel-actions .dsh-fx-button {
  flex: 1;
}

.dsh-fx-range {
  width: 100%;
  height: 18px;
  margin: 1px 0 2px;
  accent-color: var(--dsw-alias-state-business-primary, #4d6bfe);
  cursor: pointer;
}

.dsh-fx-toggle-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  margin: 1px 0;
  padding: 5px 4px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.dsh-fx-toggle-row:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.08));
}

.dsh-fx-toggle-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.1));
  color: var(--dsw-alias-label-secondary, #4b5563);
  flex: none;
}

.dsh-fx-toggle-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.dsh-fx-toggle-text strong {
  font-size: 12px;
  font-weight: 500;
}

.dsh-fx-toggle-text small {
  color: var(--dsw-alias-label-tertiary, #6b7280);
  font-size: 10.5px;
  line-height: 1.35;
}

.dsh-fx-switch {
  position: relative;
  width: 30px;
  height: 18px;
  border-radius: 999px;
  background: var(--dsw-alias-border-l4, #d1d5db);
  flex: none;
  transition: background 140ms ease;
}

.dsh-fx-switch span {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: transform 140ms ease;
}

.dsh-fx-switch.is-on {
  background: var(--dsw-alias-state-business-primary, #4d6bfe);
}

.dsh-fx-switch.is-on span {
  transform: translateX(12px);
}

.dsh-fx-link {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--dsw-alias-state-business-primary, #4d6bfe);
  font: inherit;
  font-size: 10.5px;
  cursor: pointer;
}

.dsh-fx-link:hover {
  text-decoration: underline;
}

.dsh-fx-panel-folders {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-top: 5px;
}

.dsh-fx-panel-folder {
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  height: 25px;
  padding: 0 6px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--dsw-alias-label-secondary, #4b5563);
  font: inherit;
  font-size: 11.5px;
  text-align: left;
  cursor: pointer;
}

.dsh-fx-panel-folder:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.08));
  color: var(--dsw-alias-label-primary, #1f2328);
}

.dsh-fx-panel-folder > span:nth-child(2) {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsh-fx-panel-folder-count {
  color: var(--dsw-alias-label-caption, #9ca3af);
  font-size: 10px;
  font-variant-numeric: tabular-nums;
}

.dsh-fx-panel-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.18));
  color: var(--dsw-alias-label-caption, #9ca3af);
  font-size: 10px;
}

/* \u2500\u2500 New conversation naming dialog \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.dsh-fx-dialog-backdrop {
  position: fixed;
  z-index: 120;
  inset: 0;
  display: grid;
  place-items: center;
  padding: 20px;
  background: color-mix(in srgb, #000 34%, transparent);
  backdrop-filter: blur(2px);
  pointer-events: auto;
  animation: dsh-fx-fade 120ms ease-out;
}

.dsh-fx-dialog {
  width: min(420px, 100%);
  max-height: min(80vh, 560px);
  overflow-y: auto;
  padding: 16px;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.24));
  border-radius: 14px;
  background: var(--dsw-alias-bg-layer-1, #fff);
  color: var(--dsw-alias-label-primary, #1f2328);
  box-shadow: var(--dsw-elevation-panel, 0 24px 60px rgba(0, 0, 0, 0.28));
  font: inherit;
  font-size: 13px;
  animation: dsh-fx-pop 140ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.dsh-fx-dialog *,
.dsh-fx-dialog-backdrop * {
  box-sizing: border-box;
}

.dsh-fx-dialog-head {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.dsh-fx-dialog-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 12%, transparent);
  color: var(--dsw-alias-state-business-primary, #4d6bfe);
  flex: none;
}

.dsh-fx-dialog-heading {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.dsh-fx-dialog-heading strong {
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
}

.dsh-fx-dialog-heading span {
  overflow: hidden;
  color: var(--dsw-alias-label-tertiary, #6b7280);
  font-size: 11.5px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dsh-fx-dialog-label {
  display: block;
  margin: 15px 0 6px;
  color: var(--dsw-alias-label-secondary, #4b5563);
  font-size: 12px;
  font-weight: 500;
}

.dsh-fx-dialog-input {
  width: 100%;
  height: 38px;
  padding: 0 11px;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.3));
  border-radius: 8px;
  background: var(--dsw-alias-bg-base, #fff);
  color: var(--dsw-alias-label-primary, #1f2328);
  font: inherit;
  font-size: 14px;
  outline: none;
}

.dsh-fx-dialog-input:focus {
  border-color: var(--dsw-alias-state-business-primary, #4d6bfe);
  box-shadow: 0 0 0 1px var(--dsw-alias-state-business-primary, #4d6bfe),
    0 0 0 3px color-mix(in srgb, var(--dsw-alias-state-business-primary, #4d6bfe) 20%, transparent);
}

.dsh-fx-dialog-input:disabled {
  opacity: 0.6;
}

.dsh-fx-dialog-hint {
  margin: 7px 0 0;
  color: var(--dsw-alias-label-caption, #9ca3af);
  font-size: 10.5px;
  line-height: 1.5;
}

.dsh-fx-dialog-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
}

.dsh-fx-dialog-spacer {
  flex: 1;
}

.dsh-fx-dialog .dsh-fx-button {
  height: 30px;
  font-size: 12.5px;
}

.dsh-fx-dialog .dsh-fx-link {
  font-size: 11.5px;
}

.dsh-fx-dialog .dsh-fx-link:disabled {
  opacity: 0.45;
  cursor: default;
  text-decoration: none;
}

@keyframes dsh-fx-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* \u2500\u2500 File-tree drag into the composer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

[data-dsh-enhance-draggable] {
  cursor: grab;
}

[data-dsh-enhance-draggable] > button {
  cursor: grab;
}

[data-dsh-enhance-draggable]:active,
[data-dsh-enhance-draggable]:active > button {
  cursor: grabbing;
}

[data-dsh-enhance-draggable][data-dsh-enhance-dragging] {
  opacity: 0.55;
}

/* The composer card's own ::after is the workspace-trigger dashed edge. */
[data-composer-card][data-dsh-enhance-file-over] {
  outline: 2px solid var(--dsw-alias-state-business-primary, #4d6bfe);
  outline-offset: -2px;
}

[data-composer-card][data-dsh-enhance-file-over]::after {
  position: absolute;
  z-index: 4;
  inset: 6px 12px auto auto;
  max-width: 62%;
  overflow: hidden;
  padding: 1px 8px;
  border: 0;
  border-radius: 999px;
  background: var(--dsw-alias-state-business-primary, #4d6bfe);
  color: #fff;
  content: attr(data-dsh-enhance-file-over);
  font-size: 11px;
  line-height: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  pointer-events: none;
}

/* \u2500\u2500 Edit & resend the last prompt \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.dsh-fx-edit-icon {
  width: 28px;
  height: 28px;
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border: 0;
  border-radius: var(--dsw-radius-sm, 6px);
  background: transparent;
  color: var(--dsw-alias-label-tertiary, #6b7280);
  cursor: pointer;
}

.dsh-fx-edit-icon:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.1));
  color: var(--dsw-alias-label-secondary, #4b5563);
}

.dsh-fx-edit-icon svg {
  width: 15px;
  height: 15px;
}

.dsh-fx-edit-inline {
  position: fixed;
  z-index: 86;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 16px 16px 12px;
  border-radius: 18px;
  background: color-mix(in srgb, var(--dsw-alias-bg-base, #fff) 90%, var(--dsw-alias-label-primary, #1f2328) 10%);
  color: var(--dsw-alias-label-primary, #1f2328);
  pointer-events: auto;
  overflow: hidden;
}

.dsh-fx-edit-inline-input {
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: 0;
  border: 0;
  outline: none;
  resize: none;
  background: transparent;
  color: inherit;
  font: inherit;
  font-size: 15px;
  line-height: 1.55;
}

.dsh-fx-edit-inline-input::placeholder {
  color: var(--dsw-alias-label-caption, #9ca3af);
}

.dsh-fx-edit-inline-foot {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: none;
  margin-top: 10px;
}

.dsh-fx-edit-inline-spacer {
  flex: 1;
}

.dsh-fx-edit-inline-warn {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  color: var(--dsw-alias-label-tertiary, #6b7280);
  font-size: 10.5px;
  line-height: 1.4;
  text-overflow: ellipsis;
}

.dsh-fx-edit-inline-cancel,
.dsh-fx-edit-inline-send {
  flex: none;
  height: 34px;
  padding: 0 16px;
  border: 0;
  border-radius: 10px;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
}

.dsh-fx-edit-inline-cancel {
  background: color-mix(in srgb, var(--dsw-alias-label-primary, #1f2328) 8%, transparent);
  color: var(--dsw-alias-label-primary, #1f2328);
}

.dsh-fx-edit-inline-cancel:hover:not(:disabled) {
  background: color-mix(in srgb, var(--dsw-alias-label-primary, #1f2328) 14%, transparent);
}

.dsh-fx-edit-inline-send {
  background: var(--dsw-alias-label-primary, #1f2328);
  color: var(--dsw-alias-bg-base, #fff);
  font-weight: 500;
}

.dsh-fx-edit-inline-send:hover:not(:disabled) {
  filter: brightness(1.08);
}

.dsh-fx-edit-inline-cancel:disabled,
.dsh-fx-edit-inline-send:disabled {
  opacity: 0.5;
  cursor: default;
}

/* \u2500\u2500 Toast \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.dsh-fx-toast {
  position: fixed;
  z-index: 100;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  max-width: min(420px, 80vw);
  padding: 8px 14px;
  border: 1px solid var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.24));
  border-radius: 9px;
  background: var(--dsw-alias-bg-layer-1, #fff);
  color: var(--dsw-alias-label-primary, #1f2328);
  box-shadow: var(--dsw-elevation-panel, 0 10px 30px rgba(0, 0, 0, 0.18));
  font-size: 12px;
  cursor: pointer;
  pointer-events: auto;
  animation: dsh-fx-toast-in 160ms ease-out;
}

@keyframes dsh-fx-toast-in {
  from {
    opacity: 0;
    transform: translate(-50%, 6px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dsh-fx-panel,
  .dsh-fx-dialog,
  .dsh-fx-dialog-backdrop,
  .dsh-fx-toast {
    animation: none;
  }

  .dsh-fx-ball,
  .dsh-fx-chip,
  .dsh-fx-timeline-dot,
  .dsh-fx-switch span {
    transition: none;
  }
}
`;

// src/client/store.ts
var WIDTH_MIN = 38;
var WIDTH_MAX = 90;
var WIDTH_DEFAULT = 48;
var NATIVE_WIDTH_KEY = "dsh.conversation.contentWidth";
var STORAGE_KEY = "dsh-enhance.state.v1";
var COLORS = ["#5b8def", "#7c6cf0", "#d9764a", "#3fa980", "#c75c9a", "#b08b3e"];
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function uid() {
  return `f_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
function defaultState() {
  return {
    version: 1,
    folders: [],
    assignments: {},
    settings: {
      widthRem: WIDTH_DEFAULT,
      timeline: true,
      hideNativeTurnNav: true,
      hideFiled: true,
      showStrip: true,
      stripCollapsed: false,
      nameNewSession: true,
      ball: { right: 18, bottom: 96 }
    }
  };
}
function sanitize(raw) {
  const base2 = defaultState();
  if (raw === null || typeof raw !== "object") return base2;
  const input = raw;
  const folders = Array.isArray(input.folders) ? input.folders.filter((folder) => folder && typeof folder === "object").map((folder, index) => ({
    id: typeof folder.id === "string" && folder.id ? folder.id : uid(),
    name: typeof folder.name === "string" && folder.name.trim() ? folder.name.trim().slice(0, 60) : `Folder ${index + 1}`,
    color: typeof folder.color === "string" && folder.color ? folder.color : COLORS[index % COLORS.length],
    createdAt: typeof folder.createdAt === "number" ? folder.createdAt : Date.now()
  })) : [];
  const ids = new Set(folders.map((folder) => folder.id));
  const assignments = {};
  if (input.assignments && typeof input.assignments === "object") {
    for (const [sessionId, folderId] of Object.entries(input.assignments)) {
      if (typeof sessionId === "string" && typeof folderId === "string" && ids.has(folderId)) {
        assignments[sessionId] = folderId;
      }
    }
  }
  const settings = { ...base2.settings, ...input.settings ?? {} };
  const width = Number(settings.widthRem);
  const ball = settings.ball;
  return {
    version: 1,
    folders,
    assignments,
    settings: {
      widthRem: Number.isFinite(width) ? clamp(Math.round(width), WIDTH_MIN, WIDTH_MAX) : WIDTH_DEFAULT,
      timeline: settings.timeline !== false,
      hideNativeTurnNav: settings.hideNativeTurnNav !== false,
      hideFiled: settings.hideFiled !== false,
      showStrip: settings.showStrip !== false,
      stripCollapsed: settings.stripCollapsed === true,
      nameNewSession: settings.nameNewSession !== false,
      ball: ball && Number.isFinite(ball.right) && Number.isFinite(ball.bottom) ? { right: clamp(ball.right, 4, 400), bottom: clamp(ball.bottom, 4, 400) } : base2.settings.ball
    }
  };
}
var EnhanceStore = class {
  state = defaultState();
  listeners = /* @__PURE__ */ new Set();
  toastTimer;
  toast = null;
  started = false;
  observer = null;
  frame = 0;
  appliedWidthPx = 0;
  storageHandler = null;
  start() {
    if (this.started) return;
    this.started = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null) this.state = sanitize(JSON.parse(raw));
    } catch {
      this.state = defaultState();
    }
    this.applyWidth();
    this.applyNativeTurnNav();
    document.documentElement.removeAttribute("data-dsh-enhance-hide-filed");
    for (const row of document.querySelectorAll("[data-dsh-enhance-filed]")) {
      row.removeAttribute("data-dsh-enhance-filed");
    }
    this.observer = new MutationObserver(() => {
      if (this.frame) return;
      this.frame = window.requestAnimationFrame(() => {
        this.frame = 0;
        this.syncWidthFromDom();
        this.applyNativeTurnNav();
      });
    });
    this.observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style"]
    });
    this.storageHandler = (event) => {
      if (event.key !== STORAGE_KEY || event.newValue === null) return;
      try {
        this.state = sanitize(JSON.parse(event.newValue));
        this.applyAll();
        this.emit();
      } catch {
      }
    };
    window.addEventListener("storage", this.storageHandler);
  }
  stop() {
    if (!this.started) return;
    this.started = false;
    this.observer?.disconnect();
    this.observer = null;
    if (this.frame) {
      window.cancelAnimationFrame(this.frame);
      this.frame = 0;
    }
    if (this.storageHandler) window.removeEventListener("storage", this.storageHandler);
    this.storageHandler = null;
    if (this.toastTimer !== void 0) window.clearTimeout(this.toastTimer);
    document.documentElement.removeAttribute("data-dsh-enhance-hide-filed");
    for (const nav of document.querySelectorAll("[data-dsh-enhance-native-turn-nav]")) {
      nav.removeAttribute("data-dsh-enhance-native-turn-nav");
    }
    document.documentElement.style.removeProperty("--dsh-chat-user-width");
    for (const body of document.querySelectorAll("[data-conversation-content]")) {
      const target = body.parentElement;
      if (target?.style.getPropertyValue("--dsh-chat-user-width") === `${this.appliedWidthPx}px`) {
        target.style.removeProperty("--dsh-chat-user-width");
      }
    }
  }
  getSnapshot = () => this.state;
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };
  emit() {
    for (const listener of this.listeners) listener();
  }
  commit(next) {
    this.state = next;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
    }
    this.applyAll();
    this.emit();
  }
  createFolder(name) {
    const folder = {
      id: uid(),
      name: name.trim().slice(0, 60) || "Folder",
      color: COLORS[this.state.folders.length % COLORS.length],
      createdAt: Date.now()
    };
    this.commit({ ...this.state, folders: [...this.state.folders, folder] });
    return folder;
  }
  renameFolder(id, name) {
    const trimmed = name.trim().slice(0, 60);
    if (!trimmed) return;
    this.commit({
      ...this.state,
      folders: this.state.folders.map((folder) => folder.id === id ? { ...folder, name: trimmed } : folder)
    });
  }
  deleteFolder(id) {
    const assignments = {};
    for (const [sessionId, folderId] of Object.entries(this.state.assignments)) {
      if (folderId !== id) assignments[sessionId] = folderId;
    }
    this.commit({
      ...this.state,
      folders: this.state.folders.filter((folder) => folder.id !== id),
      assignments
    });
  }
  assign(sessionId, folderId) {
    const assignments = { ...this.state.assignments };
    if (folderId === null) delete assignments[sessionId];
    else assignments[sessionId] = folderId;
    this.commit({ ...this.state, assignments });
  }
  reorderFolders(sourceId, targetId) {
    if (sourceId === targetId) return;
    const folders = [...this.state.folders];
    const from = folders.findIndex((folder) => folder.id === sourceId);
    const to = folders.findIndex((folder) => folder.id === targetId);
    if (from < 0 || to < 0) return;
    const [moved] = folders.splice(from, 1);
    folders.splice(to, 0, moved);
    this.commit({ ...this.state, folders });
  }
  setWidth(rem) {
    const widthRem = clamp(Math.round(rem), WIDTH_MIN, WIDTH_MAX);
    if (widthRem === this.state.settings.widthRem) return;
    try {
      localStorage.setItem(NATIVE_WIDTH_KEY, String(widthRem * 16));
    } catch {
    }
    this.commit({ ...this.state, settings: { ...this.state.settings, widthRem } });
  }
  patchSettings(patch) {
    this.commit({ ...this.state, settings: { ...this.state.settings, ...patch } });
  }
  setBall(position) {
    this.commit({
      ...this.state,
      settings: {
        ...this.state.settings,
        ball: {
          right: clamp(Math.round(position.right), 4, Math.max(4, window.innerWidth - 60)),
          bottom: clamp(Math.round(position.bottom), 4, Math.max(4, window.innerHeight - 60))
        }
      }
    });
  }
  resetBall() {
    this.patchSettings({ ball: { right: 18, bottom: 96 } });
  }
  notify(message) {
    this.toast = message;
    if (this.toastTimer !== void 0) window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => {
      this.toast = null;
      this.emit();
    }, 2600);
    this.emit();
  }
  dismissToast() {
    this.toast = null;
    if (this.toastTimer !== void 0) window.clearTimeout(this.toastTimer);
    this.emit();
  }
  applyAll() {
    this.applyWidth();
    this.syncWidthFromDom();
    this.applyNativeTurnNav();
  }
  /**
   * DSH's Chat view renders its own turn rail as a `nav` inside the
   * conversation scroller (its CSS-module class ends in `_frame`). Mark that
   * nav so a small CSS rule can hide it; the native rail is recreated as turns
   * change, so the store's DOM observer re-applies the mark.
   */
  applyNativeTurnNav() {
    const hide = this.state.settings.hideNativeTurnNav === true;
    for (const nav of document.querySelectorAll("[data-conversation-scroll] nav[aria-label]")) {
      if (nav.classList.contains("dsh-fx-timeline")) continue;
      const hasFrameClass = Array.from(nav.classList).some((name) => name.endsWith("_frame"));
      if (!hasFrameClass) continue;
      if (nav.querySelectorAll("button").length < 2) continue;
      if (hide) nav.setAttribute("data-dsh-enhance-native-turn-nav", "");
      else nav.removeAttribute("data-dsh-enhance-native-turn-nav");
    }
    if (!hide) {
      for (const nav of document.querySelectorAll("[data-dsh-enhance-native-turn-nav]")) {
        nav.removeAttribute("data-dsh-enhance-native-turn-nav");
      }
    }
  }
  /** Project the chosen width onto the Conversation body's parent, where DSH reads it. */
  applyWidth() {
    const px = Math.round(this.state.settings.widthRem * 16);
    this.appliedWidthPx = px;
    const value = `${px}px`;
    document.documentElement.style.setProperty("--dsh-chat-user-width", value);
    const bodies = document.querySelectorAll("[data-conversation-content]");
    for (const body of bodies) {
      const target = body.parentElement;
      if (!target) continue;
      if (target.style.getPropertyValue("--dsh-chat-user-width") !== value) {
        target.style.setProperty("--dsh-chat-user-width", value);
      }
    }
    try {
      localStorage.setItem(NATIVE_WIDTH_KEY, String(px));
    } catch {
    }
  }
  /**
   * Follow width changes made through DSH's own drag handles: the handle writes
   * the same CSS variable and preference key, so the panel's slider stays in
   * sync instead of fighting it.
   */
  syncWidthFromDom() {
    const body = document.querySelector("[data-conversation-content]");
    const raw = body?.parentElement?.style.getPropertyValue("--dsh-chat-user-width").trim();
    if (!raw || !raw.endsWith("px")) return;
    const px = Number.parseFloat(raw);
    if (!Number.isFinite(px) || px <= 0) return;
    if (Math.abs(px - this.appliedWidthPx) < 4) return;
    const widthRem = clamp(Math.round(px / 16), WIDTH_MIN, WIDTH_MAX);
    if (widthRem === this.state.settings.widthRem) return;
    this.appliedWidthPx = widthRem * 16;
    this.state = { ...this.state, settings: { ...this.state.settings, widthRem } };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch {
    }
    this.emit();
  }
};
var enhanceStore = new EnhanceStore();

// src/client/file-drag.ts
var DRAG_MIME = "application/x-dsh-enhance-file";
var ENTRY_SELECTOR = '[data-files-entry="file"], [data-files-entry="directory"]';
var ALL_ENTRY_SELECTOR = "[data-files-entry]";
var COMPOSER_CARD_SELECTOR = "[data-composer-card]";
var OVER_ATTR = "data-dsh-enhance-file-over";
var DRAGGABLE_ATTR = "data-dsh-enhance-draggable";
var DRAGGING_ATTR = "data-dsh-enhance-dragging";
var draggedPath = null;
var draggedKind = "file";
var activeCard = null;
function errorMessage(error) {
  if (error instanceof Error) return error.message;
  return typeof error === "string" ? error : String(error);
}
function serviceOf(ctx, name) {
  return typeof ctx?.get === "function" ? ctx.get(name) : ctx?.[name];
}
function closestDraggableEntry(target) {
  if (!(target instanceof Element)) return null;
  return target.closest(ENTRY_SELECTOR);
}
function setDraggable(entry, enabled) {
  const button = entry.querySelector(":scope > button");
  if (enabled) {
    entry.draggable = true;
    entry.setAttribute(DRAGGABLE_ATTR, "");
    if (button) {
      button.draggable = true;
      button.setAttribute(DRAGGABLE_ATTR, "");
    }
    return;
  }
  if (!entry.hasAttribute(DRAGGABLE_ATTR) && !button?.hasAttribute(DRAGGABLE_ATTR)) return;
  entry.removeAttribute("draggable");
  entry.removeAttribute(DRAGGABLE_ATTR);
  if (button) {
    button.removeAttribute("draggable");
    button.removeAttribute(DRAGGABLE_ATTR);
  }
}
function refreshFileRows() {
  if (!document.querySelector("[data-files-body]")) return;
  for (const entry of document.querySelectorAll(ALL_ENTRY_SELECTOR)) {
    const kind = entry.getAttribute("data-files-entry");
    setDraggable(entry, kind === "file" || kind === "directory");
  }
}
function basename(path) {
  const trimmed = path.replace(/[/\\]+$/, "");
  const separator = Math.max(trimmed.lastIndexOf("/"), trimmed.lastIndexOf("\\"));
  return trimmed.slice(separator + 1);
}
function relativizeToCwd(path, cwd) {
  const normalizedPath = path.replace(/\\/g, "/");
  if (!cwd) return normalizedPath;
  const root = cwd.replace(/\\/g, "/").replace(/\/+$/, "");
  if (root === "") return normalizedPath;
  if (normalizedPath === root) return "";
  if (normalizedPath.startsWith(`${root}/`)) return normalizedPath.slice(root.length + 1);
  return normalizedPath;
}
function formatEntryMention(path, directory) {
  const target = directory ? `${path}/` : path;
  if (/[\u0000-\u001f\u007f-\u009f"]/u.test(target)) return void 0;
  if (!/\s/u.test(target)) return `@${target}`;
  return directory ? `@"${target}` : `@"${target}"`;
}
function clearCardHighlight() {
  if (activeCard) {
    activeCard.removeAttribute(OVER_ATTR);
    activeCard = null;
  }
  for (const card of document.querySelectorAll(`[${OVER_ATTR}]`)) {
    card.removeAttribute(OVER_ATTR);
  }
}
function markCard(card, hint) {
  if (activeCard && activeCard !== card) activeCard.removeAttribute(OVER_ATTR);
  activeCard = card;
  if (card.getAttribute(OVER_ATTR) !== hint) card.setAttribute(OVER_ATTR, hint);
}
function sessionOfCard(card) {
  const owner = card.closest("[data-conversation-content]") ?? document.querySelector("[data-conversation-content]");
  const id = owner?.getAttribute("data-conversation-session") ?? "";
  return id || null;
}
function insertFileReference(ctx, t, card, path, kind) {
  const sessionId = sessionOfCard(card);
  if (!sessionId) {
    enhanceStore.notify(t("fileDrag.noSession"));
    return;
  }
  const editor = card.querySelector("[data-composer-input]");
  if (editor?.getAttribute("contenteditable") === "false") {
    enhanceStore.notify(t("fileDrag.locked"));
    return;
  }
  const sessions = serviceOf(ctx, "sessions");
  const conversation = serviceOf(ctx, "conversation");
  if (!sessions?.scope || !conversation?.input?.for) {
    enhanceStore.notify(t("fileDrag.failed", { message: "conversation input unavailable" }));
    return;
  }
  const actx = sessions.scope(sessionId);
  if (!actx) {
    enhanceStore.notify(t("fileDrag.failed", { message: "session scope unavailable" }));
    return;
  }
  const summary = sessions.list?.getSnapshot?.().byId?.[sessionId];
  const cwd = typeof summary?.cwd === "string" ? summary.cwd : void 0;
  const relative = relativizeToCwd(path, cwd);
  const directory = kind === "directory";
  const mention = formatEntryMention(relative, directory);
  if (!mention) {
    enhanceStore.notify(t("fileDrag.unsupported"));
    return;
  }
  const name = basename(path) || relative;
  const label = directory ? `${name}/` : name;
  try {
    const shell = conversation.input.for(actx);
    const span = shell.actions?.captureInsertion?.();
    if (!span) {
      enhanceStore.notify(t("fileDrag.failed", { message: "editor selection unavailable" }));
      return;
    }
    const inserted = shell.insertReference(
      {
        source: "reference",
        ref: mention,
        label,
        appearance: directory ? "folder" : "file",
        clipboardText: mention
      },
      span
    );
    if (!inserted) {
      enhanceStore.notify(t("fileDrag.locked"));
      return;
    }
    shell.focus?.();
  } catch (error) {
    enhanceStore.notify(t("fileDrag.failed", { message: errorMessage(error) }));
  }
}
function installFileDrag(ctx, t) {
  let frame = 0;
  const schedule = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      refreshFileRows();
    });
  };
  const onPointerDown = (event) => {
    if (event.button !== 0) return;
    const entry = closestDraggableEntry(event.target);
    if (entry) setDraggable(entry, true);
  };
  const onDragStart = (event) => {
    const entry = closestDraggableEntry(event.target);
    const transfer = event.dataTransfer;
    if (!entry || !transfer) return;
    const path = entry.getAttribute("data-files-path") ?? "";
    if (!path) return;
    const kind = entry.getAttribute("data-files-entry") === "directory" ? "directory" : "file";
    draggedPath = path;
    draggedKind = kind;
    transfer.effectAllowed = "copy";
    try {
      transfer.clearData();
    } catch {
    }
    transfer.setData(DRAG_MIME, JSON.stringify({ path, kind }));
    try {
      transfer.setDragImage(entry, 14, 14);
    } catch {
    }
    entry.setAttribute(DRAGGING_ATTR, "");
  };
  const onDragOver = (event) => {
    const transfer = event.dataTransfer;
    if (!transfer) return;
    const ours = Array.from(transfer.types).includes(DRAG_MIME) || draggedPath !== null;
    if (!ours) return;
    const card = event.target instanceof Element ? event.target.closest(COMPOSER_CARD_SELECTOR) : null;
    if (!card) {
      clearCardHighlight();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    transfer.dropEffect = "copy";
    const name = draggedPath ? basename(draggedPath) : "";
    const suffix = draggedKind === "directory" ? "/" : "";
    markCard(card, t("fileDrag.dropHint", { name: `${name}${suffix}` }));
  };
  const onDragLeave = (event) => {
    if (!activeCard) return;
    const related = event.relatedTarget;
    if (related instanceof Node && activeCard.contains(related)) return;
    clearCardHighlight();
  };
  const onDrop = (event) => {
    const transfer = event.dataTransfer;
    if (!transfer) return;
    const ours = Array.from(transfer.types).includes(DRAG_MIME) || draggedPath !== null;
    if (!ours) return;
    const card = event.target instanceof Element ? event.target.closest(COMPOSER_CARD_SELECTOR) : null;
    if (!card) {
      clearCardHighlight();
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    clearCardHighlight();
    let path = draggedPath;
    let kind = draggedKind;
    try {
      const raw = transfer.getData(DRAG_MIME);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.path === "string" && parsed.path) path = parsed.path;
        if (parsed?.kind === "directory" || parsed?.kind === "file") kind = parsed.kind;
      }
    } catch {
    }
    draggedPath = null;
    draggedKind = "file";
    if (!path) {
      enhanceStore.notify(t("fileDrag.failed", { message: "missing path" }));
      return;
    }
    insertFileReference(ctx, t, card, path, kind);
  };
  const onDragEnd = () => {
    draggedPath = null;
    draggedKind = "file";
    clearCardHighlight();
    for (const node of document.querySelectorAll(`[${DRAGGING_ATTR}]`)) {
      node.removeAttribute(DRAGGING_ATTR);
    }
  };
  const observer = new MutationObserver(schedule);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["data-files-entry"]
  });
  schedule();
  document.addEventListener("pointerdown", onPointerDown, true);
  window.addEventListener("dragstart", onDragStart, true);
  window.addEventListener("dragover", onDragOver, true);
  window.addEventListener("dragleave", onDragLeave, true);
  window.addEventListener("drop", onDrop, true);
  window.addEventListener("dragend", onDragEnd, true);
  return () => {
    if (frame) window.cancelAnimationFrame(frame);
    observer.disconnect();
    document.removeEventListener("pointerdown", onPointerDown, true);
    window.removeEventListener("dragstart", onDragStart, true);
    window.removeEventListener("dragover", onDragOver, true);
    window.removeEventListener("dragleave", onDragLeave, true);
    window.removeEventListener("drop", onDrop, true);
    window.removeEventListener("dragend", onDragEnd, true);
    draggedPath = null;
    draggedKind = "file";
    clearCardHighlight();
    for (const node of document.querySelectorAll(`[${DRAGGING_ATTR}]`)) {
      node.removeAttribute(DRAGGING_ATTR);
    }
    for (const entry of document.querySelectorAll(ALL_ENTRY_SELECTOR)) {
      setDraggable(entry, false);
    }
  };
}

// src/client/overlay.tsx
var import_react5 = require("react");

// src/client/hooks.ts
var import_react = require("react");
function useEnhanceState() {
  return (0, import_react.useSyncExternalStore)(enhanceStore.subscribe, enhanceStore.getSnapshot, enhanceStore.getSnapshot);
}
function useCurrentConversation() {
  const [sessionId, setSessionId] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    const read = () => {
      const body = document.querySelector("[data-conversation-content]");
      const next = body?.getAttribute("data-conversation-session") ?? null;
      setSessionId((previous) => previous === next ? previous : next);
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-conversation-session"]
    });
    return () => observer.disconnect();
  }, []);
  return sessionId;
}

// src/client/new-session-namer.tsx
var import_react2 = require("react");
var import_react_dom = require("react-dom");

// src/client/icons.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function base({ size = 16, ...rest }) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    focusable: false,
    ...rest
  };
}
function IconChatPlus(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(props), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.5 11.5a7.5 7.5 0 0 1-10.9 6.7L4 20l1.8-4.9A7.5 7.5 0 1 1 20.5 11.5z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 8.5v6M9 11.5h6" })
  ] });
}
function IconChevronRight(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(props), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m9 6 6 6-6 6" }) });
}
function IconChevronLeft(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(props), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m15 6-6 6 6 6" }) });
}
function IconClose(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(props), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 6l12 12M18 6 6 18" }) });
}
function IconSparkle(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(props), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 3.5 13.7 9l5.3 1.8-5.3 1.8L12 18l-1.7-5.4L5 10.8 10.3 9z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.5 3.5v2M17.5 4.5h2M5 18.5v2M4 19.5h2" })
  ] });
}
function IconTimeline(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(props), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 4v16" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "6", cy: "7", r: "1.6", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "6", cy: "12", r: "1.6", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { cx: "6", cy: "17", r: "1.6", fill: "currentColor", stroke: "none" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 7h9M10 12h7M10 17h9" })
  ] });
}
function IconTurns(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(props), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 7h16M4 12h10M4 17h16" }) });
}
function IconArrowUp(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(props), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 19V5m0 0-5 5m5-5 5 5" }) });
}
function IconArrowDown(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { ...base(props), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 5v14m0 0 5-5m-5 5-5-5" }) });
}
function IconPencil(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { ...base(props), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17z" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m14 6 4 4" })
  ] });
}

// src/client/new-session-namer.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
function errorMessage2(error) {
  if (error instanceof Error) return error.message;
  return typeof error === "string" ? error : String(error);
}
function serviceOf2(ctx, name) {
  return typeof ctx?.get === "function" ? ctx.get(name) : ctx?.[name];
}
function newSessionButton(target) {
  if (!(target instanceof Element)) return null;
  const button = target.closest("button");
  if (!button) return null;
  const row = button.closest('[data-row-key^="workspace:"]');
  if (!row || row.getAttribute("role") !== "treeitem") return null;
  const buttons = Array.from(row.querySelectorAll("button"));
  if (buttons[buttons.length - 1] !== button) return null;
  const workspaceId = (row.getAttribute("data-row-key") ?? "").slice("workspace:".length);
  if (!workspaceId) return null;
  return { row, workspaceId };
}
function rowLabel(row) {
  const text = (row.textContent ?? "").replace(/\s+/g, " ").trim();
  return text || "workspace";
}
async function renameSession(ctx, sessionId, title) {
  const sessions = serviceOf2(ctx, "sessions");
  if (!sessions?.using) throw new Error("session service unavailable");
  await sessions.using(sessionId, { source: "dshEnhanceNaming" }, async (reference) => {
    const result = await reference.binding.session.rename(title);
    if (!result?.ok) throw new Error(result?.error?.message ?? "rename failed");
  });
}
function expandWorkspace(workspaceId) {
  const row = document.querySelector(`[data-row-key="workspace:${CSS.escape(workspaceId)}"]`);
  if (row?.getAttribute("aria-expanded") === "false") row.click();
}
function NewSessionNamer({ t, ctx, enabled }) {
  const [request, setRequest] = (0, import_react2.useState)(null);
  const [draft, setDraft] = (0, import_react2.useState)("");
  const [busy, setBusy] = (0, import_react2.useState)(false);
  const inputRef = (0, import_react2.useRef)(null);
  const formRef = (0, import_react2.useRef)(null);
  (0, import_react2.useEffect)(() => {
    if (!enabled) return;
    const onClick = (event) => {
      if (event.button !== 0) return;
      const hit = newSessionButton(event.target);
      if (!hit) return;
      event.preventDefault();
      event.stopPropagation();
      setDraft("");
      setBusy(false);
      setRequest({ workspaceId: hit.workspaceId, workspaceName: rowLabel(hit.row) });
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [enabled]);
  (0, import_react2.useEffect)(() => {
    if (!request) return;
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [request]);
  const close = () => {
    if (busy) return;
    setRequest(null);
    setDraft("");
  };
  (0, import_react2.useEffect)(() => {
    if (!request) return;
    const onKey = (event) => {
      if (event.key === "Tab") {
        const form = formRef.current;
        if (!form) return;
        const focusable = Array.from(
          form.querySelectorAll("input:not(:disabled), button:not(:disabled)")
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        } else if (event.shiftKey && (active === first || !form.contains(active))) {
          event.preventDefault();
          last.focus();
        }
        return;
      }
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopPropagation();
      if (!busy) {
        setRequest(null);
        setDraft("");
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [request, busy]);
  const create = async (name) => {
    if (!request || busy) return;
    const title = name.trim();
    const workspace = serviceOf2(ctx, "uiWorkspace");
    const sessions = serviceOf2(ctx, "sessions");
    if (!sessions?.create || !workspace?.openSession) {
      enhanceStore.notify(t("newSession.failed", { message: "session services unavailable" }));
      return;
    }
    setBusy(true);
    let sessionId;
    try {
      sessionId = await sessions.create({ workspaceId: request.workspaceId });
    } catch (error) {
      enhanceStore.notify(t("newSession.failed", { message: errorMessage2(error) }));
      setBusy(false);
      return;
    }
    setRequest(null);
    setDraft("");
    setBusy(false);
    expandWorkspace(request.workspaceId);
    try {
      workspace.openSession(sessionId);
    } catch (error) {
      enhanceStore.notify(t("newSession.failed", { message: errorMessage2(error) }));
    }
    if (!title) return;
    try {
      await renameSession(ctx, sessionId, title);
    } catch (error) {
      enhanceStore.notify(t("newSession.renameFailed", { message: errorMessage2(error) }));
    }
  };
  if (!request) return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        className: "dsh-fx-dialog-backdrop",
        onClick: (event) => {
          if (event.target === event.currentTarget) close();
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "form",
          {
            ref: formRef,
            className: "dsh-fx-dialog",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": "dsh-fx-new-session-title",
            onSubmit: (event) => {
              event.preventDefault();
              if (draft.trim()) void create(draft);
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("header", { className: "dsh-fx-dialog-head", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsh-fx-dialog-mark", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconChatPlus, { size: 18 }) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-fx-dialog-heading", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { id: "dsh-fx-new-session-title", children: t("newSession.title") }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: t("newSession.subtitle", { workspace: request.workspaceName }) })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "button",
                  {
                    type: "button",
                    className: "dsh-fx-icon-button",
                    "aria-label": t("newSession.cancel"),
                    title: t("newSession.cancel"),
                    disabled: busy,
                    onClick: close,
                    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(IconClose, { size: 15 })
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { className: "dsh-fx-dialog-label", htmlFor: "dsh-fx-new-session-name", children: t("newSession.name") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "input",
                {
                  id: "dsh-fx-new-session-name",
                  ref: inputRef,
                  className: "dsh-fx-dialog-input",
                  value: draft,
                  maxLength: 80,
                  disabled: busy,
                  placeholder: t("newSession.placeholder"),
                  onChange: (event) => setDraft(event.target.value)
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dsh-fx-dialog-hint", children: t("newSession.hint") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("footer", { className: "dsh-fx-dialog-foot", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dsh-fx-link", disabled: busy, onClick: () => void create(""), children: t("newSession.skip") }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "dsh-fx-dialog-spacer" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dsh-fx-button", disabled: busy, onClick: close, children: t("newSession.cancel") }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "submit", className: "dsh-fx-button is-primary", disabled: busy || !draft.trim(), children: busy ? t("newSession.creating") : t("newSession.create") })
              ] })
            ]
          }
        )
      }
    ),
    document.body
  );
}
function NamedBlankSessionTitles({ sessions }) {
  const sessionsRef = (0, import_react2.useRef)(sessions);
  sessionsRef.current = sessions;
  const applyRef = (0, import_react2.useRef)(() => {
  });
  applyRef.current = () => {
    const snapshot = sessionsRef.current;
    for (const row of document.querySelectorAll('[data-row-key^="session:"]')) {
      const sessionId = (row.getAttribute("data-row-key") ?? "").slice("session:".length);
      const session = sessionId ? snapshot?.byId?.[sessionId] : void 0;
      const title = typeof session?.title === "string" ? session.title.trim() : "";
      let titleSpan = null;
      if (session?.blank === true && title) {
        for (const child of Array.from(row.children)) {
          if (child.tagName === "SPAN" && (child.textContent ?? "").trim()) {
            titleSpan = child;
            break;
          }
        }
      }
      if (titleSpan) {
        titleSpan.setAttribute("data-dsh-enhance-title", title);
      } else {
        for (const node of row.querySelectorAll("[data-dsh-enhance-title]")) {
          node.removeAttribute("data-dsh-enhance-title");
        }
      }
    }
  };
  (0, import_react2.useEffect)(() => {
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        applyRef.current();
      });
    };
    schedule();
    const scope = document.querySelector('[data-slot="sidebar"]') ?? document.body;
    const observer = new MutationObserver(schedule);
    observer.observe(scope, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-row-key"]
    });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      for (const node of document.querySelectorAll("[data-dsh-enhance-title]")) {
        node.removeAttribute("data-dsh-enhance-title");
      }
    };
  }, []);
  (0, import_react2.useEffect)(() => {
    const frame = window.requestAnimationFrame(() => applyRef.current());
    return () => window.cancelAnimationFrame(frame);
  }, [sessions]);
  return null;
}

// src/client/timeline.tsx
var import_react3 = require("react");

// src/client/dom.ts
function conversationScroll() {
  return document.querySelector("[data-conversation-scroll]");
}
function conversationBody() {
  return document.querySelector("[data-conversation-content]");
}
function compactText(value, max = 220) {
  const text = value.replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}\u2026` : text;
}
function readableText(element) {
  const clone = element.cloneNode(true);
  for (const node of clone.querySelectorAll(
    'button, [role="button"], svg, [data-actions-reveal], [data-clock], [aria-hidden="true"], script, style, noscript'
  )) {
    node.remove();
  }
  return (clone.innerText || clone.textContent || "").replace(/\n{3,}/g, "\n\n").trim();
}
function isVisible(element) {
  if (element.hasAttribute("hidden")) return false;
  let current = element;
  while (current) {
    if (current.hasAttribute("hidden")) return false;
    current = current.parentElement;
  }
  const style = window.getComputedStyle(element);
  return style.display !== "none" && style.visibility !== "hidden";
}

// src/client/timeline.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var KINDS = ["user", "steering"];
function roleLabel(t) {
  return t("timeline.user");
}
function normalizedKind(element) {
  const kind = element.getAttribute("data-chat-flow-kind");
  if (kind === "user" || kind === "steering") return kind;
  return null;
}
function collectItems() {
  const scroller = conversationScroll();
  if (!scroller) return [];
  const selector = KINDS.map((kind) => `[data-chat-flow-kind="${kind}"]`).join(",");
  const items = [];
  const seen = /* @__PURE__ */ new Set();
  for (const element of Array.from(scroller.querySelectorAll(selector))) {
    if (element.hasAttribute("data-chat-group-key")) continue;
    if (!isVisible(element)) continue;
    const kind = normalizedKind(element);
    if (!kind) continue;
    const key = element.getAttribute("data-chat-flow-key") || element.dataset.chatNodeKey || "";
    if (!key || seen.has(key)) continue;
    seen.add(key);
    const text = compactText(readableText(element), 260);
    if (!text) continue;
    const turnValue = Number(element.getAttribute("data-chat-turn"));
    items.push({
      element,
      key,
      kind,
      text,
      ...Number.isSafeInteger(turnValue) && turnValue > 0 ? { turn: turnValue } : {}
    });
  }
  return items;
}
function sameItems(left, right) {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index += 1) {
    if (left[index].key !== right[index].key || left[index].text !== right[index].text) return false;
  }
  return true;
}
function TimelineRail({ t, sessionId, enabled }) {
  const [items, setItems] = (0, import_react3.useState)([]);
  const [active, setActive] = (0, import_react3.useState)(-1);
  const [preview, setPreview] = (0, import_react3.useState)(null);
  const [collapsed, setCollapsed] = (0, import_react3.useState)(false);
  const [geometry, setGeometry] = (0, import_react3.useState)(null);
  const railRef = (0, import_react3.useRef)(null);
  const itemsRef = (0, import_react3.useRef)([]);
  itemsRef.current = items;
  const measure = (0, import_react3.useCallback)(() => {
    const body = document.querySelector("[data-conversation-content]");
    if (!body) {
      setGeometry(null);
      return;
    }
    const rect = body.getBoundingClientRect();
    if (rect.width < 720 || rect.height < 260) {
      setGeometry(null);
      return;
    }
    const right = Math.max(8, window.innerWidth - rect.right + 46);
    setGeometry({
      right,
      top: rect.top + rect.height / 2,
      maxHeight: Math.max(120, rect.height - 150)
    });
  }, []);
  const updateActive = (0, import_react3.useCallback)(() => {
    const scroller = conversationScroll();
    if (!scroller) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const line = scrollerRect.top + 96;
    let next = -1;
    const current = itemsRef.current;
    for (let index = 0; index < current.length; index += 1) {
      const rect = current[index].element.getBoundingClientRect();
      if (rect.top <= line) next = index;
      else break;
    }
    setActive((previous) => previous === next ? previous : next);
  }, []);
  (0, import_react3.useEffect)(() => {
    if (!enabled) return;
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const next = collectItems();
        setItems((current) => sameItems(current, next) ? current : next);
        measure();
        updateActive();
      });
    };
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden"]
    });
    const onScroll = () => updateActive();
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      observer.disconnect();
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, sessionId, measure, updateActive]);
  (0, import_react3.useEffect)(() => {
    setPreview(null);
    setItems([]);
    setActive(-1);
  }, [sessionId]);
  const scrollTo = (0, import_react3.useCallback)((item) => {
    const scroller = conversationScroll();
    if (!scroller) return;
    const scrollerRect = scroller.getBoundingClientRect();
    const elementRect = item.element.getBoundingClientRect();
    const top = Math.max(0, scroller.scrollTop + elementRect.top - scrollerRect.top - 16);
    scroller.scrollTo({ top, behavior: "smooth" });
  }, []);
  const jump = (edge) => {
    const scroller = conversationScroll();
    if (!scroller) return;
    scroller.scrollTo({ top: edge === "top" ? 0 : scroller.scrollHeight, behavior: "smooth" });
  };
  const showPreview = (index, anchor) => {
    const rect = anchor.getBoundingClientRect();
    setPreview({
      index,
      top: Math.max(8, Math.min(rect.top - 8, window.innerHeight - 150)),
      right: Math.max(8, window.innerWidth - rect.left + 12)
    });
  };
  const activeItem = (0, import_react3.useMemo)(() => active >= 0 ? items[active] : void 0, [active, items]);
  const previewItem = preview ? items[preview.index] : void 0;
  const previewTurn = previewItem?.turn;
  (0, import_react3.useEffect)(() => {
    if (!activeItem || !railRef.current) return;
    const rail = railRef.current;
    const dot = rail.querySelector(`[data-dsh-enhance-timeline-index="${active}"]`);
    if (!dot) return;
    const railRect = rail.getBoundingClientRect();
    const dotRect = dot.getBoundingClientRect();
    if (dotRect.top < railRect.top + 16) rail.scrollTop -= railRect.top + 16 - dotRect.top;
    else if (dotRect.bottom > railRect.bottom - 16) rail.scrollTop += dotRect.bottom - (railRect.bottom - 16);
  }, [active, activeItem]);
  if (!enabled || items.length === 0 || !geometry) return null;
  if (collapsed) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        type: "button",
        className: "dsh-fx-timeline-reopen",
        style: { right: geometry.right, top: geometry.top },
        "aria-label": t("timeline.expand"),
        title: t("timeline.expand"),
        onClick: () => setCollapsed(false),
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconChevronLeft, { size: 13 })
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "nav",
      {
        className: "dsh-fx-timeline",
        style: { right: geometry.right, top: geometry.top, height: geometry.maxHeight },
        "aria-label": t("timeline.label"),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-fx-timeline-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "dsh-fx-timeline-control",
                "aria-label": t("timeline.collapse"),
                title: t("timeline.collapse"),
                onClick: () => setCollapsed(true),
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconChevronRight, { size: 12 })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                className: "dsh-fx-timeline-control",
                "aria-label": t("timeline.top"),
                title: t("timeline.top"),
                onClick: () => jump("top"),
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconArrowUp, { size: 12 })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-fx-timeline-track", ref: railRef, children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-fx-timeline-line", "aria-hidden": "true" }),
            items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "button",
                "data-dsh-enhance-timeline-index": index,
                className: `dsh-fx-timeline-dot is-${item.kind}${active === index ? " is-active" : ""}`,
                "aria-label": `${roleLabel(t)} ${index + 1}`,
                "aria-current": active === index ? "true" : void 0,
                onClick: () => scrollTo(item),
                onMouseEnter: (event) => showPreview(index, event.currentTarget),
                onMouseLeave: () => setPreview((current) => current?.index === index ? null : current),
                onFocus: (event) => showPreview(index, event.currentTarget),
                onBlur: () => setPreview(null)
              },
              item.key
            ))
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "dsh-fx-timeline-foot", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "button",
            {
              type: "button",
              className: "dsh-fx-timeline-control",
              "aria-label": t("timeline.bottom"),
              title: t("timeline.bottom"),
              onClick: () => jump("bottom"),
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconArrowDown, { size: 12 })
            }
          ) })
        ]
      }
    ),
    preview ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: "dsh-fx-timeline-preview",
        style: { top: preview.top, right: preview.right },
        role: "tooltip",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "dsh-fx-preview-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `dsh-fx-preview-dot is-${previewItem?.kind ?? "user"}` }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: roleLabel(t) }),
            previewTurn ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "dsh-fx-preview-turn", children: t("timeline.turn", { turn: previewTurn }) }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { children: previewItem?.text })
        ]
      }
    ) : null
  ] });
}

// src/client/edit-resend.tsx
var import_react4 = require("react");
var import_react_dom2 = require("react-dom");
var import_jsx_runtime4 = require("react/jsx-runtime");
var PENCIL_SVG = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17z"/><path d="m14 6 4 4"/></svg>';
function serviceOf3(ctx, name) {
  return typeof ctx?.get === "function" ? ctx.get(name) : ctx?.[name];
}
function errorMessage3(error) {
  if (error instanceof Error) return error.message;
  return typeof error === "string" ? error : String(error);
}
function sameTarget(left, right) {
  if (left === right) return true;
  if (left === null || right === null) return false;
  return left.seq === right.seq && left.text === right.text && left.attachments === right.attachments && left.element === right.element && Math.round(left.rowTop) === Math.round(right.rowTop) && Math.round(left.rowBottom) === Math.round(right.rowBottom) && Math.round(left.rowLeft) === Math.round(right.rowLeft) && Math.round(left.rowWidth) === Math.round(right.rowWidth);
}
var cachedKey = "";
var cachedText = "";
var cachedAttachments = false;
function readTarget(sessionId, allowOffscreen = false) {
  if (!sessionId) return null;
  const body = conversationBody();
  if (body?.getAttribute("data-conversation-session") !== sessionId) return null;
  const scroll = conversationScroll();
  if (!scroll) return null;
  const rows = Array.from(
    scroll.querySelectorAll('[data-chat-flow-kind="user"], [data-chat-flow-kind="steering"]')
  );
  const last = rows[rows.length - 1];
  if (!last || last.getAttribute("data-chat-flow-kind") !== "user") return null;
  if (last.hasAttribute("data-submission-echo") || last.querySelector("[data-submission-echo]")) return null;
  if (!isVisible(last)) return null;
  const key = last.getAttribute("data-chat-flow-key") ?? last.getAttribute("data-chat-anchor-key") ?? "";
  const match = /^(\d+):/.exec(key);
  if (!match) return null;
  const seq = Number(match[1]);
  if (!Number.isSafeInteger(seq) || seq < 0) return null;
  const cacheKey = `${sessionId}:${seq}`;
  if (cacheKey !== cachedKey) {
    cachedText = readableText(last);
    cachedAttachments = last.querySelector("[data-message-attachments], img") !== null;
    cachedKey = cacheKey;
  }
  if (!cachedText.trim()) return null;
  const rowRect = last.getBoundingClientRect();
  if (rowRect.width === 0 || rowRect.height === 0) return null;
  if (!allowOffscreen && (rowRect.bottom < 40 || rowRect.top > window.innerHeight - 20)) return null;
  return {
    element: last,
    seq,
    text: cachedText,
    attachments: cachedAttachments,
    rowTop: rowRect.top,
    rowBottom: rowRect.bottom,
    rowLeft: rowRect.left,
    rowWidth: rowRect.width,
    rowHeight: rowRect.height
  };
}
async function findForkBoundary(sessions, sessionId, promptSeq) {
  if (promptSeq <= 1) return 0;
  let boundary = promptSeq - 1;
  try {
    await sessions.using(sessionId, { source: "dshEnhanceEditResend" }, async (reference) => {
      try {
        await reference.binding.session.loadThrough?.(promptSeq);
      } catch {
      }
      const entries = reference.binding.eventSource?.getSnapshot?.()?.entries ?? [];
      const events = entries.filter((entry) => entry?.type === "event").map((entry) => entry.event);
      let promptEvent;
      for (const event of events) {
        if (event?.type !== "user/message" || event?.data?.source?.kind !== "user") continue;
        if (Number(event.seq) === promptSeq) {
          promptEvent = event;
          break;
        }
        if (Number(event.seq) <= promptSeq) promptEvent = event;
      }
      const messageId = promptEvent?.data?.id === void 0 ? void 0 : String(promptEvent.data.id);
      let spliceSeq;
      let turnStart;
      for (const event of events) {
        if (event?.type === "turn/start" && Number(event.seq) <= promptSeq) {
          turnStart = Number(event.seq);
        }
        if (event?.type !== "agent/inbox/spliced" || messageId === void 0) continue;
        const inserted = Array.isArray(event.data?.inserted) ? event.data.inserted : [];
        const carriesPrompt = inserted.some(
          (item) => String(item?.id ?? item?.message?.id ?? "") === messageId
        );
        if (carriesPrompt && (spliceSeq === void 0 || Number(event.seq) < spliceSeq)) {
          spliceSeq = Number(event.seq);
        }
      }
      if (spliceSeq !== void 0) boundary = Math.max(0, spliceSeq - 1);
      else if (turnStart !== void 0) boundary = Math.max(0, turnStart - 1);
    });
  } catch {
  }
  return boundary;
}
async function resendEditedPrompt(args) {
  const { ctx, t, sessionId, promptSeq, text, title, cwd } = args;
  const sessions = serviceOf3(ctx, "sessions");
  const workspace = serviceOf3(ctx, "uiWorkspace");
  const workspaces = serviceOf3(ctx, "workspaces");
  if (typeof sessions?.using !== "function") throw new Error("session service unavailable");
  const summary = sessions.list?.getSnapshot?.()?.byId?.[sessionId];
  if (summary?.running === true) throw new Error(t("edit.running"));
  const boundary = await findForkBoundary(sessions, sessionId, promptSeq);
  let childId;
  if (boundary > 0) {
    childId = await sessions.fork({ sessionId, atSeq: boundary, increaseTitle: false });
  } else {
    if (!cwd) throw new Error(t("edit.noWorkspace"));
    childId = await sessions.create({ cwd });
  }
  await sessions.using(childId, { source: "dshEnhanceEditResend" }, async (reference) => {
    if (typeof title === "string" && title.trim()) {
      try {
        await reference.binding.session.rename(title);
      } catch {
      }
    }
    const result = await reference.binding.session.prompt([{ type: "text", text }], "queue");
    if (result?.ok !== true) throw new Error(result?.error?.message ?? "prompt rejected");
  });
  try {
    await sessions.refresh?.();
  } catch {
  }
  if (typeof workspace?.openSession !== "function") throw new Error("workspace service unavailable");
  workspace.openSession(childId);
  let archived = false;
  if (typeof workspaces?.archiveSession === "function") {
    try {
      await workspaces.archiveSession(sessionId);
      archived = true;
    } catch {
    }
  }
  return archived;
}
function EditLastPrompt({ t, ctx, sessionId, sessions }) {
  const summary = sessionId ? sessions?.byId?.[sessionId] : void 0;
  const running = summary?.running === true;
  const blank = summary?.blank === true;
  const subagent = summary?.origin === "subagent";
  const [target, setTarget] = (0, import_react4.useState)(null);
  const [open, setOpen] = (0, import_react4.useState)(false);
  const [openSeq, setOpenSeq] = (0, import_react4.useState)(null);
  const [draft, setDraft] = (0, import_react4.useState)("");
  const [busy, setBusy] = (0, import_react4.useState)(false);
  const [editorHeight, setEditorHeight] = (0, import_react4.useState)(220);
  const textareaRef = (0, import_react4.useRef)(null);
  const editElementRef = (0, import_react4.useRef)(null);
  const previousMinHeightRef = (0, import_react4.useRef)("");
  const pencilRef = (0, import_react4.useRef)(null);
  const openRef = (0, import_react4.useRef)(() => {
  });
  (0, import_react4.useEffect)(() => {
    if (!sessionId || running || blank || subagent) {
      pencilRef.current?.remove();
      setTarget(null);
      if (open) {
        setOpen(false);
        setOpenSeq(null);
      }
      return;
    }
    let frame = 0;
    let disposed = false;
    const removePencil = () => pencilRef.current?.remove();
    const scan = () => {
      if (disposed) return;
      const next = readTarget(sessionId, openSeq !== null);
      if (openSeq !== null && (next === null || next.seq !== openSeq)) {
        setOpen(false);
        setOpenSeq(null);
      }
      setTarget((previous) => sameTarget(previous, next) ? previous : next);
      if (next !== null && !open) {
        const actions = next.element.querySelector("[data-clock]");
        if (actions !== null) {
          let pencil = pencilRef.current;
          if (pencil === null) {
            pencil = document.createElement("button");
            pencil.type = "button";
            pencil.className = "dsh-fx-edit-icon";
            pencil.innerHTML = PENCIL_SVG;
            pencil.addEventListener("click", (event) => {
              event.preventDefault();
              event.stopPropagation();
              openRef.current();
            });
            pencilRef.current = pencil;
          }
          pencil.title = t("edit.cta");
          pencil.setAttribute("aria-label", t("edit.cta"));
          if (pencil.parentElement !== actions) actions.appendChild(pencil);
        } else {
          removePencil();
        }
      } else {
        removePencil();
      }
      if (open && next !== null && editElementRef.current === next.element) {
        if (next.element.style.minHeight !== `${editorHeight}px`) {
          next.element.style.minHeight = `${editorHeight}px`;
        }
      }
    };
    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    };
    scan();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden", "data-chat-flow-key", "data-chat-flow-kind"]
    });
    document.addEventListener("scroll", schedule, true);
    window.addEventListener("resize", schedule);
    const resize = new ResizeObserver(schedule);
    const body = conversationBody();
    if (body) resize.observe(body);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      resize.disconnect();
      removePencil();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sessionId, running, blank, subagent, open, openSeq, editorHeight, t]);
  (0, import_react4.useEffect)(() => {
    if (!open) return;
    const element = editElementRef.current;
    if (!element) return;
    element.style.minHeight = `${editorHeight}px`;
    const heightObserver = new MutationObserver(() => {
      if (element.style.minHeight !== `${editorHeight}px`) {
        element.style.minHeight = `${editorHeight}px`;
      }
    });
    heightObserver.observe(element, { attributes: true, attributeFilter: ["style"] });
    const frame = window.requestAnimationFrame(() => {
      element.scrollIntoView({ block: "center", behavior: "auto" });
    });
    return () => {
      heightObserver.disconnect();
      window.cancelAnimationFrame(frame);
      element.style.minHeight = previousMinHeightRef.current;
    };
  }, [open, editorHeight, openSeq]);
  (0, import_react4.useEffect)(() => {
    if (!open) return;
    const textarea = textareaRef.current;
    if (!textarea) return;
    const frame = window.requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);
  const close = () => {
    if (busy) return;
    setOpen(false);
    setOpenSeq(null);
    setDraft("");
  };
  const openEditor = () => {
    if (!target) return;
    const height = Math.min(480, Math.max(210, Math.round(target.rowHeight) + 100));
    setEditorHeight(height);
    editElementRef.current = target.element;
    previousMinHeightRef.current = target.element.style.minHeight;
    setDraft(target.text);
    setOpenSeq(target.seq);
    setOpen(true);
    setBusy(false);
  };
  openRef.current = openEditor;
  const submit = async () => {
    if (!target || openSeq === null || busy || !sessionId) return;
    const text = draft.trim();
    if (!text) {
      enhanceStore.notify(t("edit.empty"));
      return;
    }
    if (sessions?.byId?.[sessionId]?.running === true) {
      enhanceStore.notify(t("edit.running"));
      return;
    }
    const current = sessions?.byId?.[sessionId];
    setBusy(true);
    try {
      const archived = await resendEditedPrompt({
        ctx,
        t,
        sessionId,
        promptSeq: openSeq,
        text,
        title: typeof current?.title === "string" ? current.title : void 0,
        cwd: typeof current?.cwd === "string" ? current.cwd : void 0
      });
      enhanceStore.notify(archived ? t("edit.done") : t("edit.doneKept"));
      setOpen(false);
      setOpenSeq(null);
      setDraft("");
    } catch (error) {
      enhanceStore.notify(t("edit.failed", { message: errorMessage3(error) }));
    } finally {
      setBusy(false);
    }
  };
  if (!open || !target) return null;
  const left = Math.max(8, target.rowLeft);
  const width = Math.max(220, Math.min(target.rowWidth, window.innerWidth - left - 8));
  const top = Math.max(8, Math.min(target.rowTop, window.innerHeight - editorHeight - 8));
  return (0, import_react_dom2.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: "dsh-fx-edit-inline",
        style: { top, left, width, height: editorHeight },
        role: "dialog",
        "aria-label": t("edit.title"),
        "data-dsh-enhance-edit-root": "",
        onKeyDown: (event) => {
          event.stopPropagation();
          if (event.key === "Escape") {
            event.preventDefault();
            close();
            return;
          }
          if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
            event.preventDefault();
            void submit();
          }
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "textarea",
            {
              ref: textareaRef,
              className: "dsh-fx-edit-inline-input",
              value: draft,
              readOnly: busy,
              placeholder: t("edit.placeholder"),
              "aria-label": t("edit.placeholder"),
              onChange: (event) => setDraft(event.target.value)
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("footer", { className: "dsh-fx-edit-inline-foot", children: [
            target.attachments ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dsh-fx-edit-inline-warn", children: t("edit.attachments") }) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "dsh-fx-edit-inline-spacer" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "dsh-fx-edit-inline-cancel", disabled: busy, onClick: close, children: t("edit.cancel") }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                className: "dsh-fx-edit-inline-send",
                disabled: busy || !draft.trim(),
                onClick: () => void submit(),
                children: busy ? t("edit.sending") : t("edit.send")
              }
            )
          ] })
        ]
      }
    ),
    document.body
  );
}

// src/client/overlay.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var VERSION = "0.1.0";
function OverlayRoot({ t, useSessions, ctx }) {
  const state = useEnhanceState();
  const sessionId = useCurrentConversation();
  const sessions = useSessions((snapshot) => snapshot);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(NamedBlankSessionTitles, { sessions }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(NewSessionNamer, { t, ctx, enabled: state.settings.nameNewSession }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(TimelineRail, { t, sessionId, enabled: state.settings.timeline }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(EditLastPrompt, { t, ctx, sessionId, sessions }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(FloatingTools, { t, state }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Toast, {})
  ] });
}
function FloatingTools({ t, state }) {
  const [open, setOpen] = (0, import_react5.useState)(false);
  const [drag, setDrag] = (0, import_react5.useState)(null);
  const dragRef = (0, import_react5.useRef)(null);
  const [dragging, setDragging] = (0, import_react5.useState)(false);
  const suppressClick = (0, import_react5.useRef)(false);
  const pointer = (0, import_react5.useRef)(null);
  const panelRef = (0, import_react5.useRef)(null);
  const rawPosition = drag ?? state.settings.ball;
  const position = {
    right: Math.max(4, Math.min(rawPosition.right, window.innerWidth - 56)),
    bottom: Math.max(4, Math.min(rawPosition.bottom, window.innerHeight - 56))
  };
  (0, import_react5.useEffect)(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event) => {
      const target = event.target;
      if (target instanceof Node && panelRef.current && panelRef.current.contains(target)) return;
      if (target instanceof Element && target.closest("[data-dsh-enhance-ball]")) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer, true);
    };
  }, [open]);
  const spaceAbove = window.innerHeight - position.bottom - 56;
  const spaceBelow = position.bottom - 56;
  const panelAbove = spaceAbove >= spaceBelow && spaceAbove >= 260;
  const panelStyle = {
    right: Math.min(position.right, Math.max(8, window.innerWidth - 328)),
    maxHeight: Math.max(220, Math.min(window.innerHeight * 0.78, panelAbove ? spaceAbove - 12 : spaceBelow - 12)),
    ...panelAbove ? { bottom: Math.min(position.bottom + 56, window.innerHeight - 120) } : { top: Math.max(8, window.innerHeight - position.bottom + 56) }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "button",
      {
        type: "button",
        "data-dsh-enhance-ball": "",
        className: `dsh-fx-ball${open ? " is-open" : ""}${dragging ? " is-dragging" : ""}`,
        style: { right: position.right, bottom: position.bottom },
        "aria-label": t("panel.title"),
        "aria-expanded": open,
        title: t("panel.title"),
        onPointerDown: (event) => {
          if (event.button !== 0) return;
          suppressClick.current = false;
          try {
            event.currentTarget.setPointerCapture(event.pointerId);
          } catch {
          }
          pointer.current = {
            x: event.clientX,
            y: event.clientY,
            right: position.right,
            bottom: position.bottom,
            moved: false
          };
        },
        onPointerMove: (event) => {
          const start = pointer.current;
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          if (!start.moved && Math.abs(dx) + Math.abs(dy) < 5) return;
          start.moved = true;
          setDragging(true);
          const next = {
            right: Math.max(4, start.right - dx),
            bottom: Math.max(4, start.bottom - dy)
          };
          dragRef.current = next;
          setDrag(next);
        },
        onPointerUp: (event) => {
          const start = pointer.current;
          pointer.current = null;
          if (!start) return;
          try {
            event.currentTarget.releasePointerCapture?.(event.pointerId);
          } catch {
          }
          if (start.moved) {
            suppressClick.current = true;
            if (dragRef.current) enhanceStore.setBall(dragRef.current);
            dragRef.current = null;
            setDrag(null);
            setDragging(false);
          }
        },
        onPointerCancel: () => {
          pointer.current = null;
          dragRef.current = null;
          setDrag(null);
          setDragging(false);
        },
        onClick: () => {
          if (suppressClick.current) {
            suppressClick.current = false;
            return;
          }
          setOpen((value) => !value);
        },
        children: open ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconClose, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconSparkle, { size: 19 })
      }
    ),
    open ? /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { ref: panelRef, className: "dsh-fx-panel", style: panelStyle, role: "dialog", "aria-label": t("panel.title"), children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("header", { className: "dsh-fx-panel-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dsh-fx-panel-mark", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconSparkle, { size: 16 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dsh-fx-panel-heading", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: t("panel.title") }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("panel.subtitle") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "button",
          {
            type: "button",
            className: "dsh-fx-icon-button",
            "aria-label": t("panel.close"),
            title: t("panel.close"),
            onClick: () => setOpen(false),
            children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconClose, { size: 15 })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dsh-fx-panel-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "dsh-fx-panel-row", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dsh-fx-panel-label", children: t("panel.width") }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("output", { className: "dsh-fx-panel-value", children: [
            state.settings.widthRem,
            "rem"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "input",
          {
            className: "dsh-fx-range",
            type: "range",
            min: 38,
            max: 90,
            step: 1,
            value: state.settings.widthRem,
            "aria-label": t("panel.width"),
            onChange: (event) => enhanceStore.setWidth(Number(event.target.value))
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dsh-fx-panel-hint", children: t("panel.widthHint", { value: state.settings.widthRem }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dsh-fx-panel-actions", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "button",
          {
            type: "button",
            className: "dsh-fx-button",
            onClick: () => enhanceStore.setWidth(48),
            children: t("panel.widthReset")
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("section", { className: "dsh-fx-panel-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          ToggleRow,
          {
            icon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconTimeline, { size: 16 }),
            label: t("panel.timeline"),
            hint: t("panel.timelineHint"),
            checked: state.settings.timeline,
            onChange: (value) => enhanceStore.patchSettings({ timeline: value })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          ToggleRow,
          {
            icon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconTurns, { size: 16 }),
            label: t("panel.hideNativeTurnNav"),
            hint: t("panel.hideNativeTurnNavHint"),
            checked: state.settings.hideNativeTurnNav,
            onChange: (value) => enhanceStore.patchSettings({ hideNativeTurnNav: value })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          ToggleRow,
          {
            icon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(IconPencil, { size: 16 }),
            label: t("panel.nameNewSession"),
            hint: t("panel.nameNewSessionHint"),
            checked: state.settings.nameNewSession,
            onChange: (value) => enhanceStore.patchSettings({ nameNewSession: value })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("footer", { className: "dsh-fx-panel-foot", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: t("panel.version", { version: VERSION }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "button",
          {
            type: "button",
            className: "dsh-fx-link",
            onClick: () => {
              enhanceStore.resetBall();
              setDrag(null);
            },
            children: t("panel.resetBall")
          }
        )
      ] })
    ] }) : null
  ] });
}
function ToggleRow({
  icon,
  label,
  hint,
  checked,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "button",
    {
      type: "button",
      className: "dsh-fx-toggle-row",
      role: "switch",
      "aria-checked": checked,
      onClick: () => onChange(!checked),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "dsh-fx-toggle-icon", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "dsh-fx-toggle-text", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: label }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("small", { children: hint })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: `dsh-fx-switch${checked ? " is-on" : ""}`, "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", {}) })
      ]
    }
  );
}
function Toast() {
  const message = (0, import_react5.useSyncExternalStore)(
    enhanceStore.subscribe,
    () => enhanceStore.toast,
    () => enhanceStore.toast
  );
  if (!message) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "dsh-fx-toast", role: "status", onClick: () => enhanceStore.dismissToast(), children: message });
}

// src/client/index.ts
var inject = ["slots", "locale"];
var styleElement = null;
function installStyles() {
  if (styleElement?.isConnected) return;
  if (document.querySelector('style[data-plugin-css="dsh-enhance"]')) return;
  const element = document.createElement("style");
  element.dataset.plugin = "dsh-enhance";
  element.dataset.pluginCss = "dsh-enhance";
  element.textContent = styles_default;
  document.head.appendChild(element);
  styleElement = element;
}
function apply(ctx) {
  installStyles();
  const fallbackTranslate = ctx.locale.bind(NS);
  ctx.effect(
    () => ctx.locale.register(NS, { en, zh }),
    "dsh-enhance: locale dictionaries"
  );
  ctx.effect(() => {
    enhanceStore.start();
    return () => enhanceStore.stop();
  }, "dsh-enhance: local settings store");
  ctx.effect(() => installFileDrag(ctx, fallbackTranslate), "dsh-enhance: file drag references");
  const slots = ctx.slots;
  ctx.effect(
    () => slots.inject(
      "shell.overlay",
      () => slots.register(
        {
          name: "shell.overlay",
          id: "dsh-enhance.root",
          order: 900,
          locale: NS
        },
        (props) => (0, import_react6.createElement)(OverlayRoot, {
          t: props.t ?? fallbackTranslate,
          useSessions: props.useSessions,
          ctx
        })
      )
    ),
    "dsh-enhance: overlay surface"
  );
}

    return module.exports;
  }
});
