import * as userService from "../services/userService.js";

async function signUp(req, res) {
    try {
        const { name, email, password } = req.body;

        const request = await userService.create({ email, name, password });

        if (request.error) {
            return res.sendStatus(request.error);
        }

        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

async function signIn(req, res) {
    try {
        const { email, password } = req.body;

        const request = await userService.authenticate({ email, password });

        if (request.error) {
            return res.sendStatus(request.error);
        }

        res.send({
            token: request.token,
        });
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export { signUp, signIn };
