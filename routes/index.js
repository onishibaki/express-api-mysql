const express = require("express");
const {
  getEmployees,
  addEmployees,
  addFeedback,
  updateEmployee,
  updateFeedback,
  updateEmpFlag,
  deleteEmployee,
} = require("../controller");

const router = express.Router();

router.get("/employees", getEmployees);

router.post("/employees/add", addEmployees);
router.post("/feedback/add", addFeedback);

router.put("/employees/update", updateEmployee);
router.put("/feedback/update", updateFeedback);
router.put("/employees/update/flag", updateEmpFlag);

router.delete("/employees/delete", deleteEmployee);

module.exports = router;
