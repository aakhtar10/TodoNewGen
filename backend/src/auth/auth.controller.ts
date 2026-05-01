


import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')

export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
   @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 201, description: 'User created' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
}