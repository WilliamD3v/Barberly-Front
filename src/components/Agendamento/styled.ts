import styled from "styled-components";

export const ContainerElements = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0.4rem;
  }
`;

export const ContainerTableEmployees = styled.div`
  background-color: #1e293b;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    padding: .4rem;
    border-radius: 0.5rem;
  }
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
  gap: 1rem;

  @media (max-width: 768px) {
    display: flex;
    overflow-x: auto;
    gap: .4rem;
    scroll-snap-type: x mandatory;
    padding-bottom: 1rem;
  }
`;

export const DayContainer = styled.div`
  background-color: #0f172a;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  min-width: 160px;

  @media (max-width: 768px) {
    flex-shrink: 0;
    scroll-snap-align: start;
    padding: 0rem;
    min-width: 0;
    background-color: transparent;
  }
`;
export const BoxDay = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const DaysStyled = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  text-align: center;
  display: block;
  min-height: 1.2rem;
  visibility: hidden;

  &::before {
    content: attr(data-full);
    display: inline-block;
    visibility: visible;
    width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;

    &::before {
      content: attr(data-short);
    }
  }
`;

export const DaysNumber = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #38bdf8;
  visibility: hidden;

  &::before {
    content: attr(data-full);
    visibility: visible;
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;

    &::before {
      content: attr(data-short);
    }
  }
`;

export const ContainerInputDays = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    gap: 0.3rem;
  }
`;

export const TimeInput = styled.input`
  padding: 0.4rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #1e293b;
  color: #fff;
  outline: none;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.3rem;
    max-width: 100px;

    &::-webkit-calendar-picker-indicator {
      display: none;
    }
  }
`;

export const ContainerHoursSelected = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const TextHours = styled.span`
  font-weight: bold;
  color: #4ade80;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;

export const ContainerHoursCancel = styled.div`
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    margin-top: 0.1rem;
  }
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

  @media (max-width: 768px) {
    font-size: 0.65rem;
    padding: 0.2rem 0.4rem;
  }
`;

export const ContainerButton = styled.div`
  margin-top: 0.5rem;

  button {
    background-color: #10b981;
    color: white;
    padding: 0.4rem 0.75rem;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: 0.2s;
    width: 2.4rem;

    &:hover {
      background-color: #059669;
    }

    @media (max-width: 768px) {
      font-size: 0.7rem;
      padding: 0.3rem 0.5rem;
    }
  }
`;
