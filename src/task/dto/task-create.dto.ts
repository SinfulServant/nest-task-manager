import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of a task', nullable: false })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The description of a task', nullable: false })
  @IsString()
  description: string;
}
