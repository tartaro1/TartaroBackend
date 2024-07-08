import mysql from "mysql2/promise";
import pool from "../config/db.config.js";

/**
 * Modelo para operaciones relacionadas con los pedidos en la base de datos.
 * @class OrderModel
 */
export class OrderModel {
    /**
     * Obtiene todos los pedidos almacenados en la base de datos.
     * @returns {Promise<Array>} Un arreglo con todos los pedidos.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getAll() {
        const connection = await pool.getConnection();
        try {
            const [orders] = await connection.query("CALL SP_LISTAR_PEDIDOS();");
            return orders[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
    static async dailySales() {
        const connection = await pool.getConnection();
        try {
            const [orders] = await connection.query("CALL SP_REPORTE_VENTAS_DIARIAS();");
            return orders[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
    /**
     * Obtiene un pedido por su ID.
     * @param {object} params - Parámetros de búsqueda.
     * @param {number} params.id - El ID del pedido a buscar.
     * @returns {Promise<object|string>} El pedido encontrado o un mensaje indicando que no se encontró el pedido.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getById({ id }) {
        const connection = await pool.getConnection();
        try {
            const [order] = await connection.query("CALL SP_LISTAR_PEDIDO_ID(?)", [id]);
            if (order.length === 0) {
                return { error: "Pedido not found" };
            }
            return order[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Crea un nuevo pedido en la base de datos.
     * @param {object} params - Parámetros del nuevo pedido.
     * @param {string} params.input.EstadoPedido - Estado del nuevo pedido.
     * @param {string} params.input.Direccion - Dirección de entrega del nuevo pedido.
     * @param {string} params.input.cliente - Cliente asociado al nuevo pedido.
     * @param {number} params.input.PrecioVenta - Precio de venta del nuevo pedido.
     * @param {number} params.input.ID_Repartidor - ID del repartidor asignado al nuevo pedido.
     * @returns {Promise<object>} El pedido creado.
     * @throws {Error} Si hay un error durante la creación del pedido.
     */
    static async create({ input }) {
        const {
            EstadoPedido,
            Direccion,
            cliente,
            PrecioVenta,
            ID_Repartidor
        } = input;
        const connection = await pool.getConnection();
        try {
            // Ejecuta el procedimiento almacenado para insertar el pedido
            await connection.query(
                "CALL SP_INSERTAR_PEDIDO(?,?,?,?,?, @p_PedidoID);",
                [EstadoPedido, Direccion, cliente, PrecioVenta, ID_Repartidor]
            );
            // Consulta para obtener el valor de @p_PedidoID
            const [[{ PedidoID }]] = await connection.query("SELECT @p_PedidoID as PedidoID;");
            return PedidoID;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
    

    /**
     * Actualiza el repartidor asignado a un pedido por su ID.
     * @param {object} params - Parámetros de actualización.
     * @param {number} params.id - El ID del pedido a actualizar.
     * @param {object} params.input - Datos de actualización del pedido.
     * @param {number} params.input.ID_Repartidor - Nuevo ID del repartidor asignado.
     * @returns {Promise<object>} Resultado de la actualización del repartidor del pedido.
     * @throws {Error} Si hay un error durante la actualización.
     */
    static async update({ id, input }) {
        const {
            ID_Repartidor
        } = input;
        const connection = await pool.getConnection();
        try {
            const orderDealer = await connection.query("CALL SP_ACTUALIZAR_PEDIDO_REPARTIDOR(?,?)", [id, ID_Repartidor]);
            return orderDealer;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Actualiza el estado de un pedido por su ID.
     * @param {object} params - Parámetros de actualización.
     * @param {number} params.id - El ID del pedido a actualizar.
     * @param {object} params.input - Datos de actualización del pedido.
     * @param {string} params.input.EstadoPedido - Nuevo estado del pedido.
     * @returns {Promise<object>} Resultado de la actualización del estado del pedido.
     * @throws {Error} Si hay un error durante la actualización.
     */
    static async updateState({ id, input }) {
        const {
            EstadoPedido
        } = input;
        const connection = await pool.getConnection();
        try {
            const orderState = await connection.query("CALL SP_ACTUALIZAR_PEDIDO_ESTADO(?,?)", [id, EstadoPedido]);
            return orderState;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Elimina un pedido de la base de datos por su ID.
     * @param {object} params - Parámetros de eliminación.
     * @param {number} params.id - El ID del pedido a eliminar.
     * @returns {Promise<object>} Resultado de la eliminación del pedido.
     * @throws {Error} Si hay un error durante la eliminación del pedido.
     */
    static async delete({ id }) {
        const connection = await pool.getConnection();
        try {
            const [deletedOrder] = await connection.query("CALL SP_ELIMINAR_PEDIDO(?)", [id]);
            return deletedOrder;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Busca pedidos por nombre del repartidor.
     * @param {object} params - Parámetros de búsqueda.
     * @param {string} params.dealer - Nombre del repartidor a buscar.
     * @returns {Promise<object>} El pedido encontrado asociado al repartidor.
     * @throws {Error} Si hay un error durante la búsqueda.
     */
    static async findByDealerName({ dealer }) {
        const connection = await pool.getConnection();
        try {
            const [dealerOrder] = await connection.query("CALL SP_ORDENREPARTIDOR(?)", [dealer]);
            return dealerOrder[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Busca pedidos por nombre de usuario.
     * @param {object} params - Parámetros de búsqueda.
     * @param {string} params.user - Nombre del usuario asociado a los pedidos.
     * @returns {Promise<Array>} Arreglo con los pedidos encontrados para el usuario especificado.
     * @throws {Error} Si hay un error durante la búsqueda.
     */
    static async findByUser({ user }) {
        const connection = await pool.getConnection();
        try {
            const [userOrder] = await connection.query("CALL SP_LISTAR_PEDIDOS_USUARIO(?)", [user]);
            return userOrder[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Busca pedidos por ID del repartidor.
     * @param {object} params - Parámetros de búsqueda.
     * @param {number} params.dealerID - ID del repartidor asociado a los pedidos.
     * @returns {Promise<object>} El pedido encontrado asociado al repartidor.
     * @throws {Error} Si hay un error durante la búsqueda.
     */
    static async findByDealer({ dealerID }) {
        const connection = await pool.getConnection();
        try {
            const [userOrder] = await connection.query("CALL SP_ORDEN_REPARTIDOR(?)", [dealerID]);
            return userOrder[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Cuenta el número total de ventas realizadas.
     * @returns {Promise<object>} Detalle de productos y su conteo total de ventas.
     * @throws {Error} Si hay un error durante el conteo.
     */
    static async countSales() {
        const connection = await pool.getConnection();
        try {
            const [detailProducts] = await connection.query("CALL SP_CONTAR_VENTAS()");
            return detailProducts[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Calcula la suma total de ganancias obtenidas.
     * @returns {Promise<Array>} Arreglo con la suma total de ganancias.
     * @throws {Error} Si hay un error durante el cálculo de ganancias.
     */
    static async sumSales() {
        const connection = await pool.getConnection();
        try {
            const [rows1] = await connection.query('CALL `SP_GANANCIAS`(@total)');
            const [rows2] = await connection.query('SELECT @total AS total');
            return rows2;
        } catch (error) {
            throw new Error(error.message);
        } finally {
            connection.release();
        }
    }
}
