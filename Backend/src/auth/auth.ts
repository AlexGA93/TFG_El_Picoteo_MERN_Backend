import jwt from "jsonwebtoken";

const jwtKey: string = "ElPicoteoTFG";

export const generateAuthToken = (email: string): string => jwt.sign({email}, jwtKey, {expiresIn: '2h'});

export const verifyToken = (token: string) => {
    try {

        return jwt.verify(token, jwtKey);
        
    } catch (error) {
        console.error("Proceso de cerificacion de toke fue interrumpido. Necesaria su revision")
        throw error;
    }
}