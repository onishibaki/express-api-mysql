const { updateEmpFlags } = require("../model");
const { updateFlagValidation } = require("../model/schema");
const { successResponse, validationErrorWithData } = require("../helpers");

const updateEmpFlagsAsync = async (listParam) => {
  return await updateEmpFlags(listParam);
};

exports.updateEmpFlag = (req, res) => {
  const listParam = {
    employeeId: req.query.employee_id,
    flag: req.query.flag,
  };
  updateEmpFlagsAsync(updateFlagValidation(listParam))
    .then((result) => {
      successResponse(res);
    })
    .catch((err) => {
      validationErrorWithData(res, updateFlagValidation(listParam));
    });
};
