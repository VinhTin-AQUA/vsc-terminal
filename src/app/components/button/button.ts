import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';

@Component({
    selector: 'app-button',
    imports: [CommonModule],
    templateUrl: './button.html',
    styleUrl: './button.css',
})
export class Button {
    @Input() formField?: FieldTree<boolean>;
    @Input() disabled = false;
    // @Input() icon?: 'check' | 'trash';
    // @Input() status: ButtonStatus = 'primary';
    @Input() class = '';

    @Output() buttonClick = new EventEmitter<boolean>();

    handleClick(event: Event) {
        if (!this.disabled) {
            this.buttonClick.emit();
        }
    }
}
