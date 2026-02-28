import { Component, effect, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { TerminalModel } from '../../models/terminal';
import { TabManagerService } from '../../services/tab-manager.service';

@Component({
    selector: 'app-term-view',
    imports: [],
    templateUrl: './term-view.html',
    styleUrl: './term-view.css',
})
export class TermView {
    @ViewChild('terminalContainer', { static: true })
    terminalContainer!: ElementRef<HTMLDivElement>;

    @Input({ required: true }) terminal!: TerminalModel;
    @Input() tabId!: string;

    tabManager = inject(TabManagerService);

    constructor() {
    }

    // private viewInitialized = false;

    ngAfterViewInit(): void {
        // this.viewInitialized = true;
        // this.tryInitTerminal();
        console.log(123);
        
        this.terminal.open(this.terminalContainer.nativeElement);
    }

    // ngOnChanges(): void {
    //     this.tryInitTerminal();
    // }

    // private tryInitTerminal() {
    //     if (!this.viewInitialized) return;
    //     // if (this.terminal.initialized) return;

    //     this.terminal.open(this.terminalContainer.nativeElement);
    //     this.tabManager.markInitialized(this.tabId, this.terminal);
    // }
}
