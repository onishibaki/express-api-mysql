const request = require("supertest");
const assert = require("assert");
const app = require("../app");

const {
  testDeleteEmployees,
  testInsertEmployees,
  testselectEmployeeId,
  testDeleteFeedBack,
} = require("./queryData/query");

const url = "/employees/update";

describe("Update Employee", function () {
  beforeEach(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
    await testInsertEmployees();
  });

  after(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
  });

  describe("PUT /employees/update", function () {
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
        firstName: "Sarah",
        lastName: "Geneva",
      });

      assert.equal(res.status, 200);
      assert.deepEqual(res.body, {
        status: 0,
        message: "employee_id should be a number",
      });
    });

    it("Check First Name is required", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        firstName: "",
        lastName: "Geneva",
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(
        selectEmployee[1].firstName,
        selectEmployeeUpdate[1].firstName
      );
      assert.deepEqual(res.body, {
        status: 0,
        message: "First Name is a required field",
      });
    });

    it("Check Last Name is required", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        firstName: "Sarah",
        lastName: "",
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(
        selectEmployee[1].lastName,
        selectEmployeeUpdate[1].lastName
      );
      assert.deepEqual(res.body, {
        status: 0,
        message: "Last Name is a required field",
      });
    });

    it("Check First Name accept only character", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        firstName: 12,
        lastName: "Geneva",
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(
        selectEmployee[1].firstName,
        selectEmployeeUpdate[1].firstName
      );
      assert.deepEqual(res.body, {
        status: 0,
        message: "First Name should contain only character",
      });
    });

    it("Check Last Name accept only character", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        firstName: "Saraj",
        lastName: 12,
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(
        selectEmployee[1].lastName,
        selectEmployeeUpdate[1].lastName
      );
      assert.deepEqual(res.body, {
        status: 0,
        message: "Last Name should contain only character",
      });
    });

    it("Check First Name minumum of 2 character", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        firstName: "S",
        lastName: "Geneva",
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(
        selectEmployee[1].firstName,
        selectEmployeeUpdate[1].firstName
      );
      assert.deepEqual(res.body, {
        status: 0,
        message: "First Name should have a minimum length of 2",
      });
    });

    it("Check First Name maximum of 20 character", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        firstName: "Sarah Geniva Cruz Bautista Garcia Kawa",
        lastName: "Geneva",
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(
        selectEmployee[1].firstName,
        selectEmployeeUpdate[1].firstName
      );
      assert.deepEqual(res.body, {
        status: 0,
        message: "First Name should have a maximum length of 20",
      });
    });

    it("Check Last Name minumum of 2 character", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        firstName: "Saarah",
        lastName: "G",
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(
        selectEmployee[1].firstName,
        selectEmployeeUpdate[1].firstName
      );
      assert.deepEqual(res.body, {
        status: 0,
        message: "Last Name should have a minimum length of 2",
      });
    });

    it("Check Last Name maximum of 20 character", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        firstName: "Sarah",
        lastName: "Sarah Geniva Cruz Bautista Garcia Kawa",
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(
        selectEmployee[1].firstName,
        selectEmployeeUpdate[1].firstName
      );
      assert.deepEqual(res.body, {
        status: 0,
        message: "Last Name should have a maximum length of 20",
      });
    });

    it("Check Update Employee One", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[1].employee_id,
        firstName: "Sarah",
        lastName: "Geniva",
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(selectEmployeeUpdate[1].firstName, "Sarah");
      assert.equal(selectEmployeeUpdate[1].lastName, "Geniva");
      assert.equal(
        selectEmployee[2].firstName,
        selectEmployeeUpdate[2].firstName
      );
      assert.deepEqual(res.body, { status: 1, message: "Success" });
    });

    it("Check Update Employee two", async () => {
      const selectEmployee = await testselectEmployeeId();
      const res = await request(app).put(url).query({
        employee_id: selectEmployee[2].employee_id,
        firstName: "David",
        lastName: "Yama",
      });
      const selectEmployeeUpdate = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(selectEmployeeUpdate[2].firstName, "David");
      assert.equal(selectEmployeeUpdate[2].lastName, "Yama");
      assert.equal(
        selectEmployee[0].firstName,
        selectEmployeeUpdate[0].firstName
      );
      assert.deepEqual(res.body, { status: 1, message: "Success" });
    });
  });
});
