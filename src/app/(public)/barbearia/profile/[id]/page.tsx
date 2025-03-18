"use client";
import { getEmployeesDataAll, getUserData } from "@/hooks/useUsers";
import { Employee } from "@/types/employees";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter, usePathname } from "next/navigation";
import {
  FuncionariosContainer,
  GlobalStyle,
  ServiceItem,
  ServiceListTitle,
  ServiceListWrapper,
  ServiceNull,
  TitleServiceNull,
} from "./styled";
import { UserData } from "@/types/users";

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
          {dataEmployeesAll ?
            dataEmployeesAll?.map((funcionario) => (
              <ServiceItem
              key={funcionario._id}
              onClick={() => abrirModal(funcionario._id)}
            >
              <h3>{funcionario.name}</h3>
              <button>Selecionar</button>
            </ServiceItem>
            )) 
          : (
            <ServiceNull>
              <TitleServiceNull>Nenhum Funcionario Disponivel</TitleServiceNull>
            </ServiceNull>
          )}
        </FuncionariosContainer>
      </ServiceListWrapper>
    </>
  );
}