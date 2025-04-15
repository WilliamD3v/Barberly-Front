// components/styled.ts
import styled from "styled-components";

export const SideSummary = styled.aside`
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 12px;
`;

export const SummaryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
`;

export const TotalPrice = styled.div`
  font-weight: bold;
  font-size: 16px;
  text-align: right;
  margin-top: 1rem;
`;

export const ProceedButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 6px;
  background-color: #0070f3;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  /* Garantir que o hover seja aplicado apenas quando o botão não estiver desabilitado */
  &:not(:disabled):hover {
    background-color: #005bb5;
  }

  /* Estilos para quando o botão estiver desabilitado */
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
