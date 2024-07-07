import mysql from "mysql2/promise"
import pool from "../config/db.config.js";

export class ProviderModel {
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