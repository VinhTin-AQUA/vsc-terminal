export const TerminalProfileCommands = {
    get_available_terminals_command: 'get_available_terminals_command',
} as const;

export const SettingsCommands = {
    get_settings_command: 'get_settings_command',
    save_settings_command: 'save_settings_command',
} as const;

export const PtyCommands = {
    create_terminal: 'create_terminal',
    resize_terminal: 'resize_terminal',
    close_terminal: 'close_terminal',
    write_terminal: 'write_terminal',
} as const;
