import mysql from "mysql2/promise"
import pool from "../config/db.config.js"

/**
 * Modelo para operaciones relacionadas con las facturas en la base de datos.
 * @class BillModel
 */
export class BillModel {
    /**
     * Obtiene los detalles de una factura por su ID.
     * @param {object} params - Parámetros para obtener la factura.
     * @param {number} params.id - ID de la factura.
     * @returns {Promise<object>} Objeto con la información de la factura y sus productos.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static getById = async ({ id }) => {
        const connection = await pool.getConnection();
        try {
            const [results, fields] = await connection.query("CALL ObtenerDetalleFactura(?)", [id]);
            const facturaInfo = results[0][0];
            const productosInfo = results[1];
            return { facturaInfo, productosInfo };
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
}