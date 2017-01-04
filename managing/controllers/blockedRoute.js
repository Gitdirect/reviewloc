import BlockedRoute from '../models/blockedRoute';

export async function create(req, res, next) {
    const blockedDate = req.body;
    blockedDate.method = blockedDate.method.match(/\w+/ig);

    try {
        var blocked = await BlockedRoute.create(blockedDate);
    } catch ({ message }) {
        return next({
            status: 400,
            message
        });
    }

    res.json({ blocked });
}

export async function getAll(req, res, next) {
    try {
        var blocked = await BlockedRoute.find({});
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    res.json({ blocked });
}

export async function deleteBlock(req, res, next) {
    const _id = req.params.id;

    try {
        var blocked = await BlockedRoute.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 404,
            message
        });
    }

    try {
        blocked.remove();
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    return res.json({ message: 'success' });
}

export async function update(req, res, next) {
    const _id = req.params.id;
    const blockedDate = req.body;

    console.log(_id);

    try {
        var blocked = await BlockedRoute.update(_id, blockedDate);
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    res.json({ blocked });
}