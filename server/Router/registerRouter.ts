import express from "express";
import {
  Create,
  Get,
  GetInstructor,
  GetStudent,
  Login,
  UpdateUser,
  Delete,
  Search,
  FilterRole,
} from "../controller/RegisterController.js";
import { authentication } from "../middleware/userAuthenticaton.js";

export const registerRouter = express.Router();

registerRouter.post("/create", Create);
registerRouter.post("/login", Login);

registerRouter.get("/getstudent", authentication, GetStudent);
registerRouter.get("/getinstructor", authentication, GetInstructor);
registerRouter.get("/get", authentication, Get);
registerRouter.get("/getsearch/:search", authentication, Search);
registerRouter.get("/filter/:role", authentication, FilterRole);

registerRouter.put("/update/:id", authentication, UpdateUser);

registerRouter.delete("/delete/:id", authentication, Delete);
