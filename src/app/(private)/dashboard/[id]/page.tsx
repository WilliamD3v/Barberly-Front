"use client";
import Image from "next/image";
import { useState } from "react";
import { destroyCookie } from "nookies";
import { UserData } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, usePathname } from "next/navigation";

import { IoIosMenu } from "react-icons/io";
/* Agendamentos */
import { GrSchedules } from "react-icons/gr";
/* Servicos */
import { AiOutlineContainer } from "react-icons/ai";
/* Funcionarios */
import { AiOutlineUsergroupAdd } from "react-icons/ai";
/* Pagamentos */
import { AiOutlineCreditCard } from "react-icons/ai";
/* configuracoes */
import { IoSettings } from "react-icons/io5";
/* Notificacao */
import { MdNotificationsActive } from "react-icons/md";

import {
  BoxButtonLinksHeader,
  BoxClosed,
  BoxElementsResume,
  BoxHr,
  BoxIconsButtonsHeader,
  BoxImageProfile,
  BoxStatusAcconts,
  BoxTitleMenu,
  Button,
  ButtonClosed,
  CardItem,
  CardLabel,
  ContainerButtonHeaderBackMenu,
  ContainerButtonHeaderDashboard,
  ContainerButtonsMenu,
  ContainerInfosProfile,
  ContainerResumeAndUrl,
  Content,
  CopyButton,
  DashboardContainer,
  Header,
  Hr,
  IconsHeader,
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
  TitleMenu,
  TooltipContainer,
} from "./styled";

import {
  getEmployeesDataAll,
  getImageProfileData,
  getServiceData,
  getUserData,
} from "@/hooks/useUsers";
import { Section, SectionTitle } from "./agendamentos/styled";
import { ImagensProfilesProps } from "@/types/imagesProfiles";
import { Services } from "@/types/services";
import axios from "@/lib/axios";
import {
  BoxServiceItem,
  BoxElements,
  BoxButtonDeleteService,
  ButtonDeleteService,
} from "./service/styled";
import { Employee } from "@/types/employees";

export default function Dashboard() {
  const { id } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const URL = `/barbearia/profile/${id}`;

  const { data: dataUser } = useQuery<UserData>({
    queryKey: ["user", id],
    queryFn: () => getUserData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const { data: dataImageProfile } = useQuery<ImagensProfilesProps[]>({
    queryKey: ["ImageProfile", id],
    queryFn: () =>
      getImageProfileData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const { data: dataServices, refetch } = useQuery<Services[]>({
    queryKey: ["Service", id],
    queryFn: () => getServiceData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const { data: dataEmployees, refetch: employeesRefetch } = useQuery<Employee[]>({
    queryKey: ["Employees", id],
    queryFn: () =>
      getEmployeesDataAll(Array.isArray(id) ? id[0] : (id as string)),
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

  const deleteEmployes = async (employeesId: string) => {
    console.log(employeesId);
    try {
      const response = await axios.delete(
        `/employees/delete/${id}/${employeesId}`
      );

      await employeesRefetch();

      if (response.status === 200) {
        console.log("deletada com sucesso");
      }
    } catch (error) {
      console.log(error);
    }
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
              <ContainerInfosProfile>
                <BoxImageProfile>
                  {dataImageProfile?.map((img) =>
                    img.type === "profile" ? (
                      <Image
                        key={img._id}
                        className="image_profile"
                        src={img.url || "/default-profile.png"}
                        alt={img.name || "Profile Image"}
                        width={1000}
                        height={1000}
                      />
                    ) : null
                  )}
                </BoxImageProfile>

                <BoxTitleMenu>
                  <TitleMenu>{dataUser?.name}</TitleMenu>
                </BoxTitleMenu>

                <BoxHr>
                  <Hr />
                </BoxHr>
              </ContainerInfosProfile>

              <BoxButtonLinksHeader>
                <BoxIconsButtonsHeader>
                  <IconsHeader>
                    <GrSchedules />
                  </IconsHeader>
                </BoxIconsButtonsHeader>
                <Button onClick={handleButtonAgendamento}>Agendamento</Button>
              </BoxButtonLinksHeader>

              <BoxButtonLinksHeader>
                <BoxIconsButtonsHeader>
                  <IconsHeader>
                    <AiOutlineContainer />
                  </IconsHeader>
                </BoxIconsButtonsHeader>
                <Button onClick={handleButtonService}>Serviços</Button>
              </BoxButtonLinksHeader>

              <BoxButtonLinksHeader>
                <BoxIconsButtonsHeader>
                  <IconsHeader>
                    <AiOutlineUsergroupAdd />
                  </IconsHeader>
                </BoxIconsButtonsHeader>
                <Button onClick={handleButtonEmployees}>Funcionários</Button>
              </BoxButtonLinksHeader>

              <BoxButtonLinksHeader>
                <BoxIconsButtonsHeader>
                  <IconsHeader>
                    <AiOutlineCreditCard />
                  </IconsHeader>
                </BoxIconsButtonsHeader>
                <Button onClick={handleButtonPayment}>Pagamentos</Button>
              </BoxButtonLinksHeader>

              <BoxHr>
                <Hr />
              </BoxHr>

              <BoxButtonLinksHeader>
                <BoxIconsButtonsHeader>
                  <IconsHeader>
                    <IoSettings />
                  </IconsHeader>
                </BoxIconsButtonsHeader>
                <Button onClick={handleButtonSettings}>Configuracões</Button>
              </BoxButtonLinksHeader>

              <BoxButtonLinksHeader>
                <BoxIconsButtonsHeader>
                  <IconsHeader>
                    <MdNotificationsActive />
                  </IconsHeader>
                </BoxIconsButtonsHeader>
                <Button onClick={handleButtonSettings}>Notificações</Button>
              </BoxButtonLinksHeader>
            </ContainerButtonsMenu>

            <ContainerButtonHeaderBackMenu
              onClick={handleMenu}
              className="scale-out-back"
            >
              <IoIosMenu className="visible" />
            </ContainerButtonHeaderBackMenu>
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
            {dataServices && dataServices.length > 0 ? (
              dataServices.map((servico) => (
                <ServiceItem key={servico._id}>
                  <BoxServiceItem>
                    <BoxElements>
                      <ServiceTitle>{servico.name}</ServiceTitle>
                      <ServiceDescription>
                        {servico.description}
                      </ServiceDescription>
                    </BoxElements>
                    <BoxButtonDeleteService>
                      <ButtonDeleteService
                        onClick={() => handleDeleteService(servico._id)}
                      >
                        Delete
                      </ButtonDeleteService>
                    </BoxButtonDeleteService>
                  </BoxServiceItem>
                </ServiceItem>
              ))
            ) : (
              <div>
                <h1>Nenhum serviço cadastrado</h1>
              </div>
            )}
          </ServiceList>
        </Section>
        <hr />

        <Section>
          <SectionTitle>Lista de Funcionários</SectionTitle>
          <ServiceList>
            {dataEmployees && dataEmployees.length > 0 ? (
              dataEmployees?.map((employees) => (
                <ServiceItem key={employees._id}>
                  <BoxServiceItem>
                    <BoxElements>
                      <ServiceTitle>{employees.name}</ServiceTitle>
                    </BoxElements>
                    <BoxButtonDeleteService>
                      <ButtonDeleteService
                        onClick={() => deleteEmployes(employees._id)}
                      >
                        Delete
                      </ButtonDeleteService>
                    </BoxButtonDeleteService>
                  </BoxServiceItem>
                </ServiceItem>
              ))
            ) : (
              <div>
                <h1>Nenhum funcionário cadastrado</h1>
              </div>
            )}
          </ServiceList>
        </Section>
      </Content>

      <hr />

      <BoxClosed>
        <ButtonClosed onClick={handleRemoveCookies}>Sair</ButtonClosed>
      </BoxClosed>

      {/*       <ComponentsService id={id as string} profilePrivate={profilePrivate}/> */}
    </DashboardContainer>
  );
}
