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
                res.status(404).json(dealers);
                // res.render("views.dealers.ejs", {dealers});
            }
        } catch (error) {
            res.json({error: error.message})
        }
    }
    static getById = async (req, res) => {
        try {
            const {id} = req.params;
            const dealer = await DealersModel.getById({id});
            res.json(dealer);
        } catch (error) {
            res.json({error: error.message});
        }
    }
    static create = async (req, res) => {
        const input = validateDealer(req.body);
        if (input.error) {
            return res.status(400).json({ error: input.error.errors });
        }
        try {
            const newDealer = await DealersModel.create({input: input.data});
            res.status(201).json(newDealer);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    static delete = async (req, res) => {
        const {id} = req.params;
        const deletedDealer = await DealersModel.delete({id});
        console.log(deletedDealer);
        try {
            if (deletedDealer.affectedRows === 0) {
                res.status(404).json({ message: 'Dealer not found' });
            } else {
                res.status(200).json({ message: 'Dealer deleted successfully' });
            }
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    static update = async(req, res) => {
        const {id} = req.params;
        const input = req.body;
        try {
            const updatedDealer = await DealersModel.update({id, input});
            res.status(200).json(updatedDealer);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}