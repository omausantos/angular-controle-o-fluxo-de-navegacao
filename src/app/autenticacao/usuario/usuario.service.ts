import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenService: TokenService) {
    if (this.tokenService.possuiToken()) {
      this.decodificaJWT();
    }
  }

  private decodificaJWT(): void {
    const token = this.tokenService.retornaToken();
    if (token) {
      const usuario = jwt_decode(token) as Usuario;
      this.usuarioSubject.next(usuario);
    }
  }

  retornaUsuario(): Observable<Usuario> {
    return this.usuarioSubject.asObservable();
  }

  salvaToken(token: string): void {
    this.tokenService.salvaToken(token);
    this.decodificaJWT();
  }

  logout(): void {
    this.tokenService.excluiToken();
    this.usuarioSubject.next({});
  }

  estaLogado(): boolean {
    return this.tokenService.possuiToken();
  }
}