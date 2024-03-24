import request from "supertest";
import { server } from "../index";
import { getUserByEmail } from "../paintModel/user";
import { releaseAllConnections } from "../paintServices/databasePoolService";

describe("/api/userAuthentication", () => {
  let email: string;
  let password: string;

  const exec = async () => {
    return await request(server)
      .post("/api/userAuthentication")
      .send({ email, password });
  };

  beforeEach(() => {
    email = "jane@thepaintcompany.ca";
    password = "Penhcil2022";
  });

  afterEach(() => {
    server.close();
  });

  afterAll(async () => {
    // Perform cleanup operations
    await releaseAllConnections(); // Release database connections
  });

  // User Authenication by Email and Password
  describe("POST", () => {

    it("should return 400 if email is not provided.", async () => {
      email = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if password is not provided.", async () => {
      password = "";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if email is not valid format.", async () => {
      email = "emailNotCorrectFormat";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if email is not registered as user.", async () => {
      email = "notAValidEmail@yahoo.com";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if password is incorrect.", async () => {
      password = "notAValidPassword";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 200 if email and password are correct.", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });

    it("should return user if email and password are correct.", async () => {
      const res = await exec();
      const [userInDatabase] = await getUserByEmail(email);
      expect(res.body).toHaveProperty("user_id", userInDatabase[0].user_id);
    });

    it("should return JWT token if email and password are valid.", async () => {
      const res = await exec();
      expect(res.header).toHaveProperty("access-control-expose-headers");
      expect(res.header["access-control-expose-headers"]).toBeDefined();
    });
    
  });
});
