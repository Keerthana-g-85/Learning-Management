import {
  Create,
  GetAll,
  Update,
  Delete,
} from "../controller/CourseController.js";
import { authentication } from "../middleware/userAuthenticaton.js";
import express from "express";

export const CourseRouter = express.Router();

CourseRouter.post("/create", authentication, Create);

CourseRouter.get("/get", authentication, GetAll);


CourseRouter.put("/update/:id", authentication, Update);

CourseRouter.delete("/delete/:id", authentication, Delete);
