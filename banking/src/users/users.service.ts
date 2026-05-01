/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: any = [];
  create(user) {
    this.users.push(user);
    return this.users;
  }

  findAll() {
    return this.users;
  }

  findOne() {
    return this.users;
  }
}
