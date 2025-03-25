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
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const UploadBox = styled.label<{ banner?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px dashed #ccc;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
  height: ${(props) => (props.banner ? "200px" : "150px")};
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
