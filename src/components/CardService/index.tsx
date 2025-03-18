"use client";
import axios from "@/lib/axios";

import { getServiceData } from "@/hooks/useUsers";
import { ClientProps, HorariosSelecionados, Services } from "@/types/services";
import { useQuery } from "@tanstack/react-query";

import {
  ServiceListWrapper,
  ServiceListTitle,
  ServiceContainer,
  ServiceItem,
} from "./styled";

import { Cart } from "@/types/cart";
import { Employee } from "@/types/employees";

interface userId {
  id: string;
  profilePrivate: boolean;
  employees?: Employee;
  cart?: Cart;
  setCart?: React.Dispatch<
    React.SetStateAction<{
      items: Services[];
      cliet: ClientProps;
      horarioSelecionados: HorariosSelecionados;
      totalPrice: number;
      totalDuration: number;
      funcionario: string;
    }>
  >;
}

export const ComponentsService = ({
  id,
  profilePrivate,
  setCart,
  employees,
}: userId) => {
  const { data: dataServices, refetch } = useQuery<Services[]>({
    queryKey: ["Service", id],
    queryFn: () => getServiceData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const handleDeleteService = async (serviceId: string) => {
    try {
      const response = await axios.delete(
        `/services/delete/${id}/${serviceId}`
      );
      if (response.status === 201) {
        console.log("Serviço deletado com sucesso");
        refetch();
      }
    } catch {
      console.log("Erro ao deletar o serviço");
    }
  };

  const handleAddToCart = (service: Services) => {
    if (!setCart) return; // Garante que `setCart` está definido antes de chamá-lo

    setCart((prevCart) => {
      if (!prevCart.items.some((cartData) => cartData._id === service._id)) {
        return {
          ...prevCart, // Mantém propriedades anteriores
          items: [...prevCart.items, service],
          totalPrice: prevCart.totalPrice + service.price,
          totalDuration: prevCart.totalDuration + service.duration,
          funcionario: employees?.name || prevCart.funcionario, // Define o funcionário corretamente
        };
      }
      return prevCart;
    });
  };

  return (
    <ServiceListWrapper>
      <ServiceListTitle>Lista de Serviços</ServiceListTitle>

      {!dataServices?.length ? (
        <ServiceContainer>
          <p style={{ color: "#adb5bd", textAlign: "center" }}>
            Nenhum serviço cadastrado ainda.
          </p>
        </ServiceContainer>
      ) : profilePrivate ? (
        <ServiceContainer>
          {dataServices?.map((service) => (
            <ServiceItem key={service._id}>
              <h3>{service.name}</h3>
              <p className="price">
                {/* Verificação se service.price é um valor válido antes de chamar toString */}
                R${" "}
                {service.price != null
                  ? service.price.toString().replace(".", ",")
                  : "Preço indisponível"}
              </p>
              <p>{service.description}</p>
              <p className="duration">Duração: {service.duration}m</p>

              <button onClick={() => handleDeleteService(service._id)}>
                Deletar
              </button>
            </ServiceItem>
          ))}
        </ServiceContainer>
      ) : (
        <ServiceContainer>
          {dataServices?.map((service) => (
            <ServiceItem
              key={service._id}
              onClick={() => handleAddToCart(service)}
            >
              <h3>{service.name}</h3>
              <p className="price">
                {/* Verificação se service.price é um valor válido antes de chamar toString */}
                R${" "}
                {service.price != null
                  ? service.price.toString().replace(".", ",")
                  : "Preço indisponível"}
              </p>
              <p>{service.description}</p>
              <p className="duration">Duração: {service.duration}m</p>
            </ServiceItem>
          ))}
        </ServiceContainer>
      )}
    </ServiceListWrapper>
  );
};
