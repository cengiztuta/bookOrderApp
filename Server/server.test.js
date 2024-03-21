const request = require("supertest");
const app = require("./server");
describe("GET /", () => {
  it("responds with 200 OK", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});

describe("GET /books", () => {
  it("responds with 200 OK", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST /book", () => {
  it("should respond with a 400 status code for validation error", async () => {
    const response = await request(app).post("/book").send({
      title: "title",
      author: "author",
      pageNum: "pageNum",
      ISBN: "ISBN",
    });

    console.log(response.body);
    console.log(response.statusCode);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("pageNum should be a number");
  });
});
