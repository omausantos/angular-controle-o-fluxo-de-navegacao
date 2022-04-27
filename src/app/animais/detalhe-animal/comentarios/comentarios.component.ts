import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, switchMap, tap } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Comentarios } from './comentarios';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {
  comentarios$!: Observable<Comentarios>;
  comentarioForm!: FormGroup;
  @Input() id!: number;

  constructor(
    private comentariosService: ComentariosService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.comentarios$ = this.comentariosService.buscaComentario(this.id);
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', [Validators.maxLength(300), Validators.minLength(5)]]
    })
  }

  salvar(): void {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';
    this.comentarios$ = this.comentariosService.incluiComentario(this.id, comentario)
      .pipe(
        switchMap(() => this.comentariosService.buscaComentario(this.id)),
        tap(() => {
          this.comentarioForm.reset(),
          alert('Comentário salvo com sucesso');
        })
      )
  }

}
