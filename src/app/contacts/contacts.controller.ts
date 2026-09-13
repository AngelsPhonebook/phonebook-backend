import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ContactDto, CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { StatusDto } from '../../shared/status.dto';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly service: ContactsService) {}
  
  @Post()
  @ApiBody({type: CreateContactDto})
  @ApiResponse({ type: ContactDto })
  async createContact(@Body() contact: CreateContactDto) {
    return await this.service.createContact(contact)
  }

  @Get(':id')
  @ApiResponse({ type: ContactDto })
  async getContact(@Param('id') id: string) {
    return await this.service.getContact(id)
  }

  @Get()
  @ApiResponse({ type: [ContactDto] })
  async listContacts() {
    return await this.service.listContacts()
  }

  @Delete(':id')
  @ApiResponse({ type: StatusDto })
  async deleteContact(@Param('id') id: string) {
    return await this.service.deleteContact(id)
  }

  @Patch(':id')
  @ApiBody({ type: UpdateContactDto })
  @ApiResponse({ type: ContactDto })
  async updateContact(@Param('id') id: string, @Body() data: UpdateContactDto) {
    return await this.service.updateContact(id, data)
  }
}
