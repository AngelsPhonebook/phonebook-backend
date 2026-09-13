import { Injectable } from "@nestjs/common";
import { ContactEntity } from "./entities/contact.entity";
import { StatusDto } from "../../shared/status.dto";
import { CreateContactDto, UpdateContactDto } from "./dto/contact.dto";

@Injectable()
export class ContactsRepository {
  async listContacts(): Promise<ContactEntity[]> {
    return []
  }
  
  async getContact(id: string): Promise<ContactEntity | undefined> {
    return 
  }

  async deleteContact(id: string): Promise<StatusDto> {
    return {
      ok: true
    }
  }
  
  async updateContact(id: string, data: UpdateContactDto): Promise<ContactEntity | undefined> {
    return
  }
  
  async createContact(data: CreateContactDto): Promise<ContactEntity | undefined> {
    return
  }
}