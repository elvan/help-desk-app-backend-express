exports.registerUser = (req, res) => {
  res.status(200).json({
    message: 'Register route is working',
  });
};

exports.loginUser = (req, res) => {
  res.status(200).json({
    message: 'Login route is working',
  });
};
