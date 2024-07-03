import mysql from "mysql2/promise";
import pool from "../config/db.config.js";

/**
 * Modelo para operaciones relacionadas con la gestión de contenidos informativos en la base de datos.
 * @class GestionModel
 */
export class GestionModel {
    /**
     * Obtiene el último contenido informativo gestionado.
     * @returns {Promise<object>} El último contenido informativo gestionado.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getLatest() {
        const connection = await pool.getConnection();
        try {
            const [gestion] = await connection.query("CALL SP_GESTION()");
            return gestion[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Crea un nuevo contenido informativo en la base de datos.
     * @param {object} params - Parámetros del nuevo contenido informativo.
     * @param {string} params.input.titulo - Título del contenido informativo.
     * @param {string} params.input.contenido - Contenido del contenido informativo.
     * @param {string} params.input.pdf_path - Ruta del archivo PDF asociado al contenido informativo.
     * @returns {Promise<object>} El contenido informativo creado.
     * @throws {Error} Si hay un error durante la creación del contenido informativo.
     */
    static async create({ input }) {
        const connection = await pool.getConnection();
        try {
            const {
                titulo,
                contenido,
                pdf_path
            } = input;
            const [gestion] = await connection.query("CALL SP_INSERTAR_CONTENIDO_INFORMATIVO(?, ?, ?)", [titulo, contenido, pdf_path]);
            return gestion;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
}
