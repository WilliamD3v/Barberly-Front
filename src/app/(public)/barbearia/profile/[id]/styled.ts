"use client";

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

export const Container = styled.div`
  width: 70%;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

export const BoxElements = styled.div`
  width: 70%;
`;

export const BoxBannerImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

export const BoxElementsProfile = styled.div`
  display: flex;
  align-items: center;
  margin-top: -60px;
  gap: 20px;
  height: 25vh;
  background: white;
  padding: 20px;
  border-radius: 10px;
  background-color: #41474e;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 30vh;
    padding: 10px;
  }
`;

export const BoxProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid #41474e;
  margin-bottom: 6rem;
  object-fit: cover;

  @media (max-width: 768px) {
    position: relative;
    top: 20px;
    width: 110px;
    height: 110px;
  }
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 3rem;

  @media (max-width: 768px) {
    gap: 5px;
  }
`;

export const BarbershopName = styled.h2`
  font-size: 30px;
  margin: 0;
  color: white;
  -webkit-text-stroke: 1px black;
  -webkit-text-fill-color: white;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 20px;
    -webkit-text-stroke: 0px black;
    -webkit-text-fill-color: white;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  color: #bababa;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

export const ScheduleButton = styled.button`
  background: #515962;
  color: white;
  padding: 12px 18px;
  border: none;
  width: 65%;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #363c42;
  }

  &:active {
    box-shadow: 0px 0px 0px 0px;
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 5px;
  }
`;

/* Localização */

export const BoxMap = styled.div`
  margin-top: 40px;
`;

export const BoxTitleLocation = styled.div`
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

export const BoxInfoLocation = styled.div`
  display: flex;
  gap: 10px;
`;

export const BoxIconLocation = styled.div``;

export const BoxElementsTextLocation = styled.div`
  display: flex;
  gap: 10px;

  span {
    color: #bababa;
  }

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

export const TextRoad = styled.h1`
  color: #bababa;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
export const TextNeighborhood = styled.h1`
  color: #bababa;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
export const TextCity = styled.h1`
  color: #bababa;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
export const TextNumber = styled.h1`
  color: #bababa;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const TitleLocation = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap");
  font-size: 30px;
  font-family: "Crimson Text", serif;
  font-weight: 400;
  font-style: normal;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

/* Serviços */
export const BoxService = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    padding: 10px 0;
  }
`;

export const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

export const TextService = styled.h2`
  @import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap");
  font-family: "Crimson Text", serif;
  font-size: 30px;
  font-weight: 400;
  font-style: normal;
  color: white;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

export const BoxElementsService = styled.div`
  background-color: #3a4046;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 250px;
`;

export const BoxName = styled.div`
  padding: 8px 12px;
  background-color: #4b535a;
  border-radius: 6px;
  color: white;
`;

export const TitleName = styled.h3`
  font-size: 1.1rem;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const BoxElemetService = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const BoxBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #656c74;
  padding: 10px 12px;
  border-radius: 10px;
`;

export const InfoGroup = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-size: 0.9rem;
  gap: 6px;

  svg {
    color: gold;
    font-size: 1rem;
  }
`;

export const CalendarButton = styled.button`
  background-color: #4b535a;
  padding: 6px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  width: 30px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

  svg {
    color: white;
    font-size: 1.1rem;
  }

  &:hover {
    outline: 2px solid #1da1f2;
  }

  @media (max-width: 768px) {
  }
`;

/* Produtos */
export const BoxProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 1.5rem;
`;

export const TitleProduct = styled.h1`
  @import url("https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap");
  font-family: "Crimson Text", serif;
  font-size: 30px;
  font-weight: 400;
  font-style: normal;
  margin-bottom: 10px;
`;

export const CardsWrapperProduct = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

export const BoxElementsProduct = styled.div`
  width: 100%;
  background-color: #3a3f45;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: auto;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

export const ImageProduct = styled.img`
  background-color: #555b63;
  width: 100%;
  height: 150px;
  border-radius: 10px;
  margin-bottom: 10px;
  object-fit: cover;
`;


export const BoxNameProduct = styled.div`
  overflow: hidden;
  margin-bottom: 8px;
`;

export const BoxInfoProduct = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const InfoProduct = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.span`
  font-weight: bold;
`;

export const Qtd = styled.span`
  font-size: 12px;
  color: #cfcfcf;
`;

export const Price = styled.span`
  font-size: 14px;
`;

export const CartButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  background-color: #4b535a;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
`;

/* Mapa */
export const ContainerMap = styled.div`
  width: 100%;
`;
