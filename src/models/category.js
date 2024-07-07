import mysql from "mysql2/promise"
import pool from "../config/db.config.js";

export class CategoryModel {
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