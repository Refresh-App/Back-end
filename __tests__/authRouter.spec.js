const app = require("../index.js");
const supertest = require("supertest");
const req = supertest(app);

describe("Register, Login and delete a standard user using the local stratagey", () => {
  let token;
  const testUser = {
    email: "testyMc@Testerson.com",
    password: "secretSquirl"
  };

  it("Regiters Test User", async done => {
    const res = await req.post("/register").send(testUser);
   
    token = res.body.token;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("user_profile");
    expect(res.body).toHaveProperty("user_profile");
    done();
  });

  it("Deletes Test User", async done => {
    const res = await req.delete("/deleteme").set("Authorization", token);
    console.log('reszzzzzzzzz',res.body)
    expect(res.status).toBe(200);
    done();
  });
});
