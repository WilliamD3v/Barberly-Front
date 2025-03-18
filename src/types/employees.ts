export interface horarios {
  horario_final_manha: string;
  horario_final_tarde: string;
  horario_inicio_manha: string;
  horario_inicio_tarde: string;
}

export interface Employee {
  _id: string;
  name: string;
  barbearia_id: string;
  schedules: {
    days: string[];
    period: string;
    start_time?: string;
    end_time?: string;
    _id?: string;
    time?: {
      period_of_day: string;
      start_time: string;
      end_time: string;
    }[];
  }[];
}
