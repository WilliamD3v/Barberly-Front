"use client";
import { useState } from "react";
import { UserData } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, usePathname } from "next/navigation";

import { IoClose } from "react-icons/io5";
import { IoIosMenu } from "react-icons/io";

import {
  BoxClosed,
  BoxElementsResume,
  BoxStatusAcconts,
  ButtonClosed,
  CardItem,
  CardLabel,
  ContainerResumeAndUrl,
  Content,
  CopyButton,
  DashboardContainer,
  Header,
  ServiceDescription,
  ServiceItem,
  ServiceList,
  ServiceTitle,
  StatusAccontsStyled,
  StatusContainer,
  StatusDot,
  StyledLink,
  SummaryCard,
  Title,
  TooltipContainer,
} from "./styled";

import { getUserData } from "@/hooks/useUsers";
import { destroyCookie } from "nookies";
import styled, { keyframes } from "styled-components";
import { Section, SectionTitle } from "./agendamentos/styled";

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Animação para o ícone de menu (aumenta e gira)
const scaleIn = keyframes`
  0% {
    transform: rotate(0deg) scale(0.5);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
`;

// Animação para o ícone de fechar (diminui de tamanho e desaparece)
const scaleOut = keyframes`
  0% {
    transform: rotate(180deg) scale(1);
  }
  100% {
    transform: rotate(180deg) scale(0.5);
  }
`;

const ContainerButtonHeaderDashboard = styled.button`
  font-size: 40px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    font-size: 30px;
  }

  svg {
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
  }

  .hidden {
    opacity: 0;
  }

  .visible {
    opacity: 1;
  }

  &.scale-in {
    animation: ${scaleIn} 0.3s forwards;
  }

  &.scale-out {
    font-size: 3.7rem;
    animation: ${scaleOut} 0.3s forwards;
  }
`;

const ContainerButtonsMenu = styled.div`
  display: flex;
  gap: 40px;
  transition: opacity 0.3s ease;
  opacity: 0;
  transform: translateX(100%);
  animation: ${slideIn} 0.5s forwards;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    position: absolute;
    top: 70px;
    right: 0;
    left: 52%;
    width: 40%;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 40px;
    border-radius: 5px;
  }

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Button = styled.button`
  color: #fff;
  margin-left: 15px;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    color: red;
  }

  @media (max-width: 768px) {
    font-size: 19px;
    width: 100%;
    text-align: center;
    margin-left: 0;
  }
`;

const serviços = [
  { nome: "Corte de Cabelo", descrição: "Corte moderno e personalizado" },
  { nome: "Barba", descrição: "Barba estilizada com lâmina" },
  { nome: "Sobrancelha", descrição: "Design e acabamento de sobrancelha" },
  {
    nome: "Corte de Cabelo e Barba",
    descrição: "Pacote combinado de corte e barba",
  },
];

export default function Dashboard() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const URL = `/barbearia/profile/${id}`;

  const { data: dataUser } = useQuery<UserData>({
    queryKey: ["user", id],
    queryFn: () => getUserData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleButtonEmployees = () => {
    router.push(`${pathname}/employees`);
  };

  const handleButtonService = () => {
    router.push(`${pathname}/service`);
  };

  const handleButtonAgendamento = () => {
    router.push(`${pathname}/agendamentos`);
  };

  const handleButtonPayment = () => {
    router.push(`${pathname}/payment`);
  };

  const handleRemoveCookies = () => {
    destroyCookie(null, "nextauth.token", { path: "/" });
    destroyCookie(null, "nextauth.userId", { path: "/" });

    router.push("/");
  };

  return (
    <DashboardContainer>
      {/* Header */}
      <Header>
        <div>
          <Title>Barbearia: {dataUser?.name}</Title>
          <div>
            <BoxStatusAcconts>
              <StatusAccontsStyled
                primary={dataUser?.status_conta === "active"}
              >
                <TooltipContainer>
                  {/* Status Ativo */}
                  <StatusContainer>
                    <StatusDot primary={true} />
                    Ativa
                  </StatusContainer>

                  {/* Status Inativo */}
                  <StatusContainer>
                    <StatusDot primary={false} />
                    Inativa
                  </StatusContainer>
                </TooltipContainer>
              </StatusAccontsStyled>
              <h1 className="relative top-[2px]">Status</h1>
            </BoxStatusAcconts>
          </div>
        </div>

        {!menu ? (
          <ContainerButtonHeaderDashboard onClick={handleMenu}>
            <IoIosMenu className="visible" />
          </ContainerButtonHeaderDashboard>
        ) : (
          <>
            <ContainerButtonsMenu className="visible">
              <Button onClick={handleButtonAgendamento}>Agendamento</Button>
              <Button onClick={handleButtonService}>Serviços</Button>
              <Button onClick={handleButtonEmployees}>Funcionários</Button>
              <Button onClick={handleButtonPayment}>Pagamentos</Button>
            </ContainerButtonsMenu>
            <ContainerButtonHeaderDashboard
              onClick={handleMenu}
              className="scale-out"
            >
              <IoClose className="visible" />
            </ContainerButtonHeaderDashboard>
          </>
        )}
      </Header>

      {/* Main Content */}
      <Content>
        {/* Resumo */}
        <Section>
          <SectionTitle>Resumo do Dia</SectionTitle>

          <BoxElementsResume>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <SummaryCard>
                <CardItem>
                  <p>10</p>
                  <CardLabel>Reservas para Hoje</CardLabel>
                </CardItem>
                <CardItem>
                  <p>5</p>
                  <CardLabel>Serviços Realizados</CardLabel>
                </CardItem>
              </SummaryCard>
            </div>

            <ContainerResumeAndUrl>
              <CopyButton onClick={handleCopy}>
                {copied ? "Link copiado!" : "Copiar link"}
              </CopyButton>
              <StyledLink href={URL}>Página de Agendamento</StyledLink>
            </ContainerResumeAndUrl>
          </BoxElementsResume>
        </Section>

        {/* Reservas Recentes */}
        {/*         <Section>
          <SectionTitle>Reservas Recentes</SectionTitle>
          <Table>
            <thead>
              <tr>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Serviço</TableHead>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva, index) => (
                <TableRow key={index}>
                  <TableCell>{reserva.cliente}</TableCell>
                  <TableCell>{reserva.data}</TableCell>
                  <TableCell>{reserva.horario}</TableCell>
                  <TableCell>{reserva.serviço}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Section> */}

        {/* Lista de Serviços */}
        <Section>
          <SectionTitle>Serviços Disponíveis</SectionTitle>
          <ServiceList>
            {serviços.map((servico, index) => (
              <ServiceItem key={index}>
                <ServiceTitle>{servico.nome}</ServiceTitle>
                <ServiceDescription>{servico.descrição}</ServiceDescription>
              </ServiceItem>
            ))}
          </ServiceList>
        </Section>
      </Content>

      <hr />

      <BoxClosed>
        <ButtonClosed onClick={handleRemoveCookies}>Sair</ButtonClosed>
      </BoxClosed>
    </DashboardContainer>
  );
}
