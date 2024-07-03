import pool from "../config/db.config.js";
import bcrypt from "bcrypt";

/**
 * Modelo para operaciones relacionadas con los repartidores en la base de datos.
 * @class DealersModel
 */
export class DealersModel {
    /**
     * Obtiene todos los repartidores.
     * @returns {Promise<object[]>} Todos los repartidores.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getAll() {
        const connection = await pool.getConnection();
        try {
            const [dealers] = await connection.query("CALL SP_LISTARREPARTIDORES();");
            return dealers[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Obtiene un repartidor por su correo electrónico.
     * @param {object} params - Parámetros para buscar un repartidor por correo electrónico.
     * @param {string} params.email - Correo electrónico del repartidor.
     * @returns {Promise<object>} Repartidor encontrado por su correo electrónico.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getByEmail({ email }) {
        const connection = await pool.getConnection();
        try {
            const [dealer] = await connection.query("CALL SP_LISTAR_EMAIL_REPARTIDOR(?)", [email]);
            return dealer[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Obtiene un repartidor por su ID.
     * @param {object} params - Parámetros para buscar un repartidor por su ID.
     * @param {number} params.id - ID del repartidor.
     * @returns {Promise<object>} Repartidor encontrado por su ID.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getById({ id }) {
        const connection = await pool.getConnection();
        try {
            const [dealer] = await connection.query("CALL SP_LISTAR_REPARTIDOR(?)", [id]);
            if (dealer.length === 0) {
                return { message: "Dealer not found" };
            }
            return dealer[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Crea un nuevo repartidor.
     * @param {object} params - Parámetros para crear un nuevo repartidor.
     * @param {object} params.input - Datos del nuevo repartidor a crear.
     * @param {string} params.input.Nombre - Nombre del repartidor.
     * @param {string} params.input.Celular - Número de celular del repartidor.
     * @param {string} params.input.Cedula - Número de cédula del repartidor.
     * @param {string} params.input.Direccion - Dirección del repartidor.
     * @param {string} params.input.Correo - Correo electrónico del repartidor.
     * @param {string} params.input.Contrasena - Contraseña del repartidor.
     * @param {number} params.input.ID_Rol - ID del rol del repartidor.
     * @param {boolean} params.input.Estado - Estado del repartidor (activo/inactivo).
     * @returns {Promise<object>} Nuevo repartidor creado.
     * @throws {Error} Si hay un error durante la creación del repartidor.
     */
    static async create({ input }) {
        const {
            Nombre,
            Celular,
            Cedula,
            Direccion,
            Correo,
            Contrasena,
            ID_Rol,
            Estado
        } = input;
        const passwordUnencrypted = Contrasena;
        const connection = await pool.getConnection();
        try {
            const hash = await bcrypt.hash(passwordUnencrypted, 2);
            const passwordEncrypted = hash;
            const dealer = await connection.query("CALL SP_CREAR_REPARTIDOR(?, ?, ?, ?, ?, ?, ?, ?)", [Nombre, Celular, Cedula, Direccion, Correo, passwordEncrypted, ID_Rol, Estado]);
            const newDealer = await connection.query("CALL SP_USUARIO_ID(?)", [dealer[0].insertId]);
            return newDealer[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Elimina un repartidor por su ID.
     * @param {object} params - Parámetros para eliminar un repartidor.
     * @param {number} params.id - ID del repartidor a eliminar.
     * @returns {Promise<object>} Resultado de la operación de eliminación.
     * @throws {Error} Si hay un error durante la eliminación del repartidor.
     */
    static async delete({ id }) {
        const connection = await pool.getConnection();
        try {
            const [deletedDealer] = await connection.query("CALL SP_EliminarUsuario(?)", [id]);
            return deletedDealer;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Actualiza un repartidor por su ID.
     * @param {object} params - Parámetros para actualizar un repartidor.
     * @param {number} params.id - ID del repartidor a actualizar.
     * @param {object} params.input - Datos actualizados del repartidor.
     * @param {string} params.input.Nombre - Nuevo nombre del repartidor.
     * @param {string} params.input.Celular - Nuevo número de celular del repartidor.
     * @param {string} params.input.Cedula - Nuevo número de cédula del repartidor.
     * @param {string} params.input.Direccion - Nueva dirección del repartidor.
     * @param {string} params.input.Correo - Nuevo correo electrónico del repartidor.
     * @param {string} params.input.Contrasena - Nueva contraseña del repartidor.
     * @param {number} params.input.ID_Rol - Nuevo ID del rol del repartidor.
     * @param {boolean} params.input.Estado - Nuevo estado del repartidor (activo/inactivo).
     * @returns {Promise<object>} Resultado de la operación de actualización.
     * @throws {Error} Si hay un error durante la actualización del repartidor.
     */
    static async update({ id, input }) {
        const {
            Nombre,
            Celular,
            Cedula,
            Direccion,
            Correo,
            Contrasena,
            ID_Rol,
            Estado
        } = input;
        
        const connection = await pool.getConnection();
        try {
            const [currentPasswordRow] = await connection.query('SELECT Contrasena FROM usuarios WHERE ID_Usuario = ?', [id]);
            const currentPasswordEncrypted = currentPasswordRow[0].Contrasena;
    
            // Verificar si la contraseña ha cambiado
            let passwordEncrypted = currentPasswordEncrypted;
            if (Contrasena !== '') {
                // Generar hash para la nueva contraseña
                const hash = await bcrypt.hash(Contrasena, 2);
                passwordEncrypted = hash;
            }
    
            // Llamar al procedimiento almacenado con los datos actualizados
            const request = await connection.query('CALL SP_MODIFICAR_USUARIO(?,?,?,?,?,?,?,?,?)', [id, Nombre, Celular, Cedula, Direccion, Correo, passwordEncrypted, ID_Rol, Estado]);
            return request;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
}
