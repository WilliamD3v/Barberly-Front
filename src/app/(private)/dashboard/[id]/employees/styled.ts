import styled from "styled-components";

// Container principal para a página de formulário
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 1rem;
`;

// Título principal
export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 2rem;
  position: relative;
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
    font-size: 1.2rem;
  }
`;

// Formulário
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 800px;
  width: 100%;
  padding: 2rem;
  background-color: #2b3137;
  border-radius: 10px;
  box-shadow: 10px 6px 100px rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    background-color: transparent;
    box-shadow: 0px 0px 0px 0px;
    padding: 0;
  }
`;

export const ContainerInput = styled.div`
  display: grid;
  margin-top: 20px;

  @media (max-width: 768px) {
    margin-top: 0px;
  }
`;

export const TextName = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  position: relative;
  left: 10px;
  margin-bottom: 0.1rem;

  @media (max-width: 768px) {
  }
`;

export const CardInput = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const ContainerHours = styled.div``;

export const TitleHours = styled.h1`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  position: relative;
  left: 10px;
  margin-bottom: 1rem;
`;

export const ContainerHoursButtons = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ButtonHours = styled.button`
  padding: 10px;
  background-color: #3e4245;
  color: #fff;
  border-radius: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export const ContainerSpamHours = styled.div`
  display: flex;
  justify-content: space-around;
  position: relative;
  right: 35px;
`;

export const Spam = styled.samp`
  color: #fff;
`;

// Label para os campos de formulário
export const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  position: relative;
  left: 10px;
  margin-bottom: 1rem;
`;

// Estilo do campo de input
export const Input = styled.input`
  padding: 0.8rem 1.2rem;
  font-size: 1.1rem;
  border: 1px solid #6c757d;
  background-color: #3e4245;
  color: #ffff;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }

  &::placeholder {
    color: #7b8085;
  }

  &:hover {
    border-color: #7b8085;
  }
`;

export const TimeInput = styled.input`
  color: #ffff;
  padding: 0.8rem 1.2rem;
  font-size: 1.1rem;
  border: 1px solid #6c757d;
  background-color: #3e4245;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;
`;

// Container para os checkboxes
export const ContainerSelectdHours = styled.div`
  padding: 20px;
  background-color: #3e4245;
  display: flex;
  flex-direction: column;
  gap: 1px;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
`;

export const BoxModHoursText = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const ModHoursText = styled.legend`
  font-size: 20px;
  color: #ffff;
  font-weight: 700;
`;

export const ModHoursIcon = styled.span<{ mode: string }>`
  position: relative;
  font-size: 20px;
  color: ${({ mode }) =>
    mode === "semIntervalo" ? "#28A745" : mode === "comIntervalo" ? "#C5DE35" : "#9E1E1E"};
`;

export const CheckboxContainer = styled.fieldset`
  display: flex;
  justify-content: center;
  padding: 0;
  border: none;
  margin-bottom: 20px;
  width: 100%;
  align-items: center;
  flex-wrap: nowrap;
  overflow: hidden;

  legend {
    font-size: 1.2rem;
    color: #ffffff;
    font-weight: 600;
    position: relative;
    white-space: nowrap;
  }
`;

export const CheckboxLabel = styled.label<{ dia: string }>`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  text-align: center;
  gap: 8px;
  font-size: 16px;
  margin: 0 12px;
  margin-top: 20px;

  &::after {
    content: "${(props) => props.dia}";
    margin-bottom: 4px;
    color: #ffff;
    background-color: #28a745;
    padding: 0px 5px 0px 5px;
    border-radius: 5px;
  }

  @media (max-width: 600px) {
    &::after {
      content: "${(props) => props.dia.charAt(0)}";
      font-size: 20px;
    }
  }
`;

/* Você marcou ${dia} como "Sem Intervalo", mas não selecionou esse modo. */
/* Preencha os horários de ${dia} (Sem Intervalo). */

export const BoxInputEmployees = styled.input.attrs({ type: "checkbox" })<{
  modo: "semIntervalo" | "comIntervalo" | "meioPeriodo";
}>`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  display: inline-block;
  background-color: transparent;

  &:checked {
    border-color: #ffffff;
    background-color: ${({ modo }) =>
      modo === "semIntervalo"
        ? "#28A745"
        : modo === "comIntervalo"
          ? "#C5DE35"
          : "#9E1E1E"};
  }

  &:checked::after {
    content: "🗸";
    font-size: 20px;
    color: ${({ modo }) =>
      modo === "semIntervalo"
        ? "#ffff"
        : modo === "comIntervalo"
          ? "#1E3A8A"
          : "#fff"};
    position: absolute;
    font-weight: 900;
    top: -5px;
    left: 1px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Estilo do botão
export const Button = styled.button`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
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

/* Lista de Funcionarios */
export const ContainerListEmployees = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: 5rem;
  width: 100%;
`;

export const CardListEmployees = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  background-color: #41474e;
  padding: 2rem;
  margin: 0 auto;
  max-width: 1200px;
  border-radius: 10px;
`;

export const BoxListEmployees = styled.div`
  width: 10rem;
  background-color: #515962;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NameEmployees = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 20px;
`;

export const ContainerButtonEmployees = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 10px;
`;

export const ButtonEmployees = styled.button`
  font-size: 18px;
  color: #ffff;
  background-color: #ff2d2d;
  padding: 5px 15px;
  border-radius: 5px;
  transition: 0.3s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ca0d0d;
  }
`;
