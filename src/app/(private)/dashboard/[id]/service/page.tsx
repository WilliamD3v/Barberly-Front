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
import { useParams, usePathname, useRouter } from "next/navigation";
import ButtonBack from "@/components/ButtonBack";
import { LoadingBar } from "@/components/LoadingBar";

export default function Service() {
  const { id } = useParams();
  const router = useRouter();
  const urlPathname = usePathname();
  const newUrl = urlPathname.replace("/service", "");

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    duration: "",
  });

  const [alertError, setAlertError] = useState<string | null>(null);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

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

    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      const response = await axios.post(`/services/register/${id}`, formData);
      if (response.status === 201) {
        setAlertSuccess("Serviço cadastrado com sucesso");
        setAlertError("");

        router.push(newUrl);
      }
    } catch {
      setAlertError("Erro ao cadastrar serviço");
    } finally {
      clearInterval(interval); // Para a animação
      setProgress(100); // Finaliza a barra
      setTimeout(() => {
        setLoading(false);
        setProgress(0); // Reseta a barra após um tempo
      }, 500);
    }
  };

  return (
    <>
      <ButtonBack url={newUrl} />

      <ContainerTitle>
        <Title>Serviços</Title>
      </ContainerTitle>

      <ContainerGeral>
        <GlobalStyle />
        {/* Formulário de cadastro */}
        <FormContainerWrapper>
          <ContainerForm>
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
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </Button>
            </ContainerButton>
            {loading && <LoadingBar progress={progress} />}
          </ContainerForm>

          {alertError && <Alert isSuccess={false}>{alertError}</Alert>}
          {alertSuccess && <Alert isSuccess={true}>{alertSuccess}</Alert>}
        </FormContainerWrapper>
      </ContainerGeral>
    </>
  );
}
