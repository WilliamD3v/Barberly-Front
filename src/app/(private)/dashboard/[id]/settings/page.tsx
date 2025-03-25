"use client";
import { useState } from "react";
import { CloudUpload } from "lucide-react";
import {
  Container,
  Sidebar,
  Button,
  Content,
  PreviewContainer,
  BannerPreview,
  ProfilePreview,
  UploadContainer,
  UploadBox,
  UploadText,
  PreviewBox,
} from "./styled";

export default function SettingsPage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <h2>Configurações</h2>
        <Button>Perfil</Button>
        <Button>Segurança</Button>
        <Button>Notificações</Button>
      </Sidebar>

      <Content>
        <h2>Prévia da Imagem</h2>

        <PreviewBox>
          <PreviewContainer>
            {bannerImage && (
              <BannerPreview src={bannerImage} alt="Banner Preview" />
            )}
            {profileImage && (
              <ProfilePreview src={profileImage} alt="Profile Preview" />
            )}
          </PreviewContainer>
        </PreviewBox>

        <UploadContainer>
          <UploadBox htmlFor="bannerUpload" banner>
            <CloudUpload size={50} color="#007bff" />
            <UploadText>Selecione uma imagem para o banner</UploadText>
          </UploadBox>
          <input
            id="bannerUpload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImageChange(e, setBannerImage)}
          />

          <UploadBox htmlFor="profileUpload">
            <CloudUpload size={50} color="#007bff" />
            <UploadText>Selecione uma imagem para o perfil</UploadText>
          </UploadBox>
          <input
            id="profileUpload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImageChange(e, setProfileImage)}
          />
        </UploadContainer>
      </Content>
    </Container>
  );
}
