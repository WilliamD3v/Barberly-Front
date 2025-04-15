import styled from "styled-components";

export const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  flex-wrap: wrap;
`;

export const Step = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 1;
  min-width: 80px;

  color: ${({ active }) => (active ? "#2c3e50" : "#aaa")};
`;

export const StepNumber = styled.div<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#2c3e50" : "#ccc")};
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
`;

export const StepLabel = styled.span`
  font-size: 0.9rem;
  text-align: center;
  max-width: 80px;
`;

export const Line = styled.div<{ active: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${({ active }) => (active ? "#2c3e50" : "#ccc")};
  margin: 0 1rem;
  min-width: 30px;
`;
