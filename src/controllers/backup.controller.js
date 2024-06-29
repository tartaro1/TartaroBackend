import { error, success } from "../message/message.js";
import { BackupsModel } from "../models/backup.js";

export class BackupsController {
    static getLatest = async(req, res) => {
        try {
            const [backup] = await BackupsModel.getLatest();
            res.json(backup);
        } catch (err) {
            error(req, res, 500, "Error getting latest backup");
        }
    }
    static create = async(req, res) => {
        try {
            const input = req.body
            const backup = await BackupsModel.create({input});
            success(req, res, 201, "Created backup");
        } catch (err) {
            error(req, res, 500, "Error creating backup");
        }
    }
}