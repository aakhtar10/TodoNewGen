import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: RegisterDto) {
    const { name, email, password } = dto;

    // check if user exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return {
      message: 'User registered successfully',
      userId: user.id,
    };
  }

  async login(dto:LoginDto){
    const {email,password}=dto

    const user = await this.prisma.user.findUnique({
      where:{email}
    })

    if(!user){
      throw new UnauthorizedException("Invalid email")
    }
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      throw new UnauthorizedException("Invalid Password")
    }
   return {
  message: "Login successful",
  user: {
    id: user.id,
    name: user.name,
    email: user.email,
  },
};
  }

  
}