import { Injectable, signal } from '@angular/core';
import { Tab } from '../models/tab';

@Injectable({
    providedIn: 'root',
})
export class TabManagerService {
    tabs = signal<Tab[]>([new Tab()]);
    activatedTab = signal<Tab>(new Tab());

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
}
