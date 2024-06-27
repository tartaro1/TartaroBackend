import mysql from "mysql2/promise";
import pool from "../config/db.config.js";
import bcrypt from "bcrypt";

export class DealersModel {
    static getAll = async() => {
        const connection = await pool.getConnection();
        try {
            const [dealers] = await connection.query("CALL SP_LISTARREPARTIDORES();");
            return dealers[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static getByEmail = async({email}) => {
        const connection = await pool.getConnection();
        try {
            const [dealer] = await connection.query("CALL SP_LISTAR_EMAIL_REPARTIDOR(?)", [email] );
            return dealer[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static getById = async({id}) => {
        const connection = await pool.getConnection();
        try {
            const [dealer] = await connection.query(`CALL SP_LISTAR_REPARTIDOR(?)`, [id] );
            if (dealer.length === 0) {
                return {message: "Dealer not found"}
            }
            return dealer[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static create = async({input}) => {
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
            const dealer = await connection.query("CALL SP_CREAR_REPARTIDOR(?, ?, ?, ?, ?, ?, ?, ?)", [Nombre, Celular, Cedula, Direccion, Correo, Contrasena, ID_Rol, Estado]);
            const newDealer = await connection.query("CALL SP_USUARIO_ID(?)", [dealer[0].insertId]);
            return newDealer[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static delete = async({id}) => {
        const connection = await pool.getConnection();
        try {
            const [deletedDealer] = await connection.query("CALL SP_EliminarUsuario(?)", [id]);
            return deletedDealer;
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static update = async({id, input}) => {
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
        const hash = await bcrypt.hash(passwordUnencrypted, 2);
        const passwordEncrypted = hash;
        const connection = await pool.getConnection();
        try {
            const request = await connection.query("CALL SP_MODIFICAR_USUARIO(?,?,?,?,?,?,?,?,?)", [id, Nombre, Celular, Cedula, Direccion, Correo, passwordEncrypted, ID_Rol, Estado]);
            return request;
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    
}