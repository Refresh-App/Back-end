const app = require("../index.js");
const supertest = require("supertest");
const req = supertest(app);

describe("Register, Login and delete a standard user using the local stratagey", () => {

  afterAll(done => {
    req.end()
    app.close(done);
  });

  let token;
  const testUser = {
    email: "testyMc"+ Date.now()+ "test@Testerson.com",
    password: "secretSquirl"
  };

  it("Regiters Test User", async done => {
    const res = await req.post("/register").send(testUser);
    console.log('res.body',res.body)
    token = res.body.token;
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("user_profile");
    expect(res.body).toHaveProperty("token");
    return done();
  });

  it("Deletes Test User", async done => {
    const res = await req.delete("/deleteme").set("Authorization", token);
    console.log('reszzzzzzzzz',res.body)
    expect(res.status).toBe(200);
    return done();
  });
});
