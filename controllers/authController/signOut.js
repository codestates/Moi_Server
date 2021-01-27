module.exports = (req, res, next) => {
  if (req.user) {
    res.clearCookie('accessToken');
    res.status(204).end();
  } else {
    res.status(401).end();
  }
};
