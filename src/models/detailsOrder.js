import pool from "../config/db.config.js";
import mysql from "mysql2/promise"
import { config } from "dotenv";
config();


export class DetailsModel {
    static getAll = async() => {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_DATOSPEDIDOS();");
            return result[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static getByProvider = async({provider}) => {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_FILTRARPROVEEDOR(?);", [provider]);
            return result[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static getOrderProducts = async ({id}) => {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_ORDENPRODUCTOS(?)", [id]);
            return result[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static delete = async({id}) => {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_ELIMINARPRODUCTOORDEN(?)", [id]);
            return result[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static create = async({input}) => {
        const {
            ID_Pedido,
            ID_Producto,
            cantidad,
            PrecioVenta,
            Descuento
        } = input;
        const connection = await pool.getConnection();
        try {
            const detailProduct = await connection.query("CALL SP_INSERTAR_DETALLE_PEDIDO(?,?,?,?,?)", [ID_Pedido, ID_Producto, cantidad, PrecioVenta, Descuento])
            return detailProduct;
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static update = async({id, input}) => {
        const {
            Cantidad 
        } = input;
        const connection = await pool.getConnection();
        try {
            const detailsProducts = await connection.query("CALL SP_MODIFICAR_DETALLEPEDIDO(?,?)", [id, Cantidad]);
            return detailsProducts;
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
}