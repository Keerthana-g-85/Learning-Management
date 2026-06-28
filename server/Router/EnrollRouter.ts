import express from "express";
import {
  Create,
  GetCourse,
  GetNotenroll,
  Delete,
  GetStudent,
} from "../controller/EnrollController.js";
import { authentication } from "../middleware/userAuthenticaton.js";

export const EnrollRouter = express.Router();

EnrollRouter.post("/create", authentication, Create);

EnrollRouter.get("/getcourse/:id", authentication, GetCourse);
EnrollRouter.get("/notenroll/:id", authentication, GetNotenroll);
EnrollRouter.get("/getstudent/:id", authentication, GetStudent);

EnrollRouter.delete("/delete/:id", authentication, Delete);
