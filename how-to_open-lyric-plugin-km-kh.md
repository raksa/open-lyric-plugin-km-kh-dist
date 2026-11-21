# open-lyric-plugin-km-kh — how to use the library

Khmer (km-KH) support for the Open Lyric components: the NiDA on-screen
keyboard, Hunspell spellcheck with Khmer word segmentation, and Khmer-capable
font faces.

Everything Khmer the editor needs ships in this package: the dictionaries, the
spellcheck worker, the keyboard, and the Battambang faces. The core
`open-lyric` bundle carries none of it, so **attaching a plugin from here is
what enables Khmer** on a host.

The Khmer engine underneath comes from [`khmer-lint`](https://www.npmjs.com/package/khmer-lint),
a regular dependency that npm installs with this package. That engine covers
the script rules, the NiDA layout table, segmentation of unspaced text, and the
spellcheck engine. The spellcheck worker carries its own copy of the engine,
because a worker script has to be self-contained.

Scope: this document covers the `open-lyric-plugin-km-kh` package only. For the
components themselves see the `open-lyric` package's `how-to_open-lryic.md`, and
for the song notation its `schema.md`.

---

## Install

```bash
npm i open-lyric open-lyric-plugin-km-kh
```

`open-lyric` is a **peer dependency** — this package contains no copy of it.
`khmer-lint` is a regular dependency and is installed automatically. Resolve
`open-lyric` and this package through the same module condition (`import` or `require`, not
both): the core keeps module-level state, and mixing the two would load it
twice.

---

## One class per surface

Each surface consumes a different subset, so each gets its own class:

| Class                                | Surface    | Contributes                                                                       |
| ------------------------------------ | ---------- | --------------------------------------------------------------------------------- |
| `EditorPluginKmKh`                   | `editor`   | Hunspell spellcheck spec, the NiDA keyboard (Ctrl+Alt+K), keyboard CSS, font faces |
| `OpenLyricMarkdownManagerPluginKmKh` | `markdown` | Khmer-capable fonts + preview font styling + Khmer labels                         |
| `OpenLyricPluginKmKh`                | `lyric`    | Khmer-capable fonts + preview font styling + Khmer labels                         |

```js
import { Editor, OpenLyric, OpenLyricMarkdownManager } from 'open-lyric';
import {
  EditorPluginKmKh,
  OpenLyricMarkdownManagerPluginKmKh,
  OpenLyricPluginKmKh,
} from 'open-lyric-plugin-km-kh';

editor.addPlugin('km-KH', new EditorPluginKmKh());
markdownManager.addPlugin('km-KH', new OpenLyricMarkdownManagerPluginKmKh());
lyricPreview.addPlugin('km-KH', new OpenLyricPluginKmKh());
```

`addPlugin` on a surface the class does not declare **throws**, so a mix-up
surfaces immediately instead of silently doing nothing.

---

## The keyboard

`EditorPluginKmKh` mounts the NiDA on-screen keyboard and registers the
Ctrl+Alt+K Monaco action. The same thing is drivable from code:

```js
const kmKh = new EditorPluginKmKh();
editor.addPlugin('km-KH', kmKh);

kmKh.toggleKeyboard();
kmKh.closeKeyboard();
kmKh.isKeyboardMounted; // boolean
```

---

## Fonts

The `@font-face` rules for Battambang ship **with this package**, and every
plugin class contributes the sheet through its `style` slot — so any surface
that composes km-KH gets the face, bare embeds included.

Name the face without hardcoding it:

```js
import { KM_KH_WEBFONT_FACE } from 'open-lyric-plugin-km-kh';

lyricPreview.fontFamily = KM_KH_WEBFONT_FACE;
```

Two things to know:

- **The editor surface contributes no `fontFaces`.** Composing km-KH on an
  `Editor` deliberately does not restyle the text being edited: Monaco and the
  textareas keep their own font, and Khmer falls through to the browser's
  default face for the script. Ask for Battambang explicitly if you want it:
  `editor.fontFamily = KM_KH_WEBFONT_FACE`.
- **On preview surfaces the fonts are declarative.** The plugin's font data is
  there for a host to read; the font picker is driven by the component's own
  `fontFaces` property, which the host assigns.

### Declaring the faces without attaching a plugin

A `style` contribution is scoped to the component it is attached to, so a page
that only wants to *name* the face — assigning `fontFamily`/`fontFaces` so the
settings popup offers it — would select a face the document never declared. Each
class exposes a static for that case:

```js
OpenLyricPluginKmKh.installShellStyle(); // once, at page boot
```

Page-lifetime, into `document.head`, no teardown, idempotent. It shares a marker
with the attach path, so composing the plugin as well still yields one sheet. It
declares the `@font-face` rules and nothing else — `EditorPluginKmKh`'s other
sheet (the NiDA keyboard chrome) does style elements and stays attach-scoped.

---

## Khmer labels in the previews

The two preview plugins also translate the fixed labels a preview prints around
a song. On a song whose `ol:Config` declares the Khmer locale —

```
- Locales: km-KH
```

— the lyric preview shows `ឯកសារភ្ជាប់` instead of `Attachments`, `គី` instead
of `Key`, and so on, and the Markdown preview's `Config` card shows the field
names the same way. `- Locales: km` matches too. A song that does not declare
the locale keeps the English labels, on the same surface with the same plugin
attached — the document decides, not the composition.

| Label                | Khmer            |
| -------------------- | ---------------- |
| `Title`              | ចំណងជើង          |
| `Subtitle`           | ចំណងជើងរង        |
| `Artist`             | សិល្បករ          |
| `Key`                | គី               |
| `Time`               | សញ្ញាចង្វាក់     |
| `Tempo`              | ល្បឿន            |
| `Locales`            | ភាសា             |
| `Structure`          | រចនាសម្ព័ន្ធ     |
| `Strumming Patterns` | លំនាំចង្វាក់     |
| `Description`        | ការពិពណ៌នា       |
| `Copyright`          | រក្សាសិទ្ធិ      |
| `Theme`              | ប្រធានបទ         |
| `Genre`              | ប្រភេទ           |
| `Style`              | រចនាបថ           |
| `Keywords`           | ពាក្យគន្លឹះ      |
| `Year`               | ឆ្នាំ            |
| `Melody`             | បទភ្លេង          |
| `Attachments`        | ឯកសារភ្ជាប់      |
| `Untitled Song`      | បទគ្មានចំណងជើង   |

### Choosing the label language

Both preview plugins add a **Label language** field to a standalone preview's
settings popup (the gear):

| Option                      | Labels                                                        |
| --------------------------- | ------------------------------------------------------------- |
| `Auto (the song’s Locales)` | Khmer for a song that declares `km-KH` / `km`, else English.  |
| `English`                   | English for every song.                                       |
| `ខ្មែរ (Khmer)`             | Khmer for every song, including one with no `Locales` field.  |

The choice is one reading preference for the page: every preview on it that
composes a km-KH preview plugin follows it at once, and it is remembered in
browser storage (`openLyricPluginKmKh.labelLanguage`) for the next visit. The
popup's Reset returns it to Auto. Removing the plugin from a preview returns
that preview to Auto as well.

A host drives the same choice from code through a static on either preview
plugin class — for a language switch of its own, outside the popup:

```js
import { OpenLyricPluginKmKh } from 'open-lyric-plugin-km-kh';

OpenLyricPluginKmKh.labelLanguage = 'km-KH'; // 'auto' | 'en' | 'km-KH'
OpenLyricPluginKmKh.labelLanguage; // the current choice
```

Assigning it does exactly what picking the option does: every composing preview
re-renders, every open popup shows it, and it is stored. An unknown value reads
as `'auto'`. `OpenLyricMarkdownManagerPluginKmKh.labelLanguage` is the same
value. The type is exported as `KmKhLabelLanguage`.

Only these labels change. Section names, lyrics and field values are the
author's text and are shown as written; the notation itself is unchanged, so a
song is still written with `- Attachments:`. The plain-text form of a song and
the controls' tooltips and menus stay in English.

---

## Khmer example songs

Two songs ship as raw Open Lyric markdown. Composing a plugin puts them in the
Examples menu; import them directly to seed a surface's initial content:

```js
import {
  KHMER_BILINGUAL_PRAYER_EXAMPLE,
  KHMER_CALL_TO_WORSHIP_EXAMPLE,
} from 'open-lyric-plugin-km-kh';

const preview = new OpenLyric({ container, value: KHMER_CALL_TO_WORSHIP_EXAMPLE });
```

Khmer is not special-cased by the notation itself: `km-KH` is one tag of the
closed `Locales` set, and a Khmer song is an ordinary Open Lyric document.

---

## Version

```js
import { version as kmKhVersion } from 'open-lyric-plugin-km-kh';
```

This package's own version, taken from its manifest at build time. It bumps
independently of the core's, so alias one of them when reporting both.

---

## Module formats

Ships **ESM and CommonJS**, with per-condition TypeScript declarations:

| Condition | Code             | Types              |
| --------- | ---------------- | ------------------ |
| `import`  | `dist/index.js`  | `dist/index.d.ts`  |
| `require` | `dist/index.cjs` | `dist/index.d.cts` |

---

## Caveats

- **Spellcheck is page-global.** One engine per page, whichever surfaces are
  mounted.
- **`EditorPreferencesStore` must be the one class the app uses.** This package
  does not bundle its own copy — keyboard and spellcheck preferences are shared
  through the core's instance.
- **Browser only**, like the core: the module graph touches `document` at
  evaluation time.
