import { ApiProperty, PartialType, OmitType } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class ContactDto {
  @ApiProperty()
  @IsUUID()
  id: string

  @ApiProperty()
  @IsString()
  phone: string

  @ApiProperty()
  @IsString()
  firstName: string

  @ApiProperty()
  @IsString()
  lastName: string

  @ApiProperty()
  @IsString()
  email: string

  @ApiProperty()
  @IsString()
  notes: string
}

export class CreateContactDto extends OmitType(ContactDto, ['id'] as const) {}

export class UpdateContactDto extends PartialType(CreateContactDto) {}