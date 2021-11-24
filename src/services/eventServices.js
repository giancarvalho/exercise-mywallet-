import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as eventRepository from "../repositories/eventRepository.js";

async function create({ value, type, token }) {
    let user;

    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return { error: 401 };
    }

    if (!value || !type) {
        return { error: 400 };
    }

    if (!["INCOME", "OUTCOME"].includes(type)) {
        return { error: 400 };
    }

    if (value < 0) {
        return { error: 400 };
    }

    return eventRepository.create({ user, value, type });
}

async function find(token) {
    if (!token) {
        return { error: 401 };
    }

    let user;

    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return { error: 401 };
    }

    return eventRepository.find(user.id);
}

async function sum(token) {
    if (!token) {
        return { error: 401 };
    }

    let user;

    try {
        user = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return { error: 401 };
    }

    const events = await eventRepository.find(user.id);

    const sum = events.rows.reduce(
        (total, event) =>
            event.type === "INCOME" ? total + event.value : total - event.value,
        0
    );

    return { sum };
}

export { create, find, sum };
