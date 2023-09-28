import { IsEnum, MinLength } from 'class-validator';

export class CreateNinjaDto {
  // inputs
  @MinLength(3)
  name: string;

  @IsEnum(['stars', 'nunchucks'], { message: 'Invalid weapon' })
  weapon: 'stars' | 'nunchucks';

  // generated
  id: number;
}
