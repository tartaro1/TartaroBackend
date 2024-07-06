import { success } from "../message/message.js";
import { BillModel } from "../models/bill.js";

export class BillController {
    static getById = async(req, res) => {
        const {id} = req.params;
        try {
            const bill = await BillModel.getById({id});
            res.json(bill);
        } catch (err) {
            console.error(err);
        }
    }
}

