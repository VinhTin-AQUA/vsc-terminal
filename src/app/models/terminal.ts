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
    initialized: boolean;

    private prompt = '$ ';
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
            // this.dispatchEvent(new CustomEvent("data", { detail: data }))
            {
                this.handleInput(data);
            },
        );
        this.terminal.onScroll(() => {});

        // this.terminal.attachCustomKeyEventHandler((e) => {
        //     console.log(e.key);

        //     return true;
        // });

        this.terminal.writeln(this.id);
        this.terminal.write('$ ');

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
        newTerminal.terminal.writeln(newTerminal.id);
        newTerminal.terminal.write('$ ');
        return newTerminal;
    }

    open(el: HTMLDivElement) {
        console.log(123);

        this.terminal.open(el);
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

    private handleInput(data: string) {
        switch (data) {
            // ENTER
            case '\r':
                console.log('Command:', this.currentLine);
                this.history.push(this.currentLine);
                this.historyIndex = this.history.length;

                this.currentLine = '';
                this.cursorPosition = 0;
                this.printPrompt();
                break;

            // BACKSPACE
            case '\x7f':
                if (this.cursorPosition > 0) {
                    this.currentLine =
                        this.currentLine.slice(0, this.cursorPosition - 1) +
                        this.currentLine.slice(this.cursorPosition);

                    this.cursorPosition--;

                    const afterCursor = this.currentLine.slice(this.cursorPosition);

                    this.terminal.write('\b'); // lùi 1
                    this.terminal.write(afterCursor + ' '); // overwrite
                    this.terminal.write(`\x1b[${afterCursor.length + 1}D`);
                }
                break;

            // CTRL+C
            case '\x03':
                this.terminal.write('^C\r\n');
                this.currentLine = '';
                this.cursorPosition = 0;
                this.printPrompt();
                break;

            // ARROW LEFT
            case '\x1b[D':
                if (this.cursorPosition > 0) {
                    this.terminal.write('\x1b[D');
                    this.cursorPosition--;
                }
                break;

            // ARROW RIGHT
            case '\x1b[C':
                if (this.cursorPosition < this.currentLine.length) {
                    this.terminal.write('\x1b[C');
                    this.cursorPosition++;
                }
                break;

            // ARROW UP
            case '\x1b[A':
                this.navigateHistory(-1);
                break;

            // ARROW DOWN
            case '\x1b[B':
                this.navigateHistory(1);
                break;

            default:
                // Printable chars
                if (data >= ' ') {
                    // Cập nhật buffer
                    this.currentLine =
                        this.currentLine.slice(0, this.cursorPosition) +
                        data +
                        this.currentLine.slice(this.cursorPosition);

                    // Phần phía sau con trỏ (sau khi chèn)
                    const afterCursor = this.currentLine.slice(this.cursorPosition + 1);

                    // In ký tự mới + phần phía sau
                    this.terminal.write(data + afterCursor);

                    // Di chuyển con trỏ về đúng vị trí
                    if (afterCursor.length > 0) {
                        this.terminal.write(`\x1b[${afterCursor.length}D`);
                    }

                    this.cursorPosition++;
                }
        }
    }

    // =========================
    // HISTORY
    // =========================

    private navigateHistory(direction: number) {
        if (this.history.length === 0) return;

        this.historyIndex += direction;

        if (this.historyIndex < 0) this.historyIndex = 0;
        if (this.historyIndex >= this.history.length) this.historyIndex = this.history.length - 1;

        this.currentLine = this.history[this.historyIndex];
        this.cursorPosition = this.currentLine.length;

        this.refreshLine();
    }

    // =========================
    // RENDER LINE
    // =========================

    private refreshLine() {
        // Move cursor to column 1 (thay vì \r)
        this.terminal.write('\x1b[1G');

        // Clear line from cursor to end
        this.terminal.write('\x1b[K');

        // Rewrite prompt + content
        this.terminal.write(this.prompt + this.currentLine);

        // Move cursor về đúng vị trí
        const moveLeft = this.currentLine.length - this.cursorPosition;

        if (moveLeft > 0) {
            this.terminal.write(`\x1b[${moveLeft}D`);
        }
    }

    private printPrompt(newLine: boolean = false) {
        if (newLine) {
        }

        this.terminal.write(`\r\n${this.prompt}`);
        // this.terminal.write();
    }
}
