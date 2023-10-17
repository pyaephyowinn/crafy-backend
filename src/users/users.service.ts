import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = this.repo.create(createUserDto);

    return this.repo.save(createdUser).catch((e) => {
      throw new HttpException(
        'User already exists with the given username',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  findAll() {
    return this.repo.find({});
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOne({ where: { id } });
  }

  findOneWithEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException(
        'User not found with the given id',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.repo.remove(user);
  }
}
