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
  Button,
  ButtonClosed,
  CardItem,
  CardLabel,
  ContainerButtonHeaderDashboard,
  ContainerButtonsMenu,
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
import { Section, SectionTitle } from "./agendamentos/styled";

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

  const handleButtonSettings = () => {
    router.push(`${pathname}/settings`);
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
              <Button onClick={handleButtonSettings}>Configuracões</Button>
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

            <ContainerResumeAndUrl>
                <CopyButton onClick={handleCopy}>
                  {copied ? "Link copiado!" : "Copiar link"}
                </CopyButton>
                <StyledLink href={URL}>Página de Agendamento</StyledLink>
            </ContainerResumeAndUrl>
          </BoxElementsResume>
        </Section>

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
