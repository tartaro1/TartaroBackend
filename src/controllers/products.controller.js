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
        } catch (error) {
            res.status(500).json({error: "Error getting all products" + error.message});
        }
    }
    static getByName = async(req, res) => {
        const {name} = req.params;
        const product = await ProductModel.getByName({name});
        if (product) {
            return res.json(product);
        }
        res.status(404).json({message: 'Product not found'});
    }
    static getById = async(req, res) => {
        const {id} = req.params;
        const product = await ProductModel.getById({id});
        if (product) {
            return res.json(product);
        }
        res.status(404).json({message: 'Product not found'});
    }
    static createProduct = async(req, res) => {
        const result = validateProduct(req.body);
        if (result.error) {
            return res.status(400).json({error: result.error.message});
        }
        const newProduct = await ProductModel.createProduct({input: result.data});
        res.status(201).json(newProduct);
    }
    static deleteProduct = async(req, res) => {
        const {id} = req.params;
        try {
            const result = await ProductModel.deleteProduct({ id });
            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'Product not found' });
            } else {
                res.status(200).json({ message: 'Product deleted successfully' });
            }
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while deleting the product' });
        }
    }
    static updateProduct = async (req, res) => { 
        const { id } = req.params;
        const input = req.body;

        try {
            const updatedProduct = await ProductModel.updateProduct({ id, input });
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}