import { error, success } from "../message/message.js";
import { BillModel } from "../models/bill.js";

/**
 * Controlador para las operaciones relacionadas con las facturas
 * @class BillController
 */
export class BillController {
    /**
     * Obtiene una factura por su ID
     * @param {object} req - Objeto de solicitud Express
     * @param {object} res - Objeto de respuesta Express
     * @returns {Promise<void>}
     */
    static getById = async(req, res) => {
        const {id} = req.params;
        try {
            const bill = await BillModel.getById({id});
            res.json(bill);
        } catch (err) {
            error(req, res, 404, "Bill not found");
        }
    }
}