import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResultRow } from 'pg';

@Injectable()
export class DbService implements OnModuleDestroy {
  private readonly pool: Pool

  private readonly logger = new Logger(DbService.name);

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool({
      host: this.configService.get<string>('POSTGRES_HOST'),
      user: this.configService.get<string>('POSTGRES_USER'),
      database: this.configService.get<string>('POSTGRES_DB'),
      port: this.configService.get<number>('POSTGRES_PORT'),
      password: this.configService.get<string>('POSTGRES_PASSWORD'),

      max: 20,
      idleTimeoutMillis: 30000,
    })
  }

  async query<R extends QueryResultRow = any>(
    query: string,
    params: unknown[] | undefined = undefined,
  ) {
    try {
      this.logger.debug(query, params);

      const res = await this.pool.query<R>(query, params);
      
      this.logger.debug(res)

      return res;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}
