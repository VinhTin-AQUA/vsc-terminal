import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { TabIcon } from './tab';
import { invoke } from '@tauri-apps/api/core';

export class TerminalModel {
    id: string;
    terminal: Terminal;
    fitAddon: FitAddon;
    title: string;
    icon: TabIcon;
    initialized: boolean;

    private prompt = '';
    private currentLine = '';
    private history: string[] = [];
    private historyIndex = -1;
    private cursorPosition = 0;

    constructor() {
        this.id = crypto.randomUUID().toString();
        this.title = 'Powershell';
        this.icon = 'powershell';
        this.initialized = false;

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
        });

        this.fitAddon = new FitAddon();
        this.terminal.loadAddon(this.fitAddon);
        this.terminal.loadAddon(new WebLinksAddon());

        this.terminal.onData((data) =>
            {
                this.handleInput(data);
            },
        );
        this.terminal.onScroll(() => {});

        // this.terminal.attachCustomKeyEventHandler((e) => {
        //     console.log(e.key);

        //     return true;
        // });

        // this.terminal.writeln(this.id);

        // const onRender = this.terminal.onRender(() =>
        //     setTimeout(() => {
        //         this.resizeXterm();
        //     }, 0),
        // );
        // const onResize = this.terminal.onResize(() => {
        //     onRender.dispose();
        //     onResize.dispose();
        // });

        // this.resizeObserver = new ResizeObserver(() => this.resizeXterm());
    }

    clone() {
        const newTerminal: TerminalModel = new TerminalModel();
        newTerminal.id = crypto.randomUUID().toString();
        newTerminal.title = this.title;
        newTerminal.icon = this.icon;

        newTerminal.terminal = new Terminal({
            // linkHandler: {
            //     activate: (e, uri) => this.onLinkClicked(e, uri),
            //     hover: (_, uri, range) => this.onLinkHovered(uri, range),
            //     leave: () => this.onLinkLeaved(),
            // },
            allowProposedApi: this.terminal.options.allowProposedApi,
            fontFamily: this.terminal.options.fontFamily,
            allowTransparency: this.terminal.options.allowTransparency,
            fontSize: this.terminal.options.fontSize,
            drawBoldTextInBrightColors: this.terminal.options.drawBoldTextInBrightColors,
            cursorBlink: this.terminal.options.cursorBlink,
            scrollback: this.terminal.options.scrollback,
            lineHeight: this.terminal.options.lineHeight,
            cursorStyle: this.terminal.options.cursorStyle,
            letterSpacing: this.terminal.options.letterSpacing,
            fontWeight: this.terminal.options.fontWeight,
            fontWeightBold: this.terminal.options.fontWeightBold,
            ignoreBracketedPasteMode: this.terminal.options.ignoreBracketedPasteMode,
            minimumContrastRatio: this.terminal.options.minimumContrastRatio,
        });

        newTerminal.fitAddon = new FitAddon();

        newTerminal.terminal.loadAddon(this.fitAddon);
        newTerminal.terminal.loadAddon(new WebLinksAddon());

        newTerminal.terminal.onData((data) =>
            // this.dispatchEvent(new CustomEvent("data", { detail: data }))
            {
                // this.handleInput(data);
                invoke('write_terminal', {
                    terminalId: this.id,
                    data: data, // gửi raw keystroke
                });
            },
        );
        newTerminal.terminal.onScroll(() => {});
        return newTerminal;
    }

    open(el: HTMLDivElement) {
        this.terminal.open(el);
        this.fitAddon.fit();
    }

    async dispose() {
        this.terminal?.dispose();
        await invoke('close_terminal', { terminalId: this.id });
    }

    private async handleInput(data: string) {
        await invoke('write_terminal', { terminalId: this.id, data: data });
    }
}
