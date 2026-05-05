/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DataSource } from 'typeorm';

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
import { User } from './Entities/create-user.entity';
import { UpdateUserDto } from './Dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly dataSourse: DataSource) {}
  private readonly users: any = [];
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.dataSourse.getRepository(User).findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new ConflictException('email already exists');
    }
    const user = await this.dataSourse
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        fullName: createUserDto.fullName,
        email: createUserDto.email,
        phoneNumber: createUserDto.phoneNumber,
        nationalId: createUserDto.nationalId,
        password: createUserDto.password,
      })
      .returning('*')
      .execute();

    return user.raw[0] as User;
  }

  findAll(): Promise<User[]> {
    return this.dataSourse
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .getMany();
  }

  async findOne(id: string): Promise<User> {
    const findUser = await this.dataSourse
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    if (!findUser) {
      throw new NotFoundException(`user with id ${id} not found`);
    }

    return findUser;
  }

  async findOneByEmail(email: string): Promise<User> {
    const findUser = await this.dataSourse
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    if (!findUser) {
      throw new NotFoundException(`user with  $email{email} not found`);
    }

    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updateResult = await this.dataSourse
      .getRepository(User)
      .createQueryBuilder()
      .update(User)
      .set(updateUserDto)
      .where('id =:id', { id })
      .execute();

    if (updateResult.affected === 0) {
      throw new NotFoundException(`user with id ${id} not found`);
    }

    const updatedUser = await this.dataSourse
      .getRepository(User)
      .findOneBy({ id });
    if (!updatedUser) {
      throw new NotFoundException(`song with id ${id} not found`);
    }

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    await this.dataSourse
      .getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}
