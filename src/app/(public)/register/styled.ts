import Link from 'next/link';
import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

export const Card = styled.div`
  position: relative;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  background: #ae894d;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ContainerName = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export const StyledTitle = styled.h1`
  font-size: 30px;
  color: #ffffff;
  margin-bottom: 70px;
`;

export const ContainerEmail = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  div {
    width: 100%;
  }
`;

export const CardPassword = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export const StyledInput = styled.input`
  outline: none;
  padding: 0.75rem;
  border: 3px solid #7b6024;
  border-radius: 15px;
  font-size: 1rem;
  background: #d1d1d1;

  &::placeholder {
    color: #7b6024;
  }
`;

export const StyledInputEmail = styled.input`
  outline: none;
  padding: 0.75rem;
  width: 100%;
  border: 3px solid #7b6024;
  border-radius: 15px;
  font-size: 1rem;
  background: #d1d1d1;

  &::placeholder {
    color: #7b6024;
  }
`;

export const CheckboxContainer = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

export const StyledCheckbox = styled.span`
  width: 30px;
  height: 30px;
  border: 3px solid #7b6024;
  background-color: #ccc;
  border-radius: 4px;
  margin-right: 8px;
  display: inline-block;
  position: relative;
  transition: background-color 0.3s ease;

  /* Marca de seleção */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 10px;
    height: 5px;
    border: solid white;
    border-width: 0 2px 2px 0;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
`;

/* Quando o input está marcado, estiliza o checkbox */
export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${HiddenCheckbox}:checked + ${StyledCheckbox} {
    background-color: #4caf50;
  }

  ${HiddenCheckbox}:checked + ${StyledCheckbox}::after {
    opacity: 1;
  }
`;

export const CheckboxLabel = styled.span`
  user-select: none;
  font-size: 23px;
  color: aliceblue;
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledButton = styled.button`
  width: 60%;
  padding: 0.75rem;
  background: #d1d1d1;
  color: #7b6024;
  font-size: 1.8rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background: #946d3d;
    color: #d1d1d1;
  }
`;

export const AlertMessage = styled.p<{ alertType?: "error" | "success" }>`
  font-size: 1rem;
  color: ${(props) => (props.alertType === "error" ? "#d9534f" : "#5cb85c")};
  background: ${(props) =>
    props.alertType === "error" ? "#f2dede" : "#dff0d8"};
  border: ${(props) =>
    props.alertType === "error" ? "1px solid #ebccd1" : "1px solid #d6e9c6"};
  padding: 0.75rem;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 1rem;
`;

export const ContainerRedirect = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
`

export const TextRedirect = styled.h1`
  font-size: 20px;
  color: #FFFFFF;
`

export const StyledLink = styled(Link)`
  color: #5F4305;
`