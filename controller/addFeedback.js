const { insertFeedback } = require("../model");
const { addFeedbackValidation } = require("../model/schema");
const { successResponse, validationErrorWithData } = require("../helpers");

const insertFeedbackAsync = async (listParam) => {
  return await insertFeedback(listParam);
};

exports.addFeedback = (req, res) => {
  const listParam = {
    feedback: req.query.feedback,
    assignId: req.query.assign_id,
    employeeId: req.query.employee_id,
  };

  insertFeedbackAsync(addFeedbackValidation(listParam))
    .then((result) => {
      successResponse(res);
    })
    .catch((err) => {
      validationErrorWithData(res, addFeedbackValidation(listParam));
    });
};
