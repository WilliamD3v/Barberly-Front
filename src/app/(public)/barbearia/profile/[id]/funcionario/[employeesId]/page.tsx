"use client";
import axios from "@/lib/axios";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Employee } from "@/types/employees";
import { useQuery } from "@tanstack/react-query";
import { getEmployeesData, getSchedulingData } from "@/hooks/useUsers";

import {
  BoxDay,
  BoxElementNumberService,
  ButtonAgendar,
  ButtonHours,
  ButtonRemoveService,
  CardCart,
  ContainerButton,
  ContainerCart,
  ContainerElements,
  ContainerElementsServices,
  ContainerFormEmployees,
  ContainerHoursCancel,
  ContainerHoursSelected,
  ContainerInputDays,
  ContainerNullCart,
  ContainerStepButton,
  ContainerTableEmployees,
  ContainerTitle,
  ContainerTitleCart,
  ConteinrLengthCart,
  DayContainer,
  DaysNumber,
  DaysStyled,
  ElementService,
  FormEmployees,
  IconWrapper,
  InputFormEmployees,
  ProgressBarContainer,
  ProgressLine,
  ServiceInfo,
  Step,
  StepBack,
  StepLabel,
  StepNext,
  StepWrapper,
  TableEmployees,
  TextHours,
  TimeInput,
  Title,
  TitleCart,
  TitleLengthCart,
  TitleService,
  TotalContainer,
  TotalItem,
} from "./styled";
import { GlobalStyle } from "../../styled";
import { ComponentsService } from "@/components/CardService";

import { pt } from "date-fns/locale";
import { format, addDays } from "date-fns";
import { ClientProps, HorariosSelecionados, Services } from "@/types/services";
import { Scheduling } from "@/types/scheduling";
import { FaCartShopping, FaClock, FaSackDollar } from "react-icons/fa6";
import ButtonBack from "@/components/ButtonBack";

export default function Agendamento() {
  const { id, employeesId } = useParams();
  const router = useRouter();
  const pathnameUrl = usePathname();
  const profilePrivate = false;

  const newUrl = pathnameUrl.replace(/\/funcionario.*/, "");

  const {
    data: dataEmployees,
    isLoading,
    isError,
  } = useQuery<Employee>({
    queryKey: ["Employees", id, employeesId],
    queryFn: () =>
      getEmployeesData(
        Array.isArray(id) ? id[0] : (id as string),
        Array.isArray(employeesId) ? employeesId[0] : (employeesId as string)
      ),
  });

  const { data: dataScheduling } = useQuery<Scheduling[]>({
    queryKey: ["Scheduling", id, employeesId],
    queryFn: () =>
      getSchedulingData(
        Array.isArray(id) ? id[0] : (id as string),
        Array.isArray(employeesId) ? employeesId[0] : (employeesId as string)
      ),
  });

  const hoje = new Date();

  const diasDaSemana = Array.from({ length: 7 }).map((_, index) => {
    const diaFuturo = addDays(hoje, index);
    return {
      diaDaSemana: format(diaFuturo, "iiii", { locale: pt }),
      diaNumerico: format(diaFuturo, "dd/MM/yyyy"),
    };
  });

  const [step, setStep] = useState(1);
  const [alert, setAlert] = useState("");
  const [errorStep, setErrorStep] = useState<number | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<{
    items: Services[];
    cliet: ClientProps;
    totalPrice: number;
    totalDuration: number;
    horarioSelecionados: HorariosSelecionados;
    funcionario: string;
  }>({
    items: [],
    cliet: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    totalPrice: 0,
    totalDuration: 0,
    horarioSelecionados: {},
    funcionario: "",
  });
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !dataEmployees) {
    router.push(`/barbearia/profile/${id}`);
    return null;
  }

  const handleNext = () => {
    if (cart.items.length === 0) {
      setAlert("Selecione um serviço antes de continuar");
      setErrorStep(1);
      return;
    }

    if (
      step === 2 &&
      (!cart.cliet.name ||
        !cart.cliet.phone ||
        !cart.cliet.email ||
        !cart.cliet.password)
    ) {
      setAlert("Preencha os campos do formulário!");
      setErrorStep(2);
      return;
    }

    setErrorStep(null);
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleRemoveFromCart = (serviceId: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (cartData) => cartData._id !== serviceId
      );

      const newTotalPrice = updatedItems.reduce(
        (acc, curr) => acc + curr.price,
        0
      );
      const newTotalDuration = updatedItems.reduce(
        (acc, curr) => acc + curr.duration,
        0
      );

      return {
        ...prevCart,
        items: updatedItems,
        horarioSelecionados: {},
        totalPrice: newTotalPrice,
        totalDuration: newTotalDuration,
      };
    });
  };

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
        agendamento.horarioSelecionados.data.day === day &&
        agendamento.horarioSelecionados.data.date === date
      ) {
        const agendamentoInicio = convertTimeToMinutes(
          agendamento.horarioSelecionados.data.horariosInicial
        );
        const agendamentoFim = convertTimeToMinutes(
          agendamento.horarioSelecionados.data.horariosFinal
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

  const handleSubmit = async (serviceId: string) => {
    try {
      if (!serviceId || typeof serviceId !== "string") {
        console.error("Service ID inválido:", serviceId);
        return;
      }

      const response = await axios.post(
        `/reserve/client/${id}/${employeesId}/${serviceId}`,
        { ...cart }
      );

      if (response.status === 201) {
        console.log("Agendamento com sucesso");
      }
    } catch (error) {
      console.error("Erro ao agendar horários:", error);
    }
  };

  console.log({ ...cart });

  return (
    <>
      {step === 1 && <ButtonBack url={newUrl} />}

      <GlobalStyle />

      <ContainerCart onClick={handleCartToggle}>
        <ConteinrLengthCart>
          <TitleLengthCart className="text-white">
            {cart.items.length}
          </TitleLengthCart>
        </ConteinrLengthCart>
        <FaCartShopping />
      </ContainerCart>

      {isCartOpen && (
        <>
          <CardCart>
            {cart.items.length > 0 ? (
              <>
                <TitleCart>Funcionário: {cart.funcionario}</TitleCart>
                <ContainerTitleCart>
                  {cart.items.map((cartData) => (
                    <ContainerElementsServices key={cartData._id}>
                      <ElementService>
                        <TitleService>{cartData.name}</TitleService>
                        <BoxElementNumberService>
                          <ServiceInfo>
                            <IconWrapper>
                              <FaClock />
                            </IconWrapper>
                            {cartData.duration} min
                          </ServiceInfo>
                          <ServiceInfo>
                            <IconWrapper>
                              <FaSackDollar />
                            </IconWrapper>
                            R${cartData.price.toString().replace(".", ",")}
                          </ServiceInfo>
                        </BoxElementNumberService>
                      </ElementService>

                      <ButtonRemoveService
                        onClick={() => handleRemoveFromCart(cartData._id)}
                      >
                        Remover
                      </ButtonRemoveService>

                      <TotalContainer>
                        <TotalItem>
                          <IconWrapper>
                            <FaClock />
                          </IconWrapper>
                          <span>{cart.totalDuration} min</span>
                        </TotalItem>

                        <TotalItem>
                          <IconWrapper>
                            <FaSackDollar />
                          </IconWrapper>
                          <span>
                            R$ {cart.totalPrice.toString().replace(".", ",")}
                          </span>
                        </TotalItem>
                      </TotalContainer>

                      <hr />

                      {/* O botão de agendamento só aparece se houver horário selecionado */}
                      {Object.keys(cart.horarioSelecionados).length > 0 && (
                        <ButtonAgendar
                          onClick={() => handleSubmit(cartData._id)}
                        >
                          Solicitar Agendamento
                        </ButtonAgendar>
                      )}
                    </ContainerElementsServices>
                  ))}
                </ContainerTitleCart>
              </>
            ) : (
              <ContainerNullCart>
                <h1>Nenhum item adicionado ao carrinho</h1>
              </ContainerNullCart>
            )}
          </CardCart>
        </>
      )}

      {/* Barra de etapas */}
      <div>
        <ProgressBarContainer>
          <ProgressLine />
          {["Serviços", "Formulário", "Horário"].map((label, index) => (
            <StepWrapper key={label}>
              <Step
                active={step >= index + 1}
                style={{
                  backgroundColor:
                    errorStep === index + 1
                      ? "red"
                      : step >= index + 1
                        ? "green"
                        : "gray",
                }}
              >
                {index + 1}
              </Step>
              <StepLabel>{label}</StepLabel>
            </StepWrapper>
          ))}
        </ProgressBarContainer>
      </div>

      {/* Selecionar Serviços */}
      {step === 1 && (
        <ContainerElements>
          <ComponentsService
            id={id as string}
            profilePrivate={profilePrivate}
            setCart={setCart}
            employees={dataEmployees}
            cart={cart}
          />
        </ContainerElements>
      )}

      {/* Formulario de Agendamento */}
      {step === 2 && (
        <ContainerElements>
          <>
            <ContainerTitle>
              <Title>Formulario de Agendamento</Title>
            </ContainerTitle>

            <ContainerFormEmployees>
              <FormEmployees>
                <InputFormEmployees
                  type="text"
                  name="name"
                  placeholder="Nome:"
                  onChange={(e) =>
                    setCart((prev) => ({
                      ...prev,
                      cliet: { ...prev.cliet, name: e.target.value },
                    }))
                  }
                />

                <InputFormEmployees
                  type="text"
                  name="phone"
                  placeholder="Celular:"
                  onChange={(e) =>
                    setCart((prev) => ({
                      ...prev,
                      cliet: { ...prev.cliet, phone: e.target.value },
                    }))
                  }
                />

                <InputFormEmployees
                  type="email"
                  name="email"
                  placeholder="Email:"
                  onChange={(e) =>
                    setCart((prev) => ({
                      ...prev,
                      cliet: { ...prev.cliet, email: e.target.value },
                    }))
                  }
                />

                <InputFormEmployees
                  type="password"
                  name="password"
                  placeholder="Senha:"
                  onChange={(e) =>
                    setCart((prev) => ({
                      ...prev,
                      cliet: { ...prev.cliet, password: e.target.value },
                    }))
                  }
                />
              </FormEmployees>
            </ContainerFormEmployees>
          </>
        </ContainerElements>
      )}

      {/* Agendamento de horario */}
      {step === 3 && (
        <ContainerElements>
          <ContainerTableEmployees>
            <ContainerTitle>
              <Title>Seleção de horario</Title>
            </ContainerTitle>

            <TableEmployees>
              {diasDaSemana.map((item) => {
                // Verifica se o dia existe nos horários do funcionário
                const upperCaseDay =
                  item.diaDaSemana.substring(0, 1).toUpperCase() +
                  item.diaDaSemana.substring(1).replace("-feira", "");

                const diaDisponivel = dataEmployees?.schedules.some(
                  (schedule) => schedule.days.includes(upperCaseDay)
                );

                return (
                  <DayContainer key={item.diaDaSemana}>
                    <BoxDay>
                      <DaysStyled>
                        {item.diaDaSemana.substring(0, 1).toUpperCase() +
                          item.diaDaSemana.substring(1).replace("-feira", "")}
                      </DaysStyled>

                      <DaysNumber>{item.diaNumerico}</DaysNumber>
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

                          {cart?.horarioSelecionados?.data?.day ===
                            item.diaDaSemana && (
                            <>
                              <ContainerHoursSelected>
                                <TextHours>
                                  {
                                    cart.horarioSelecionados?.data
                                      .horariosInicial
                                  }
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
                            <button onClick={handleAddHoursCart}>
                              Agendar
                            </button>
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
              <h2 className="text-lg font-semibold mb-2">
                📅 Horários Agendados
              </h2>
              {dataScheduling && dataScheduling?.length > 0 ? (
                dataScheduling?.map((reserva) => (
                  <div
                    key={reserva._id}
                    className="bg-black p-2 rounded-lg shadow-sm mb-2"
                  >
                    <p>
                      <strong>Dia:</strong>{" "}
                      {reserva.horarioSelecionados.data.day} -{" "}
                      {reserva.horarioSelecionados.data.date}
                    </p>
                    <p>
                      <strong>Horário:</strong>{" "}
                      {reserva.horarioSelecionados.data.horariosInicial} -{" "}
                      {reserva.horarioSelecionados.data.horariosFinal}
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
                      className="bg-black p-2 rounded-lg shadow-sm mb-2"
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
                <p>Dados do funcionário não disponíveis.</p>
              )}
            </div>
          </div>
        </ContainerElements>
      )}

      {/* Botão back and next */}
      <ContainerStepButton>
        <StepBack
          onClick={handleBack}
          disabled={step === 1}
          style={{ color: step === 1 ? "#888" : "#ffff" }}
        >
          Voltar
        </StepBack>
        <StepNext
          onClick={handleNext}
          disabled={step === 3}
          style={{ color: step === 3 ? "#888" : "#ffff" }}
        >
          Próximo
        </StepNext>
      </ContainerStepButton>

      {/* Alerta */}
      <div>
        <h1>{alert}</h1>
      </div>
    </>
  );
}
