import { AbstractControl } from "@angular/forms";

export function minusculoValidator(control: AbstractControl) {
  const valor = control.value as String;
  if (valor !== valor.toLocaleLowerCase()) {
    return { minusculo: true };
  } else {
    return null;
  }
}
