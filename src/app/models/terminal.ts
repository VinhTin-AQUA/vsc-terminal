import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { TabIcon } from './tab';

export class TerminalModel {
    id: string;
    terminal: Terminal;
    fitAddon: FitAddon;
    title: string;
    icon: TabIcon;

    constructor() {
        this.id = crypto.randomUUID().toString();
        this.title = 'Powershell';
        this.icon = 'powershell';

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
            // this.dispatchEvent(new CustomEvent("data", { detail: data }))
            {},
        );
        this.terminal.onScroll(() => {});

        this.terminal.attachCustomKeyEventHandler((e) => {
            console.log(e.key);

            return true;
        });

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

        newTerminal.terminal = this.terminal;
        return newTerminal;
    }

    dispose(): void {
        this.terminal?.dispose();
    }

    // private resizeXterm() {
    //     this.disposeTooltip();
    //     const dimensions = this.fitAddon.proposeDimensions();
    //     if (dimensions?.cols && dimensions.rows) {
    //         this.terminal.resize(dimensions.cols, dimensions.rows);
    //         this.dispatchEvent(
    //             new CustomEvent("resize", {
    //                 detail: dimensions,
    //             })
    //         );
    //     }
    // }
}
