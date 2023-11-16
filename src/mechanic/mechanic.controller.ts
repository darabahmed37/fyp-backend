import {Body, Controller, Get, Param, Post, Req} from '@nestjs/common';
import {MechanicService} from "mechanic/mechanic.service";
import {Request} from "express";
import {Features} from "features/features.model";

@Controller('mechanic')
export class MechanicController {
    constructor(private mechanicService: MechanicService) {
    }


    @Get("services")
    getAllServices(@Req() request: Request) {
        return this.mechanicService.getAllServices(request.user)
    }

    @Post("save-services")
    async saveServices(@Req() request: Request,
                       @Body() features: Features[]) {
        return this.mechanicService.saveServices(features, request.user)
    }

    @Get(":id")
    getMechanic(@Param("id") id: string) {

        return this.mechanicService.getMechanic(parseInt(id))
    }

    @Post("add-about")
    addAbout(@Body("about") about: string, @Req() request: Request) {
        return this.mechanicService.addAbout(request.user, about)
    }

}
