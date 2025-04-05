import styled, { keyframes } from "styled-components";

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

// Estilos para o Dashboard
export const DashboardContainer = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 20px;
`;

export const TooltipContainer = styled.div`
  position: relative;
  background: white;
  color: #000;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  top: 3rem;
  left: 4rem;
  transform: translateX(-50%);
  z-index: 10;
  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.3s ease-in-out,
    visibility 0.3s ease-in-out;
`;

export const StatusContainer = styled.div`
  display: flex;
  align-items: center;
`;

// Bolinha com a cor verde ou vermelha
export const StatusDot = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "primary",
})<{ primary?: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${({ primary }) => (primary ? "green" : "red")};
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
`;

export const BoxStatusAcconts = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const StatusAccontsStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "primary",
})<{ primary?: boolean }>`
  background: ${({ primary }) => (primary ? "green" : "red")};
  padding: 0.4rem;
  border-radius: 100%;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &:hover ${TooltipContainer} {
    visibility: visible;
    opacity: 1;
  }
`;

export const Header = styled.header`
  background-color: #343a40;
  color: #fff;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
`;

export const Title = styled.h1`
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const ContainerButtonHeaderDashboard = styled.button`
  font-size: 40px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 10;

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

export const ContainerButtonHeaderBackMenu = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.3s ease;
  z-index: 10;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    left: 0;
    top: 1rem;
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

  &.scale-out-back {
    font-size: 4.5rem;
    animation: ${scaleOut} 0.3s forwards;

    @media (max-width: 768px) {
      font-size: 5rem;
    }
  }
`;

export const ContainerButtonsMenu = styled.div`
  display: flex;
  transition: opacity 0.3s ease;
  opacity: 0;
  transform: translateX(100%);
  animation: ${slideIn} 0.5s forwards;

  @media (max-width: 768px) {
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    width: 80%;
    height: 100vh;
    background-color: #343a40;
    border-radius: 0px 10px 10px 0px;
  }

  &.visible {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const ContainerInfosProfile = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    margin-top: 5rem;
  }
`;

export const BoxImageProfile = styled.div`
  position: relative;
  margin-top: 1rem;
  left: 1rem;
`;

export const BoxImageProduct = styled.div`
  align-items: center;

  .image-product {
    width: 100%;
    height: 127px;
    border-radius: 8px;
    object-fit: contain;
    object-position: center;
    max-height: 200px;
    margin-bottom: 20px;
  }
`;

export const BoxProductItem = styled.div`
  margin-bottom: 5px;
`;

export const BoxButtonUpdel = styled.div`
  display: flex;
  gap: 10px;
  justify-content: end;
`;

export const ButtonUpdateProduct = styled.button`
  font-size: 1.8rem;
  color: #6b7279;
`;
export const ButtonDeleteProduct = styled.button`
  font-size: 1.8rem;
  color: #ba3f3f;
`;

export const BoxTitleMenu = styled.div`
  position: relative;
  margin-top: 1.2rem;
  left: 2rem;
`;

export const TitleMenu = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const BoxHr = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

export const Hr = styled.hr`
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 80%;
  }
`;

export const BoxButtonLinksHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  left: 2rem;
`;

export const BoxIconsButtonsHeader = styled.div``;

export const IconsHeader = styled.div`
  display: none;
  font-size: 1.3rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const Button = styled.button`
  color: #fff;
  margin-left: 15px;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    color: red;
  }

  @media (max-width: 768px) {
    position: relative;
    font-size: 19px;
    width: 100%;
    left: 1rem;
    margin-left: 0;
    text-align: justify;
  }
`;

export const BoxDescriptionCounter = styled.div`
  display: flex;
  width: 100%;
`;

export const Content = styled.main`
  margin-top: 30px;
`;

export const BoxElementsResume = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ContainerResumeAndUrl = styled.main`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
  }
`;

export const CopyButton = styled.button`
  margin-bottom: 10px;
  padding: 4px 8px;
  background-color: #343a40;
  width: 50%;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: 0.3s;

  &:hover {
    background-color: #696969;
  }

  @media (max-width: 768px) {
    width: 30%;
    font-size: 12px;
  }
`;

export const StyledLink = styled.a`
  font-size: 1rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const SummaryCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

export const CardItem = styled.div`
  text-align: center;
  font-size: 18px;
  color: #343a40;
`;

export const CardLabel = styled.p`
  font-size: 14px;
  color: #6c757d;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const ServiceList = styled.ul`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(280px, 1fr)
  ); // aumentei pra 280px pra garantir quebra antes
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
`;

export const ServiceItem = styled.li`
  background-color: #fff;
  width: 100%; // <- aqui é o ponto chave
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  font-size: 16px;
  box-sizing: border-box;
`;

export const ServiceTitle = styled.h3`
  font-size: 18px;
  color: #343a40;
  margin-bottom: 5px;
`;

export const ServiceDescription = styled.p`
  font-size: 14px;
  color: #6c757d;
`;

export const BoxClosed = styled.div`
  margin-top: 20px;
`;

export const ButtonClosed = styled.button`
  font-size: 20px;
  padding: 5px 20px 5px 20px;
  border-radius: 10px;
  background: #ff0000;
  color: #ffff;
`;
