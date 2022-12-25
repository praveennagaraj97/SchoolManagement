import { RequestHandler } from 'express';
import { JWTPayload } from '../@types';
import { LoginUserDTO, RegisterUserDTO } from '../@types/dto/user-dto';
import { UserModel } from '../model/userSchema';
import { generateJWTToken } from '../utils/jwt';
import { validateRegisterDTO } from '../validators';

class UserController {
  registerUser: RequestHandler<any, any, RegisterUserDTO> = async (
    req,
    res,
  ) => {
    try {
      // Validate
      const errors = validateRegisterDTO(req.body);

      if (errors) {
        res.status(401).json(errors);
        return;
      }

      const { email, name, password, role } = req.body;

      const { _id } = await UserModel.create({ email, name, password, role });

      res.status(201).json({
        data: { ...req.body, _id },
        message: 'Registered successfully',
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };

  login: RequestHandler<any, any, LoginUserDTO> = async (req, res) => {
    try {
      const user = await UserModel.findOne({ email: req.body.email }).select(
        '+password',
      );

      if (!user) {
        res
          .status(401)
          .json({ message: 'No user found with given credentials' });
        return;
      }

      const isValid = await user.comparePassword(
        req.body?.password,
        user.password,
      );

      if (!isValid) {
        res.status(401).json({ message: 'Password is invalid' });
        return;
      }

      const token = generateJWTToken<JWTPayload>({
        id: user._id,
        role: user.role,
      });

      res.status(200).json({
        message: 'Logged in successfully',
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        token,
      });
    } catch (error: any) {
      res
        .status(400)
        .json({ message: error?.message || 'Something went wrong' });
    }
  };

  getUser: RequestHandler = async (req, res) => {
    const user = await UserModel.findById(req.id);

    if (!user) {
      res.status(404).json({ message: "Couldn't find any user" });
      return;
    }

    res.status(200).json({
      message: 'User details retrieved successfully',
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    });
  };
}

export const { registerUser, getUser, login } = new UserController();
