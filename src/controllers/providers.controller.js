import { error, success } from "../message/message.js";
import { ProviderModel } from "../models/provider.js";

/**
 * Controlador para las operaciones relacionadas con los proveedores
 * @class ProviderController
 */
export class ProviderController {
    /**
     * Obtiene todos los proveedores
     * @param {object} req - Objeto de solicitud Express
     * @param {object} res - Objeto de respuesta Express
     * @returns {Promise<void>}
     */
    static getAll = async(req, res) => {
        try {
            const providers = await ProviderModel.getAll();
            res.json(providers)
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Obtiene un proveedor por su ID
     * @param {object} req - Objeto de solicitud Express
     * @param {object} res - Objeto de respuesta Express
     * @returns {Promise<void>}
     */
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const provider = await ProviderModel.getById({ id });
            res.status(200).json(provider);
        } catch (err) {
            error(req, res, 404, "provider not found");
        }
    }

    /**
     * Crea un nuevo proveedor
     * @param {object} req - Objeto de solicitud Express
     * @param {object} res - Objeto de respuesta Express
     * @returns {Promise<void>}
     */
    static create = async(req, res) => {
        try {
            const input = req.body;
            const provider = await ProviderModel.create({input});
            success(req, res, 200, "OK")
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Actualiza un proveedor existente
     * @param {object} req - Objeto de solicitud Express
     * @param {object} res - Objeto de respuesta Express
     * @returns {Promise<void>}
     */
    static update = async(req, res) => {
        try {
            const {id} = req.params;
            const input = req.body;
            const provider = await ProviderModel.update({id, input});
            success(req, res, 200, "OK")
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * Elimina un proveedor
     * @param {object} req - Objeto de solicitud Express
     * @param {object} res - Objeto de respuesta Express
     * @returns {Promise<void>}
     */
    static async delete(req, res) {
        const { id } = req.params;
        const result = await ProviderModel.delete({ id });
        try {
            if (result.affectedRows === 0) {
                error(req, res, 404, "Provider deleted not found");
            } else {
                success(req, res, 200, "Provider deleted successfully");
            }
        } catch (error) {
            error(req, res, 500, "An error occurred while deleting provider");
        }
    }
}