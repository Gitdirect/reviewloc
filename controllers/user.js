import * as userService from '../services/userService';

export async function getCurrentUser(req, res, next) {
    const { token } = req;

    try {
        var user = await userService.getUserByToken(token);
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    return res.json(user);
}