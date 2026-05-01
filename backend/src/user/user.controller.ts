import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // GET /users
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // GET /users/:id
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}