import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';

export class TerminalModel {
    id: string;
    terminal: Terminal;
    fitAddon: FitAddon;

    constructor() {

        this.callbacks = callbacks;

        let background;
        [this.root, background] = Terminal.generateComponent(profile);
        if (background) {
            this.element.appendChild(background);
        }
        this.element.appendChild(this.root);

        this.hyperlinkModifiers = profile.terminalSettings.hyperlinkModifier
            .toLowerCase()
            .replaceAll(" ", "")
            .split("+")
            .filter((m) => m !== "");

        const theme = structuredClone(profile.theme);
        if (profile.backgroundTransparency < 100) {
            theme.background = "rgba(0,0,0,0)";
        }

        this.terminal = new Terminal({
            // linkHandler: {
            //     activate: (e, uri) => this.onLinkClicked(e, uri),
            //     hover: (_, uri, range) => this.onLinkHovered(uri, range),
            //     leave: () => this.onLinkLeaved(),
            // },
            allowProposedApi: true,
            fontFamily: "Fira Code, monospace",
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
            theme,
        });

        this.fitAddon = new FitAddon();

        this.xterm.loadAddon(this.fitAddon);
        this.xterm.loadAddon(new CanvasAddon());
        this.xterm.loadAddon(
            new WebLinksAddon((e, uri) => this.onLinkClicked(e, uri), {
                hover: (_, uri, range) => this.onLinkHovered(uri, range),
                leave: () => this.onLinkLeaved(),
            })
        );

        this.xterm.onData((data) =>
            this.dispatchEvent(new CustomEvent("data", { detail: data }))
        );
        this.xterm.onScroll(() => this.disposeTooltip());

        this.xterm.attachCustomKeyEventHandler((e) =>
            this.callbacks.keyPress(e)
        );
        this.xterm.attachCustomWheelEventHandler((e) => {
            if (
                ((this.xterm.buffer.active.viewportY <
                    this.xterm.buffer.active.baseY &&
                    e.deltaY > 0) ||
                    (this.xterm.buffer.active.viewportY > 0 && e.deltaY < 0)) &&
                this.tooltip
            ) {
                this.disposeTooltip();
            }
            return true;
        });

        const onRender = this.xterm.onRender(() =>
            setTimeout(() => {
                this.resizeXterm();
            }, 0)
        );
        const onResize = this.xterm.onResize(() => {
            onRender.dispose();
            onResize.dispose();
        });

        this.resizeObserver = new ResizeObserver(() => this.resizeXterm());
    }
}
