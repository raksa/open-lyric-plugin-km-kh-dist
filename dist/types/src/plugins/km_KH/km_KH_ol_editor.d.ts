import { createKhmerSpellcheckProvider } from './spellcheck-khmer-provider.js';
declare function normalizeKhmerWord(word: any): string;
declare const olEditorPluginData: {
    id: string;
    /**
     * The Khmer example songs ship WITH the plugin (`examples/`), not with the
     * core package: a page that composes km-KH gets them in its Examples menu
     * (via `getRegisteredPluginDraftExamples()`), one that doesn't never bundles
     * them. No `exampleEditorShellModes` restriction — they are offered on
     * whichever shell registered the plugin.
     */
    exampleGroupTitle: string;
    examples: {
        id: string;
        fileName: string;
        title: string;
        description: string;
        content: string;
    }[];
    keyboard: {
        actionLabel: string;
        create: ({ editor, monaco, onStateChange, ownerDocument, ownerWindow, preferences, refs, }: {
            editor: any;
            monaco: any;
            onStateChange: any;
            ownerDocument: any;
            ownerWindow: any;
            preferences: any;
            refs: any;
        }) => {
            close(): void;
            destroy(): void;
            getState(): {
                isOpen: boolean;
                isMinimized: boolean;
                layoutId: string;
                layoutLabel: string;
                mode: string;
                position: {
                    left: any;
                    top: any;
                } | null;
                size: {
                    height: number;
                    width: number;
                } | null;
                targetKind: any;
            };
            open(): void;
            toggle(): void;
        };
        displayName: string;
        id: string;
        openActionId: string;
        closeActionId: string;
    };
    spellChecker: {
        actionLabel: string;
        af: string;
        aliases: string[];
        baseLetterPattern: RegExp;
        defaultEnabled: boolean;
        dictionaryName: string;
        dict: string;
        displayName: string;
        exactWordPattern: RegExp;
        languageCode: string;
        normalizeWord: typeof normalizeKhmerWord;
        providerFactory: typeof createKhmerSpellcheckProvider;
        suggestAffUrls: string[];
        wordPattern: RegExp;
        /**
         * This script separates words with an invisible character. The core reads
         * it for the word-suggest accept suffix, for deciding that a zero-width
         * space in a line is a real separator rather than stray invisible junk,
         * and (with {@link wordSeparatorPattern}) for repairing typed spaces.
         * Languages that omit it are treated as plain-space separated.
         */
        wordSeparator: string;
        wordSeparatorPattern: RegExp;
        /** See {@link KHMER_SUGGEST_TRIGGER_CHARACTERS}. */
        suggestTriggerCharacters: string[];
        /**
         * Menu label for the re-segmentation command. The command itself is
         * offered by the provider (`getSegmentationSuggestion`), which is what
         * gates the entry — this only names it, so the core spells out no
         * language.
         */
        segmentationActionLabel: string;
    };
    style: string[];
    /**
     * The faces this plugin makes available to every host that registers it,
     * read back through `getRegisteredPluginFonts()`. The core no longer names
     * any Khmer face: the app's initial font wait probes whatever is registered
     * here, and the app-page preview font-family datalist lists it.
     */
    fonts: {
        faces: any[];
        stack: string;
        sampleText: string;
    };
    /**
     * BCP-47 locales this plugin adds to the transcript plugin's locale picker,
     * ahead of its alphabetical block. Offering only — the transcript surface
     * starts on `DEFAULT_TRANSCRIPT_LOCALE` (`en-US`) on every page, whatever is
     * registered here, so composing km-KH never silently switches the
     * transcription language on the user. Picking `km-KH` is their call, and the
     * pick persists.
     *
     * It does still set the fallback locale tagged onto mobile keyboard
     * dictation (`getKeyboardTranscriptDefaultLocale()`), which is what routes
     * that text through Khmer word segmentation.
     */
    transcriptLocales: string[];
    pptxStyle: {
        fontFamilyChoices: any[];
        fontDetectionSampleText: string;
        fontSize: number;
    };
};
export { olEditorPluginData };
