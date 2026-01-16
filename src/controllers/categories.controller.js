import { error, success } from "../message/message.js";
import { CategoriesService } from "../services/categories.service.js";
import { CategoryViewModel } from "../viewmodels/category.viewmodel.js";

const categoriesService = new CategoriesService();

export class CategoryController {
  static getAll = async (req, res) => {
    try {
      const categories = await categoriesService.list();
      res.json(CategoryViewModel.fromModels(categories))
    } catch (err) {
      error(req, res, 500, "Error getting categories");
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const category = await categoriesService.getById(id);
      if (!category) {
        return error(req, res, 404, "category not found");
      }
      res.status(200).json(CategoryViewModel.fromModel(category));
    } catch (err) {
      error(req, res, 404, "category not found");
    }
  }

  static create = async (req, res) => {
    try {
      const input = req.body;
      const category = await categoriesService.create({
        Nombre: input.Nombre,
        Descripcion: input.Descripcion,
        EstadoCategoria: input.EstadoCategoria
      });
      success(req, res, 200, "OK", { category: CategoryViewModel.fromModel(category) })
    } catch (errorValue) {
      error(req, res, 500, "Error creating category");
    }
  }

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      const input = req.body;
      const category = await categoriesService.update(id, input);
      if (!category) {
        return error(req, res, 404, "category not found");
      }
      success(req, res, 200, "OK", { category: CategoryViewModel.fromModel(category) })
    } catch (errorValue) {
      error(req, res, 500, "Error updating category");
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    try {
      const deleted = await categoriesService.delete(id);
      if (!deleted) {
        error(req, res, 404, "Category deleted not found");
      } else {
        success(req, res, 200, "Category deleted successfully");
      }
    } catch (errorValue) {
      error(req, res, 500, "An error occurred while deleting category");
    }
  }
}
