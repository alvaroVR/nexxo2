import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, map, Observable, startWith} from "rxjs";
import {AutocompleteFilterService} from "./autocomplete-filter.service";

@Component({
  selector: 'app-autocomplete-filter',
  templateUrl: './autocomplete-filter.component.html',
  styleUrls: ['./autocomplete-filter.component.scss']
})
export class AutocompleteFilterComponent implements OnInit {
  @Input() control = new FormControl();

  @Input() sharedVar: string | any;
  @Input() label: string | any;
  @Output() sharedVarChange = new EventEmitter();


  @Input() set options(value: any[]) {
    this._options = [...(value ? value : [])];
    this.disableControl(this._options.length === 0);
    this.checkValidations();
  }

  @Input() placeholder: string | any;
  @Input() selectionChange: Function | any;

  @Input() set disabled(value: boolean) {
    this.disableControl(value);
  }

  @Input() set required(value: boolean) {
    this._required = value;
    this.checkValidations();
    this.completePlaceholder = `${this.placeholder} ${this._required ? '*' : ''}`;
  }

  private lastValue: string | any;
  dummyControl = new FormControl('');
  completePlaceholder = 'Elija una opción';
  _options: any;
  _required: boolean | any;
  filteredOptions: Observable<any> | any;

  constructor(private validationService: AutocompleteFilterService) {
    this.dummyControl.disable();
  }

  ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      map(value => this._filter(value))
    );
    this.completePlaceholder = `${this.placeholder} ${this._required ? '*' : ''}`;
  }

  private checkControlValue() {
    return this.control && this.control.value ? this.control.value : '';
  }

  private checkValidations() {
    const validators = !!this._required
      ? [this.validationService.requireMatch(this._options)]
      : [this.validationService.requireMatchWithEmpty(this._options)];
    this.control.setValidators(validators);
    this.control.updateValueAndValidity();
  }

  private _filter(value: string): any {
    const filterValue = value ? value.toString().toLowerCase() : '';
    if (this.lastValue && filterValue !== this.lastValue && filterValue === '' && this.selectionChange)
      this.selectionChange({option: {value: this.checkControlValue()}});
    this.lastValue = filterValue;
    return this._options ? this._options.filter((option: any) => option.name.toLowerCase().includes(filterValue)) : this._options;
  }

  private disableControl(value: boolean) {
    if (value) {
      this.control.disable({emitEvent: false});
    } else {
      this.control.enable({emitEvent: false});
    }
  }

  getLabelName(value: string) {
    const result = this._options ? this._options.find((option: any) => option.id === value) : null;
    return result ? result.name : undefined;
  }

  change(newValue: any) {
    console.log('newvalue', newValue)
    this.sharedVar = newValue;
    this.sharedVarChange.emit(newValue);
  }

}
