interface HorarioSelecionado {
  data: {
    date: string;
    day: string;
    horariosInicial: string;
    horariosFinal: string;
  };
}

export interface AgendamentoProps {
  _id: string;
  barbearia_id: string;
  funcionario_id: string;
  servico_id: string;
  nameFuncionario: string;
  totalPrice: number;
  totalDuration: number;
  items: {
    barbearia_id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
  }[];
  horarioSelecionados: HorarioSelecionado;
  status: string;
  data_criacao: string;
  data_expiracao: string;
}