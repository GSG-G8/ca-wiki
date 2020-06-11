const getSecret = async (req, res, next) => {
  try {
    res.json({
      statusCode: 200,
      data: {
        REACT_APP_VIEW_ID: process.env.REACT_APP_VIEW_ID,
        REACT_APP_CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getSecret;
