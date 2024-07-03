import pool from "../config/db.config.js";

/**
 * Modelo para operaciones relacionadas con los backups en la base de datos.
 * @class BackupsModel
 */
export class BackupsModel {
    /**
     * Obtiene la información del último backup realizado.
     * @returns {Promise<object>} Información del último backup.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getLatest() {
        const connection = await pool.getConnection();
        try {
            const [backup] = await connection.query("CALL SP_FECHACOPIA()");
            return backup[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Crea un nuevo backup en la base de datos.
     * @param {object} params - Parámetros para crear un nuevo backup.
     * @param {object} params.input - Datos del nuevo backup a crear.
     * @param {string} params.input.NombreBd - Nombre de la base de datos.
     * @param {string} params.input.VersionBd - Versión de la base de datos.
     * @param {string} params.input.Tipo - Tipo de backup.
     * @param {string} params.input.Ubicacion - Ubicación del backup.
     * @param {string} params.input.Informacion - Información adicional del backup.
     * @returns {Promise<object>} Nuevo backup creado.
     * @throws {Error} Si hay un error durante la creación del backup.
     */
    static async create({ input }) {
        const connection = await pool.getConnection();
        try {
            const {
                NombreBd,
                VersionBd,
                Tipo,
                Ubicacion,
                Informacion
            } = input;
            const [backup] = await connection.query("CALL SP_CREARCOPIA(?, ?, ?, ?, ?)", [NombreBd, VersionBd, Tipo, Ubicacion, Informacion]);
            return backup;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
}
