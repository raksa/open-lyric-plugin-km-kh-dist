/**
 * The km-KH plugin's language facts: the Khmer script data — word patterns,
 * the zero-width word separator, the typed-space repair — from `khmer-lint`
 * (`src/khmer-lint/language.ts`), plus the plugin's own font faces. No asset
 * imports, so any host can read it: the editor plugin data
 * (`km_KH_ol_editor.ts`) builds on this module.
 */
export { KHMER_BASE_LETTER_RE, KHMER_SUGGEST_TRIGGER_CHARACTERS, KHMER_WORD_EXACT_RE, KHMER_WORD_RE, KHMER_WORD_SEPARATOR_RE, normalizeKhmerWord, ZERO_WIDTH_SPACE, } from '../../khmer-lint/language.js';
/**
 * The webfont this plugin ships (`km_KH_fonts.scss`) and the system Khmer
 * faces it falls back to. Declared HERE, once: nothing outside this plugin
 * names `editor-Battambang`. Everything that needs the name reads it back:
 * the component plugins' `language.fontFaces` + preview stack
 * (`km_KH_component_plugins.ts`), the PowerPoint export's face detection, the
 * app's initial font wait, and both font pickers (through
 * `getRegisteredPluginFonts()`).
 */
declare const KM_KH_WEBFONT_FACE = "editor-Battambang";
declare const KM_KH_SYSTEM_FONT_FACES: any[];
declare const KM_KH_FONT_FACES: any[];
/**
 * What the webfont is really called: an exported deck names it so, since no
 * computer has a font called {@link KM_KH_WEBFONT_FACE}.
 */
declare const KM_KH_FONT_NAMES: Readonly<{
    "editor-Battambang": "Battambang";
}>;
/** Khmer glyphs, so a font-load probe actually resolves the Khmer face. */
declare const KM_KH_FONT_SAMPLE_TEXT = "\u1785\u1798\u17D2\u179A\u17C0\u1784\u179F\u17B6\u1780\u179B\u17D2\u1794\u1784";
/** CSS font stack for the faces above, as the preview surfaces apply it. */
declare const KM_KH_FONT_STACK: string;
export { KM_KH_FONT_FACES, KM_KH_FONT_NAMES, KM_KH_FONT_SAMPLE_TEXT, KM_KH_FONT_STACK, KM_KH_SYSTEM_FONT_FACES, KM_KH_WEBFONT_FACE, };
