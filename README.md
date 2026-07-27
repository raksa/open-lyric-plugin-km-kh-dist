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

## Why this package is tiny (~2 kB)

The dictionaries, word patterns, provider factory, and keyboard spec are *not*
bundled here. Because `open-lyric` is still in its wrap phase, its component
barrel transitively contains the built-in plugin registry — km-KH data
included. Shipping a second copy would not just waste bytes, it would break
correctness: `EditorPreferencesStore` must be the same class the application
uses, or keyboard and spellcheck preferences stop being shared.

So the build redirects those imports to `open-lyric/internal`
(`packages/build-support.ts`). The redirect list is checked at build time —
if an upstream import is renamed and a mapping stops matching, the build fails
rather than silently bundling a duplicate.

## Caveats

- **Fonts are declarative on preview surfaces.** `contributes.language.fontFaces`
  is data the host can read; the previews' font picker is driven by the
  component's own `fontFaces` property, which a host assigns.
- **The `@font-face` rules ship with the app stylesheet** (`editor/styles/font.scss`,
  emitted into the `open-lyric` package). A bare embed must load those faces
  itself for `editor-Battambang` to apply.
- **The spellcheck engine is still page-global** — see the standalone-chrome
  notes in `research/editor-structure-implemented.md`.

## Build

From the repo root: `npm run pack -- open-lyric-plugin-km-kh` (build
`open-lyric` first — this package resolves against its `./internal` subpath).
