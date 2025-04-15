"use client";
import { Services } from "@/types/services";
import { Wrapper, Card, Details, Button, Info } from "./styled";

interface Props {
  services: Services[];
  selected: Services[];
  onToggle: (service: Services) => void;
}

export const ServiceList = ({ services, selected, onToggle }: Props) => {
  return (
    <Wrapper>
      {services.map((service) => {
        const isSelected = selected.some((s) => s._id === service._id);

        return (
          <Card
            key={service._id}
            style={{ borderColor: isSelected ? "#198754" : "#e1e1e1" }}
          >
            <Info>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </Info>
            <Details>
              <span>{service.duration} min</span>
              <strong>R$ {service.price.toFixed(2)}</strong>
              <Button
                onClick={() => onToggle(service)}
                style={{ background: isSelected ? "#dc3545" : "#198754" }}
              >
                {isSelected ? "Remover" : "Selecionar"}
              </Button>
            </Details>
          </Card>
        );
      })}
    </Wrapper>
  );
};
