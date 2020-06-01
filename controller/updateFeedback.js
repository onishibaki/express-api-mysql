const { updateFeedbacks } = require("../model");
const { updateFeedbackValidation } = require("../model/schema");
const { successResponse, validationErrorWithData } = require("../helpers");

const updateFeedbacksAsync = async (listParam) => {
  return await updateFeedbacks(listParam);
};

exports.updateFeedback = (req, res) => {
  const listParam = {
    feebackId: req.query.feedback_id,
    feedback: req.query.feedback,
  };
  updateFeedbacksAsync(updateFeedbackValidation(listParam))
    .then((result) => {
      successResponse(res);
    })
    .catch((err) => {
      validationErrorWithData(res, updateFeedbackValidation(listParam));
    });
};
