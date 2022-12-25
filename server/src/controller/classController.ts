import { RequestHandler } from 'express';
import { ClassEntity } from '../@types/entity/class.entity';
import { ClassModel } from '../model/classSchema';
import { validateAddClassDTO } from '../validators';

class ClassController {
  createClass: RequestHandler<any, any, Omit<ClassEntity, '_id'>> = async (
    req,
    res,
  ) => {
    const errors = validateAddClassDTO(req.body);

    if (errors) {
      res.status(422).json(errors);
      return;
    }

    req.body.capacity = parseInt(`${req.body.capacity}`);

    const { capacity, name } = req.body;
    try {
      const doc = await ClassModel.create({ capacity, name });

      res.status(201).json({
        message: 'Class added successfully',
        _id: doc._id,
        capacity,
        name,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };

  getClasses: RequestHandler = async (_, res) => {
    const document = await ClassModel.find();

    res
      .status(200)
      .json({ message: 'Classes list retrieved', results: document });
  };

  deleteClass: RequestHandler = async (req, res) => {
    const id = req.params?.id;

    if (!id) {
      res.status(422).json({ message: 'Class ID cannot be empty' });
      return;
    }

    try {
      await ClassModel.deleteOne({ _id: id });
      res.status(204).send();
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };

  updateClass: RequestHandler<any, any, Omit<ClassEntity, '_id'>> = async (
    req,
    res,
  ) => {
    const id = req.params?.id;

    if (!id) {
      res.status(422).json({ message: 'Class ID cannot be empty' });
      return;
    }

    const { capacity, name } = req.body;
    try {
      await ClassModel.updateOne({ _id: id }, { capacity, name });
      res.status(204).send();
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };

  classCount: RequestHandler = async (_, res) => {
    const count = await ClassModel.count();
    res.status(200).json({ count });
  };
}

export const { createClass, getClasses, deleteClass, updateClass, classCount } =
  new ClassController();
