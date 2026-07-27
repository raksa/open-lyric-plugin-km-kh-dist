import type { OpenLyricComponentHost, OpenLyricContributions, OpenLyricPlugin, OpenLyricSurface } from '../../components/index.js';
/** km-KH for the `editor` surface (`gep`). */
declare class EditorPluginKmKh implements OpenLyricPlugin {
    readonly id = "km-KH";
    readonly apiVersion: 1;
    readonly surfaces: readonly OpenLyricSurface[];
    readonly contributes: OpenLyricContributions;
    private keyboardController;
    /** Same store the application uses, so keyboard prefs stay shared. */
    private readonly preferences;
    install(): void;
    uninstall(): void;
    onMount(host: OpenLyricComponentHost): void;
    onUnmount(): void;
    /** Programmatic access mirroring the Ctrl+Alt+K Monaco actions. */
    toggleKeyboard(): void;
    closeKeyboard(): void;
    get isKeyboardMounted(): boolean;
    private destroyKeyboard;
}
/** km-KH for the `markdown` surface (`gmp`): Khmer-capable fonts. */
declare class OpenLyricMarkdownManagerPluginKmKh implements OpenLyricPlugin {
    readonly id = "km-KH";
    readonly apiVersion: 1;
    readonly surfaces: readonly OpenLyricSurface[];
    readonly contributes: OpenLyricContributions;
    install(): void;
    uninstall(): void;
}
/** km-KH for the `lyric` surface (`glpp`): Khmer-capable fonts. */
declare class OpenLyricPluginKmKh implements OpenLyricPlugin {
    readonly id = "km-KH";
    readonly apiVersion: 1;
    readonly surfaces: readonly OpenLyricSurface[];
    readonly contributes: OpenLyricContributions;
    install(): void;
    uninstall(): void;
}
export { EditorPluginKmKh, OpenLyricMarkdownManagerPluginKmKh, OpenLyricPluginKmKh, };
