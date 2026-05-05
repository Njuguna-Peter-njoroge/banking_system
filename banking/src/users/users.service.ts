/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DataSource } from 'typeorm';

/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './Dto/create-user.dto';
import { User } from './Entities/create-user.entity';

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

  findOne() {
    return this.users;
  }
}
