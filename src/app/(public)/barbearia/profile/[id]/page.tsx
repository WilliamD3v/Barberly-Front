"use client";
import {
  getAddress,
  getEmployeesDataAll,
  /*   getImageProfileData, */
  getUserData,
} from "@/hooks/useUsers";
import { Employee } from "@/types/employees";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, usePathname } from "next/navigation";
import {
  BoxElementsCityNeighborhood,
  BoxElementsStreetNumber,
  ContainerMap,
  FuncionariosContainer,
  GlobalStyle,
  ServiceItem,
  ServiceListTitle,
  ServiceListWrapper,
  ServiceNull,
  TitleServiceNull,
} from "./styled";
import { UserData } from "@/types/users";
/* import { ImagensProfilesProps } from "@/types/imagesProfiles"; */
import Map from "@/components/Map";
import { AddressProps } from "@/types/address";
import { useEffect, useState } from "react";

export default function Agendamento() {
  const { id } = useParams();
  const router = useRouter();
  const Pathname = usePathname();

  const { data: dataUser } = useQuery<UserData>({
    queryKey: ["user", id],
    queryFn: () => getUserData(Array.isArray(id) ? id[0] : (id as string)),
  });

  const { data: dataEmployeesAll } = useQuery<Employee[]>({
    queryKey: ["Employees", id],
    queryFn: () =>
      getEmployeesDataAll(Array.isArray(id) ? id[0] : (id as string)),
  });

  /*   const { data: dataImageProfile } = useQuery<ImagensProfilesProps[]>({
    queryKey: ["ImageProfile", id],
    queryFn: () =>
      getImageProfileData(Array.isArray(id) ? id[0] : (id as string)),
  }); */

  const { data: dataAddress } = useQuery<AddressProps[]>({
    queryKey: ["Address", id],
    queryFn: () => getAddress(Array.isArray(id) ? id[0] : (id as string)),
  });

  const [address, setAddress] = useState<string>("");

  // Usar useEffect para atualizar o estado quando dataAddress mudar
  useEffect(() => {
    if (dataAddress && dataAddress.length > 0) {
      const addressBarber = `${dataAddress[0].street}, ${dataAddress[0].number}, ${dataAddress[0].neighborhood}, ${dataAddress[0].zipcode}`;
      setAddress(addressBarber);
    }
  }, [dataAddress]); // O efeito depende de dataAddress

  // Função para abrir o modal
  const abrirModal = (userId: string): void => {
    router.push(`${Pathname}/funcionario/${userId}`);
  };

  return (
    <>
      <GlobalStyle />

      <ServiceListWrapper>
        <ServiceListTitle>Barbearia: {dataUser?.name}</ServiceListTitle>
        <FuncionariosContainer>
          {dataEmployeesAll ? (
            dataEmployeesAll?.map((funcionario) => (
              <ServiceItem
                key={funcionario._id}
                onClick={() => abrirModal(funcionario._id)}
              >
                <h3>{funcionario.name}</h3>
                <button>Selecionar</button>
              </ServiceItem>
            ))
          ) : (
            <ServiceNull>
              <TitleServiceNull>Nenhum Funcionario Disponivel</TitleServiceNull>
            </ServiceNull>
          )}
        </FuncionariosContainer>
      </ServiceListWrapper>

      <ContainerMap>
        <h1>Mapa da Localização</h1>
        {dataAddress?.map((address) => (
          <div key={address._id}>
            <BoxElementsStreetNumber>
              <h1>{address.street}</h1>
              <samp>{","}</samp>
              <h1>{address.number}</h1>
            </BoxElementsStreetNumber>

            <BoxElementsCityNeighborhood>
              <h1>{address.city}</h1>
              <samp>{"-"}</samp>
              <h1>{address.neighborhood}</h1>
            </BoxElementsCityNeighborhood>
          </div>
        ))}
        <Map address={address} />
      </ContainerMap>
    </>
  );
}
