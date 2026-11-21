/**
 * Khmer for the fixed text of the preview surfaces, keyed by the English the
 * core prints. The component plugins contribute it as `language.labels`
 * (`km_KH_component_plugins.ts`); it applies while the label language is
 * Khmer — a song whose `Locales` declare `km-KH`, or the reader's own pick —
 * and leaves every other song in English.
 *
 * Three kinds of entry:
 *
 * - **Config labels** — the `ol:Config` field names and the placeholder title,
 *   which the renderers print.
 * - **Controls** — the settings popup, the actions menu, tooltips, export
 *   progress: whatever the preview builds around the song.
 * - **Patterns** — a key with `{0}` / `{1}` placeholders stands for a caption
 *   built around a name (`Edit {0}`); what a placeholder captured is
 *   translated in turn, so `Edit Verse 1 text` comes out whole.
 *
 * Nothing the author wrote is here: lyrics, field values and custom names are
 * shown as written. A section's standard name (`Verse 1`, `Chorus`) is the
 * notation's, and is translated for display only — the source still says
 * `ol:Verse 1`.
 */
/** The `ol:Config` field names and the placeholder title. */
declare const KM_KH_CONFIG_LABELS: Readonly<Record<string, string>>;
declare const KM_KH_PREVIEW_LABELS: Readonly<Record<string, string>>;
export { KM_KH_CONFIG_LABELS, KM_KH_PREVIEW_LABELS };
