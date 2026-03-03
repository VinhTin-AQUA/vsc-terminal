import { Component, inject } from '@angular/core';
import { TabManagerService } from '../../services/tab-manager.service';
import { Tab } from '../../models/tab';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { SettingService } from '../../services/setting.service';

@Component({
    selector: 'app-title-bar',
    imports: [],
    templateUrl: './title-bar.html',
    styleUrl: './title-bar.css',
})
export class TitleBar {
    private appWindow = getCurrentWindow();
    currentFile: string | null = null;
    isDirty = false;
    openMenu: 'file' | 'edit' | 'view' | null = null;

    settingService = inject(SettingService);

    constructor(private tabManagerService: TabManagerService) {}

    async minimize() {
        await this.appWindow.minimize();
    }

    async toggleMaximize() {
        const isMaximized = await this.appWindow.isMaximized();
        if (isMaximized) {
            await this.appWindow.unmaximize();
        } else {
            await this.appWindow.maximize();
        }
    }

    async close() {
        await this.appWindow.close();
    }

    toggleMenu(menu: 'file' | 'edit' | 'view', event: Event) {
        event.stopPropagation();
        this.openMenu = this.openMenu === menu ? null : menu;
    }

    async openFile() {
        this.openMenu = null;
    }

    addTab() {
        const tab: Tab = new Tab(
            this.settingService.getAppThemes(),
            this.settingService.settings().terminalSettings,
        );
        this.tabManagerService.addTab(tab);
    }

    openSettings() {
        this.settingService.setOpenSetting(true);
    }
}
