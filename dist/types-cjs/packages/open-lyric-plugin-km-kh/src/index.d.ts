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
 * The heavy contribution data — dictionaries, word patterns, provider
 * factory, keyboard spec — is *not* bundled here. It already ships inside
 * `open-lyric` (the component barrel transitively contains the built-in
 * plugin registry), so this package imports it from `open-lyric/internal`;
 * see `packages/build-support.ts`.
 */
export { EditorPluginKmKh, OpenLyricMarkdownManagerPluginKmKh, OpenLyricPluginKmKh, } from '../../../editor/plugins/km_KH/km_KH_component_plugins.js';
