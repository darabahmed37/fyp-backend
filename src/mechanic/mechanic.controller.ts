import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {MechanicService} from "mechanic/mechanic.service";
import {Request} from "express";
import {Features} from "features/features.model";
import {User} from "user/user.model";

@Controller('mechanic')
export class MechanicController {
    constructor(private driverService: MechanicService) {
    }

    @Get("services")
    getAllServices(@Req() request: Request) {
        return this.driverService.getAllServices(request.user)
    }

    @Post("save-services")
    async saveServices(@Req() request: Request,
                     @Body()  features: Features[]) {
        return this.driverService.saveServices(features, request.user)
    }

}
