import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';

import { Request } from 'express';
import { Pagination } from 'nestjs-typeorm-paginate';

import { Observable } from 'rxjs';
import { AccommodationService } from './accommodation.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { Accommodation } from './entities/accommodation.entity';

@Controller('accommodations')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @Post()
  create(@Body() createAccommodationDto: CreateAccommodationDto) {
    //TODO: add bookingProvider_id to keep track of bookingProvider's accommodations
    return this.accommodationService.create(createAccommodationDto);
  }

  @Get()
  async findAll() {
    return this.accommodationService.findAll();
  }

  @Get('search')
  index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('q') q = '',
    @Req() request: Request,
  ): Observable<Pagination<Accommodation>> {
    limit = limit > 100 ? 100 : limit;

    return this.accommodationService.search(
      {
        page: Number(page),
        limit: Number(limit),
        route: `${request.protocol}://${request.get('Host')}${
          request.originalUrl
        }`,
      },
      q,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAccommodationDto: UpdateAccommodationDto,
  ) {
    return this.accommodationService.update(+id, updateAccommodationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accommodationService.remove(+id);
  }
}
