import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #2b3137;
  }
`;

export const PlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  padding: 0 1rem;
  text-align: center;
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

export const ContainerAlertText = styled.div`
  width: 90%;
`;
export const AlertText = styled.div`
  color: "#ff4500";
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const PlanCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const PlanTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const PlanPrice = styled.p`
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
  margin: 0.5rem 0;
`;

export const PlanDescription = styled.p`
  color: #666;
`;

export const SubscribeButton = styled.button`
  background: #0070f3;
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease-in-out;
  margin-top: 1rem;

  &:hover {
    background: #005ecb;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;