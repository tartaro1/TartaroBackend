import { error, success } from "../message/message.js";
export class LogOutController {
    static logout = async(req, res) => {
        try {
            success(req, res, 200, "Logged out");
        } catch (err) {
            error(req, res, 404, "Invalid logout")
        }
    }
}