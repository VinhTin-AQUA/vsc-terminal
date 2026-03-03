import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, model, ModelSignal, Output } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';

@Component({
    selector: 'app-checkbox',
    imports: [CommonModule, FormField],
    templateUrl: './checkbox.html',
    styleUrl: './checkbox.css',
})
export class Checkbox {
    checked: ModelSignal<boolean> = model(false);

    @Input() formField?: FieldTree<boolean>;
    @Input() label = '';
    @Input() disabled = false;

    @Output() valueChange = new EventEmitter<boolean>();

    onInputChange(event: Event) {
        const value = (event.target as HTMLInputElement).checked;
        this.valueChange.emit(value);
    }
}
