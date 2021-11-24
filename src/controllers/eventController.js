import * as eventService from "../services/eventServices.js";

async function create(req, res) {
    try {
        const authorization = req.headers.authorization || "";
        const token = authorization.split("Bearer ")[1];

        if (!token) {
            return res.sendStatus(401);
        }
        const { value, type } = req.body;

        const request = await eventService.create({ value, type, token });

        if (request.error) {
            return res.sendStatus(request.error);
        }

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function get(req, res) {
    const authorization = req.headers.authorization || "";
    const token = authorization.split("Bearer ")[1];
    try {
        const request = await eventService.find(token);

        if (request.error) {
            return res.sendStatus(request.error);
        }

        res.send(request.rows);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function getSum(req, res) {
    const authorization = req.headers.authorization || "";
    const token = authorization.split("Bearer ")[1];
    try {
        const request = await eventService.sum(token);

        if (request.error) {
            return res.sendStatus(request.error);
        }

        res.send({ sum: request.sum });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

export { create, get, getSum };
