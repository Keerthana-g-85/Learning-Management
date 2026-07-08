import express from "express";
import {
  CreateCart,
  Delete,
  Get,
} from "../controller/CartController.js";
import { authentication } from "../middleware/userAuthenticaton.js";

export const CartRouter = express.Router();

CartRouter.post("/create", authentication, CreateCart);
CartRouter.get('/get/:id' , authentication , Get)
CartRouter.delete("/delete/:id", authentication, Delete);
