import { error, success } from "../message/message.js";
import { ProviderModel } from "../models/provider.js";

export class ProviderController {
    static getAll = async(req, res) => {
        try {
            const providers = await ProviderModel.getAll();
            res.json(providers)
        } catch (err) {
            console.error(err);
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const provider = await ProviderModel.getById({ id });
            res.status(200).json(provider);
        } catch (err) {
            error(req, res, 404, "provider not found");
        }
    }
    static create = async(req, res) => {
        try {
            const input = req.body;
            const provider = await ProviderModel.create({input});
            success(req, res, 200, "OK")
        } catch (error) {
            console.error(error);
        }
    }
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