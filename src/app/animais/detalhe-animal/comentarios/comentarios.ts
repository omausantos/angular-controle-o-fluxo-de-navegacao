export interface Comentario {
  date: Date,
  text: string,
  userNamer: string
}

export type Comentarios = Array<Comentario>;
