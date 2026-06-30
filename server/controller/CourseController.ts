import type { RequestHandler } from "express";

import { database } from "../server.js";
import Course from "../models/CourseModel.js";

import { ILike } from "typeorm";
import { In } from "typeorm";

export const Create: RequestHandler = async (req, res) => {
  try {
    const courseRepo = database.getRepository(Course);

    const { title, description, instructor_name, duration, level, thumbnail } =
      req.body;

    if (
      !title ||
      !description ||
      !instructor_name ||
      !duration ||
      !level ||
      !thumbnail
    ) {
      res.status(400).send({
        success: false,
        message: "Enter all the values",
      });
    }
    const title_existing = await courseRepo.findOne({
      where: { title: title },
    });
    if (title_existing) {
      return res.status(400).send({
        success: false,
        message: "Course already existing",
      });
    }
    const course = courseRepo.create({
      title,
      description,
      instructor_name,
      duration,
      level,
      thumbnail,
    });
    const newCourse = await courseRepo.save(course);

    res.status(200).send({
      success: true,
      message: "Course created",
      course: newCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while creating",
    });
  }
};

export const GetAll: RequestHandler = async (req, res) => {
  try {
    const courseRepo = database.getRepository(Course);

    const search= req.query.search as string;
    const filter = req.query.filter as string
    const instructors = filter.split(",");

    const page = Number(req.query.page);
    const per_page = Number(req.query.per_page);

    const initial = (page - 1) * per_page;
    const final = page * per_page;
    // const total_page = Math.ceil(data.length / per_page);
    // const currentData = data.slice(initial, final);

    let courses;
    let total;

    if (search && filter ){
      const searchData = await courseRepo.find({
        where: [
          { title: ILike(`${search}%`) },
        ],
      });
     const filterData = await courseRepo.find({
        where: { instructor_name: In(instructors) },
        });
      courses = searchData.filter((sdata)=> filterData.some((fdata)=>fdata.id === sdata.id))
    }
    else if (search){
      courses = await courseRepo.find({
        where: [
          { title: ILike(`${search}%`) },
        ],
      });
    }
    else if (filter){
      courses = await courseRepo.find({
        where: { instructor_name: In(instructors) },
        });
    }
    else {
      courses = await courseRepo.find()
      };

    const total_page = Math.ceil(courses.length / per_page);
    const Data = courses.slice(initial, final);

    res.status(200).send({
      success: true,
      message: "Courses fetched successfully",
      Data ,
      pagination: {
        total_page
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      success: false,
      message: "Error while getting courses",
    });
  }
};

export const Get: RequestHandler = async (req, res) => {
  try {
    const courseRepo = database.getRepository(Course);
    const search = req.params.search as string;
    console.log(search);
    const course = await courseRepo.find({
      where: [
        { title: ILike(`${search}%`) },
      ],
    });
    console.log(course);
    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Courses",
      course,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting the course",
    });
  }
};

export const Update: RequestHandler = async (req, res) => {
  try {
    const courseRepo = database.getRepository(Course);

    const { title, description, instructor_name, duration, level, thumbnail } =
      req.body;

    const id = req.params.id as string;
    console.log(id);
    const course = await courseRepo.findOneBy({ id });
    console.log(course);
    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }
    const UpdatedCourse = await courseRepo.update(
      { id: id },
      {
        title: title,
        description: description,
        instructor_name: instructor_name,
        duration: duration,
        level: level,
        thumbnail: thumbnail,
      },
    );
    res.status(200).send({
      success: true,
      message: "Course updated",
      UpdatedCourse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating the course",
    });
  }
};

export const Delete: RequestHandler = async (req, res) => {
  try {
    const courseRepo = database.getRepository(Course);
    const id = req.params.id as string;
    console.log(id);
    const course = await courseRepo.findOneBy({ id });
    console.log(course);
    if (!course) {
      return res.status(404).send({
        success: false,
        message: "Course not found",
      });
    }
    await courseRepo.delete({ id: id });
    res.status(200).send({
      success: true,
      message: "Course deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting the course",
    });
  }
};

export const FilterCourse: RequestHandler = async (req, res) => {
  try {
    const instructor = req.params.instructors as string;
    const instructors = instructor.split(",");
    const courseRepo = database.getRepository(Course);
    const courses = await courseRepo.find({
      where: { instructor_name: In(instructors) },
    });

    res.status(200).json({
      success: true,
      message: "Filtered by Instructor name",
      courses,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while filtering",
    });
  }
};
