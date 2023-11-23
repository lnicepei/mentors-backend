import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accommodationService.findOne(+id);
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
