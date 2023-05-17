import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  constructor() {}
  private messages: { [key: string]: any } = {
    required: 'This field is required.',
    email: "It doesn't have an email format.",
    minlength: (characteres: number) =>
      `It requires at least ${characteres} characteres.`,
    maxlength: (characteres: number) =>
      `It can't have more than ${characteres} characteres.`,
    min: (min: number) => `The minimun number is ${min}.`,
    max: (max: number) => `The maximun number is ${max}.`,
  };

  public validationByField(fieldName: string, formGroup: FormGroup<any>) {
    if (!formGroup.get(fieldName)?.touched) {
      return '';
    }

    const errors = formGroup.get(fieldName)?.errors;

    if (!errors) {
      return '';
    }

    const firstEntry: [string, any] = Object.entries({ ...errors })[0];
    const firstError = firstEntry[0] ?? null;

    if (firstError === 'required') return this.messages['required'];
    if (firstError === 'email') return this.messages['email'];
    if (firstError === 'minlength') {
      return this.messages['minlength'](
        errors?.['minlength']?.['requiredLength'] ?? 0
      );
    }
    if (firstError === 'maxlength') {
      return this.messages['maxlength'](
        errors?.['maxlength']?.['requiredLength'] ?? 0
      );
    }
    if (firstError === 'min') {
      return this.messages['min'](errors?.['min']?.['min'] ?? 0);
    }
    if (firstError === 'max') {
      return this.messages['max'](errors?.['max']?.['max'] ?? 0);
    }
  }
}
