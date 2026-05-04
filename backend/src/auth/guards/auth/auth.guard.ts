// src/auth/guards/auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // Extract token from the Authorization header
    const token = request.headers.authorization?.split(' ')[1]; // "Bearer <token>"

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Verify the token and attach user info to the request
      const payload = this.jwtService.verify(token);
      request['user'] = payload; // Now available in controller as req.user
            console.log("guard is ruuning")

      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}