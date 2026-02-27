import { TerminalModel } from './terminal';

export type TabIcon = 'powershell' | 'cmd';

export class Tab {
    id: string;
    terminals: TerminalModel[];

    constructor() {
        this.id = crypto.randomUUID().toString();
        this.terminals = [new TerminalModel()];
    }
}
