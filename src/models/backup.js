
import mysql from "mysql2/promise";
import pool from "../config/db.config.js";

export class BackupsModel {
    static getLatest = async() => {
        const connection = await pool.getConnection();
        try {
            const [backup] = await connection.query("CALL SP_FECHACOPIA()");
            return backup[0];
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
                NombreBd,
                VersionBd,
                Tipo,
                Ubicacion, 
                Informacion
            } = input;
            console.log(input);
            const [backup] = await connection.query("CALL SP_CREARCOPIA(?, ?, ?, ?, ?)", [NombreBd, VersionBd, Tipo, Ubicacion, Informacion]);
            return backup
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
}