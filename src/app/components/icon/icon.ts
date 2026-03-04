import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconName } from './types/icon-types';

@Component({
    selector: 'app-icon',
    imports: [CommonModule],
    templateUrl: './icon.html',
    styleUrl: './icon.css',
})
export class Icon {
    @Input() name!: string; // icon name size: string = ''; // e.g. "24px" | "2rem" | "1.5em" color: string = ''; // CSS color
    @Input() fill?: string = 'currentColor'; // override fill
    @Input() stroke?: string = 'currentColor'; // stroke color for outline icons
    @Input() class?: string; // extra classes
    @Input() size?: string;
    @Input() color?: string;
    spritePath: string = '/icons/sprite.svg';
}
