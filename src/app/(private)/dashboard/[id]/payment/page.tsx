"use client";
import axios from "@/lib/axios";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";

import { getPaymentUserData, getUserData } from "@/hooks/useUsers";
import { UserData } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { Payments } from "@/types/payments";
import {
  AlertText,
  ContainerAlertText,
  GlobalStyle,
  PlanCard,
  PlanDescription,
  PlanPrice,
  PlansContainer,
  PlansGrid,
  PlanTitle,
  SubscribeButton,
  Title,
} from "./styled";
import ButtonBack from "@/components/ButtonBack";

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
}

const plans: Plan[] = [
  {
    id: "price_1QrPHgFuK8IcbVKxomNX4I9A",
    name: "Basico",
    price: "R$ 29,90/mês",
    description: "Plano básico com acesso limitado.",
  },
  {
    id: "price_1QslNVFuK8IcbVKxwmx1mCCx",
    name: "Pro",
    price: "R$ 57,00/mês",
    description: "Plano completo com todos os recursos.",
  },
];

const Plans = () => {
  const { id } = useParams();
  const PathnameUrl = usePathname()
  const newUrl = PathnameUrl.replace("payment", "")

  const { data: dataUser, refetch: refetchUser } = useQuery<UserData>({
    queryKey: ["user", id],
    queryFn: () => getUserData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const { data: dataPayments, refetch: refetchPayments } = useQuery<Payments[]>(
    {
      queryKey: ["payment", id],
      queryFn: () =>
        getPaymentUserData(Array.isArray(id) ? id[0] : (id as string)),
    }
  );

  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const subscriptionId = dataPayments?.[0].stripe_subscription_id;
  const customerId = dataPayments?.[0].stripe_customer_id;
  const paymentId = dataPayments?.[0]._id;

  const handleSubscribe = async (planId: string) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `payment/create-checkout-session/${id}`,
        {
          userEmail: dataUser?.email,
          planId,
        }
      );

      await refetchUser();

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Erro ao criar sessão:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdata = async (planId: string) => {
    setIsUpdating(true);

    try {
      await axios.post(`payment/updata-payment`, {
        subscriptionId,
        newPriceId: planId,
      });

      await refetchPayments();
    } catch (error) {
      console.error("Erro ao criar sessão:", error);
    } finally {
      setIsUpdating(false);
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    setIsUpdating(true);

    try {
      await axios.delete(`payment/delete-payment`, {
        data: {
          subscriptionId,
          customerId,
          paymentId,
          barbeariaId: id,
        },
      });

      await refetchPayments();
    } catch (error) {
      console.error("Erro ao criar sessão:", error);
    } finally {
      setIsUpdating(false);
      window.location.reload();
    }
  };

  return (
    <>
      <ButtonBack url={newUrl} />

      <GlobalStyle />

      {dataUser?.status_conta !== "active" ? (
        <PlansContainer>
          <Title>Escolha seu Plano</Title>
          <PlansGrid>
            {plans.map((plan) => (
              <PlanCard key={plan.id}>
                <PlanTitle>{plan.name}</PlanTitle>
                <PlanDescription>{plan.description}</PlanDescription>
                <PlanPrice>{plan.price}</PlanPrice>
                <SubscribeButton
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading}
                >
                  {loading ? "Processando..." : "Assinar"}
                </SubscribeButton>
              </PlanCard>
            ))}
          </PlansGrid>
        </PlansContainer>
      ) : (
        <PlansContainer>
          <Title>Atualize seu Plano</Title>
          <ContainerAlertText>
            <AlertText>
              Atenção! Se você optar por mudar para um plano inferior ao seu
              plano atual, todos os dados de funcionários e serviços serão
              apagados para garantir a segurança do site. Isso ocorre porque os
              planos possuem limites específicos para o número de funcionários e
              serviços. Por favor, certifique-se antes de realizar a alteração.
            </AlertText>
          </ContainerAlertText>
          <PlansGrid>
            {plans.map((plan) => {
              const isCurrentPlan = plan.name === dataUser?.plano_assinado;

              return (
                <PlanCard key={plan.id}>
                  <PlanTitle>{plan.name}</PlanTitle>
                  <PlanDescription>{plan.description}</PlanDescription>
                  <PlanPrice>{plan.price}</PlanPrice>
                  <SubscribeButton
                    onClick={() => handleUpdata(plan.id)}
                    disabled={isUpdating || isCurrentPlan} // Desativa todos os botões se estiver processando
                  >
                    {isUpdating
                      ? "Processando..."
                      : isCurrentPlan
                        ? "Plano Atual"
                        : "Assinar"}
                  </SubscribeButton>
                </PlanCard>
              );
            })}
          </PlansGrid>

          <div>
            <button onClick={handleDelete}>Deletar</button>
          </div>
        </PlansContainer>
      )}
    </>
  );
};

export default Plans;
