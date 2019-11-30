const app = require("../index"); // Link to your server file
const supertest = require("supertest");
const req = supertest(app);

describe("It should Register and Log in a user", () => {
  it("Default Route", async done => {
    const res = await req.post("/register").send({
        email:'testyMc@Testerson.com',
        password:"secretSquirl"
    });
    console.log('post',res.body)
    expect(res.status).toBe(201);
    
    done();
  });
});
