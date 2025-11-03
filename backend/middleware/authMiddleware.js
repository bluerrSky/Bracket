// middleware/authMiddleware.js
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { // This is a Passport.js method
        return next();
    }
    // If not authenticated, we can proceed without user data.
    // The controller will handle cases where the user is null.
    return next(); 
};

module.exports = { ensureAuthenticated };