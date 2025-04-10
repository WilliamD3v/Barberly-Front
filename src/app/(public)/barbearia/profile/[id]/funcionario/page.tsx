"use client";

import { getEmployeesDataAll } from "@/hooks/useUsers";
import { Employee } from "@/types/employees";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import styled from "styled-components";

const EmployeesPage = () => {
  const { id } = useParams();

  const { data: allEmployees } = useQuery<Employee[]>({
    queryKey: ["user", id],
    queryFn: () => getEmployeesDataAll(Array.isArray(id) ? id[0] : (id as string)),
  });

  if (!allEmployees) return <LoadingMessage>Carregando...</LoadingMessage>;

  return (
    <PageWrapper>
      <Title>Funcionários da Barbearia</Title>
      <EmployeeList>
        {allEmployees.map((employee) => (
          <EmployeeCard key={employee._id}>
            <EmployeeInfo>
              <h3>{employee.name}</h3>
              {employee.schedules.map((schedule, index) => (
                <ScheduleInfo key={index}>
                  <p>Horários disponíveis:</p>
                  <p>Dias: {schedule.days.join(", ")}</p>
                  <p>
                    Período: {schedule.period} - {schedule.start_time} até {schedule.end_time}
                  </p>
                </ScheduleInfo>
              ))}
            </EmployeeInfo>
            <BookButton>Agendar com {employee.name}</BookButton>
          </EmployeeCard>
        ))}
      </EmployeeList>
    </PageWrapper>
  );
};

export default EmployeesPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f4f7fc;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: #1f2a44;
  margin-bottom: 30px;
  text-align: center;
`;

const EmployeeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const EmployeeCard = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const EmployeeInfo = styled.div`
  padding: 20px;
  text-align: center;
  h3 {
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    color: #1f2a44;
    margin-bottom: 10px;
  }
`;

const ScheduleInfo = styled.div`
  margin-top: 15px;
  color: #4f5d73;
  font-size: 1rem;
  p {
    margin: 5px 0;
    line-height: 1.5;
  }
`;

const BookButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: #007bff;
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const LoadingMessage = styled.p`
  font-family: 'Roboto', sans-serif;
  color: #1f2a44;
  font-size: 1.5rem;
  text-align: center;
  margin-top: 50px;
`;

