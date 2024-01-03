import { IsUUID, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateDelivererDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @IsOptional()
  name?: string | null;

  @IsBoolean()
  @IsOptional()
  isDelivererVerified?: boolean | null;
}
