import { error, success } from "../message/message.js";
import { CategoryModel } from "../models/category.js";

export class CategoryController {
    static getAll = async(req, res) => {
        try {
            const category = await CategoryModel.getAll();
            res.json(category);
        } catch (err) {
            error(req, res, 500, "Couldn't get category")
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const category = await CategoryModel.getById({ id });
            res.status(200).json(category);
        } catch (err) {
            error(req, res, 404, "category not found");
        }
    }
    static create = async(req, res) => {
        try {
            const input = req.body
            const category = await CategoryModel.create({input});
            success(req, res, 200, "Create category")
        } catch (err) {
            error(req, res, 500, "Error creating category")
        }
    }
    static update = async(req, res) => {
        try {
            const {id} = req.params;
            const input = req.body;
            const category = await CategoryModel.update({id, input})
            success(req, res, 201, "Update category successfully");
        } catch (err) {
            error(req, res, 500, "Error updating category");
        }
    }
    static async delete(req, res) {
        const { id } = req.params;
        const result = await CategoryModel.delete({ id });
        try {
            if (result.affectedRows === 0) {
                error(req, res, 404, "category deleted not found");
            } else {
                success(req, res, 200, "category deleted successfully");
            }
        } catch (error) {
            error(req, res, 500, "An error occurred while deleting category");
        }
    }
}