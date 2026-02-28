import { Component, effect, signal } from '@angular/core';
import { TabManagerService } from '../../services/tab-manager.service';
import { Tab } from '../../models/tab';
import { TerminalModel } from '../../models/terminal';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tab-bar',
    imports: [CommonModule],
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

    removeTerminal(event: Event, tab: Tab, terminal: TerminalModel) {
        event.stopPropagation();
          event.preventDefault();
        this.tabManagerService.removeTerminal(tab.id, terminal.id);
    }

    splitTerminal(event: Event, tab: Tab, terminal: TerminalModel) {
        event.stopPropagation();
          event.preventDefault();
        this.tabManagerService.splitTerminal(tab.id, terminal.id);
    }
}
