const request = require("supertest");
const assert = require("assert");
const app = require("../app");

const {
  testInsertEmployees,
  testDeleteFeedBack,
  testDeleteEmployees,
  testInsertFeedBack,
  testselectEmployeeId,
  testselectFeedbackId,
} = require("./queryData/query");

const url = "/feedback/update";

describe("Update Feedback", function () {
  beforeEach(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
    await testInsertEmployees();
    const selectEmpId = await testselectEmployeeId();
    await testInsertFeedBack(selectEmpId);
  });

  after(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
  });

  describe("PUT /feedback/update", function () {
    it("Check HTTPS Method Negative", function (done) {
      request(app).post(url).expect("Content-Type", /json/).expect(
        500,
        {
          status: 5,
          message: "Internal Server Error",
        },
        done
      );
    });

    it("Check Feedback ID is required and only number", async () => {
      const res = await request(app).put(url).query({
        feedback_id: "",
        feedback: "Nice Work",
      });

      assert.equal(res.status, 200);
      assert.deepEqual(res.body, {
        status: 0,
        message: "feeback_id should be a number",
      });
    });

    it("Check Feedback is required", async () => {
      const selectFeedback = await testselectFeedbackId();
      const res = await request(app).put(url).query({
        feedback_id: selectFeedback[0].feedback_id,
        feedback: "",
      });
      const selectFeedbackUpdate = await testselectFeedbackId();

      assert.equal(res.status, 200);
      assert.equal(
        selectFeedback[0].feedback,
        selectFeedbackUpdate[0].feedback
      );
      assert.deepEqual(res.body, {
        status: 0,
        message: "Feedback is a required field",
      });
    });

    it("Check Feedback is only accept :;!,. special character", async () => {
      const selectFeedback = await testselectFeedbackId();
      const res = await request(app).put(url).query({
        feedback_id: selectFeedback[0].feedback_id,
        feedback: "Strong-",
      });
      const selectFeedbackUpdate = await testselectFeedbackId();

      assert.equal(res.status, 200);
      assert.equal(
        selectFeedback[0].feedback,
        selectFeedbackUpdate[0].feedback
      );
      assert.deepEqual(res.body, {
        status: 0,
        message: "Feedback should contain only [:;!,.] special character",
      });
    });

    it("Check Feedback Updated One", async () => {
      const selectFeedback = await testselectFeedbackId();
      const res = await request(app).put(url).query({
        feedback_id: selectFeedback[0].feedback_id,
        feedback: "Completed all task",
      });
      const selectFeedbackUpdate = await testselectFeedbackId();

      assert.equal(res.status, 200);
      assert.equal(selectFeedbackUpdate[0].feedback, "Completed all task");
      assert.equal(
        selectFeedback[1].firstName,
        selectFeedbackUpdate[1].firstName
      );
      assert.deepEqual(res.body, { status: 1, message: "Success" });
    });

    it("Check Feedback Updated One", async () => {
      const selectFeedback = await testselectFeedbackId();
      const res = await request(app).put(url).query({
        feedback_id: selectFeedback[2].feedback_id,
        feedback: "Keep it Up!",
      });
      const selectFeedbackUpdate = await testselectFeedbackId();

      assert.equal(res.status, 200);
      assert.equal(selectFeedbackUpdate[2].feedback, "Keep it Up!");
      assert.equal(
        selectFeedback[0].firstName,
        selectFeedbackUpdate[0].firstName
      );
      assert.deepEqual(res.body, { status: 1, message: "Success" });
    });
  });
});
