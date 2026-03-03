import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { Select } from '../../components/select/select';
import { TextInput } from '../../components/text-input/text-input';
import { NumberInput } from '../../components/number-input/number-input';
import { Radio } from '../../components/radio/radio';
import { FormField } from '@angular/forms/signals';
import { OptionModel } from '../../models/options.model';
import { Checkbox } from '../../components/checkbox/checkbox';
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
import { Button } from "../../components/button/button";
import { RangeInput } from "../../components/range-input/range-input";

@Component({
    selector: 'app-settings',
    imports: [CommonModule, Select, TextInput, NumberInput, Radio, FormField, Checkbox, Button, RangeInput],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css',
})
export class SettingsComponent {
    settingService = inject(SettingService);

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

    appThemeOptions: OptionModel<AppThemeType>[] = Object.entries(APP_THEMES).map(([label, value]) => ({
        label,
        value: value as AppThemeType,
    }));

    backgroundOptions: OptionModel<BackgroundType>[] = Object.entries(BACKGROUNDS).map(
        ([value, label]) => ({
            label,
            value: value as BackgroundType,
        }),
    );

    defaultProfile = computed(() =>
        this.settingService
            .settings()
            .profiles.find((p) => p.id === this.settingService.settings().defaultProfileId),
    );

    ngOnInit() {}

    closeSettings() {
        this.settingService.setOpenSetting(false);
    }

    logData() {
        console.log(this.settingService.settings());
        
    }
}
