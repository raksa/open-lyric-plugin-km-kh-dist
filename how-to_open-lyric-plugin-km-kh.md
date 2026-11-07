# open-lyric-plugin-km-kh — how to use the library

Khmer (km-KH) support for the Open Lyric components: the NiDA on-screen
keyboard, Hunspell spellcheck with Khmer word segmentation, and Khmer-capable
font faces.

Everything Khmer ships in this package — dictionaries, the spellcheck worker,
the keyboard, the Battambang faces. The core `open-lyric` bundle carries none of
it, so **attaching a plugin from here is what enables Khmer** on a host.

Scope: this document covers the `open-lyric-plugin-km-kh` package only. For the
components themselves see the `open-lyric` package's `how-to_open-lryic.md`, and
for the song notation its `schema.md`.

---

## Install

```bash
npm i open-lyric open-lyric-plugin-km-kh
```

`open-lyric` is a **peer dependency** — this package contains no copy of it.
Resolve both through the same module condition (`import` or `require`, not
both): the core keeps module-level state, and mixing the two would load it
twice.

---

## One class per surface

Each surface consumes a different subset, so each gets its own class:

| Class                                | Surface    | Contributes                                                                       |
| ------------------------------------ | ---------- | --------------------------------------------------------------------------------- |
| `EditorPluginKmKh`                   | `editor`   | Hunspell spellcheck spec, the NiDA keyboard (Ctrl+Alt+K), keyboard CSS, font faces |
| `OpenLyricMarkdownManagerPluginKmKh` | `markdown` | Khmer-capable fonts + preview font styling                                        |
| `OpenLyricPluginKmKh`                | `lyric`    | Khmer-capable fonts + preview font styling                                        |

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
