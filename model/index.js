const knex = require("knex");
const { development } = require("../knexfile.js");
const db = knex(development);

const selectEmployees = () => {
  return db
    .from("employees")
    .leftJoin(
      "performance",
      "employees.employee_id",
      "=",
      "performance.employee_id"
    )
    .select(
      "employees.employee_id",
      "employees.firstName",
      "employees.lastName",
      "employees.flag",
      "performance.feedback",
      "performance.feedback_id",
      "performance.assign_id"
    )
    .orderBy("employees.employee_id");
};

const insertEmployees = (insertParam) => {
  const { firstName, lastName } = insertParam;
  return db("employees").insert([{ firstName: firstName, lastName: lastName }]);
};

const insertFeedback = (insertParam) => {
  const { feedback, assignId, employeeId } = insertParam;
  return db("performance").insert([
    { feedback: feedback, assign_id: assignId, employee_id: employeeId },
  ]);
};

const updateEmployees = (updateParam) => {
  const { employeeId, firstName, lastName } = updateParam;
  return db("employees").where("employee_id", "=", employeeId).update({
    firstName: firstName,
    lastName: lastName,
  });
};

const updateFeedbacks = (updateParam) => {
  const { feebackId, feedback } = updateParam;
  return db("performance").where("feedback_id", "=", feebackId).update({
    feedback: feedback,
  });
};

const updateEmpFlags = (updateParam) => {
  const { employeeId, flag } = updateParam;
  return db("employees").where("employee_id", "=", employeeId).update({
    flag: flag,
  });
};

const deleteEmployees = ({ employeeId }) => {
  return db("employees").where("employee_id", employeeId).del();
};

const deletefeedBack = ({ employeeId }) => {
  return db("performance").where("employee_id", employeeId).del();
};

module.exports = {
  selectEmployees,
  insertEmployees,
  insertFeedback,
  updateEmployees,
  updateFeedbacks,
  updateEmpFlags,
  deleteEmployees,
  deletefeedBack,
};
