import bcrypt from "bcryptjs";

export const hashingPassword = (psswd: string) => bcrypt.hashSync(psswd, bcrypt.genSaltSync(10));
