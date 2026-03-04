import { AppTheme, Profile, TerminalSettings } from './setting';
import { TerminalModel } from './terminal';


export class Tab {
    id: string;
    terminals: TerminalModel[];

    constructor(theme: AppTheme, terminalSettings: TerminalSettings, profile: Profile) {
        this.id = crypto.randomUUID().toString();
        this.terminals = [new TerminalModel(theme, terminalSettings, profile)];
    }
}
