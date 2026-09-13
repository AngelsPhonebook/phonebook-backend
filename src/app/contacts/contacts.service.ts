import { Injectable, NotFoundException } from '@nestjs/common';
import type { ContactDto, CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { StatusDto } from '$shared/status.dto';
import { ContactsRepository } from './contacts.repository';
import { mapEntityToDto } from './mappers/entityToDto.mapper';

@Injectable()
export class ContactsService {
  constructor(private readonly repository: ContactsRepository){}

  async listContacts(): Promise<ContactDto[]> {
    const contacts = await this.repository.listContacts()

    return contacts.map(mapEntityToDto)
  }
  
  async getContact(id: string): Promise<ContactDto> {
    const contact = await this.repository.getContact(id)

    if (!contact) {
      throw new NotFoundException(`Контакт ${id} не найден!`)
    }

    return mapEntityToDto(contact)
  }
  
  async createContact(data: CreateContactDto): Promise<ContactDto> {
    const contact =  await this.repository.createContact(data)

    return mapEntityToDto(contact)
  }
  
  async deleteContact(id: string): Promise<StatusDto> {
    return await this.repository.deleteContact(id)
  }
  
  async updateContact(id: string, data: UpdateContactDto): Promise<ContactDto> {
    const contact =  await this.repository.updateContact(id, data)

    return mapEntityToDto(contact)
  }
}
