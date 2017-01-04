import Category from '../../models/category';

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

export async function create(req, res, next) {
    const categoryDate = req.body;
    categoryDate.breadcrumbs = categoryDate.breadcrumbs.match(/\d+/g);

    try {
        var category = await Category.create(categoryDate);
    } catch ({ message }) {
        return next({
            status: 400,
            message
        });
    }

    res.json({ category });
}

export async function update(req, res, next) {
    const _id = req.params.id;
    const breadcrumbs = req.body.breadcrumbs.match(/\d+/g);
    console.log(req.body.name);

    try {
        var category = await Category.update(_id, {
            name: req.body.name,
            breadcrumbs: breadcrumbs
        });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    res.json({ category });
}

export async function deleteCat(req, res, next) {
    let _id = req.params.id;

    try {
        var category = await Category.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 404,
            message
        });
    }

    try {
        category.remove();
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    return res.json({ message: 'success' });
}