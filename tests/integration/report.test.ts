import httpStatus from "http-status";
import supertest from "supertest";
import app, { init } from "@/app";

beforeAll(async () => {
    await init();
});

const server = supertest(app);

describe("GET /report", () => {
    it("should respond with status 200 and report", async () => {
        const response = await server.get("/report");
        expect(response.status).toBe(httpStatus.OK);
        expect(response.body).toEqual({report: expect.any(String)});
    })
})