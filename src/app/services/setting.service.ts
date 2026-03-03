import { Injectable, signal } from '@angular/core';
import { AppTheme, Profile, Settings } from '../models/setting';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { invoke } from '@tauri-apps/api/core';
import { TerminalProfileCommands } from '../enums/tauri-command';
import { form } from '@angular/forms/signals';

@Injectable({
    providedIn: 'root',
})
export class SettingService {
    openSetting = signal<boolean>(false);
    settings = signal<Settings>({
        appThemes: {},
        appThemeId: 'light',
        terminalSettings: {
            cursorStyle: 'bar',
            cursorBlink: true,
            fontWeight: 600,
            fontWeightBold: 600,
            fontSize: 14,
            letterSpacing: 0,
            lineHeight: 1,
            fontFamily: 'Cascadia Code',
            smoothScrollDuration: 30,
            cursorWidth: 1,
            background: 'Acrylic',
        },
        profiles: [
            {
                id: '',
                name: '',
                command: '',
            },
        ],
        defaultProfileId: '',
    });

    settingsForm = form(this.settings);

    constructor(private http: HttpClient) {
        this.init();
    }

    async init() {
        await this.loadTheme('light');

        const profiles = await invoke<Profile[]>(
            TerminalProfileCommands.get_available_terminals_command,
            {},
        );
        const updatedSettings: Settings = {
            ...this.settings(),
            profiles: profiles,
            defaultProfileId: profiles[0].id,
        };

        this.settings.set(updatedSettings);
    }

    setOpenSetting(openSetting: boolean) {
        this.openSetting.set(openSetting);
    }

    async loadTheme(themeName: 'light' | 'dark') {
        const themes = await firstValueFrom(
            this.http.get<Record<string, AppTheme>>('themes/themes.json'),
        );

        const selectedTheme: AppTheme = themes[themeName];
        const updatedSettings: Settings = {
            ...this.settings(),
            appThemeId: themeName,
            appThemes: themes,
            
        };

        this.settings.set(updatedSettings);
        this.applyThemeToDOM(selectedTheme);
    }

    private applyThemeToDOM(theme: AppTheme) {
        const root = document.documentElement;

        Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(`--${key}`, value);
        });
    }
}
