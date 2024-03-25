import request from "supertest";
import { server } from "../index";
import generateAuthenticateToken from "../paintServices/jsonWebTokenService";
import { releaseAllConnections } from "../paintServices/databasePoolService";

describe("/api/inventory", () => {
  let token: string;
  let user_id: number;
  let user_role: string;
  let staff_id: number;

  beforeEach(() => {
    // user is Jane
    user_id = 1;
    user_role = "MANAGER";
    staff_id = 1;
    token = generateAuthenticateToken({ user_id, user_role, staff_id });
  });

  afterEach(() => {
    server.close();
  });

  afterAll(async () => {
    // Perform cleanup operations
    await releaseAllConnections(); // Release database connections
  });

  // add and update

  // get
  describe("GET", ()=>{
    describe("/", () => {
    const exec = async () => {
      return await request(server)
        .get("/api/inventory/")
        .set("x-userAuthenticate-token", token);
    };

    it("should return 401 if client is unauthorized (invalid token", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 403 if client is not a manager", async () => {
      user_role = "";
      token = generateAuthenticateToken({ user_id, user_role, staff_id });
      const res = await exec();
      expect(res.status).toBe(403);
    });

    it("should return 200 if user is valid", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(5);
      expect(
        res.body.some((s: { grid: string }) => s.grid === "inventory")
      ).toBeTruthy();
    });
    });
  });
  // delete
});
