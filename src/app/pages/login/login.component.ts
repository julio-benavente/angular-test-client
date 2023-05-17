import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { UserService, IUser } from '../../shared/data-access/user/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  public user!: Observable<IUser | null>;

  public loginForm = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(12)],
    ],
  });

  private messages: { [key: string]: any } = {
    required: 'This field is required.',
    email: "It doesn't have an email format.",
    minlength: (characteres: number) =>
      `It requires at least ${characteres} characteres.`,
    maxlength: (characteres: number) =>
      `It can't have more than ${characteres} characteres.`,
  };

  public validationByField(fieldName: string) {
    if (!this.loginForm.get(fieldName)?.touched) {
      return '';
    }

    const errors = this.loginForm.get(fieldName)?.errors;

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
  }

  public onSubmit() {
    if (this.loginForm.invalid) {
      return console.log('invalid');
    }

    const logingResponse = this.userService.login({
      email: `${this.loginForm.value.email}`,
      password: `${this.loginForm.value.password}`,
    });

    // this.router.navigate(['/app']);
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log('this.user ', this.user);
  }
}
