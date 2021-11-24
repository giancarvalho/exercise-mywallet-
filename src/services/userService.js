import * as userRepository from "../repositories/userRepository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function create({ name, email, password }) {
    if (!name || !email || !password) {
        return { error: 400 };
    }

    const existingUserWithGivenEmail = await userRepository.find(email);

    if (existingUserWithGivenEmail.rows[0]) {
        return { error: 409 };
    }

    const hashedPassword = bcrypt.hashSync(password, 12);

    return userRepository.create({ name, hashedPassword, email });
}

async function authenticate({ email, password }) {
    if (!email || !password) {
        return { error: 400 };
    }

    const user = await userRepository.find(email);

    if (!user.rows[0] || !bcrypt.compareSync(password, user.rows[0].password)) {
        return { error: 401 };
    }

    const token = jwt.sign(
        {
            id: user.rows[0].id,
        },
        process.env.JWT_SECRET
    );

    return token;
}

export { create, authenticate };
