import { object, ObjectSchema, string } from "yup"

export class ContactEntity {
  id: string

  phone: string

  first_name: string

  last_name: string

  email: string

  notes: string

  static schema: ObjectSchema<ContactEntity> = object({
    id: string().required().uuid(),
    phone: string().required(),
    first_name: string().defined(),
    last_name: string().defined(),
    email: string().defined(),
    notes: string().defined(),
  })
}