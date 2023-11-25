import { Injectable } from '@nestjs/common';
import { CreateBookingProviderDto } from './dto/create-booking-provider.dto';
import { UpdateBookingProviderDto } from './dto/update-booking-provider.dto';

@Injectable()
export class BookingProviderService {
  create(createBookingProviderDto: CreateBookingProviderDto) {
    return 'This action adds a new bookingProvider';
  }

  findAll() {
    return `This action returns all bookingProvider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingProvider`;
  }

  update(id: number, updateBookingProviderDto: UpdateBookingProviderDto) {
    return `This action updates a #${id} bookingProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookingProvider`;
  }
}
