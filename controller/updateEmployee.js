const { updateEmployees } = require("../model");
const { updateEmployeeValidation } = require("../model/schema");
const { successResponse, validationErrorWithData } = require("../helpers");

const updateEmployeesAsync = async (listParam) => {
  return await updateEmployees(listParam);
};

exports.updateEmployee = (req, res) => {
  const listParam = {
    employeeId: req.query.employee_id,
    firstName: req.query.firstName,
    lastName: req.query.lastName,
  };
  updateEmployeesAsync(updateEmployeeValidation(listParam))
    .then((result) => {
      successResponse(res);
    })
    .catch((err) => {
      validationErrorWithData(res, updateEmployeeValidation(listParam));
    });
};
