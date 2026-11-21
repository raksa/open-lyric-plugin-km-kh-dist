/**
 * Khmer script facts as plain data — the word patterns, the zero-width word
 * separator and the repair pattern for typed spaces, the digits — with no
 * DOM, no assets and no dependencies, so every host reads the same ones: the
 * Open Lyric km-KH plugin, the VS Code Khmer Lint extension and the
 * `khmer-lint` tools.
 */
/** A run of Khmer text: letters, signs, ZWNJ/ZWJ and `.` inside a word. */
declare const KHMER_WORD_RE: RegExp;
declare const KHMER_WORD_EXACT_RE: RegExp;
/** A Khmer base letter (consonant or independent vowel). */
declare const KHMER_BASE_LETTER_RE: RegExp;
/** Khmer's word boundary is a zero-width space, not a visible one. */
declare const ZERO_WIDTH_SPACE = "\u200B";
/**
 * Runs of visible/soft whitespace BETWEEN Khmer letters, which an editor
 * rewrites to the zero-width word separator above. Typing a real space between
 * Khmer words is the common input mistake this repairs on paste and on Format.
 * The capture group is kept, so a generic rewriter can splice `$1` + the
 * separator without knowing anything about Khmer.
 */
declare const KHMER_WORD_SEPARATOR_RE: RegExp;
/**
 * Every Khmer base letter, as autocomplete trigger characters.
 *
 * Khmer runs without spaces, so there is no separator keystroke for a
 * word-suggest provider to trigger on — each letter has to be one.
 */
declare const KHMER_SUGGEST_TRIGGER_CHARACTERS: string[];
/** The Khmer digits ០–៩ (U+17E0–U+17E9), in order. */
declare const KHMER_DIGITS: string[];
/** A word with leading/trailing ZWNJ/ZWJ removed — how dictionaries list it. */
declare function normalizeKhmerWord(word: unknown): string;
export { KHMER_BASE_LETTER_RE, KHMER_DIGITS, KHMER_SUGGEST_TRIGGER_CHARACTERS, KHMER_WORD_EXACT_RE, KHMER_WORD_RE, KHMER_WORD_SEPARATOR_RE, normalizeKhmerWord, ZERO_WIDTH_SPACE, };
