export interface UserBody {
  name: string,
  second_name: string,
  email: string,
  password: string
}

export interface UserLogin {
  email: string,
  password: string
}