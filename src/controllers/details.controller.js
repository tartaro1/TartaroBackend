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

        } catch (error) {
            res.status(500).json(error);
        }
    }
    static getOrderProducts = async (req, res) => {
        try {
            const { id } = req.params;
            const detailsOrder = await DetailsModel.getOrderProducts({ id });
            res.json(detailsOrder);
        } catch (error) {
            res.status(404).json(error);
        }
    }
    static delete = async (req, res) => {
        try {
            const { id } = req.params;
            const productsDetails = await DetailsModel.delete({ id });
            res.json(productsDetails);
        } catch (error) {
            res.status(404).json(error);
        }
    }
    static update = async (req, res) => {
        try {
            const { id } = req.params;
            const input = req.body;
            const productsDetails = await DetailsModel.update({ id, input })
            res.json(productsDetails);
        } catch (error) {
            res.status(404).json(error);
        }
    }
}