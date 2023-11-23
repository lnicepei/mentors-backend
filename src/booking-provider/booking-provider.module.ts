import { Module } from '@nestjs/common';
import { BookingProviderService } from './booking-provider.service';
import { BookingProviderController } from './booking-provider.controller';

@Module({
  controllers: [BookingProviderController],
  providers: [BookingProviderService],
})
export class BookingProviderModule {}
