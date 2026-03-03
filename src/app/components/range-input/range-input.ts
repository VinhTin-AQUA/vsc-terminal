import { Component, EventEmitter, forwardRef, Input, Output, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { FieldTree, FormField } from '@angular/forms/signals';
import { OptionModel } from '../../models/options.model';

@Component({
    selector: 'app-range-input',
    imports: [FormField],
    templateUrl: './range-input.html',
    styleUrl: './range-input.css',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RangeInput),
            multi: true,
        },
    ],
})
export class RangeInput implements ControlValueAccessor {
    // ====== Inputs ======
    @Input() formField?: FieldTree<number>;
    @Input() label = '';
    @Input() value: any = '';
    @Input() placeholder = '';
    @Input() disabled = false;
    @Input() readonly = false;
    @Input() id = crypto.randomUUID().toString();
    @Input() min = 1;
    @Input() max = 100;
    @Input() step = 1;

    @Output() valueChange = new EventEmitter<string>();

    // ====== ControlValueAccessor ======
    private onChange: (value: string) => void = () => {};
    private onTouched: () => void = () => {};

    writeValue(val: string): void {
        this.value = val ?? '';
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // ====== Event ======
    onInputChange(event: Event) {
        const newValue = (event.target as HTMLInputElement).value;
        this.value = newValue;

        if (this.formField) {
            this.formField()!.controlValue.set(Number(newValue));
        }

        this.onChange(newValue);
        this.valueChange.emit(newValue);
    }

    onFocus(event: FocusEvent) {
        const input = event.target as HTMLElement;
        this.updateDropdownPosition(input);
    }

    onBlur() {
        this.onTouched();
    }

    // ====== Autocomplete Logic ======

    updateDropdownPosition(input: HTMLElement) {
        const rect = input.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
    }

    selectOption(option: OptionModel) {
        this.value = option.value;
        const newValue = option.value;

        if (this.formField) {
            this.formField()!.controlValue.set(newValue);
        }

        this.onChange(newValue);
        this.valueChange.emit(newValue);
    }
}
