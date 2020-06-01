const request = require("supertest");
const assert = require("assert");
const app = require("../app");

const {
  testDeleteEmployees,
  testselectEmployeeId,
  testInsertEmployees,
  testDeleteFeedBack,
} = require("./queryData/query");

const url = "/employees/delete";

describe("Delete Employee", function () {
  beforeEach(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
    await testInsertEmployees();
  });

  after(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
  });

  describe("Delete /employees/delete", function () {
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

    it("Check Employee ID is required and only number", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).delete(url).query({
        employee_id: "",
      });

      assert.equal(res.status, 200);
      assert.equal(selectEmployee.length, 3);
      assert.deepEqual(res.body, {
        status: 0,
        message: "employee_id should be a number",
      });
    });

    it("Check Delete Employee", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).delete(url).query({
        employee_id: selectEmployee[0].employee_id,
      });
      const selectEmployeeDeleted = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.notEqual(
        selectEmployeeDeleted[0].employee_id,
        selectEmployee[0].employee_id
      );
      assert.equal(selectEmployeeDeleted.length, 2);
      assert.deepEqual(res.body, {
        status: 1,
        message: "Success",
      });
    });
  });
});
