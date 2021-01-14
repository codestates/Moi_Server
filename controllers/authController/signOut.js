module.exports = (req, res, next) => {
  if (req.user) {
    res.clearCookie('accessToken');
    res.json({ signout: true });
  } else {
    res.status(400).json({ signout: false });
  }
};
