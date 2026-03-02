import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './settings.html',
    styleUrl: './settings.css',
})
export class Settings {
    // popup state
    isOpen = signal(true);

    // options
    profiles = ['CMD', 'PowerShell'];

    themes = ['Light', 'Dark', 'GitHub Light Default', 'GitHub Dark Default', 'Dracula'];

    fontFamilies = [
        'Fira Code, monospace',
        'Consolas, monospace',
        'JetBrains Mono, monospace',
        'Courier New, monospace',
    ];

    fontSizes = Array.from({ length: 11 }, (_, i) => 10 + i); // 10 -> 20

    scrollbacks = [1000, 2000, 5000, 10000, 20000];

    lineHeights = [1, 1.2, 1.4, 1.6, 1.8, 2];

    cursorStyles = ['bar', 'block', 'underline'];

    // selected values
    selectedProfile = signal('CMD');
    selectedTheme = signal('Light');
    selectedFont = signal('Fira Code, monospace');
    selectedFontSize = signal(14);
    selectedScrollback = signal(5000);
    selectedLineHeight = signal(1.4);
    selectedCursor = signal('block');

    close() {
        this.isOpen.set(false);
    }
}
