const request = require("supertest");
const { Movie } = require("../../models/movie");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
let server;

describe("/api/movies", () => {
  beforeAll(() => {
    server = require("../../index");
  });

  afterAll(async () => {
    await server.close();
  });

  afterEach(async () => {
    await Movie.deleteMany({});
  });

  describe("POST /", () => {
    let title;
    let token;

    const exec = () => {
      return request(server)
        .post("/api/customer")
        .set("x-auth-token", token)
        .send({ title });
    };

    beforeEach(async () => {
      token = new User().generateAuthToken();

      movie = new Movie({
        title: "title",
        genre: { name: "12345" },
        numberInStock: 10,
        dailyRentalRate: 2,
      });
      await movie.save();
    });

    it("should return 400 if customer is less than 5 charecters", async () => {
      title = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if customer is more than 50 charecters", async () => {
      title = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });
  });

  describe("PUT /", () => {
    let title;
    let token;

    const exec = () => {
      return request(server)
        .post("/api/customer")
        .set("x-auth-token", token)
        .send({ title });
    };

    beforeEach(async () => {
      token = new User().generateAuthToken();

      movie = new Movie({
        title: "title",
        genre: { name: "12345" },
        numberInStock: 10,
        dailyRentalRate: 2,
      });
      await movie.save();
    });

    it("should return 400 if customer is less than 5 charecters", async () => {
      title = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if customer is more than 50 charecters", async () => {
      title = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });
  });
});
