

export class LogOutController {
    static logout = async(req, res) => {
        try {
            res.json({message: "Ha cerrado sesión"});
        } catch (error) {
            res.json(error);
        }
    }
}