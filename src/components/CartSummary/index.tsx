// components/CartSummary.tsx
"use client";
import { ClientProps, HorariosSelecionados, Services } from "@/types/services";
import {
  SideSummary,
  SummaryBox,
  SummaryItem,
  TotalPrice,
  ProceedButton,
} from "./styled";
import axios from "@/lib/axios";

interface Cart {
  items: Services[];
  cliet: ClientProps;
  totalPrice: number;
  totalDuration: number;
  horarioSelecionados: HorariosSelecionados;
  funcionario: string;
}

interface CartSummaryProps {
  selectedServices: Services[];
  currentStep: number;
  onProceed: () => void;
  clientBoolean: boolean;
  horarioBoolean: boolean;
  cart: Cart;
  id: string;
  employeesId: string;
}

export const CartSummary = ({
  selectedServices,
  currentStep,
  onProceed,
  clientBoolean,
  horarioBoolean,
  cart,
  id,
  employeesId,
}: CartSummaryProps) => {
  const totalPrice = selectedServices.reduce((acc, s) => acc + s.price, 0);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `/reserve/client/${id}/${employeesId}`,
        { ...cart }
      );

      if (response && response.data) {
        console.log("Agendamento com sucesso", response.data);
      } else {
        console.error("Resposta inválida:", response);
      }
    } catch (error) {
      console.error("Erro ao agendar horários:", error);
    }
  };

  const handleProceedClick = () => {
    if (currentStep === 2 && horarioBoolean) {
      handleSubmit();
    } else {
      onProceed();
    }
  };

  return (
    <SideSummary>
      <SummaryBox>
        <h4>Serviços Selecionados</h4>
        {selectedServices.length === 0 && <p>Nenhum serviço selecionado.</p>}
        {selectedServices.map((s) => (
          <SummaryItem key={s._id}>
            <span>{s.name}</span>
            <strong>R$ {s.price.toFixed(2)}</strong>
          </SummaryItem>
        ))}
        <TotalPrice>Total: R$ {totalPrice.toFixed(2)}</TotalPrice>

        <ProceedButton
          onClick={handleProceedClick}
          disabled={
            selectedServices.length === 0 ||
            (currentStep === 1 && !clientBoolean) ||
            (currentStep === 2 && !horarioBoolean)
          }
        >
          {currentStep === 0
            ? "Prosseguir"
            : currentStep === 1
              ? "Prosseguir"
              : "Agendar"}
        </ProceedButton>
      </SummaryBox>
    </SideSummary>
  );
};
