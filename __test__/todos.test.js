const request = require("supertest");
const app = require("../app");
const { Todo, User, sequelize } = require("../models");

let token;
let todos;

beforeAll(async () => {
  try {
    // create user & get token
    const user = await User.create({
      email: "test@mail.com",
      password: "rahasia",
    });

    token = user.generateToken();

    todos = await Todo.bulkCreate([
      { task: "Belajar nodejs", UserId: user.id },
      { task: "Belajar react", UserId: user.id },
    ]);
  } catch (error) {
    console.log(error);
  }
});

afterAll(async () => {
  await Todo.destroy({ truncate: true });
  await User.destroy({ truncate: true, cascade: true });
  await sequelize.close();
});

describe("Todos resource", () => {
  it("Should not be able to get all todos when token is not provided", async () => {
    const response = await request(app)
      .get("/todos")
      .set("Content-Type", "application/json");

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toBe("Unauthenticated");
  });

  it("Should be able to get all todos", async () => {
    const response = await request(app)
      .get("/todos")
      .set("Content-Type", "application/json")
      .auth(token, { type: "bearer" });

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // it("Should be able to get single todo", async () => {
  //   const response = await request(app)
  //     .get(`/todos/${todos[0].id}`)
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.id).toBeDefined();
  //   expect(response.body.task).toBeDefined();
  //   expect(response.body.UserId).toBeDefined();
  //   expect(response.body.createdAt).toBeDefined();
  //   expect(response.body.updatedAt).toBeDefined();
  // });

  // it("Should not be able to get single todo when id is invalid", async () => {
  //   const response = await request(app)
  //     .get(`/todos/5656`)
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" });

  //   expect(response.statusCode).toBe(404);
  //   expect(response.body).toEqual({
  //     error: "NotfoundError",
  //     message: "Todo is not found",
  //   });
  // });

  // it("Should be able to create new task", async () => {
  //   const response = await request(app)
  //     .post("/todos")
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" })
  //     .send({ task: "Test task" });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.id).toBeDefined();
  //   expect(response.body.task).toBe("Test task");
  //   expect(response.body.UserId).toBeDefined();
  //   expect(response.body.createdAt).toBeDefined();
  //   expect(response.body.updatedAt).toBeDefined();
  // });

  // it("Should be able to update task", async () => {
  //   const response = await request(app)
  //     .put(`/todos/${todos[0].id}`)
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" })
  //     .send({ task: "Test task edit" });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.id).toBeDefined();
  //   expect(response.body.task).toBe("Test task edit");
  //   expect(response.body.UserId).toBeDefined();
  //   expect(response.body.createdAt).toBeDefined();
  //   expect(response.body.updatedAt).toBeDefined();
  // });

  // it("Should be able to delete task", async () => {
  //   const response = await request(app)
  //     .delete(`/todos/${todos[0].id}`)
  //     .set("Content-Type", "application/json")
  //     .auth(token, { type: "bearer" });

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toEqual({
  //     message: "Task has been deleted",
  //   });
  // });
});
