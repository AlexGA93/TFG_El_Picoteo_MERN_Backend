import {
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserNameAndSurname,
} from "./users.model";
import { UserBody } from "../../core/types/types";

export const getUsersService = () => getAllUsers();

export const getUserService = async (userId: string): Promise<UserBody | null> => {
  const user = await getUserById(userId);
  if (!user) return null;

  return {
    nombre: user.nombre,
    apellidos: user.apellidos,
    email: user.email,
    rol_usuario: user.rol_usuario,
  };
};

export const updateUserService = async (userId: string, newParameters: any) => {
  const currentUser = await getUserById(userId);
  if (!currentUser) return false;

  const nombre = newParameters.nombre ?? currentUser.nombre;
  const apellidos = newParameters.apellidos ?? currentUser.apellidos;
  await updateUserNameAndSurname(userId, nombre, apellidos);
  return true;
};

export const deleteUserService = async (userId: string) => {
  const currentUser = await getUserById(userId);
  if (!currentUser) return false;

  await deleteUserById(userId);
  return true;
};
