import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

interface User {
    id: number;
    email: string;
    password: string;
}

const saltRounds = 10;

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);
    
    private readonly users: User[] = [
        {
            id: 1,
            email: 'pepe@gmail.com',
            password:  bcrypt.hashSync('hashedpassword', saltRounds),    // Use hashSync for synchronous hashing
          },
          {
            id: 1,
            email: 'sant@gmail.com',
            password:  bcrypt.hashSync('hashedpassword', saltRounds),    // Use hashSync for synchronous hashing
          },
    ];

    async findOne(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email);
    }

}
