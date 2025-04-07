"use client";
import axios from "@/lib/axios";
import { useEffect, useState } from "react";
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
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import ButtonBack from "@/components/ButtonBack";
import { LoadingBar } from "@/components/LoadingBar";
import { getServiceData } from "@/hooks/useUsers";
import { Services } from "@/types/services";
import { useQuery } from "@tanstack/react-query";

export default function Service() {
  const { id } = useParams();
  const router = useRouter();
  const urlPathname = usePathname();
  const newUrl = urlPathname.replace("/service", "");
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");

  const { data: dataServices } = useQuery<Services[]>({
    queryKey: ["Service", id],
    queryFn: () => getServiceData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    duration: "",
  });
  const [originalData, setOriginalData] = useState<typeof formData | null>(
    null
  );

  const [alertError, setAlertError] = useState<string | null>(null);
  const [alertSuccess, setAlertSuccess] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (serviceId && dataServices) {
      const selectedService = dataServices?.find(
        (serv) => serv._id === serviceId
      );

      if (selectedService) {
        const formatted = {
          name: selectedService.name,
          price: selectedService.price,
          description: selectedService.description,
          duration: String(selectedService.duration),
        };

        setFormData(formatted);
        setOriginalData(formatted); // salva dados originais
      }
    }
  }, [serviceId, dataServices]);

  const isFormModified = () => {
    if (!originalData) return true; // considera modificado se não houver original
    return (
      formData.name !== originalData.name ||
      formData.price !== originalData.price ||
      formData.description !== originalData.description ||
      formData.duration !== originalData.duration
    );
  };

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

    if (!serviceId) {
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
    }

    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      let response;

      if (serviceId) {
        if (serviceId) {
          if (!isFormModified()) {
            setAlertError("Nenhuma alteração detectada.");
            return;
          }
        }

        response = await axios.put(`/services/update-service/${serviceId}`, formData);
        if (response.status === 200) {
          setAlertSuccess("Serviço atualizado com sucesso");
          setAlertError("");
        }
      } else {
        response = await axios.post(`/services/register/${id}`, formData);
        if (response.status === 201) {
          setAlertSuccess("Serviço cadastrado com sucesso");
          setAlertError("");
        }
      }

      router.push(newUrl);
    } catch {
      setAlertError("Erro ao salvar serviço");
    } finally {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
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
              value={formData.name}
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
              value={formData.duration}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="description"
              id="description"
              placeholder="Descrição:"
              value={formData.description}
              onChange={handleChange}
            />
            <ContainerButton>
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </Button>
            </ContainerButton>
            {loading && <LoadingBar progress={progress} />}
          </ContainerForm>

          <Alert $isSuccess={true}>{alertSuccess}</Alert>
          <Alert $isSuccess={false}>{alertError}</Alert>
        </FormContainerWrapper>
      </ContainerGeral>
    </>
  );
}
