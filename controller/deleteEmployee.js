const { deleteEmployees, deletefeedBack } = require("../model");
const { deleteValidation } = require("../model/schema");
const { successResponse, validationErrorWithData } = require("../helpers");

const deleteEmployeesAsync = async (listParam) => {
  return await deleteEmployees(listParam);
};

const deletefeedBackAsync = async (listParam) => {
  return await deletefeedBack(listParam);
};

exports.deleteEmployee = (req, res) => {
  const listParam = {
    employeeId: req.query.employee_id,
  };
  Promise.all([
    deletefeedBackAsync(deleteValidation(listParam)),
    deleteEmployeesAsync(deleteValidation(listParam)),
  ])
    .then((result) => {
      successResponse(res);
    })
    .catch((err) => {
      validationErrorWithData(res, deleteValidation(listParam));
    });
};
