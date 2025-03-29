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
  BoxButtonUpload,
  ButtonUpload,
  ContainerPreview,
  TitelPreview,
  BoxConfig,
  TitleConfig,
  ButtonBackConfig,
} from "./styled";
import axios from "@/lib/axios";
import { useParams, usePathname, useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

export default function SettingsPage() {
  const { id } = useParams();
  const router = useRouter()
  const urlPathname = usePathname()

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [files, setFiles] = useState<{ profile?: File; banner?: File }>({});

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "banner"
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      if (type === "profile") {
        setProfileImage(URL.createObjectURL(file));
        setFiles((prev) => ({ ...prev, profile: file }));
      } else {
        setBannerImage(URL.createObjectURL(file));
        setFiles((prev) => ({ ...prev, banner: file }));
      }
    }
  };

  const handleButtonBack = async () => {
    const newUrl = urlPathname.replace("settings", "")
    router.push(newUrl) 
  }

  const handleUpload = async () => {
    if (!files.profile && !files.banner) {
      alert("Selecione pelo menos uma imagem!");
      return;
    }

    const formData = new FormData();
    if (files.profile) formData.append("profile", files.profile);
    if (files.banner) formData.append("banner", files.banner);

    try {
      const response = await axios.post(`upload/upload-image/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Imagens enviadas com sucesso!");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Erro ao enviar as imagens!");
    }
  };

  return (
    <Container>
      {/* Sidebar */}
      <Sidebar>
        <BoxConfig>
          <ButtonBackConfig onClick={handleButtonBack}>
            <IoIosArrowBack />
          </ButtonBackConfig>
          <TitleConfig>Configurações</TitleConfig>
        </BoxConfig>
        <Button>Perfil</Button>
        <Button>Segurança</Button>
        <Button>Notificações</Button>
      </Sidebar>

      <Content>
        <ContainerPreview>
          <TitelPreview>Prévia da Imagem</TitelPreview>
        </ContainerPreview>

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
          <UploadBox htmlFor="bannerUpload">
            <CloudUpload size={50} color="#007bff" />
            <UploadText>Selecione uma imagem para o banner</UploadText>
          </UploadBox>
          <input
            id="bannerUpload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => handleImageChange(e, "banner")}
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
            onChange={(e) => handleImageChange(e, "profile")}
          />
        </UploadContainer>
        <BoxButtonUpload>
          <ButtonUpload onClick={handleUpload}>Enviar Imagens</ButtonUpload>
        </BoxButtonUpload>
      </Content>
    </Container>
  );
}
