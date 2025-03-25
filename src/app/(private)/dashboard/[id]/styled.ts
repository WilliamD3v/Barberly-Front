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

export const ContainerButtonsMenu = styled.div`
  display: flex;
  transition: opacity 0.3s ease;
  opacity: 0;
  transform: translateX(100%);
  animation: ${slideIn} 0.5s forwards;

  @media (max-width: 768px) {
    flex-direction: column;
    position: absolute;
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

export const Button = styled.button`
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
  list-style-type: none;
  padding: 0;
`;

export const ServiceItem = styled.li`
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  font-size: 16px;
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
