import { INITIAL_QUERY } from "./constants";
import { FilterField, QueryObject } from "./types";

export class Query {
  private query: QueryObject;
  private params: unknown[];

  constructor(table?: string) {
    this.query = structuredClone(INITIAL_QUERY);
    this.params = [];

    if (table) {
      this.query.from = table;
    }
  }

  addSelect(field: string, alias?: string) {
    const next = this.clone();
    next.query.select.push((alias ? [field, `"${alias}"`] : [field]).join(' as '))

    return next
  }

  addFilter(filter: FilterField, ...params: unknown[]) {
    const next = this.clone();
    next.query.filter.push(filter)
    next.params.push(...params)

    return next
  }

  addSort(field: string, direction?: 'ASC' | 'DESC') {
    const next = this.clone();
    next.query.sort.push(`${field} ${direction}`)

    return next
  }

  addGroupBy(groupBy: string) {
    const next = this.clone();
    next.query.groupBy.push(groupBy)

    return next
  }

  getQuery() {
    let query: string[] = []

    if (this.query.select.length) {
      query.push(`SELECT ${this.query.select.join()}`)
    }

    query.push(`FROM ${this.query.from}`)

    if (this.query.filter.length) {
      query.push(`WHERE ${this.query.filter.join(' AND ')}`)
    }

    if (this.query.groupBy.length) {
      query.push(`GROUP BY ${this.query.groupBy.join()}`)
    }

    if (this.query.sort.length) {
      query.push(`ORDER BY ${this.query.sort.join()}`)
    }

    return {
      queryString: query.join(' '),
      params: this.params
    }
  }

  private clone(): Query {
    const copy = new Query();
    copy.query = structuredClone(this.query);
    copy.params = [...this.params];

    return copy;
  }
}
