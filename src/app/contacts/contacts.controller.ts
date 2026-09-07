import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ContactDto, CreateContactDto, UpdateContactDto } from './dto/contact.dto';
import { StatusDto } from '../../shared/status.dto';

@Controller('contacts')
export class ContactsController {
  @Post()
  @ApiBody({type: CreateContactDto})
  @ApiResponse({ type: ContactDto })
  async createContact(@Body() contact: CreateContactDto) {

  }

  @Get(':id')
  @ApiResponse({ type: ContactDto })
  async getContact(@Param('id') id: string) {

  }

  @Get()
  @ApiResponse({ type: [ContactDto] })
  async listContacts() {

  }

  @Delete(':id')
  @ApiResponse({ type: StatusDto })
  async deleteContact(@Param('id') id: string) {

  }

  @Put(':id')
  @ApiBody({ type: UpdateContactDto })
  @ApiResponse({ type: ContactDto })
  async updateContact(@Param('id') id: string) {

  }
}
