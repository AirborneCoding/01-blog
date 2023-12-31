const CustomError = require('../errors');
const { isTokenValid } = require('../utils/jwt');

// check for authentication users
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new CustomError.UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];

    try {
        const { name, userId, role } = isTokenValid({ token });
        req.user = { name, userId, role };

        next();
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication invalid');
    }
};

// authorization by role
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomError.UnauthorizedError(
                'Unauthorized to access this route'
            );
        }
        next();
    };
};

module.exports = { authenticateUser, authorizePermissions };
