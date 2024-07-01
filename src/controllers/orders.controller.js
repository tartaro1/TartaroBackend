import { error, success } from "../message/message.js";
import { OrderModel } from "../models/orders.js";

export class OrdersController {
    static getAll = async(req, res) => {
        const {dealer} = req.query;
        const {dealerID} = req.query
        const {user} = req.query;
        try {
            if (dealer) {
                const orders = await OrderModel.findByDealerName({dealer});
                res.status(200).json(orders);
            } else if (user) {
                const orders = await OrderModel.findByUser({user});
                res.status(200).json(orders);
            } else if (dealerID) {
                const orders = await OrderModel.findByDealer({dealerID});
                res.status(200).json(orders);
            } else {
                const orders = await OrderModel.getAll();
                res.status(200).json(orders);
            }
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
    static getById = async(req, res) => {
        const {id} = req.params;
        try {
            const order = await OrderModel.getById({id});
            res.json(order);
        } catch (err) {
            error(req, res, 404, "Order not found")
        }
    }
    static create = async (req, res) => {
        try {
            const input = req.body;
            const order = await OrderModel.create({input})
            success(req, res, 201, "Order created successfully")
        } catch (err) {
            error(req, res, 500, "Error creating order")
        }
    }
    static update = async(req, res) => {
        const {id} = req.params;
        const input = req.body;
        try {
            const updatedOrder = await OrderModel.update({id, input});
            res.status(200).json(updatedOrder); 
        } catch (err) {
            error(req, res, 500, "Error updating Order")
        }
    }
    static updateState = async(req, res) => {
        const {id} = req.params;
        const input = req.body;
        try {
            const updatedOrder = await OrderModel.updateState({id, input});
            res.status(200).json(updatedOrder); 
        } catch (err) {
            error(req, res, 500, "Error updating order state")
        }
    }
    static delete = async(req, res) => {
        const {id} = req.params;
        try {
            const deletedOrder = await OrderModel.delete({id});
            success(req, res, 201, "Order deleted successfully")
        } catch (error) {
            error(req, res, 404, "An error occurred while deleting")
        }
    }
    static findByDealer = async(req, res) => {
        try {
            const {dealer} = req.params;
            const orderDealer = await OrderModel.findByDealer({dealer})
            res.json(orderDealer)
        } catch (err) {
            error(req, res, 404, "Couldn't find order by dealer")
        }
    } 
}