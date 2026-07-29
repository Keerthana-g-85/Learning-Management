import express from "express";
import {
  Create,
  Get,
  GetInstructor,
  GetStudent,
  Login,
  UpdateUser,
  Delete,
  Update,
  UpdatePassword
} from "../controller/UserController.js";
import { authentication } from "../middleware/userAuthenticaton.js";

export const UserRouter = express.Router();

UserRouter.post("/create", Create);
UserRouter.post("/login", Login);

UserRouter.get("/getstudent", authentication, GetStudent);
UserRouter.get("/getinstructor", authentication, GetInstructor);
UserRouter.get("/get", authentication, Get);

UserRouter.put("/update/:id", authentication, UpdateUser);
UserRouter.put("/edit/:id",authentication, Update)
UserRouter.put("/resetpassword",UpdatePassword)

UserRouter.delete("/delete/:id", authentication, Delete);
