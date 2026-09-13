import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContactsModule } from '$app/contacts/contacts.module';
import { DbModule } from '$shared/service/db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,

    ContactsModule,
  ],
})
export class AppModule {}
