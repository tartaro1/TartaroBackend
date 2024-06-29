import { error, success } from "../message/message.js";
import { ProductModel } from "../models/products.js";
import { validateProduct, validatePartialMovie } from "../schemas/product.js";
export class ProductController {
    static getAll = async(req, res) => {
        try {
            const {category} = req.query;
            if (category) {
                const products = await ProductModel.getByCategory({category});
                res.status(200).json(products);
                // res.render("views.resultsProduct.ejs", {products})
            } else {
                const products = await ProductModel.getAll();
                res.status(404).json(products);
                // res.render("views.products.ejs", {products});
            }
        } catch (err) {
            error/(req, res, 500, "Error getting products")
        }
    }
    static getByName = async(req, res) => {
        const {name} = req.params;
        const product = await ProductModel.getByName({name});
        if (product) {
            return res.json(product);
        }
        
        error(req, res,  404, "Product not found")
    }
    static getById = async(req, res) => {
        const {id} = req.params;
        const product = await ProductModel.getById({id});
        if (product) {
            return res.json(product);
        }
        error(req, res, 404, "Product not found")
    }
    static createProduct = async(req, res) => {
        const result = validateProduct(req.body);
        if (result.error) {
            return res.status(400).json({error: result.error.message});
        }
        const newProduct = await ProductModel.createProduct({input: result.data});
        success(req, res, 201, "Product created successfully")
    }
    static deleteProduct = async(req, res) => {
        const {id} = req.params;
        try {
            const result = await ProductModel.deleteProduct({ id });
            if (result.affectedRows === 0) {
                error(req, res, 404, "Product not deleted successfully");
            } else {
                success(req, res, 201, "Product deleted successfully");
            }
        } catch (err) {
            error(req, res, 500, "An error occurred while deleting")
        }
    }
    static updateProduct = async (req, res) => { 
        const { id } = req.params;
        const input = req.body;

        try {
            const updatedProduct = await ProductModel.updateProduct({ id, input });
            error(req, res, 200, "Product updated successfully")
        } catch (err) {
            error(req, res, 500, err)
        }
    }
}