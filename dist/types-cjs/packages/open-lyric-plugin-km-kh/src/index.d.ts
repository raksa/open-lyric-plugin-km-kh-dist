/**
 * `open-lyric-plugin-km-kh` — Khmer support for the Open Lyric components,
 * expressed in the generic per-component plugin contract
 * (`research/editor-structure-implemented.md` §"Example: km-KH expressed in
 * the generic contract").
 *
 * One class per surface, because each surface consumes a different subset:
 *
 * - `EditorPluginKmKh`                   — `editor`: fonts, the Hunspell
 *   spellcheck spec, and the NiDA on-screen keyboard (Ctrl+Alt+K).
 * - `OpenLyricMarkdownManagerPluginKmKh` — `markdown`: Khmer-capable fonts.
 * - `OpenLyricPluginKmKh`                — `lyric`: Khmer-capable fonts.
 *
 * The heavy contribution data ships WITH this package: the Hunspell
 * dictionaries (`dics/`), the segmentation-aware spellcheck worker, the NiDA
 * keyboard and its stylesheet, and the Battambang faces
 * (`km_KH_fonts.scss`). `EditorPluginKmKh.install()` publishes the registry
 * data itself, so composing the plugin is what enables Khmer on a host —
 * the core `open-lyric` bundle carries none of it. Only the core's stateful
 * shared modules are imported from `open-lyric/internal`; see
 * `packages/build-support.ts`.
 */
export { EditorPluginKmKh, OpenLyricMarkdownManagerPluginKmKh, OpenLyricPluginKmKh, } from '../../../src/plugins/km_KH/km_KH_component_plugins.js';
export { KM_KH_WEBFONT_FACE } from '../../../src/plugins/km_KH/km_KH_ol_editor.js';
export { KHMER_BILINGUAL_PRAYER_EXAMPLE, KHMER_CALL_TO_WORSHIP_EXAMPLE, } from '../../../src/plugins/km_KH/examples/index.js';
export { version } from './version.js';
