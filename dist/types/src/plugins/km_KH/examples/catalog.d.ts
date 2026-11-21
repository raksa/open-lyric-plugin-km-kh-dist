/**
 * The Khmer example songs as menu entries, with no editor imports — read by
 * the plugin data's `examples` slot (`km_KH_ol_editor.ts`) and by the VS Code
 * extension's "Open Example" picker alike.
 */
declare const KHMER_EXAMPLE_GROUP_TITLE = "Khmer .md Examples";
declare const KHMER_EXAMPLES: {
    id: string;
    fileName: string;
    title: string;
    description: string;
    content: string;
}[];
export { KHMER_EXAMPLES, KHMER_EXAMPLE_GROUP_TITLE };
