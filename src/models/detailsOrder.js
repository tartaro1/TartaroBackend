import pool from "../config/db.config.js";
import mysql from "mysql2/promise"
import { config } from "dotenv";
config();


export class DetailsModel {
    static getAll = async() => {
        try {
            const [result] = await pool.query("CALL SP_DATOSPEDIDOS();");
            return result[0];
        } catch (error) {
            throw new Error(error)
        }
    }
    static getByProvider = async({provider}) => {
        try {
            const [result] = await pool.query("CALL SP_FILTRARPROVEEDOR(?);", [provider]);
            return result[0];
        } catch (error) {
            throw new Error(error)
        }
    }
    static getOrderProducts = async ({id}) => {
        try {
            const [result] = await pool.query("CALL SP_ORDENPRODUCTOS(?)", [id]);
            return result[0];
        } catch (error) {
            throw new Error(error)
        }
    }
    static delete = async({id}) => {
        try {
            const [result] = await pool.query("CALL SP_ELIMINARPRODUCTOORDEN(?)", [id]);
            return result[0];
        } catch (error) {
            throw new Error(error)
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
        try {
            const detailProduct = await pool.query("CALL SP_INSERTAR_DETALLE_PEDIDO(?,?,?,?,?)", [ID_Pedido, ID_Producto, cantidad, PrecioVenta, Descuento])
            return detailProduct;
        } catch (error) {
            throw new Error(error)
        }
    }
    static update = async({id, input}) => {
        const {
            Cantidad 
        } = input;
        try {
            const detailsProducts = await pool.query("CALL SP_MODIFICAR_DETALLEPEDIDO(?,?)", [id, Cantidad]);
            return detailsProducts;
        } catch (error) {
            throw new Error(error)
        }
    }
}