const request = require("supertest");
const app = require("../app");
const { sequelize, User } = require("../models");

afterAll(() => {
  User.destroy({ truncate: true, cascade: true })
    .then(() => {
      sequelize.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

describe("Authentication test", () => {
  it("Should be able to register with valid data", async () => {
    const response = await request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send({ email: "test@mail.com", password: "rahasia" });

    console.log(response.body)

    expect(response.statusCode).toBe(201)

    expect(response.body.id).toBeDefined()
    expect(response.body.email).toBeDefined()
    expect(response.body.createdAt).toBeDefined()
    expect(response.body.updatedAt).toBeDefined()

    expect(typeof response.body.id).toBe("number")
    expect(typeof response.body.email).toBe("string")
    expect(typeof response.body.createdAt).toBe("string")
    expect(typeof response.body.updatedAt).toBe("string")

    expect(response.body.email).toBe("test@mail.com")
  });

  it("Can't register with invalid email length", async () => {
    const response = await request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send({ email: "zMQ0X28GFcNOBfytnWvPZCRAMc4ngyJH7d8Da1lskqzGVeIpUDrzMEcTzUgsYf6m0jN4FHJaisdjoajodjojdoiasodrV7oOXgwIbWAnjSRdGQ3CxYO5VRqPmKc6Tb1x8v9zD8LehIu0vVLK92OU7yAkXTtrBmLwbyBGlRzvFSpnrwiu0gyP1Uxqfb9MOMiT2QpGbx4oMhWtBaPIKqp8MYATyPNCMWpyzquOvBCS5anNeW@RqH1GFaXj2H4ZgEr8uOcqNB9fKo3QniYSPkM1MZoWA5B6Ld4SyFcrqlVOwbFPDCvxLfVIKBml8jR0Z1dsEyqTxZclE5aPs5ak1KdVfiWPn53wFS2vURHfiErNfjQZPBHFVpfMfMS3DfuCjJcQOfrzmaUe2Apk4szvQxGXze1MAoU2LtEq.com", password: "rahasia" });

    console.log(response.body)

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBeDefined()
    expect(typeof response.body.error).toBe("string")
    expect(response.body.error).toBe("value too long for type character varying(255)")
  });

  it("Can't register with empty email", async () => {
    const response = await request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send({ email: null, password: "rahasia" });

    console.log(response.body)

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBeDefined()
    expect(typeof response.body.error).toBe("string")
    expect(response.body.error).toBe("null value in column \"email\" of relation \"Users\" violates not-null constraint")
  });

  it("Can't register with empty password", async () => {
    const response = await request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send({ email: "test@mail.com", password: null });

    console.log(response.body)

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBeDefined()
    expect(typeof response.body.error).toBe("string")
    expect(response.body.error).toBe("data and salt arguments required")
  });

  it("Can't register with used email", async () => {
    await request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send({ email: "test@mail.com", password: "rahasia" });

    const response = await request(app)
      .post("/register")
      .set("Content-Type", "application/json")
      .send({ email: "test@mail.com", password: "password" });

    console.log(response.body)

    expect(response.statusCode).toBe(500)
    expect(response.body.error).toBeDefined()
    expect(typeof response.body.error).toBe("string")
    expect(response.body.error).toBe("Validation error")
  });

  it("Should be able to login with valid data", async () => {
    const response = await request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({ email: "test@mail.com", password: "rahasia" });

    console.log(response.body)

    expect(response.statusCode).toBe(200)

    expect(response.body.token).toBeDefined()
    expect(typeof response.body.token).toBe("string")
  });

  it("Should not be able to login when email is invalid", async () => {
    const response = await request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({ email: "test-invalid@mail.com", password: "rahasia" });

    console.log(response.body)
    expect(response.statusCode).toBe(401);
    
    expect(response.body.error).toBeDefined()
    expect(response.body.message).toBeDefined()

    expect(response.body.error).toBe("Unauthenticated")
    expect(response.body.message).toBe("Invalid email or password")

    expect(typeof response.body.error).toBe("string")
    expect(typeof response.body.message).toBe("string")
  });

  it("Should not be able to login when password is invalid", async () => {
    const response = await request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({ email: "test@mail.com", password: "rahasiaaaa" });

    console.log(response.body)

    expect(response.statusCode).toBe(401);

    expect(response.body.error).toBeDefined()
    expect(response.body.message).toBeDefined()

    expect(response.body.error).toBe("Unauthenticated");
    expect(response.body.message).toBe("Invalid email or password");

    expect(typeof response.body.error).toBe("string")
    expect(typeof response.body.message).toBe("string")
  });

  it("Should not be able to login when password is empty", async () => {
    const response = await request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({ email: "test@mail.com", password: null });

    console.log(response.body)

    expect(response.statusCode).toBe(401);

    expect(response.body.error).toBeDefined()
    expect(response.body.message).toBeDefined()

    expect(response.body.error).toBe("Unauthenticated");
    expect(response.body.message).toBe("Invalid email or password");

    expect(typeof response.body.error).toBe("string")
    expect(typeof response.body.message).toBe("string")
  });

  it("Should not be able to login when email is empty", async () => {
    const response = await request(app)
      .post("/login")
      .set("Content-Type", "application/json")
      .send({ email: null, password: "password" });

    console.log(response.body)

    expect(response.statusCode).toBe(401);

    expect(response.body.error).toBeDefined()
    expect(response.body.message).toBeDefined()

    expect(response.body.error).toBe("Unauthenticated");
    expect(response.body.message).toBe("Invalid email or password");

    expect(typeof response.body.error).toBe("string")
    expect(typeof response.body.message).toBe("string")
  });
});
