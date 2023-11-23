import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { UpdateAccommodationDto } from './dto/update-accommodation.dto';
import { Accommodation } from './entities/accommodation.entity';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectRepository(Accommodation)
    private readonly accommodationRepository: Repository<Accommodation>,
  ) {}

  async create(createAccommodationDto: CreateAccommodationDto) {
    const isExisting = await this.accommodationRepository.findOneBy({
      name: createAccommodationDto.name,
    });

    if (isExisting) {
      throw new HttpException('Accommodation already exists', 404);
    }

    return await this.accommodationRepository.save(createAccommodationDto);
  }

  async findAll() {
    return await this.accommodationRepository.find();
  }

  async findOne(id: number) {
    const existing = await this.accommodationRepository.findOneBy({ id });

    if (!existing) {
      throw new HttpException('Accommodation not found', 404);
    }

    return await this.accommodationRepository.findOneBy({
      id,
    });
  }

  async update(id: number, updateAccommodationDto: UpdateAccommodationDto) {
    const existing = await this.accommodationRepository.findOneBy({ id });

    if (!existing) {
      throw new HttpException('Accommodation not found', 404);
    }

    return await this.accommodationRepository.update(
      id,
      updateAccommodationDto,
    );
  }

  async remove(id: number) {
    const isExisting = await this.accommodationRepository.findOneBy({ id });

    if (!isExisting) {
      throw new HttpException('This accommodation does not exist', 404);
    }

    return await this.accommodationRepository.delete(id);
  }
}
