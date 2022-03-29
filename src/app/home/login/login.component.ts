import { AutenticacaoService } from './../../autenticacao/autenticacao.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public usuario: string = '';
  public senha: string = '';

  constructor(
    private authService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login(): void {
    console.log(`Usuário: ${this.usuario}`, `Senha: ${this.senha}`);
    this.authService.autenticar(this.usuario, this.senha).subscribe(
      () => {
        this.router.navigate([
          'animais',
        ]);
      },
      (error) => {
        alert('Usuário ou senha inválido');
        console.log(error);
      }
    );
  }
}
