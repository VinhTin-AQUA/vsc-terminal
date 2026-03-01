import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { TabIcon } from './tab';
import { invoke } from '@tauri-apps/api/core';
import { debounceTime, Subject } from 'rxjs';

export class TerminalModel {
    id: string;
    terminal: Terminal;
    fitAddon: FitAddon;
    title: string;
    icon: TabIcon;
    active: boolean;
    private resizeObserver: ResizeObserver;
    private resizeSubject = new Subject<void>();

    constructor() {
        this.id = crypto.randomUUID().toString();
        this.title = 'Powershell';
        this.icon = 'powershell';
        this.active = false;

        this.terminal = new Terminal({
            // linkHandler: {
            //     activate: (e, uri) => this.onLinkClicked(e, uri),
            //     hover: (_, uri, range) => this.onLinkHovered(uri, range),
            //     leave: () => this.onLinkLeaved(),
            // },
            allowProposedApi: true,
            fontFamily: 'Fira Code, monospace',
            allowTransparency: true,
            fontSize: 12,
            drawBoldTextInBrightColors: true,
            cursorBlink: true,
            scrollback: 3000,
            lineHeight: 100 / 100,
            cursorStyle: 'bar',
            letterSpacing: 0,
            fontWeight: 6 * 100,
            fontWeightBold: 6 * 100,
            ignoreBracketedPasteMode: !true,
            minimumContrastRatio: 1,
            convertEol: false,
        });

        this.fitAddon = new FitAddon();
        this.terminal.loadAddon(this.fitAddon);
        this.terminal.loadAddon(new WebLinksAddon());

        this.terminal.onData((data) => {
            this.handleInput(data);
        });
        this.terminal.onScroll(() => {});

        // this.resizeSubject.pipe(debounceTime(150)).subscribe(() => {
        //     if (this.active === false) {
        //         this.active = true;
        //         this.fitAddon.fit();

        //         invoke('resize_terminal', {
        //             terminalId: this.id,
        //             cols: this.terminal.cols,
        //             rows: this.terminal.rows,
        //         });
        //     }
        // });

        this.resizeSubject.pipe(debounceTime(100)).subscribe(() => {
            this.fitAddon.fit();

            invoke('resize_terminal', {
                terminalId: this.id,
                cols: this.terminal.cols,
                rows: this.terminal.rows,
            });
        });

        this.terminal.onResize(({ cols, rows }) => {
            invoke('resize_terminal', {
                terminalId: this.id,
                cols: cols,
                rows: rows,
            });
        });

        // this.terminal.attachCustomKeyEventHandler((e) => {
        //     console.log(e.key);

        //     return true;
        // });

        this.resizeObserver = new ResizeObserver(() => this.resizeXterm());
    }

    clone() {
        const newTerminal: TerminalModel = new TerminalModel();
        newTerminal.id = crypto.randomUUID().toString();

        return newTerminal;
    }

    open(el: HTMLDivElement) {
        // this.terminal.open(el);
        // this.fitAddon.fit();

        // this.resizeObserver = new ResizeObserver(() => {
        //     this.resizeSubject.next();
        // });

        // this.resizeObserver.observe(el);

        this.terminal.open(el);

        this.fitAddon.fit();

        invoke('resize_terminal', {
            terminalId: this.id,
            cols: this.terminal.cols,
            rows: this.terminal.rows,
        });

        this.resizeObserver = new ResizeObserver(() => {
            this.resizeSubject.next();
        });

        this.resizeObserver.observe(el);
    }

    async dispose() {
        this.terminal?.dispose();
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        await invoke('close_terminal', { terminalId: this.id });
    }

    private async handleInput(data: string) {
        await invoke('write_terminal', { terminalId: this.id, data: data });
    }

    private resizeXterm() {
        // const dimensions = this.fitAddon.proposeDimensions();
        // if (dimensions?.cols && dimensions.rows) {
        //     this.terminal.resize(dimensions.cols, dimensions.rows);
        // }

        this.fitAddon.fit();
    }
}
