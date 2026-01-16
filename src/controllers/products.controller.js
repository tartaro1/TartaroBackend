import { error, success } from "../message/message.js";
import { validateProduct } from "../schemas/product.js";
import { ProductsService } from "../services/products.service.js";
import { ProductViewModel } from "../viewmodels/product.viewmodel.js";

const productsService = new ProductsService();

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
        const products = await productsService.list({ category });
        res.status(200).json(ProductViewModel.fromModels(products));
        // res.render("views.resultsProduct.ejs", { products });
      } else {
        const products = await productsService.list();
        res.status(200).json(ProductViewModel.fromModels(products));
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
    try {
      const products = await productsService.searchByName(name);
      return res.json(ProductViewModel.fromModels(products));
    } catch (err) {
      error(req, res, 404, "Product not found");
    }
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
    try {
      const product = await productsService.getById(id);
      if (!product) {
        return error(req, res, 404, "Product not found");
      }
      return res.json(ProductViewModel.fromModel(product));
    } catch (err) {
      error(req, res, 404, "Product not found");
    }
  }

  /**
   * Crea un nuevo producto
   * @param {object} req - Captura peticiones HTML
   * @param {object} req.body - El cuerpo de la petición con los datos del producto
   * @param {object} res - Devuelve peticiones HTML
   * @memberof ProductController
   */
  static async createProduct(req, res) {
    const result = validateProduct(req.body);
    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }
    const newProduct = await productsService.create(result.data);
    success(req, res, 201, "Product created successfully", {
      product: ProductViewModel.fromModel(newProduct)
    });
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
      const deleted = await productsService.delete(id);
      if (!deleted) {
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
      const updatedProduct = await productsService.update(id, input);
      if (!updatedProduct) {
        return error(req, res, 404, "Product update failed");
      }
      success(req, res, 200, "Product updated successfully", {
        product: ProductViewModel.fromModel(updatedProduct)
      });
    } catch (err) {
      error(req, res, 404, "Product update failed");
    }
  }
  static async stock(req, res) {
    try {
      const products = await productsService.stock();
      res.json(ProductViewModel.fromModels(products));
    } catch (err) {
      error(req, res, 500, "Product stock failed");
    }
  }
  static async top(req, res) {
    try {
      const products = await productsService.top();
      res.json(ProductViewModel.fromModels(products));
    } catch (err) {
      error(req, res, 500, err.message);
    }
  }
  static async mostSales(req, res) {
    try {
      const rows = await productsService.mostSales();
      res.json(rows.map((r) => ({
        idProducto: r.ID_Producto,
        ventas: Number(r.get("ventas")),
        producto: r.producto ? ProductViewModel.fromModel(r.producto) : null
      })));
    } catch (err) {
      error(req, res, 500, err.message);
    }
  }
}
