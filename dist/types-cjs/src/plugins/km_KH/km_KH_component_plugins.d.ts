import type { OpenLyricComponentHost, OpenLyricContributions, OpenLyricPlugin, OpenLyricSurface } from '../../editor/components/index.js';
/** What the label-language field can be set to. */
type KmKhLabelLanguage = 'auto' | 'en' | 'km-KH';
/** km-KH for the `editor` surface (`gep`). */
declare class EditorPluginKmKh implements OpenLyricPlugin {
    readonly id = "km-KH";
    readonly apiVersion: 1;
    readonly surfaces: readonly OpenLyricSurface[];
    readonly contributes: OpenLyricContributions;
    /**
     * Declare the Khmer `@font-face` rules in `document.head` for the page's
     * lifetime, without attaching the plugin to an `Editor`. The faces ONLY —
     * the NiDA keyboard chrome this plugin also contributes stays attach-scoped,
     * since it styles elements. See {@link installShellStyle}.
     */
    static installShellStyle(): void;
    private keyboardController;
    /** Same store the application uses, so keyboard prefs stay shared. */
    private readonly preferences;
    /** The global-registry registration this instance owns, if any. */
    private registryRegistration;
    /**
     * Publish the registry data through the GLOBAL plugin registry, so a
     * wrapped application (the app pages) boots Khmer spellcheck, the NiDA
     * keyboard, and the PPTX font styles from it. The dashboard no longer
     * registers km-KH as a built-in — composing this plugin is the only thing
     * that enables it. Guarded: with the km spellcheck or the NiDA keyboard
     * already registered (a second editor, an inline page registration) this
     * instance owns nothing.
     *
     * Runs synchronously from `addPlugin()`, i.e. before the dashboard boots.
     */
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
/** km-KH for the `markdown` surface (`gmp`): Khmer fonts and labels. */
declare class OpenLyricMarkdownManagerPluginKmKh implements OpenLyricPlugin {
    readonly id = "km-KH";
    readonly apiVersion: 1;
    readonly surfaces: readonly OpenLyricSurface[];
    readonly contributes: OpenLyricContributions;
    /**
     * Declare the Khmer `@font-face` rules in `document.head` for the page's
     * lifetime, without attaching the plugin to a surface — what a page that only
     * names the face (`fontFamily`/`fontFaces`) needs so the face it names
     * actually resolves. See {@link installShellStyle}.
     */
    static installShellStyle(): void;
    /**
     * The page's label language — `'auto'` (the song's `Locales` decide),
     * `'en'` or `'km-KH'`. The same choice the settings popup's "Label
     * language" field makes: assigning it switches every preview composing a
     * km-KH preview plugin, updates every popup showing the field, and is
     * remembered. An unknown value reads as `'auto'`.
     */
    static get labelLanguage(): KmKhLabelLanguage;
    static set labelLanguage(next: KmKhLabelLanguage);
    /** The page's label-language choice applies to this preview from now on. */
    install(host: OpenLyricComponentHost): void;
    uninstall(host: OpenLyricComponentHost): void;
}
/** km-KH for the `lyric` surface (`glpp`): Khmer fonts and labels. */
declare class OpenLyricPluginKmKh implements OpenLyricPlugin {
    readonly id = "km-KH";
    readonly apiVersion: 1;
    readonly surfaces: readonly OpenLyricSurface[];
    readonly contributes: OpenLyricContributions;
    /**
     * Declare the Khmer `@font-face` rules in `document.head` for the page's
     * lifetime, without attaching the plugin to a surface — what a page that only
     * names the face (`fontFamily`/`fontFaces`) needs so the face it names
     * actually resolves. See {@link installShellStyle}.
     */
    static installShellStyle(): void;
    /**
     * The page's label language — `'auto'` (the song's `Locales` decide),
     * `'en'` or `'km-KH'`. The same choice the settings popup's "Label
     * language" field makes: assigning it switches every preview composing a
     * km-KH preview plugin, updates every popup showing the field, and is
     * remembered. An unknown value reads as `'auto'`.
     */
    static get labelLanguage(): KmKhLabelLanguage;
    static set labelLanguage(next: KmKhLabelLanguage);
    /** The page's label-language choice applies to this preview from now on. */
    install(host: OpenLyricComponentHost): void;
    uninstall(host: OpenLyricComponentHost): void;
}
export type { KmKhLabelLanguage };
export { EditorPluginKmKh, OpenLyricMarkdownManagerPluginKmKh, OpenLyricPluginKmKh, };
