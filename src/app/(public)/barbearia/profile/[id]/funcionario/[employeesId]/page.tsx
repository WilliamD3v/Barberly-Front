"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Employee } from "@/types/employees";
import { useQuery } from "@tanstack/react-query";
import {
  getEmployeesData,
  getSchedulingData,
  getServiceData,
} from "@/hooks/useUsers";

import {
  Container,
  ContainerElements,
  ContainerFormEmployees,
  ContainerTitle,
  FormEmployees,
  InputFormEmployees,
  MainContent,
  StepContent,
  Title,
} from "./styled";

import { ClientProps, HorariosSelecionados, Services } from "@/types/services";
import { Scheduling } from "@/types/scheduling";
import { Stepper } from "@/components/Stepper";
import { CartSummary } from "@/components/CartSummary";
import { ServiceList } from "@/components/ServiceList";
import { AgendamentoHours } from "@/components/Agendamento";

export default function Agendamento() {
  const { id, employeesId } = useParams();
  const router = useRouter();
  //  const pathnameUrl = usePathname();

  // const newUrl = pathnameUrl.replace(/\/funcionario.*/, "");

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

  const { data: dataServices } = useQuery<Services[]>({
    queryKey: ["Service", id],
    queryFn: () => getServiceData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<Services[]>([]);

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

  const updateCart = (newItems: Services[]) => {
    const newTotalPrice = newItems.reduce(
      (acc, service) => acc + service.price,
      0
    );
    const newTotalDuration = newItems.reduce(
      (acc, service) => acc + service.duration,
      0
    );

    setCart((prevCart) => ({
      ...prevCart,
      items: newItems,
      totalPrice: newTotalPrice,
      totalDuration: newTotalDuration,
    }));
  };

  const toggleService = (service: Services) => {
    const exists = selectedServices.find((s) => s._id === service._id);
    if (exists) {
      setSelectedServices((prev) => {
        const updatedItems = prev.filter((s) => s._id !== service._id);
        updateCart(updatedItems); // Atualiza o cart com os novos items
        return updatedItems;
      });
    } else {
      setSelectedServices((prev) => {
        const updatedItems = [...prev, service];
        updateCart(updatedItems); // Atualiza o cart com os novos items
        return updatedItems;
      });
    }
  };

  const [clientBoolean, setClientBoolean] = useState(false);
  const [horarioBoolean, setHorarioBoolean] = useState(false);

  console.log("teste boolean:", horarioBoolean);

  useEffect(() => {
    const isFormComplete = Object.values(cart.cliet).every(
      (value) => value.trim() !== ""
    );
    setClientBoolean(isFormComplete);
  }, [cart.cliet]);

  useEffect(() => {
    // Verifica se 'horarioSelecionados' não está vazio
    const isFormComplete = Object.keys(cart.horarioSelecionados).length > 0;
    setHorarioBoolean(isFormComplete);
  }, [cart.horarioSelecionados]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !dataEmployees) {
    router.push(`/barbearia/profile/${id}`);
    return null;
  }

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  return (
    <>
      <Container>
        <Stepper
          currentStep={currentStep}
          steps={["Serviços", "Pagamento", "Confirmação"]}
        />

        <MainContent>
          <StepContent>
            {currentStep === 0 && (
              <ServiceList
                services={dataServices ?? []}
                selected={selectedServices}
                onToggle={toggleService}
              />
            )}
            {currentStep === 1 && (
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
            {currentStep === 2 && (
              <AgendamentoHours
                dataEmployees={dataEmployees}
                cart={cart}
                setCart={setCart}
                dataScheduling={dataScheduling}
              />
            )}
          </StepContent>

          <CartSummary
            selectedServices={selectedServices}
            currentStep={currentStep}
            onProceed={handleNext}
            clientBoolean={clientBoolean}
            horarioBoolean={horarioBoolean}
            cart={cart}
            id={String(id)}
            employeesId={String(employeesId)}
          />
        </MainContent>
      </Container>
    </>
  );
}

/*         <ContainerElements>
          <ComponentsService
            id={id as string}
            profilePrivate={profilePrivate}
            setCart={setCart}
            employees={dataEmployees}
            cart={cart}
          />
        </ContainerElements> */

/*         <AgendamentoHours
          dataEmployees={dataEmployees}
          cart={cart}
          setCart={setCart}
          dataScheduling={dataScheduling}
        /> */
