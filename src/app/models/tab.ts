import { AppTheme, TerminalSettings } from './setting';
import { TerminalModel } from './terminal';

export type TabIcon = 'powershell' | 'cmd';

export class Tab {
    id: string;
    terminals: TerminalModel[];

    constructor(theme: AppTheme, terminalSettings: TerminalSettings) {
        this.id = crypto.randomUUID().toString();
        this.terminals = [new TerminalModel(theme, terminalSettings)];
    }
}
