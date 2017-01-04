import Comment from '../models/comment';
import User from '../models/user';

export async function create(req, res, next) {
    const commentDate = req.body;
    delete commentDate.managing;
    commentDate.pageId = req.params.id;
    commentDate.author = req.user.login;
    commentDate.userId = req.user._id;

    try {
        var comment = await Comment.create(commentDate);
    } catch ({ message }) {
        return next({
            status: 400,
            message
        });
    }

    res.json({ comment });
}

export async function getAll(req, res, next) {
    try {
        var comment = await Comment.find({});
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    res.json({ comment });
}

export async function update(req, res, next) {
    const _id = req.params.id;
    const commentDate = req.body;
    delete commentDate.managing;

    try {
        var comment = await Comment.update(_id, { body: commentDate.body });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    res.json({ comment });
}

export async function deleteCom(req, res, next) {
    let _id = req.params.id;
    const userId = req.user._id;

    try {
        var comment = await Comment.findOne({ _id });
    } catch ({ message }) {
        return next({
            status: 404,
            message: 'Page not found'
        });
    }

    if (!comment) {
        return next({
            status: 404,
            message: 'Page not found'
        });
    }

    if (userId.toString() !== comment.userId.toString()) {
        return next({
            status: 403,
            message: 'Permission denied'
        });
    }

    try {
        comment.remove();
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    return res.json({ message: 'success' });
}

export async function getCommentByUserLogin(req, res, next) {
    const { login } = req.params;

    try {
        var user = await User.findOne({ login });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    if (!user) {
        return next({
            status: 404,
            message: 'User not found'
        });
    }

    try {
        var comment = await Comment.find({ userId: user._id });
    } catch ({ message }) {
        return next({
            status: 500,
            message
        });
    }

    res.json({ comment });
}
