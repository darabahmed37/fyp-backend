import {Body, Controller, HttpException, HttpStatus, Post, Req, UnauthorizedException,} from '@nestjs/common';
import {AuthService} from 'auth/auth.service';
import {Public} from 'utils/custom.decorator';
import {Request} from "express";

@Controller('auth')
@Public()
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('refresh')
    async refreshToken(@Body() body) {
        try {
            return await this.authService.refreshToken(body.refresh_token);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @Post('signup')
    async signUp(@Body() body: any) {
        await this.authService.create(body);
        return {
            message: 'Created',
        };
    }

    @Post('signin')
    async signIn(@Body() body: any) {
        let user = await this.authService.validateUser(
            body.username,
            body.password,
        );
        if (user) {
            return await this.authService.login(user);
        } else throw new UnauthorizedException("Invalid Cred")
    }

    @Post('changePassword')
    async changePassword(@Body("oldPassword") oldPassword: string, @Body("newPassword") newPassword: string, @Req() request: Request) {
        let user = await this.authService.validateUser(
            request.user.username,
            oldPassword
        );
        if (!user) {
            throw new UnauthorizedException("Invalid Password")
        }
        return this.authService.updatePassword(request.user.username, newPassword)

    }
}
