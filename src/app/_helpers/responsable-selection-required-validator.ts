import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Responsable } from '../_models/Responsable';

// Leverage TypeScript type guards to check to see if we have a Character type selected
function instanceOfCharacter(responsable: any): responsable is Responsable {
  return !!responsable // truthy
    && typeof responsable !== 'string' // Not just string input in the autocomplete
    && 'nombre' in responsable; // Has some qualifying property of Character type
}

export const ResponsableSelectionRequiredValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null =>
  (!instanceOfCharacter(control.value) ? { matchRequired: true } : null);



