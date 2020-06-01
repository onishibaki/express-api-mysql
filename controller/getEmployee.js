const { selectEmployees } = require("../model");
const { ErrorResponse, successResponseWithData } = require("../helpers");

const employeesCalc = (data) => {
  const employeeList = [];
  const checkExistData = (dataList) => {
    const {
      employee_id,
      firstName,
      lastName,
      flag,
      feedback,
      feedback_id,
      assign_id,
    } = dataList;
    const grpfeedback = {
      feedback_id,
      feedback,
      assign_id,
    };
    const grp = {
      employee_id,
      firstName,
      lastName,
      flag,
      feedbacklist: [grpfeedback],
    };

    const checkExist = (o) => o.employee_id == employee_id;
    const checkById = employeeList.findIndex(checkExist);
    checkById < 0
      ? employeeList.push(grp)
      : employeeList[checkById].feedbacklist.push(grpfeedback);
  };

  for (let dataList of data) {
    checkExistData(dataList);
  }

  return employeeList;
};

const selectEmployeesAsync = async () => {
  return await selectEmployees();
};

exports.getEmployees = (req, res) => {
  selectEmployeesAsync()
    .then((data) => {
      successResponseWithData(res, employeesCalc(data));
    })
    .catch((err) => {
      ErrorResponse(res);
    });
};
