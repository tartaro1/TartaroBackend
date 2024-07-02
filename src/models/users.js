import mysql from "mysql2/promise"
import pool from "../config/db.config.js";
import bcrypt from "bcrypt";
import { match } from "assert";
import jwt from "jsonwebtoken";

export class UserModel {
    static getAll = async() => {
        try {
            const [users] = await pool.query("CALL SP_LISTAR_USUARIOS();");
            return users[0];
        } catch (error) {
            throw new Error(error);
        } 
    }
    static getByEmail = async({email}) => {
        try {
            const [user] = await pool.query("CALL SP_USUARIOS_EMAIL(?)", [email] );
            return user[0];
        } catch (error) {
            throw new Error(error)
        }
        
    }
    static getById = async({id}) => {
        try {
            if (id) {
                const [user] = await pool.query("CALL SP_USUARIO_ID(?)", [id]);
                if (user.length == 0) return {message: "User not found"};
                return user[0];
            } 
        } catch (error) {
            throw new Error(error)
        }
        
    }
    static createUser = async ({input}) => {
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
            const result = await pool.query("CALL RegistrarUsuario(?, ?, ?, ?, ?, ?, ?, ?)", [Nombre, Celular, Cedula, Direccion, Correo, passwordEncrypted, ID_Rol, Estado]);
            const [user] = await pool.query("CALL SP_USUARIO_ID(?)", result[0].insertId);
            return user;
        } catch (error) {
            throw new Error(error)
        }
    }
    static deleteUser = async({id}) => {
        try {
            const [result] = await pool.query("CALL SP_EliminarUsuario(?)", [id]);
            return result;
        } catch (error) {
            throw new Error(error)
        }
    }
    static updateUser = async ({ id, input }) => {
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
    static login = async ({input}) => {
        const {Correo, Contrasena} = input;
        try {
            const [request] = await pool.query("CALL SP_VERIFICAR_ROLES(?)", [Correo]);
            console.log(request);
            if (request[0].length === 0) {
                throw new Error("User not found");
            }
            const match = await bcrypt.compare(Contrasena, request[0][0].Contrasena);
            if (!match) {
                throw new Error("Password incorrect");
            }
    
            let payload = {
                Correo: request[0][0].Correo,
                Rol: request[0][0].ID_Rol
            };
    
            let token = jwt.sign(payload, process.env.TOKEN_PRIVATEKEY, {
                expiresIn: process.env.TOKEN_EXPIRES_IN
            });
    
            return { token, role: request[0][0].ID_Rol };
    
        } catch (error) {
            throw new Error(error.message);
        }
    }
}