/**
 * *    ^      -> start of the input
 * *    (?=)   -> first condition
 * *    .      -> any character except newline (\n)
 * *    *\d    -> zero or more times any character between [0-9]
 * *    (?=)   -> second condition
 * *    .      -> any character except newline (\n)
 * *    *[a-z] -> zero or more times any character between [a-z]
 * *    (?=)   -> third condition
 * *    .      -> any character except newline (\n)
 * *    *[A-Z] -> zero or more times any character between [A-Z]
 * *    [0-9a-zA-Z] -> following characters must be any of these characters
 * *    {8,}$  -> 8 or more characters at the end
 *
 *
 * * example: "92johnDOE4ever"
 */
export const passRegex:         RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
export const emailRegex:        RegExp = /^[A-Za-z0-9._%+-]+@elpicoteo\.com$/;
export const emailCheckRegex:   RegExp = /^[^@]+@[^@]+\.[^@]{2,}$/;