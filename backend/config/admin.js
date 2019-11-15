/* 
 * Validation to verify if the user has access to the administrative area
 */

module.exports = middleware => {
  return (req, res, next) => {    
    if (req.user.admin) {
      middleware(req, res, next);
    } else {
      res.status(401).send("User is not an administrator");
    }
  };
};
