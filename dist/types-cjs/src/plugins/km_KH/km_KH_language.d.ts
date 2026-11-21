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
/** Khmer glyphs, so a font-load probe actually resolves the Khmer face. */
declare const KM_KH_FONT_SAMPLE_TEXT = "\u1785\u1798\u17D2\u179A\u17C0\u1784\u179F\u17B6\u1780\u179B\u17D2\u1794\u1784";
/** CSS font stack for the faces above, as the preview surfaces apply it. */
declare const KM_KH_FONT_STACK: string;
/**
 * Khmer for the fixed labels the preview surfaces print around a song, keyed
 * by the English label the core renders: the `ol:Config` field names and the
 * placeholder title. The component plugins contribute it as `language.labels`
 * (`km_KH_component_plugins.ts`), so it applies to a song whose `Locales`
 * declare `km-KH` and leaves every other song in English. What the author
 * wrote — section names, lyrics, values — is never translated.
 */
declare const KM_KH_PREVIEW_LABELS: Readonly<Record<string, string>>;
export { KM_KH_FONT_FACES, KM_KH_FONT_SAMPLE_TEXT, KM_KH_FONT_STACK, KM_KH_PREVIEW_LABELS, KM_KH_SYSTEM_FONT_FACES, KM_KH_WEBFONT_FACE, };
