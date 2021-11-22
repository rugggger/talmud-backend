import { Line } from '../models/line.model';
import { IsNotEmpty } from 'class-validator';

export class UpdateMishnaDto {
  @IsNotEmpty()
  id: string;
  
  lines?: Line[];
  mishnaText?: string;
}
