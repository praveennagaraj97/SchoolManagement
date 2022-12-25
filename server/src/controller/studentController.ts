import { RequestHandler } from 'express';
import { AddStudentDTO } from '../@types/dto/student-dto';
import { StudentModel } from '../model/studentSchema';
import { UserModel } from '../model/userSchema';

class StudentController {
  addStudent: RequestHandler<any, any, AddStudentDTO> = async (req, res) => {
    req.body.password = req.body.name.split(' ').join('_').toLowerCase();

    const { address, age, email, gender, name, password, role } = req.body;

    try {
      // Create User
      const doc = await UserModel.create({ email, name, password, role });

      const student = await StudentModel.create({
        address,
        age,
        gender,
        user: doc._id,
      });

      res.status(201).json({
        message: 'Student added successfully',
        _id: student._id,
        address,
        age,
        email,
        gender,
        name,
        role,
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

  studentsList: RequestHandler = async (req, res) => {
    try {
      const query: { [key: string]: any } = {};

      if (req?.query?.class) {
        query['class'] = req.query?.class as string;
      }

      const docs = await StudentModel.find(query);
      res
        .status(200)
        .json({ message: 'Students list retrieved', results: docs });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };

  updateStudent: RequestHandler<any, any, AddStudentDTO> = async (req, res) => {
    const { address, age, gender, email, name } = req.body;

    const id = req.params.id;

    if (name) {
      await UserModel.updateOne({ email: email }, { name });
    }

    try {
      await StudentModel.updateOne(
        { _id: id },
        {
          address,
          age,
          gender,
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
    const count = await StudentModel.count();

    res.status(200).json({ count });
  };

  deleteStudent: RequestHandler = async (req, res) => {
    try {
      const student = await StudentModel.findById(req.params.id);

      if (!student) {
        res.status(204).send();
        return;
      }

      await UserModel.deleteOne({ _id: student.user._id });

      await StudentModel.deleteOne({ _id: req.params.id });

      res.status(204).send();
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };

  assignClassToStudent: RequestHandler = async (req, res) => {
    const student = req.params.id;

    const { classId } = req.body;

    if (!student || !classId) {
      res.status(422).json({ message: 'Invalid input' });
      return;
    }

    try {
      await StudentModel.updateOne({ _id: student }, { class: classId });

      res.status(204).send();
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };
}

export const {
  addStudent,
  studentsList,
  updateStudent,
  count,
  deleteStudent,
  assignClassToStudent,
} = new StudentController();
