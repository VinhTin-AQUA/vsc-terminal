import { Injectable, signal } from '@angular/core';
import { AppTheme, AppThemeType, Profile, Settings } from '../models/setting';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { invoke } from '@tauri-apps/api/core';
import { SettingsCommands, TerminalProfileCommands } from '../enums/tauri-command';
import { disabled, form, min, max } from '@angular/forms/signals';

@Injectable({
    providedIn: 'root',
})
export class SettingService {
    openSetting = signal<boolean>(false);
    appThemes = signal<Record<string, AppTheme>>({});
    profiles = signal<Profile[]>([]);

    settings = signal<Settings>({
        appThemeId: 'light',
        terminalSettings: {
            cursorStyle: 'bar',
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: 0,
            fontFamily: "'JetBrains Mono', monospace",
            cursorWidth: 1,
            background: 'Acrylic',
        },
        defaultProfileId: '',
    });

    settingsForm = form(this.settings, (x) => {
        // disabled(x.terminalSettings.fontSize)
        min(x.terminalSettings.fontSize, 12);
        max(x.terminalSettings.fontSize, 30);

        min(x.terminalSettings.fontWeight, 100);
        max(x.terminalSettings.fontWeight, 700);

        min(x.terminalSettings.letterSpacing, 1);
        max(x.terminalSettings.letterSpacing, 10);
    });

    constructor(private http: HttpClient) {}

    async init() {
        // get settings
        const settings = await invoke<Settings>(SettingsCommands.get_settings_command, {});
        this.settings.set(settings);

        // themes
        const themes = await firstValueFrom(
            this.http.get<Record<string, AppTheme>>('themes/themes.json'),
        );

        this.appThemes.set(themes);

        this.applyThemeToDOM(settings.appThemeId);

        // terminal profiles
        const profiles = await invoke<Profile[]>(
            TerminalProfileCommands.get_available_terminals_command,
            {},
        );
        this.profiles.set(profiles);
    }

    setOpenSetting(openSetting: boolean) {
        this.openSetting.set(openSetting);
    }

    getAppThemes() {
        const theme = this.appThemes()[this.settings().appThemeId];
        return theme;
    }

    getTerminalSettings() {
        return this.settings().terminalSettings;
    }

    getTerminalProfileCommand() {
        const profile = this.profiles().find((x) => x.id === this.settings().defaultProfileId);
        return profile?.command ?? '';
    }

    async saveSettings() {
        this.applyThemeToDOM(this.settings().appThemeId);
        const check = await invoke<Settings>(SettingsCommands.save_settings_command, {
            settings: this.settings(),
        });
    }

    private applyThemeToDOM(themeId: string) {
        const root = document.documentElement;
        const selectedTheme: AppTheme = this.appThemes()[themeId];

        Object.entries(selectedTheme).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }
}
