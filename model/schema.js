const Joi = require("@hapi/joi");

exports.deleteValidation = (inputParam) => {
  const schema = Joi.object({
    employeeId: Joi.number().required().messages({
      "number.base": `employee_id should be a number`,
    }),
  });
  return validationParam(schema.validate(inputParam));
};

exports.addEmployeeValidation = (inputParam) => {
  const schema = Joi.object({
    firstName: Joi.string()
      .min(2)
      .max(20)
      .pattern(/^[ a-zA-Z]+$/)
      .required()
      .messages({
        "string.empty": `First Name is a required field`,
        "string.min": `First Name should have a minimum length of {#limit}`,
        "string.max": `First Name should have a maximum length of {#limit}`,
        "string.pattern.base": `First Name should contain only character`,
      }),
    lastName: Joi.string()
      .min(2)
      .max(20)
      .pattern(/^[ a-zA-Z]+$/)
      .required()
      .messages({
        "string.empty": `Last Name is a required field`,
        "string.min": `Last Name should have a minimum length of {#limit}`,
        "string.max": `Last Name should have a maximum length of {#limit}`,
        "string.pattern.base": `Last Name should contain only character`,
      }),
  }).required();

  return validationParam(schema.validate(inputParam));
};

exports.addFeedbackValidation = (inputParam) => {
  const schema = Joi.object({
    feedback: Joi.string()
      .min(2)
      .max(225)
      .pattern(/^[:;!,. a-zA-Z0-9]+$/)
      .required()
      .messages({
        "string.empty": `Feedback is a required field`,
        "string.min": `Feedback should have a minimum length of {#limit}`,
        "string.max": `Feedback should have a maximum length of {#limit}`,
        "string.pattern.base": `Feedback should contain only [:;!,.] special character`,
      }),
    employeeId: Joi.number().required().messages({
      "number.base": `employee_id should be a number`,
    }),
    assignId: Joi.number().messages({
      "number.base": `assign_id should be a number`,
    }),
  });
  return validationParam(schema.validate(inputParam));
};

exports.updateEmployeeValidation = (inputParam) => {
  const schema = Joi.object({
    employeeId: Joi.number().required().messages({
      "number.base": `employee_id should be a number`,
    }),
    firstName: Joi.string()
      .min(2)
      .max(20)
      .pattern(/^[ a-zA-Z]+$/)
      .required()
      .messages({
        "string.empty": `First Name is a required field`,
        "string.min": `First Name should have a minimum length of {#limit}`,
        "string.max": `First Name should have a maximum length of {#limit}`,
        "string.pattern.base": `First Name should contain only character`,
      }),
    lastName: Joi.string()
      .min(2)
      .max(20)
      .pattern(/^[ a-zA-Z]+$/)
      .required()
      .messages({
        "string.empty": `Last Name is a required field`,
        "string.min": `Last Name should have a minimum length of {#limit}`,
        "string.max": `Last Name should have a maximum length of {#limit}`,
        "string.pattern.base": `Last Name should contain only character`,
      }),
  });
  return validationParam(schema.validate(inputParam));
};

exports.updateFeedbackValidation = (inputParam) => {
  const schema = Joi.object({
    feebackId: Joi.number().required().messages({
      "number.base": `feeback_id should be a number`,
    }),
    feedback: Joi.string()
      .min(2)
      .max(225)
      .pattern(/^[:;!,. a-zA-Z0-9]+$/)
      .required()
      .messages({
        "string.empty": `Feedback is a required field`,
        "string.min": `Feedback should have a minimum length of {#limit}`,
        "string.max": `Feedback should have a maximum length of {#limit}`,
        "string.pattern.base": `Feedback should contain only [:;!,.] special character`,
      }),
  });
  return validationParam(schema.validate(inputParam));
};

exports.updateFlagValidation = (inputParam) => {
  const schema = Joi.object({
    employeeId: Joi.number().required().messages({
      "number.base": `employee_id should be a number`,
    }),
    flag: Joi.number().max(1).required().messages({
      "number.base": `flag should be a number`,
      "number.max": `flag should have a maximum length of {#limit}`,
    }),
  });
  return validationParam(schema.validate(inputParam));
};

const validationParam = (validation) => {
  if (Object.keys(validation).length !== 1) {
    return validation.error;
  }
  return validation.value;
};
