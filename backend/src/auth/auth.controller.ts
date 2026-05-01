


import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

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

  @Post('login')
  @ApiOperation({summary:"User Login"})
  @ApiResponse({status:201,description:"User logged in"})
  login(@Body() dto:LoginDto){
    return this.authService.login(dto)
  }
}