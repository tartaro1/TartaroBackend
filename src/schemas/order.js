import z from "zod";

const orderSchema = z.object({
    EstadoPedido: z.string().default("Activo"), 
    Direccion: z.string(), 
    Cliente: z.number().int(), 
    PrecioVenta: z.number(), 
    ID_Rol: z.number().int()
});

export function validateDealer(input) {
    return orderSchema.safeParse(input);
}

export function validatePartialUser(input) {
    return orderSchema.partial().safeParse(input);
}