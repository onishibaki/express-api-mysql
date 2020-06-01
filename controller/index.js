const { getEmployees } = require("./getEmployee");
const { addEmployees } = require("./addEmployee");
const { addFeedback } = require("./addFeedback");
const { updateEmployee } = require("./updateEmployee");
const { updateFeedback } = require("./updateFeedback");
const { updateEmpFlag } = require("./updateEmpFlag");
const { deleteEmployee } = require("./deleteEmployee");

module.exports = {
  getEmployees,
  addEmployees,
  addFeedback,
  updateEmployee,
  updateFeedback,
  updateEmpFlag,
  deleteEmployee,
};
