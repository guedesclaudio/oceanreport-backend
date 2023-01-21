import httpStatus from "http-status";
import supertest from "supertest";
import app, { init } from "@/app";
import { faker } from "@faker-js/faker";
import { cleanDb } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("POST /users", () => {
    describe("when body is not valid", () => {

        it("should respond with status 400 when body is not given", async () => {
            const response = await server.post("/users");
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 400 when body is not valid", async () => {
            const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
            const response = await server.post("/users").send(invalidBody);
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });
    })

    describe("when body is valid", () => {
        
        it("should respond with status 200 when body is valid", async () => {
            const body = {
                name: faker.name.firstName(),
                email: faker.internet.email(),
                password: faker.internet.password(7),
            };

            const response = await server.post("/users").send(body);
            expect(response.status).toBe(httpStatus.OK);
        });
    })
});