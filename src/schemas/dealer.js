import z from "zod";

const dealerSchema = z.object({
    Nombre: z.string(),
    Celular: z.string(),
    Cedula: z.number().int(),
    Direccion: z.string(),
    Correo: z.string(),
    Contrasena: z.string(),
    ID_Rol: z.number().int().default(3),
    Estado: z.string().default("Activo") 
});

export function validateDealer(input) {
    return dealerSchema.safeParse(input);
}

export function validatePartialUser(input) {
    return dealerSchema.partial().safeParse(input);
}