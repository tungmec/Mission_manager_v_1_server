import request from 'supertest';
import app from '../app.js';

describe("Auth Routes test", () => {
    test("POST /api/auth/create return 400 with userName is empty", async () => {
        const response = await request(app).post("/api/auth/create").send({
            userName:'',
            password:"12345678"
        });

        expect(response.status).toEqual(400);
        expect(response.body).toHaveProperty("success", false);

    } );

})
