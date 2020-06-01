const request = require("supertest");
const assert = require("assert");
const app = require("../app");

const {
  testDeleteEmployees,
  testInsertEmployees,
  testselectEmployeeId,
  testDeleteFeedBack,
} = require("./queryData/query");

const url = "/employees/update/flag";

describe("Update Employee Flag", function () {
  beforeEach(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
    await testInsertEmployees();
  });

  after(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
  });

  describe("PUT /employees/update/flag", function () {
    it("Check HTTP Method Negative", function (done) {
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
      const res = await request(app).put(url).query({
        employee_id: "",
        flag: 1,
      });

      assert.equal(res.status, 200);
      assert.deepEqual(res.body, {
        status: 0,
        message: "employee_id should be a number",
      });
    });

    it("Check Flag is required and only number", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        flag: "",
      });

      assert.equal(res.status, 200);
      assert.deepEqual(res.body, {
        status: 0,
        message: "flag should be a number",
      });
    });

    it("Check Flag maximum of 1 digit", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        flag: 12,
      });

      assert.equal(res.status, 200);
      assert.deepEqual(res.body, {
        status: 0,
        message: "flag should have a maximum length of 1",
      });
    });

    it("Check Update Target Employee Flag to 1", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        flag: 1,
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(selectEmployeeUpdate[1].flag, 1);
      assert.equal(
        selectEmployee[2].firstName,
        selectEmployeeUpdate[2].firstName
      );
      assert.deepEqual(res.body, { status: 1, message: "Success" });
    });
    it("Check Update Target Employee Flag to 1", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[2].employee_id,
        flag: 1,
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(selectEmployeeUpdate[2].flag, 1);
      assert.equal(
        selectEmployee[0].firstName,
        selectEmployeeUpdate[0].firstName
      );
      assert.deepEqual(res.body, { status: 1, message: "Success" });
    });
  });
});
