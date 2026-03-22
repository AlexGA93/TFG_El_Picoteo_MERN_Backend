export interface UserBody {
  nombre: string,
  apellidos: string,
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