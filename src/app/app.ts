import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingService } from './services/setting.service';
import { TabManagerService } from './services/tab-manager.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, SettingsComponent],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('vsc-terminal');
    settingService = inject(SettingService);

    tabManagerService = inject(TabManagerService)
    
    constructor() {}

    async ngOnInit() {
        await this.settingService.init();
        await this.tabManagerService.init();

    }
}
