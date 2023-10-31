export interface UserBody {
  name: string,
  second_name: string,
  email: string,
  password?: string,
  role: string
}

export interface UserLogin {
  email: string,
  password: string
}

export interface VerifiedTokenType {
  email: string;
  role: string;
  iat: number;
  exp: number;
}