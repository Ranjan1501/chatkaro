export const authorizeUser = function (permittedRoles) {
  return function (req, res, next) {
    // first get the user from the req
    user = req.user.user;

    // check if the roles on the user have any of the role in permittedRoles
    isAllowed = false;

    user.roles.map((role) => {
      if (permittedRoles.includes(role)) {
        isAllowed = true;
      }
    });

    if (!isAllowed)
      return res.status(401).json({
        status: "failed",
        message: " You are not allowed to access this",
      });

    next();
  };
};
