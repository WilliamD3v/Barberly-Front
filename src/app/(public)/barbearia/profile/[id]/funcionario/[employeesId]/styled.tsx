import styled from "styled-components";

export const ContainerElements = styled.div`
  position: relative;
  width: 90%;
  margin: auto;
  border: 4px solid rgb(255, 255, 255);
  margin-top: 10rem;
  padding-bottom: 5rem;
  border-radius: 2rem;
`;

export const CardCart = styled.div`
  background: #41474E;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  position: fixed;
  top: 4rem;
  right: 3rem;
  z-index: 1000;
`;

export const TitleCart = styled.h2`
  font-size: 20px;
  font-weight: bold;
  color: #ffff;
`;

export const ContainerTitleCart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ContainerElementsServices = styled.div`
  background: #585D63;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ElementService = styled.div`
  background: #6B7279;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TitleService = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #ffff;
`;

export const BoxElementNumberService = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  background: #585D63;
  border-radius: 6px;
`;

export const ServiceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #ffff;
`;
export const ButtonRemoveService = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #d43f3f;
  }
`;

export const TotalContainer = styled.div`
  background: #fffbe6;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  border: 2px solid #ffcc00;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const TotalItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #7B8085;
`;

export const IconWrapper = styled.span`
  color: #ffcc00;
  font-size: 18px;
  position: relative;
  bottom: 1px;
`;

export const ButtonAgendar = styled.button`
  background: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #218838;
  }
`;

export const ContainerNullCart = styled.div`
  text-align: center;
  font-size: 18px;
  color: #888;
  padding: 20px;
`;

export const ContainerCart = styled.button`
  position: fixed;
  right: 0;
  top: 0;
  width: 100px;
  max-width: 100%;
  font-size: 30px;
  padding: 20px;
  overflow-y: auto;
`;

export const ConteinrLengthCart = styled.div`
  position: fixed;
  top: 10px;
  right: 5.3rem;
`;

export const TitleLengthCart = styled.h1`
  font-size: 17px;
`;

export const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 2px solid #f1f1f1;
`;

export const CartTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

export const CartButtonClose = styled.button`
  background-color: transparent;
  border: none;
  font-size: 24px;
  color: #888;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #d32f2f;
  }
`;

export const ContainerTitle = styled.div`
  margin-top: 3rem;
  padding: 0 1rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
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

export const EmployeesContainer = styled.div`
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

export const EmployeesCard = styled.div`
  background-color: #2b3137;
  color: #ffff;
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
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }
`;

/* Formulario de Agendamento */
export const ContainerFormEmployees = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const FormEmployees = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: 0.5rem;
  background-color: #2b3137;
  box-shadow: 10px 6px 30px rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 400px;
`;

export const InputFormEmployees = styled.input`
  padding: 12px;
  color: #fff;
  background-color: #3a4147;
  border: 1px solid #555b61;
  border-radius: 0.3rem;
  font-size: 1rem;
  outline: none;
  transition: border 0.3s ease-in-out;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: #b0b3b8;
  }
`;

/* Agendamento de horario */
export const ContainerTableEmployees = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const TableEmployees = styled.div`
  display: flex;
  flex-wrap: wrap; /* Permite que os itens se ajustem em várias linhas, se necessário */
`;

export const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  margin-bottom: 20px;
`;

export const BoxDay = styled.div`
  text-align: center;
  background: #3a4147;
  width: 7rem;
  border-radius: 15px;
`;

export const DaysStyled = styled.div`
  font-weight: bold;
`;

export const DaysNumber = styled.div`
  margin-top: 5px;
`;

export const ContainerInputDays = styled.div`
  margin: 20px;
`;

export const TimeInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 2px solid #0070f3;
  border-radius: 5px;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-color: #f5f5f5;
  color: #333;
`;

export const ContainerHoursSelected = styled.div`
  display: flex;
`

export const TextHours = styled.h1``

export const ContainerHoursCancel = styled.div``

export const ButtonHours = styled.button``

export const ContainerButton = styled.div``;

/* Stpe */
export const ContainerStepButton = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 4rem;
`;
export const StepBack = styled.button``;
export const StepNext = styled.button``;

/* Barra de processo de etapas */
export const ProgressBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  margin: 2rem auto;
  position: relative;
  top: 7rem;
`;

export const ProgressLine = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: #ccc;
  transform: translateY(-50%);
  z-index: 0;
`;

export const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;

export const Step = styled.div<{ active: boolean }>`
  position: relative;
  top: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "green" : "gray")};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
`;

export const StepLabel = styled.div`
  position: relative;
  top: 10px;
  margin-top: 8px;
  font-size: 14px;
  color: white;
`;
