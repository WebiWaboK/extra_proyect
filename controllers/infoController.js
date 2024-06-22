// controllers/infoController.js
exports.info = (req, res) => {
    res.render('info', { user: req.user });
  };
  