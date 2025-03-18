"use client";
import React, { useState } from "react";

import { useAuth } from "@/context/AuthContext";

import { CiRead } from "react-icons/ci";
import { CiUnread } from "react-icons/ci";

import {
  ButtonViewPassword,
  Card,
  CardInputPassword,
  Container,
  ContainerButton,
  ContainerNames,
  ContainerRedirect,
  ContainerRedirectRecover,
  InputPassword,
  StyledButton,
  StyledInput,
  StyledLink,
  StyledLinkRecover,
  StyledTitle,
  TextRedirect,
  TextRedirectRecover,
} from "./styled";

export default function Login() {
  const { signIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewPassword, setViewPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleViewPassword = () => {
    setViewPassword(!viewPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setMessage("Preencha todos os campos!");
    }

    setLoading(true);
    setMessage(null);

    try {
      signIn(formData);
    } catch {
      setMessage("Erro ao realizar login.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <Card>
        <StyledTitle>Login</StyledTitle>

        <ContainerRedirect>
          <TextRedirect>
            Ainda não tem uma conta?{" "}
            <StyledLink href="/register">Cadastre-se!</StyledLink>
          </TextRedirect>
        </ContainerRedirect>

        <form onSubmit={handleSubmit}>
          <ContainerNames>
            <div>
              <StyledInput
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                placeholder="Digite seu Email"
              />
            </div>

            <CardInputPassword className="flex items-center">
              <InputPassword
                type={viewPassword ? "text" : "password"}
                name="password"
                id="password"
                onChange={handleChange}
                placeholder="Digite sua senha"
              />

              <ButtonViewPassword onClick={handleViewPassword}>
                {viewPassword ? <CiRead /> : <CiUnread />}
              </ButtonViewPassword>
            </CardInputPassword>
          </ContainerNames>

          <ContainerButton>
            <StyledButton type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Entrar"}
            </StyledButton>
          </ContainerButton>
        </form>

        <ContainerRedirectRecover>
          <TextRedirectRecover>
            Esqueceu sua senha?{" "}
            <StyledLinkRecover href="/">Click aqui!</StyledLinkRecover>
          </TextRedirectRecover>
        </ContainerRedirectRecover>
      </Card>
      {message && <p>{message}</p>}
    </Container>
  );
}
