import { Injectable, NotFoundException } from '@nestjs/common';
import type { ContactDto, CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { StatusDto } from '$shared/status.dto';
import { ContactsRepository } from './contacts.repository';

@Injectable()
export class ContactsService {
  constructor(private readonly repository: ContactsRepository){}

  async listContacts(): Promise<ContactDto[]> {
    return await this.repository.listContacts()
  }
  
  async getContact(id: string): Promise<ContactDto | undefined> {
    const contact = await this.repository.getContact(id)

    if (!contact) {
      throw new NotFoundException(`Контакт ${id} не найден!`)
    }

    return contact
  }
  
  async createContact(data: CreateContactDto): Promise<ContactDto | undefined> {
    return await this.repository.createContact(data)
  }
  
  async deleteContact(id: string): Promise<StatusDto> {
    return await this.repository.deleteContact(id)
  }
  
  async updateContact(id: string, data: UpdateContactDto): Promise<ContactDto | undefined> {
    return await this.repository.updateContact(id, data)
  }
}
