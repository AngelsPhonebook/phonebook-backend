import { ApiProperty, PartialType, OmitType } from "@nestjs/swagger";

export class ContactDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  email: string

  @ApiProperty()
  notes: string
}

export class CreateContactDto extends OmitType(ContactDto, ['id'] as const) {}

export class UpdateContactDto extends PartialType(CreateContactDto) {}