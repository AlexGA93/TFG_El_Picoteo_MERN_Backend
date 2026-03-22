import bcrypt from "bcryptjs";
import { generateAuthToken, verifyToken } from "../../core/auth/auth";
import {
  findUserByEmail,
  insertUser,
  validateUserByEmailAndRole,
} from "./auth.model";
import { hashingPassword } from "../../core/security/hashing";
import { UserBody, UserLogin, VerifiedTokenType } from "../../core/types/types";

type RegisterResult =
  | { status: "missing_password" }
  | { status: "user_exists" }
  | { status: "ok"; token: string };

type LoginResult =
  | { status: "user_not_found" }
  | { status: "invalid_credentials" }
  | { status: "ok"; token: string };

export const registerUserService = async (payload: UserBody): Promise<RegisterResult> => {
  const { nombre, apellidos, email, password, rol_usuario } = payload;

  if (!password) return { status: "missing_password" };

  const existingUser = await findUserByEmail(email);
  if (existingUser) return { status: "user_exists" };

  await insertUser({ nombre, apellidos, email, rol_usuario, password }, hashingPassword(password));
  const token = generateAuthToken(email, rol_usuario);
  return { status: "ok", token };
};

export const loginService = async ({ email, password }: UserLogin): Promise<LoginResult> => {
  const user = await findUserByEmail(email);
  if (!user) return { status: "user_not_found" };

  const passMatch = await bcrypt.compare(password, user.password);
  if (!passMatch) return { status: "invalid_credentials" };

  const token = generateAuthToken(email, user.rol_usuario);
  return { status: "ok", token };
};

export const validateTokenService = async (token: string) => {
  const { email, rol_usuario } = verifyToken(token) as VerifiedTokenType;
  return validateUserByEmailAndRole(email, rol_usuario);
};

export const regenerateTokenService = (token: string) => {
  const { email, rol_usuario } = verifyToken(token) as VerifiedTokenType;
  return generateAuthToken(email, rol_usuario);
};
