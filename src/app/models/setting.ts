export type BackgroundType = 'transparent' | 'opaque' | 'blurred' | 'mica' | 'acrylic' | 'vibrancy';
export type CursorStyleType = 'bar' | 'underline' | 'block';
export type FontFamilyType = 'Fira Code' | 'JetBrains Mono' | 'Cascadia Code' | 'Consolas';
export type AppThemeType = 'Light' | 'Dark';

export type Settings = {
    appThemes: Record<string, AppTheme>;
    appThemeId: string;
    profiles: Profile[];
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
    cursorBlink: boolean;
    fontWeight: number;
    fontWeightBold: number;
    fontSize: number;
    letterSpacing: number;
    lineHeight: number;
    fontFamily: FontFamilyType; //
    smoothScrollDuration: number; // 0 -> 500
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
