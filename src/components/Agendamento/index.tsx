"use client";
import React, { useState } from "react";
import {
  ContainerElements,
  ContainerTableEmployees,
  ContainerTitle,
  Title,
  TableEmployees,
  DayContainer,
  BoxDay,
  DaysStyled,
  DaysNumber,
  ContainerInputDays,
  TimeInput,
  ContainerHoursSelected,
  TextHours,
  ContainerHoursCancel,
  ButtonHours,
  ContainerButton,
} from "./styled";

import { pt } from "date-fns/locale";
import { format, addDays } from "date-fns";
import { Employee } from "@/types/employees";
import { Services, ClientProps, HorariosSelecionados } from "@/types/services";

interface Cart {
  items: Services[];
  cliet: ClientProps;
  totalPrice: number;
  totalDuration: number;
  horarioSelecionados: HorariosSelecionados;
  funcionario: string;
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

interface AgendamentoProps {
  dataEmployees?: Employee;
  cart: Cart;
  setCart: React.Dispatch<React.SetStateAction<Cart>>;
  dataScheduling?: Reserva[];
}

export const AgendamentoHours: React.FC<AgendamentoProps> = ({
  dataEmployees,
  cart,
  setCart,
  dataScheduling,
}) => {
  const hoje = new Date();

  const diasDaSemana = Array.from({ length: 7 }).map((_, index) => {
    const diaFuturo = addDays(hoje, index);
    return {
      diaDaSemana: format(diaFuturo, "iiii", { locale: pt }),
      diaNumerico: format(diaFuturo, "dd/MM/yyyy"),
    };
  });

  const [alert, setAlert] = useState("");

  const [horariosSelecionados, setHorariosSelecionados] = useState<{
    [key: string]: {
      horariosInicial: string;
      horariosFinal: string;
      day: string;
      date: string;
    };
  }>({});
  const [selectedTimes, setSelectedTimes] = useState<{
    day: string;
    time: string;
  } | null>(null);

  const handleTimeChange = (day: string, value: string, date: string) => {
    const [hora, minuto] = value.split(":").map(Number);
    const totalMinutos = hora * 60 + minuto;
    const minutosFinais = totalMinutos + cart.totalDuration;

    const horasFinais = Math.floor(minutosFinais / 60);
    const minutosFinaisFormatados = minutosFinais % 60;
    const horarioFinal = `${String(horasFinais).padStart(2, "0")}:${String(minutosFinaisFormatados).padStart(2, "0")}`;

    const upperCaseDay =
      day.substring(0, 1).toUpperCase() +
      day.substring(1).replace("-feira", "");

    setSelectedTimes({ day, time: value });

    let horarioDisponivel = false;

    for (const schedule of dataEmployees?.schedules || []) {
      if (schedule.days.length > 0 && schedule.days.includes(upperCaseDay)) {
        if (
          schedule.period === "Sem Intervalo" &&
          schedule.start_time &&
          schedule.end_time &&
          schedule.start_time !== "--:--" &&
          schedule.end_time !== "--:--"
        ) {
          if (
            totalMinutos >= convertTimeToMinutes(schedule.start_time) &&
            minutosFinais <= convertTimeToMinutes(schedule.end_time)
          ) {
            horarioDisponivel = true;
            break;
          }
        } else if (
          schedule.period === "Com Intervalo" &&
          Array.isArray(schedule.time) &&
          schedule.time.length > 0
        ) {
          for (const periodo of schedule.time) {
            if (
              periodo.start_time &&
              periodo.end_time &&
              periodo.start_time !== "--:--" &&
              periodo.end_time !== "--:--" &&
              totalMinutos >= convertTimeToMinutes(periodo.start_time) &&
              minutosFinais <= convertTimeToMinutes(periodo.end_time)
            ) {
              horarioDisponivel = true;
              break;
            }
          }
        } else if (
          schedule.period === "Meio Periodo" &&
          schedule.start_time &&
          schedule.end_time &&
          schedule.start_time !== "--:--" &&
          schedule.end_time !== "--:--"
        ) {
          if (
            totalMinutos >= convertTimeToMinutes(schedule.start_time) &&
            minutosFinais <= convertTimeToMinutes(schedule.end_time)
          ) {
            horarioDisponivel = true;
            break;
          }
        }
      }
    }

    if (!horarioDisponivel) {
      setAlert(
        "O horário selecionado está fora do horário disponível da barbearia."
      );
      setHorariosSelecionados({});
      return;
    }

    const validDataScheduling = dataScheduling ?? [];

    for (const agendamento of validDataScheduling) {
      if (
        agendamento.horarioSelecionados?.data.day === day &&
        agendamento.horarioSelecionados?.data.date === date
      ) {
        const agendamentoInicio = convertTimeToMinutes(
          agendamento.horarioSelecionados?.data.horariosInicial
        );
        const agendamentoFim = convertTimeToMinutes(
          agendamento.horarioSelecionados?.data.horariosFinal
        );

        if (
          (totalMinutos >= agendamentoInicio &&
            totalMinutos < agendamentoFim) ||
          (minutosFinais > agendamentoInicio && minutosFinais <= agendamentoFim)
        ) {
          setAlert(
            "O horário selecionado já está ocupado. Escolha outro horário."
          );
          setHorariosSelecionados({});
          return;
        }
      }
    }

    setHorariosSelecionados((prev) => ({
      ...prev,
      data: { horariosInicial: value, horariosFinal: horarioFinal, day, date },
    }));
  };

  const convertTimeToMinutes = (time: string) => {
    const [hora, minuto] = time.split(":").map(Number);
    return hora * 60 + minuto;
  };

  const handleAddHoursCart = () => {
    setCart((prevCart) => {
      return {
        ...prevCart,
        horarioSelecionados: horariosSelecionados,
      };
    });
  };

  const cancelarTodosHorarios = () => {
    setCart((prev) => ({
      ...prev,
      horarioSelecionados: {},
    }));
    setSelectedTimes(null);
  };

  return (
    <ContainerElements>
      <ContainerTableEmployees>
        <ContainerTitle>
          <Title>Seleção de horario</Title>
        </ContainerTitle>

        <TableEmployees>
          {diasDaSemana.map((item) => {
            const upperCaseDay =
              item.diaDaSemana.substring(0, 1).toUpperCase() +
              item.diaDaSemana.substring(1).replace("-feira", "");

            const diaDisponivel = dataEmployees?.schedules.some((schedule) =>
              schedule.days.includes(upperCaseDay)
            );

            return (
              <DayContainer key={item.diaDaSemana}>
                <BoxDay>
                    <DaysStyled
                      data-full={
                        item.diaDaSemana.substring(0, 1).toUpperCase() +
                        item.diaDaSemana.substring(1).replace("-feira", "")
                      }
                      data-short={item.diaDaSemana.charAt(0).toUpperCase()}
                    >
                      {item.diaDaSemana.substring(0, 1).toUpperCase() +
                        item.diaDaSemana.substring(1).replace("-feira", "")}
                    </DaysStyled>

                  <DaysNumber
                    data-full={item.diaNumerico}
                    data-short={item.diaNumerico.slice(0, 5)}
                  />
                </BoxDay>

                <ContainerInputDays>
                  {diaDisponivel ? (
                    <>
                      <TimeInput
                        type="time"
                        value={
                          selectedTimes?.day === item.diaDaSemana
                            ? selectedTimes.time
                            : ""
                        }
                        onChange={(e) =>
                          handleTimeChange(
                            item.diaDaSemana,
                            e.target.value,
                            item.diaNumerico
                          )
                        }
                      />

                      {cart?.horarioSelecionados?.data &&
                        cart.horarioSelecionados?.data.day ===
                          item.diaDaSemana && (
                          <>
                            <ContainerHoursSelected>
                              <TextHours>
                                {cart.horarioSelecionados?.data.horariosInicial}
                              </TextHours>
                              <TextHours>/</TextHours>
                              <TextHours>
                                {cart.horarioSelecionados?.data.horariosFinal}
                              </TextHours>
                            </ContainerHoursSelected>

                            <ContainerHoursCancel>
                              <ButtonHours onClick={cancelarTodosHorarios}>
                                Cancelar
                              </ButtonHours>
                            </ContainerHoursCancel>
                          </>
                        )}

                      <ContainerButton>
                        <button onClick={handleAddHoursCart}>A</button>
                      </ContainerButton>
                    </>
                  ) : (
                    <div>
                      <h1>Fechado!</h1>
                    </div>
                  )}
                </ContainerInputDays>
              </DayContainer>
            );
          })}
        </TableEmployees>
      </ContainerTableEmployees>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Horários já agendados */}
        <div className="bg-slate-700 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">📅 Horários Agendados</h2>
          {dataScheduling && dataScheduling?.length > 0 ? (
            dataScheduling?.map((reserva) => (
              <div
                key={reserva._id}
                className="bg-black p-2 rounded-lg shadow-sm mb-2"
              >
                <p>
                  <strong>Dia:</strong> {reserva.horarioSelecionados?.data.day}{" "}
                  - {reserva.horarioSelecionados?.data.date}
                </p>
                <p>
                  <strong>Horário:</strong>{" "}
                  {reserva.horarioSelecionados?.data.horariosInicial} -{" "}
                  {reserva.horarioSelecionados?.data.horariosFinal}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhum horário agendado.</p>
          )}
        </div>

        {/* Horários de Funcionamento */}
        <div className="bg-slate-700 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">
            ⏰ Horários de Funcionamento
          </h2>
          {dataEmployees ? (
            <>
              <p className="mb-2">
                <strong>Funcionário:</strong> {dataEmployees.name}
              </p>
              {dataEmployees.schedules.map((schedule) => (
                <div
                  key={schedule.days.join("-")}
                  className="bg-black text-white p-2 rounded-lg shadow-sm mb-2"
                >
                  <p>
                    <strong>Dias:</strong> {schedule.days.join(", ")}
                  </p>
                  <p>
                    <strong>Período:</strong> {schedule.period}
                  </p>
                  {schedule.period === "Sem Intervalo" && (
                    <p>
                      <strong>Horário:</strong> {schedule.start_time} -{" "}
                      {schedule.end_time}
                    </p>
                  )}
                  {schedule.period === "Com Intervalo" &&
                    schedule.time &&
                    schedule.time.map((periodo, idx) => (
                      <p key={idx}>
                        <strong>{periodo.period_of_day}:</strong>{" "}
                        {periodo.start_time} - {periodo.end_time}
                      </p>
                    ))}
                  {schedule.period === "Meio Periodo" && (
                    <p>
                      <strong>Horário:</strong> {schedule.start_time} -{" "}
                      {schedule.end_time}
                    </p>
                  )}
                </div>
              ))}
            </>
          ) : (
            <p className="text-gray-500">Funcionário não encontrado.</p>
          )}
        </div>
      </div>

      <div>
        <h1>{alert}</h1>
      </div>
    </ContainerElements>
  );
};
