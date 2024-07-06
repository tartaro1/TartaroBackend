import mysql from "mysql2/promise"
import pool from "../config/db.config.js"
export class BillModel {
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