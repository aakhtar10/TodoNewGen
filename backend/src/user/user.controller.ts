import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/guards/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // GET /users
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  // GET /users/:id
  @UseGuards(AuthGuard)
  @Get(':id')
  getUser(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }
}