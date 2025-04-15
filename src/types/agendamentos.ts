interface SchedulePeriod {
  period_of_day: string;
  start_time: string;
  end_time: string;
}

interface Schedule {
  days: string[];
  period: "Sem Intervalo" | "Com Intervalo" | "Meio Periodo";
  start_time: string;
  end_time: string;
  time?: SchedulePeriod[]; // Apenas para "Com Intervalo"
}

interface EmployeeSchedule {
  _id: string;
  name: string;
  schedules: Schedule[];
}

interface DiaDaSemana {
  diaDaSemana: string; // Ex: "segunda-feira", "terça-feira", etc.
  diaNumerico: number; // Ex: 1 para segunda-feira, 2 para terça-feira, etc.
}

interface SelectedTime {
  day: string;
  time: string;
}

interface Cart {
  horarioSelecionados?: {
    data: {
      day: string;
      horariosInicial: string;
      horariosFinal: string;
    };
  };
}

interface Reserva {
  _id: string;
  horarioSelecionados: {
    data: {
      day: string;
      date: string;
      horariosInicial: string;
      horariosFinal: string;
    };
  };
}

export interface AgendamentoProps {
  diasDaSemana: DiaDaSemana[];
  dataEmployees?: EmployeeSchedule;
  selectedTimes?: SelectedTime;
  handleTimeChange: (
    dia: string,
    time: string,
    diaNumerico: number
  ) => void;
  cart?: Cart;
  cancelarTodosHorarios: () => void;
  handleAddHoursCart: () => void;
  dataScheduling?: Reserva[];
}

