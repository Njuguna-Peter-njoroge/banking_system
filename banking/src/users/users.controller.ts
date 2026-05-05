import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './Dto/create-user.dto';
import { User } from './Entities/create-user.entity';
import { UpdateUserDto } from './Dto/update-user.dto';

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

  @Put(':id') update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateSongDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateSongDto);
  }

  @Delete('id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
