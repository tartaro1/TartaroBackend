import { error, success } from "../message/message.js";
import { UserModel } from "../models/users.js";
import { validateUser, validatePartialUser } from "../schemas/user.js";
export class UsersController {
    static getAll = async(req, res) => {
        try {
            const {email} = req.query;
            if (email) {
                const user = await UserModel.getByEmail({email});
                res.status(200).json(user);
                // res.render("views.resultUser.ejs", {user})
            } else {
                const users = await UserModel.getAll();
                res.status(404).json(users);
                // res.render("views.users.ejs", {users});
            }
        } catch (error) {
            error(req, res, 500, "Error getting users")
        }
    }
    static getById = async(req, res) => {
        try {
            const {id} = req.params;
            const user = await UserModel.getById({id});
            res.status(200).json(user);
        } catch (err) {
            error(req, res, 404, "User not found");
        }
    }
    static createUser = async(req, res) => { 
        const result = validateUser(req.body);
        if (result.error) {
            return res.status(400).json({ error: result.error.errors });
        }
        try {
            const newUser = await UserModel.createUser({ input: result.data });
            success(req, res, 201, "User created successfully");
        } catch (err) {
            error(req, res, 500, "Couldn't create")
        }
    }
    static deleteUser = async (req, res) => {
        const {id} = req.params;
        const result = await UserModel.deleteUser({ id });
        try {
            if (result.affectedRows === 0) {
                error(req, res, 404, "User deleted not found");
            } else {
                success(req, res, 200, "User deleted successfully");
            }
        } catch (error) {
            error(req, res, 500, "An error occurred while deleting user");
        }
    }
    static updateUser = async (req, res) => {
        const {id} = req.params;
        const input = req.body;
        try {
            const updatedUser = await UserModel.updateUser({id, input});
            success(req, res, 201, "User modified successfully");
        } catch (err) {
            error(req, res, 400, "An error occurred while updating");
        }
    }
    static loginUser = async (req, res) => {
        const input = req.body
        try {
            const response = await UserModel.login({input});
            res.json(response)
        } catch (err) {
            error(req, res, 400, "email or password incorrect");
        }
    }
    static authenticate = async(req, res) => {
        success(req, res, 200, "authenticated");
    }
    
}