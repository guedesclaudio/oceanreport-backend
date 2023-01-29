import httpStatus from "http-status";
import supertest, { CallbackHandler } from "supertest";
import app, { init } from "@/app";
import { cleanDb } from "../helpers";
import { createPost } from "../factories";
import { createUser } from "../factories";
import jwt from  "jsonwebtoken";
import { faker } from "@faker-js/faker";
import { generateValidToken } from "../helpers";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /posts", () => {
  it("should respond with status 200 and posts list", async () => {
    const user = await createUser();
    const post = await createPost(user.id);
    const response = await server.get("/posts");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual([{
        id: post.id,
        Content: post.Content,
        Title: post.Title,
        createdAt: (post.createdAt).toISOString(),
        updatedAt: (post.updatedAt).toISOString(),
        userId: post.userId
     }]);
  });
});

describe("POST /posts", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.post("/posts");
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    
    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const response = await server.post("/posts").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    
    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.post("/posts").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("When token is valid", () => {
        it("should respond with status 400 if body is given", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.post("/posts").set("Authorization", `Bearer ${token}`);
            
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 400 if body is wrong", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const body = {
                title: faker.datatype.number(),
                content: faker.datatype.number()
            } 
            const response = await server.post("/posts").set("Authorization", `Bearer ${token}`).send(body);
            
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 201 if body is correct", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const body = {
                title: faker.datatype.string(),
                content: faker.datatype.string()
            } 
            const response = await server.post("/posts").set("Authorization", `Bearer ${token}`).send(body);
            
            expect(response.status).toBe(httpStatus.CREATED);
        });
    })
});


describe("DELETE /posts", () => {
    it("should respond with status 401 if no token is given", async () => {
        const response = await server.post("/posts");
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    
    it("should respond with status 401 if given token is not valid", async () => {
        const token = faker.lorem.word();
        const response = await server.post("/posts").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
    
    it("should respond with status 401 if there is no session for given token", async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const response = await server.post("/posts").set("Authorization", `Bearer ${token}`);
    
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("When body is valid", () => {
        it("should respond with status 400 when postId is given", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.delete("/posts").set("Authorization", `Bearer ${token}`);
            
            expect(response.status).toBe(httpStatus.NOT_FOUND);
        });

        it("should respond with status 400 when postId is invalid", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.delete("/posts/-1").set("Authorization", `Bearer ${token}`);
            
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 400 when postId is invalid", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.delete("/posts/a").set("Authorization", `Bearer ${token}`);
            
            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });

        it("should respond with status 404 when postId is not found", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const response = await server.delete("/posts/999999").set("Authorization", `Bearer ${token}`);
            
            expect(response.status).toBe(httpStatus.NOT_FOUND);
        });

        it("should respond with status 200 when postId exists", async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const post = await createPost(user.id);
            const response = await server.delete(`/posts/${post.id}`).set("Authorization", `Bearer ${token}`);
            
            expect(response.status).toBe(httpStatus.OK);
        });
    }) 
});