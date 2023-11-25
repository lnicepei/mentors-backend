import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingProviderService } from './booking-provider.service';
import { CreateBookingProviderDto } from './dto/create-booking-provider.dto';
import { UpdateBookingProviderDto } from './dto/update-booking-provider.dto';

@Controller('booking-providers')
export class BookingProviderController {
  constructor(
    private readonly bookingProviderService: BookingProviderService,
  ) {}

  @Post()
  create(@Body() createBookingProviderDto: CreateBookingProviderDto) {
    return this.bookingProviderService.create(createBookingProviderDto);
  }

  @Get()
  findAll() {
    return this.bookingProviderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingProviderService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBookingProviderDto: UpdateBookingProviderDto,
  ) {
    return this.bookingProviderService.update(+id, updateBookingProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingProviderService.remove(+id);
  }
}
