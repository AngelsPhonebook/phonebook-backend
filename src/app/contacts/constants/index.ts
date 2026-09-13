import { Query } from "$shared/queryBuilder";

export const contactQuery = new Query('contacts')
  .addSelect('id')
  .addSelect('phone')
  .addSelect('first_name')
  .addSelect('last_name')
  .addSelect('email')
  .addSelect('notes')