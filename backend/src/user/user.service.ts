import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    createrUser(){
        return {message:`user created`}
    }
}
