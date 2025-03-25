export interface Services {
  _id: string
  barbearia_id: string,
  name: string,
  description: string,
  price: number,
  duration: number,
}

interface Horario {
  day: string;
  horariosInicial: string;
  horariosFinal: string;
}

export interface HorariosSelecionados {
  [dia: string]: Horario;
}

export interface ClientProps {
  name: string,
  phone: string,
  email: string,
  password: string,
}