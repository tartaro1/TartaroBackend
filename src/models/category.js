import mysql from "mysql2/promise"
import pool from "../config/db.config.js";

/**
 * Modelo para operaciones relacionadas con las categorías en la base de datos.
 * @class CategoryModel
 */
export class CategoryModel {
    /**
     * Obtiene todas las categorías.
     * @returns {Promise<Array>} Array con todas las categorías.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static getAll = async() => {
        const connection = await pool.getConnection();
        try {
            const [categories] = await connection.query("CALL SP_LISTAR_CATEGORIAS();");
            return categories[0]
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }

    /**
     * Obtiene una categoría por su ID.
     * @param {object} params - Parámetros para obtener la categoría.
     * @param {number} params.id - ID de la categoría.
     * @returns {Promise<object>} Objeto con la información de la categoría.
     * @throws {Error} Si la categoría no se encuentra o hay un error durante la consulta.
     */
    static async getById({ id }) {
        const connection = await pool.getConnection();
        try {
            const [category] = await connection.query("CALL SP_SELECCIONAR_CATEGORIA(?)", [id]);
            if (category.length === 0) {
                throw new Error("category not found");
            }
            return category[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Crea una nueva categoría.
     * @param {object} params - Parámetros para crear la categoría.
     * @param {object} params.input - Datos de la nueva categoría.
     * @param {string} params.input.Nombre - Nombre de la categoría.
     * @param {string} params.input.Descripcion - Descripción de la categoría.
     * @param {number} params.input.EstadoCategoria - Estado de la categoría.
     * @returns {Promise<object>} Objeto con la información de la categoría creada.
     * @throws {Error} Si hay un error durante la creación.
     */
    static create = async({ input }) => {
        const connection = await pool.getConnection();
        try {
            const {
                Nombre,
                Descripcion,
                EstadoCategoria
            } = input;
            const [category] = await connection.query("CALL SP_INSERTAR_CATEGORIA(?, ?, ?)", [Nombre, Descripcion, EstadoCategoria]);
            return category;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Actualiza una categoría existente.
     * @param {object} params - Parámetros para actualizar la categoría.
     * @param {number} params.id - ID de la categoría a actualizar.
     * @param {object} params.input - Nuevos datos de la categoría.
     * @param {string} params.input.Nombre - Nuevo nombre de la categoría.
     * @param {string} params.input.Descripcion - Nueva descripción de la categoría.
     * @param {number} params.input.EstadoCategoria - Nuevo estado de la categoría.
     * @returns {Promise<object>} Resultado de la actualización.
     * @throws {Error} Si hay un error durante la actualización.
     */
    static update = async({id, input}) => {
        const {
            Nombre,
            Descripcion,
            EstadoCategoria
        } = input;
        const connection = await pool.getConnection();
        try {
            const result = await connection.query("CALL SP_ACTUALIZAR_CATEGORIA(?, ?, ?, ?)", [id, Nombre, Descripcion, EstadoCategoria]);
            return result;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Elimina una categoría por su ID.
     * @param {object} params - Parámetros para eliminar la categoría.
     * @param {number} params.id - ID de la categoría a eliminar.
     * @returns {Promise<object>} Resultado de la eliminación.
     * @throws {Error} Si hay un error durante la eliminación.
     */
    static async delete({ id }) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_ELIMINAR_CATEGORIA(?)", [id]);
            return result;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
}