const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(`userPerms: ${requestUser.role}`)
  // console.log(`userPerms: ${requestUser._id.toString()} | resourceUser: ${resourceUserId}`);

  if (requestUser.role === 'admin') {
    return
  };
  if (requestUser._id.toString() === resourceUserId.toString()) {
    return
  };
  throw new CustomError.UnauthorizedError(
    'Not authorized to access this route'
  );
};

module.exports = checkPermissions;