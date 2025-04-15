"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import Footer from "@/components/Footer";
import { Employee } from "@/types/employees";
import { useQuery } from "@tanstack/react-query";
import { getEmployeesDataAll } from "@/hooks/useUsers";

import {
  MessageWrapper,
  PageWrapper,
  Header,
  Title,
  Subtitle,
  EmployeeList,
  Card,
  CardContent,
  SelectBtn,
  Overlay,
  FloatingCard,
  ScheduleSection,
  CloseButton,
} from "./styled";

const EmployeesPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const Pathname = usePathname();

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  const { data: allEmployees } = useQuery<Employee[]>({
    queryKey: ["user", id],
    queryFn: () =>
      getEmployeesDataAll(Array.isArray(id) ? id[0] : (id as string)),
  });

  if (allEmployees?.length === 0) {
    return (
      <MessageWrapper>
        <Users size={48} strokeWidth={1.5} />
        <p>Nenhum funcionário cadastrado na barbearia.</p>
      </MessageWrapper>
    );
  }

  const handleAbrirModal = (employeeId: string): void => {
    router.push(`${Pathname}/${employeeId}`);
  };

  return (
    <>
      <PageWrapper>
        <Header>
          <Title>Conheça Nossa Equipe</Title>
          <Subtitle>
            Profissionais preparados para cuidar do seu estilo
          </Subtitle>
        </Header>

        <EmployeeList>
          {Array.isArray(allEmployees) && allEmployees.length > 0 ? (
            allEmployees.map((employee) => (
              <Card
                key={employee._id}
                onClick={() => setSelectedEmployee(employee)}
              >
                <CardContent>
                  <h3>{employee.name}</h3>
                  <SelectBtn onClick={() => handleAbrirModal(employee._id)}>
                    Selecionar
                  </SelectBtn>
                </CardContent>
              </Card>
            ))
          ) : (
            <div>
              <h1>Nenhum funcioário cadastrado!</h1>
            </div>
          )}
        </EmployeeList>

        <AnimatePresence>
          {selectedEmployee && (
            <Overlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEmployee(null)}
            >
              <FloatingCard
                as={motion.div}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2>{selectedEmployee.name}</h2>
                {selectedEmployee.schedules.map((schedule, index) => (
                  <ScheduleSection key={index}>
                    <strong>{schedule.period}</strong>
                    {schedule.days?.length > 0 ? (
                      <p>Dias: {schedule.days.join(", ")}</p>
                    ) : (
                      <p>Dias: Sem dias definidos</p>
                    )}
                    {schedule.period === "Com Intervalo" ? (
                      schedule.time?.map((t, i) => (
                        <p key={i}>
                          {t.period_of_day}: {t.start_time} - {t.end_time}
                        </p>
                      ))
                    ) : (
                      <p>
                        {schedule.start_time} - {schedule.end_time}
                      </p>
                    )}
                  </ScheduleSection>
                ))}
                <CloseButton onClick={() => setSelectedEmployee(null)}>
                  Fechar
                </CloseButton>
              </FloatingCard>
            </Overlay>
          )}
        </AnimatePresence>
      </PageWrapper>

      <main>
        <Footer />
      </main>
    </>
  );
};

export default EmployeesPage;
