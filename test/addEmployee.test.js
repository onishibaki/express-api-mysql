const request = require("supertest");
const assert = require("assert");
const app = require("../app");

const {
  testDeleteEmployees,
  testselectEmployeeId,
  testDeleteFeedBack,
} = require("./queryData/query");

// Prepare data for testing
const paramData = {
  firstName: "Sarah Jr",
  lastName: "Geniva",
};

const url = "/employees/add";

describe("Add Employee", function () {
  beforeEach(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
  });

  after(async function () {
    await testDeleteFeedBack();
    await testDeleteEmployees();
  });

  describe("POST /employee/add", function () {
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

    it("Check First Name is required", async () => {
      const res = await request(app)
        .post(url)
        .query({ firstName: "", lastName: "Geniva" });
      const selectEmployee = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(!selectEmployee[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "First Name is a required field",
      });
    });

    it("Check Last Name is required", async () => {
      const res = await request(app)
        .post(url)
        .query({ firstName: "Sarah", lastName: "" });
      const selectEmployee = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(!selectEmployee[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "Last Name is a required field",
      });
    });

    it("Check First Name accept only character", async () => {
      const res = await request(app)
        .post(url)
        .query({ firstName: 12, lastName: "Geniva" });
      const selectEmployee = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(!selectEmployee[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "First Name should contain only character",
      });
    });

    it("Check Last Name accept only character", async () => {
      const res = await request(app)
        .post(url)
        .query({ firstName: "Sarah", lastName: 12 });
      const selectEmployee = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(!selectEmployee[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "Last Name should contain only character",
      });
    });

    it("Check First Name minumum of 2 character", async () => {
      const res = await request(app)
        .post(url)
        .query({ firstName: "a", lastName: "Geniva" });
      const selectEmployee = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(!selectEmployee[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "First Name should have a minimum length of 2",
      });
    });

    it("Check First Name maximum of 20 character", async () => {
      const res = await request(app).post(url).query({
        firstName: "Sarah Geniva Cruz Bautista Garcia Kawa",
        lastName: "Geniva",
      });
      const selectEmployee = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(!selectEmployee[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "First Name should have a maximum length of 20",
      });
    });

    it("Check Last Name minumum of 2 character", async () => {
      const res = await request(app)
        .post(url)
        .query({ firstName: "Sarah", lastName: "a" });
      const selectEmployee = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(!selectEmployee[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "Last Name should have a minimum length of 2",
      });
    });

    it("Check Last Name maximum of 20 character", async () => {
      const res = await request(app).post(url).query({
        firstName: "Sarah ",
        lastName: "Sarah Geniva Cruz Bautista Garcia Kawa",
      });
      const selectEmployee = await testselectEmployeeId();

      assert.equal(res.status, 200);
      assert.equal(!selectEmployee[0], true);
      assert.deepEqual(res.body, {
        status: 0,
        message: "Last Name should have a maximum length of 20",
      });
    });

    it("Check Employee Inserted", async () => {
      const res = await request(app).post(url).query(paramData);
      const selectEmployee = await testselectEmployeeId();
      const { firstName, lastName } = paramData;

      assert.equal(res.status, 200);
      assert.equal(selectEmployee[0].firstName, firstName);
      assert.equal(selectEmployee[0].lastName, lastName);
      assert.deepEqual(res.body, { status: 1, message: "Success" });
    });
  });
});
