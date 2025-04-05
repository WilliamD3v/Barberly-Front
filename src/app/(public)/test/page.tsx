"use client";
import React from "react";
/* import dynamic from "next/dynamic"; */
import { FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { MapContainer } from "react-leaflet";
import {
  Banner,
  ProfileSection,
  ProfileImage,
  BarbershopName,
  Description,
  ScheduleButton,
  Content,
  SectionTitle,
  ServiceList,
  ServiceItem,
  ProductList,
  ProductItem,
  LocationSection,
  LocationInfo,
  Container,
  Info,
  Section,
  GlobalStyle,
} from "./styled";

/* const Map = dynamic(() => import("@/components/Map")); */

const ProfilePage = () => {
  return (
    <Container>
      <GlobalStyle />

      <Banner
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvpGJoCHaieYXzDdmklCsLv9fqDJSGWZDmNQ&s"
        alt="Banner da Barbearia"
      />
      <ProfileSection>
        <ProfileImage
          src="https://img.freepik.com/vetores-premium/design-de-…de-barbearia-de-luxo_313044-6.jpg?semt=ais_hybrid"
          alt="Imagem da Barbearia"
        />
        <Info>
          <BarbershopName>Barbearia Estilo</BarbershopName>
          <Description>
            Experiência única em cortes e barba com estilo.
          </Description>
          <ScheduleButton>Agendar Horário</ScheduleButton>
        </Info>
      </ProfileSection>
      <Content>
        <Section>
          <SectionTitle>Serviços Populares</SectionTitle>
          <ServiceList>
            <ServiceItem>Corte Clássico</ServiceItem>
            <ServiceItem>Barba Modelada</ServiceItem>
            <ServiceItem>Hidratação Capilar</ServiceItem>
          </ServiceList>
        </Section>
        <Section>
          <SectionTitle>Produtos Disponíveis</SectionTitle>
          <ProductList>
            <ProductItem>Pente de Madeira</ProductItem>
            <ProductItem>Cera Modeladora</ProductItem>
            <ProductItem>Shampoo para Barba</ProductItem>
          </ProductList>
        </Section>
      </Content>
      <LocationSection>
        <SectionTitle>Localização</SectionTitle>
        <LocationInfo>
          <FaMapMarkerAlt /> Rua Exemplo, 123 - Centro, São Paulo - SP
        </LocationInfo>
        <LocationInfo>
          <FaClock /> Segunda a Sábado - 09h às 20h
        </LocationInfo>
        <MapContainer>
{/*           <Map latitude={-23.55052} longitude={-46.633308} /> */}
        </MapContainer>
      </LocationSection>
    </Container>
  );
};

export default ProfilePage;
