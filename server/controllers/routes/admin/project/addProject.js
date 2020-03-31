const { addProjectQuery } = require('../../../../database/queries');
const { addProjectSchema } = require('../../../../validation');

const addProject = async (req, res, next) => {
  try {
    await addProjectSchema.validate(req.body);
    await addProjectQuery(req.body);
    res.json({
      StatusCode: 200,
      data: { message: 'Cohort Added successfully' },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = addProject;
