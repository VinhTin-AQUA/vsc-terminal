import { Component, effect, signal } from '@angular/core';
import { TabManagerService } from '../../services/tab-manager.service';
import { Tab } from '../../models/tab';
import { TerminalModel } from '../../models/terminal';

@Component({
    selector: 'app-tab-bar',
    imports: [],
    templateUrl: './tab-bar.html',
    styleUrl: './tab-bar.css',
})
export class TabBar {
    constructor(public tabManagerService: TabManagerService) {
        // effect(() => {
        //     const t = this.tabManagerService.tabs();
        // });
    }

    setActivatedTerminalModel(tab: Tab, t: TerminalModel) {
        this.tabManagerService.setActivatedTerminalModel(tab.id, t);
    }
}
