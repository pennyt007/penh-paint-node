import { Request, Response, Router } from "express";
import { verifyUserRole } from "../paintMiddleware/verifyUserRole";
// import validateData from "../paintMiddleware/validateData";
import { buildInventory } from "../paintModel/inventory";

const router = Router();

// add and update

// get
router.get("/",  verifyUserRole("MANAGER"),
  async (req: Request, res: Response) => {
    let inventory = await buildInventory();
    if (inventory.length === 0)
      return res.status(404).send("Inventory was not found.");

    return res.status(200).send(inventory);
  }
);

// delete

module.exports = router;
