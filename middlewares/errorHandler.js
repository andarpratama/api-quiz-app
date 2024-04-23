const errorHandler = (err, req, res, next) => {
    let code;
    let message;

    switch (err.message) {
        case "Missing_Token":
            code = 401;
            message = "Missing Access Token";
            break;
        case "Invalid_Token":
            code = 403;
            message = "Invalid Token";
            break;
        case "Data_Not_Found":
            code = 404;
            message = "User not found";
            break;
        // Handle other errors here if needed
        default:
            code = 500;
            message = "Internal_Server_Error";
            break;
    }

    return res.status(code).json({ success: false, message });
};

export default errorHandler;
