// src/auth/auth.controller.ts
import { Controller, Post, UseGuards, Request, Res, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    private readonly logger = new Logger(AuthController.name);

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res({ passthrough: true }) res: Response) {
        const user = req.user;
        this.logger.log('Loggin Controller')
        const { access_token } = await this.authService.login(user);
        res.cookie('jwt', access_token, { httpOnly: true, secure: true }); // Set secure to true in production!
        return { message: 'Login successful' };
    }
}
