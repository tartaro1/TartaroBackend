import pool from "../config/db.config.js";

/**
 * Modelo para operaciones relacionadas con los detalles de pedidos en la base de datos.
 * @class DetailsModel
 */
export class DetailsModel {
    /**
     * Obtiene todos los detalles de pedidos.
     * @returns {Promise<object[]>} Todos los detalles de pedidos.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getAll() {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_DATOSPEDIDOS();");
            return result[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Obtiene los detalles de pedidos filtrados por proveedor.
     * @param {object} params - Parámetros para filtrar por proveedor.
     * @param {string} params.provider - Nombre o identificador del proveedor.
     * @returns {Promise<object[]>} Detalles de pedidos filtrados por proveedor.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getByProvider({ provider }) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_FILTRARPROVEEDOR(?);", [provider]);
            return result[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Obtiene los productos de un pedido específico.
     * @param {object} params - Parámetros para obtener los productos de un pedido.
     * @param {number} params.id - Identificador del pedido.
     * @returns {Promise<object[]>} Productos del pedido especificado.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getOrderProducts({ id }) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_ORDENPRODUCTOS(?)", [id]);
            return result[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Elimina un detalle de pedido específico.
     * @param {object} params - Parámetros para eliminar un detalle de pedido.
     * @param {number} params.id - Identificador del detalle de pedido a eliminar.
     * @returns {Promise<object>} Resultado de la operación de eliminación.
     * @throws {Error} Si hay un error durante la operación.
     */
    static async delete({ id }) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_ELIMINARPRODUCTOORDEN(?)", [id]);
            return result[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Crea un nuevo detalle de pedido.
     * @param {object} params - Parámetros para crear un nuevo detalle de pedido.
     * @param {number} params.input.ID_Pedido - Identificador del pedido asociado.
     * @param {number} params.input.ID_Producto - Identificador del producto asociado.
     * @param {number} params.input.cantidad - Cantidad del producto en el pedido.
     * @param {number} params.input.PrecioVenta - Precio de venta unitario del producto.
     * @param {number} params.input.Descuento - Descuento aplicado al producto.
     * @returns {Promise<object>} Detalle de pedido creado.
     * @throws {Error} Si hay un error durante la creación del detalle de pedido.
     */
    
    
    static async create({ input }) {
        const MAX_RETRIES = 3; // Máximo de intentos de reintento
        const {
            ID_Pedido,
            ID_Producto,
            cantidad,
            PrecioVenta,
            Descuento
        } = input;
        const connection = await pool.getConnection();
    
        let attempt = 0;
        while (attempt < MAX_RETRIES) {
            try {
                await connection.beginTransaction();
                await connection.query("CALL SP_INSERTAR_DETALLE_PEDIDO(?,?,?,?,?)", [ID_Pedido, ID_Producto, cantidad, PrecioVenta, Descuento]);
                await connection.commit();
                return; // Salir de la función si la operación tiene éxito
            } catch (error) {
                await connection.rollback();
                if (error.message.includes('Deadlock found when trying to get lock')) {
                    attempt++;
                    if (attempt >= MAX_RETRIES) {
                        throw new Error('Deadlock found after maximum retries');
                    }
                } else {
                    throw new Error(error);
                }
            } finally {
                connection.release();
            }
        }
    }
    

    /**
     * Actualiza un detalle de pedido existente.
     * @param {object} params - Parámetros para actualizar un detalle de pedido.
     * @param {number} params.id - Identificador del detalle de pedido a actualizar.
     * @param {object} params.input - Datos actualizados del detalle de pedido.
     * @param {number} params.input.Cantidad - Nueva cantidad del producto en el pedido.
     * @returns {Promise<object>} Resultado de la operación de actualización.
     * @throws {Error} Si hay un error durante la actualización del detalle de pedido.
     */
    static async update({ id, input }) {
        const {
            Cantidad
        } = input;
        const connection = await pool.getConnection();
        try {
            const detailsProducts = await connection.query("CALL SP_MODIFICAR_DETALLEPEDIDO(?,?)", [id, Cantidad]);
            return detailsProducts;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    static async findByProvider(idProvider) {
        const connection = await pool.getConnection();
        try {
            const products = await connection.query("CALL SP_SELECCIONAR_PRODUCTOS_POR_PROVEEDOR(?)", [idProvider])
            return products[0][0]
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
}
