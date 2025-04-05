"use client";

import axios from "@/lib/axios";
import { useState } from "react";
import {
  AlertMessage,
  Card,
  CardPassword,
  CheckboxContainer,
  CheckboxLabel,
  CheckboxWrapper,
  Container,
  ContainerButton,
  ContainerEmail,
  ContainerName,
  ContainerRedirect,
  HiddenCheckbox,
  StyledButton,
  StyledCheckbox,
  StyledInput,
  StyledInputEmail,
  StyledTitle,
  TextRedirect,
  StyledLink,
} from "./styled";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!formData.name || !formData.email || !formData.password) {
        setMessage("Todos os campos são obrigatorio");
        return;
      }

      if (formData.password.length < 6) {
        setMessage("A senha deve ter no minimo 6 caracteries.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setMessage("Senha não confirmada!");
      }

      const response = await axios.post("user/register", formData);

      if (response.status === 200) {
        setMessage("Usuario cadastrado com sucesso!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
        });

        const { data } = response

        router.push(`/dashboard/${data._id}/address`);
      }
    } catch {
      setMessage("Ocorreu um erro ao cadastrar o usuário.");
    }
  };

  return (
    <Container>
      <Card>
        <StyledTitle>Faça seu Cadastro</StyledTitle>
        {message && <AlertMessage alertType="error">{message}</AlertMessage>}

        <form onSubmit={handleSubmit}>
          <ContainerName>
            <div>
              <StyledInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome"
              />
            </div>

            <div>
              <StyledInput
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Celular"
              />
            </div>
          </ContainerName>

          <ContainerEmail>
            <div>
              <StyledInputEmail
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Exemplo@gmail.com"
              />
            </div>
          </ContainerEmail>

          <CardPassword>
            <div>
              <StyledInput
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Senha"
              />
            </div>
            <div>
              <StyledInput
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua senha"
              />
            </div>
          </CardPassword>

          <CheckboxContainer>
            <CheckboxWrapper>
              <HiddenCheckbox />
              <StyledCheckbox />
            </CheckboxWrapper>
            <CheckboxLabel>Termos de acesso ao site</CheckboxLabel>
          </CheckboxContainer>

          <ContainerButton>
            <StyledButton type="submit">Enviar</StyledButton>
          </ContainerButton>
        </form>
        <ContainerRedirect>
          <TextRedirect>
            Já tem uma conta?{" "}
            <StyledLink href="/login">Faça o login!</StyledLink>
          </TextRedirect>
        </ContainerRedirect>
      </Card>
    </Container>
  );
}
