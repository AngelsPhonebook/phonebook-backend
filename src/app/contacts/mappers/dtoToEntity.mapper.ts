import { ContactDto } from "../dto/contact.dto";
import { ContactEntity } from "../entities/contact.entity";

export const mapEntityToDto = (entity: ContactDto): ContactEntity => {
  return {
    id: entity.id,
    phone: entity.phone,
    first_name: entity.firstName,
    last_name: entity.lastName,
    email: entity.email,
    notes: entity.notes,
  }
}