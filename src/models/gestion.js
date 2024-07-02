
import mysql from "mysql2/promise";
import pool from "../config/db.config.js";

export class GestionModel {
    static getLatest = async() => {
        const connection = await pool.getConnection();
        try {
            const [gestion] = await connection.query("CALL SP_GESTION()");
            return gestion[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static create = async({input}) => {
        const connection = await pool.getConnection();
        try {
            const {
                titulo,
                contenido,
                pdf_path
            } = input;
            console.log(input);
            const [gestion] = await connection.query("CALL 	SP_INSERTAR_CONTENIDO_INFORMATIVO(?, ?, ?)", [titulo, contenido, pdf_path]);
            return gestion
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
}