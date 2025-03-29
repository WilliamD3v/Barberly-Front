"use client";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Sidebar = styled.div`
  width: 250px;
  background: #2c3e50;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const BoxConfig = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`

export const ButtonBackConfig = styled.button`
  font-size: 2rem;
`

export const TitleConfig = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
`

export const ContainerPreview = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  right: 10rem;
`

export const TitelPreview = styled.h1`
  font-weight: 600;
  font-size: 1.3rem;
`

export const Button = styled.button`
  background: none;
  border: none;
  color: white;
  padding: 10px;
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  margin: 10px 0;
  &:hover {
    background: #34495e;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
`;

export const BoxButtonUpload = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  top: 2rem;
`
export const ButtonUpload = styled.button`
  color: #ffff;
  padding: 1rem;
  border-radius: .5rem;
  background-color: #3E4245;
  transition: .3s;

  &:hover {
    background-color: #1E2428;
  }
`

export const PreviewBox = styled.div`
  display: flex;
  justify-content: center;
`

export const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 250px;
  border-radius: 0.6rem;
  border: 2px solid #ccc;
  margin-bottom: 20px;
`;

export const BannerPreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.6rem;
`;

export const ProfilePreview = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  bottom: -50px;
  left: 20px;
  border: 3px solid white;
  background: white;
`;

export const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 4rem;
`;

export const UploadBox = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  height: 200px;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover {
    border-color: #007bff;
  }
`;

export const UploadText = styled.p`
  color: #555;
  font-size: 14px;
  margin-top: 10px;
`;
