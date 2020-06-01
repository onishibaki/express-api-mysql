request = require("supertest");
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

const url = "/employees";

describe("Select all Employees", function () {
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

  describe("GET /employees", function () {
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

    it("Check Display Employee List", async () => {
      const selectFeedId = await testselectFeedbackId();
      const selectEmpId = await testselectEmployeeId();

      const expectedResponse = {
        status: 1,
        message: "Success",
        employees: [
          {
            employee_id: selectEmpId[0].employee_id,
            firstName: "Yama",
            lastName: "Yono",
            flag: "0",
            feedbacklist: [
              {
                feedback_id: selectFeedId[0].feedback_id,
                feedback: "Good Job",
                assign_id: 0,
              },
              {
                feedback_id: selectFeedId[1].feedback_id,
                feedback: "Excellent",
                assign_id: 0,
              },
            ],
          },
          {
            employee_id: selectEmpId[1].employee_id,
            firstName: "Shi",
            lastName: "Kawa",
            flag: "0",
            feedbacklist: [
              {
                feedback_id: selectFeedId[2].feedback_id,
                feedback: "Nice Work",
                assign_id: 0,
              },
            ],
          },
          {
            employee_id: selectEmpId[2].employee_id,
            firstName: "Kyou",
            lastName: "Ha",
            flag: "0",
            feedbacklist: [
              {
                feedback_id: null,
                feedback: null,
                assign_id: null,
              },
            ],
          },
        ],
      };

      const res = await request(app).get(url);
      assert.equal(res.status, 200);
      assert.deepEqual(res.body, expectedResponse);
    });
  });
});
