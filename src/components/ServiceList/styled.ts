import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  border: 1px solid #e1e1e1;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    border-color: #bbb;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }
`;

export const Info = styled.div`
  max-width: 60%;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
    color: #222;
  }

  p {
    color: #555;
    font-size: 0.95rem;
  }
`;

export const Details = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;

  span {
    font-size: 0.9rem;
    color: #666;
  }

  strong {
    font-size: 1.1rem;
    color: #000;
  }
`;

export const Button = styled.button`
  background-color: #198754;
  color: white;
  border: none;
  padding: 0.4rem 0.9rem;
  font-size: 0.9rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #157347;
  }
`;
