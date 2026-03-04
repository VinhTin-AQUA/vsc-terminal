// export type BackgroundType = 'transparent' | 'opaque' | 'blurred' | 'mica' | 'acrylic' | 'vibrancy';

export const BACKGROUNDS = {
    transparent: 'Transparent',
    opaque: 'Opaque',
    blurred: 'Blurred',
    mica: 'Mica',
    acrylic: 'Acrylic',
    vibrancy: 'Vibrancy',
} as const;
export type BackgroundType = (typeof BACKGROUNDS)[keyof typeof BACKGROUNDS];

export const CURSOR_STYLES = {
    bar: 'bar',
    underline: 'underline',
    block: 'block',
} as const;
export type CursorStyleType = (typeof CURSOR_STYLES)[keyof typeof CURSOR_STYLES];

export const FONT_FAMILIES = {
    Courier: 'Courier',
    Consolas: 'Consolas',
    Monaco: 'Monaco',
    Menlo: 'Menlo',
    DejaVuSansMono: 'DejaVu Sans Mono',
    UbuntuMono: 'Ubuntu Mono',
    LiberationMono: 'Liberation Mono',
    SourceCodePro: 'Source Code Pro',
    FiraCode: 'Fira Code',
    JetBrainsMono: 'JetBrains Mono',
    Inconsolata: 'Inconsolata',
    CascadiaCode: 'Cascadia Code',
    Terminus: 'Terminus',
} as const;
export type FontFamilyType = (typeof FONT_FAMILIES)[keyof typeof FONT_FAMILIES];

export const APP_THEMES = {
    Light: 'light',
    Dark: 'dark',
} as const;
export type AppThemeType = (typeof APP_THEMES)[keyof typeof APP_THEMES];

// ===============================

export type Settings = {
    appThemeId: string;
    defaultProfileId: string;
    terminalSettings: TerminalSettings;
};

export type Profile = {
    id: string;
    name: string;
    command: string; // "%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe"
};

export type TerminalSettings = {
    cursorStyle: CursorStyleType;
    fontWeight: number;
    fontSize: number;
    letterSpacing: number;
    fontFamily: FontFamilyType; //
    cursorWidth: number; // 1 -> 10
    background: BackgroundType;
};

export type AppTheme = {
    foreground: string;
    background: string;
    black: string;
    red: string;
    green: string;
    yellow: string;
    blue: string;
    magenta: string;
    cyan: string;
    white: string;
    brightBlack: string;
    brightRed: string;
    brightGreen: string;
    brightYellow: string;
    brightBlue: string;
    brightMagenta: string;
    brightCyan: string;
    brightWhite: string;
    cursor: string;
    cursorAccent: string;
    highlight: string;
};
