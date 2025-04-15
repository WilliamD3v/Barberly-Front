"use client";
import {
  getAddress,
  getImageProfileData,
  getProduct,
  getServiceData,
  getUserData,
} from "@/hooks/useUsers";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  BarbershopName,
  BoxBannerImage,
  BoxBottom,
  BoxElementsProduct,
  BoxElementsProfile,
  BoxElementsService,
  BoxElementsTextLocation,
  BoxElemetService,
  BoxIconLocation,
  BoxInfoLocation,
  BoxInfoProduct,
  BoxMap,
  BoxName,
  BoxNameProduct,
  BoxProduct,
  BoxProfileImage,
  BoxService,
  BoxTitleLocation,
  CalendarButton,
  CardsWrapper,
  CardsWrapperProduct,
  CartButton,
  Container,
  ContainerMap,
  Description,
  GlobalStyle,
  ImageProduct,
  Info,
  InfoGroup,
  InfoItem,
  InfoProduct,
  Name,
  Price,
  Qtd,
  ScheduleButton,
  TextCity,
  TextNeighborhood,
  TextNumber,
  TextRoad,
  TextService,
  TitleLocation,
  TitleName,
  TitleProduct,
} from "./styled";
import { UserData } from "@/types/users";
import { AddressProps } from "@/types/address";
import { useEffect, useState } from "react";
import { ImagensProfilesProps } from "@/types/imagesProfiles";

import { FaClock, FaLocationDot } from "react-icons/fa6";
import { Services } from "@/types/services";
import { ProductProps } from "@/types/products";

import { FaMoneyBillAlt, FaRegCalendarAlt } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function Agendamento() {
  const { id } = useParams();
  const router = useRouter();
  const Pathname = usePathname();

  const { data: dataUser } = useQuery<UserData>({
    queryKey: ["user", id],
    queryFn: () => getUserData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const { data: dataServices } = useQuery<Services[]>({
    queryKey: ["Service", id],
    queryFn: () => getServiceData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const { data: dataProduct } = useQuery<ProductProps[]>({
    queryKey: ["Products", id],
    queryFn: () => getProduct(Array.isArray(id) ? id[0] : (id as string)),
  });

  const { data: dataImageProfile } = useQuery<ImagensProfilesProps[]>({
    queryKey: ["ImageProfile", id],
    queryFn: () =>
      getImageProfileData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const { data: dataAddress } = useQuery<AddressProps[]>({
    queryKey: ["Address", id],
    queryFn: () => getAddress(Array.isArray(id) ? id[0] : (id as string)),
  });

  const [address, setAddress] = useState<string>("");

  const getRandomServices = (services: typeof dataServices) => {
    if (!services) return [];

    if (services.length <= 3) return services;

    const shuffled = [...services].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const hendleButtonEmployees = async () => {
    router.push(`${Pathname}/funcionario`);
  };

  const limitedServices = getRandomServices(dataServices);

  // Usar useEffect para atualizar o estado quando dataAddress mudar
  useEffect(() => {
    if (dataAddress && dataAddress.length > 0) {
      const addressBarber = `${dataAddress[0].street}, ${dataAddress[0].number}, ${dataAddress[0].neighborhood}, ${dataAddress[0].zipcode}`;
      setAddress(addressBarber);
    }
  }, [dataAddress]);

  return (
    <>
      <GlobalStyle />

      <Container>
        {dataImageProfile?.map(
          (img) =>
            img.type === "banner" && (
              <BoxBannerImage key={img._id} src={img.url} alt={img.name} />
            )
        )}
        <BoxElementsProfile>
          {dataImageProfile?.map(
            (img) =>
              img.type === "profile" && (
                <BoxProfileImage key={img._id} src={img.url} alt={img.name} />
              )
          )}

          <Info>
            <BarbershopName>{dataUser?.name}</BarbershopName>
            <Description>
              Experiência única em cortes e barba com estilo.
            </Description>
            <ScheduleButton onClick={hendleButtonEmployees}>
              Agendar Horário
            </ScheduleButton>
          </Info>
        </BoxElementsProfile>

        <BoxMap>
          <BoxTitleLocation>
            <TitleLocation>Localização</TitleLocation>
          </BoxTitleLocation>

          <BoxInfoLocation>
            <BoxIconLocation>
              <FaLocationDot />
            </BoxIconLocation>

            {dataAddress?.map((locat) => (
              <BoxElementsTextLocation key={locat._id}>
                <TextRoad>
                  {locat.street}
                  <span>{","}</span>
                </TextRoad>

                <TextNumber>
                  {locat.number} <span>{"-"}</span>
                </TextNumber>

                <TextNeighborhood>
                  {locat.neighborhood}
                  <span>{","}</span>
                </TextNeighborhood>
                <TextCity>{locat.city}</TextCity>
              </BoxElementsTextLocation>
            ))}
          </BoxInfoLocation>

          <ContainerMap>
            <Map address={address} />
          </ContainerMap>
        </BoxMap>

        <BoxService>
          <TextService>Sugestões de Serviços</TextService>

          <CardsWrapper>
            {limitedServices.map((serv) => (
              <BoxElementsService key={serv._id}>
                <BoxName>
                  <TitleName>{serv.name}</TitleName>
                </BoxName>

                <BoxElemetService>
                  <BoxBottom>
                    <InfoGroup>
                      <InfoItem>
                        <FaClock />
                        <span>{serv.duration} min</span>
                      </InfoItem>
                      <InfoItem>
                        <FaMoneyBillAlt />
                        <span>R$ {Number(serv.price).toFixed(2)}</span>
                      </InfoItem>
                    </InfoGroup>
                  </BoxBottom>

                  <CalendarButton>
                    <FaRegCalendarAlt />
                  </CalendarButton>
                </BoxElemetService>
              </BoxElementsService>
            ))}
          </CardsWrapper>
        </BoxService>

        <BoxProduct>
          <TitleProduct>Produtos Disponíveis</TitleProduct>

          <CardsWrapperProduct>
            {dataProduct?.map((prod) => (
              <BoxElementsProduct key={prod._id}>
                <ImageProduct src={prod.image.url} alt={prod.image.name} />

                <BoxNameProduct>
                  <Name>{prod.name}</Name>
                </BoxNameProduct>

                <BoxInfoProduct>
                  <InfoProduct>
                    <Qtd>Qtd: {prod.counter}</Qtd>
                    <Price>
                      R$ {Number(prod.price).toFixed(2).replace(".", ",")}
                    </Price>
                  </InfoProduct>

                  <CartButton>
                    <span>
                      <FaCartPlus />
                    </span>
                  </CartButton>
                </BoxInfoProduct>
              </BoxElementsProduct>
            ))}
          </CardsWrapperProduct>
        </BoxProduct>
      </Container>

      <main>
        <Footer />
      </main>
    </>
  );
}
