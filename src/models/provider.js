import mysql from "mysql2/promise"
import pool from "../config/db.config.js";

/**
 * Modelo para operaciones relacionadas con los proveedores en la base de datos.
 * @class ProviderModel
 */
export class ProviderModel {
    /**
     * Obtiene todos los proveedores.
     * @returns {Promise<Array>} Array con todos los proveedores.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static getAll = async() => {
        const connection = await pool.getConnection();
        try {
            const [providers] = await connection.query("CALL SP_LISTAR_PROVEEDORES();");
            return providers[0]
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }

    /**
     * Obtiene un proveedor por su ID.
     * @param {object} params - Parámetros para obtener el proveedor.
     * @param {number} params.id - ID del proveedor.
     * @returns {Promise<object>} Objeto con la información del proveedor.
     * @throws {Error} Si el proveedor no se encuentra o hay un error durante la consulta.
     */
    static async getById({ id }) {
        const connection = await pool.getConnection();
        try {
            const [provider] = await connection.query("CALL SP_SELECCIONAR_PROVEEDOR(?)", [id]);
            if (provider.length === 0) {
                throw new Error("provider not found");
            }
            return provider[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Crea un nuevo proveedor.
     * @param {object} params - Parámetros para crear el proveedor.
     * @param {object} params.input - Datos del nuevo proveedor.
     * @param {string} params.input.Nombre - Nombre del proveedor.
     * @param {string} params.input.Direccion - Dirección del proveedor.
     * @param {string} params.input.Telefono - Teléfono del proveedor.
     * @param {string} params.input.Correo - Correo electrónico del proveedor.
     * @returns {Promise<object>} Objeto con la información del proveedor creado.
     * @throws {Error} Si hay un error durante la creación.
     */
    static create = async({ input }) => {
        const connection = await pool.getConnection();
        try {
            const {
                Nombre,
                Direccion,
                Telefono,
                Correo
            } = input;
            console.log(input);
            const [provider] = await connection.query("CALL SP_INSERTAR_PROVEEDOR(?, ?, ?, ?)", [Nombre, Direccion, Telefono, Correo]);
            return provider;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Actualiza un proveedor existente.
     * @param {object} params - Parámetros para actualizar el proveedor.
     * @param {number} params.id - ID del proveedor a actualizar.
     * @param {object} params.input - Nuevos datos del proveedor.
     * @param {string} params.input.Nombre - Nuevo nombre del proveedor.
     * @param {string} params.input.Direccion - Nueva dirección del proveedor.
     * @param {string} params.input.Telefono - Nuevo teléfono del proveedor.
     * @param {string} params.input.Correo - Nuevo correo electrónico del proveedor.
     * @returns {Promise<object>} Resultado de la actualización.
     * @throws {Error} Si hay un error durante la actualización.
     */
    static update = async({id, input}) => {
        const {
            Nombre,
            Direccion,
            Telefono,
            Correo
        } = input;
        const connection = await pool.getConnection();
        try {
            const result = await connection.query("CALL SP_ACTUALIZAR_PROVEEDOR(?, ?, ?, ?, ?)", [id, Nombre, Direccion, Telefono, Correo]);
            return result;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Elimina un proveedor por su ID.
     * @param {object} params - Parámetros para eliminar el proveedor.
     * @param {number} params.id - ID del proveedor a eliminar.
     * @returns {Promise<object>} Resultado de la eliminación.
     * @throws {Error} Si hay un error durante la eliminación.
     */
    static async delete({ id }) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_ELIMINAR_PROVEEDOR(?)", [id]);
            return result;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
}