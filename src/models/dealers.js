import mysql from "mysql2/promise";
import pool from "../config/db.config.js";
import bcrypt from "bcrypt";

export class DealersModel {
    static getAll = async() => {
        try {
            const [dealers] = await pool.query("CALL SP_LISTARREPARTIDORES();");
            return dealers[0];
        } catch (error) {
            throw new Error(error)
        }
    }
    static getByEmail = async({email}) => {
        try {
            const [dealer] = await pool.query("CALL SP_LISTAR_EMAIL_REPARTIDOR(?)", [email] );
            return dealer[0];
        } catch (error) {
            throw new Error(error)
        }
    }
    static getById = async({id}) => {
        try {
            const [dealer] = await pool.query(`CALL SP_LISTAR_REPARTIDOR(?)`, [id] );
            if (dealer.length === 0) {
                return {message: "Dealer not found"}
            }
            return dealer[0];
        } catch (error) {
            throw new Error(error)
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
        const passwordUnencrypted = Contrasena;
        try {
            const hash = await bcrypt.hash(passwordUnencrypted, 2);
            const passwordEncrypted = hash;
            const dealer = await pool.query("CALL SP_CREAR_REPARTIDOR(?, ?, ?, ?, ?, ?, ?, ?)", [Nombre, Celular, Cedula, Direccion, Correo, passwordEncrypted, ID_Rol, Estado]);
            const newDealer = await pool.query("CALL SP_USUARIO_ID(?)", [dealer[0].insertId]);
            return newDealer[0];
        } catch (error) {
            throw new Error(error)
        }
    }
    static delete = async({id}) => {
        try {
            const [deletedDealer] = await pool.query("CALL SP_EliminarUsuario(?)", [id]);
            return deletedDealer;
        } catch (error) {
            throw new Error(error)
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
        
        try {
            const [currentPasswordRow] = await pool.query('SELECT Contrasena FROM usuarios WHERE ID_Usuario = ?', [id]);
            const currentPasswordEncrypted = currentPasswordRow[0].Contrasena;
    
            // Verificar si la contraseña ha cambiado
            let passwordEncrypted = currentPasswordEncrypted;
            if (Contrasena !== '') {
                // Generar hash para la nueva contraseña
                const hash = await bcrypt.hash(Contrasena, 2);
                passwordEncrypted = hash;
            }
    
            // Llamar al procedimiento almacenado con los datos actualizados
            const request = await pool.query('CALL SP_MODIFICAR_USUARIO(?,?,?,?,?,?,?,?,?)', [id, Nombre, Celular, Cedula, Direccion, Correo, passwordEncrypted, ID_Rol, Estado]);
            return request;
        } catch (error) {
            throw new Error(error)
        }
    }
    
}