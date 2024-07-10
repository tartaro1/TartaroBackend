import mysql from "mysql2/promise";
import pool from "../config/db.config.js";

/**
 * Modelo para operaciones relacionadas con los productos en la base de datos.
 * @class ProductModel
 */
export class ProductModel {
    /**
     * Obtiene todos los productos almacenados en la base de datos.
     * @returns {Promise<Array>} Un arreglo con todos los productos.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getAll() {
        const connection = await pool.getConnection();
        try {
            const [products] = await connection.query("CALL SP_MOSTRARPRODUCTOS();");
            return products[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Obtiene productos por categoría.
     * @param {object} params - Parámetros de búsqueda.
     * @param {string} params.category - La categoría de los productos a buscar.
     * @returns {Promise<Array>} Arreglo con los productos encontrados para la categoría especificada.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getByCategory({ category }) {
        const connection = await pool.getConnection();
        try {
            const [products] = await connection.query("CALL SP_BuscarCategoria(?);", [category]);
            if (products.length === 0) return [];
            return products[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Obtiene productos por nombre.
     * @param {object} params - Parámetros de búsqueda.
     * @param {string} params.nombre - El nombre del producto a buscar.
     * @returns {Promise<Array>} Arreglo con los productos encontrados para el nombre especificado.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getByName({ nombre }) {
        const connection = await pool.getConnection();
        try {
            const [products] = await connection.query("CALL SP_BuscarProductos(?);", [nombre]);
            if (products.length === 0) return [];
            return products;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Obtiene un producto por su ID.
     * @param {object} params - Parámetros de búsqueda.
     * @param {number} params.id - El ID del producto a buscar.
     * @returns {Promise<object|string>} El producto encontrado o un mensaje indicando que no se encontró el producto.
     * @throws {Error} Si hay un error durante la consulta.
     */
    static async getById({ id }) {
        const connection = await pool.getConnection();
        try {
            const [products] = await connection.query("CALL SP_LISTAR_PRODUCTO(?)", [id]);
            if (products.length === 0) return "Product not found";
            return products[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Crea un nuevo producto en la base de datos.
     * @param {object} params - Parámetros del nuevo producto.
     * @param {string} params.input.nombre - Nombre del nuevo producto.
     * @param {number} params.input.id_categoria - ID de la categoría del nuevo producto.
     * @param {string} params.input.marca - Marca del nuevo producto.
     * @param {number} params.input.id_proveedor - ID del proveedor del nuevo producto.
     * @param {string} params.input.descripcion - Descripción del nuevo producto.
     * @param {number} params.input.precio - Precio del nuevo producto.
     * @param {number} params.input.calificacion - Calificación del nuevo producto.
     * @param {string} params.input.imagen - URL de la imagen del nuevo producto.
     * @param {number} params.input.stock - Stock inicial del nuevo producto.
     * @returns {Promise<object>} El producto creado.
     * @throws {Error} Si hay un error durante la creación del producto.
     */
    static async createProduct( input ) {
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
        const connection = await pool.getConnection();
        try {
            const result = await connection.query("CALL SP_AÑADIR_PRODUCTO(?, ?, ?, ?, ?, ?, ?, ?, ?)", [nombre, id_categoria, marca, id_proveedor, descripcion, precio, calificacion, imagen, stock ]);
            const [product] = await connection.query("CALL SP_LISTAR_PRODUCTO(?)", [result[0].insertId]);
            return product[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Elimina un producto de la base de datos por su ID.
     * @param {object} params - Parámetros de eliminación.
     * @param {number} params.id - El ID del producto a eliminar.
     * @returns {Promise<object>} Resultado de la eliminación.
     * @throws {Error} Si hay un error durante la eliminación del producto.
     */
    static async deleteProduct({ id }) {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_EliminarProdu(?)", [id]);
            return result;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }

    /**
     * Actualiza un producto en la base de datos por su ID.
     * @param {object} params - Parámetros de actualización.
     * @param {number} params.id - El ID del producto a actualizar.
     * @param {object} params.input - Datos actualizados del producto.
     * @param {string} params.input.NombreProducto - Nuevo nombre del producto.
     * @param {number} params.input.ID_Categoria - Nuevo ID de la categoría del producto.
     * @param {string} params.input.Marca - Nueva marca del producto.
     * @param {number} params.input.ID_Proveedor - Nuevo ID del proveedor del producto.
     * @param {string} params.input.Descripcion - Nueva descripción del producto.
     * @param {number} params.input.PrecioVenta - Nuevo precio del producto.
     * @param {number} params.input.Calificacion - Nueva calificación del producto.
     * @param {number} params.input.Disponibilidad - Nueva disponibilidad del producto.
     * @param {string} params.input.imagen - Nueva URL de la imagen del producto.
     * @param {number} params.input.stock - Nuevo stock del producto.
     * @returns {Promise<object>} Resultado de la actualización.
     * @throws {Error} Si hay un error durante la actualización del producto.
     */
    static async updateProduct({ id, input }) {
        const {
            NombreProducto,
            ID_Categoria,
            Marca,
            ID_Proveedor,
            Descripcion,
            PrecioVenta,
            Calificacion,
            imagen,
            stock
        } = input;
        const connection = await pool.getConnection();
        try {
            const result = await connection.query("CALL SP_MODIFICAR_PRODUCTO(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [id, NombreProducto, ID_Categoria, Marca, ID_Proveedor, Descripcion, PrecioVenta, Calificacion, imagen, stock]);
            return result;
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
    static async stock() {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_REPORTE_STOCK_POR_PRODUCTO()");
            return result[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    }
    static async top() {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_TOP_PRODUCTOS()");
            return result[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    } 
    static async mostSales() {
        const connection = await pool.getConnection();
        try {
            const [result] = await connection.query("CALL SP_OBTENER_PRODUCTOS_MAS_REPETIDOS();");
            return result[0];
        } catch (error) {
            throw new Error(error);
        } finally {
            connection.release();
        }
    } 
}
