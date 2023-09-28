import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { ValidationPipe } from '@nestjs/common/pipes';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  // GET /ninjas?weapon=star --> []
  @Get()
  getNinjas(@Query('weapon') weapon: 'stars' | 'nunchucks') {
    return this.ninjasService.getNinjas(weapon);
  }

  // GET /ninjas/:id --> { ... }
  @Get(':id')
  getNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // POST /ninjas
  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    try {
      return this.ninjasService.createNinja(createNinjaDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // PUT /ninjas/:id --> { ... }
  @Put(':id')
  updateNinja(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNinjaDto: UpdateNinjaDto,
  ) {
    try {
      return this.ninjasService.updateNinja(id, updateNinjaDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // DELETE /ninjas/:id
  @Delete(':id')
  deleteNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjasService.deleteNinja(id);
  }
}
