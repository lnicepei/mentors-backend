import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable, from, map } from 'rxjs';
import { Between, FindOptionsOrder, Like, Repository } from 'typeorm';
import {
  CreateAccommodationDto,
  TSearchOptions,
  TSortOptions,
} from './dto/create-accommodation.dto';
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

  search(
    options: TSearchOptions,
    q: string,
  ): Observable<Pagination<Accommodation>> {
    const sortOptions: Record<TSortOptions, FindOptionsOrder<Accommodation>> = {
      'price:asc': {
        price: 'ASC',
      },
      'price:desc': {
        price: 'DESC',
      },
      'rating:asc': {
        rating: 'ASC',
      },
      'rating:desc': {
        rating: 'DESC',
      },
    };

    const sortQuery = sortOptions[options.sort];

    const [fromPrice, toPrice] = options?.price?.split('-') || [0, 0];

    const myBetween = Between.bind(null, +fromPrice, +toPrice);

    return from(
      this.accommodationRepository.findAndCount({
        skip: (Number(options.page) - 1) * Number(options.limit) || 0,
        take: Number(options.limit) || 10,
        select: [
          'id',
          'name',
          'description',
          'rating',
          'price',
          'provider',
          'location',
        ],
        where: [
          { name: Like(`%${q}%`), price: myBetween() },
          { description: Like(`%${q}%`), price: myBetween() },
        ],
        order: sortQuery,
      }),
    ).pipe(
      map(([accommodations, totalAccommodations]) => {
        const AccommodationsPageable: Pagination<Accommodation> = {
          items: accommodations,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next:
              options.route +
              `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last:
              options.route +
              `?limit=${options.limit}&page=${Math.ceil(
                totalAccommodations / Number(options.limit),
              )}`,
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: accommodations.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalAccommodations,
            totalPages: Math.ceil(totalAccommodations / Number(options.limit)),
          },
        };

        return AccommodationsPageable;
      }),
    );
  }
}
