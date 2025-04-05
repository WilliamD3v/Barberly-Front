import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #2b3137;
  }
`;

export const ContainerProduts = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5rem;
`;

export const CardContainer = styled.div`
  width: 35rem;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 30px 6px 100px rgba(255, 255, 255, 0.2);
  background-color: transparent;
  font-family: "Arial", sans-serif;

  @media (max-width: 768px) {
    box-shadow: 0px 0px 0px 0px;
  }
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  color: #ffff;
`;

export const BoxPriceCounter = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const FieldWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 8px;
  font-size: 1rem;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
  background-color: #3e4245;
  color: #ffff;

  &::placeholder {
    color: #7b8085;
  }
`;

export const FileInputWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 50%;
  padding: 12px;
  border-radius: 8px;
  background-color: #3e4245;
  cursor: pointer;
  border: 2px dashed #515962;
  text-align: center;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;

  &:active {
    background-color: #d1e0e9;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const CustomFileInput = styled.input`
  display: none;
`;

export const CustomLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #7b8085;
  width: 100%;
  cursor: pointer;
  display: inline-block;
  padding: 8px 15px;
  border-radius: 5px;
  background-color: #363c42;
  transition: 0.3s ease;

  &:hover {
    background-color: #515962;
    color: #828d97;
  }
`;

export const BoxImagePreview = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 13px;
`;

export const ImagePreview = styled.img`
  width: 80%;
  height: 200px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  max-height: 200px;
`;

export const CropContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const CropButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

export const CropperWrapper = styled.div`
  width: 80%;
  max-width: 400px;
  height: 400px;
  position: relative;
`;

export const CropButton = styled.button`
  padding: 10px 16px;
  font-size: 1rem;
  cursor: pointer;
  background-color: #515962;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #515962;
  }
`;

// Button styles
export const Button = styled.button`
  padding: 0px 20px;
  font-size: 1.6rem;
  cursor: pointer;
  background-color: #515962;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #363c42;
  }

  @media (max-width: 768px) {
    padding: 0px 10px;
    font-size: 1.4rem;
  }
`;

// Counter Display
export const CounterContainer = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-bottom: 13px;

  @media (max-width: 768px) {
  }
`;

export const CounterDisplay = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  color: #ffff;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

export const BoxButtonProduts = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 2.3rem;
`;

export const ButtonProduts = styled.button`
  padding: 10px 0px 10px 0px;
  width: 80%;
  border-radius: 10px;
  font-size: 1.3rem;
  background-color: #515962;
  color: #ffff;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #363c42;
  }
`;
