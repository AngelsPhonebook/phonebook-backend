import { Query } from "$shared/queryBuilder";

export const contactQuery = new Query('contacts')
  .addSelect('id')
  .addSelect('phone')
  .addSelect('first_name', 'firstName')
  .addSelect('last_name', 'lastName')
  .addSelect('email')
  .addSelect('notes')