import mysql from "mysql2/promise";
import pool from "../config/db.config.js";


export class OrderModel {
    static getAll = async() => {
        try {
            const [orders] = await pool.query("CALL SP_LISTAR_PEDIDOS();");
            return orders[0];
        } catch (error) {
            throw new Error(error)
        }
    }
    static getById = async({id}) => {
        try {
            const [order] = await pool.query("CALL SP_LISTAR_PEDIDO_ID(?)", [id]);
            if (order.length === 0) {
                return {error: "Pedido not found"}
            }
            return order[0];
        } catch (error) {
            throw new Error(error)
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
        try {
            const order = await pool.query("CALL SP_INSERTAR_PEDIDO(?,?,?,?,?)", [EstadoPedido, Direccion, cliente, PrecioVenta, ID_Repartidor])
            return order;
        } catch (error) {
            throw new Error(error);
        } 
    }
    static update = async({id, input}) => {
        const {
            ID_Repartidor 
        } = input;

        try {
            const orderDealer = await pool.query("CALL SP_ACTUALIZAR_PEDIDO_REPARTIDOR(?,?)", [id, ID_Repartidor]);
            return orderDealer;
        } catch (error) {
            throw new Error(error)
        } 
    }
    static updateState = async({id, input}) => {
        const {
            EstadoPedido 
        } = input;
        try {
            const orderState = await pool.query("CALL SP_ACTUALIZAR_PEDIDO_ESTADO(?,?)", [id, EstadoPedido]);
            return orderState;
        } catch (error) {
            throw new Error(error)
        }
    }
    static delete = async({id}) => {
        try {
            const [deletedOrder] = await pool.query("CALL SP_ELIMINAR_PEDIDO(?)", [id]);
            return deletedOrder;
        } catch (error) {
            throw new Error(error)
        }
    }
    static findByDealerName = async({dealer}) => {
        try {
            const [dealerOrder] = await pool.query("CALL SP_ORDENREPARTIDOR(?)", [dealer])
            return dealerOrder[0];
        } catch (error) {
            throw new Error(error)
        }
    }
    static findByUser = async({user}) => {
        try {
            const [userOrder] = await pool.query("CALL SP_LISTAR_PEDIDOS_USUARIO(?)", [user]);
            return userOrder[0];
        } catch (error) {
            throw new Error(error)
        } 
    }
    static findByDealer = async({dealerID}) => {
        try {
            const [userOrder] = await pool.query("CALL SP_ORDEN_REPARTIDOR(?)", [dealerID]);
            return userOrder[0];
        } catch (error) {
            throw new Error(error)
        } 
    }
}