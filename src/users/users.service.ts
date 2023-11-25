import { HttpException, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isExisting = await this.usersRepository.findBy({
      email: createUserDto.email,
    });

    if (isExisting.length) {
      throw new HttpException('Accommodation already exists', 403);
    }

    await this.usersRepository.insert(createUserDto);
    return createUserDto;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, @Req() updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, {
      email: updateUserDto.email,
      password: updateUserDto.password,
    });
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
}
