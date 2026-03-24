export interface User {
  nombre: string;
  apellidos: string;
}
export interface UserBody extends User {
  email: string,
  password?: string,
  rol_usuario: string
}

export interface UserLogin {
  email: string,
  password: string
}

export interface VerifiedTokenType {
  email: string;
  rol_usuario: string;
  iat: number;
  exp: number;
}


export interface UpdateUserParams {
  userId: string;
  newParameters: USer;
}

type QueryParams = Array<string | number | boolean | Date | null>;

type UserRow = RowDataPacket & {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  rol_usuario: string;
};