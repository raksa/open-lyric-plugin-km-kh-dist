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

Three things to know:

- **The editor surface contributes no `fontFaces`.** Composing km-KH on an
  `Editor` deliberately does not restyle the text being edited: Monaco and the
  textareas keep their own font, and Khmer falls through to the browser's
  default face for the script. Ask for Battambang explicitly if you want it:
  `editor.fontFamily = KM_KH_WEBFONT_FACE`.
- **On preview surfaces the fonts are declarative.** The plugin's font data is
  there for a host to read; the font picker is driven by the component's own
  `fontFaces` property, which the host assigns.
- **Exports name the face Battambang.** The page loads it as
  `KM_KH_WEBFONT_FACE` (`editor-Battambang`), a name of its own that never
  clashes with an installed font. No computer has a font of that name, so the
  preview plugins tell the core what it is really called (`fontNames`,
  exported as `KM_KH_FONT_NAMES`), and a Download as Presentation deck names
  it `Battambang`. The `.pptx` then shows in Battambang wherever it is
  installed. The web page Download as HTML saves carries the face itself, so
  it reads in Battambang on any computer, and so does a Download as Docx
  Word file (the regular face; the faces are TrueType and allow embedding).

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

## Khmer in the previews

The two preview plugins also translate a preview's own text into Khmer. On a
song whose `ol:Config` declares the Khmer locale —

```
- Locales: km-KH
```

— a standalone preview reads in Khmer throughout (`- Locales: km` matches too):

- **the song header** — `ឯកសារភ្ជាប់` for `Attachments`, `គី` for `Key`,
  `សញ្ញាចង្វាក់` for `Time`, `ល្បឿន` for `Tempo`, and the other `Config` field
  names, in the lyric preview and on the Markdown preview's `Config` card;
- **section names** — `Verse 1` → `វគ្គ 1`, `Chorus` → `បន្ទរ`, `Intro` →
  `ផ្ដើម`, `Outro` → `បញ្ចប់`, `Bridge` → `ស្ពាន`, and the rest of the standard
  names, in titles and in the structure line;
- **the settings popup** — its title, Font size, Font family, the key and
  display controls (`សម្រួល`, `លាក់បារ`, `លាក់ខដ`), Show comments, Show song
  notes (`បង្ហាញកំណត់ចំណាំបទចម្រៀង`), Reset, and
  the fields other plugins add there (the strum player's Instrument);
- **the actions menu and export progress** — Copy as Text, Download as Image,
  Download as Presentation, Print, every step and status the progress line
  shows with its counter (`កំពុងបង្កើត Docx (2/6)`, `បានចម្លងអត្ថបទចម្រៀង`,
  `ផ្ទាំងលោតត្រូវបានរារាំង`) — and the Presentation options dialog that
  Download as Presentation opens (its presets, Save preset / Rename / Delete,
  Export presets / Import presets and the name row and messages that go with
  them — the names you give your own presets stay as written — section
  headers, switches,
  font, alignment, colour, slide and card background — the picture, its
  shade and their hints included — card size and slideshow transition
  fields, the stage's Replay and Present and its end-of-show line, the
  Download as PPTX and Download as HTML buttons, and the
  slide list's captions and each slide's Omit content, Notes and Blank
  slides after controls; the title slide's own text is the song's and stays
  as written), the web page Download as HTML saves (its views, buttons,
  menus, settings, presenter view, key help and messages, `ស្លាយ 3 ក្នុងចំណោម
  12`; the page is marked `lang="km-KH"`), and the image options dialog that
  Download as Image opens (its Preset field with the built-in presets — Square
  post, Phone story, Widescreen slide, Chord sheet — Save preset / Rename /
  Delete and Export / Import presets, its sizes, Shrink to fit,
  section headers, theme, font, text size,
  margin, switches, file format and preview status; the format names JPEG
  and PNG stay as they are). The Markdown preview's Download as Image opens
  the same dialog, translated the same way;
- **the Markdown preview's editing controls** — Add Config, Add Lyric, and the
  Edit / Rename / Delete / Remove captions on each field and section;
- **tooltips** and screen-reader labels on all of the above.

A song that does not declare the locale keeps English, on the same surface
with the same plugin attached — the document decides, not the composition.

What stays as written: lyrics, field values, chord and key names, attachment
links, and any name the author chose (a strumming pattern's, a custom
section's). The notation is unchanged, so a song is still written with
`ol:Verse 1` and `- Attachments:`. Also not translated: the plain-text form of
a song, the chord popup, and — on a preview mounted with `adoptContainer` —
anything but the song header, since the page around an adopted panel belongs
to the host.

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
