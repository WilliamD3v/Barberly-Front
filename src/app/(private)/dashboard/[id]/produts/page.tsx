"use client";
import axios from "@/lib/axios";
import { useState, useEffect, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "@/service/cropImage";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import {
  CardContainer,
  FieldWrapper,
  Title,
  Input,
  Button,
  FileInputWrapper,
  CustomFileInput,
  ImagePreview,
  CustomLabel,
  ContainerProduts,
  BoxButtonProduts,
  ButtonProduts,
  GlobalStyle,
  BoxImagePreview,
  CropContainer,
  CropButtonContainer,
  CropButton,
  CropperWrapper,
  CounterDisplay,
  CounterContainer,
  BoxPriceCounter,
} from "./styled";

import ButtonBack from "@/components/ButtonBack";
import { getProduct } from "@/hooks/useUsers";
import { ProductProps } from "@/types/products";
import { LoadingBar } from "@/components/LoadingBar";

export default function Products() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const productId = searchParams.get("produt");

  const { data: dataProduct, refetch } = useQuery<ProductProps[]>({
    queryKey: ["Products", id],
    queryFn: () => getProduct(Array.isArray(id) ? id[0] : (id as string)),
  });

  const urlPathname = usePathname();
  const newUrl = urlPathname.replace("/produt", "");

  const [zoom, setZoom] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [counter, setCounter] = useState<number>(0);
  const [image, setImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    if (productId && dataProduct) {
      const selectedProduct = dataProduct.find(
        (prod) => prod._id === productId
      );
      if (selectedProduct) {
        setForm({
          name: selectedProduct.name,
          description: selectedProduct.description,
          price: selectedProduct.price,
        });
        setCounter(selectedProduct.counter);
        setImage(selectedProduct.image?.url || null);
      }
    }
  }, [productId, dataProduct]);

  const formatCurrency = (val: string) => {
    const num = val.replace(/\D/g, "");
    return num ? parseFloat((parseInt(num, 10) / 100).toFixed(2)) : 0;
  };

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? formatCurrency(value) : value,
    }));
  };

  const handleCounter = (operator: string) => {
    setCounter((prev) => {
      if (operator === "+") return prev + 1;
      if (operator === "-" && prev > 0) return prev - 1;
      return prev;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    if (image && croppedAreaPixels) {
      const croppedImageUrl = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImageUrl);
      setShowCropper(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productId && !selectedFile && !croppedImage) {
      console.log("Selecione uma imagem");
      return;
    }

    if (counter === 0) {
      console.log("Informe a quantidade do seu produto!");
      return;
    }

    if (!form.name.trim() || !form.description.trim()) {
      console.log("Informe o nome e a descrição do produto!");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("description", form.description.trim());
    formData.append("price", String(form.price));
    formData.append("counter", String(counter));

    // 🔄 Novo bloco para envio de imagem recortada (ou original)
    let imageToSend: File | null = null;

    if (croppedImage) {
      const res = await fetch(croppedImage);
      const blob = await res.blob();
      imageToSend = new File([blob], selectedFile?.name || "cropped.jpg", {
        type: blob.type,
      });
    } else if (selectedFile) {
      imageToSend = selectedFile;
    }

    if (imageToSend) {
      formData.append("image", imageToSend);
    }

    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 10 : prev));
    }, 300);

    if (!productId) {
      try {
        const response = await axios.post(
          `products/create-products/${id}`,
          formData,
          { timeout: 60000, headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
          console.log("Produto cadastrado com sucesso!");
        }

        await refetch();

        setForm({
          name: "",
          description: "",
          price: 0,
        });
        setCounter(0);
        setSelectedFile(null);
        setCroppedImage(null);
        setImage(null)
      } catch (error) {
        console.log("Erro ao cadastrar produto!", error);
      } finally {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          setProgress(0);
        }, 500);
      }
    } else {
      const selectedProduct = dataProduct?.find(
        (prod) => prod._id === productId
      );

      const hasNoChanges =
        selectedProduct &&
        selectedProduct.name === form.name.trim() &&
        selectedProduct.description === form.description.trim() &&
        selectedProduct.price === form.price &&
        selectedProduct.counter === counter &&
        !selectedFile &&
        !croppedImage;

      if (hasNoChanges) {
        console.log(
          "Nenhum dado foi atualizado. Faça alguma alteração para continuar."
        );
        return;
      }

      try {
        const response = await axios.put(
          `products/updata-product/${productId}`,
          formData,
          { timeout: 60000, headers: { "Content-Type": "multipart/form-data" } }
        );

        if (response.status === 200) {
          console.log("Produto atualizado com sucesso");
        }

        await refetch();
      } catch (error) {
        console.log("Erro ao atualizar o produto!", error);
      } finally {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setLoading(false);
          setProgress(0);
        }, 500);
      }
    }
  };

  return (
    <>
      <ButtonBack url={newUrl} disabledStatus={loading} />
      <ContainerProduts>
        <GlobalStyle />
        <CardContainer>
          <Title>
            {productId ? "Atualizar Produto" : "Adicione seus produtos"}
          </Title>

          <BoxImagePreview>
            {croppedImage ? (
              <ImagePreview src={croppedImage} alt="Imagem recortada" />
            ) : (
              image && <ImagePreview src={image} alt="Imagem selecionada" />
            )}
          </BoxImagePreview>

          <FieldWrapper>
            <FileInputWrapper>
              <CustomFileInput
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <CustomLabel htmlFor="file-upload">
                {image ? "Alterar imagem" : "Selecionar uma imagem"}
              </CustomLabel>
            </FileInputWrapper>
          </FieldWrapper>

          <FieldWrapper>
            <Input
              type="text"
              name="name"
              placeholder="Nome:"
              value={form.name}
              onChange={handleForm}
            />
          </FieldWrapper>

          <FieldWrapper>
            <Input
              type="text"
              name="description"
              placeholder="Descrição:"
              value={form.description}
              onChange={handleForm}
            />
          </FieldWrapper>

          <BoxPriceCounter>
            <FieldWrapper>
              <Input
                type="text"
                name="price"
                id="price"
                value={
                  form.price
                    ? new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(form.price)
                    : "R$ 0,00"
                }
                onChange={handleForm}
                placeholder="R$ 0,00"
              />
            </FieldWrapper>

            <CounterContainer>
              <Button onClick={() => handleCounter("-")}>-</Button>
              <CounterDisplay>{counter}</CounterDisplay>
              <Button onClick={() => handleCounter("+")}>+</Button>
            </CounterContainer>
          </BoxPriceCounter>

          <BoxButtonProduts>
            <ButtonProduts onClick={handleSubmit} disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </ButtonProduts>
          </BoxButtonProduts>
          {loading && <LoadingBar progress={progress} />}
        </CardContainer>
      </ContainerProduts>

      {showCropper && image && (
        <CropContainer>
          <CropperWrapper>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={2.1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </CropperWrapper>

          <CropButtonContainer>
            <CropButton onClick={handleCrop}>Confirmar Recorte</CropButton>
            <CropButton onClick={() => setShowCropper(false)}>
              Cancelar
            </CropButton>
          </CropButtonContainer>
        </CropContainer>
      )}
    </>
  );
}
