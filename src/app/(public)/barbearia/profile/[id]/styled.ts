import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #2b3137;
    font-family: Arial, sans-serif;
    color: #fff;
    margin: 0;
    padding: 0;
  }
`;

export const ServiceListWrapper = styled.div`
  margin-top: 3rem;
  padding: 0 1rem;
  text-align: center;
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

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

export const FuncionariosContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 20px;
  justify-content: center;
`;

export const ServiceItem = styled.div`
  background: #2B3137;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 1px 1px 40px rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
  width: 200px;

  &:hover {
    transform: translateY(-5px);
  }

  &.selected {
    background-color: #007bff;
    color: #fff;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 12px;
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const ServiceNull = styled.div``
export const TitleServiceNull = styled.h1``

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: #2B3137;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  padding: 24px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;

  h2 {
    font-size: 1.75rem;
    margin-bottom: 16px;
  }

  section {
    text-align: left;
    margin-bottom: 16px;

    h3 {
      font-size: 1.25rem;
      color: #333;
      margin-bottom: 8px;
    }

    ul {
      padding-left: 20px;
      list-style: disc;
    }

    li {
      font-size: 1rem;
      margin-bottom: 8px;
      color: #555;

      strong {
        color: #222;
      }
    }
  }

  button {
    margin-top: 16px;
    padding: 12px 24px;
    background: #007bff;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }

    &:not(:last-child) {
      margin-right: 8px;
    }
  }
`;

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

