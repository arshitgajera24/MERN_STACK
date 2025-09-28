export const validate = (schema) => async (req, res, next) => {
    const parseResult = schema.safeParse(req.body);

    if (!parseResult.success) {
        const issues = parseResult.error.issues[0].message;

        const err = {
            status: 422,
            message: "Invalid Request Data",
            extraDetails: issues,
        };
        return next(err);
    }

    req.body = parseResult.data;
    next();
}