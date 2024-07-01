import mysql from "mysql2/promise";
import pool from "../config/db.config.js";


export class OrderModel {
    static getAll = async() => {
        const connection = await pool.getConnection();
        try {
            const [orders] = await connection.query("CALL SP_LISTAR_PEDIDOS();");
            return orders[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static getById = async({id}) => {
        const connection = await pool.getConnection();
        try {
            const [order] = await connection.query("CALL SP_LISTAR_PEDIDO_ID(?)", [id]);
            if (order.length === 0) {
                return {error: "Pedido not found"}
            }
            return order[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static create = async({input}) => {
        const {
            EstadoPedido,
            Direccion,
            cliente,
            PrecioVenta,
            ID_Repartidor
        } = input;
        const connection = await pool.getConnection();
        try {
            const order = await connection.query("CALL SP_INSERTAR_PEDIDO(?,?,?,?,?)", [EstadoPedido, Direccion, cliente, PrecioVenta, ID_Repartidor])
            return order;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
    static update = async({id, input}) => {
        const {
            ID_Repartidor 
        } = input;
        const connection = await pool.getConnection();
        try {
            const orderDealer = await connection.query("CALL SP_ACTUALIZAR_PEDIDO_REPARTIDOR(?,?)", [id, ID_Repartidor]);
            return orderDealer;
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static updateState = async({id, input}) => {
        const {
            EstadoPedido 
        } = input;
        const connection = await pool.getConnection();
        try {
            const orderState = await connection.query("CALL SP_ACTUALIZAR_PEDIDO_ESTADO(?,?)", [id, EstadoPedido]);
            return orderState;
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static delete = async({id}) => {
        const connection = await pool.getConnection();
        try {
            const [deletedOrder] = await connection.query("CALL SP_ELIMINAR_PEDIDO(?)", [id]);
            return deletedOrder;
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static findByDealerName = async({dealer}) => {
        const connection = await pool.getConnection();
        try {
            const [dealerOrder] = await connection.query("CALL SP_ORDENREPARTIDOR(?)", [dealer])
            return dealerOrder[0];
        } catch (error) {
            throw new Error(error)
        } finally {
            connection.release();
        }
    }
    static findByUser = async({user}) => {
        const connection = await pool.getConnection();
        try {
            const [userOrder] = await connection.query("CALL SP_LISTAR_PEDIDOS_USUARIO(?)", [user]);
            return userOrder[0];
        } catch (error) {
            throw new Error(error)
        } finally { 
            connection.release();
        }
    }
    static findByDealer = async({dealerID}) => {
        const connection = await pool.getConnection();
        try {
            const [userOrder] = await connection.query("CALL SP_ORDEN_REPARTIDOR(?)", [dealerID]);
            return userOrder[0];
        } catch (error) {
            throw new Error(error)
        } finally { 
            connection.release();
        }
    }
}