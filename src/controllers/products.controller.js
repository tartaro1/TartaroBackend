import { error, success } from "../message/message.js";
import { ProductModel } from "../models/products.js";
import { validateProduct, validatePartialMovie } from "../schemas/product.js";

/**
 * Controlador para las operaciones relacionadas con los productos
 * @class ProductController
 */
export class ProductController {
    /**
     * Sirve para listar productos según su categoría o para mostrarlos todos
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.query - Los parámetros de la consulta
     * @param {string} [req.query.category] - La categoría para filtrar los productos
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    static async getAll(req, res) {
        try {
            const { category } = req.query;
            if (category) {
                const products = await ProductModel.getByCategory({ category });
                res.status(200).json(products);
                // res.render("views.resultsProduct.ejs", { products });
            } else {
                const products = await ProductModel.getAll();
                res.status(200).json(products);
                // res.render("views.products.ejs", { products });
            }
        } catch (err) {
            error(req, res, 500, "Error getting products")
        }
    }

    /**
     * Obtiene un producto por nombre
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.name - El nombre del producto
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    static async getByName(req, res) {
        const { name } = req.params;
        const product = await ProductModel.getByName({ name });
        if (product) {
            return res.json(product);
        }
        error(req, res, 404, "Product not found");
    }

    /**
     * Obtiene un producto por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del producto
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    static async getById(req, res) {
        const { id } = req.params;
        const product = await ProductModel.getById({ id });
        if (product) {
            return res.json(product);
        }
        error(req, res, 404, "Product not found");
    }

    /**
     * Crea un nuevo producto
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos del producto
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    static async createProduct(req, res) {
        const input = req.body
        if (result.error) {
            return res.status(400).json({ error: result.error.message });
        }
        const newProduct = await ProductModel.createProduct( input );
        success(req, res, 201, "Product created successfully");
    }

    /**
     * Elimina un producto por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del producto
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    static async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const result = await ProductModel.deleteProduct({ id });
            if (result.affectedRows === 0) {
                error(req, res, 404, "Product not deleted successfully");
            } else {
                success(req, res, 201, "Product deleted successfully");
            }
        } catch (err) {
            error(req, res, 500, "An error occurred while deleting");
        }
    }

    /**
     * Actualiza un producto por ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del producto
     * @param {object} req.body - El cuerpo de la petición con los datos del producto
     * @param {object} res - Devuelve peticiones HTML
     * @memberof ProductController
     */
    static async updateProduct(req, res) {
        const { id } = req.params;
        const input = req.body;
        try {
            const updatedProduct = await ProductModel.updateProduct({ id, input });
            success(req, res, 200, "Product updated successfully");
        } catch (err) {
            error(req, res, 404, "Product update failed");
        }
    }
    static async stock(req, res) {
        try {
            const product = await ProductModel.stock();
            res.json(product);
        } catch (err) {
            error(req, res, 500, "Product stock failed");
        }
    }
    static async top(req, res) {
        try {
            const product = await ProductModel.top();
            res.json(product);
        } catch (err) {
            error(req, res, 500, err.message);
        }
    }
    static async mostSales(req, res) {
        try {
            const product = await ProductModel.mostSales();
            res.json(product);
        } catch (err) {
            error(req, res, 500, err.message);
        }
    }
}
