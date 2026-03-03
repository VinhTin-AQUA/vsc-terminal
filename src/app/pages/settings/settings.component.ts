import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { Select } from '../../components/select/select';
import { NumberInput } from '../../components/number-input/number-input';
import { Radio } from '../../components/radio/radio';
import { FormField } from '@angular/forms/signals';
import { OptionModel } from '../../models/options.model';
import {
    APP_THEMES,
    AppThemeType,
    BACKGROUNDS,
    BackgroundType,
    CURSOR_STYLES,
    CursorStyleType,
    FONT_FAMILIES,
    FontFamilyType,
} from '../../models/setting';
import { TabManagerService } from '../../services/tab-manager.service';

@Component({
    selector: 'app-settings',
    imports: [
        CommonModule,
        Select,
        NumberInput,
        Radio,
        FormField,
    ],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css',
})
export class SettingsComponent {
    settingService = inject(SettingService);
    tabManagerService = inject(TabManagerService);

    cursorStyleOptions: OptionModel<CursorStyleType>[] = Object.entries(CURSOR_STYLES).map(
        ([label, value]) => ({
            label,
            value: value as CursorStyleType,
        }),
    );

    fontFamilieOptions: OptionModel<FontFamilyType>[] = Object.entries(FONT_FAMILIES).map(
        ([label, value]) => {
            return {
                label: value as FontFamilyType,
                value: value as FontFamilyType,
            };
        },
    );

    appThemeOptions: OptionModel<AppThemeType>[] = Object.entries(APP_THEMES).map(
        ([label, value]) => ({
            label,
            value: value as AppThemeType,
        }),
    );

    backgroundOptions: OptionModel<BackgroundType>[] = Object.entries(BACKGROUNDS).map(
        ([value, label]) => ({
            label,
            value: value as BackgroundType,
        }),
    );

    defaultProfile = computed(() =>
        this.settingService
            .profiles()
            .find((p) => p.id === this.settingService.settings().defaultProfileId),
    );

    profileOptions: OptionModel[] = this.settingService
        .profiles()
        .map((x) => ({ label: x.name, value: x.id }));

    ngOnInit() {}

    closeSettings() {
        this.settingService.setOpenSetting(false);
        this.tabManagerService.reloadTerminals();
    }
}
