import z from "zod";

const userSchema = z.object({
    Nombre: z.string(),
    Celular: z.string(),
    Cedula: z.number().int(),
    Direccion: z.string(),
    Correo: z.string(),
    Contrasena: z.string(),
    ID_Rol: z.number().int().default(1),
    Estado: z.string().default("Activo"),
});

export function validateUser(input) {
    return userSchema.safeParse(input);
}

export function validatePartialUser(input) {
    return userSchema.partial().safeParse(input);
}