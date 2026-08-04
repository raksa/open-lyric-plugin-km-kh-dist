# open-lyric-plugin-km-kh

Khmer (km-KH) support for the [`open-lyric`](../open-lyric) components: the
NiDA on-screen keyboard, Hunspell spellcheck with Khmer word segmentation, and
Khmer-capable font faces.

One class per surface, because each surface consumes a different subset:

| Class                                | Surface    | Contributes                                                     |
| ------------------------------------ | ---------- | --------------------------------------------------------------- |
| `EditorPluginKmKh`                   | `editor`   | Fonts, the Hunspell spellcheck spec, the NiDA keyboard (Ctrl+Alt+K), keyboard CSS |
| `OpenLyricMarkdownManagerPluginKmKh` | `markdown` | Khmer-capable fonts + preview font styling                       |
| `OpenLyricPluginKmKh`                | `lyric`    | Khmer-capable fonts + preview font styling                       |

## Install

```bash
npm i open-lyric open-lyric-plugin-km-kh
```

`open-lyric` is a peer dependency — this package contains no copy of it.

## Use

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

`addPlugin` on a surface the class does not declare throws, so a mix-up
surfaces immediately rather than silently doing nothing.

`EditorPluginKmKh` also exposes `toggleKeyboard()` / `closeKeyboard()` /
`isKeyboardMounted`, mirroring the Ctrl+Alt+K Monaco actions.

`version` is this package's own version, taken from its `package.json` at build
time. It bumps independently of the core's, so alias one of them when reporting
both:

```js
import { version as kmKhVersion } from 'open-lyric-plugin-km-kh';
```

## Module formats

Ships **ESM and CommonJS**, with per-condition TypeScript declarations:

| Condition | Code             | Types              |
| --------- | ---------------- | ------------------ |
| `import`  | `dist/index.js`  | `dist/index.d.ts`  |
| `require` | `dist/index.cjs` | `dist/index.d.cts` |

Resolve this package through the same condition as `open-lyric` itself. The
core still keeps module-level state, so mixing `import` and `require` across
the two would load two copies of it — see the dual-package note in the
[`open-lyric` README](../open-lyric/README.md#requirements-and-caveats).

## What this package bundles

Everything Khmer ships here, not in `open-lyric`: the Hunspell dictionaries
(`km_KH.aff`/`km_KH.dic` + the suggestion `.aff`), the segmentation-aware
spellcheck worker, the NiDA keyboard and its stylesheet, and the Battambang
`@font-face` sheet with the font files. `EditorPluginKmKh.install()` publishes
the registry data itself, so attaching the plugin is the only thing that
enables Khmer on a host — the core bundle carries none of it.

What is *not* bundled is the core's stateful shared modules
(`EditorPreferencesStore`, the plugin registry, the dictionary machinery):
`EditorPreferencesStore` must be the same class the application uses, or
keyboard and spellcheck preferences stop being shared. The build redirects
those imports to `open-lyric/internal` (`packages/build-support.ts`). The
redirect list is checked at build time — if an upstream import is renamed and
a mapping stops matching, the build fails rather than silently bundling a
duplicate.

## Caveats

- **Fonts are declarative on preview surfaces.** `contributes.language.fontFaces`
  is data the host can read; the previews' font picker is driven by the
  component's own `fontFaces` property, which a host assigns.
- **The editor surface contributes no `fontFaces` at all.** Composing km-KH on
  an `Editor` must not restyle the text being edited, so Monaco and the
  textareas keep their own font and Khmer falls through to the browser's
  default face for the script. A host that wants Battambang in the editor asks
  for it explicitly: `editor.fontFamily = KM_KH_WEBFONT_FACE` — the face name is
  a named export of this package, so no host has to spell `'editor-Battambang'`
  itself. (It is also readable from the plugin's `fonts` data, or from the
  `--ol-plugin-km-kh-font-family` custom property its stylesheet publishes.)
- **The `@font-face` rules ship with THIS package** (`km_KH_fonts.scss`,
  emitted with the Battambang `.ttf` files into `dist/assets`). Every plugin
  class contributes the sheet through its `style` slot, so any surface that
  composes km-KH — bare embeds included — gets `editor-Battambang` without
  loading anything else.
- **`installShellStyle()` declares the faces without attaching the plugin.** A
  `style` contribution is scoped to the component it is attached to and goes
  away with it, which makes the faces conditional on an attach. A page that
  only wants to NAME the face — assigning `fontFamily`/`fontFaces` so the
  settings popup offers it, as the standalone preview page entries do — would
  otherwise select a face the document never declared and get a silent fallback
  to a system Khmer face. So each class also exposes a static:

  ```ts
  OpenLyricPluginKmKh.installShellStyle(); // once, at page boot
  ```

  Page-lifetime, into `document.head`, no teardown, idempotent — and it shares
  a marker with the attach path, so composing the plugin as well still yields
  one sheet. It declares the `@font-face` rules and nothing else: a face styles
  no element until something names it, whereas `EditorPluginKmKh`'s other sheet
  (the NiDA keyboard chrome) does style elements and stays attach-scoped.
- **The spellcheck engine is still page-global** — see the standalone-chrome
  notes in `research/editor-structure-implemented.md`.

## Build

From the repo root: `npm run pack -- open-lyric-plugin-km-kh` (build
`open-lyric` first — this package resolves against its `./internal` subpath).
