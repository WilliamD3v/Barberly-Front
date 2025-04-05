"use client";
import styled from "styled-components";

export const ContainerAddress = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const CardAddress = styled.div`
  display: flex;
  flex-direction: column;
  background: #2b3137;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

export const BoxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  color: #fff;
  margin-bottom: 5px;
  font-size: 14px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background: #fff;
  outline: none;

  &:read-only {
    background: #f2f2f2;
  }
`;

export const BoxButtonAddress = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const ButtonAddress = styled.button`
  font-size: 1.2rem;
  color: #fff;
  padding: 0.8rem;
  width: 100%;
  text-align: center;
  background-color: #00b200;
  border: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: #008f00;
  }
`;
