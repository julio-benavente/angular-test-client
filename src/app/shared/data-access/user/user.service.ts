import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IToken, JwtService } from '../jwt/jwt.service';

export interface IUser {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<IUser | null>(null);
  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: JwtService
  ) {}

  public login(data: IUser): void {
    this.http
      .post<IUser | IToken>('http://localhost:4423/auth/login', data)
      .subscribe({
        next: (user) => {
          this.user.next(user as IUser); // I have to fix this later
          this.jwtService.setJwt(user as IToken);
          this.router.navigate(['/app']);
        },
        error: () => {},
      });
  }

  public getUser(): Observable<IUser | null> {
    return this.user;
  }
}
