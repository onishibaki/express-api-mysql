const knex = require("knex");
const { development } = require("../../knexfile.js");
const db = knex(development);

const testDeleteFeedBack = () => {
  return db("performance").del();
};

const testDeleteEmployees = () => {
  return db("employees").del();
};

const testInsertEmployees = () => {
  const employees = [
    { firstName: "Yama", lastName: "Yono" },
    { firstName: "Shi", lastName: "Kawa" },
    { firstName: "Kyou", lastName: "Ha" },
  ];
  return db("employees").insert(employees);
};
const testselectEmployeeId = () => {
  return db
    .from("employees")
    .select(
      "employees.employee_id",
      "employees.firstName",
      "employees.lastName",
      "employees.flag"
    );
};

const testselectFeedbackId = () => {
  return db
    .from("performance")
    .select(
      "performance.feedback_id",
      "performance.feedback",
      "performance.assign_id",
      "performance.employee_id"
    )
    .orderBy("performance.feedback_id");
};

const testInsertFeedBack = (data) => {
  feedback = [
    {
      feedback: "Good Job",
      assign_id: 0,
      employee_id: data[0].employee_id,
    },
    {
      feedback: "Excellent",
      assign_id: 0,
      employee_id: data[0].employee_id,
    },
    {
      feedback: "Nice Work",
      assign_id: 0,
      employee_id: data[1].employee_id,
    },
  ];

  return db("performance").insert(feedback);
};

module.exports = {
  testInsertEmployees,
  testDeleteFeedBack,
  testDeleteEmployees,
  testInsertFeedBack,
  testselectEmployeeId,
  testselectFeedbackId,
};
