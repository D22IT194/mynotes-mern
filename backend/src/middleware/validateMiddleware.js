import { success } from "zod";

export const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body)
            next();

        } catch (error){
            return res.status(400).json({
                success: false,

                errors: error.issues.map((err) => ( {
                    field: err.path[0],
                    message: err.message,
                })),


            });
        }
    };
};