import { ContactDto } from "../dto/contact.dto";
import { ContactEntity } from "../entities/contact.entity";

export const mapEntityToDto = (entity: ContactEntity): ContactDto => {
  return {
    id: entity.id,
    phone: entity.phone,
    firstName: entity.first_name,
    lastName: entity.last_name,
    email: entity.email,
    notes: entity.notes,
  }
}