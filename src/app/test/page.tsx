"use client";
import { useState } from "react";
import { ServiceList } from "@/components/ServiceList";
import { Stepper } from "@/components/Stepper";
import { CartSummary } from "@/components/CartSummary";
import { Container, StepContent, MainContent } from "./styled";
import { Services } from "@/types/services";
import { getServiceData } from "@/hooks/useUsers";
import { useQuery } from "@tanstack/react-query";

const mockServices: Services[] = [
  {
    _id: "1",
    barbearia_id: "123",
    name: "Corte de Cabelo Masculino",
    description: "Corte com máquina e tesoura, finalização com pomada.",
    price: 35,
    duration: 30,
  },
  {
    _id: "2",
    barbearia_id: "123",
    name: "Barba Completa",
    description: "Barba feita com navalha, toalha quente e massagem.",
    price: 25,
    duration: 25,
  },
  {
    _id: "3",
    barbearia_id: "123",
    name: "Corte + Barba",
    description: "Combo completo de corte e barba.",
    price: 55,
    duration: 50,
  },
];

export default function StepsPage(id: string, employees: string) {
  const { data: dataServices, refetch } = useQuery<Services[]>({
    queryKey: ["Service", id],
    queryFn: () => getServiceData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<Services[]>([]);

  const toggleService = (service: Services) => {
    const exists = selectedServices.find((s) => s._id === service._id);
    if (exists) {
      setSelectedServices((prev) => prev.filter((s) => s._id !== service._id));
    } else {
      setSelectedServices((prev) => [...prev, service]);
    }
  };

  const handleNext = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  console.log(dataServices)

  return (
    <Container>
      <Stepper
        currentStep={currentStep}
        steps={["Serviços", "Pagamento", "Confirmação"]}
      />

      <MainContent>
        <StepContent>
          {currentStep === 0 && (
            <ServiceList
              services={dataServices}
              selected={selectedServices}
              onToggle={toggleService}
            />
          )}
          {currentStep === 1 && <p>Pagamento (em breve...)</p>}
          {currentStep === 2 && <p>Confirmação (em breve...)</p>}
        </StepContent>

        <CartSummary
          selectedServices={selectedServices}
          currentStep={currentStep}
          onProceed={handleNext}
        />
      </MainContent>
    </Container>
  );
}
