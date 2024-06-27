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
    static update = async({id, input}) => {
        const {
            EstadoPedido, 
            Direccion, 
            Cliente, 
            PrecioVenta, 
            ID_Rol
        } = input;

        const updateFields = [];
        const params = [];

        if (EstadoPedido !== undefined) {
            updateFields.push("EstadoPedido = ?");
            params.push(EstadoPedido);
        }
        if (Cliente !== undefined) {
            updateFields.push("Cliente = ?");
            params.push(Cliente);
        }
        if (PrecioVenta !== undefined) {
            updateFields.push("PrecioVenta = ?");
            params.push(PrecioVenta);
        }
        if (Direccion !== undefined) {
            updateFields.push("Direccion = ?");
            params.push(Direccion);
        }
        if (ID_Rol !== undefined) {
            updateFields.push("ID_Rol = ?");
            params.push(ID_Rol);
        }
        if (updateFields.length === 0) {
            throw new Error("No se proporcionaron campos para actualizar");
        }

        const updateFieldsString = updateFields.join(", ");

        const connection = await pool.getConnection();
        try {
            params.push(id);
            await connection.query(`UPDATE pedidos SET ${updateFieldsString} WHERE ID_Pedido = ?`, params);
    
            
            const [rows] = await connection.query("CALL SP_LISTAR_PEDIDO_ID(?)", [id]);
    
            // Verificar si el producto existe
            if (rows.length === 0) {
                throw new Error("Pedido no encontrado");
            }
    
            return rows[0];
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
    static findByDealer = async({dealer}) => {
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
}