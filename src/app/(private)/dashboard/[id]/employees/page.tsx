"use client";

import { useEffect, useState } from "react";
import {
  Title,
  Form,
  CheckboxContainer,
  CheckboxLabel,
  Button,
  Input,
  TimeInput,
  CardInput,
  Label,
  TextName,
  ContainerInput,
  ContainerHoursButtons,
  ContainerHours,
  TitleHours,
  ButtonHours,
  ContainerSelectdHours,
  BoxInputEmployees,
  ModHoursText,
  ModHoursIcon,
  BoxModHoursText,
  Container,
  TitleDaysSelecteds,
} from "./styled";
import axios from "@/lib/axios";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { GlobalStyle } from "../service/styled";
import ButtonBack from "@/components/ButtonBack";
import { LoadingBar } from "@/components/LoadingBar";
import { getEmployeesDataAll } from "@/hooks/useUsers";
import { Employee } from "@/types/employees";
import { useQuery } from "@tanstack/react-query";

import { FaCheckCircle } from "react-icons/fa";
import { FloatingMessage } from "@/components/FloatingMessage";

export default function EnviarDados() {
  const { id } = useParams();
  const urlPathname = usePathname();
  const searchParams = useSearchParams();
  const employeesId = searchParams.get("employeesId");
  const newUrl = urlPathname.replace("/employees", "");

  const { data: dataEmployees } = useQuery<Employee[]>({
    queryKey: ["Employees", id],
    queryFn: () =>
      getEmployeesDataAll(Array.isArray(id) ? id[0] : (id as string)),
  });

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modoAtualSelecionado, setModoAtualSelecionado] = useState<string>("");

  const [diasSemIntervalo, setDiasSemIntervalo] = useState<string[]>([]);

  const [horarioInicioManhaSemIntervalo, setHorarioInicioManhaSemIntervalo] =
    useState("");
  const [horarioFinalTardeSemIntervalo, setHorarioFinalTardeSemIntervalo] =
    useState("");

  const [diasComIntervalo, setDiasComIntervalo] = useState<string[]>([]);

  const [horarioInicioManhaComIntervalo, setHorarioInicioManhaComIntervalo] =
    useState("");
  const [horarioFinalManhaComIntervalo, setHorarioFinalManhaComIntervalo] =
    useState("");
  const [horarioInicioTardeComIntervalo, setHorarioInicioTardeComIntervalo] =
    useState("");
  const [horarioFinalTardeComIntervalo, setHorarioFinalTardeComIntervalo] =
    useState("");

  const [diasMeioPeriodo, setDiasMeioPeriodo] = useState<string[]>([]);

  const [horarioInicioMeioPeriodo, setHorarioInicioMeioPeriodo] = useState("");
  const [horarioFinalMeioPeriodo, setHorarioFinalMeioPeriodo] = useState("");

  const [semIntervalo, setSemIntervalo] = useState(false);
  const [comIntervalo, setComIntervalo] = useState(false);
  const [meioPeriodo, setMeioPeriodo] = useState(false);

  const diasSemana = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  const [diasSelecionadosSemIntervalo, setDiasSelecionadosSemIntervalo] =
    useState<Record<string, boolean>>({});
  const [diasSelecionadosComIntervalo, setDiasSelecionadosComIntervalo] =
    useState<Record<string, boolean>>({});
  const [diasSelecionadosMeioPeriodo, setDiasSelecionadosMeioPeriodo] =
    useState<Record<string, boolean>>({});

  const [typeMessage, setTypeMessage] = useState("");
  const [alertMessagem, setAlertMessagem] = useState("");
  const [messageBoolean, setMessageBoolean] = useState(false);

  useEffect(() => {
    if (employeesId && dataEmployees) {
      const selectedEmployee = dataEmployees.find(
        (empl) => empl._id === employeesId
      );

      if (selectedEmployee) {
        // Limpeza e formatação dos schedules conforme o tipo esperado
        const cleanedSchedules = selectedEmployee.schedules.map((schedule) => {
          if (schedule.period === "Com Intervalo") {
            return {
              days: schedule.days,
              period: schedule.period,
              time: schedule.time ?? [], // garante que sempre terá `time`
              start_time: undefined,
              end_time: undefined,
            };
          }

          // Para "Sem Intervalo" e "Meio Periodo"
          return {
            days: schedule.days,
            period: schedule.period,
            start_time: schedule.start_time ?? "",
            end_time: schedule.end_time ?? "",
            time: undefined,
          };
        });

        // Atualiza os dados no estado
        setOriginalData({
          name: selectedEmployee.name,
          schedules: cleanedSchedules,
        });

        // Define o nome
        setName(selectedEmployee.name);

        // Processa os dados de horários
        selectedEmployee.schedules.forEach((schedule) => {
          if (schedule.period === "Sem Intervalo") {
            const dias: Record<string, boolean> = {};
            schedule.days.forEach((dia) => {
              dias[dia] = true;
            });
            setDiasSelecionadosSemIntervalo(dias);
            setHorarioInicioManhaSemIntervalo(schedule.start_time || "");
            setHorarioFinalTardeSemIntervalo(schedule.end_time || "");
            setSemIntervalo(false);
          }

          if (schedule.period === "Com Intervalo") {
            const dias: Record<string, boolean> = {};
            schedule.days.forEach((dia) => {
              dias[dia] = true;
            });
            setDiasSelecionadosComIntervalo(dias);
            const manha = schedule.time?.find(
              (t) => t.period_of_day === "Manhã"
            );
            const tarde = schedule.time?.find(
              (t) => t.period_of_day === "Tarde"
            );
            setHorarioInicioManhaComIntervalo(manha?.start_time || "");
            setHorarioFinalManhaComIntervalo(manha?.end_time || "");
            setHorarioInicioTardeComIntervalo(tarde?.start_time || "");
            setHorarioFinalTardeComIntervalo(tarde?.end_time || "");
            setComIntervalo(false);
          }

          if (schedule.period === "Meio Periodo") {
            const dias: Record<string, boolean> = {};
            schedule.days.forEach((dia) => {
              dias[dia] = true;
            });
            setDiasSelecionadosMeioPeriodo(dias);
            setHorarioInicioMeioPeriodo(schedule.start_time || "");
            setHorarioFinalMeioPeriodo(schedule.end_time || "");
            setMeioPeriodo(false);
          }
        });
      }
    }
  }, [employeesId, dataEmployees]);

  const toggleDia = (dia: string, modo: string) => {
    if (modo === "semIntervalo") {
      if (
        diasSelecionadosComIntervalo[dia] ||
        diasSelecionadosMeioPeriodo[dia]
      ) {
        alert(`O dia ${dia} já foi selecionado em outro modo.`);
        return;
      }
      setDiasSelecionadosSemIntervalo((prevState) => {
        const updatedState = { ...prevState, [dia]: !prevState[dia] };
        const selectedDays = Object.keys(updatedState).filter(
          (key) => updatedState[key]
        );
        setDiasSemIntervalo(selectedDays);
        return updatedState;
      });
    } else if (modo === "comIntervalo") {
      if (
        diasSelecionadosSemIntervalo[dia] ||
        diasSelecionadosMeioPeriodo[dia]
      ) {
        alert(`O dia ${dia} já foi selecionado em outro modo.`);
        return;
      }
      setDiasSelecionadosComIntervalo((prevState) => {
        const updatedState = { ...prevState, [dia]: !prevState[dia] };
        const selectedDays = Object.keys(updatedState).filter(
          (key) => updatedState[key]
        );
        setDiasComIntervalo(selectedDays);
        return updatedState;
      });
    } else if (modo === "meioPeriodo") {
      if (
        diasSelecionadosSemIntervalo[dia] ||
        diasSelecionadosComIntervalo[dia]
      ) {
        alert(`O dia ${dia} já foi selecionado em outro modo.`);
        return;
      }
      setDiasSelecionadosMeioPeriodo((prevState) => {
        const updatedState = { ...prevState, [dia]: !prevState[dia] };
        const selectedDays = Object.keys(updatedState).filter(
          (key) => updatedState[key]
        );
        setDiasMeioPeriodo(selectedDays);
        return updatedState;
      });
    }
  };

  const handleSemIntervalo = () => {
    setSemIntervalo(true);
    setComIntervalo(false);
    setMeioPeriodo(false);
    setModoAtualSelecionado("semIntervalo");
  };

  const handleComIntervalo = () => {
    setComIntervalo(true);
    setSemIntervalo(false);
    setMeioPeriodo(false);
    setModoAtualSelecionado("comIntervalo");
  };

  const handleMeioPeriodo = () => {
    setMeioPeriodo(true);
    setComIntervalo(false);
    setSemIntervalo(false);
    setModoAtualSelecionado("meioPeriodo");
  };

  const payload = {
    name: name,
    schedules: [
      {
        days: diasSemIntervalo,
        period: "Sem Intervalo",
        start_time: horarioInicioManhaSemIntervalo,
        end_time: horarioFinalTardeSemIntervalo,
      },
      {
        days: diasComIntervalo,
        period: "Com Intervalo",
        time: [
          {
            period_of_day: "Manhã",
            start_time: horarioInicioManhaComIntervalo,
            end_time: horarioFinalManhaComIntervalo,
          },
          {
            period_of_day: "Tarde",
            start_time: horarioInicioTardeComIntervalo,
            end_time: horarioFinalTardeComIntervalo,
          },
        ],
      },
      {
        days: diasMeioPeriodo,
        period: "Meio Periodo",
        start_time: horarioInicioMeioPeriodo,
        end_time: horarioFinalMeioPeriodo,
      },
    ],
  };

  const [originalData, setOriginalData] = useState<typeof payload | null>(null);

  const isFormModified = () => {
    if (!originalData) return true;

    return (
      name !== originalData.name ||
      JSON.stringify(diasSemIntervalo) !==
        JSON.stringify(originalData.schedules[0]?.days ?? []) ||
      JSON.stringify(diasComIntervalo) !==
        JSON.stringify(originalData.schedules[1]?.days ?? []) ||
      JSON.stringify(diasMeioPeriodo) !==
        JSON.stringify(originalData.schedules[2]?.days ?? []) ||
      horarioInicioManhaSemIntervalo !==
        originalData.schedules[0]?.start_time ||
      horarioFinalTardeSemIntervalo !== originalData.schedules[0]?.end_time ||
      horarioInicioManhaComIntervalo !==
        originalData.schedules[1]?.time?.[0]?.start_time ||
      horarioFinalManhaComIntervalo !==
        originalData.schedules[1]?.time?.[0]?.end_time ||
      horarioInicioTardeComIntervalo !==
        originalData.schedules[1]?.time?.[1]?.start_time ||
      horarioFinalTardeComIntervalo !==
        originalData.schedules[1]?.time?.[1]?.end_time ||
      horarioInicioMeioPeriodo !== originalData.schedules[2]?.start_time ||
      horarioFinalMeioPeriodo !== originalData.schedules[2]?.end_time
    );
  };

  const validarHorarios = (): boolean => {
    // Sem Intervalo
    if (diasSemIntervalo.length > 0) {
      if (!horarioInicioManhaSemIntervalo || !horarioFinalTardeSemIntervalo) {
        setAlertMessagem("Preencha os horários de 'Sem Intervalo'.");
        setTypeMessage("error");
        setMessageBoolean(true);
        return false;
      }
    }

    // Com Intervalo
    if (diasComIntervalo.length > 0) {
      if (
        !horarioInicioManhaComIntervalo ||
        !horarioFinalManhaComIntervalo ||
        !horarioInicioTardeComIntervalo ||
        !horarioFinalTardeComIntervalo
      ) {
        setAlertMessagem("Preencha todos os horários de 'Com Intervalo'.");
        setTypeMessage("error");
        setMessageBoolean(true);
        return false;
      }
    }

    // Meio Período
    if (diasMeioPeriodo.length > 0) {
      if (!horarioInicioMeioPeriodo || !horarioFinalMeioPeriodo) {
        setAlertMessagem("Preencha os horários de 'Meio Período'.");
        setTypeMessage("error");
        setMessageBoolean(true);
        return false;
      }
    }

    // Garante que pelo menos um dos modos tenha dia selecionado
    if (
      diasSemIntervalo.length === 0 &&
      diasComIntervalo.length === 0 &&
      diasMeioPeriodo.length === 0
    ) {
      setAlertMessagem("Selecione pelo menos um dia em um dos modos.");
      setTypeMessage("error");
      setMessageBoolean(true);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeesId && !name) {
      setAlertMessagem("Nome é obrigatório");
      setTypeMessage("error");
      setMessageBoolean(true);
      return;
    }

    if (!validarHorarios()) {
      setAlertMessagem("Corrija os campos obrigatórios antes de continuar.");
      setTypeMessage("error");
      setMessageBoolean(true);
      return;
    }

    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      let response;

      if (employeesId) {
        if (!isFormModified()) {
          setAlertMessagem(
            "Nenhuma modificação detectada. Nenhuma atualização será realizada."
          );
          clearInterval(interval);
          setLoading(false);
          setProgress(0);
          setMessageBoolean(true);
          setTypeMessage("error");
          return;
        }

        response = await axios.put(
          `/employees/update-employees/${employeesId}`,
          payload
        );

        if (response.status === 200) {
          setAlertMessagem("Funcionário atualizado com sucesso");
          setTypeMessage("success");
          setMessageBoolean(true);
        }
      } else {
        response = await axios.post(`/employees/register/${id}`, payload);

        if (response.status === 201) {
          setAlertMessagem("Funcionário cadastrado com sucesso");

          // Limpar formulário após o cadastro
          setName("");
          setDiasSemIntervalo([]);
          setHorarioInicioManhaSemIntervalo("");
          setHorarioFinalTardeSemIntervalo("");

          setDiasSelecionadosSemIntervalo({});
          setDiasSelecionadosComIntervalo({});
          setDiasSelecionadosMeioPeriodo({});

          setDiasComIntervalo([]);
          setHorarioInicioManhaComIntervalo("");
          setHorarioFinalManhaComIntervalo("");
          setHorarioInicioTardeComIntervalo("");
          setHorarioFinalTardeComIntervalo("");

          setDiasMeioPeriodo([]);
          setHorarioInicioMeioPeriodo("");
          setHorarioFinalMeioPeriodo("");
          setTypeMessage("success");
          setMessageBoolean(true);
        }
      }
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setAlertMessagem(
        err.response?.data?.message || "Erro ao atualizar produto!"
      );
      setTypeMessage("error");
      setMessageBoolean(true);
    } finally {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  useEffect(() => {
    const updatedDias = Object.keys(diasSelecionadosSemIntervalo).filter(
      (dia) => diasSelecionadosSemIntervalo[dia]
    );
    setDiasSemIntervalo(updatedDias);
  }, [diasSelecionadosSemIntervalo]);

  useEffect(() => {
    const updatedDias = Object.keys(diasSelecionadosComIntervalo).filter(
      (dia) => diasSelecionadosComIntervalo[dia]
    );
    setDiasComIntervalo(updatedDias);
  }, [diasSelecionadosComIntervalo]);

  useEffect(() => {
    const updatedDias = Object.keys(diasSelecionadosMeioPeriodo).filter(
      (dia) => diasSelecionadosMeioPeriodo[dia]
    );
    setDiasMeioPeriodo(updatedDias);
  }, [diasSelecionadosMeioPeriodo]);

  console.log(payload);

  return (
    <>
      <ButtonBack url={newUrl} />

      <Container>
        <GlobalStyle />

        <Title>Formulário de Funcionários</Title>
        <Form onSubmit={handleSubmit}>
          <ContainerInput>
            <TextName>Nome:</TextName>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome:"
            />
          </ContainerInput>

          <ContainerHours>
            <TitleHours>Selecione o Modo</TitleHours>
            <ContainerHoursButtons>
              <ButtonHours type="button" onClick={handleSemIntervalo}>
                Sem Intervalo
              </ButtonHours>
              <ButtonHours type="button" onClick={handleComIntervalo}>
                Com Intervalo
              </ButtonHours>
              <ButtonHours type="button" onClick={handleMeioPeriodo}>
                Meio Período
              </ButtonHours>
            </ContainerHoursButtons>
          </ContainerHours>

          {/* Checkboxes sempre visíveis e com cor do modo */}
          <ContainerSelectdHours>
            <TitleDaysSelecteds>Dias Selecionados</TitleDaysSelecteds>
            <CheckboxContainer>
              {diasSemana.map((dia) => {
                let modoSelecionado:
                  | "semIntervalo"
                  | "comIntervalo"
                  | "meioPeriodo"
                  | null = null;

                if (diasSelecionadosSemIntervalo[dia]) {
                  modoSelecionado = "semIntervalo";
                } else if (diasSelecionadosComIntervalo[dia]) {
                  modoSelecionado = "comIntervalo";
                } else if (diasSelecionadosMeioPeriodo[dia]) {
                  modoSelecionado = "meioPeriodo";
                }

                return (
                  <CheckboxLabel key={dia} dia={dia}>
                    <BoxInputEmployees
                      checked={!!modoSelecionado}
                      modo={modoSelecionado || "semIntervalo"}
                      onChange={() => {
                        if (!modoAtualSelecionado) {
                          setAlertMessagem(
                            "Selecione um modo de horário antes de marcar o dia."
                          );
                          setTypeMessage("error");
                          setMessageBoolean(true);
                          return;
                        }

                        if (
                          modoSelecionado &&
                          modoSelecionado !== modoAtualSelecionado
                        ) {
                          setAlertMessagem(
                            `Você só pode alterar dias do modo "${modoAtualSelecionado}".`
                          );
                          setTypeMessage("error");
                          setMessageBoolean(true);
                          return;
                        }

                        if (modoSelecionado === "semIntervalo") {
                          toggleDia(dia, "semIntervalo");
                        } else if (modoSelecionado === "comIntervalo") {
                          toggleDia(dia, "comIntervalo");
                        } else if (modoSelecionado === "meioPeriodo") {
                          toggleDia(dia, "meioPeriodo");
                        } else {
                          toggleDia(dia, modoAtualSelecionado);
                        }
                      }}
                    />
                  </CheckboxLabel>
                );
              })}
            </CheckboxContainer>
          </ContainerSelectdHours>

          {/* Horários para Sem Intervalo */}
          {semIntervalo && (
            <ContainerSelectdHours>
              <BoxModHoursText>
                <ModHoursText>Horários - Sem Intervalo </ModHoursText>

                <ModHoursIcon mode="semIntervalo">
                  <FaCheckCircle />
                </ModHoursIcon>
              </BoxModHoursText>

              <ContainerInput>
                <Label>Horário Manhã:</Label>
                <TimeInput
                  type="time"
                  value={horarioInicioManhaSemIntervalo}
                  onChange={(e) =>
                    setHorarioInicioManhaSemIntervalo(e.target.value)
                  }
                />
              </ContainerInput>
              <ContainerInput>
                <Label>Horário Tarde:</Label>
                <TimeInput
                  type="time"
                  value={horarioFinalTardeSemIntervalo}
                  onChange={(e) =>
                    setHorarioFinalTardeSemIntervalo(e.target.value)
                  }
                />
              </ContainerInput>
            </ContainerSelectdHours>
          )}

          {/* Horários para Com Intervalo */}
          {comIntervalo && (
            <ContainerSelectdHours>
              <BoxModHoursText>
                <ModHoursText>Horários - Com Intervalo </ModHoursText>

                <ModHoursIcon mode="comIntervalo">
                  <FaCheckCircle />
                </ModHoursIcon>
              </BoxModHoursText>

              <ContainerInput>
                <Label>Horário Manhã:</Label>
                <CardInput>
                  <TimeInput
                    type="time"
                    value={horarioInicioManhaComIntervalo}
                    onChange={(e) =>
                      setHorarioInicioManhaComIntervalo(e.target.value)
                    }
                  />
                  <TimeInput
                    type="time"
                    value={horarioFinalManhaComIntervalo}
                    onChange={(e) =>
                      setHorarioFinalManhaComIntervalo(e.target.value)
                    }
                  />
                </CardInput>
              </ContainerInput>

              <ContainerInput>
                <Label>Horário Tarde:</Label>
                <CardInput>
                  <TimeInput
                    type="time"
                    value={horarioInicioTardeComIntervalo}
                    onChange={(e) =>
                      setHorarioInicioTardeComIntervalo(e.target.value)
                    }
                  />
                  <TimeInput
                    type="time"
                    value={horarioFinalTardeComIntervalo}
                    onChange={(e) =>
                      setHorarioFinalTardeComIntervalo(e.target.value)
                    }
                  />
                </CardInput>
              </ContainerInput>
            </ContainerSelectdHours>
          )}

          {/* Horários para Meio Período */}
          {meioPeriodo && (
            <ContainerSelectdHours>
              <BoxModHoursText>
                <ModHoursText>Horários - Com Intervalo </ModHoursText>

                <ModHoursIcon mode="meioPeriodo">
                  <FaCheckCircle />
                </ModHoursIcon>
              </BoxModHoursText>

              <ContainerInput>
                <Label>Horário Manhã/Tarde:</Label>
                <TimeInput
                  type="time"
                  value={horarioInicioMeioPeriodo}
                  onChange={(e) => setHorarioInicioMeioPeriodo(e.target.value)}
                />
              </ContainerInput>
              <ContainerInput>
                <Label>Horário Manhã/Tarde:</Label>
                <TimeInput
                  type="time"
                  value={horarioFinalMeioPeriodo}
                  onChange={(e) => setHorarioFinalMeioPeriodo(e.target.value)}
                />
              </ContainerInput>
            </ContainerSelectdHours>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar Dados"}
          </Button>
          {loading && <LoadingBar progress={progress} />}
        </Form>
      </Container>

      <FloatingMessage
        message={alertMessagem}
        show={messageBoolean}
        duration={5000}
        onClose={() => setMessageBoolean(false)}
        type={typeMessage}
      />
    </>
  );
}
