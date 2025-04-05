"use client";
import axios from "@/lib/axios";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import {
  ContainerAddress,
  CardAddress,
  BoxGrid,
  Label,
  Input,
  BoxButtonAddress,
  ButtonAddress,
} from "./styled";

export default function AddressForm() {
  const { id } = useParams();
  const router = useRouter();
  const urlPathname = usePathname();

  const [formData, setFormData] = useState({
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    zipcode: "",
  });

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "zipcode" && value.length === 8) {
      try {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${value}/json/`
        );
        if (!data.erro) {
          setFormData((prev) => ({ ...prev, city: data.localidade }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `address/register-address/${id}`,
        formData
      );

      if (response.status === 200) {
        const newUrl = urlPathname.replace("/address", "");
        router.push(newUrl);
      }
    } catch (error) {
      console.log("error ao registar endereço", error);
    }
  };

  return (
    <ContainerAddress>
      <CardAddress>
        <BoxGrid>
          <div>
            <Label htmlFor="street">Rua</Label>
            <Input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Digite sua rua"
            />
          </div>
          <div>
            <Label htmlFor="number">Número</Label>
            <Input
              type="text"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              placeholder="Número"
            />
          </div>
        </BoxGrid>

        <div>
          <Label htmlFor="neighborhood">Bairro</Label>
          <Input
            type="text"
            id="neighborhood"
            name="neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            placeholder="Bairro"
          />
        </div>

        <BoxGrid>
          <div>
            <Label htmlFor="city">Cidade</Label>
            <Input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              placeholder="Cidade"
              readOnly
            />
          </div>
          <div>
            <Label htmlFor="zipcode">CEP</Label>
            <Input
              type="text"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
              placeholder="CEP"
              maxLength={8}
            />
          </div>
        </BoxGrid>

        <BoxButtonAddress>
          <ButtonAddress onClick={handleSubmit}>Enviar</ButtonAddress>
        </BoxButtonAddress>
      </CardAddress>
    </ContainerAddress>
  );
}
