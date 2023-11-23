import { PartialType } from '@nestjs/swagger';
import { CreateBookingProviderDto } from './create-booking-provider.dto';

export class UpdateBookingProviderDto extends PartialType(CreateBookingProviderDto) {}
