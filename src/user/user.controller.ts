import {Controller, Get, Query, Req} from '@nestjs/common';
import {Request} from 'express';
import {UserService} from "user/user.service";
import {Public} from "utils/custom.decorator";

@Controller('user')
export class UserController {

    constructor(private userService: UserService) {
    }

    @Get('profile')
    async getProfile(@Req() req: Request) {
        return req.user;
    }

    @Public()
    @Get("checkUsername")
    async checkUserName(@Query() queryParams: { username: string }) {
        let user = await this.userService.findOne("username", queryParams.username)

        return !user
    }


}
