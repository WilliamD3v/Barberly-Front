import axios from "@/lib/axios";

/* Dados de usuário da barbearia */
export const getUserData = async (_id?: string) => {
  if (!_id) {
    console.warn(
      "Os dados de todos os funcionarios estão temporariamente indisponíveis"
    );
    return null;
  }

  try {
    const response = await axios.get(`user/users/${_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos Usuarios", error);
  }
};

/* Dados de serviços da barbearia */
export const getServiceData = async (_id?: string) => {
  if (!_id) {
    console.warn(
      "Os dados de todos os funcionarios estão temporariamente indisponíveis"
    );
    return null;
  }

  try {
    const response = await axios.get(`services/data-service/${_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos Serviços", error);
  }
};

/* Dados de todos os funcionários da barbearia */
export const getEmployeesDataAll = async (_id?: string) => {
  if (!_id) {
    console.warn(
      "Os dados de todos os funcionarios estão temporariamente indisponíveis"
    );
    return null;
  }

  try {
    const response = await axios.get(`employees/all-data-employees/${_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos funcionarios", error);
  }
};

/* Dados unitarios de um funcionários específico */
export const getEmployeesData = async (_id?: string, employeesId?: string) => {
  if (!_id || !employeesId) {
    console.warn(
      "Os dados do funcionário estão temporariamente indisponíveis."
    );
    return null;
  }

  try {
    const response = await axios.get(
      `employees/data-employees/${_id}/${employeesId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do funcionário:", error);
  }
};

/* Dados de agendamentos de apenas um funcionário específico */
export const getSchedulingData = async (
  barberId?: string,
  employeeId?: string
) => {
  if (!barberId || !employeeId) {
    console.warn(
      "Os dados do funcionário estão temporariamente indisponíveis."
    );
    return null;
  }

  try {
    const response = await axios.get(
      `reserve/getAll/client/${barberId}/${employeeId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do funcionário:", error);
  }
};

/* Dados de agendamentos de todos os funcionários da barbearia */
export const getSchedulingDataAll = async (
  barberId?: string,
) => {
  if (!barberId) {
    console.warn(
      "Os dados do funcionário estão temporariamente indisponíveis."
    );
    return null;
  }

  try {
    const response = await axios.get(
      `reserve/getAll/${barberId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do funcionário:", error);
  }
};

/* Dados de pagamento do usuário da barbearia */
export const getPaymentUserData = async (_id?: string) => {
  if (!_id) {
    console.warn(
      "Os dados de todos os funcionarios estão temporariamente indisponíveis"
    );
    return null;
  }

  try {
    const response = await axios.get(`payment/get-data-payments-user/${_id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar todos Usuarios", error);
  }
};