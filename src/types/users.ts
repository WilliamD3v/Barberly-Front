/* Login */
export interface signInData {
  email?: string
  password?: string
}

/* Usuarios */
export interface User {
  data: {
    _id: string
  }
}

/* Dados gerais de usuarios */
export interface UserData {
  _id: string,
  name: string,
  email: string,
  status_conta: string,
  plano_assinado: string,
}
