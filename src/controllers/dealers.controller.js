import { error, success } from "../message/message.js";
import { DealersModel } from "../models/dealers.js";
import { validateDealer, validatePartialUser } from "../schemas/dealer.js";
export class DealersController {
    static getAll = async (req, res) => {
        try {
            const {email} = req.query;
            if (email) {
                const dealers = await DealersModel.getByEmail({email});
                res.status(200).json(dealers);
                // res.render("views.resultDealer.ejs", {dealers})
            } else {
                const dealers = await DealersModel.getAll();
                res.status(200).json(dealers);
                // res.render("views.dealers.ejs", {dealers});
            }
        } catch (err) {
            error(req, res, 500, "Error processing  dealers")
        }
    }
    static getById = async (req, res) => {
        try {
            const {id} = req.params;
            const dealer = await DealersModel.getById({id});
            res.json(dealer);
        } catch (err) {
            error(req, res, 404, "Dealer not found")
        }
    }
    static create = async (req, res) => {
        const input = validateDealer(req.body);
        if (input.error) {
            return res.status(400).json({error: result.error.message});;
        }
        try {
            const newDealer = await DealersModel.create({input: input.data});
            success(req, res, 201, "Dealer created successfully")
        } catch (err) {
            error(req, res, 400, "Error while creating dealer");
        }
    }
    static delete = async (req, res) => {
        const {id} = req.params;
        const deletedDealer = await DealersModel.delete({id});
        console.log(deletedDealer);
        try {
            if (deletedDealer.affectedRows === 0) {
                error(req, res, 404, "Dealer not found");
            } else {
                error(req, res, 200, "Dealer successfully");
            }
        } catch (err) {
            error(req, res, 500, "Error deleting dealer")
        }
    }
    static update = async(req, res) => {
        const {id} = req.params;
        const input = req.body;
        try {
            const updatedDealer = await DealersModel.update({id, input});
            success(req, res, 201, "Dealer updated successfully");
        } catch (err) {
            error(req, res, 500, "Error updating dealer");
        }
    }
}