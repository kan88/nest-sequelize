import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEducationDto {
  @IsString()
  @ApiProperty({
    example: 'МФЮА',
    description: 'Название университета',
  })
  readonly university: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Экономики',
    description: 'Факультет',
    required: false,
    nullable: true,
  })
  readonly faculty?: string | null;
  @IsString()
  @IsOptional()
  @ApiProperty({
    example: 'Экономист',
    description: 'Специализация',
    required: false,
    nullable: true,
  })
  readonly specialization?: string | null;
  @IsDateString()
  @ApiProperty({
    example: '2023-12-23',
    description: 'Дата окончания',
  })
  readonly date_off_issue: Date;
  @IsString()
  @ApiProperty({
    example: 'бакалавр',
    description: 'Степень',
  })
  readonly degree: string;
}
