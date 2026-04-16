import request from "supertest";
import app from "../app.js";

describe("Health check", () => {
  test("GET /health should return 200", async () => {
    const response = await request(app).get("/health");
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("success", true);
  });

  
});
