/**
 * The Khmer NiDA keyboard layout: what each physical key (by
 * `KeyboardEvent.code`) types in each layer — plain, Shift, Alt (Option) and
 * Alt + Shift. A key a layer leaves out has no Khmer character in it.
 *
 * Pure data, with no DOM and no side effects, so every host reads the same
 * table: the Open Lyric on-screen keyboard (`keyboard-km-nida.ts`), the VS
 * Code Khmer Lint typing mode, and the key conversions in `keyboard.ts`.
 */
type KhmerKeyLayer = 'base' | 'shift' | 'alt' | 'altShift';
declare const KHMER_KEY_LAYOUTS: Readonly<Record<KhmerKeyLayer, Readonly<Record<string, string>>>>;
export { KHMER_KEY_LAYOUTS };
export type { KhmerKeyLayer };
