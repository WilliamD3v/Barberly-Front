import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
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
