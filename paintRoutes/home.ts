import { Request, Response, Router } from "express";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("penhcil is the best.");
});

module.exports = router;
