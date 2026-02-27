import { Injectable, signal } from '@angular/core';
import { Tab } from '../models/tab';
import { TerminalModel } from '../models/terminal';

@Injectable({
    providedIn: 'root',
})
export class TabManagerService {
    defaultTab = new Tab();
    tabs = signal<Tab[]>([this.defaultTab]);
    activatedTabId = signal<string>(this.defaultTab.id);

    constructor() {}

    addTab(tab: Tab) {
        this.tabs.update((x) => {
            return [...x, tab];
        });
    }

    splitTerminal(tabId: string, terminalId: string) {
        const tab = this.tabs().find((x) => x.id === tabId);
        if (!tab) return;

        const terminal = tab.terminals.find((x) => x.id === terminalId);
        if (!terminal) return;

        const newTerminal = terminal.clone();
        console.log(terminal.id);
        console.log(newTerminal.id);
        

        this.tabs.update((tabs) =>
            tabs.map((tab) =>
                tab.id === tabId
                    ? {
                          ...tab,
                          terminals: [...tab.terminals, newTerminal],
                      }
                    : tab,
            ),
        );
    }

    removeTerminal(tabId: string, terminalId: string) {
        const tab = this.tabs().find((x) => x.id === tabId);
        if (!tab) return;

        const terminal = tab.terminals.find((x) => x.id === terminalId);
        if (!terminal) return;

        terminal.dispose();

        if (tab.terminals.length === 1) {
            this.tabs.update((x) => {
                return x.filter((t) => t.id !== tab.id);
            });
            return;
        }

        this.tabs.update((tabs) =>
            tabs.map((tab) =>
                tab.id === tabId
                    ? {
                          ...tab,
                          terminals: tab.terminals.filter((t) => t.id !== terminalId),
                      }
                    : tab,
            ),
        );
    }

    setActivatedTerminalModel(tabId: string, t: TerminalModel) {
        this.activatedTabId.set(tabId);
        this.markInitialized(tabId, t)
    }

    markInitialized(id: string, terminal: TerminalModel) {
        this.tabs.update((list) =>
            list.map((t) => (t.id === id ? { ...t, initialized: true, terminal } : t)),
        );
    }
}
