import { Injectable, signal } from '@angular/core';
import { AppTheme, AppThemeType, Profile, Settings } from '../models/setting';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { invoke } from '@tauri-apps/api/core';
import { TerminalProfileCommands } from '../enums/tauri-command';
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
            fontFamily: 'Cascadia Code',
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
        await this.loadTheme('dark');

        const profiles = await invoke<Profile[]>(
            TerminalProfileCommands.get_available_terminals_command,
            {},
        );

        this.profiles.set(profiles);
        const updatedSettings: Settings = {
            ...this.settings(),
            defaultProfileId: profiles[0].id,
        };

        this.settings.set(updatedSettings);
    }

    setOpenSetting(openSetting: boolean) {
        this.openSetting.set(openSetting);
    }

    async loadTheme(themeName: AppThemeType) {
        const themes = await firstValueFrom(
            this.http.get<Record<string, AppTheme>>('themes/themes.json'),
        );

        this.appThemes.set(themes);
        const selectedTheme: AppTheme = themes[themeName];
        const updatedSettings: Settings = {
            ...this.settings(),
            appThemeId: themeName,
        };

        this.settings.set(updatedSettings);
        this.applyThemeToDOM(selectedTheme);
    }

    getAppThemes() {
        const theme = this.appThemes()[this.settings().appThemeId];
        return theme;
    }

    getTerminalSettings() {
        return this.settings().terminalSettings;
    }

    private applyThemeToDOM(theme: AppTheme) {
        const root = document.documentElement;

        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }
}
