import z from 'zod';

const productSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Product title must be a string',
    required_error: 'Product title is required.'
  }),
  id_categoria: z.number().int().min(1).max(5),
  marca: z.string(),
  id_proveedor: z.number().int().positive(),
  descripcion: z.string(),
  precio: z.number(),
  calificacion: z.number().min(1).max(5),
  imagen: z.string(),
  disponibilidad: z.number().default(1),
  stock: z.number()
})

export function validateProduct (input) {
  return productSchema.safeParse(input)
}

export function validatePartialMovie (input) {
  return productSchema.partial().safeParse(input);
}