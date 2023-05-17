import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IToken {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private jwt = new BehaviorSubject<IToken | null>(null);

  constructor() {}

  setJwt(data: IToken) {
    console.log({ setJwt: data });
    this.jwt.next(data);
  }

  getJwt(): Observable<IToken | null> {
    return this.jwt;
  }
}
