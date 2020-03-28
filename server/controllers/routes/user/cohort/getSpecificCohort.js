const {
  cohort: { getSpecificCohort },
} = require('../../../../database/queries');

exports.getSpecificCohort = (req, res) => {
  getSpecificCohort(req.params.cohortid)
    .then(({ rows }) => res.json(rows))
    // eslint-disable-next-line no-console
    .catch((err) => console.error(err));
};
