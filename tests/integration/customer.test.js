const request = require("supertest");
const { Customer } = require("../../models/customer");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
let server;

describe("/api/customer", () => {
  beforeAll(() => {
    server = require("../../index");
  });

  afterAll(async () => {
    await server.close();
  });

  afterEach(async () => {
    await Customer.deleteMany({});
  });

  describe("POST /", () => {
    let name;

    const exec = () => {
      return request(server).post("/api/customer").send({ name });
    };

    beforeEach(async () => {
      customer = new Customer({
        name: "12345",
        isGold: true,
        phone: "12345",
      });
      await customer.save();
    });

    it("should return 400 if customer is less than 5 charecters", async () => {
      name = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if customer is more than 50 charecters", async () => {
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });
  });

  describe("PUT /", () => {
    let name;
    let token;

    const exec = () => {
      return request(server)
        .post("/api/customer")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(async () => {
      customer = new Customer({
        name: "12345",
        isGold: true,
        phone: "12345",
      });
      await customer.save();

      token = new User().generateAuthToken();
    });

    it("should return 400 if customer is less than 5 charecters", async () => {
      name = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if customer is more than 50 charecters", async () => {
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });
  });
});
