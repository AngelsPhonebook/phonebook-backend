import { Injectable } from "@nestjs/common";
import { ContactEntity } from "./entities/contact.entity";
import { StatusDto } from "$shared/status.dto";
import { CreateContactDto, UpdateContactDto } from "./dto/contact.dto";
import { DbService } from "$shared/service/db/db.service";
import { contactQuery } from "./constants";
import { makeInsertFields } from "./helpers/makeInsertFields";
import { makeUpdateFields } from "./helpers/makeUpdateFields";

@Injectable()
export class ContactsRepository {
  constructor(private readonly dbService: DbService) { }

  async listContacts(): Promise<ContactEntity[]> {
    const { queryString, params } = contactQuery.getQuery()
    const { rows } = await this.dbService.query(queryString, params)

    return rows.map((row) => ContactEntity.schema.validateSync(row))
  }

  async getContact(id: string): Promise<ContactEntity | undefined> {
    const query = contactQuery.addFilter('id = $1', id)

    const { queryString, params } = query.getQuery()
    const { rows } = await this.dbService.query(queryString, params)

    const [ contact ] = rows.map((row) => ContactEntity.schema.validateSync(row))

    return contact
  }

  async deleteContact(id: string): Promise<StatusDto> {
    await this.dbService.query(
      `DELETE FROM contacts WHERE id = $1`,
      [id]
    )

    return {
      ok: true
    }
  }

  async updateContact(id: string, data: UpdateContactDto): Promise<ContactEntity | undefined> {
    const { statements, values } = makeUpdateFields(data)

    const { rows } = await this.dbService.query(
      `UPDATE contacts SET ${statements.join()} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id]
    )

    const [ contact ] = rows.map((row) => ContactEntity.schema.validateSync(row))

    return contact
  }

  async createContact(data: CreateContactDto): Promise<ContactEntity | undefined> {
    const { keys, placeholders, values } = makeInsertFields(data)

    const { rows } = await this.dbService.query(
      `INSERT INTO contacts (${keys}) VALUES (${placeholders}) RETURNING *`,
      values
    )

    const [ contact ] = rows.map((row) => ContactEntity.schema.validateSync(row))

    return contact
  }
}