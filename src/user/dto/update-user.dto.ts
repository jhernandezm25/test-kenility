import { CreateUserDto } from './create-user.dto';

export interface UpdateUserDto {
  name?: string;
  lastName?: string;
  address?: string;
  picture?: string;
  password?: string;
}
