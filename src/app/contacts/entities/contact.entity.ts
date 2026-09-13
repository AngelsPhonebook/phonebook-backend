import { object, ObjectSchema, string } from "yup"

export class ContactEntity {
  id: string

  phone: string

  firstName?: string

  lastName?: string

  email?: string

  notes?: string

  static schema: ObjectSchema<ContactEntity> = object({
    id: string().required().uuid(),
    phone: string().required(),
    firstName: string().optional(),
    lastName: string().optional(),
    email: string().optional(),
    notes: string().optional(),
  })
}