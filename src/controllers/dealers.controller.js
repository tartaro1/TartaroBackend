import { error, success } from "../message/message.js";
import { DealersModel } from "../models/dealers.js";
import { validateDealer, validatePartialUser } from "../schemas/dealer.js";

/**
 * Controlador para las operaciones relacionadas con los distribuidores
 * @class DealersController
 */
export class DealersController {
    /**
     * Obtiene todos los distribuidores, opcionalmente filtrados por email
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.query - Los parámetros de la consulta
     * @param {string} req.query.email - El email del distribuidor para filtrar
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DealersController
     */
    static async getAll(req, res) {
        try {
            const { email } = req.query;
            if (email) {
                const dealers = await DealersModel.getByEmail({ email });
                res.status(200).json(dealers);
                // res.render("views.resultDealer.ejs", { dealers });
            } else {
                const dealers = await DealersModel.getAll();
                res.status(200).json(dealers);
                // res.render("views.dealers.ejs", { dealers });
            }
        } catch (err) {
            error(req, res, 500, "Error processing dealers");
        }
    }

    /**
     * Obtiene un distribuidor por su ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del distribuidor
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DealersController
     */
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const dealer = await DealersModel.getById({ id });
            res.json(dealer);
        } catch (err) {
            error(req, res, 404, "Dealer not found");
        }
    }

    /**
     * Crea un nuevo distribuidor
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.body - El cuerpo de la petición con los datos del distribuidor
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DealersController
     */
    static async create(req, res) {
        const input = validateDealer(req.body);
        if (input.error) {
            return res.status(400).json({ error: input.error.message });
        }
        try {
            const newDealer = await DealersModel.create({ input: input.data });
            success(req, res, 201, "Dealer created successfully");
        } catch (err) {
            error(req, res, 400, "Error while creating dealer");
        }
    }

    /**
     * Elimina un distribuidor por su ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del distribuidor
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DealersController
     */
    static async delete(req, res) {
        const { id } = req.params;
        const deletedDealer = await DealersModel.delete({ id });
        try {
            if (deletedDealer.affectedRows === 0) {
                error(req, res, 404, "Dealer not found");
            } else {
                success(req, res, 200, "Dealer deleted successfully");
            }
        } catch (err) {
            error(req, res, 500, "Error deleting dealer");
        }
    }

    /**
     * Actualiza un distribuidor por su ID
     * @param {object} req - Captura peticiones HTML
     * @param {object} req.params - Los parámetros de la ruta
     * @param {string} req.params.id - El ID del distribuidor
     * @param {object} req.body - El cuerpo de la petición con los datos actualizados del distribuidor
     * @param {object} res - Devuelve peticiones HTML
     * @memberof DealersController
     */
    static async update(req, res) {
        const { id } = req.params;
        const input = req.body;
        try {
            const updatedDealer = await DealersModel.update({ id, input });
            success(req, res, 201, "Dealer updated successfully");
        } catch (err) {
            error(req, res, 500, "Error updating dealer");
        }
    }
}
