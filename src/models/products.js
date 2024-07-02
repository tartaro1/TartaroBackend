import mysql from "mysql2/promise";
import pool from "../config/db.config.js";
export class ProductModel {
    static getAll = async () => {
        try {
            const [products] = await pool.query("CALL SP_MOSTRARPRODUCTOS();");
            return products[0];
        } catch (error) {
            throw new Error(error)
        }
    }
    static getByCategory = async({category}) =>{
        try {
            if (category) {
                const [product] = await pool.query("CALL SP_BuscarCategoria(?);", [category]);
                if (product.length === 0) return {};
                return product[0];
            }
        } catch (error) {
            throw new Error(error)
        }
    }
    static getByName = async({nombre}) => {
        try {
            const [products] = await pool.query("CALL SP_BuscarProductos(?);", [nombre]);
            if (products.length === 0) return {};
            return products;
        } catch (error) {
            throw new Error(error)
        }
    }
    static getById = async({id}) => {
        try {
            const [products] = await pool.query("CALL SP_LISTAR_PRODUCTO(?)", [id]);
            if (products.length === 0) return "Product not found";
            return products[0];
        } catch (error) {
            throw new Error(error)
        }
    }
    static createProduct = async ({input}) => {
        const {
            nombre,
            id_categoria,
            marca,
            id_proveedor,
            descripcion,
            precio,
            calificacion,
            imagen,
            stock
        } = input;
        try {
            const result = await pool.query("CALL SP_AÑADIR_PRODUCTO(?, ?, ?, ?, ?, ?, ?, ?, ?)", [nombre, id_categoria, marca, id_proveedor, descripcion, precio, calificacion, imagen, stock ]);
            const [product] = await pool.query("CALL SP_LISTAR_PRODUCTO(?)", result[0].insertId);
            return product;
        } catch (error) {
            throw new Error(error)
        }
    }
    static deleteProduct = async ({id}) => {
        try {
            const [result] = await pool.query("CALL SP_EliminarProdu(?)", [id]);
            return result;
        } catch (error) {
            throw new Error(error)
        }
    }
    static updateProduct = async ({ id, input }) => {
        const {
            NombreProducto,
            ID_Categoria,
            Marca,
            ID_Proveedor,
            Descripcion,
            PrecioVenta,
            Calificacion,
            Disponibilidad,
            imagen,
            stock
        } = input;
        try {
            const result = await pool.query("CALL SP_MODIFICAR_PRODUCTO(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, NombreProducto, ID_Categoria, Marca, ID_Proveedor, Descripcion, PrecioVenta, Calificacion, Disponibilidad, imagen, stock]);
            return result;
        } catch (error) {
            throw new Error(error)
        }
    }
}