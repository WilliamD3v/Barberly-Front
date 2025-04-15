'use client'

import styled from "styled-components";

export const Header = styled.div`
  text-align: center;
  margin-bottom: 50px;
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #4a5568;
  margin-top: 8px;
`;

export const PageWrapper = styled.div`
  background: linear-gradient(135deg, #f4f7fc, #e2effb);
  padding: 50px 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2.6rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-family: "Montserrat", sans-serif;

  &::after {
    content: "";
    display: block;
    width: 50%;
    border-radius: 50px;
    height: 4px;
    background-color: #28a745;
    margin: 10px auto 0;
  }
`;

export const EmployeeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 30px;
  max-width: 1200px;
  width: 100%;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }
`;

export const CardContent = styled.div`
  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #34495e;
    margin-bottom: 10px;
  }
`;

export const SelectBtn = styled.button`
  padding: 10px 20px;
  font-size: 0.95rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  background-color: #2980b9;
  color: #fff;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #3498db;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const FloatingCard = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 16px;
  width: 90%;
  max-width: 650px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 20px;
  }
`;

export const ScheduleSection = styled.div`
  margin-bottom: 20px;
  p {
    margin: 4px 0;
    color: #444;
    font-size: 1rem;
  }

  strong {
    font-size: 1.2rem;
    color: #111;
    margin-bottom: 8px;
    display: block;
  }
`;

export const CloseButton = styled.button`
  margin-top: 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

export const MessageWrapper = styled.div`
  text-align: center;
  margin-top: 80px;
  color: #888;
  font-size: 1.3rem;

  svg {
    margin-bottom: 15px;
  }

  p {
    margin: 0;
  }
`;
