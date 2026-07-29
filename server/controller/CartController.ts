import Cart from "../models/CartModel.js";
import { database } from "../server.js";
import type { RequestHandler } from "express";

export const CreateCart: RequestHandler = async (req, res) => {
  try {
    const cartRepo = database.getRepository(Cart);
    const { user, course } = req.body;
    const studuent_course = await cartRepo.findOne({
      where: { user: { id: user }, course: { id: course } },
    });

    if (studuent_course) {
      return res.status(404).send({
        success: false,
        message: "value already present",
      });
    }

    const tocart = cartRepo.create({
      user,
      course,
    });
    const addtocart = await cartRepo.save(tocart);

    const cart = await cartRepo.findOne({
      where: {
        id: addtocart.id,
      },
      relations: {
        course: true,
      },
    });

    res.status(200).send({
      success: true,
      message: "Added to cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error occured during creation",
    });
  }
};

export const Get: RequestHandler = async (req, res) => {
  try {
    const student_id = req.params.id as string;
    const cartRepo = database.getRepository(Cart);

    const course_cart = await cartRepo.find({
      where: { user: { id: student_id } },
      relations: { course: true },
    });

    const courses = course_cart.map((item) => item.course);

    res.status(200).send({
      success: true,
      message: "cart course",
      courses,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting",
    });
  }
};

export const Delete: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id as string;
    const userId = req.params.userId as string;
    console.log("Course ID:", id);
    console.log("User ID:", userId);
    const cartRepo = database.getRepository(Cart);
    const cart = await cartRepo.findOne({
      where: {
        course: {
          id,
        },
        user: {
          id: userId,
        },
      },
    });

    console.log(cart);
    await cartRepo.delete(cart.id);

    return res.status(200).send({
      success: true,
      message: "Removed from course",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting",
    });
  }
}

export const DeleteCart : RequestHandler = async(req,res)=>{
  try{
    const cartRepo = database.getRepository(Cart)
    const id = req.params.id as string 
    await cartRepo.delete({ user :{ id : id}})
    return res.status(200).send({
      success : true ,
      message : "Cart Courses are checked Out"
    })

  }catch(error){
    res.status(500).send({
      success : false ,
      message : "Error while clearing cart"
    })
  }
};
