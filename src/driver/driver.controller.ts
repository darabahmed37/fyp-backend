import {Body, Controller, Get, Post, Req} from '@nestjs/common';
import {DriverService} from "driver/driver.service";
import {Request} from "express";
import {Features} from "features/features.model";
import {User} from "user/user.model";

@Controller('driver')
export class DriverController {
    constructor(private driverService: DriverService) {
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
