import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #2B3137;
  } 
`;

export const Container = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

export const Banner = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
`;

export const ProfileSection = styled.div`
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
`;

export const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid #41474e;
  margin-bottom: 6rem;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 3rem;
`;

export const BoxNameDescription = styled.div``;

export const BarbershopName = styled.h2`
  font-size: 30px;
  margin: 0;
  color: white;
  -webkit-text-stroke: 1px black;
  -webkit-text-fill-color: white;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5); /* Suaviza e dá um efeito 3D */
`;

export const Description = styled.p`
  font-size: 16px;
  color: #bababa;
`;

export const BoxScheduleButton = styled.div``;

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
    background: #363C42;
  }

  &:active {
    box-shadow: 0px 0px 0px 0px;
    transform: scale(0.95);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const Section = styled.div`
  flex: 1;
  min-width: 280px;
`;

export const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: #FFFFFF;
`;

export const ServiceList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ServiceItem = styled.li`
  background: #f5f5f5;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

export const ProductList = styled(ServiceList)``;
export const ProductItem = styled(ServiceItem)``;

export const LocationSection = styled(Section)`
  margin-top: 20px;
`;

export const LocationInfo = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #555;
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 300px;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
`;
