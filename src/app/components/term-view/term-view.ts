import { Component, ElementRef, ViewChild } from '@angular/core';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

@Component({
    selector: 'app-term-view',
    imports: [],
    templateUrl: './term-view.html',
    styleUrl: './term-view.css',
})
export class TermView {
    @ViewChild('terminalContainer', { static: true })
    terminalContainer!: ElementRef<HTMLDivElement>;

    private terminal!: Terminal;
    private fitAddon!: FitAddon;

    ngAfterViewInit(): void {
        this.terminal = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#000000',
            },
        });

        this.fitAddon = new FitAddon();
        this.terminal.loadAddon(this.fitAddon);

        this.terminal.open(this.terminalContainer.nativeElement);
        this.fitAddon.fit();

        this.terminal.writeln('🚀 Angular + xterm.js ready!');
        this.terminal.write('$ ');
    }

    ngOnDestroy(): void {
        this.terminal?.dispose();
    }
}
