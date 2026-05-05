import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './Dto/create-user.dto';
import { User } from './Entities/create-user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  async create(@Body() createUsersDto: CreateUserDto) {
    return this.userService.create(createUsersDto);
  }

  @Get() findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('id/:id') findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Get('by-email') findOneByEmail(
    @Query('email') email: string,
  ): Promise<User> {
    return this.userService.findOneByEmail(email);
  }
}
