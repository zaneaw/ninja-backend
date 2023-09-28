import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Controller('ninjas')
export class NinjasController {
  // GET /ninjas?type=fast --> []
  @Get()
  getNinjas(@Query('type') type: string) {
    return [{ type }];
  }

  // GET /ninjas/:id --> { ... }
  @Get(':id')
  getOneNinja(@Param('id') id: string) {
    return {
      id,
    };
  }

  // POST /ninjas
  @Post()
  createNinja(@Body() createNinjaDto: CreateNinjaDto) {
    return {
      name: createNinjaDto.name,
    };
  }

  // PUT /ninjas/:id --> { ... }
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() UpdateNinjaDto: UpdateNinjaDto) {
    return {
      id,
      name: UpdateNinjaDto.name,
    };
  }

  // DELETE /ninjas/:id
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return { id };
  }
}
