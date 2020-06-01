const { insertEmployees } = require("../model");
const { addEmployeeValidation } = require("../model/schema");
const { successResponse, validationErrorWithData } = require("../helpers");

const insertEmployeesAsync = async (listParam) => {
  return await insertEmployees(listParam);
};

exports.addEmployees = (req, res) => {
  const listParam = {
    firstName: req.query.firstName,
    lastName: req.query.lastName,
  };

  insertEmployeesAsync(addEmployeeValidation(listParam))
    .then((result) => {
      successResponse(res);
    })
    .catch((err) => {
      validationErrorWithData(res, addEmployeeValidation(listParam));
    });
};
