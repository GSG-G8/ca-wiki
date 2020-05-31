const yup = require('yup');

const loginSchema = yup.object({
  username: yup.string().min(5).max(20).required(),
  password: yup.string().min(8).required(),
});

module.exports = loginSchema;
