import { RequestHandler } from 'express';
import { AddTeacherDTO } from '../@types/dto/teacher-dto';
import { ClassModel } from '../model/classSchema';
import { StudentModel } from '../model/studentSchema';
import { TeacherModel } from '../model/teacherSchema';
import { UserModel } from '../model/userSchema';

class TeacherController {
  addTeacher: RequestHandler<any, any, AddTeacherDTO> = async (req, res) => {
    req.body.password = req.body.name.split(' ').join('_').toLowerCase();

    const {
      address,
      age,
      email,
      gender,
      name,
      password,
      qualification,
      role,
      salary,
      subject,
    } = req.body;

    try {
      // Create User
      const doc = await UserModel.create({ email, name, password, role });

      const teacher = await TeacherModel.create({
        address,
        age,
        gender,
        qualification,
        salary,
        subject,
        user: doc._id,
      });

      res.status(201).json({
        message: 'Teacher added successfully',
        _id: teacher._id,
        address,
        age,
        email,
        gender,
        name,
        qualification,
        role,
        salary,
        subject,
        user: {
          _id: doc._id,
          email: doc.email,
          name: doc.name,
          role: doc.role,
        },
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };

  teachersList: RequestHandler = async (_, res) => {
    const docs = await TeacherModel.find();
    res.status(200).json({ message: 'Teachers list retrieved', results: docs });
  };

  updateTeacher: RequestHandler<any, any, AddTeacherDTO> = async (req, res) => {
    const {
      address,
      age,
      gender,
      qualification,
      salary,
      subject,
      email,
      name,
    } = req.body;

    const id = req.params.id;

    if (name) {
      await UserModel.updateOne({ email: email }, { name });
    }

    try {
      await TeacherModel.updateOne(
        { _id: id },
        {
          address,
          age,
          gender,
          qualification,
          salary,
          subject,
        },
      );

      res.status(204).send();
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };

  count: RequestHandler = async (_, res) => {
    const count = await TeacherModel.count();

    res.status(200).json({ count });
  };

  deleteTeacher: RequestHandler = async (req, res) => {
    try {
      const teacher = await TeacherModel.findById(req.params.id);

      if (!teacher) {
        res.status(204).send();
        return;
      }

      await UserModel.deleteOne({ _id: teacher.user._id });

      await TeacherModel.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };

  getMyStudents: RequestHandler = async (req, res) => {
    const { id } = req;

    try {
      const teacherData = await TeacherModel.findOne({ user: id });

      const classData = await ClassModel.findOne({ teacher: teacherData?._id });

      const students = await StudentModel.find({ class: classData?._id });

      res.status(200).json({ results: students });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };
}

export const {
  addTeacher,
  teachersList,
  updateTeacher,
  count,
  deleteTeacher,
  getMyStudents,
} = new TeacherController();
