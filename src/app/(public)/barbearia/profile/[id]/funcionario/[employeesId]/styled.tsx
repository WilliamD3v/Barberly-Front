import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  width: 100%;
  margin: auto;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export const MainContent = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StepContent = styled.div`
  flex: 1;
`;

export const SideSummary = styled.div`
  width: 300px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SummaryBox = styled.div`
  background: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  font-size: 0.95rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

export const TotalPrice = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.1rem;
  text-align: right;
`;

export const ProceedButton = styled.button`
  margin-top: 1.5rem;
  width: 100%;
  background-color: #198754;
  color: white;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #157347;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;


export const CardCart = styled.div`
  background: #41474e;
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

  @media (max-width: 768px) {
    position: fixed;
    top: auto;
    bottom: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    border-radius: 1rem 1rem 0 0;
  }
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
  background: #585d63;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ElementService = styled.div`
  background: #6b7279;
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
  background: #585d63;
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
  color: #7b8085;
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
  z-index: 10;
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

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
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

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
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


/* Stpe */
export const ContainerStepButton = styled.div`
  position: fixed;
  bottom: 30rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  display: flex;
  justify-content: center;
  gap: 70rem;
  width: 100%;
  max-width: 600px;
  padding: 0 1rem;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 20rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

    display: flex;
    justify-content: center;
    gap: 17rem;
    width: 100%;
    max-width: 600px;
    padding: 0 1rem;
  }
`;

export const StepBack = styled.button`
  font-size: 4rem;
`;
export const StepNext = styled.button`
  font-size: 4rem;
`;

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


/* Tabela de agendamento */

export const ContainerElements = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ContainerTableEmployees = styled.div`
  background-color: #1e293b;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

export const ContainerTitle = styled.div`
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: bold;
  color: #fff;
`;

export const TableEmployees = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
`;

export const DayContainer = styled.div`
  background-color: #0f172a;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #fff;
`;

export const BoxDay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DaysStyled = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

export const DaysNumber = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #38bdf8;
`;

export const ContainerInputDays = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
`;

export const TimeInput = styled.input`
  padding: 0.4rem;
  border: 1px solid #94a3b8;
  border-radius: 0.5rem;
  background-color: #1e293b;
  color: #fff;
  width: 100%;
`;

export const ContainerHoursSelected = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`;

export const TextHours = styled.span`
  font-weight: bold;
  color: #4ade80;
`;

export const ContainerHoursCancel = styled.div`
  margin-top: 0.5rem;
`;

export const ButtonHours = styled.button`
  background-color: #ef4444;
  color: white;
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: 0.2s;
  &:hover {
    background-color: #dc2626;
  }
`;

export const ContainerButton = styled.div`
  margin-top: 0.5rem;
  width: 100%;

  button {
    background-color: #10b981;
    color: white;
    padding: 0.4rem 0.75rem;
    border-radius: 0.5rem;
    width: 100%;
    font-weight: 600;
    transition: 0.2s;
    &:hover {
      background-color: #059669;
    }
  }
`;
