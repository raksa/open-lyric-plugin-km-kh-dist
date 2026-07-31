/**
 * The Khmer example songs, as raw Open Lyric markdown.
 *
 * They ship WITH this plugin rather than with the core package (see
 * `km_KH_ol_editor.ts`), and reach a page's Examples menu through the plugin
 * data's `examples` slot. This barrel is the second way in: a host that wants
 * to seed a surface's initial content — rather than offer the song in a menu —
 * imports the text directly, which is what the standalone preview and editor
 * page entries do.
 *
 * Both paths read the same module, so the strings are bundled once.
 */
/** ព្រះគុណនៅព្រឹកនេះ — Khmer-only worship draft (intro, verses, chorus). */
export declare const KHMER_CALL_TO_WORSHIP_EXAMPLE: string;
/** អធិស្ឋានដោយសេចក្ដីសង្ឃឹម — Khmer/English line pairs for a prayer draft. */
export declare const KHMER_BILINGUAL_PRAYER_EXAMPLE: string;
