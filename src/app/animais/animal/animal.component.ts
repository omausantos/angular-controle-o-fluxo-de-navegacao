import { Component, OnInit, Input } from '@angular/core';

const API = "http://localhost:3000";

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  private urlOriginial = '';

  @Input() descricao = '';

  @Input() set url(url: string){
    if(url.startsWith('data')){
      this.urlOriginial = url;
    } else {
      this.urlOriginial = `${API}/imgs/${url}`;
    }
  }

  get url(): string {
    return this.urlOriginial;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
