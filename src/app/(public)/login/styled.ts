"use client";
import Link from "next/link";
import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: #2b3137;
  }
`;

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Card = styled.div`
  position: relative;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  background: transparent;
  border-radius: 8px;
  box-shadow: 1px 2px 35px rgba(255, 255, 255, 0.8);

  @media (max-width: 768px) {
    background-color: transparent;
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    width: 100%;
  }
`;

export const ContainerName = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`;

export const StyledTitle = styled.h1`
  font-size: 30px;
  color: #ffffff;
  margin-bottom: 10px;
`;

export const ContainerNames = styled.div`
  display: flex;
  flex-direction: column;

  div {
    width: 100%;
  }
`;

export const StyledInput = styled.input`
  outline: none;
  padding: 0.75rem;
  width: 100%;
  border-radius: 15px;
  font-size: 1rem;
  background: #3E4245;
  margin-bottom: 1.5rem;
  color: #ffff;

  &::placeholder {
    color: #7B8085;
  }
`;

export const StyledInputEmail = styled.input`
  outline: none;
  padding: 0.75rem;
  width: 100%;
  border-radius: 15px;
  font-size: 1rem;
  background: #3E4245;

  &::placeholder {
    color: #7B8085;
  }
`;

export const CardInputPassword = styled.div`
  outline: none;
  padding: 0.75rem;
  width: 100%;
  border-radius: 15px;
  font-size: 1rem;
  background: #3E4245;
  margin-bottom: 1.5rem;
`;

export const InputPassword = styled.input`
  background: #3E4245;
  width: 90%;
  outline: none;
  font-size: 1rem;
  color: #ffff;

  &::placeholder {
    color: #7B8085;
  }
`;

export const ButtonViewPassword = styled.button`
  position: relative;
  top: 2px;
  font-size: 30px;
  color: #ffff;

  @media (max-width: 768px) {
    font-size: 25px;
  }
`;

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const StyledButton = styled.button`
  width: 60%;
  padding: 0.75rem;
  margin-bottom: 20px;
  background: #3E4245;
  color: #ffff;
  font-size: 1.8rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background: #1E2428;
    color: #d1d1d1;
  }
`;

export const ContainerRedirect = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    
  }
`;

export const TextRedirect = styled.h1`
  font-size: 20px;
  color: #ffffff;

  @media (max-width: 768px) {
  font-size: 16px;
  }
`;

export const StyledLink = styled(Link)`
  color: #7B8085;
`;

export const ContainerRedirectRecover = styled.div`
  display: flex;
`;

export const TextRedirectRecover = styled.h1`
  position: relative;
  left: 20px;
  bottom: 0.8rem;
  font-size: 15px;
  color: #ffffff;
`;

export const StyledLinkRecover = styled.button`
  color: #7B8085;
`;
