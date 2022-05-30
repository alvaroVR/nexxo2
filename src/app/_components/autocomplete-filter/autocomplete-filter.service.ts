import {Injectable} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AutocompleteFilterService {
  getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config: any = {
      required: "This field is required",
      requireMatch: "Please, enter a valid option"
    };

    return config[validatorName];
  }

  requireMatch(options: any) {
    return (control: AbstractControl) => {
      const selection: any =
        options && options.find((o: any) => o.value === control.value)
          ? null
          : {requireMatch: true};
      return selection;
    };
  }

  requireMatchWithEmpty(options: any) {
    return (control: AbstractControl) => {
      const selection: any =
        (options && options.find((o: any) => o.value === control.value)) ||
        !control.value
          ? null
          : {requireMatch: true};
      return selection;
    };
  }
}
