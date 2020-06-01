const { constants } = require("./constants");
const { getMessage, status } = constants;

exports.successResponse = (res) => {
  const data = {
    status: status.SUCCESS_STATUS,
    message: getMessage.SET_SUCCESS,
  };
  return res.send(data);
};

exports.successResponseWithData = (res, data) => {
  const resData = {
    status: status.SUCCESS_STATUS,
    message: getMessage.SET_SUCCESS,
    employees: data,
  };
  return res.send(resData);
};

exports.ErrorResponse = (res) => {
  const data = {
    status: status.ERROR_STATUS,
    message: getMessage.SET_DATABASE_ERROR,
  };
  return res.send(data);
};

exports.notFoundResponse = (res) => {
  const data = {
    status: 5,
    message: "Internal Server Error",
  };
  return res.status(500).send(data);
};

exports.validationErrorWithData = (res, listParam) => {
  const { message } = listParam;
  const resData = {
    status: status.ERROR_STATUS,
    message,
  };

  return res.send(resData);
};
