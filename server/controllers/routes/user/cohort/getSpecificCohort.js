const {
  cohort: { getSpecificCohort },
} = require('../../../../database/queries');

exports.getSpecificCohort = (req, res) => {
  getSpecificCohort(req.params.cohortid)
    .then(({ rows }) => res.json(rows))
    .catch((err) => console.error(err));
};
