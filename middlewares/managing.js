import BlockedRoute from '../managing/models/blockedRoute';

export async function blockedRoute(req, res, next) {
    let path = req.path.match(/\/(\w+)(\/|$|\s*)/gi);
    path = String(path[0].replace(/\//g, ''));

    try {
        var blocked = await BlockedRoute.findOne({router: path });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    if (blocked !== null) {
        let str = String(blocked.method.join(' , '));
        let method = String(req.method);
        let regx = new RegExp(method, 'ig');

        if (str.regx !== null) {
            return res.json({ message: 'blocked method: ' + req.method + '' });
        }
    }

    next();
}

export async function blockedUser(req, res, next) {
    const userId = req.user._id;
}