import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { Select } from '../../components/select/select';
import { TextInput } from '../../components/text-input/text-input';
import { NumberInput } from '../../components/number-input/number-input';
import { Radio } from '../../components/radio/radio';
import { FormField } from '@angular/forms/signals';
import { OptionModel } from '../../models/options.model';

@Component({
    selector: 'app-settings',
    imports: [CommonModule, Select, TextInput, NumberInput, Radio, FormField],
    templateUrl: './settings.component.html',
    styleUrl: './settings.component.css',
})
export class SettingsComponent {
    settingService = inject(SettingService);

    cursorStyles: OptionModel[] = [
        {
            label: 'bar',
            value: 'bar',
        },
        {
            label: 'underline',
            value: 'underline',
        },
        {
            label: 'block',
            value: 'block',
        },
    ];

    fontFamilies: OptionModel[] = [
        {
            label: 'Fira Code',
            value: 'Fira Code',
        },
        {
            label: 'JetBrains Mono',
            value: 'JetBrains Mono',
        },
        {
            label: 'Cascadia Code',
            value: 'Cascadia Code',
        },
        {
            label: 'Consolas',
            value: 'Consolas',
        },
    ];

    appThemes: OptionModel[] = [
        {
            label: 'Light',
            value: 'light',
        },
        {
            label: 'Dark',
            value: 'dark',
        },
    ];

    backgrounds: OptionModel[] = [
        {
            label: 'transparent',
            value: 'transparent',
        },
        {
            label: 'opaque',
            value: 'opaque',
        },
        {
            label: 'blurred',
            value: 'blurred',
        },
        {
            label: 'mica',
            value: 'mica',
        },
        {
            label: 'acrylic',
            value: 'acrylic',
        },
        {
            label: 'vibrancy',
            value: 'vibrancy',
        },
    ];

    defaultProfile = computed(() =>
        this.settingService
            .settings()
            .profiles.find((p) => p.id === this.settingService.settings().defaultProfileId),
    );

    ngOnInit() {}

    closeSettings() {
        this.settingService.setOpenSetting(false);
    }
}
