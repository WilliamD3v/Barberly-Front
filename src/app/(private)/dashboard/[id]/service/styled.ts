"use client";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #2b3137;
  }
`;

export const ContainerTitle = styled.div`
  position: relative;
  top: 20px;
  text-align: center;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;

  &::after {
    content: "";
    display: block;
    width: 50%;
    height: 3px;
    background-color: #28a745;
    position: absolute;
    bottom: 0;
    left: 25%;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ContainerGeral = styled.div`
  margin: 5em;

  @media (max-width: 768px) {
    position: relative;
    margin: 0;
  }
`;

// Container principal para a lista de serviços
export const ServiceListWrapper = styled.div`
  margin-top: 3rem;
  padding: 0 1rem;
  text-align: center;
`;

// Estilo para o título <h2>
export const ServiceListTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;

  &::after {
    content: "";
    display: block;
    width: 50%;
    height: 3px;
    background-color: #28a745;
    position: absolute;
    bottom: 0;
    left: 25%;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Container que envolve todos os cards de serviço, centralizando o conteúdo
export const ServiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #2b3137;
  border-radius: 12px;
  box-shadow: 30px 6px 100px rgba(255, 255, 255, 0.2);
`;

// Estilo dos cards de serviço
export const ServiceItem = styled.div`
  background-color: #2b3137;
  color: #ffffff;
  padding: 1.5rem;
  width: 280px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease-in-out,
    box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 30px 6px 100px rgba(255, 255, 255, 0.1);
  }

  h3 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    font-weight: 700;
    color: #ffffff;
  }

  .price {
    font-size: 1.2rem;
    color: #28a745;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .duration {
    font-size: 1rem;
    color: #6c757d;
    margin-top: 0.5rem;
  }

  p {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
`;

export const BoxServiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BoxLoadingBar = styled.div`
  position: relative;
  top: 30px;
`;

export const BoxElements = styled.div``;

export const BoxButtonDeleteService = styled.div`
  position: relative;
  top: 5px;
`;

export const ButtonDeleteService = styled.button`
  font-size: 2rem;
  color: #ba3f3f;
`;

export const Alert = styled.p<{ $isSuccess: boolean }>`
  margin-top: 10px;
  color: ${(props) => (props.$isSuccess ? "#28a745" : "#e74c3c")};
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const FormContainerWrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 2rem;
  background-color: #2b3137;
  border-radius: 10px;
  border: 2px solid #4f5051;
  box-shadow: 30px 6px 100px rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease-in-out;

  /* Ajuste para tablets e telas médias */
  @media (max-width: 768px) {
    width: 100%;
    border: 0px;
    box-shadow: 0px 0px 0px 0px;
  }

  /* Ajuste para desktops */
  @media (min-width: 1024px) {
    width: 40%; /* Configuração para telas maiores */
  }

  /* Ajuste para telas ultra grandes */
  @media (min-width: 1440px) {
    width: 30%; /* Mantém o design em telas muito grandes */
  }
`;

export const ContainerForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Input = styled.input`
  padding: 0.8rem 1.2rem;
  font-size: 1.1rem;
  border: 1px solid #3e4245;
  background: #3e4245;
  color: #fff;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: #fff;
  }

  &:hover {
    border-color: #28a745;
  }
`;

export const ContainerButton = styled.div`
  margin-top: 2rem;
  margin-bottom: 0.3rem;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  padding: 0.9rem 2.5rem;
  width: 100%;
  font-size: 1.1rem;
  background-color: #28a745;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease-in-out;

  &:hover {
    background-color: #218838;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;
