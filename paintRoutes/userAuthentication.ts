import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import _ from "lodash";
import validateData from "../paintMiddleware/validateData";
import generateAuthenticateToken from "../paintServices/jsonWebTokenService";
import { getUserByEmailToAuthenticate } from "../paintModel/user";
import { validateEmailPassword } from "../paintValidations/userValidation";

const router = Router();

// add and update

// get
router.post(
  "/",
  [validateData(validateEmailPassword)],
  async (req: Request, res: Response) => {
    let [user] = await getUserByEmailToAuthenticate(req.body.email);
    if (user.length === 0)
      return res.status(400).send("Email not registered as user.");

    const userPassword = _.get(user[0], ["password"]);
    const validPassword = await bcrypt.compare(req.body.password, userPassword);
    if (!validPassword)
      return res.status(400).send("Invalid email or password.");

    const userToClient = _.pick(user[0], [
      "user_id",
      "email",
      "user_role",
      "staff_id",
    ]);

    const token = generateAuthenticateToken(userToClient);
    if (!token) res.status(401).send("User is not authorized.");
    return res.header("x-userauthenticate-token", token).send(userToClient);
  }
);

// delete

module.exports = router;
