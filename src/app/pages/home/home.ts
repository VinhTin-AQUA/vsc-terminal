import { Component, inject } from '@angular/core';
import { TitleBar } from '../../components/title-bar/title-bar';
import { TabBar } from '../../components/tab-bar/tab-bar';
import { TermView } from '../../components/term-view/term-view';
import { TabManagerService } from '../../services/tab-manager.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    imports: [TitleBar, TabBar, TermView, CommonModule],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {
    tabManager = inject(TabManagerService);

    constructor() {}

    gridTemplateColumns(length: number): string {
        
        return `repeat(${length}, minmax(0, 1fr))`;
    }
}
