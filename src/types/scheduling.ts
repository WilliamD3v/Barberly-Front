interface HorarioSelecionado {
  data: {
    date: string;
    day: string;
    horariosInicial: string;
    horariosFinal: string;
  };
}

interface ClitProps {
  name: string;
  phone: string;
  email: string;
  password: string;
}

export interface Scheduling {
  _id: string;
  barbearia_id: string;
  funcionario_id: string;
  servico_id: string;
  nameFuncionario: string;
  totalPrice: number;
  totalDuration: number;
  items: {
    _id: string;
    barbearia_id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
  }[];
  cliet: ClitProps;
  horarioSelecionados: HorarioSelecionado;
  status: string;
  data_criacao: string;
  data_expiracao: string;
}