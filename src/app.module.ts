import { Module } from '@nestjs/common';
import { ContactsModule } from './app/contacts/contacts.module';

@Module({
  imports: [ContactsModule],
})
export class AppModule {}
