import { error, success } from "../message/message.js";
import { DetailsModel } from "../models/detailsOrder.js";
export class DetailsController {
    static getAll = async (req, res) => {
        try {
            const { provider } = req.query;
            if (provider) {
                const detailsOrdersFiltred = await DetailsModel.getByProvider({ provider })
                res.status(200).json(detailsOrdersFiltred);
                // res.render("views.filtred.ejs", { detailsOrdersFiltred });
            } else {
                const detailsOrders = await DetailsModel.getAll();
                res.status(404).json(detailsOrders);
                // res.render("views.detailsOrder.ejs", { detailsOrders });
            }
        } catch (err) {
            error(req, res, 500, "Error processing details order")
        }
    }
    static getOrderProducts = async (req, res) => {
        try {
            const { id } = req.params;
            const detailsOrder = await DetailsModel.getOrderProducts({ id });
            res.json(detailsOrder);
        } catch (err) {
            error(req, res, 404, "Couldn't get details ")
        }
    }
    static create = async(req, res) => {
        try {
            const input = req.body;
            const productsOrder = await DetailsModel.create({input});
            success(req, res, 201, "Product inserted successfully")
        } catch (err) {
            error(req, res, "Error inserting product")
        }
    }
    static delete = async (req, res) => {
        try {
            const { id } = req.params;
            const productsDetails = await DetailsModel.delete({ id });
            success(req, res, 200, "Details deleted successfully")
        } catch (error) {
            error(req, res, 404, "Could not delete details ")
        }
    }
    static update = async (req, res) => {
        try {
            const { id } = req.params;
            const input = req.body;
            const productsDetails = await DetailsModel.update({ id, input })
            success(req, res, 201, "Successfully updated")
        } catch (error) {
            error(req, res, 404, "Error updating details" );
        }
    }
}