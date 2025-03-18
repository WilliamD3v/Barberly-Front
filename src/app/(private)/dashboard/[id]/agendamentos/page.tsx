"use client";

import { getEmployeesDataAll, getSchedulingDataAll } from "@/hooks/useUsers";
import { Scheduling } from "@/types/scheduling";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  Section,
  SectionTitle,
  Table,
  TableHead,
  TableRow,
  TableCell,
  BoxTableCell,
  BoxButtonTableCell,
  ButtonTableCellFalse,
  ButtonTableCellTrue,
} from "./styled";
import axios from "@/lib/axios";
import { Employee } from "@/types/employees";

export default function ReservasPage() {
  const { id } = useParams();

  const { data: allScheduling, refetch } = useQuery<Scheduling[]>({
    queryKey: ["AllScheduling", id],
    queryFn: () =>
      getSchedulingDataAll(Array.isArray(id) ? id[0] : (id as string)),
  });

  const { data: EmployeesAll } = useQuery<Employee[]>({
    queryKey: ["EmployeesAll", id],
    queryFn: () =>
      getEmployeesDataAll(Array.isArray(id) ? id[0] : (id as string)),
  });

  const employeeMap = EmployeesAll?.reduce(
    (acc, employee) => {
      acc[employee._id] = employee.name;
      return acc;
    },
    {} as Record<string, string>
  );

  const groupedScheduling = (allScheduling ?? []).reduce(
    (acc, reserva) => {
      if (!acc[reserva.funcionario_id]) {
        acc[reserva.funcionario_id] = {
          nameFuncionario:
            employeeMap?.[reserva.funcionario_id] || "Desconhecido",
          agendamentos: [],
        };
      }
      acc[reserva.funcionario_id]?.agendamentos?.push(reserva);
      return acc;
    },
    {} as Record<
      string,
      { nameFuncionario: string; agendamentos: Scheduling[] }
    >
  );

  const handleUpdataStatusScheduling = async (
    statusScheduling: string,
    employeeId: string,
    schedulingId: string
  ) => {
    console.log(statusScheduling, schedulingId);
  
    try {
      const response = await axios.put(
        `reserve/updata/status/scheduling/${id}/${employeeId}/${schedulingId}`,
        { statusScheduling }
      );
  
      await refetch();
  
      if (response.status === 200) {
        console.log("Atualizacao com sucesso");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Section>
        {EmployeesAll?.map((employee) => (
          <div key={employee._id}>
            <SectionTitle>Funcionário: {employee.name}</SectionTitle>
            <Table>
              <thead>
                <tr>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Dia</TableHead>
                  <TableHead>Horário/Início</TableHead>
                  <TableHead>Horário/Final</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Status</TableHead>
                </tr>
              </thead>
              <tbody>
                {groupedScheduling[employee._id]?.agendamentos?.length ? (
                  groupedScheduling[employee._id].agendamentos.map(
                    (reserva) => (
                      <TableRow key={reserva._id}>
                        <TableCell>{reserva.cliet.name}</TableCell>
                        <TableCell>
                          {reserva.horarioSelecionados.data.day}
                        </TableCell>
                        <TableCell>
                          {reserva.horarioSelecionados.data.horariosInicial}
                        </TableCell>
                        <TableCell>
                          {reserva.horarioSelecionados.data.horariosFinal}
                        </TableCell>
                        <TableCell>
                          {reserva.items.map((item) => (
                            <div key={item._id}>{item.name}</div>
                          ))}
                        </TableCell>
                        <TableCell>
                          <BoxTableCell>
                            <h1>{reserva.status}</h1>
                            {reserva.status === "pendente" ? (
                              <BoxButtonTableCell>
                                <ButtonTableCellFalse onClick={() => handleUpdataStatusScheduling("cancelada", reserva.funcionario_id, reserva._id)}>x</ButtonTableCellFalse>
                                <ButtonTableCellTrue onClick={() => handleUpdataStatusScheduling("confirmada", reserva.funcionario_id, reserva._id)}>v</ButtonTableCellTrue>
                              </BoxButtonTableCell>
                            ) : null}
                            {reserva.status === "confirmada" ? (
                              <BoxButtonTableCell>
                                <ButtonTableCellFalse onClick={() => handleUpdataStatusScheduling("cancelada", reserva.funcionario_id, reserva._id)}>x</ButtonTableCellFalse>
                                <ButtonTableCellTrue onClick={() => handleUpdataStatusScheduling("concluída", reserva.funcionario_id, reserva._id)}>v</ButtonTableCellTrue>
                              </BoxButtonTableCell>
                            ) : null}
                          </BoxTableCell>
                        </TableCell>
                      </TableRow>
                    )
                  )
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>Nenhum agendamento</TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </div>
        ))}
      </Section>
    </>
  );
}
