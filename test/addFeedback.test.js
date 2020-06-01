const request = require("supertest");
const assert = require("assert");
const app = require("../app");

const {
  testInsertEmployees,
  testDeleteFeedBack,
  testDeleteEmployees,
  testselectEmployeeId,
  testselectFeedbackId,
} = require("./queryData/query");

const url = "/feedback/add";

describe("Add Feedback", function () {
  beforeEach(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
    await testInsertEmployees();
  });

  after(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
  });

  describe("POST /feedback/add", function () {
    it("Check HTTPS Method Negative", function (done) {
      request(app).get(url).expect("Content-Type", /json/).expect(
        500,
        {
          status: 5,
          message: "Internal Server Error",
        },
        done
      );
    });

    it("Check Feedback is required", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).post(url).query({
        feedback: "",
        assign_id: 0,
        employee_id: selectEmployee[0].employee_id,
      });
      const selectFeedback = await testselectFeedbackId();

      assert.equal(res.status, 200);
      assert.equal(!selectFeedback[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "Feedback is a required field",
      });
    });

    it("Check Feedback is only accept :;!,. special character", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).post(url).query({
        feedback: "Strong-",
        assign_id: 0,
        employee_id: selectEmployee[0].employee_id,
      });
      const selectFeedback = await testselectFeedbackId();

      assert.equal(res.status, 200);
      assert.equal(!selectFeedback[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "Feedback should contain only [:;!,.] special character",
      });
    });

    it("Check Assign ID is required and only number", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).post(url).query({
        feedback: "Good Work.",
        assign_id: "",
        employee_id: selectEmployee[0].employee_id,
      });
      const selectFeedback = await testselectFeedbackId();

      assert.equal(res.status, 200);
      assert.equal(!selectFeedback[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "assign_id should be a number",
      });
    });

    it("Check Employee ID is required and only number", async () => {
      const res = await request(app).post(url).query({
        feedback: "Good Work.",
        assign_id: 0,
        employee_id: "",
      });
      const selectFeedback = await testselectFeedbackId();

      assert.equal(res.status, 200);
      assert.equal(!selectFeedback[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "employee_id should be a number",
      });
    });

    it("Check Feedback Inserted", async () => {
      const selectEmployee = await testselectEmployeeId();
      const paramData = {
        feedback: "Good Work",
        assign_id: 0,
        employee_id: selectEmployee[0].employee_id,
      };
      const res = await request(app).post(url).query(paramData);
      const selectFeedback = await testselectFeedbackId();

      assert.equal(res.status, 200);
      assert.equal(selectFeedback[0].feedback, paramData.feedback);
      assert.equal(selectFeedback[0].assign_id, paramData.assign_id);
      assert.deepEqual(res.body, { status: 1, message: "Success" });
    });
  });
});
