import Category from '../models/category';

export async function getAll(req, res, next) {
    try {
        var category = await Category.find({});
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    res.json({ category });
}
