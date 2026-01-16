import { error, success } from "../message/message.js";
import { BillsService } from "../services/bills.service.js";
import { BillViewModel } from "../viewmodels/bill.viewmodel.js";

const billsService = new BillsService();

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
  static getById = async (req, res) => {
    const { id } = req.params;
    try {
      const bill = await billsService.getById(id);
      if (!bill) {
        return error(req, res, 404, "Bill not found");
      }
      res.json(BillViewModel.fromModelWithDetails(bill));
    } catch (err) {
      error(req, res, 404, "Bill not found");
    }
  }
}
