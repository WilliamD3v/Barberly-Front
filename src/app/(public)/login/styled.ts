"use client"
import Link from 'next/link';
import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

export const Card = styled.div`
  position: relative;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  background: #ae894d;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  border: 3px solid #7b6024;
  border-radius: 15px;
  font-size: 1rem;
  background: #d1d1d1;
  margin-bottom: 1.5rem;

  &::placeholder {
    color: #7b6024;
  }
`;

export const StyledInputEmail = styled.input`
  outline: none;
  padding: 0.75rem;
  width: 100%;
  border: 3px solid #7b6024;
  border-radius: 15px;
  font-size: 1rem;
  background: #d1d1d1;

  &::placeholder {
    color: #7b6024;
  }
`;

export const CardInputPassword = styled.div`
  outline: none;
  padding: 0.75rem;
  width: 100%;
  border: 3px solid #7b6024;
  border-radius: 15px;
  font-size: 1rem;
  background: #d1d1d1;
  margin-bottom: 1.5rem;
`

export const InputPassword = styled.input`
  background: transparent;
  width: 90%;
  outline: none;
  font-size: 1rem;

  &::placeholder {
    color: #7b6024;
  }
`

export const ButtonViewPassword = styled.button`
  position: relative;
  top: 2px;
  font-size: 30px;
`

export const ContainerButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

export const StyledButton = styled.button`
  width: 60%;
  padding: 0.75rem;
  margin-bottom: 20px;
  background: #d1d1d1;
  color: #7b6024;
  font-size: 1.8rem;
  font-weight: bold;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background: #946d3d;
    color: #d1d1d1;
  }
`;

export const ContainerRedirect = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
`

export const TextRedirect = styled.h1`
  font-size: 20px;
  color: #FFFFFF;
`

export const StyledLink = styled(Link)`
  color: #5F4305;
`
export const ContainerRedirectRecover = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 30px;
  margin-bottom: 30px;
`

export const TextRedirectRecover = styled.h1`
  font-size: 20px;
  color: #FFFFFF;
`

export const StyledLinkRecover = styled(Link)`
  color: #5F4305;
`