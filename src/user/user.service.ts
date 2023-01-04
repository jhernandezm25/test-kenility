import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.model';
import { Model } from 'mongoose';
import { uuid } from 'uuidv4';
import { getResponse } from '../common/commonFuctions';
import { MESSAGES } from '../utils/variables';
import { STATUS_CODE } from '../utils/variables';
import { response } from 'src/utils/interfaces';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<response> {
    //TODO Manejo de archivo tambien para el actualizar
    try {
      const consecutive: string = uuid();
      const username =
        `${createUserDto.name}${createUserDto.lastName}${consecutive}`.replace(
          /\s/g,
          ''
        );

      if (createUserDto.password) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        createUserDto.password = hashedPassword;
      }
      const fullUser = { ...createUserDto, username };
      const creationUser = await this.userModel.create(fullUser);
      const response = getResponse(
        STATUS_CODE.Success,
        MESSAGES.Success,
        creationUser
      );
      return response;
    } catch (error) {
      const response = getResponse(
        STATUS_CODE.InternalError,
        MESSAGES.InternalError,
        error.message
      );
      return response;
    }
  }

  async findAll(): Promise<response> {
    try {
      const users: Array<User> = await this.userModel.find();
      const response = getResponse(
        STATUS_CODE.Success,
        MESSAGES.Success,
        users
      );
      return response;
    } catch (error) {
      const response = getResponse(
        STATUS_CODE.InternalError,
        MESSAGES.InternalError,
        error.message
      );
      return response;
    }
  }

  async findOne(id: string): Promise<response> {
    try {
      const user = await this.userModel.findOne({ _id: id });
      const response = getResponse(STATUS_CODE.Success, MESSAGES.Success, user);
      return response;
    } catch (error) {
      const response = getResponse(
        STATUS_CODE.InternalError,
        MESSAGES.InternalError,
        error.message
      );
      return response;
    }
  }

  async findByUsername(username: string): Promise<User> {
    const findOne = await this.userModel.findOne({ username });
    return findOne;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<response> {
    // TODO acomodar el retorno buscar el ultimo
    try {
      const updateUser = await this.userModel.findByIdAndUpdate(
        id,
        updateUserDto
      );
      if (updateUser) {
        const newUser = await this.findOne(id);
        if (newUser.data) {
          const response = getResponse(
            STATUS_CODE.Success,
            MESSAGES.Success,
            newUser.data
          );
          return response;
        } else {
          const response = getResponse(
            STATUS_CODE.Success,
            MESSAGES.Success,
            updateUser
          );
          return response;
        }
      } else {
        const response = getResponse(
          STATUS_CODE.BadRequest,
          MESSAGES.BadRequest,
          null
        );
        return response;
      }
    } catch (error) {
      const response = getResponse(
        STATUS_CODE.InternalError,
        MESSAGES.InternalError,
        error.message
      );
      return response;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
