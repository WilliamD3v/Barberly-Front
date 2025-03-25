"use client";
import axios from "@/lib/axios";
import { useState } from "react";
import {
  Alert,
  Button,
  ContainerButton,
  ContainerForm,
  ContainerGeral,
  ContainerTitle,
  FormContainerWrapper,
  GlobalStyle,
  Input,
  Title,
} from "./styled";
import { useParams, usePathname } from "next/navigation";
import { ComponentsService } from "@/components/CardService";
import ButtonBack from "@/components/ButtonBack";

export default function Service() {
  const { id } = useParams();
  const urlPathname = usePathname()
  const newUrl = urlPathname.replace("/service", "")

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    duration: "",
  });

  const [alertError, setAlertError] = useState<string | null>(null);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  const profilePrivate = true;

  const formatCurrency = (val: string) => {
    const num = val.replace(/\D/g, ""); // Remove tudo que não é número
    if (!num) return 0; // Retorna 0 se estiver vazio
    return parseFloat((parseInt(num, 10) / 100).toFixed(2)); // Retorna um número
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? formatCurrency(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      setAlertError("Nome obrigatório!");
      return;
    }

    if (formData.price === 0) {
      setAlertError("Valor obrigatório!");
      return;
    }

    if (!formData.description) {
      setAlertError("Descrição obrigatória!");
      return;
    }

    if (!formData.duration) {
      setAlertError("Duração obrigatória!");
      return;
    }

    try {
      const response = await axios.post(`/services/register/${id}`, formData);
      if (response.status === 201) {
        setAlertSuccess("Serviço cadastrado com sucesso");
        setAlertError("");
      }
    } catch {
      setAlertError("Erro ao cadastrar serviço");
    }
  };

  return (
    <>

    <ButtonBack url={newUrl} />

      <ContainerGeral>
        <GlobalStyle />

        {/* Formulário de cadastro */}
        <ContainerTitle>
          <Title>Serviços</Title>
        </ContainerTitle>

        <FormContainerWrapper>
          <ContainerForm onSubmit={handleSubmit}>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Nome:"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="price"
              id="price"
              value={
                formData.price
                  ? new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(formData.price)
                  : "R$ 0,00"
              }
              onChange={handleChange}
              placeholder="R$ 0,00"
              className="border border-gray-300 rounded p-2 w-full"
            />
            <Input
              type="number"
              name="duration"
              id="duration"
              placeholder="Duração:"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Descrição:"
              onChange={handleChange}
            />
            <ContainerButton>
              <Button type="submit">Enviar</Button>
            </ContainerButton>
          </ContainerForm>

          {alertError && <Alert isSuccess={false}>{alertError}</Alert>}
          {alertSuccess && <Alert isSuccess={true}>{alertSuccess}</Alert>}
        </FormContainerWrapper>

        <ComponentsService id={id as string} profilePrivate={profilePrivate} />
      </ContainerGeral>
    </>
  );
}
