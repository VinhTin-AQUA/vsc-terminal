import { Injectable, signal } from '@angular/core';
import { Tab } from '../models/tab';
import { TerminalModel } from '../models/terminal';
import { invoke } from '@tauri-apps/api/core';

@Injectable({
    providedIn: 'root',
})
export class TabManagerService {
    tabs = signal<Tab[]>([]);
    activatedTabId = signal<string>('');
    activatedTerminalId = signal<string>('');

    constructor() {
        const defaultTab = new Tab();
        this.tabs.update((x) => {
            return [defaultTab];
        });

        this.activatedTabId = signal<string>(defaultTab.id);
        this.activatedTerminalId = signal<string>(defaultTab.terminals[0].id);

        invoke('create_terminal', { terminalId: defaultTab.terminals[0].id });
    }

    async addTab(tab: Tab) {
        this.tabs.update((x) => {
            return [...x, tab];
        });
        this.setActivatedTerminalModel(tab.id, tab.terminals[0]);
        await invoke('create_terminal', { terminalId: tab.terminals[0].id });
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

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const tab = this.tabs().find((tab) => tab.id === tabId);
                tab?.terminals.forEach((t) => t.fitAddon.fit());
            });
        });
    }

    removeTerminal(tabId: string, terminalId: string) {
        const tab = this.tabs().find((x) => x.id === tabId);
        const tabIndex = this.tabs().findIndex((x) => x.id === tabId);
        if (!tab) return;

        const terminal = tab.terminals.find((x) => x.id === terminalId);
        const terminalIndex = tab.terminals.findIndex((x) => x.id === terminalId);
        if (!terminal) return;

        if (this.tabs().length === 1 && tab.terminals.length === 1) return;
        terminal.dispose();

        if (tab.terminals.length === 1) {
            if (tab.id === this.activatedTabId()) {
                if (tabIndex === this.tabs().length - 1) {
                    this.activatedTabId.set(this.tabs()[tabIndex - 1].id);
                    this.activatedTerminalId.set(this.tabs()[tabIndex - 1].terminals[0].id);
                } else {
                    this.activatedTabId.set(this.tabs()[tabIndex + 1].id);
                    this.activatedTerminalId.set(this.tabs()[tabIndex + 1].terminals[0].id);
                }
            }

            this.tabs.update((x) => {
                return x.filter((t) => t.id !== tab.id);
            });
            return;
        }

        if (terminalId === this.activatedTerminalId()) {
            if (terminalId === tab.terminals[tab.terminals.length - 1].id) {
                this.activatedTerminalId.set(tab.terminals[terminalIndex - 1].id);
            } else {
                this.activatedTerminalId.set(tab.terminals[terminalIndex + 1].id);
            }
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
        this.activatedTerminalId.set(t.id);
        this.markInitialized(tabId, t);

        // const tab = this.tabs().find((tab) => tab.id === tabId);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const tab = this.tabs().find((tab) => tab.id === tabId);
                tab?.terminals.forEach((t) => t.fitAddon.fit());
            });
        });
    }

    markInitialized(id: string, terminal: TerminalModel) {
        this.tabs.update((list) =>
            list.map((t) => (t.id === id ? { ...t, initialized: true, terminal } : t)),
        );
    }
}
