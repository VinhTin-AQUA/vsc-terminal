export enum PtyCommands {
    create_terminal = 'create_terminal',
    resize_terminal = 'resize_terminal',
    close_terminal = 'close_terminal',
    write_terminal = 'write_terminal',
}

export enum TerminalProfileCommands {
    get_available_terminals_command = 'get_available_terminals_command',
}

export enum SettingsCommands {
    get_settings_command = 'get_settings_command',
    save_settings_command = 'save_settings_command',
}
