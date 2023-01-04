import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
// TODO añadir try catch
@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    //TODO Manejo de archivo tambien para el actualizar
    const consecutive: number = (await this.findAll()).length + 1;
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
    return this.userModel.create(fullUser);
  }

  async findAll(): Promise<Array<User>> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    const findOne = await this.userModel.findOne({ _id: id });
    console.log('findOne', findOne);
    return findOne;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    // TODO acomodar el retorno buscar el ultimo
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
