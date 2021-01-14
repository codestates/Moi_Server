module.exports = (req, res) => {
  if (req.user) {
    res.status(200).json({ isAuth: true });
  } else {
    res.status(400).json({ isAuth: false });
  }
};
