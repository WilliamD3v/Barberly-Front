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
/* updata botao */
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
/* delete botao */
import { MdDeleteForever } from "react-icons/md";

import {
  BoxButtonLinksHeader,
  BoxButtonUpdel,
  BoxClosed,
  BoxDescriptionCounter,
  BoxElementsResume,
  BoxHr,
  BoxIconsButtonsHeader,
  BoxImageProduct,
  BoxImageProfile,
  BoxProductItem,
  BoxStatusAcconts,
  BoxTitleMenu,
  Button,
  ButtonClosed,
  ButtonDeleteProduct,
  ButtonUpdateProduct,
  CardItem,
  CardLabel,
  CloseButton,
  ContainerButtonHeaderBackMenu,
  ContainerButtonHeaderDashboard,
  ContainerButtonsMenu,
  ContainerInfosProfile,
  ContainerResumeAndUrl,
  Content,
  CopyButton,
  DashboardContainer,
  FloatingServiceCard,
  Header,
  Hr,
  IconsHeader,
  Overlay,
  ServiceDescription,
  ServiceInfo,
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
  getProduct,
  getServiceData,
  getUserData,
} from "@/hooks/useUsers";
import { Section, SectionTitle } from "./agendamentos/styled";
import { ImagensProfilesProps } from "@/types/imagesProfiles";
import { Services } from "@/types/services";
import axios from "@/lib/axios";
import {
  BoxElements,
  BoxButtonDeleteService,
  ButtonDeleteService,
  BoxServiceItem,
  BoxLoadingBar,
} from "./service/styled";
import { Employee } from "@/types/employees";
import { ProductProps } from "@/types/products";
import { LoadingBar } from "@/components/LoadingBar";
import { FloatingMessage } from "@/components/FloatingMessage";

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

  const { data: dataEmployees, refetch: employeesRefetch } = useQuery<
    Employee[]
  >({
    queryKey: ["Employees", id],
    queryFn: () =>
      getEmployeesDataAll(Array.isArray(id) ? id[0] : (id as string)),
  });

  const { data: dataProduct, refetch: productRefetch } = useQuery<
    ProductProps[]
  >({
    queryKey: ["Products", id],
    queryFn: () => getProduct(Array.isArray(id) ? id[0] : (id as string)),
  });

  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [typeMessage, setTypeMessage] = useState("");
  const [alertMessagem, setAlertMessagem] = useState("");
  const [messageBoolean, setMessageBoolean] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const [selectedServices, setSelectedServices] = useState<Services>();
  const [isViewSelectedService, setIsViewSelectedService] = useState(false);

  const handleSelectService = (serviceId: string) => {
    if (serviceId) {
      const serviceSelectds = dataServices?.find((s) => s._id === serviceId);
      setSelectedServices(serviceSelectds);
    }
    setIsViewSelectedService(true);
  };

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

  const handleButtonProduts = () => {
    router.push(`${pathname}/produts`);
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

  const handleUploadProduct = async (productId: string) => {
    router.push(`${pathname}/produts?produt=${productId}`);
  };

  const handleUploadService = async (serviceId: string) => {
    router.push(`${pathname}/service?serviceId=${serviceId}`);
  };

  const handleDeleteService = async (serviceId: string) => {
    setLoadingId(serviceId);
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      const response = await axios.delete(
        `/services/delete/${id}/${serviceId}`
      );

      if (response.status === 201) {
        setAlertMessagem("Serviço deletado com sucesso");
      }

      await refetch();

      setTypeMessage("success");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setAlertMessagem(
        err.response?.data?.message || "Erro ao atualizar produto!"
      );
      setTypeMessage("error");
    } finally {
      clearInterval(interval);
      setProgress(100);
      setMessageBoolean(true);
      setTimeout(() => {
        setLoadingId(null);
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  const deleteEmployes = async (employeesId: string) => {
    setLoadingId(employeesId);
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      const response = await axios.delete(
        `/employees/delete/${id}/${employeesId}`
      );

      await employeesRefetch();

      if (response.status === 201) {
        setAlertMessagem("Funcionário deletado com sucesso");
      }

      setTypeMessage("success");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setAlertMessagem(
        err.response?.data?.message || "Erro ao atualizar produto!"
      );
      setTypeMessage("error");
    } finally {
      clearInterval(interval);
      setProgress(100);
      setMessageBoolean(true);
      setTimeout(() => {
        setLoadingId(null);
        setLoading(false);
        setProgress(0);
      }, 500);
    }
  };

  const handleDelete = async (productId: string) => {
    setLoadingId(productId);
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    try {
      const response = await axios.delete(
        `products/delete-product/${productId}`,
        { timeout: 60000 }
      );

      if (response.status === 201) {
        setAlertMessagem("Produto deletado com sucesso");
      }

      await productRefetch();

      setTypeMessage("success");
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } } };
      setAlertMessagem(
        err.response?.data?.message || "Erro ao atualizar produto!"
      );
      setTypeMessage("error");
    } finally {
      clearInterval(interval);
      setProgress(100);
      setMessageBoolean(true);
      setTimeout(() => {
        setLoadingId(null);
        setLoading(false);
        setProgress(0);
      }, 500);
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
                    <AiOutlineContainer />
                  </IconsHeader>
                </BoxIconsButtonsHeader>
                <Button onClick={handleButtonProduts}>Produtos</Button>
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

        {isViewSelectedService ? (
          <Overlay>
            <FloatingServiceCard>
              <CloseButton onClick={() => setIsViewSelectedService(false)}>
                ×
              </CloseButton>

              <ServiceInfo>
                <h2>{selectedServices?.name}</h2>

                <div className="info-item">
                  <span className="label">Descrição</span>
                  <span className="value">{selectedServices?.description}</span>
                </div>

                <div className="info-item">
                  <span className="label">Preço</span>
                  <span className="value">
                    R$ {selectedServices?.price.toFixed(2)}
                  </span>
                </div>

                <div className="info-item">
                  <span className="label">Duração</span>
                  <span className="value">
                    {selectedServices?.duration} minutos
                  </span>
                </div>

                <BoxButtonUpdel>
                  <BoxButtonDeleteService>
                    <ButtonUpdateProduct
                      onClick={() => {
                        if (selectedServices?._id) {
                          handleUploadService(selectedServices._id);
                        }
                      }}
                      disabled={loading}
                    >
                      <MdOutlineSystemUpdateAlt />
                    </ButtonUpdateProduct>
                  </BoxButtonDeleteService>

                  <BoxButtonDeleteService>
                    <ButtonDeleteProduct
                      onClick={() => {
                        if (selectedServices?._id) {
                          handleUploadService(selectedServices._id);
                        }
                      }}
                      disabled={loading}
                    >
                      <MdDeleteForever />
                    </ButtonDeleteProduct>
                  </BoxButtonDeleteService>
                </BoxButtonUpdel>
              </ServiceInfo>
            </FloatingServiceCard>
          </Overlay>
        ) : null}

        {/* Lista de Serviços */}
        <Section>
          <SectionTitle>Serviços Disponíveis</SectionTitle>
          <ServiceList>
            {dataServices && dataServices.length > 0 ? (
              dataServices.map((servico) => (
                <ServiceItem
                  key={servico._id}
                  onClick={() => handleSelectService(servico._id)}
                >
                  <BoxServiceItem>
                    <BoxElements>
                      <ServiceTitle>{servico.name}</ServiceTitle>
                      <ServiceDescription>
                        {servico.description}
                      </ServiceDescription>
                    </BoxElements>

                    <BoxButtonUpdel>
                      <BoxButtonDeleteService>
                        <ButtonUpdateProduct
                          onClick={() => handleUploadService(servico._id)}
                          disabled={loading}
                        >
                          <MdOutlineSystemUpdateAlt />
                        </ButtonUpdateProduct>
                      </BoxButtonDeleteService>

                      <BoxButtonDeleteService>
                        <ButtonDeleteProduct
                          onClick={() => handleDeleteService(servico._id)}
                          disabled={loading}
                        >
                          <MdDeleteForever />
                        </ButtonDeleteProduct>
                      </BoxButtonDeleteService>
                    </BoxButtonUpdel>
                  </BoxServiceItem>

                  <BoxLoadingBar>
                    {loadingId === servico._id && (
                      <LoadingBar progress={progress} />
                    )}
                  </BoxLoadingBar>
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

        {/* Lista de produtos */}
        <Section>
          <SectionTitle>Produtos Disponíveis</SectionTitle>
          <ServiceList>
            {dataProduct && dataProduct.length > 0 ? (
              dataProduct.map((product) => (
                <ServiceItem key={product._id}>
                  <BoxProductItem>
                    <BoxImageProduct>
                      <Image
                        className="image-product"
                        src={product.image.url}
                        alt={product.image.name}
                        width={1000}
                        height={1000}
                      />

                      <BoxElements>
                        <ServiceTitle>{product.name}</ServiceTitle>
                        <BoxDescriptionCounter className="flex gap-3">
                          <ServiceDescription>
                            {product.description}
                          </ServiceDescription>
                          <ServiceDescription>
                            <span>Qtn:</span>
                            {product.counter}
                          </ServiceDescription>
                        </BoxDescriptionCounter>
                      </BoxElements>
                    </BoxImageProduct>

                    <BoxButtonUpdel>
                      <BoxButtonDeleteService>
                        <ButtonUpdateProduct
                          onClick={() => handleUploadProduct(product._id)}
                          disabled={loading}
                        >
                          <MdOutlineSystemUpdateAlt />
                        </ButtonUpdateProduct>
                      </BoxButtonDeleteService>

                      <BoxButtonDeleteService>
                        <ButtonDeleteProduct
                          onClick={() => handleDelete(product._id)}
                          disabled={loading}
                        >
                          <MdDeleteForever />
                        </ButtonDeleteProduct>
                      </BoxButtonDeleteService>
                    </BoxButtonUpdel>
                  </BoxProductItem>

                  {loadingId === product._id && (
                    <BoxLoadingBar>
                      <LoadingBar progress={progress} />
                    </BoxLoadingBar>
                  )}
                </ServiceItem>
              ))
            ) : (
              <div>
                <h1>Nenhum Produto cadastrado</h1>
              </div>
            )}
          </ServiceList>
        </Section>

        <hr />

        {/* Lista de funcionarios */}
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
                        <MdDeleteForever />
                      </ButtonDeleteService>
                    </BoxButtonDeleteService>
                  </BoxServiceItem>
                  <BoxLoadingBar>
                    {loadingId === employees._id && (
                      <LoadingBar progress={progress} />
                    )}
                  </BoxLoadingBar>
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

      <FloatingMessage
        message={alertMessagem}
        show={messageBoolean}
        duration={5000}
        onClose={() => setMessageBoolean(false)}
        type={typeMessage}
      />

      {/* Button de sair */}
      <BoxClosed>
        <ButtonClosed onClick={handleRemoveCookies}>Sair</ButtonClosed>
      </BoxClosed>
    </DashboardContainer>
  );
}
