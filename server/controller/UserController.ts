import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { RequestHandler } from "express";

import { database } from "../server.js";
import User from "../models/UserModel.js";
import { Role } from "../models/UserModel.js";

import { ILike } from "typeorm";
import { In } from "typeorm";

export const Create: RequestHandler = async (req, res) => {
  try {
    const UserRepo = database.getRepository(User);
    const { name, email, password, phoneNumber, address } = req.body;

    if (!email || !password || !name) {
      return res.status(400).send({
        success: false,
        message: "Enter required values",
      });
    }

    const existing = await UserRepo.findOne({ where: { email: email } });
    if (existing) {
      return res.status(400).send({
        success: false,
        message: "User already exist",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = UserRepo.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
    });

    const newUser = await UserRepo.save(user);

    res.status(201).send({
      success: true,
      message: "User Usered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while registration",
    });
  }
};

export const Login: RequestHandler = async (req, res) => {
  try {
    const UserRepo = database.getRepository(User);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Enter Email and Password",
      });
    }

    const exist = await UserRepo.findOneBy({ email: email });
    console.log(exist);
    if (!exist) {
      return res.status(404).send({
        success: false,
        message: "Email not yet Usered",
      });
    }

    const isMatch = await bcrypt.compare(password, exist.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    const accesstoken = jwt.sign(
      {
        id: exist.id,
        name: exist.name,
        email: exist.email,
        password: exist.password,
        address: exist.address,
        phoneNumber: exist.phoneNumber,
        role: exist.role,
      },
      process.env.JW_SECRET as string,
      { expiresIn: "1hr" },
    );

    const refreshtoken = jwt.sign(
      {
        id: exist.id,
        Name: exist.name,
        Address: exist.address,
        Phone: exist.phoneNumber,
      },
      process.env.JW_REFRESH as string,
      { expiresIn: "7d" },
    );

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).send({
      success: true,
      message: "User logged successfully",
      accesstoken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while logging in",
    });
  }
};

export const GetStudent: RequestHandler = async (req, res) => {
  try {
    const UserRepo = database.getRepository(User);

    const students = await UserRepo.find({where :{ role: Role.student } , order:{createdAt : 'ASC'} });

    res.status(200).send({
      success: true,
      message: "Students",
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting students",
    });
  }
};

export const GetInstructor: RequestHandler = async (req, res) => {
  try {
    const UserRepo = database.getRepository(User);

    const instructor = await UserRepo.find({where:{ role: Role.instructor },order:{createdAt: "DESC"}});

    res.status(200).send({
      success: true,
      message: "Instructors",
      instructor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting instructor",
    });
  }
};

export const Get: RequestHandler = async (req, res) => {
  try {
    const userRepo = database.getRepository(User);

    const search= req.query.search as string;
    const filter = req.query.filter as string
    const role = filter.split(",");

    const page = Number(req.query.page);
    const per_page = Number(req.query.per_page);

    const initial = (page - 1) * per_page;
    const final = page * per_page;
    let users ;

    if (search && filter ){
      const searchData = await userRepo.find({
      where: [
        { name: ILike(`${search}%`) },
        { email: ILike(`${search}%`) },
        { address: ILike(`%${search}%`) },
      ],
       order : {createdAt:'ASC'}
    });
      const filterData = await userRepo.find({ where: { role: In(role) } });
      users = searchData.filter((sdata)=> filterData.some((fdata)=>fdata.id === sdata.id))
    }
    else if (search){
      users = await userRepo.find({
      where: [
        { name: ILike(`${search}%`) },
        { email: ILike(`${search}%`) },
        { address: ILike(`%${search}%`) },
      ],
       order : {createdAt:'ASC'}
    });
    }
    else if (filter){
      users = await userRepo.find({ where: { role: In(role) } , order : {createdAt:'ASC'}});
    }
    else{
      users = await userRepo.find({order : {createdAt:'ASC'}})
    }

    const total_page = Math.ceil(users.length / per_page);
    const Data = users.slice(initial, final);

    res.status(200).send({
      success: true,
      message: "All users",
      Data,
      pagination: {
        total_page
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting users",
    });
  }
};

export const UpdateUser: RequestHandler = async (req, res) => {
  try {
    const UserRepo = database.getRepository(User);
    const { name, email, phoneNumber, address, role } = req.body;

    const id = req.params.id as string;
    console.log(id);
    const user = await UserRepo.findOneBy({ id });
    console.log(user);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const UpdatedUser = await UserRepo.update(
      { id: id },
      {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        role: role,
      },
    );
    res.status(200).send({
      success: true,
      message: "User Updated",
      UpdatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating",
    });
  }
};

export const Delete: RequestHandler = async (req, res) => {
  try {
    const userRepo = database.getRepository(User);
    const id = req.params.id as string;
    const student = await userRepo.findOneBy({ id: id });

    if (!student) {
      return res.status(404).send({
        success: false,
        message: "User not present",
      });
    }

    await userRepo.delete(id);

    res.status(200).send({
      success: true,
      message: "User Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting",
    });
  }
};

export const Update : RequestHandler = async (req,res) =>{
    try {
        const userRepo = database.getRepository(User)
        const id  = req.params.id as string
        const {name , email , address , phoneNumber } = req.body
        
        await userRepo.update ({id:id},{name:name , email:email , address:address , phoneNumber:phoneNumber })

        const user = await userRepo.findOneBy({id : id})

        const accesstoken = jwt.sign(
          {
            id: id,
            name:name,
            email: email,
            password: user.password,
            address: address,
            phoneNumber: phoneNumber,
            role: user.role,
          },
          process.env.JW_SECRET as string,
          { expiresIn: "1hr" },
        );

        return res.status(200).send({
            success: true,
            message:"Profile updated", 
            user,
            accesstoken
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success : false ,
            message : "error while updating"
        })
    }
}

export const UpdatePassword = async (req,res) =>{
    try{
        const userRepo = database.getRepository(User)

        const { email , oldPassword , newPassword } = req.body


        const user = await userRepo.findOneBy({email:email})
        if (!user){
          res.status(404).send({
            success:false,
            message:'Email not yet Usered',
          })
        }

        if (oldPassword === newPassword){
          res.status(401).send({
            success:false,
            message:'New Password should not be Old Password'

          })
        }
        const isMatch = await bcrypt.compare(oldPassword,user.password)
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt)

        if (!isMatch){
        return res.status(400).send({
            success:false,
            message:'Old password is incorrect'
        });
        }
        await userRepo.update({email:email},{password:hashedPassword})

        res.status(200).send({
            success:true,
            message:'Password update successfully',
        })

        }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message : 'error in update user api',
            error
        })

    }
}