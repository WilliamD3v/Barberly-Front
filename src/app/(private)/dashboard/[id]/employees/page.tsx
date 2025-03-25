"use client";

import { useEffect, useState } from "react";
import {
  Title,
  Form,
  CheckboxContainer,
  CheckboxLabel,
  Button,
  Container,
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
  BoxListEmployees,
  ContainerListEmployees,
  NameEmployees,
  ButtonEmployees,
  ContainerButtonEmployees,
  CardListEmployees,
} from "./styled";
import axios from "@/lib/axios";
import { useParams, usePathname } from "next/navigation";
import { GlobalStyle } from "../service/styled";
import { getEmployeesDataAll } from "@/hooks/useUsers";
import { useQuery } from "@tanstack/react-query";
import { Employee } from "@/types/employees";
import ButtonBack from "@/components/ButtonBack";

export default function EnviarDados() {
  const { id } = useParams();
  const urlPathname = usePathname();
  const newUrl = urlPathname.replace("/employees", "");

  const { data: dataEmployees, refetch } = useQuery<Employee[]>({
    queryKey: ["Service", id],
    queryFn: () =>
      getEmployeesDataAll(Array.isArray(id) ? id[0] : (id as string)),
  });

  const [name, setName] = useState("");
  const [diasSemIntervalo, setDiasSemIntervalo] = useState<string[]>([]);

  const [horarioInicioManhaSemIntervalo, setHorarioInicioManhaSemIntervalo] =
    useState("--:--");
  const [horarioFinalTardeSemIntervalo, setHorarioFinalTardeSemIntervalo] =
    useState("--:--");

  const [diasComIntervalo, setDiasComIntervalo] = useState<string[]>([]);

  const [horarioInicioManhaComIntervalo, setHorarioInicioManhaComIntervalo] =
    useState("--:--");
  const [horarioFinalManhaComIntervalo, setHorarioFinalManhaComIntervalo] =
    useState("--:--");
  const [horarioInicioTardeComIntervalo, setHorarioInicioTardeComIntervalo] =
    useState("--:--");
  const [horarioFinalTardeComIntervalo, setHorarioFinalTardeComIntervalo] =
    useState("--:--");

  const [diasMeioPeriodo, setDiasMeioPeriodo] = useState<string[]>([]);

  const [horarioInicioMeioPeriodo, setHorarioInicioMeioPeriodo] =
    useState("--:--");
  const [horarioFinalMeioPeriodo, setHorarioFinalMeioPeriodo] =
    useState("--:--");

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
        setDiasSemIntervalo(selectedDays); // Sincroniza com o payload
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
        setDiasComIntervalo(selectedDays); // Sincroniza com o payload
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
    setSemIntervalo(!semIntervalo);
    setComIntervalo(false);
    setMeioPeriodo(false);
  };

  const handleComIntervalo = () => {
    setComIntervalo(!comIntervalo);
    setSemIntervalo(false);
    setMeioPeriodo(false);
  };

  const handleMeioPeriodo = () => {
    setMeioPeriodo(!meioPeriodo);
    setComIntervalo(false);
    setSemIntervalo(false);
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

  const deleteEmployes = async (employeesId: string) => {
    console.log(employeesId);
    try {
      const response = await axios.delete(
        `/employees/delete/${id}/${employeesId}`
      );

      await refetch();

      if (response.status === 200) {
        console.log("deletada com sucesso");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      console.error("Nome é obrigatório");
      return;
    }

    try {
      const response = await axios.post(`/employees/register/${id}`, payload);

      await refetch();

      if (response.status === 201) {
        console.log("Funcionário cadastrado com sucesso");
      }

      setName("");
      setDiasSemIntervalo([]);
      setHorarioInicioManhaSemIntervalo("");
      setHorarioFinalTardeSemIntervalo("");

      setDiasComIntervalo([]);
      setHorarioInicioManhaComIntervalo("");
      setHorarioFinalManhaComIntervalo("");
      setHorarioInicioTardeComIntervalo("");
      setHorarioFinalTardeComIntervalo("");

      setDiasMeioPeriodo([]);
      setHorarioInicioMeioPeriodo("");
      setHorarioFinalMeioPeriodo("");

      setSemIntervalo(false);
      setComIntervalo(false);
      setMeioPeriodo(false);

      setDiasSelecionadosSemIntervalo({});
      setDiasSelecionadosComIntervalo({});
      setDiasSelecionadosMeioPeriodo({});
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
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
            <TitleHours>Seus horários</TitleHours>
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

          {/* Modo Sem Intervalo */}
          {semIntervalo && (
            <ContainerSelectdHours>
              <CheckboxContainer>
                <legend>Sem Intervalo</legend>
                {diasSemana.map((dia) => (
                  <CheckboxLabel key={dia}>
                    <input
                      type="checkbox"
                      checked={!!diasSelecionadosSemIntervalo[dia]}
                      onChange={() => toggleDia(dia, "semIntervalo")}
                    />
                    {dia}
                  </CheckboxLabel>
                ))}
              </CheckboxContainer>

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

          {/* Modo Com Intervalo */}
          {comIntervalo && (
            <ContainerSelectdHours>
              <CheckboxContainer>
                <legend>Com Intervalo</legend>
                {diasSemana.map((dia) => (
                  <CheckboxLabel key={dia}>
                    <input
                      type="checkbox"
                      checked={!!diasSelecionadosComIntervalo[dia]}
                      onChange={() => toggleDia(dia, "comIntervalo")}
                    />
                    {dia}
                  </CheckboxLabel>
                ))}
              </CheckboxContainer>

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

          {/* Modo Meio Período */}
          {meioPeriodo && (
            <ContainerSelectdHours>
              <CheckboxContainer>
                <legend>Meio Período</legend>
                {diasSemana.map((dia) => (
                  <CheckboxLabel key={dia}>
                    <input
                      type="checkbox"
                      checked={!!diasSelecionadosMeioPeriodo[dia]}
                      onChange={() => toggleDia(dia, "meioPeriodo")}
                    />
                    {dia}
                  </CheckboxLabel>
                ))}
              </CheckboxContainer>

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

          <Button type="submit">Enviar Dados</Button>
        </Form>

        <ContainerListEmployees>
          <Title>Lista de Funcionários</Title>
          <CardListEmployees>
            {dataEmployees && dataEmployees.length > 0 ? (
              dataEmployees.map((employee) => (
                <BoxListEmployees key={employee._id}>
                  <NameEmployees>{employee.name}</NameEmployees>
                  <ContainerButtonEmployees>
                    <ButtonEmployees
                      onClick={() => deleteEmployes(employee._id)}
                    >
                      Deletar
                    </ButtonEmployees>
                  </ContainerButtonEmployees>
                </BoxListEmployees>
              ))
            ) : (
              <div className="flex justify-center">
                <h1 className="text-white">Nenhum Funcionario</h1>
              </div>
            )}
          </CardListEmployees>
        </ContainerListEmployees>
      </Container>
    </>
  );
}
